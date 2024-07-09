"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _nullthrows() {
  const data = _interopRequireDefault(require("nullthrows"));
  _nullthrows = function () {
    return data;
  };
  return data;
}
function _core() {
  const data = require("@swc/core");
  _core = function () {
    return data;
  };
  return data;
}
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
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
function _sourceMap() {
  const data = _interopRequireDefault(require("@parcel/source-map"));
  _sourceMap = function () {
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
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = new (_plugin().Optimizer)({
  async loadConfig({
    config,
    options
  }) {
    let userConfig = await config.getConfigFrom(_path().default.join(options.projectRoot, 'index'), ['.terserrc', '.terserrc.js', '.terserrc.cjs', '.terserrc.mjs']);
    return userConfig === null || userConfig === void 0 ? void 0 : userConfig.contents;
  },
  async optimize({
    contents,
    map: originalMap,
    bundle,
    config: userConfig,
    options,
    getSourceMapReference
  }) {
    if (!bundle.env.shouldOptimize) {
      return {
        contents,
        map: originalMap
      };
    }
    let code = await (0, _utils().blobToString)(contents);
    let result;
    try {
      result = await (0, _core().transform)(code, {
        jsc: {
          target: 'es2022',
          minify: {
            mangle: true,
            compress: true,
            ...userConfig,
            toplevel: bundle.env.outputFormat === 'esmodule' || bundle.env.outputFormat === 'commonjs',
            module: bundle.env.outputFormat === 'esmodule'
          }
        },
        minify: true,
        sourceMaps: !!bundle.env.sourceMap,
        configFile: false,
        swcrc: false
      });
    } catch (err) {
      // SWC doesn't give us nice error objects, so we need to parse the message.
      let message = (0, _diagnostic().escapeMarkdown)(((0, _utils().stripAnsi)(err.message).split('\n').find(line => line.trim().length > 0) || '').trim().replace(/^(×|x)\s+/, ''));
      let location = err.message.match(/(?:╭─|,-)\[(\d+):(\d+)\]/);
      if (location) {
        let line = Number(location[1]);
        let col = Number(location[1]);
        let mapping = originalMap === null || originalMap === void 0 ? void 0 : originalMap.findClosestMapping(line, col);
        if (mapping && mapping.original && mapping.source) {
          let {
            source,
            original
          } = mapping;
          let filePath = _path().default.resolve(options.projectRoot, source);
          throw new (_diagnostic().default)({
            diagnostic: {
              message,
              origin: '@parcel/optimizer-swc',
              codeFrames: [{
                language: 'js',
                filePath,
                codeHighlights: [{
                  start: original,
                  end: original
                }]
              }]
            }
          });
        }
        let loc = {
          line: line,
          column: col
        };
        throw new (_diagnostic().default)({
          diagnostic: {
            message,
            origin: '@parcel/optimizer-swc',
            codeFrames: [{
              language: 'js',
              filePath: undefined,
              code,
              codeHighlights: [{
                start: loc,
                end: loc
              }]
            }]
          }
        });
      }
      throw err;
    }
    let sourceMap = null;
    let minifiedContents = (0, _nullthrows().default)(result.code);
    let resultMap = result.map;
    if (resultMap) {
      sourceMap = new (_sourceMap().default)(options.projectRoot);
      sourceMap.addVLQMap(JSON.parse(resultMap));
      if (originalMap) {
        sourceMap.extends(originalMap);
      }
      let sourcemapReference = await getSourceMapReference(sourceMap);
      if (sourcemapReference) {
        minifiedContents += `\n//# sourceMappingURL=${sourcemapReference}\n`;
      }
    }
    return {
      contents: minifiedContents,
      map: sourceMap
    };
  }
});
exports.default = _default;