"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
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
function _chromeTraceEvent() {
  const data = require("chrome-trace-event");
  _chromeTraceEvent = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// We need to maintain some state here to ensure we write to the same output, there should only be one
// instance of this reporter (this gets asserted below)
let tracer;
let writeStream = null;
function millisecondsToMicroseconds(milliseconds) {
  return Math.floor(milliseconds * 1000);
}

// TODO: extract this to utils as it's also used in packages/core/workers/src/WorkerFarm.js
function getTimeId() {
  let now = new Date();
  return String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
}
var _default = new (_plugin().Reporter)({
  report({
    event,
    options,
    logger
  }) {
    let filename;
    let filePath;
    switch (event.type) {
      case 'buildStart':
        (0, _assert().default)(tracer == null, 'Tracer multiple initialisation');
        tracer = new (_chromeTraceEvent().Tracer)();
        filename = `parcel-trace-${getTimeId()}.json`;
        filePath = _path().default.join(options.projectRoot, filename);
        (0, _assert().default)(writeStream == null, 'Trace write stream multiple initialisation');
        logger.info({
          message: `Writing trace to ${filename}. See https://parceljs.org/features/profiling/#analysing-traces for more information on working with traces.`
        });
        writeStream = options.outputFS.createWriteStream(filePath);
        (0, _nullthrows().default)(tracer).pipe((0, _nullthrows().default)(writeStream));
        break;
      case 'trace':
        // Due to potential race conditions at the end of the build, we ignore any trace events that occur
        // after we've closed the write stream.
        if (tracer === null) return;
        tracer.completeEvent({
          name: event.name,
          cat: event.categories,
          args: event.args,
          ts: millisecondsToMicroseconds(event.ts),
          dur: millisecondsToMicroseconds(event.duration),
          tid: event.tid,
          pid: event.pid
        });
        break;
      case 'buildSuccess':
      case 'buildFailure':
        (0, _nullthrows().default)(tracer).flush();
        // We explicitly trigger `end` on the writeStream for the trace, then we need to wait for
        // the `close` event before resolving the promise this report function returns to ensure
        // that the file has been properly closed and moved from it's temp location before Parcel
        // shuts down.
        return new Promise((resolve, reject) => {
          (0, _nullthrows().default)(writeStream).once('close', err => {
            writeStream = null;
            tracer = null;
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
          (0, _nullthrows().default)(writeStream).end();
        });
    }
  }
});
exports.default = _default;