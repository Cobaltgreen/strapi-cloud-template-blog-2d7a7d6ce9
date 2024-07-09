"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
    return data;
  };
  return data;
}
function _nodeResolverCore() {
  const data = _interopRequireDefault(require("@parcel/node-resolver-core"));
  _nodeResolverCore = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Throw user friendly errors on special webpack loader syntax
// ex. `imports-loader?$=jquery!./example.js`
const WEBPACK_IMPORT_REGEX = /^\w+-loader(?:\?\S*)?!/;
var _default = new (_plugin().Resolver)({
  async loadConfig({
    config,
    options,
    logger
  }) {
    var _conf$contents$packag, _conf$contents;
    let conf = await config.getConfig([], {
      packageKey: '@parcel/resolver-default'
    });
    return new (_nodeResolverCore().default)({
      fs: options.inputFS,
      projectRoot: options.projectRoot,
      packageManager: options.packageManager,
      shouldAutoInstall: options.shouldAutoInstall,
      logger,
      packageExports: (_conf$contents$packag = conf === null || conf === void 0 ? void 0 : (_conf$contents = conf.contents) === null || _conf$contents === void 0 ? void 0 : _conf$contents.packageExports) !== null && _conf$contents$packag !== void 0 ? _conf$contents$packag : false
    });
  },
  resolve({
    dependency,
    specifier,
    config: resolver
  }) {
    if (WEBPACK_IMPORT_REGEX.test(dependency.specifier)) {
      throw new Error(`The import path: ${dependency.specifier} is using webpack specific loader import syntax, which isn't supported by Parcel.`);
    }
    return resolver.resolve({
      filename: specifier,
      specifierType: dependency.specifierType,
      range: dependency.range,
      parent: dependency.resolveFrom,
      env: dependency.env,
      sourcePath: dependency.sourcePath,
      loc: dependency.loc,
      packageConditions: dependency.packageConditions
    });
  }
});
exports.default = _default;