"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propagateSymbols = propagateSymbols;
function _assert() {
  const data = _interopRequireDefault(require("assert"));
  _assert = function () {
    return data;
  };
  return data;
}
function _nullthrows() {
  const data = _interopRequireDefault(require("nullthrows"));
  _nullthrows = function () {
    return data;
  };
  return data;
}
function _utils() {
  const data = require("@parcel/utils");
  _utils = function () {
    return data;
  };
  return data;
}
function _logger() {
  const data = _interopRequireDefault(require("@parcel/logger"));
  _logger = function () {
    return data;
  };
  return data;
}
function _diagnostic() {
  const data = require("@parcel/diagnostic");
  _diagnostic = function () {
    return data;
  };
  return data;
}
var _types = require("./types");
var _projectPath = require("./projectPath");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function propagateSymbols({
  options,
  assetGraph,
  changedAssetsPropagation,
  assetGroupsWithRemovedParents,
  previousErrors
}) {
  let changedAssets = new Set([...changedAssetsPropagation].map(id => assetGraph.getNodeIdByContentKey(id)));

  // To reorder once at the end
  let changedDeps = new Set();

  // For the down traversal, the nodes with `usedSymbolsDownDirty = true` are exactly
  // `changedAssetsPropagation` (= asset and therefore potentially dependencies changed) or the
  // asset children of `assetGroupsWithRemovedParents` (= fewer incoming dependencies causing less
  // used symbols).
  //
  // The up traversal has to consider all nodes that changed in the down traversal
  // (`useSymbolsUpDirtyDown = true`) which are listed in `changedDepsUsedSymbolsUpDirtyDown`
  // (more or less requested symbols) and in `changedAssetsPropagation` (changing an asset might
  // change exports).

  // The dependencies that changed in the down traversal causing an update in the up traversal.
  let changedDepsUsedSymbolsUpDirtyDown = new Set();

  // Propagate the requested symbols down from the root to the leaves
  propagateSymbolsDown(assetGraph, changedAssets, assetGroupsWithRemovedParents, (assetNode, incomingDeps, outgoingDeps) => {
    // exportSymbol -> identifier
    let assetSymbols = assetNode.value.symbols;
    // identifier -> exportSymbol
    let assetSymbolsInverse;
    if (assetSymbols) {
      assetSymbolsInverse = new Map();
      for (let [s, {
        local
      }] of assetSymbols) {
        let set = assetSymbolsInverse.get(local);
        if (!set) {
          set = new Set();
          assetSymbolsInverse.set(local, set);
        }
        set.add(s);
      }
    }
    let hasNamespaceOutgoingDeps = outgoingDeps.some(d => {
      var _d$value$symbols, _d$value$symbols$get;
      return ((_d$value$symbols = d.value.symbols) === null || _d$value$symbols === void 0 ? void 0 : (_d$value$symbols$get = _d$value$symbols.get('*')) === null || _d$value$symbols$get === void 0 ? void 0 : _d$value$symbols$get.local) === '*';
    });

    // 1) Determine what the incomingDeps requests from the asset
    // ----------------------------------------------------------

    let isEntry = false;
    let addAll = false;

    // Used symbols that are exported or reexported (symbol will be removed again later) by asset.
    assetNode.usedSymbols = new Set();

    // Symbols that have to be namespace reexported by outgoingDeps.
    let namespaceReexportedSymbols = new Set();
    if (incomingDeps.length === 0) {
      // Root in the runtimes Graph
      assetNode.usedSymbols.add('*');
      namespaceReexportedSymbols.add('*');
    } else {
      for (let incomingDep of incomingDeps) {
        if (incomingDep.value.symbols == null) {
          if (incomingDep.value.sourceAssetId == null) {
            // The root dependency on non-library builds
            isEntry = true;
          } else {
            // A regular dependency with cleared symbols
            addAll = true;
          }
          continue;
        }
        for (let exportSymbol of incomingDep.usedSymbolsDown) {
          if (exportSymbol === '*') {
            assetNode.usedSymbols.add('*');
            namespaceReexportedSymbols.add('*');
          }
          if (!assetSymbols || assetSymbols.has(exportSymbol) || assetSymbols.has('*')) {
            // An own symbol or a non-namespace reexport
            assetNode.usedSymbols.add(exportSymbol);
          }
          // A namespace reexport
          // (but only if we actually have namespace-exporting outgoing dependencies,
          // This usually happens with a reexporting asset with many namespace exports which means that
          // we cannot match up the correct asset with the used symbol at this level.)
          else if (hasNamespaceOutgoingDeps && exportSymbol !== 'default') {
            namespaceReexportedSymbols.add(exportSymbol);
          }
        }
      }
    }

    // Incomding dependency with cleared symbols, add everything
    if (addAll) {
      assetSymbols === null || assetSymbols === void 0 ? void 0 : assetSymbols.forEach((_, exportSymbol) => assetNode.usedSymbols.add(exportSymbol));
    }

    // 2) Distribute the symbols to the outgoing dependencies
    // ----------------------------------------------------------
    for (let dep of outgoingDeps) {
      let depUsedSymbolsDownOld = dep.usedSymbolsDown;
      let depUsedSymbolsDown = new Set();
      dep.usedSymbolsDown = depUsedSymbolsDown;
      if (assetNode.value.sideEffects ||
      // Incoming dependency with cleared symbols
      addAll ||
      // For entries, we still need to add dep.value.symbols of the entry (which are "used" but not according to the symbols data)
      isEntry ||
      // If not a single symbol is used, we can say the entire subgraph is not used.
      // This is e.g. needed when some symbol is imported and then used for a export which isn't used (= "semi-weak" reexport)
      //    index.js:     `import {bar} from "./lib"; ...`
      //    lib/index.js: `export * from "./foo.js"; export * from "./bar.js";`
      //    lib/foo.js:   `import { data } from "./bar.js"; export const foo = data + " esm2";`
      assetNode.usedSymbols.size > 0 || namespaceReexportedSymbols.size > 0) {
        var _depSymbols$get;
        let depSymbols = dep.value.symbols;
        if (!depSymbols) continue;
        if (((_depSymbols$get = depSymbols.get('*')) === null || _depSymbols$get === void 0 ? void 0 : _depSymbols$get.local) === '*') {
          if (addAll) {
            depUsedSymbolsDown.add('*');
          } else {
            for (let s of namespaceReexportedSymbols) {
              // We need to propagate the namespaceReexportedSymbols to all namespace dependencies (= even wrong ones because we don't know yet)
              depUsedSymbolsDown.add(s);
            }
          }
        }
        for (let [symbol, {
          local
        }] of depSymbols) {
          var _depSymbols$get2;
          // Was already handled above
          if (local === '*') continue;
          if (!assetSymbolsInverse || !((_depSymbols$get2 = depSymbols.get(symbol)) !== null && _depSymbols$get2 !== void 0 && _depSymbols$get2.isWeak)) {
            // Bailout or non-weak symbol (= used in the asset itself = not a reexport)
            depUsedSymbolsDown.add(symbol);
          } else {
            let reexportedExportSymbols = assetSymbolsInverse.get(local);
            if (reexportedExportSymbols == null) {
              // not reexported = used in asset itself
              depUsedSymbolsDown.add(symbol);
            } else if (assetNode.usedSymbols.has('*')) {
              // we need everything
              depUsedSymbolsDown.add(symbol);
              [...reexportedExportSymbols].forEach(s => assetNode.usedSymbols.delete(s));
            } else {
              let usedReexportedExportSymbols = [...reexportedExportSymbols].filter(s => assetNode.usedSymbols.has(s));
              if (usedReexportedExportSymbols.length > 0) {
                // The symbol is indeed a reexport, so it's not used from the asset itself
                depUsedSymbolsDown.add(symbol);
                usedReexportedExportSymbols.forEach(s => assetNode.usedSymbols.delete(s));
              }
            }
          }
        }
      } else {
        depUsedSymbolsDown.clear();
      }
      if (!(0, _utils().setEqual)(depUsedSymbolsDownOld, depUsedSymbolsDown)) {
        dep.usedSymbolsDownDirty = true;
        dep.usedSymbolsUpDirtyDown = true;
        changedDepsUsedSymbolsUpDirtyDown.add(dep.id);
      }
      if (dep.usedSymbolsUpDirtyDown) {
        // Set on node creation
        changedDepsUsedSymbolsUpDirtyDown.add(dep.id);
      }
    }
  });
  const logFallbackNamespaceInsertion = (assetNode, symbol, depNode1, depNode2) => {
    if (options.logLevel === 'verbose') {
      _logger().default.warn({
        message: `${(0, _projectPath.fromProjectPathRelative)(assetNode.value.filePath)} reexports "${symbol}", which could be resolved either to the dependency "${depNode1.value.specifier}" or "${depNode2.value.specifier}" at runtime. Adding a namespace object to fall back on.`,
        origin: '@parcel/core'
      });
    }
  };

  // Because namespace reexports introduce ambiguity, go up the graph from the leaves to the
  // root and remove requested symbols that aren't actually exported
  let errors = propagateSymbolsUp(assetGraph, changedAssets, changedDepsUsedSymbolsUpDirtyDown, previousErrors, (assetNode, incomingDeps, outgoingDeps) => {
    let assetSymbols = assetNode.value.symbols;
    let assetSymbolsInverse = null;
    if (assetSymbols) {
      assetSymbolsInverse = new Map();
      for (let [s, {
        local
      }] of assetSymbols) {
        let set = assetSymbolsInverse.get(local);
        if (!set) {
          set = new Set();
          assetSymbolsInverse.set(local, set);
        }
        set.add(s);
      }
    }

    // the symbols that are reexported (not used in `asset`) -> asset they resolved to
    let reexportedSymbols = new Map();
    // the symbols that are reexported (not used in `asset`) -> the corresponding outgoingDep(s)
    // To generate the diagnostic when there are multiple dependencies with non-statically
    // analyzable exports
    let reexportedSymbolsSource = new Map();
    for (let outgoingDep of outgoingDeps) {
      var _outgoingDepSymbols$g;
      let outgoingDepSymbols = outgoingDep.value.symbols;
      if (!outgoingDepSymbols) continue;
      let isExcluded = assetGraph.getNodeIdsConnectedFrom(assetGraph.getNodeIdByContentKey(outgoingDep.id)).length === 0;
      // excluded, assume everything that is requested exists
      if (isExcluded) {
        outgoingDep.usedSymbolsDown.forEach((_, s) => outgoingDep.usedSymbolsUp.set(s, null));
      }
      if (((_outgoingDepSymbols$g = outgoingDepSymbols.get('*')) === null || _outgoingDepSymbols$g === void 0 ? void 0 : _outgoingDepSymbols$g.local) === '*') {
        outgoingDep.usedSymbolsUp.forEach((sResolved, s) => {
          if (s === 'default') {
            return;
          }

          // If the symbol could come from multiple assets at runtime, assetNode's
          // namespace will be needed at runtime to perform the lookup on.
          if (reexportedSymbols.has(s)) {
            if (!assetNode.usedSymbols.has('*')) {
              logFallbackNamespaceInsertion(assetNode, s, (0, _nullthrows().default)(reexportedSymbolsSource.get(s)), outgoingDep);
            }
            assetNode.usedSymbols.add('*');
            reexportedSymbols.set(s, {
              asset: assetNode.id,
              symbol: s
            });
          } else {
            reexportedSymbols.set(s, sResolved);
            reexportedSymbolsSource.set(s, outgoingDep);
          }
        });
      }
      for (let [s, sResolved] of outgoingDep.usedSymbolsUp) {
        var _outgoingDepSymbols$g2, _assetSymbolsInverse;
        if (!outgoingDep.usedSymbolsDown.has(s)) {
          // usedSymbolsDown is a superset of usedSymbolsUp
          continue;
        }
        let local = (_outgoingDepSymbols$g2 = outgoingDepSymbols.get(s)) === null || _outgoingDepSymbols$g2 === void 0 ? void 0 : _outgoingDepSymbols$g2.local;
        if (local == null) {
          // Caused by '*' => '*', already handled
          continue;
        }
        let reexported = (_assetSymbolsInverse = assetSymbolsInverse) === null || _assetSymbolsInverse === void 0 ? void 0 : _assetSymbolsInverse.get(local);
        if (reexported != null) {
          reexported.forEach(s => {
            // see same code above
            if (reexportedSymbols.has(s)) {
              if (!assetNode.usedSymbols.has('*')) {
                logFallbackNamespaceInsertion(assetNode, s, (0, _nullthrows().default)(reexportedSymbolsSource.get(s)), outgoingDep);
              }
              assetNode.usedSymbols.add('*');
              reexportedSymbols.set(s, {
                asset: assetNode.id,
                symbol: s
              });
            } else {
              reexportedSymbols.set(s, sResolved);
              reexportedSymbolsSource.set(s, outgoingDep);
            }
          });
        }
      }
    }
    let errors = [];
    function usedSymbolsUpAmbiguous(old, current, s, value) {
      if (old.has(s)) {
        let valueOld = old.get(s);
        if (valueOld !== value && !((valueOld === null || valueOld === void 0 ? void 0 : valueOld.asset) === value.asset && (valueOld === null || valueOld === void 0 ? void 0 : valueOld.symbol) === value.symbol)) {
          // The dependency points to multiple assets (via an asset group).
          current.set(s, undefined);
          return;
        }
      }
      current.set(s, value);
    }
    for (let incomingDep of incomingDeps) {
      var _incomingDepSymbols$g;
      let incomingDepUsedSymbolsUpOld = incomingDep.usedSymbolsUp;
      incomingDep.usedSymbolsUp = new Map();
      let incomingDepSymbols = incomingDep.value.symbols;
      if (!incomingDepSymbols) continue;
      let hasNamespaceReexport = ((_incomingDepSymbols$g = incomingDepSymbols.get('*')) === null || _incomingDepSymbols$g === void 0 ? void 0 : _incomingDepSymbols$g.local) === '*';
      for (let s of incomingDep.usedSymbolsDown) {
        if (assetSymbols == null ||
        // Assume everything could be provided if symbols are cleared
        assetNode.value.bundleBehavior === _types.BundleBehavior.isolated || assetNode.value.bundleBehavior === _types.BundleBehavior.inline || s === '*' || assetNode.usedSymbols.has(s)) {
          usedSymbolsUpAmbiguous(incomingDepUsedSymbolsUpOld, incomingDep.usedSymbolsUp, s, {
            asset: assetNode.id,
            symbol: s
          });
        } else if (reexportedSymbols.has(s)) {
          let reexport = reexportedSymbols.get(s);
          let v =
          // Forward a reexport only if the current asset is side-effect free and not external
          !assetNode.value.sideEffects && reexport != null ? reexport : {
            asset: assetNode.id,
            symbol: s
          };
          usedSymbolsUpAmbiguous(incomingDepUsedSymbolsUpOld, incomingDep.usedSymbolsUp, s, v);
        } else if (!hasNamespaceReexport) {
          var _incomingDep$value$sy, _incomingDep$value$sy2, _fromProjectPath, _incomingDep$value$so;
          let loc = (_incomingDep$value$sy = incomingDep.value.symbols) === null || _incomingDep$value$sy === void 0 ? void 0 : (_incomingDep$value$sy2 = _incomingDep$value$sy.get(s)) === null || _incomingDep$value$sy2 === void 0 ? void 0 : _incomingDep$value$sy2.loc;
          let [resolutionNodeId] = assetGraph.getNodeIdsConnectedFrom(assetGraph.getNodeIdByContentKey(incomingDep.id));
          let resolution = (0, _nullthrows().default)(assetGraph.getNode(resolutionNodeId));
          (0, _assert().default)(resolution && (resolution.type === 'asset_group' || resolution.type === 'asset'));
          errors.push({
            message: (0, _diagnostic().md)`${(0, _projectPath.fromProjectPathRelative)(resolution.value.filePath)} does not export '${s}'`,
            origin: '@parcel/core',
            codeFrames: loc ? [{
              filePath: (_fromProjectPath = (0, _projectPath.fromProjectPath)(options.projectRoot, loc === null || loc === void 0 ? void 0 : loc.filePath)) !== null && _fromProjectPath !== void 0 ? _fromProjectPath : undefined,
              language: (_incomingDep$value$so = incomingDep.value.sourceAssetType) !== null && _incomingDep$value$so !== void 0 ? _incomingDep$value$so : undefined,
              codeHighlights: [(0, _diagnostic().convertSourceLocationToHighlight)(loc)]
            }] : undefined
          });
        }
      }
      if (!equalMap(incomingDepUsedSymbolsUpOld, incomingDep.usedSymbolsUp)) {
        changedDeps.add(incomingDep);
        incomingDep.usedSymbolsUpDirtyUp = true;
      }
      incomingDep.excluded = false;
      if (incomingDep.value.symbols != null && incomingDep.usedSymbolsUp.size === 0) {
        let assetGroups = assetGraph.getNodeIdsConnectedFrom(assetGraph.getNodeIdByContentKey(incomingDep.id));
        if (assetGroups.length === 1) {
          let [assetGroupId] = assetGroups;
          let assetGroup = (0, _nullthrows().default)(assetGraph.getNode(assetGroupId));
          if (assetGroup.type === 'asset_group' && assetGroup.value.sideEffects === false) {
            incomingDep.excluded = true;
          }
        } else {
          (0, _assert().default)(assetGroups.length === 0);
        }
      }
    }
    return errors;
  });

  // Sort usedSymbolsUp so they are a consistent order across builds.
  // This ensures a consistent ordering of these symbols when packaging.
  // See https://github.com/parcel-bundler/parcel/pull/8212
  for (let dep of changedDeps) {
    dep.usedSymbolsUp = new Map([...dep.usedSymbolsUp].sort(([a], [b]) => a.localeCompare(b)));
  }
  return errors;
}
function propagateSymbolsDown(assetGraph, changedAssets, assetGroupsWithRemovedParents, visit) {
  if (changedAssets.size === 0 && assetGroupsWithRemovedParents.size === 0) {
    return;
  }

  // We care about changed assets and their changed dependencies. So start with the first changed
  // asset or dependency and continue while the symbols change. If the queue becomes empty,
  // continue with the next unvisited changed asset.
  //
  // In the end, nodes, which are neither listed in changedAssets nor in
  // assetGroupsWithRemovedParents nor reached via a dirty flag, don't have to be visited at all.
  //
  // In the worst case, some nodes have to be revisited because we don't want to sort the assets
  // into topological order. For example in a diamond graph where the join point is visited twice
  // via each parent (the numbers signifiying the order of re/visiting, `...` being unvisited).
  // However, this only continues as long as there are changes in the used symbols that influence
  // child nodes.
  //
  //             |
  //            ...
  //          /     \
  //          1     4
  //          \     /
  //            2+5
  //             |
  //            3+6
  //             |
  //            ...
  //             |
  //

  let unreachedAssets = new Set([...changedAssets, ...assetGroupsWithRemovedParents]);
  let queue = new Set([setPop(unreachedAssets)]);
  while (queue.size > 0) {
    let queuedNodeId = setPop(queue);
    unreachedAssets.delete(queuedNodeId);
    let outgoing = assetGraph.getNodeIdsConnectedFrom(queuedNodeId);
    let node = (0, _nullthrows().default)(assetGraph.getNode(queuedNodeId));
    let wasNodeDirty = false;
    if (node.type === 'dependency' || node.type === 'asset_group') {
      wasNodeDirty = node.usedSymbolsDownDirty;
      node.usedSymbolsDownDirty = false;
    } else if (node.type === 'asset' && node.usedSymbolsDownDirty) {
      visit(node, assetGraph.getIncomingDependencies(node.value).map(d => {
        let dep = assetGraph.getNodeByContentKey(d.id);
        (0, _assert().default)(dep && dep.type === 'dependency');
        return dep;
      }), outgoing.map(dep => {
        let depNode = (0, _nullthrows().default)(assetGraph.getNode(dep));
        (0, _assert().default)(depNode.type === 'dependency');
        return depNode;
      }));
      node.usedSymbolsDownDirty = false;
    }
    for (let child of outgoing) {
      let childNode = (0, _nullthrows().default)(assetGraph.getNode(child));
      let childDirty = false;
      if ((childNode.type === 'asset' || childNode.type === 'asset_group') && wasNodeDirty) {
        childNode.usedSymbolsDownDirty = true;
        childDirty = true;
      } else if (childNode.type === 'dependency') {
        childDirty = childNode.usedSymbolsDownDirty;
      }
      if (childDirty) {
        queue.add(child);
      }
    }
    if (queue.size === 0 && unreachedAssets.size > 0) {
      queue.add(setPop(unreachedAssets));
    }
  }
}
function propagateSymbolsUp(assetGraph, changedAssets, changedDepsUsedSymbolsUpDirtyDown, previousErrors, visit) {
  var _dirtyDeps;
  // For graphs in general (so with cyclic dependencies), some nodes will have to be revisited. So
  // run a regular queue-based BFS for anything that's still dirty.
  //
  // (Previously, there was first a recursive post-order DFS, with the idea that all children of a
  // node should be processed first. With a tree, this would result in a minimal amount of work by
  // processing every asset exactly once and then the remaining cycles would have been handled
  // with the loop. This was slightly faster for initial builds but had O(project) instead of
  // O(changes).)

  let errors = previousErrors ?
  // Some nodes might have been removed since the last build
  new Map([...previousErrors].filter(([n]) => assetGraph.hasNode(n))) : new Map();
  let changedDepsUsedSymbolsUpDirtyDownAssets = new Set([...[...changedDepsUsedSymbolsUpDirtyDown].reverse().flatMap(id => getDependencyResolution(assetGraph, id)), ...changedAssets]);

  // Do a more efficient full traversal (less recomputations) if more than half of the assets
  // changed.
  let runFullPass =
  // If there are n nodes in the graph, then the asset count is approximately
  // n/6 (for every asset, there are ~4 dependencies and ~1 asset_group).
  assetGraph.nodes.size * (1 / 6) * 0.5 < changedDepsUsedSymbolsUpDirtyDownAssets.size;
  let dirtyDeps;
  if (runFullPass) {
    dirtyDeps = new Set();
    let rootNodeId = (0, _nullthrows().default)(assetGraph.rootNodeId, 'A root node is required to traverse');
    let visited = new Set([rootNodeId]);
    const walk = nodeId => {
      let node = (0, _nullthrows().default)(assetGraph.getNode(nodeId));
      let outgoing = assetGraph.getNodeIdsConnectedFrom(nodeId);
      for (let childId of outgoing) {
        if (!visited.has(childId)) {
          visited.add(childId);
          walk(childId);
          let child = (0, _nullthrows().default)(assetGraph.getNode(childId));
          if (node.type === 'asset') {
            (0, _assert().default)(child.type === 'dependency');
            if (child.usedSymbolsUpDirtyUp) {
              node.usedSymbolsUpDirty = true;
              child.usedSymbolsUpDirtyUp = false;
            }
          }
        }
      }
      if (node.type === 'asset') {
        let incoming = assetGraph.getIncomingDependencies(node.value).map(d => {
          let n = assetGraph.getNodeByContentKey(d.id);
          (0, _assert().default)(n && n.type === 'dependency');
          return n;
        });
        for (let dep of incoming) {
          if (dep.usedSymbolsUpDirtyDown) {
            dep.usedSymbolsUpDirtyDown = false;
            node.usedSymbolsUpDirty = true;
          }
        }
        if (node.usedSymbolsUpDirty) {
          let e = visit(node, incoming, outgoing.map(depNodeId => {
            let depNode = (0, _nullthrows().default)(assetGraph.getNode(depNodeId));
            (0, _assert().default)(depNode.type === 'dependency');
            return depNode;
          }));
          if (e.length > 0) {
            node.usedSymbolsUpDirty = true;
            errors.set(nodeId, e);
          } else {
            node.usedSymbolsUpDirty = false;
            errors.delete(nodeId);
          }
        }
      } else {
        if (node.type === 'dependency') {
          if (node.usedSymbolsUpDirtyUp) {
            dirtyDeps.add(nodeId);
          } else {
            dirtyDeps.delete(nodeId);
          }
        }
      }
    };
    walk(rootNodeId);
  }
  let queue = (_dirtyDeps = dirtyDeps) !== null && _dirtyDeps !== void 0 ? _dirtyDeps : changedDepsUsedSymbolsUpDirtyDownAssets;
  while (queue.size > 0) {
    let queuedNodeId = setPop(queue);
    let node = (0, _nullthrows().default)(assetGraph.getNode(queuedNodeId));
    if (node.type === 'asset') {
      let incoming = assetGraph.getIncomingDependencies(node.value).map(dep => {
        let depNode = assetGraph.getNodeByContentKey(dep.id);
        (0, _assert().default)(depNode && depNode.type === 'dependency');
        return depNode;
      });
      for (let dep of incoming) {
        if (dep.usedSymbolsUpDirtyDown) {
          dep.usedSymbolsUpDirtyDown = false;
          node.usedSymbolsUpDirty = true;
        }
      }
      let outgoing = assetGraph.getNodeIdsConnectedFrom(queuedNodeId).map(depNodeId => {
        let depNode = (0, _nullthrows().default)(assetGraph.getNode(depNodeId));
        (0, _assert().default)(depNode.type === 'dependency');
        return depNode;
      });
      for (let dep of outgoing) {
        if (dep.usedSymbolsUpDirtyUp) {
          node.usedSymbolsUpDirty = true;
          dep.usedSymbolsUpDirtyUp = false;
        }
      }
      if (node.usedSymbolsUpDirty) {
        let e = visit(node, incoming, outgoing);
        if (e.length > 0) {
          node.usedSymbolsUpDirty = true;
          errors.set(queuedNodeId, e);
        } else {
          node.usedSymbolsUpDirty = false;
          errors.delete(queuedNodeId);
        }
      }
      for (let i of incoming) {
        if (i.usedSymbolsUpDirtyUp) {
          queue.add(assetGraph.getNodeIdByContentKey(i.id));
        }
      }
    } else {
      let connectedNodes = assetGraph.getNodeIdsConnectedTo(queuedNodeId);
      if (connectedNodes.length > 0) {
        queue.add(...connectedNodes);
      }
    }
  }
  return errors;
}
function getDependencyResolution(graph, depId) {
  let depNodeId = graph.getNodeIdByContentKey(depId);
  let connected = graph.getNodeIdsConnectedFrom(depNodeId);
  (0, _assert().default)(connected.length <= 1);
  let child = connected[0];
  if (child) {
    let childNode = (0, _nullthrows().default)(graph.getNode(child));
    if (childNode.type === 'asset_group') {
      return graph.getNodeIdsConnectedFrom(child);
    } else {
      return [child];
    }
  }
  return [];
}
function equalMap(a, b) {
  if (a.size !== b.size) return false;
  for (let [k, v] of a) {
    if (!b.has(k)) return false;
    let vB = b.get(k);
    if ((vB === null || vB === void 0 ? void 0 : vB.asset) !== (v === null || v === void 0 ? void 0 : v.asset) || (vB === null || vB === void 0 ? void 0 : vB.symbol) !== (v === null || v === void 0 ? void 0 : v.symbol)) return false;
  }
  return true;
}
function setPop(set) {
  let v = (0, _nullthrows().default)(set.values().next().value);
  set.delete(v);
  return v;
}