"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _fs() {
  const data = require("@parcel/fs");
  _fs = function () {
    return data;
  };
  return data;
}
var _native = require("../native");
var _builtins = _interopRequireWildcard(require("./builtins"));
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
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
function _diagnostic() {
  const data = _interopRequireWildcard(require("@parcel/diagnostic"));
  _diagnostic = function () {
    return data;
  };
  return data;
}
function _semver() {
  const data = _interopRequireDefault(require("semver"));
  _semver = function () {
    return data;
  };
  return data;
}
function _jsonSourcemap() {
  const data = require("@mischnic/json-sourcemap");
  _jsonSourcemap = function () {
    return data;
  };
  return data;
}
function _module() {
  const data = _interopRequireDefault(require("module"));
  _module = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Package.json fields. Must match package_json.rs.
const MAIN = 1 << 0;
const MODULE = 1 << 1;
const SOURCE = 1 << 2;
const BROWSER = 1 << 3;
const TYPES = 1 << 6;
class NodeResolver {
  constructor(options) {
    this.options = options;
    this.resolversByEnv = new Map();
  }
  async resolve(options) {
    var _res$resolution;
    // Special case
    if (options.env.isElectron() && options.filename === 'electron') {
      return {
        isExcluded: true
      };
    }
    let resolver = this.resolversByEnv.get(options.env.id);
    if (!resolver) {
      var _this$options$package;
      await (_native.init === null || _native.init === void 0 ? void 0 : (0, _native.init)());
      resolver = new _native.Resolver(this.options.projectRoot, {
        fs: this.options.fs instanceof _fs().NodeFS && process.versions.pnp == null &&
        // For Wasm builds
        !_native.init ? undefined : {
          canonicalize: path => this.options.fs.realpathSync(path),
          read: path => this.options.fs.readFileSync(path),
          isFile: path => this.options.fs.statSync(path).isFile(),
          isDir: path => this.options.fs.statSync(path).isDirectory()
        },
        mode: 1,
        includeNodeModules: options.env.includeNodeModules,
        entries: this.options.mainFields ? mainFieldsToEntries(this.options.mainFields) : MAIN | MODULE | SOURCE | (options.env.isBrowser() ? BROWSER : 0),
        extensions: this.options.extensions,
        conditions: environmentToExportsConditions(options.env, this.options.mode),
        packageExports: (_this$options$package = this.options.packageExports) !== null && _this$options$package !== void 0 ? _this$options$package : false,
        moduleDirResolver: process.versions.pnp != null ? (module, from) => {
          // $FlowFixMe[prop-missing]
          let pnp = _module().default.findPnpApi(_path().default.dirname(from));
          return pnp.resolveToUnqualified(
          // append slash to force loading builtins from npm
          module + '/', from);
        } : undefined
      });
      this.resolversByEnv.set(options.env.id, resolver);
    }

    // Special case for entries. Convert absolute paths to relative from project root.
    if (options.parent == null) {
      options.parent = _path().default.join(this.options.projectRoot, 'index');
      if (_path().default.isAbsolute(options.filename)) {
        options.filename = (0, _utils().relativePath)(this.options.projectRoot, options.filename);
      }
    }

    // $FlowFixMe[incompatible-call] - parent is not null here.
    let res = resolver.resolve(options);

    // Invalidate whenever the .pnp.js file changes.
    // TODO: only when we actually resolve a node_modules package?
    if (process.versions.pnp != null && options.parent && res.invalidateOnFileChange) {
      // $FlowFixMe[prop-missing]
      let pnp = _module().default.findPnpApi(_path().default.dirname(options.parent));
      res.invalidateOnFileChange.push(pnp.resolveToUnqualified('pnpapi', null));
    }
    if (res.error) {
      let diagnostic = await this.handleError(res.error, options);
      return {
        diagnostics: Array.isArray(diagnostic) ? diagnostic : diagnostic ? [diagnostic] : [],
        invalidateOnFileCreate: res.invalidateOnFileCreate,
        invalidateOnFileChange: res.invalidateOnFileChange
      };
    }
    switch ((_res$resolution = res.resolution) === null || _res$resolution === void 0 ? void 0 : _res$resolution.type) {
      case 'Path':
        return {
          filePath: res.resolution.value,
          invalidateOnFileCreate: res.invalidateOnFileCreate,
          invalidateOnFileChange: res.invalidateOnFileChange,
          sideEffects: res.sideEffects,
          query: res.query != null ? new URLSearchParams(res.query) : undefined
        };
      case 'Builtin':
        return this.resolveBuiltin(res.resolution.value, options);
      case 'External':
        {
          if (options.sourcePath && options.env.isLibrary && options.specifierType !== 'url') {
            let diagnostic = await this.checkExcludedDependency(options.sourcePath, options.filename, options);
            if (diagnostic) {
              return {
                diagnostics: [diagnostic],
                invalidateOnFileCreate: res.invalidateOnFileCreate,
                invalidateOnFileChange: res.invalidateOnFileChange
              };
            }
          }
          return {
            isExcluded: true,
            invalidateOnFileCreate: res.invalidateOnFileCreate,
            invalidateOnFileChange: res.invalidateOnFileChange
          };
        }
      case 'Empty':
        return {
          filePath: _builtins.empty,
          invalidateOnFileCreate: res.invalidateOnFileCreate,
          invalidateOnFileChange: res.invalidateOnFileChange
        };
      case 'Global':
        {
          let global = res.resolution.value;
          return {
            filePath: _path().default.join(this.options.projectRoot, `${global}.js`),
            code: `module.exports=${global};`,
            invalidateOnFileCreate: res.invalidateOnFileCreate,
            invalidateOnFileChange: res.invalidateOnFileChange
          };
        }
      default:
        return null;
    }
  }
  async resolveBuiltin(name, options) {
    if (options.env.isNode()) {
      return {
        isExcluded: true
      };
    }

    // By default, exclude node builtins from libraries unless explicitly opted in.
    if (options.env.isLibrary && this.shouldIncludeNodeModule(options.env, name) !== true) {
      return {
        isExcluded: true
      };
    }
    let builtin = _builtins.default[name];
    if (!builtin || builtin.name === _builtins.empty) {
      return {
        filePath: _builtins.empty
      };
    }
    let resolved = await this.resolve({
      ...options,
      filename: builtin.name
    });

    // Autoinstall/verify version of builtin polyfills
    if (builtin.range != null) {
      // This assumes that there are no polyfill packages that are scoped
      // Append '/' to force this.packageManager to look up the package in node_modules
      let packageName = builtin.name.split('/')[0] + '/';
      let packageManager = this.options.packageManager;
      if ((resolved === null || resolved === void 0 ? void 0 : resolved.filePath) == null) {
        // Auto install the Node builtin polyfills
        if (this.options.shouldAutoInstall && packageManager) {
          var _this$options$logger;
          (_this$options$logger = this.options.logger) === null || _this$options$logger === void 0 ? void 0 : _this$options$logger.warn({
            message: (0, _diagnostic().md)`Auto installing polyfill for Node builtin module "${packageName}"...`,
            codeFrames: options.loc ? [{
              filePath: options.loc.filePath,
              codeHighlights: options.loc ? [(0, _diagnostic().convertSourceLocationToHighlight)(options.loc, 'used here')] : []
            }] : [],
            documentationURL: 'https://parceljs.org/features/node-emulation/#polyfilling-%26-excluding-builtin-node-modules'
          });
          await packageManager.resolve(packageName, this.options.projectRoot + '/index', {
            saveDev: true,
            shouldAutoInstall: true,
            range: builtin.range
          });

          // Need to clear the resolver caches after installing the package
          this.resolversByEnv.clear();

          // Re-resolve
          return this.resolve({
            ...options,
            filename: builtin.name,
            parent: this.options.projectRoot + '/index'
          });
        } else {
          throw new (_diagnostic().default)({
            diagnostic: {
              message: (0, _diagnostic().md)`Node builtin polyfill "${packageName}" is not installed, but auto install is disabled.`,
              codeFrames: options.loc ? [{
                filePath: options.loc.filePath,
                codeHighlights: [(0, _diagnostic().convertSourceLocationToHighlight)(options.loc, 'used here')]
              }] : [],
              documentationURL: 'https://parceljs.org/features/node-emulation/#polyfilling-%26-excluding-builtin-node-modules',
              hints: [(0, _diagnostic().md)`Install the "${packageName}" package with your package manager, and run Parcel again.`]
            }
          });
        }
      } else if (builtin.range != null) {
        // Assert correct version
        try {
          // TODO packageManager can be null for backwards compatibility, but that could cause invalid
          // resolutions in monorepos
          await (packageManager === null || packageManager === void 0 ? void 0 : packageManager.resolve(packageName, this.options.projectRoot + '/index', {
            saveDev: true,
            shouldAutoInstall: this.options.shouldAutoInstall,
            range: builtin.range
          }));
        } catch (e) {
          var _this$options$logger2;
          (_this$options$logger2 = this.options.logger) === null || _this$options$logger2 === void 0 ? void 0 : _this$options$logger2.warn((0, _diagnostic().errorToDiagnostic)(e));
        }
      }
    }
    return resolved;
  }
  shouldIncludeNodeModule({
    includeNodeModules
  }, name) {
    if (includeNodeModules === false) {
      return false;
    }
    if (Array.isArray(includeNodeModules)) {
      let [moduleName] = (0, _utils().getModuleParts)(name);
      return includeNodeModules.includes(moduleName);
    }
    if (includeNodeModules && typeof includeNodeModules === 'object') {
      let [moduleName] = (0, _utils().getModuleParts)(name);
      let include = includeNodeModules[moduleName];
      if (include != null) {
        return !!include;
      }
    }
  }
  async handleError(error, options) {
    switch (error.type) {
      case 'FileNotFound':
        {
          let dir = _path().default.dirname(error.from);
          let relative = error.relative;
          if (!relative.startsWith('.')) {
            relative = './' + relative;
          }
          let potentialFiles = await (0, _utils().findAlternativeFiles)(this.options.fs, relative, dir, this.options.projectRoot, true, options.specifierType !== 'url'
          // extensions.length === 0,
          );

          return {
            message: (0, _diagnostic().md)`Cannot load file '${relative}' in '${(0, _utils().relativePath)(this.options.projectRoot, dir)}'.`,
            hints: potentialFiles.map(r => {
              return `Did you mean '__${r}__'?`;
            })
          };
        }
      case 'ModuleNotFound':
        {
          let alternativeModules = await (0, _utils().findAlternativeNodeModules)(this.options.fs, error.module, options.parent ? _path().default.dirname(options.parent) : this.options.projectRoot);
          return {
            message: (0, _diagnostic().md)`Cannot find module '${error.module}'`,
            hints: alternativeModules.map(r => {
              return `Did you mean '__${r}__'?`;
            })
          };
        }
      case 'ModuleEntryNotFound':
        {
          let dir = _path().default.dirname(error.package_path);
          let fileSpecifier = (0, _utils().relativePath)(dir, _path().default.normalize(error.entry_path));
          let alternatives = await (0, _utils().findAlternativeFiles)(this.options.fs, fileSpecifier, dir, this.options.projectRoot);
          let alternative = alternatives[0];
          let pkgContent = await this.options.fs.readFile(error.package_path, 'utf8');
          return {
            message: (0, _diagnostic().md)`Could not load '${fileSpecifier}' from module '${error.module}' found in package.json#${error.field}`,
            codeFrames: [{
              filePath: error.package_path,
              language: 'json',
              code: pkgContent,
              codeHighlights: (0, _diagnostic().generateJSONCodeHighlights)(pkgContent, [{
                key: `/${error.field}`,
                type: 'value',
                message: (0, _diagnostic().md)`'${fileSpecifier}' does not exist${alternative ? `, did you mean '${alternative}'?` : ''}'`
              }])
            }]
          };
        }
      case 'ModuleSubpathNotFound':
        {
          let dir = _path().default.dirname(error.package_path);
          let relative = (0, _utils().relativePath)(dir, error.path, false);
          let pkgContent = await this.options.fs.readFile(error.package_path, 'utf8');
          let pkg = JSON.parse(pkgContent);
          let potentialFiles = [];
          if (!pkg.exports) {
            potentialFiles = await (0, _utils().findAlternativeFiles)(this.options.fs, relative, dir, this.options.projectRoot, false);
          }
          if (!relative.startsWith('.')) {
            relative = './' + relative;
          }
          return {
            message: (0, _diagnostic().md)`Cannot load file '${relative}' from module '${error.module}'`,
            hints: potentialFiles.map(r => {
              return `Did you mean '__${error.module}/${r}__'?`;
            })
          };
        }
      case 'JsonError':
        {
          let pkgContent = await this.options.fs.readFile(error.path, 'utf8');
          return {
            message: 'Error parsing JSON',
            codeFrames: [{
              filePath: error.path,
              language: 'json',
              code: pkgContent,
              // TODO
              codeHighlights: [{
                message: error.message,
                start: {
                  line: error.line,
                  column: error.column
                },
                end: {
                  line: error.line,
                  column: error.column
                }
              }]
            }]
          };
        }
      case 'InvalidSpecifier':
        {
          switch (error.kind) {
            case 'EmptySpecifier':
              return {
                message: 'Invalid empty specifier'
              };
            case 'InvalidPackageSpecifier':
              return {
                message: 'Invalid package specifier'
              };
            case 'InvalidFileUrl':
              return {
                message: 'Invalid file url'
              };
            case 'UrlError':
              return {
                message: `Invalid URL: ${error.value}`
              };
            default:
              throw new Error('Unknown specifier error kind');
          }
        }
      case 'UnknownScheme':
        {
          return {
            message: (0, _diagnostic().md)`Unknown url scheme or pipeline '${error.scheme}:'`
          };
        }
      case 'PackageJsonError':
        {
          let pkgContent = await this.options.fs.readFile(error.path, 'utf8');
          // TODO: find alternative exports?
          switch (error.error) {
            case 'PackagePathNotExported':
              {
                return {
                  message: (0, _diagnostic().md)`Module '${options.filename}' is not exported from the '${error.module}' package`,
                  codeFrames: [{
                    filePath: error.path,
                    language: 'json',
                    code: pkgContent,
                    codeHighlights: (0, _diagnostic().generateJSONCodeHighlights)(pkgContent, [{
                      key: `/exports`,
                      type: 'value'
                    }])
                  }]
                };
              }
            case 'ImportNotDefined':
              {
                let parsed = (0, _jsonSourcemap().parse)(pkgContent);
                return {
                  message: (0, _diagnostic().md)`Package import '${options.filename}' is not defined in the '${error.module}' package`,
                  codeFrames: [{
                    filePath: error.path,
                    language: 'json',
                    code: pkgContent,
                    codeHighlights: parsed.pointers['/imports'] ? (0, _diagnostic().generateJSONCodeHighlights)(parsed, [{
                      key: `/imports`,
                      type: 'value'
                    }]) : []
                  }]
                };
              }
            case 'InvalidPackageTarget':
              {
                return {
                  message: (0, _diagnostic().md)`Invalid package target in the '${error.module} package. Targets may not refer to files outside the package.`,
                  codeFrames: [{
                    filePath: error.path,
                    language: 'json',
                    code: pkgContent,
                    codeHighlights: (0, _diagnostic().generateJSONCodeHighlights)(pkgContent, [{
                      // TODO: track exact location.
                      key: `/exports`,
                      type: 'value'
                    }])
                  }]
                };
              }
            case 'InvalidSpecifier':
              {
                return {
                  message: (0, _diagnostic().md)`Invalid package import specifier '${options.filename}'.`
                };
              }
          }
          break;
        }
      case 'PackageJsonNotFound':
        {
          return {
            message: (0, _diagnostic().md)`Cannot find a package.json above '${(0, _utils().relativePath)(this.options.projectRoot, options.parent ? _path().default.dirname(options.parent) : this.options.projectRoot)}'`
          };
        }
      case 'TsConfigExtendsNotFound':
        {
          let tsconfigContent = await this.options.fs.readFile(error.tsconfig, 'utf8');
          let nested = await this.handleError(error.error, options);
          return [{
            message: 'Could not find extended tsconfig',
            codeFrames: [{
              filePath: error.tsconfig,
              language: 'json',
              code: tsconfigContent,
              codeHighlights: (0, _diagnostic().generateJSONCodeHighlights)(tsconfigContent, [{
                key: `/extends`,
                type: 'value'
              }])
            }]
          }, ...(Array.isArray(nested) ? nested : nested ? [nested] : [])];
        }
      case 'IOError':
        {
          return {
            message: error.message
          };
        }
    }
  }
  async checkExcludedDependency(sourceFile, name, options) {
    var _pkg$dependencies, _pkg$peerDependencies, _pkg$engines;
    let [moduleName] = (0, _utils().getModuleParts)(name);
    let res = await (0, _utils().loadConfig)(this.options.fs, sourceFile, ['package.json'], this.options.projectRoot,
    // By default, loadConfig uses JSON5. Use normal JSON for package.json files
    // since they don't support comments and JSON.parse is faster.
    {
      parser: (...args) => JSON.parse(...args)
    });
    if (!res) {
      return;
    }
    let pkg = res.config;
    let pkgfile = res.files[0].filePath;
    if (!((_pkg$dependencies = pkg.dependencies) !== null && _pkg$dependencies !== void 0 && _pkg$dependencies[moduleName]) && !((_pkg$peerDependencies = pkg.peerDependencies) !== null && _pkg$peerDependencies !== void 0 && _pkg$peerDependencies[moduleName]) && !((_pkg$engines = pkg.engines) !== null && _pkg$engines !== void 0 && _pkg$engines[moduleName])) {
      let pkgContent = await this.options.fs.readFile(pkgfile, 'utf8');
      return {
        message: (0, _diagnostic().md)`External dependency "${moduleName}" is not declared in package.json.`,
        codeFrames: [{
          filePath: pkgfile,
          language: 'json',
          code: pkgContent,
          codeHighlights: pkg.dependencies ? (0, _diagnostic().generateJSONCodeHighlights)(pkgContent, [{
            key: `/dependencies`,
            type: 'key'
          }]) : [{
            start: {
              line: 1,
              column: 1
            },
            end: {
              line: 1,
              column: 1
            }
          }]
        }],
        hints: [`Add "${moduleName}" as a dependency.`]
      };
    }
    if (options.range) {
      var _pkg$dependencies2, _pkg$peerDependencies2;
      let range = options.range;
      let depRange = ((_pkg$dependencies2 = pkg.dependencies) === null || _pkg$dependencies2 === void 0 ? void 0 : _pkg$dependencies2[moduleName]) || ((_pkg$peerDependencies2 = pkg.peerDependencies) === null || _pkg$peerDependencies2 === void 0 ? void 0 : _pkg$peerDependencies2[moduleName]);
      if (depRange && !_semver().default.intersects(depRange, range)) {
        var _pkg$dependencies3;
        let pkgContent = await this.options.fs.readFile(pkgfile, 'utf8');
        let field = (_pkg$dependencies3 = pkg.dependencies) !== null && _pkg$dependencies3 !== void 0 && _pkg$dependencies3[moduleName] ? 'dependencies' : 'peerDependencies';
        return {
          message: (0, _diagnostic().md)`External dependency "${moduleName}" does not satisfy required semver range "${range}".`,
          codeFrames: [{
            filePath: pkgfile,
            language: 'json',
            code: pkgContent,
            codeHighlights: (0, _diagnostic().generateJSONCodeHighlights)(pkgContent, [{
              key: `/${field}/${(0, _diagnostic().encodeJSONKeyComponent)(moduleName)}`,
              type: 'value',
              message: 'Found this conflicting requirement.'
            }])
          }],
          hints: [`Update the dependency on "${moduleName}" to satisfy "${range}".`]
        };
      }
    }
  }
}
exports.default = NodeResolver;
function environmentToExportsConditions(env, mode) {
  // These must match the values in package_json.rs.

  let conditions = 0;
  if (env.isBrowser()) {
    conditions |= 1 << 4;
  }
  if (env.isWorker()) {
    conditions |= 1 << 5;
  }
  if (env.isWorklet()) {
    conditions |= 1 << 6;
  }
  if (env.isElectron()) {
    conditions |= 1 << 7;
  }
  if (env.isNode()) {
    conditions |= 1 << 3;
  }
  if (mode === 'production') {
    conditions |= 1 << 9;
  } else if (mode === 'development') {
    conditions |= 1 << 8;
  }
  return conditions;
}
function mainFieldsToEntries(mainFields) {
  let entries = 0;
  for (let field of mainFields) {
    switch (field) {
      case 'main':
        entries |= MAIN;
        break;
      case 'module':
        entries |= MODULE;
        break;
      case 'source':
        entries |= SOURCE;
        break;
      case 'browser':
        entries |= BROWSER;
        break;
      case 'types':
        entries |= TYPES;
        break;
      default:
        throw new Error(`Unsupported main field "${field}"`);
    }
  }
  return entries;
}