var $5VgCY$fs = require("fs");
var $5VgCY$child_process = require("child_process");
var $5VgCY$path = require("path");
var $5VgCY$stream = require("stream");
var $5VgCY$events = require("events");
var $5VgCY$buffer = require("buffer");
var $5VgCY$util = require("util");
var $5VgCY$parcelcore = require("@parcel/core");
var $5VgCY$parceldiagnostic = require("@parcel/diagnostic");
var $5VgCY$parcelfs = require("@parcel/fs");
var $5VgCY$module = require("module");
var $5VgCY$semver = require("semver");
var $5VgCY$parcellogger = require("@parcel/logger");
var $5VgCY$parcelutils = require("@parcel/utils");
var $5VgCY$parcelnoderesolvercore = require("@parcel/node-resolver-core");
var $5VgCY$url = require("url");
var $5VgCY$assert = require("assert");
var $5VgCY$parcelworkers = require("@parcel/workers");
var $5VgCY$string_decoder = require("string_decoder");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire0b48"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire0b48"] = parcelRequire;
}
parcelRequire.register("kbPbH", function(module, exports) {
module.exports = $eb2c8a8c861b77cd$var$isexe;
$eb2c8a8c861b77cd$var$isexe.sync = $eb2c8a8c861b77cd$var$sync;

function $eb2c8a8c861b77cd$var$checkPathExt(path, options) {
    var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
    if (!pathext) return true;
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) return true;
    for(var i = 0; i < pathext.length; i++){
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) return true;
    }
    return false;
}
function $eb2c8a8c861b77cd$var$checkStat(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) return false;
    return $eb2c8a8c861b77cd$var$checkPathExt(path, options);
}
function $eb2c8a8c861b77cd$var$isexe(path, options, cb) {
    $5VgCY$fs.stat(path, function(er, stat) {
        cb(er, er ? false : $eb2c8a8c861b77cd$var$checkStat(stat, path, options));
    });
}
function $eb2c8a8c861b77cd$var$sync(path, options) {
    return $eb2c8a8c861b77cd$var$checkStat($5VgCY$fs.statSync(path), path, options);
}

});

parcelRequire.register("hW7mX", function(module, exports) {
module.exports = $d0ed91d357a2b7ea$var$isexe;
$d0ed91d357a2b7ea$var$isexe.sync = $d0ed91d357a2b7ea$var$sync;

function $d0ed91d357a2b7ea$var$isexe(path, options, cb) {
    $5VgCY$fs.stat(path, function(er, stat) {
        cb(er, er ? false : $d0ed91d357a2b7ea$var$checkStat(stat, options));
    });
}
function $d0ed91d357a2b7ea$var$sync(path, options) {
    return $d0ed91d357a2b7ea$var$checkStat($5VgCY$fs.statSync(path), options);
}
function $d0ed91d357a2b7ea$var$checkStat(stat, options) {
    return stat.isFile() && $d0ed91d357a2b7ea$var$checkMode(stat, options);
}
function $d0ed91d357a2b7ea$var$checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
}

});

parcelRequire.register("hjhEx", function(module, exports) {
"use strict";
module.exports = (opts)=>{
    opts = opts || {};
    const env = opts.env || process.env;
    const platform = opts.platform || process.platform;
    if (platform !== "win32") return "PATH";
    return Object.keys(env).find((x)=>x.toUpperCase() === "PATH") || "Path";
};

});

parcelRequire.register("doLll", function(module, exports) {
"use strict";

var $9c123da95397c743$require$exec = $5VgCY$child_process.exec;

var $9c123da95397c743$require$execSync = $5VgCY$child_process.execSync;


var $9c123da95397c743$var$access = $5VgCY$fs.access;
var $9c123da95397c743$var$accessSync = $5VgCY$fs.accessSync;
var $9c123da95397c743$var$constants = $5VgCY$fs.constants || $5VgCY$fs;
var $9c123da95397c743$var$isUsingWindows = process.platform == "win32";
var $9c123da95397c743$var$fileNotExists = function(commandName, callback) {
    $9c123da95397c743$var$access(commandName, $9c123da95397c743$var$constants.F_OK, function(err) {
        callback(!err);
    });
};
var $9c123da95397c743$var$fileNotExistsSync = function(commandName) {
    try {
        $9c123da95397c743$var$accessSync(commandName, $9c123da95397c743$var$constants.F_OK);
        return false;
    } catch (e) {
        return true;
    }
};
var $9c123da95397c743$var$localExecutable = function(commandName, callback) {
    $9c123da95397c743$var$access(commandName, $9c123da95397c743$var$constants.F_OK | $9c123da95397c743$var$constants.X_OK, function(err) {
        callback(null, !err);
    });
};
var $9c123da95397c743$var$localExecutableSync = function(commandName) {
    try {
        $9c123da95397c743$var$accessSync(commandName, $9c123da95397c743$var$constants.F_OK | $9c123da95397c743$var$constants.X_OK);
        return true;
    } catch (e) {
        return false;
    }
};
var $9c123da95397c743$var$commandExistsUnix = function(commandName, cleanedCommandName, callback) {
    $9c123da95397c743$var$fileNotExists(commandName, function(isFile) {
        if (!isFile) {
            var child = $9c123da95397c743$require$exec("command -v " + cleanedCommandName + " 2>/dev/null" + " && { echo >&1 " + cleanedCommandName + "; exit 0; }", function(error, stdout, stderr) {
                callback(null, !!stdout);
            });
            return;
        }
        $9c123da95397c743$var$localExecutable(commandName, callback);
    });
};
var $9c123da95397c743$var$commandExistsWindows = function(commandName, cleanedCommandName, callback) {
    // Regex from Julio from: https://stackoverflow.com/questions/51494579/regex-windows-path-validator
    if (!/^(?!(?:.*\s|.*\.|\W+)$)(?:[a-zA-Z]:)?(?:(?:[^<>:"\|\?\*\n])+(?:\/\/|\/|\\\\|\\)?)+$/m.test(commandName)) {
        callback(null, false);
        return;
    }
    var child = $9c123da95397c743$require$exec("where " + cleanedCommandName, function(error) {
        if (error !== null) callback(null, false);
        else callback(null, true);
    });
};
var $9c123da95397c743$var$commandExistsUnixSync = function(commandName, cleanedCommandName) {
    if ($9c123da95397c743$var$fileNotExistsSync(commandName)) try {
        var stdout = $9c123da95397c743$require$execSync("command -v " + cleanedCommandName + " 2>/dev/null" + " && { echo >&1 " + cleanedCommandName + "; exit 0; }");
        return !!stdout;
    } catch (error) {
        return false;
    }
    return $9c123da95397c743$var$localExecutableSync(commandName);
};
var $9c123da95397c743$var$commandExistsWindowsSync = function(commandName, cleanedCommandName, callback) {
    // Regex from Julio from: https://stackoverflow.com/questions/51494579/regex-windows-path-validator
    if (!/^(?!(?:.*\s|.*\.|\W+)$)(?:[a-zA-Z]:)?(?:(?:[^<>:"\|\?\*\n])+(?:\/\/|\/|\\\\|\\)?)+$/m.test(commandName)) return false;
    try {
        var stdout = $9c123da95397c743$require$execSync("where " + cleanedCommandName, {
            stdio: []
        });
        return !!stdout;
    } catch (error) {
        return false;
    }
};
var $9c123da95397c743$var$cleanInput = function(s) {
    if (/[^A-Za-z0-9_\/:=-]/.test(s)) {
        s = "'" + s.replace(/'/g, "'\\''") + "'";
        s = s.replace(/^(?:'')+/g, "") // unduplicate single-quote at the beginning
        .replace(/\\'''/g, "\\'"); // remove non-escaped single-quote if there are enclosed between 2 escaped
    }
    return s;
};
if ($9c123da95397c743$var$isUsingWindows) $9c123da95397c743$var$cleanInput = function(s) {
    var isPathName = /[\\]/.test(s);
    if (isPathName) {
        var dirname = '"' + $5VgCY$path.dirname(s) + '"';
        var basename = '"' + $5VgCY$path.basename(s) + '"';
        return dirname + ":" + basename;
    }
    return '"' + s + '"';
};
module.exports = function commandExists(commandName, callback) {
    var cleanedCommandName = $9c123da95397c743$var$cleanInput(commandName);
    if (!callback && typeof Promise !== "undefined") return new Promise(function(resolve, reject) {
        commandExists(commandName, function(error, output) {
            if (output) resolve(commandName);
            else reject(error);
        });
    });
    if ($9c123da95397c743$var$isUsingWindows) $9c123da95397c743$var$commandExistsWindows(commandName, cleanedCommandName, callback);
    else $9c123da95397c743$var$commandExistsUnix(commandName, cleanedCommandName, callback);
};
module.exports.sync = function(commandName) {
    var cleanedCommandName = $9c123da95397c743$var$cleanInput(commandName);
    if ($9c123da95397c743$var$isUsingWindows) return $9c123da95397c743$var$commandExistsWindowsSync(commandName, cleanedCommandName);
    else return $9c123da95397c743$var$commandExistsUnixSync(commandName, cleanedCommandName);
};

});

parcelRequire.register("dMi1x", function(module, exports) {








if (process.env.READABLE_STREAM === "disable" && $5VgCY$stream) {
    module.exports = $5VgCY$stream.Readable;
    Object.assign(module.exports, $5VgCY$stream);
    module.exports.Stream = $5VgCY$stream;
} else {
    exports = module.exports = (parcelRequire("1AM0g"));
    exports.Stream = $5VgCY$stream || exports;
    exports.Readable = exports;
    exports.Writable = (parcelRequire("5rzHA"));
    exports.Duplex = (parcelRequire("lWLE4"));
    exports.Transform = (parcelRequire("25qY5"));
    exports.PassThrough = (parcelRequire("1EHdT"));
    exports.finished = (parcelRequire("hKh6s"));
    exports.pipeline = (parcelRequire("2CGpz"));
}

});
parcelRequire.register("1AM0g", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
module.exports = $128e63aad4db5ad2$var$Readable;
/*<replacement>*/ var $128e63aad4db5ad2$var$Duplex;
/*</replacement>*/ $128e63aad4db5ad2$var$Readable.ReadableState = $128e63aad4db5ad2$var$ReadableState;

var $128e63aad4db5ad2$require$EE = $5VgCY$events.EventEmitter;
var $128e63aad4db5ad2$var$EElistenerCount = function EElistenerCount(emitter, type) {
    return emitter.listeners(type).length;
};

var $dFjLx = parcelRequire("dFjLx");

var $128e63aad4db5ad2$require$Buffer = $5VgCY$buffer.Buffer;
var $128e63aad4db5ad2$var$OurUint8Array = $parcel$global.Uint8Array || function() {};
function $128e63aad4db5ad2$var$_uint8ArrayToBuffer(chunk) {
    return $128e63aad4db5ad2$require$Buffer.from(chunk);
}
function $128e63aad4db5ad2$var$_isUint8Array(obj) {
    return $128e63aad4db5ad2$require$Buffer.isBuffer(obj) || obj instanceof $128e63aad4db5ad2$var$OurUint8Array;
}

var $128e63aad4db5ad2$var$debug;
if ($5VgCY$util && $5VgCY$util.debuglog) $128e63aad4db5ad2$var$debug = $5VgCY$util.debuglog("stream");
else $128e63aad4db5ad2$var$debug = function debug() {};

var $anhJ2 = parcelRequire("anhJ2");

var $7dLEb = parcelRequire("7dLEb");

var $ftBwG = parcelRequire("ftBwG");
var $128e63aad4db5ad2$var$getHighWaterMark = $ftBwG.getHighWaterMark;

var $9cCav = parcelRequire("9cCav");
var $128e63aad4db5ad2$require$_require$codes = $9cCav.codes;
var $128e63aad4db5ad2$var$ERR_INVALID_ARG_TYPE = $128e63aad4db5ad2$require$_require$codes.ERR_INVALID_ARG_TYPE, $128e63aad4db5ad2$var$ERR_STREAM_PUSH_AFTER_EOF = $128e63aad4db5ad2$require$_require$codes.ERR_STREAM_PUSH_AFTER_EOF, $128e63aad4db5ad2$var$ERR_METHOD_NOT_IMPLEMENTED = $128e63aad4db5ad2$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $128e63aad4db5ad2$var$ERR_STREAM_UNSHIFT_AFTER_END_EVENT = $128e63aad4db5ad2$require$_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.
var $128e63aad4db5ad2$var$StringDecoder;
var $128e63aad4db5ad2$var$createReadableStreamAsyncIterator;
var $128e63aad4db5ad2$var$from;

(parcelRequire("bo0qS"))($128e63aad4db5ad2$var$Readable, $dFjLx);
var $128e63aad4db5ad2$var$errorOrDestroy = $7dLEb.errorOrDestroy;
var $128e63aad4db5ad2$var$kProxyEvents = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
];
function $128e63aad4db5ad2$var$prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [
        fn,
        emitter._events[event]
    ];
}


function $128e63aad4db5ad2$var$ReadableState(options, stream, isDuplex) {
    $128e63aad4db5ad2$var$Duplex = $128e63aad4db5ad2$var$Duplex || (parcelRequire("lWLE4"));
    options = options || {}; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof $128e63aad4db5ad2$var$Duplex; // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    this.highWaterMark = $128e63aad4db5ad2$var$getHighWaterMark(this, options, "readableHighWaterMark", isDuplex); // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new $anhJ2();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    this.sync = true; // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')
    this.autoDestroy = !!options.autoDestroy; // has it been destroyed
    this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || "utf8"; // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
        if (!$128e63aad4db5ad2$var$StringDecoder) $128e63aad4db5ad2$var$StringDecoder = (parcelRequire("gqFDJ")).StringDecoder;
        this.decoder = new $128e63aad4db5ad2$var$StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}

function $128e63aad4db5ad2$var$Readable(options) {
    $128e63aad4db5ad2$var$Duplex = $128e63aad4db5ad2$var$Duplex || (parcelRequire("lWLE4"));
    if (!(this instanceof $128e63aad4db5ad2$var$Readable)) return new $128e63aad4db5ad2$var$Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
    // the ReadableState constructor, at least with V8 6.5
    var isDuplex = this instanceof $128e63aad4db5ad2$var$Duplex;
    this._readableState = new $128e63aad4db5ad2$var$ReadableState(options, this, isDuplex); // legacy
    this.readable = true;
    if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
    }
    $dFjLx.call(this);
}
Object.defineProperty($128e63aad4db5ad2$var$Readable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined) return false;
        return this._readableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
    }
});
$128e63aad4db5ad2$var$Readable.prototype.destroy = $7dLEb.destroy;
$128e63aad4db5ad2$var$Readable.prototype._undestroy = $7dLEb.undestroy;
$128e63aad4db5ad2$var$Readable.prototype._destroy = function(err, cb) {
    cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
$128e63aad4db5ad2$var$Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
        if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
                chunk = $128e63aad4db5ad2$require$Buffer.from(chunk, encoding);
                encoding = "";
            }
            skipChunkCheck = true;
        }
    } else skipChunkCheck = true;
    return $128e63aad4db5ad2$var$readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()
$128e63aad4db5ad2$var$Readable.prototype.unshift = function(chunk) {
    return $128e63aad4db5ad2$var$readableAddChunk(this, chunk, null, true, false);
};
function $128e63aad4db5ad2$var$readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    $128e63aad4db5ad2$var$debug("readableAddChunk", chunk);
    var state = stream._readableState;
    if (chunk === null) {
        state.reading = false;
        $128e63aad4db5ad2$var$onEofChunk(stream, state);
    } else {
        var er;
        if (!skipChunkCheck) er = $128e63aad4db5ad2$var$chunkInvalid(state, chunk);
        if (er) $128e63aad4db5ad2$var$errorOrDestroy(stream, er);
        else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== $128e63aad4db5ad2$require$Buffer.prototype) chunk = $128e63aad4db5ad2$var$_uint8ArrayToBuffer(chunk);
            if (addToFront) {
                if (state.endEmitted) $128e63aad4db5ad2$var$errorOrDestroy(stream, new $128e63aad4db5ad2$var$ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
                else $128e63aad4db5ad2$var$addChunk(stream, state, chunk, true);
            } else if (state.ended) $128e63aad4db5ad2$var$errorOrDestroy(stream, new $128e63aad4db5ad2$var$ERR_STREAM_PUSH_AFTER_EOF());
            else if (state.destroyed) return false;
            else {
                state.reading = false;
                if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0) $128e63aad4db5ad2$var$addChunk(stream, state, chunk, false);
                    else $128e63aad4db5ad2$var$maybeReadMore(stream, state);
                } else $128e63aad4db5ad2$var$addChunk(stream, state, chunk, false);
            }
        } else if (!addToFront) {
            state.reading = false;
            $128e63aad4db5ad2$var$maybeReadMore(stream, state);
        }
    } // We can push more data if we are below the highWaterMark.
    // Also, if we have no data yet, we can stand some more bytes.
    // This is to work around cases where hwm=0, such as the repl.
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function $128e63aad4db5ad2$var$addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
    } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) $128e63aad4db5ad2$var$emitReadable(stream);
    }
    $128e63aad4db5ad2$var$maybeReadMore(stream, state);
}
function $128e63aad4db5ad2$var$chunkInvalid(state, chunk) {
    var er;
    if (!$128e63aad4db5ad2$var$_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) er = new $128e63aad4db5ad2$var$ERR_INVALID_ARG_TYPE("chunk", [
        "string",
        "Buffer",
        "Uint8Array"
    ], chunk);
    return er;
}
$128e63aad4db5ad2$var$Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
}; // backwards compatibility.

$128e63aad4db5ad2$var$Readable.prototype.setEncoding = function(enc) {
    if (!$128e63aad4db5ad2$var$StringDecoder) $128e63aad4db5ad2$var$StringDecoder = (parcelRequire("gqFDJ")).StringDecoder;
    var decoder = new $128e63aad4db5ad2$var$StringDecoder(enc);
    this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8
    this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:
    var p = this._readableState.buffer.head;
    var content = "";
    while(p !== null){
        content += decoder.write(p.data);
        p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "") this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
}; // Don't raise the hwm > 1GB
var $128e63aad4db5ad2$var$MAX_HWM = 0x40000000;
function $128e63aad4db5ad2$var$computeNewHighWaterMark(n) {
    if (n >= $128e63aad4db5ad2$var$MAX_HWM) // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = $128e63aad4db5ad2$var$MAX_HWM;
    else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.
function $128e63aad4db5ad2$var$howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
    } // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = $128e63aad4db5ad2$var$computeNewHighWaterMark(n);
    if (n <= state.length) return n; // Don't have enough
    if (!state.ended) {
        state.needReadable = true;
        return 0;
    }
    return state.length;
} // you can override either this method, or the async _read(n) below.
$128e63aad4db5ad2$var$Readable.prototype.read = function(n) {
    $128e63aad4db5ad2$var$debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        $128e63aad4db5ad2$var$debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) $128e63aad4db5ad2$var$endReadable(this);
        else $128e63aad4db5ad2$var$emitReadable(this);
        return null;
    }
    n = $128e63aad4db5ad2$var$howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
        if (state.length === 0) $128e63aad4db5ad2$var$endReadable(this);
        return null;
    } // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.
    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    $128e63aad4db5ad2$var$debug("need readable", doRead); // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        $128e63aad4db5ad2$var$debug("length less than watermark", doRead);
    } // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
        doRead = false;
        $128e63aad4db5ad2$var$debug("reading or ended", doRead);
    } else if (doRead) {
        $128e63aad4db5ad2$var$debug("do read");
        state.reading = true;
        state.sync = true; // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0) state.needReadable = true; // call internal read method
        this._read(state.highWaterMark);
        state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.
        if (!state.reading) n = $128e63aad4db5ad2$var$howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0) ret = $128e63aad4db5ad2$var$fromList(n, state);
    else ret = null;
    if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
    } else {
        state.length -= n;
        state.awaitDrain = 0;
    }
    if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.
        if (nOrig !== n && state.ended) $128e63aad4db5ad2$var$endReadable(this);
    }
    if (ret !== null) this.emit("data", ret);
    return ret;
};
function $128e63aad4db5ad2$var$onEofChunk(stream, state) {
    $128e63aad4db5ad2$var$debug("onEofChunk");
    if (state.ended) return;
    if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    if (state.sync) // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    $128e63aad4db5ad2$var$emitReadable(stream);
    else {
        // emit 'readable' now to make sure it gets picked up.
        state.needReadable = false;
        if (!state.emittedReadable) {
            state.emittedReadable = true;
            $128e63aad4db5ad2$var$emitReadable_(stream);
        }
    }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function $128e63aad4db5ad2$var$emitReadable(stream) {
    var state = stream._readableState;
    $128e63aad4db5ad2$var$debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
        $128e63aad4db5ad2$var$debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick($128e63aad4db5ad2$var$emitReadable_, stream);
    }
}
function $128e63aad4db5ad2$var$emitReadable_(stream) {
    var state = stream._readableState;
    $128e63aad4db5ad2$var$debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
    } // The stream needs another readable event if
    // 1. It is not flowing, as the flow mechanism will take
    //    care of it.
    // 2. It is not ended.
    // 3. It is below the highWaterMark, so we can schedule
    //    another readable later.
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    $128e63aad4db5ad2$var$flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function $128e63aad4db5ad2$var$maybeReadMore(stream, state) {
    if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick($128e63aad4db5ad2$var$maybeReadMore_, stream, state);
    }
}
function $128e63aad4db5ad2$var$maybeReadMore_(stream, state) {
    // Attempt to read more data if we should.
    //
    // The conditions for reading more data are (one of):
    // - Not enough data buffered (state.length < state.highWaterMark). The loop
    //   is responsible for filling the buffer with enough data if such data
    //   is available. If highWaterMark is 0 and we are not in the flowing mode
    //   we should _not_ attempt to buffer any extra data. We'll get more data
    //   when the stream consumer calls read() instead.
    // - No data in the buffer, and the stream is in flowing mode. In this mode
    //   the loop below is responsible for ensuring read() is called. Failing to
    //   call read here would abort the flow and there's no other mechanism for
    //   continuing the flow if the stream consumer has just subscribed to the
    //   'data' event.
    //
    // In addition to the above conditions to keep reading data, the following
    // conditions prevent the data from being read:
    // - The stream has ended (state.ended).
    // - There is already a pending 'read' operation (state.reading). This is a
    //   case where the the stream has called the implementation defined _read()
    //   method, but they are processing the call asynchronously and have _not_
    //   called push() with new data. In this case we skip performing more
    //   read()s. The execution ends in this method again after the _read() ends
    //   up calling push() with more data.
    while(!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)){
        var len = state.length;
        $128e63aad4db5ad2$var$debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length) break;
    }
    state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
$128e63aad4db5ad2$var$Readable.prototype._read = function(n) {
    $128e63aad4db5ad2$var$errorOrDestroy(this, new $128e63aad4db5ad2$var$ERR_METHOD_NOT_IMPLEMENTED("_read()"));
};
$128e63aad4db5ad2$var$Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch(state.pipesCount){
        case 0:
            state.pipes = dest;
            break;
        case 1:
            state.pipes = [
                state.pipes,
                dest
            ];
            break;
        default:
            state.pipes.push(dest);
            break;
    }
    state.pipesCount += 1;
    $128e63aad4db5ad2$var$debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) process.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
        $128e63aad4db5ad2$var$debug("onunpipe");
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        $128e63aad4db5ad2$var$debug("onend");
        dest.end();
    } // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = $128e63aad4db5ad2$var$pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
        $128e63aad4db5ad2$var$debug("cleanup"); // cleanup event handlers once the pipe is broken
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true; // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
        $128e63aad4db5ad2$var$debug("ondata");
        var ret = dest.write(chunk);
        $128e63aad4db5ad2$var$debug("dest.write", ret);
        if (ret === false) {
            // If the user unpiped during `dest.write()`, it is possible
            // to get stuck in a permanently paused state if that write
            // also returned false.
            // => Check whether `dest` is still a piping destination.
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && $128e63aad4db5ad2$var$indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                $128e63aad4db5ad2$var$debug("false write response, pause", state.awaitDrain);
                state.awaitDrain++;
            }
            src.pause();
        }
    } // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
        $128e63aad4db5ad2$var$debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if ($128e63aad4db5ad2$var$EElistenerCount(dest, "error") === 0) $128e63aad4db5ad2$var$errorOrDestroy(dest, er);
    } // Make sure our error handler is attached before userland ones.
    $128e63aad4db5ad2$var$prependListener(dest, "error", onerror); // Both close and finish should trigger unpipe, but only once.
    function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
        $128e63aad4db5ad2$var$debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
        $128e63aad4db5ad2$var$debug("unpipe");
        src.unpipe(dest);
    } // tell the dest that it's being piped to
    dest.emit("pipe", src); // start the flow if it hasn't been started already.
    if (!state.flowing) {
        $128e63aad4db5ad2$var$debug("pipe resume");
        src.resume();
    }
    return dest;
};
function $128e63aad4db5ad2$var$pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        $128e63aad4db5ad2$var$debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && $128e63aad4db5ad2$var$EElistenerCount(src, "data")) {
            state.flowing = true;
            $128e63aad4db5ad2$var$flow(src);
        }
    };
}
$128e63aad4db5ad2$var$Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
        hasUnpiped: false
    }; // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this; // just one destination.  most common case.
    if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes; // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
    } // slow case. multiple pipe destinations.
    if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for(var i = 0; i < len; i++)dests[i].emit("unpipe", this, {
            hasUnpiped: false
        });
        return this;
    } // try to find the right one.
    var index = $128e63aad4db5ad2$var$indexOf(state.pipes, dest);
    if (index === -1) return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something
$128e63aad4db5ad2$var$Readable.prototype.on = function(ev, fn) {
    var res = $dFjLx.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === "data") {
        // update readableListening so that resume() may be a no-op
        // a few lines down. This is needed to support once('readable').
        state.readableListening = this.listenerCount("readable") > 0; // Try start flowing on next tick if stream isn't explicitly paused
        if (state.flowing !== false) this.resume();
    } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            $128e63aad4db5ad2$var$debug("on readable", state.length, state.reading);
            if (state.length) $128e63aad4db5ad2$var$emitReadable(this);
            else if (!state.reading) process.nextTick($128e63aad4db5ad2$var$nReadingNextTick, this);
        }
    }
    return res;
};
$128e63aad4db5ad2$var$Readable.prototype.addListener = $128e63aad4db5ad2$var$Readable.prototype.on;
$128e63aad4db5ad2$var$Readable.prototype.removeListener = function(ev, fn) {
    var res = $dFjLx.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick($128e63aad4db5ad2$var$updateReadableListening, this);
    return res;
};
$128e63aad4db5ad2$var$Readable.prototype.removeAllListeners = function(ev) {
    var res = $dFjLx.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === undefined) // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick($128e63aad4db5ad2$var$updateReadableListening, this);
    return res;
};
function $128e63aad4db5ad2$var$updateReadableListening(self) {
    var state = self._readableState;
    state.readableListening = self.listenerCount("readable") > 0;
    if (state.resumeScheduled && !state.paused) // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
    else if (self.listenerCount("data") > 0) self.resume();
}
function $128e63aad4db5ad2$var$nReadingNextTick(self) {
    $128e63aad4db5ad2$var$debug("readable nexttick read 0");
    self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
$128e63aad4db5ad2$var$Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
        $128e63aad4db5ad2$var$debug("resume"); // we flow only if there is no one listening
        // for readable, but we still have to call
        // resume()
        state.flowing = !state.readableListening;
        $128e63aad4db5ad2$var$resume(this, state);
    }
    state.paused = false;
    return this;
};
function $128e63aad4db5ad2$var$resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick($128e63aad4db5ad2$var$resume_, stream, state);
    }
}
function $128e63aad4db5ad2$var$resume_(stream, state) {
    $128e63aad4db5ad2$var$debug("resume", state.reading);
    if (!state.reading) stream.read(0);
    state.resumeScheduled = false;
    stream.emit("resume");
    $128e63aad4db5ad2$var$flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
}
$128e63aad4db5ad2$var$Readable.prototype.pause = function() {
    $128e63aad4db5ad2$var$debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
        $128e63aad4db5ad2$var$debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
};
function $128e63aad4db5ad2$var$flow(stream) {
    var state = stream._readableState;
    $128e63aad4db5ad2$var$debug("flow", state.flowing);
    while(state.flowing && stream.read() !== null);
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
$128e63aad4db5ad2$var$Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
        $128e63aad4db5ad2$var$debug("wrapped end");
        if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
    });
    stream.on("data", function(chunk) {
        $128e63aad4db5ad2$var$debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
            paused = true;
            stream.pause();
        }
    }); // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for(var i in stream)if (this[i] === undefined && typeof stream[i] === "function") this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
        };
    }(i);
     // proxy certain important events.
    for(var n = 0; n < $128e63aad4db5ad2$var$kProxyEvents.length; n++)stream.on($128e63aad4db5ad2$var$kProxyEvents[n], this.emit.bind(this, $128e63aad4db5ad2$var$kProxyEvents[n]));
     // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    this._read = function(n) {
        $128e63aad4db5ad2$var$debug("wrapped _read", n);
        if (paused) {
            paused = false;
            stream.resume();
        }
    };
    return this;
};

if (typeof Symbol === "function") $128e63aad4db5ad2$var$Readable.prototype[Symbol.asyncIterator] = function() {
    if ($128e63aad4db5ad2$var$createReadableStreamAsyncIterator === undefined) $128e63aad4db5ad2$var$createReadableStreamAsyncIterator = (parcelRequire("564vG"));
    return $128e63aad4db5ad2$var$createReadableStreamAsyncIterator(this);
};
Object.defineProperty($128e63aad4db5ad2$var$Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.highWaterMark;
    }
});
Object.defineProperty($128e63aad4db5ad2$var$Readable.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState && this._readableState.buffer;
    }
});
Object.defineProperty($128e63aad4db5ad2$var$Readable.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.flowing;
    },
    set: function set(state) {
        if (this._readableState) this._readableState.flowing = state;
    }
}); // exposed for testing purposes only.
$128e63aad4db5ad2$var$Readable._fromList = $128e63aad4db5ad2$var$fromList;
Object.defineProperty($128e63aad4db5ad2$var$Readable.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.length;
    }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function $128e63aad4db5ad2$var$fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;
    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
    } else // read part of list
    ret = state.buffer.consume(n, state.decoder);
    return ret;
}
function $128e63aad4db5ad2$var$endReadable(stream) {
    var state = stream._readableState;
    $128e63aad4db5ad2$var$debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
        state.ended = true;
        process.nextTick($128e63aad4db5ad2$var$endReadableNT, state, stream);
    }
}
function $128e63aad4db5ad2$var$endReadableNT(state, stream) {
    $128e63aad4db5ad2$var$debug("endReadableNT", state.endEmitted, state.length); // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
            // In case of duplex streams we need a way to detect
            // if the writable side is ready for autoDestroy as well
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) stream.destroy();
        }
    }
}

if (typeof Symbol === "function") $128e63aad4db5ad2$var$Readable.from = function(iterable, opts) {
    if ($128e63aad4db5ad2$var$from === undefined) $128e63aad4db5ad2$var$from = (parcelRequire("FMyqb"));
    return $128e63aad4db5ad2$var$from($128e63aad4db5ad2$var$Readable, iterable, opts);
};
function $128e63aad4db5ad2$var$indexOf(xs, x) {
    for(var i = 0, l = xs.length; i < l; i++){
        if (xs[i] === x) return i;
    }
    return -1;
}

});
parcelRequire.register("dFjLx", function(module, exports) {

module.exports = $5VgCY$stream;

});

parcelRequire.register("anhJ2", function(module, exports) {
"use strict";
function $78d9cd42bc92bbdd$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $78d9cd42bc92bbdd$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $78d9cd42bc92bbdd$var$ownKeys(Object(source), true).forEach(function(key) {
            $78d9cd42bc92bbdd$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $78d9cd42bc92bbdd$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $78d9cd42bc92bbdd$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $78d9cd42bc92bbdd$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $78d9cd42bc92bbdd$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $78d9cd42bc92bbdd$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $78d9cd42bc92bbdd$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $78d9cd42bc92bbdd$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}

var $78d9cd42bc92bbdd$var$Buffer = $5VgCY$buffer.Buffer;

var $78d9cd42bc92bbdd$var$inspect = $5VgCY$util.inspect;
var $78d9cd42bc92bbdd$var$custom = $78d9cd42bc92bbdd$var$inspect && $78d9cd42bc92bbdd$var$inspect.custom || "inspect";
function $78d9cd42bc92bbdd$var$copyBuffer(src, target, offset) {
    $78d9cd42bc92bbdd$var$Buffer.prototype.copy.call(src, target, offset);
}
module.exports = /*#__PURE__*/ function() {
    function BufferList() {
        $78d9cd42bc92bbdd$var$_classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    $78d9cd42bc92bbdd$var$_createClass(BufferList, [
        {
            key: "push",
            value: function push(v) {
                var entry = {
                    data: v,
                    next: null
                };
                if (this.length > 0) this.tail.next = entry;
                else this.head = entry;
                this.tail = entry;
                ++this.length;
            }
        },
        {
            key: "unshift",
            value: function unshift(v) {
                var entry = {
                    data: v,
                    next: this.head
                };
                if (this.length === 0) this.tail = entry;
                this.head = entry;
                ++this.length;
            }
        },
        {
            key: "shift",
            value: function shift() {
                if (this.length === 0) return;
                var ret = this.head.data;
                if (this.length === 1) this.head = this.tail = null;
                else this.head = this.head.next;
                --this.length;
                return ret;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.head = this.tail = null;
                this.length = 0;
            }
        },
        {
            key: "join",
            value: function join(s) {
                if (this.length === 0) return "";
                var p = this.head;
                var ret = "" + p.data;
                while(p = p.next)ret += s + p.data;
                return ret;
            }
        },
        {
            key: "concat",
            value: function concat(n) {
                if (this.length === 0) return $78d9cd42bc92bbdd$var$Buffer.alloc(0);
                var ret = $78d9cd42bc92bbdd$var$Buffer.allocUnsafe(n >>> 0);
                var p = this.head;
                var i = 0;
                while(p){
                    $78d9cd42bc92bbdd$var$copyBuffer(p.data, ret, i);
                    i += p.data.length;
                    p = p.next;
                }
                return ret;
            } // Consumes a specified amount of bytes or characters from the buffered data.
        },
        {
            key: "consume",
            value: function consume(n, hasStrings) {
                var ret;
                if (n < this.head.data.length) {
                    // `slice` is the same for buffers and strings.
                    ret = this.head.data.slice(0, n);
                    this.head.data = this.head.data.slice(n);
                } else if (n === this.head.data.length) // First chunk is a perfect match.
                ret = this.shift();
                else // Result spans more than one buffer.
                ret = hasStrings ? this._getString(n) : this._getBuffer(n);
                return ret;
            }
        },
        {
            key: "first",
            value: function first() {
                return this.head.data;
            } // Consumes a specified amount of characters from the buffered data.
        },
        {
            key: "_getString",
            value: function _getString(n) {
                var p = this.head;
                var c = 1;
                var ret = p.data;
                n -= ret.length;
                while(p = p.next){
                    var str = p.data;
                    var nb = n > str.length ? str.length : n;
                    if (nb === str.length) ret += str;
                    else ret += str.slice(0, n);
                    n -= nb;
                    if (n === 0) {
                        if (nb === str.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = str.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            } // Consumes a specified amount of bytes from the buffered data.
        },
        {
            key: "_getBuffer",
            value: function _getBuffer(n) {
                var ret = $78d9cd42bc92bbdd$var$Buffer.allocUnsafe(n);
                var p = this.head;
                var c = 1;
                p.data.copy(ret);
                n -= p.data.length;
                while(p = p.next){
                    var buf = p.data;
                    var nb = n > buf.length ? buf.length : n;
                    buf.copy(ret, ret.length - n, 0, nb);
                    n -= nb;
                    if (n === 0) {
                        if (nb === buf.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = buf.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            } // Make sure the linked list only shows the minimal necessary information.
        },
        {
            key: $78d9cd42bc92bbdd$var$custom,
            value: function value(_, options) {
                return $78d9cd42bc92bbdd$var$inspect(this, $78d9cd42bc92bbdd$var$_objectSpread({}, options, {
                    // Only inspect one level.
                    depth: 0,
                    // It should not recurse.
                    customInspect: false
                }));
            }
        }
    ]);
    return BufferList;
}();

});

parcelRequire.register("7dLEb", function(module, exports) {
"use strict"; // undocumented cb() API, needed for core, not for public API
function $541eb508c9adb89c$var$destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
        if (cb) cb(err);
        else if (err) {
            if (!this._writableState) process.nextTick($541eb508c9adb89c$var$emitErrorNT, this, err);
            else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                process.nextTick($541eb508c9adb89c$var$emitErrorNT, this, err);
            }
        }
        return this;
    } // we set destroyed to true before firing error callbacks in order
    // to make it re-entrance safe in case destroy() is called within callbacks
    if (this._readableState) this._readableState.destroyed = true;
     // if this is a duplex stream mark the writable part as destroyed as well
    if (this._writableState) this._writableState.destroyed = true;
    this._destroy(err || null, function(err) {
        if (!cb && err) {
            if (!_this._writableState) process.nextTick($541eb508c9adb89c$var$emitErrorAndCloseNT, _this, err);
            else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                process.nextTick($541eb508c9adb89c$var$emitErrorAndCloseNT, _this, err);
            } else process.nextTick($541eb508c9adb89c$var$emitCloseNT, _this);
        } else if (cb) {
            process.nextTick($541eb508c9adb89c$var$emitCloseNT, _this);
            cb(err);
        } else process.nextTick($541eb508c9adb89c$var$emitCloseNT, _this);
    });
    return this;
}
function $541eb508c9adb89c$var$emitErrorAndCloseNT(self, err) {
    $541eb508c9adb89c$var$emitErrorNT(self, err);
    $541eb508c9adb89c$var$emitCloseNT(self);
}
function $541eb508c9adb89c$var$emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose) return;
    if (self._readableState && !self._readableState.emitClose) return;
    self.emit("close");
}
function $541eb508c9adb89c$var$undestroy() {
    if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
    }
    if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
    }
}
function $541eb508c9adb89c$var$emitErrorNT(self, err) {
    self.emit("error", err);
}
function $541eb508c9adb89c$var$errorOrDestroy(stream, err) {
    // We have tests that rely on errors being emitted
    // in the same tick, so changing this is semver major.
    // For now when you opt-in to autoDestroy we allow
    // the error to be emitted nextTick. In a future
    // semver major update we should change the default to this.
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
    else stream.emit("error", err);
}
module.exports = {
    destroy: $541eb508c9adb89c$var$destroy,
    undestroy: $541eb508c9adb89c$var$undestroy,
    errorOrDestroy: $541eb508c9adb89c$var$errorOrDestroy
};

});

parcelRequire.register("ftBwG", function(module, exports) {
"use strict";

var $9cCav = parcelRequire("9cCav");
var $b446ac5e8a55fa99$var$ERR_INVALID_OPT_VALUE = $9cCav.codes.ERR_INVALID_OPT_VALUE;
function $b446ac5e8a55fa99$var$highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function $b446ac5e8a55fa99$var$getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = $b446ac5e8a55fa99$var$highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : "highWaterMark";
            throw new $b446ac5e8a55fa99$var$ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
    } // Default value
    return state.objectMode ? 16 : 16384;
}
module.exports = {
    getHighWaterMark: $b446ac5e8a55fa99$var$getHighWaterMark
};

});
parcelRequire.register("9cCav", function(module, exports) {

$parcel$export(module.exports, "codes", () => $6b32d786bb610a09$export$e45cb6485273080e, (v) => $6b32d786bb610a09$export$e45cb6485273080e = v);
var $6b32d786bb610a09$export$e45cb6485273080e;
"use strict";
const $6b32d786bb610a09$var$codes = {};
function $6b32d786bb610a09$var$createErrorType(code, message, Base) {
    if (!Base) Base = Error;
    function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") return message;
        else return message(arg1, arg2, arg3);
    }
    class NodeError extends Base {
        constructor(arg1, arg2, arg3){
            super(getMessage(arg1, arg2, arg3));
        }
    }
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    $6b32d786bb610a09$var$codes[code] = NodeError;
}
// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function $6b32d786bb610a09$var$oneOf(expected, thing) {
    if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i)=>String(i));
        if (len > 2) return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        else if (len === 2) return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        else return `of ${thing} ${expected[0]}`;
    } else return `of ${thing} ${String(expected)}`;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function $6b32d786bb610a09$var$startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function $6b32d786bb610a09$var$endsWith(str, search, this_len) {
    if (this_len === undefined || this_len > str.length) this_len = str.length;
    return str.substring(this_len - search.length, this_len) === search;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function $6b32d786bb610a09$var$includes(str, search, start) {
    if (typeof start !== "number") start = 0;
    if (start + search.length > str.length) return false;
    else return str.indexOf(search, start) !== -1;
}
$6b32d786bb610a09$var$createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
$6b32d786bb610a09$var$createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    // determiner: 'must be' or 'must not be'
    let determiner;
    if (typeof expected === "string" && $6b32d786bb610a09$var$startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
    } else determiner = "must be";
    let msg;
    if ($6b32d786bb610a09$var$endsWith(name, " argument")) // For cases like 'first argument'
    msg = `The ${name} ${determiner} ${$6b32d786bb610a09$var$oneOf(expected, "type")}`;
    else {
        const type = $6b32d786bb610a09$var$includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${$6b32d786bb610a09$var$oneOf(expected, "type")}`;
    }
    msg += `. Received type ${typeof actual}`;
    return msg;
}, TypeError);
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
$6b32d786bb610a09$var$createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
});
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
});
$6b32d786bb610a09$var$createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
$6b32d786bb610a09$var$createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
}, TypeError);
$6b32d786bb610a09$var$createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
$6b32d786bb610a09$export$e45cb6485273080e = $6b32d786bb610a09$var$codes;

});


parcelRequire.register("bo0qS", function(module, exports) {


try {
    var $84a2457974d425b3$var$util = $84a2457974d425b3$import$57f6e86051212e1;
    /* istanbul ignore next */ if (typeof $84a2457974d425b3$var$util.inherits !== "function") throw "";
    module.exports = $84a2457974d425b3$var$util.inherits;
} catch (e) {
    /* istanbul ignore next */ module.exports = (parcelRequire("404Fy"));
}

});
parcelRequire.register("404Fy", function(module, exports) {
if (typeof Object.create === "function") // implementation from standard node.js 'util' module
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }
};
else // old school shim for old browsers
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
    }
};

});


parcelRequire.register("lWLE4", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
"use strict";
/*<replacement>*/ var $ffa3f91e538fcd25$var$objectKeys = Object.keys || function(obj) {
    var keys = [];
    for(var key in obj)keys.push(key);
    return keys;
};
/*</replacement>*/ module.exports = $ffa3f91e538fcd25$var$Duplex;

var $1AM0g = parcelRequire("1AM0g");

var $5rzHA = parcelRequire("5rzHA");

(parcelRequire("bo0qS"))($ffa3f91e538fcd25$var$Duplex, $1AM0g);
// Allow the keys array to be GC'ed.
var $ffa3f91e538fcd25$var$keys = $ffa3f91e538fcd25$var$objectKeys($5rzHA.prototype);
for(var $ffa3f91e538fcd25$var$v = 0; $ffa3f91e538fcd25$var$v < $ffa3f91e538fcd25$var$keys.length; $ffa3f91e538fcd25$var$v++){
    var $ffa3f91e538fcd25$var$method = $ffa3f91e538fcd25$var$keys[$ffa3f91e538fcd25$var$v];
    if (!$ffa3f91e538fcd25$var$Duplex.prototype[$ffa3f91e538fcd25$var$method]) $ffa3f91e538fcd25$var$Duplex.prototype[$ffa3f91e538fcd25$var$method] = $5rzHA.prototype[$ffa3f91e538fcd25$var$method];
}
function $ffa3f91e538fcd25$var$Duplex(options) {
    if (!(this instanceof $ffa3f91e538fcd25$var$Duplex)) return new $ffa3f91e538fcd25$var$Duplex(options);
    $1AM0g.call(this, options);
    $5rzHA.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once("end", $ffa3f91e538fcd25$var$onend);
        }
    }
}
Object.defineProperty($ffa3f91e538fcd25$var$Duplex.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
});
Object.defineProperty($ffa3f91e538fcd25$var$Duplex.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
Object.defineProperty($ffa3f91e538fcd25$var$Duplex.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
}); // the no-half-open enforcer
function $ffa3f91e538fcd25$var$onend() {
    // If the writable side ended, then we're ok.
    if (this._writableState.ended) return; // no more data can be written.
    // But allow more writes to happen in this tick.
    process.nextTick($ffa3f91e538fcd25$var$onEndNT, this);
}
function $ffa3f91e538fcd25$var$onEndNT(self) {
    self.end();
}
Object.defineProperty($ffa3f91e538fcd25$var$Duplex.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined || this._writableState === undefined) return false;
        return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
    }
});

});
parcelRequire.register("5rzHA", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
"use strict";
module.exports = $3f6b2b080bf7a4f7$var$Writable;
/* <replacement> */ function $3f6b2b080bf7a4f7$var$WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream
function $3f6b2b080bf7a4f7$var$CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
        $3f6b2b080bf7a4f7$var$onCorkedFinish(_this, state);
    };
}
/* </replacement> */ /*<replacement>*/ var $3f6b2b080bf7a4f7$var$Duplex;
/*</replacement>*/ $3f6b2b080bf7a4f7$var$Writable.WritableState = $3f6b2b080bf7a4f7$var$WritableState;

/*<replacement>*/ var $3f6b2b080bf7a4f7$var$internalUtil = {
    deprecate: (parcelRequire("5gyXW"))
};

var $dFjLx = parcelRequire("dFjLx");

var $3f6b2b080bf7a4f7$require$Buffer = $5VgCY$buffer.Buffer;
var $3f6b2b080bf7a4f7$var$OurUint8Array = $parcel$global.Uint8Array || function() {};
function $3f6b2b080bf7a4f7$var$_uint8ArrayToBuffer(chunk) {
    return $3f6b2b080bf7a4f7$require$Buffer.from(chunk);
}
function $3f6b2b080bf7a4f7$var$_isUint8Array(obj) {
    return $3f6b2b080bf7a4f7$require$Buffer.isBuffer(obj) || obj instanceof $3f6b2b080bf7a4f7$var$OurUint8Array;
}

var $7dLEb = parcelRequire("7dLEb");

var $ftBwG = parcelRequire("ftBwG");
var $3f6b2b080bf7a4f7$var$getHighWaterMark = $ftBwG.getHighWaterMark;

var $9cCav = parcelRequire("9cCav");
var $3f6b2b080bf7a4f7$require$_require$codes = $9cCav.codes;
var $3f6b2b080bf7a4f7$var$ERR_INVALID_ARG_TYPE = $3f6b2b080bf7a4f7$require$_require$codes.ERR_INVALID_ARG_TYPE, $3f6b2b080bf7a4f7$var$ERR_METHOD_NOT_IMPLEMENTED = $3f6b2b080bf7a4f7$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $3f6b2b080bf7a4f7$var$ERR_MULTIPLE_CALLBACK = $3f6b2b080bf7a4f7$require$_require$codes.ERR_MULTIPLE_CALLBACK, $3f6b2b080bf7a4f7$var$ERR_STREAM_CANNOT_PIPE = $3f6b2b080bf7a4f7$require$_require$codes.ERR_STREAM_CANNOT_PIPE, $3f6b2b080bf7a4f7$var$ERR_STREAM_DESTROYED = $3f6b2b080bf7a4f7$require$_require$codes.ERR_STREAM_DESTROYED, $3f6b2b080bf7a4f7$var$ERR_STREAM_NULL_VALUES = $3f6b2b080bf7a4f7$require$_require$codes.ERR_STREAM_NULL_VALUES, $3f6b2b080bf7a4f7$var$ERR_STREAM_WRITE_AFTER_END = $3f6b2b080bf7a4f7$require$_require$codes.ERR_STREAM_WRITE_AFTER_END, $3f6b2b080bf7a4f7$var$ERR_UNKNOWN_ENCODING = $3f6b2b080bf7a4f7$require$_require$codes.ERR_UNKNOWN_ENCODING;
var $3f6b2b080bf7a4f7$var$errorOrDestroy = $7dLEb.errorOrDestroy;

(parcelRequire("bo0qS"))($3f6b2b080bf7a4f7$var$Writable, $dFjLx);
function $3f6b2b080bf7a4f7$var$nop() {}

function $3f6b2b080bf7a4f7$var$WritableState(options, stream, isDuplex) {
    $3f6b2b080bf7a4f7$var$Duplex = $3f6b2b080bf7a4f7$var$Duplex || (parcelRequire("lWLE4"));
    options = options || {}; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream,
    // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof $3f6b2b080bf7a4f7$var$Duplex; // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    this.highWaterMark = $3f6b2b080bf7a4f7$var$getHighWaterMark(this, options, "writableHighWaterMark", isDuplex); // if _final has been called
    this.finalCalled = false; // drain event flag.
    this.needDrain = false; // at the start of calling end()
    this.ending = false; // when end() has been called, and returned
    this.ended = false; // when 'finish' is emitted
    this.finished = false; // has it been destroyed
    this.destroyed = false; // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || "utf8"; // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0; // a flag to see when we're in the middle of a write.
    this.writing = false; // when true all writes will be buffered until .uncork() call
    this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true; // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)
    this.onwrite = function(er) {
        $3f6b2b080bf7a4f7$var$onwrite(stream, er);
    }; // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null; // the amount that is being written when _write is called.
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false; // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')
    this.autoDestroy = !!options.autoDestroy; // count buffered requests
    this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new $3f6b2b080bf7a4f7$var$CorkedRequest(this);
}
$3f6b2b080bf7a4f7$var$WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while(current){
        out.push(current);
        current = current.next;
    }
    return out;
};
(function() {
    try {
        Object.defineProperty($3f6b2b080bf7a4f7$var$WritableState.prototype, "buffer", {
            get: $3f6b2b080bf7a4f7$var$internalUtil.deprecate(function writableStateBufferGetter() {
                return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
    } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var $3f6b2b080bf7a4f7$var$realHasInstance;
if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    $3f6b2b080bf7a4f7$var$realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty($3f6b2b080bf7a4f7$var$Writable, Symbol.hasInstance, {
        value: function value(object) {
            if ($3f6b2b080bf7a4f7$var$realHasInstance.call(this, object)) return true;
            if (this !== $3f6b2b080bf7a4f7$var$Writable) return false;
            return object && object._writableState instanceof $3f6b2b080bf7a4f7$var$WritableState;
        }
    });
} else $3f6b2b080bf7a4f7$var$realHasInstance = function realHasInstance(object) {
    return object instanceof this;
};

function $3f6b2b080bf7a4f7$var$Writable(options) {
    $3f6b2b080bf7a4f7$var$Duplex = $3f6b2b080bf7a4f7$var$Duplex || (parcelRequire("lWLE4")); // Writable ctor is applied to Duplexes, too.
    // `realHasInstance` is necessary because using plain `instanceof`
    // would return false, as no `_writableState` property is attached.
    // Trying to use the custom `instanceof` for Writable here will also break the
    // Node.js LazyTransform implementation, which has a non-trivial getter for
    // `_writableState` that would lead to infinite recursion.
    // Checking for a Stream.Duplex instance is faster here instead of inside
    // the WritableState constructor, at least with V8 6.5
    var isDuplex = this instanceof $3f6b2b080bf7a4f7$var$Duplex;
    if (!isDuplex && !$3f6b2b080bf7a4f7$var$realHasInstance.call($3f6b2b080bf7a4f7$var$Writable, this)) return new $3f6b2b080bf7a4f7$var$Writable(options);
    this._writableState = new $3f6b2b080bf7a4f7$var$WritableState(options, this, isDuplex); // legacy.
    this.writable = true;
    if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
    }
    $dFjLx.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.
$3f6b2b080bf7a4f7$var$Writable.prototype.pipe = function() {
    $3f6b2b080bf7a4f7$var$errorOrDestroy(this, new $3f6b2b080bf7a4f7$var$ERR_STREAM_CANNOT_PIPE());
};
function $3f6b2b080bf7a4f7$var$writeAfterEnd(stream, cb) {
    var er = new $3f6b2b080bf7a4f7$var$ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb
    $3f6b2b080bf7a4f7$var$errorOrDestroy(stream, er);
    process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function $3f6b2b080bf7a4f7$var$validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) er = new $3f6b2b080bf7a4f7$var$ERR_STREAM_NULL_VALUES();
    else if (typeof chunk !== "string" && !state.objectMode) er = new $3f6b2b080bf7a4f7$var$ERR_INVALID_ARG_TYPE("chunk", [
        "string",
        "Buffer"
    ], chunk);
    if (er) {
        $3f6b2b080bf7a4f7$var$errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
    }
    return true;
}
$3f6b2b080bf7a4f7$var$Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && $3f6b2b080bf7a4f7$var$_isUint8Array(chunk);
    if (isBuf && !$3f6b2b080bf7a4f7$require$Buffer.isBuffer(chunk)) chunk = $3f6b2b080bf7a4f7$var$_uint8ArrayToBuffer(chunk);
    if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    if (isBuf) encoding = "buffer";
    else if (!encoding) encoding = state.defaultEncoding;
    if (typeof cb !== "function") cb = $3f6b2b080bf7a4f7$var$nop;
    if (state.ending) $3f6b2b080bf7a4f7$var$writeAfterEnd(this, cb);
    else if (isBuf || $3f6b2b080bf7a4f7$var$validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = $3f6b2b080bf7a4f7$var$writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
};
$3f6b2b080bf7a4f7$var$Writable.prototype.cork = function() {
    this._writableState.corked++;
};
$3f6b2b080bf7a4f7$var$Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) $3f6b2b080bf7a4f7$var$clearBuffer(this, state);
    }
};
$3f6b2b080bf7a4f7$var$Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === "string") encoding = encoding.toLowerCase();
    if (!([
        "hex",
        "utf8",
        "utf-8",
        "ascii",
        "binary",
        "base64",
        "ucs2",
        "ucs-2",
        "utf16le",
        "utf-16le",
        "raw"
    ].indexOf((encoding + "").toLowerCase()) > -1)) throw new $3f6b2b080bf7a4f7$var$ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
};
Object.defineProperty($3f6b2b080bf7a4f7$var$Writable.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
function $3f6b2b080bf7a4f7$var$decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = $3f6b2b080bf7a4f7$require$Buffer.from(chunk, encoding);
    return chunk;
}
Object.defineProperty($3f6b2b080bf7a4f7$var$Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function $3f6b2b080bf7a4f7$var$writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
        var newChunk = $3f6b2b080bf7a4f7$var$decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
        }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;
    if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
        };
        if (last) last.next = state.lastBufferedRequest;
        else state.bufferedRequest = state.lastBufferedRequest;
        state.bufferedRequestCount += 1;
    } else $3f6b2b080bf7a4f7$var$doWrite(stream, state, false, len, chunk, encoding, cb);
    return ret;
}
function $3f6b2b080bf7a4f7$var$doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed) state.onwrite(new $3f6b2b080bf7a4f7$var$ERR_STREAM_DESTROYED("write"));
    else if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
}
function $3f6b2b080bf7a4f7$var$onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        process.nextTick(cb, er); // this can emit finish, and it will always happen
        // after error
        process.nextTick($3f6b2b080bf7a4f7$var$finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        $3f6b2b080bf7a4f7$var$errorOrDestroy(stream, er);
    } else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        $3f6b2b080bf7a4f7$var$errorOrDestroy(stream, er); // this can emit finish, but finish must
        // always follow error
        $3f6b2b080bf7a4f7$var$finishMaybe(stream, state);
    }
}
function $3f6b2b080bf7a4f7$var$onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
}
function $3f6b2b080bf7a4f7$var$onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== "function") throw new $3f6b2b080bf7a4f7$var$ERR_MULTIPLE_CALLBACK();
    $3f6b2b080bf7a4f7$var$onwriteStateUpdate(state);
    if (er) $3f6b2b080bf7a4f7$var$onwriteError(stream, state, sync, er, cb);
    else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = $3f6b2b080bf7a4f7$var$needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) $3f6b2b080bf7a4f7$var$clearBuffer(stream, state);
        if (sync) process.nextTick($3f6b2b080bf7a4f7$var$afterWrite, stream, state, finished, cb);
        else $3f6b2b080bf7a4f7$var$afterWrite(stream, state, finished, cb);
    }
}
function $3f6b2b080bf7a4f7$var$afterWrite(stream, state, finished, cb) {
    if (!finished) $3f6b2b080bf7a4f7$var$onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    $3f6b2b080bf7a4f7$var$finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function $3f6b2b080bf7a4f7$var$onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
    }
} // if there's something in the buffer waiting, then process it
function $3f6b2b080bf7a4f7$var$clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while(entry){
            buffer[count] = entry;
            if (!entry.isBuf) allBuffers = false;
            entry = entry.next;
            count += 1;
        }
        buffer.allBuffers = allBuffers;
        $3f6b2b080bf7a4f7$var$doWrite(stream, state, true, state.length, buffer, "", holder.finish); // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
        } else state.corkedRequestsFree = new $3f6b2b080bf7a4f7$var$CorkedRequest(state);
        state.bufferedRequestCount = 0;
    } else {
        // Slow case, write chunks one-by-one
        while(entry){
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            $3f6b2b080bf7a4f7$var$doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
            // it means that we need to wait until it does.
            // also, that means that the chunk and cb are currently
            // being processed, so move the buffer counter past them.
            if (state.writing) break;
        }
        if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
}
$3f6b2b080bf7a4f7$var$Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new $3f6b2b080bf7a4f7$var$ERR_METHOD_NOT_IMPLEMENTED("_write()"));
};
$3f6b2b080bf7a4f7$var$Writable.prototype._writev = null;
$3f6b2b080bf7a4f7$var$Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    } // ignore unnecessary end() calls.
    if (!state.ending) $3f6b2b080bf7a4f7$var$endWritable(this, state, cb);
    return this;
};
Object.defineProperty($3f6b2b080bf7a4f7$var$Writable.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
});
function $3f6b2b080bf7a4f7$var$needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function $3f6b2b080bf7a4f7$var$callFinal(stream, state) {
    stream._final(function(err) {
        state.pendingcb--;
        if (err) $3f6b2b080bf7a4f7$var$errorOrDestroy(stream, err);
        state.prefinished = true;
        stream.emit("prefinish");
        $3f6b2b080bf7a4f7$var$finishMaybe(stream, state);
    });
}
function $3f6b2b080bf7a4f7$var$prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick($3f6b2b080bf7a4f7$var$callFinal, stream, state);
        } else {
            state.prefinished = true;
            stream.emit("prefinish");
        }
    }
}
function $3f6b2b080bf7a4f7$var$finishMaybe(stream, state) {
    var need = $3f6b2b080bf7a4f7$var$needFinish(state);
    if (need) {
        $3f6b2b080bf7a4f7$var$prefinish(stream, state);
        if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit("finish");
            if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the readable side is ready for autoDestroy as well
                var rState = stream._readableState;
                if (!rState || rState.autoDestroy && rState.endEmitted) stream.destroy();
            }
        }
    }
    return need;
}
function $3f6b2b080bf7a4f7$var$endWritable(stream, state, cb) {
    state.ending = true;
    $3f6b2b080bf7a4f7$var$finishMaybe(stream, state);
    if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
}
function $3f6b2b080bf7a4f7$var$onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while(entry){
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
    } // reuse the free corkReq.
    state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty($3f6b2b080bf7a4f7$var$Writable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._writableState === undefined) return false;
        return this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._writableState.destroyed = value;
    }
});
$3f6b2b080bf7a4f7$var$Writable.prototype.destroy = $7dLEb.destroy;
$3f6b2b080bf7a4f7$var$Writable.prototype._undestroy = $7dLEb.undestroy;
$3f6b2b080bf7a4f7$var$Writable.prototype._destroy = function(err, cb) {
    cb(err);
};

});
parcelRequire.register("5gyXW", function(module, exports) {
/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */ 
module.exports = $5VgCY$util.deprecate;

});



parcelRequire.register("gqFDJ", function(module, exports) {

$parcel$export(module.exports, "StringDecoder", () => $bf5f5fd4b8c6490c$export$63a7aa211a91ed69, (v) => $bf5f5fd4b8c6490c$export$63a7aa211a91ed69 = v);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
var $bf5f5fd4b8c6490c$export$63a7aa211a91ed69;
"use strict";

var $aMexO = parcelRequire("aMexO");
var $bf5f5fd4b8c6490c$require$Buffer = $aMexO.Buffer;
/*</replacement>*/ var $bf5f5fd4b8c6490c$var$isEncoding = $bf5f5fd4b8c6490c$require$Buffer.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch(encoding && encoding.toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
            return true;
        default:
            return false;
    }
};
function $bf5f5fd4b8c6490c$var$_normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while(true)switch(enc){
        case "utf8":
        case "utf-8":
            return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return "utf16le";
        case "latin1":
        case "binary":
            return "latin1";
        case "base64":
        case "ascii":
        case "hex":
            return enc;
        default:
            if (retried) return; // undefined
            enc = ("" + enc).toLowerCase();
            retried = true;
    }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function $bf5f5fd4b8c6490c$var$normalizeEncoding(enc) {
    var nenc = $bf5f5fd4b8c6490c$var$_normalizeEncoding(enc);
    if (typeof nenc !== "string" && ($bf5f5fd4b8c6490c$require$Buffer.isEncoding === $bf5f5fd4b8c6490c$var$isEncoding || !$bf5f5fd4b8c6490c$var$isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
}
$bf5f5fd4b8c6490c$export$63a7aa211a91ed69 = $bf5f5fd4b8c6490c$var$StringDecoder;
function $bf5f5fd4b8c6490c$var$StringDecoder(encoding) {
    this.encoding = $bf5f5fd4b8c6490c$var$normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case "utf16le":
            this.text = $bf5f5fd4b8c6490c$var$utf16Text;
            this.end = $bf5f5fd4b8c6490c$var$utf16End;
            nb = 4;
            break;
        case "utf8":
            this.fillLast = $bf5f5fd4b8c6490c$var$utf8FillLast;
            nb = 4;
            break;
        case "base64":
            this.text = $bf5f5fd4b8c6490c$var$base64Text;
            this.end = $bf5f5fd4b8c6490c$var$base64End;
            nb = 3;
            break;
        default:
            this.write = $bf5f5fd4b8c6490c$var$simpleWrite;
            this.end = $bf5f5fd4b8c6490c$var$simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = $bf5f5fd4b8c6490c$require$Buffer.allocUnsafe(nb);
}
$bf5f5fd4b8c6490c$var$StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return "";
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
    } else i = 0;
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
};
$bf5f5fd4b8c6490c$var$StringDecoder.prototype.end = $bf5f5fd4b8c6490c$var$utf8End;
// Returns only complete characters in a Buffer
$bf5f5fd4b8c6490c$var$StringDecoder.prototype.text = $bf5f5fd4b8c6490c$var$utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
$bf5f5fd4b8c6490c$var$StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function $bf5f5fd4b8c6490c$var$utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function $bf5f5fd4b8c6490c$var$utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = $bf5f5fd4b8c6490c$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = $bf5f5fd4b8c6490c$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = $bf5f5fd4b8c6490c$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function $bf5f5fd4b8c6490c$var$utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return "�";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return "�";
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return "�";
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function $bf5f5fd4b8c6490c$var$utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = $bf5f5fd4b8c6490c$var$utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function $bf5f5fd4b8c6490c$var$utf8Text(buf, i) {
    var total = $bf5f5fd4b8c6490c$var$utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function $bf5f5fd4b8c6490c$var$utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "�";
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function $bf5f5fd4b8c6490c$var$utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function $bf5f5fd4b8c6490c$var$utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
}
function $bf5f5fd4b8c6490c$var$base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) this.lastChar[0] = buf[buf.length - 1];
    else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
}
function $bf5f5fd4b8c6490c$var$base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function $bf5f5fd4b8c6490c$var$simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function $bf5f5fd4b8c6490c$var$simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
}

});
parcelRequire.register("aMexO", function(module, exports) {
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */ 
var $7d89ab4a610bd361$var$Buffer = $5VgCY$buffer.Buffer;
// alternative to using Object.keys for old browsers
function $7d89ab4a610bd361$var$copyProps(src, dst) {
    for(var key in src)dst[key] = src[key];
}
if ($7d89ab4a610bd361$var$Buffer.from && $7d89ab4a610bd361$var$Buffer.alloc && $7d89ab4a610bd361$var$Buffer.allocUnsafe && $7d89ab4a610bd361$var$Buffer.allocUnsafeSlow) module.exports = $5VgCY$buffer;
else {
    // Copy properties from require('buffer')
    $7d89ab4a610bd361$var$copyProps($5VgCY$buffer, module.exports);
    module.exports.Buffer = $7d89ab4a610bd361$var$SafeBuffer;
}
function $7d89ab4a610bd361$var$SafeBuffer(arg, encodingOrOffset, length) {
    return $7d89ab4a610bd361$var$Buffer(arg, encodingOrOffset, length);
}
$7d89ab4a610bd361$var$SafeBuffer.prototype = Object.create($7d89ab4a610bd361$var$Buffer.prototype);
// Copy static methods from Buffer
$7d89ab4a610bd361$var$copyProps($7d89ab4a610bd361$var$Buffer, $7d89ab4a610bd361$var$SafeBuffer);
$7d89ab4a610bd361$var$SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") throw new TypeError("Argument must not be a number");
    return $7d89ab4a610bd361$var$Buffer(arg, encodingOrOffset, length);
};
$7d89ab4a610bd361$var$SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    var buf = $7d89ab4a610bd361$var$Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === "string") buf.fill(fill, encoding);
        else buf.fill(fill);
    } else buf.fill(0);
    return buf;
};
$7d89ab4a610bd361$var$SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return $7d89ab4a610bd361$var$Buffer(size);
};
$7d89ab4a610bd361$var$SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return $5VgCY$buffer.SlowBuffer(size);
};

});


parcelRequire.register("564vG", function(module, exports) {
"use strict";
var $3b6102e3ec460a80$var$_Object$setPrototypeO;
function $3b6102e3ec460a80$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

var $hKh6s = parcelRequire("hKh6s");
var $3b6102e3ec460a80$var$kLastResolve = Symbol("lastResolve");
var $3b6102e3ec460a80$var$kLastReject = Symbol("lastReject");
var $3b6102e3ec460a80$var$kError = Symbol("error");
var $3b6102e3ec460a80$var$kEnded = Symbol("ended");
var $3b6102e3ec460a80$var$kLastPromise = Symbol("lastPromise");
var $3b6102e3ec460a80$var$kHandlePromise = Symbol("handlePromise");
var $3b6102e3ec460a80$var$kStream = Symbol("stream");
function $3b6102e3ec460a80$var$createIterResult(value, done) {
    return {
        value: value,
        done: done
    };
}
function $3b6102e3ec460a80$var$readAndResolve(iter) {
    var resolve = iter[$3b6102e3ec460a80$var$kLastResolve];
    if (resolve !== null) {
        var data = iter[$3b6102e3ec460a80$var$kStream].read(); // we defer if data is null
        // we can be expecting either 'end' or
        // 'error'
        if (data !== null) {
            iter[$3b6102e3ec460a80$var$kLastPromise] = null;
            iter[$3b6102e3ec460a80$var$kLastResolve] = null;
            iter[$3b6102e3ec460a80$var$kLastReject] = null;
            resolve($3b6102e3ec460a80$var$createIterResult(data, false));
        }
    }
}
function $3b6102e3ec460a80$var$onReadable(iter) {
    // we wait for the next tick, because it might
    // emit an error with process.nextTick
    process.nextTick($3b6102e3ec460a80$var$readAndResolve, iter);
}
function $3b6102e3ec460a80$var$wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
        lastPromise.then(function() {
            if (iter[$3b6102e3ec460a80$var$kEnded]) {
                resolve($3b6102e3ec460a80$var$createIterResult(undefined, true));
                return;
            }
            iter[$3b6102e3ec460a80$var$kHandlePromise](resolve, reject);
        }, reject);
    };
}
var $3b6102e3ec460a80$var$AsyncIteratorPrototype = Object.getPrototypeOf(function() {});
var $3b6102e3ec460a80$var$ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf(($3b6102e3ec460a80$var$_Object$setPrototypeO = {
    get stream () {
        return this[$3b6102e3ec460a80$var$kStream];
    },
    next: function next() {
        var _this = this;
        // if we have detected an error in the meanwhile
        // reject straight away
        var error = this[$3b6102e3ec460a80$var$kError];
        if (error !== null) return Promise.reject(error);
        if (this[$3b6102e3ec460a80$var$kEnded]) return Promise.resolve($3b6102e3ec460a80$var$createIterResult(undefined, true));
        if (this[$3b6102e3ec460a80$var$kStream].destroyed) // We need to defer via nextTick because if .destroy(err) is
        // called, the error will be emitted via nextTick, and
        // we cannot guarantee that there is no error lingering around
        // waiting to be emitted.
        return new Promise(function(resolve, reject) {
            process.nextTick(function() {
                if (_this[$3b6102e3ec460a80$var$kError]) reject(_this[$3b6102e3ec460a80$var$kError]);
                else resolve($3b6102e3ec460a80$var$createIterResult(undefined, true));
            });
        });
         // if we have multiple next() calls
        // we will wait for the previous Promise to finish
        // this logic is optimized to support for await loops,
        // where next() is only called once at a time
        var lastPromise = this[$3b6102e3ec460a80$var$kLastPromise];
        var promise;
        if (lastPromise) promise = new Promise($3b6102e3ec460a80$var$wrapForNext(lastPromise, this));
        else {
            // fast path needed to support multiple this.push()
            // without triggering the next() queue
            var data = this[$3b6102e3ec460a80$var$kStream].read();
            if (data !== null) return Promise.resolve($3b6102e3ec460a80$var$createIterResult(data, false));
            promise = new Promise(this[$3b6102e3ec460a80$var$kHandlePromise]);
        }
        this[$3b6102e3ec460a80$var$kLastPromise] = promise;
        return promise;
    }
}, $3b6102e3ec460a80$var$_defineProperty($3b6102e3ec460a80$var$_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
}), $3b6102e3ec460a80$var$_defineProperty($3b6102e3ec460a80$var$_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    // destroy(err, cb) is a private API
    // we can guarantee we have that here, because we control the
    // Readable class this is attached to
    return new Promise(function(resolve, reject) {
        _this2[$3b6102e3ec460a80$var$kStream].destroy(null, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve($3b6102e3ec460a80$var$createIterResult(undefined, true));
        });
    });
}), $3b6102e3ec460a80$var$_Object$setPrototypeO), $3b6102e3ec460a80$var$AsyncIteratorPrototype);
var $3b6102e3ec460a80$var$createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator = Object.create($3b6102e3ec460a80$var$ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, $3b6102e3ec460a80$var$_defineProperty(_Object$create, $3b6102e3ec460a80$var$kStream, {
        value: stream,
        writable: true
    }), $3b6102e3ec460a80$var$_defineProperty(_Object$create, $3b6102e3ec460a80$var$kLastResolve, {
        value: null,
        writable: true
    }), $3b6102e3ec460a80$var$_defineProperty(_Object$create, $3b6102e3ec460a80$var$kLastReject, {
        value: null,
        writable: true
    }), $3b6102e3ec460a80$var$_defineProperty(_Object$create, $3b6102e3ec460a80$var$kError, {
        value: null,
        writable: true
    }), $3b6102e3ec460a80$var$_defineProperty(_Object$create, $3b6102e3ec460a80$var$kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
    }), $3b6102e3ec460a80$var$_defineProperty(_Object$create, $3b6102e3ec460a80$var$kHandlePromise, {
        value: function value(resolve, reject) {
            var data = iterator[$3b6102e3ec460a80$var$kStream].read();
            if (data) {
                iterator[$3b6102e3ec460a80$var$kLastPromise] = null;
                iterator[$3b6102e3ec460a80$var$kLastResolve] = null;
                iterator[$3b6102e3ec460a80$var$kLastReject] = null;
                resolve($3b6102e3ec460a80$var$createIterResult(data, false));
            } else {
                iterator[$3b6102e3ec460a80$var$kLastResolve] = resolve;
                iterator[$3b6102e3ec460a80$var$kLastReject] = reject;
            }
        },
        writable: true
    }), _Object$create));
    iterator[$3b6102e3ec460a80$var$kLastPromise] = null;
    $hKh6s(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var reject = iterator[$3b6102e3ec460a80$var$kLastReject]; // reject if we are waiting for data in the Promise
            // returned by next() and store the error
            if (reject !== null) {
                iterator[$3b6102e3ec460a80$var$kLastPromise] = null;
                iterator[$3b6102e3ec460a80$var$kLastResolve] = null;
                iterator[$3b6102e3ec460a80$var$kLastReject] = null;
                reject(err);
            }
            iterator[$3b6102e3ec460a80$var$kError] = err;
            return;
        }
        var resolve = iterator[$3b6102e3ec460a80$var$kLastResolve];
        if (resolve !== null) {
            iterator[$3b6102e3ec460a80$var$kLastPromise] = null;
            iterator[$3b6102e3ec460a80$var$kLastResolve] = null;
            iterator[$3b6102e3ec460a80$var$kLastReject] = null;
            resolve($3b6102e3ec460a80$var$createIterResult(undefined, true));
        }
        iterator[$3b6102e3ec460a80$var$kEnded] = true;
    });
    stream.on("readable", $3b6102e3ec460a80$var$onReadable.bind(null, iterator));
    return iterator;
};
module.exports = $3b6102e3ec460a80$var$createReadableStreamAsyncIterator;

});
parcelRequire.register("hKh6s", function(module, exports) {
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
"use strict";

var $9cCav = parcelRequire("9cCav");
var $ceb3ffdd7245405c$var$ERR_STREAM_PREMATURE_CLOSE = $9cCav.codes.ERR_STREAM_PREMATURE_CLOSE;
function $ceb3ffdd7245405c$var$once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        callback.apply(this, args);
    };
}
function $ceb3ffdd7245405c$var$noop() {}
function $ceb3ffdd7245405c$var$isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}
function $ceb3ffdd7245405c$var$eos(stream, opts, callback) {
    if (typeof opts === "function") return $ceb3ffdd7245405c$var$eos(stream, null, opts);
    if (!opts) opts = {};
    callback = $ceb3ffdd7245405c$var$once(callback || $ceb3ffdd7245405c$var$noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable) onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
    };
    var onerror = function onerror(err) {
        callback.call(stream, err);
    };
    var onclose = function onclose() {
        var err;
        if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended) err = new $ceb3ffdd7245405c$var$ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended) err = new $ceb3ffdd7245405c$var$ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
    };
    var onrequest = function onrequest() {
        stream.req.on("finish", onfinish);
    };
    if ($ceb3ffdd7245405c$var$isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
        // legacy streams
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
    };
}
module.exports = $ceb3ffdd7245405c$var$eos;

});


parcelRequire.register("FMyqb", function(module, exports) {
"use strict";
function $07d97e4c9164e028$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $07d97e4c9164e028$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $07d97e4c9164e028$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $07d97e4c9164e028$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $07d97e4c9164e028$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $07d97e4c9164e028$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $07d97e4c9164e028$var$ownKeys(Object(source), true).forEach(function(key) {
            $07d97e4c9164e028$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $07d97e4c9164e028$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $07d97e4c9164e028$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

var $9cCav = parcelRequire("9cCav");
var $07d97e4c9164e028$var$ERR_INVALID_ARG_TYPE = $9cCav.codes.ERR_INVALID_ARG_TYPE;
function $07d97e4c9164e028$var$from(Readable, iterable, opts) {
    var iterator;
    if (iterable && typeof iterable.next === "function") iterator = iterable;
    else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
    else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
    else throw new $07d97e4c9164e028$var$ERR_INVALID_ARG_TYPE("iterable", [
        "Iterable"
    ], iterable);
    var readable = new Readable($07d97e4c9164e028$var$_objectSpread({
        objectMode: true
    }, opts)); // Reading boolean to protect against _read
    // being called before last iteration completion.
    var reading = false;
    readable._read = function() {
        if (!reading) {
            reading = true;
            next();
        }
    };
    function next() {
        return _next2.apply(this, arguments);
    }
    function _next2() {
        _next2 = $07d97e4c9164e028$var$_asyncToGenerator(function*() {
            try {
                var _ref = yield iterator.next(), value = _ref.value, done = _ref.done;
                if (done) readable.push(null);
                else if (readable.push((yield value))) next();
                else reading = false;
            } catch (err) {
                readable.destroy(err);
            }
        });
        return _next2.apply(this, arguments);
    }
    return readable;
}
module.exports = $07d97e4c9164e028$var$from;

});


parcelRequire.register("25qY5", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
"use strict";
module.exports = $1850f7b4f8806d8a$var$Transform;

var $9cCav = parcelRequire("9cCav");
var $1850f7b4f8806d8a$require$_require$codes = $9cCav.codes;
var $1850f7b4f8806d8a$var$ERR_METHOD_NOT_IMPLEMENTED = $1850f7b4f8806d8a$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $1850f7b4f8806d8a$var$ERR_MULTIPLE_CALLBACK = $1850f7b4f8806d8a$require$_require$codes.ERR_MULTIPLE_CALLBACK, $1850f7b4f8806d8a$var$ERR_TRANSFORM_ALREADY_TRANSFORMING = $1850f7b4f8806d8a$require$_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, $1850f7b4f8806d8a$var$ERR_TRANSFORM_WITH_LENGTH_0 = $1850f7b4f8806d8a$require$_require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var $lWLE4 = parcelRequire("lWLE4");

(parcelRequire("bo0qS"))($1850f7b4f8806d8a$var$Transform, $lWLE4);
function $1850f7b4f8806d8a$var$afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) return this.emit("error", new $1850f7b4f8806d8a$var$ERR_MULTIPLE_CALLBACK());
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
}
function $1850f7b4f8806d8a$var$Transform(options) {
    if (!(this instanceof $1850f7b4f8806d8a$var$Transform)) return new $1850f7b4f8806d8a$var$Transform(options);
    $lWLE4.call(this, options);
    this._transformState = {
        afterTransform: $1850f7b4f8806d8a$var$afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
    }; // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;
    if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
    } // When the writable side finishes, then flush out anything remaining.
    this.on("prefinish", $1850f7b4f8806d8a$var$prefinish);
}
function $1850f7b4f8806d8a$var$prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) this._flush(function(er, data) {
        $1850f7b4f8806d8a$var$done(_this, er, data);
    });
    else $1850f7b4f8806d8a$var$done(this, null, null);
}
$1850f7b4f8806d8a$var$Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return $lWLE4.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
$1850f7b4f8806d8a$var$Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new $1850f7b4f8806d8a$var$ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
};
$1850f7b4f8806d8a$var$Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
$1850f7b4f8806d8a$var$Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
};
$1850f7b4f8806d8a$var$Transform.prototype._destroy = function(err, cb) {
    $lWLE4.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
    });
};
function $1850f7b4f8806d8a$var$done(stream, er, data) {
    if (er) return stream.emit("error", er);
    if (data != null) stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    if (stream._writableState.length) throw new $1850f7b4f8806d8a$var$ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming) throw new $1850f7b4f8806d8a$var$ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
}

});

parcelRequire.register("1EHdT", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
"use strict";
module.exports = $134b0e1536d1c57e$var$PassThrough;

var $25qY5 = parcelRequire("25qY5");

(parcelRequire("bo0qS"))($134b0e1536d1c57e$var$PassThrough, $25qY5);
function $134b0e1536d1c57e$var$PassThrough(options) {
    if (!(this instanceof $134b0e1536d1c57e$var$PassThrough)) return new $134b0e1536d1c57e$var$PassThrough(options);
    $25qY5.call(this, options);
}
$134b0e1536d1c57e$var$PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
};

});

parcelRequire.register("2CGpz", function(module, exports) {
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
"use strict";
var $1e9007699aeb0cf9$var$eos;
function $1e9007699aeb0cf9$var$once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
    };
}

var $9cCav = parcelRequire("9cCav");
var $1e9007699aeb0cf9$require$_require$codes = $9cCav.codes;
var $1e9007699aeb0cf9$var$ERR_MISSING_ARGS = $1e9007699aeb0cf9$require$_require$codes.ERR_MISSING_ARGS, $1e9007699aeb0cf9$var$ERR_STREAM_DESTROYED = $1e9007699aeb0cf9$require$_require$codes.ERR_STREAM_DESTROYED;
function $1e9007699aeb0cf9$var$noop(err) {
    // Rethrow the error if it exists to avoid swallowing it
    if (err) throw err;
}
function $1e9007699aeb0cf9$var$isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}

function $1e9007699aeb0cf9$var$destroyer(stream, reading, writing, callback) {
    callback = $1e9007699aeb0cf9$var$once(callback);
    var closed = false;
    stream.on("close", function() {
        closed = true;
    });
    if ($1e9007699aeb0cf9$var$eos === undefined) $1e9007699aeb0cf9$var$eos = (parcelRequire("hKh6s"));
    $1e9007699aeb0cf9$var$eos(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true; // request.destroy just do .end - .abort is what we want
        if ($1e9007699aeb0cf9$var$isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err || new $1e9007699aeb0cf9$var$ERR_STREAM_DESTROYED("pipe"));
    };
}
function $1e9007699aeb0cf9$var$call(fn) {
    fn();
}
function $1e9007699aeb0cf9$var$pipe(from, to) {
    return from.pipe(to);
}
function $1e9007699aeb0cf9$var$popCallback(streams) {
    if (!streams.length) return $1e9007699aeb0cf9$var$noop;
    if (typeof streams[streams.length - 1] !== "function") return $1e9007699aeb0cf9$var$noop;
    return streams.pop();
}
function $1e9007699aeb0cf9$var$pipeline() {
    for(var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++)streams[_key] = arguments[_key];
    var callback = $1e9007699aeb0cf9$var$popCallback(streams);
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new $1e9007699aeb0cf9$var$ERR_MISSING_ARGS("streams");
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return $1e9007699aeb0cf9$var$destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach($1e9007699aeb0cf9$var$call);
            if (reading) return;
            destroys.forEach($1e9007699aeb0cf9$var$call);
            callback(error);
        });
    });
    return streams.reduce($1e9007699aeb0cf9$var$pipe);
}
module.exports = $1e9007699aeb0cf9$var$pipeline;

});


parcelRequire.register("1A7Gz", function(module, exports) {

$parcel$export(module.exports, "NodePackageManager", () => NodePackageManager, (v) => NodePackageManager = v);









var $8Op9T = parcelRequire("8Op9T");


var $1wfKO = parcelRequire("1wfKO");

var $a5owR = parcelRequire("a5owR");

var $iQzlD = parcelRequire("iQzlD");


// Package.json fields. Must match package_json.rs.
const MAIN = 1;
const SOURCE = 4;
const ENTRIES = MAIN | ((0, process.env.PARCEL_SELF_BUILD) ? SOURCE : 0);
// There can be more than one instance of NodePackageManager, but node has only a single module cache.
// Therefore, the resolution cache and the map of parent to child modules should also be global.
const cache = new Map();
const children = new Map();
const invalidationsCache = new Map();
class NodePackageManager {
    constructor(fs, projectRoot, installer){
        this.fs = fs;
        this.projectRoot = projectRoot;
        this.installer = installer;
    }
    _createResolver() {
        return new (0, $5VgCY$parcelnoderesolvercore.ResolverBase)(this.projectRoot, {
            fs: this.fs instanceof (0, $5VgCY$parcelfs.NodeFS) && process.versions.pnp == null ? undefined : {
                canonicalize: (path)=>this.fs.realpathSync(path),
                read: (path)=>this.fs.readFileSync(path),
                isFile: (path)=>this.fs.statSync(path).isFile(),
                isDir: (path)=>this.fs.statSync(path).isDirectory()
            },
            mode: 2,
            entries: ENTRIES,
            packageExports: true,
            moduleDirResolver: process.versions.pnp != null ? (module1, from)=>{
                // $FlowFixMe[prop-missing]
                let pnp = (0, ($parcel$interopDefault($5VgCY$module))).findPnpApi((0, ($parcel$interopDefault($5VgCY$path))).dirname(from));
                return pnp.resolveToUnqualified(// append slash to force loading builtins from npm
                module1 + "/", from);
            } : undefined
        });
    }
    static deserialize(opts) {
        return new NodePackageManager(opts.fs, opts.projectRoot, opts.installer);
    }
    serialize() {
        return {
            $$raw: false,
            fs: this.fs,
            projectRoot: this.projectRoot,
            installer: this.installer
        };
    }
    async require(name, from, opts) {
        let { resolved , type  } = await this.resolve(name, from, opts);
        if (type === 2) {
            (0, ($parcel$interopDefault($5VgCY$parcellogger))).warn({
                message: "ES module dependencies are experimental.",
                origin: "@parcel/package-manager",
                codeFrames: [
                    {
                        filePath: resolved,
                        codeHighlights: []
                    }
                ]
            });
            // On Windows, Node requires absolute paths to be file URLs.
            if (process.platform === "win32" && (0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(resolved)) resolved = (0, $5VgCY$url.pathToFileURL)(resolved);
            // $FlowFixMe
            return import(resolved);
        }
        return this.load(resolved, from);
    }
    requireSync(name, from) {
        let { resolved  } = this.resolveSync(name, from);
        return this.load(resolved, from);
    }
    load(filePath, from) {
        if (!(0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(filePath)) // Node builtin module
        // $FlowFixMe
        return require(filePath);
        // $FlowFixMe[prop-missing]
        const cachedModule = (0, ($parcel$interopDefault($5VgCY$module)))._cache[filePath];
        if (cachedModule !== undefined) return cachedModule.exports;
        // $FlowFixMe
        let m = new (0, ($parcel$interopDefault($5VgCY$module)))(filePath, (0, ($parcel$interopDefault($5VgCY$module)))._cache[from] || module.parent);
        // $FlowFixMe[prop-missing]
        (0, ($parcel$interopDefault($5VgCY$module)))._cache[filePath] = m;
        // Patch require within this module so it goes through our require
        m.require = (id)=>{
            return this.requireSync(id, filePath);
        };
        // Patch `fs.readFileSync` temporarily so that it goes through our file system
        let { readFileSync , statSync  } = (0, ($parcel$interopDefault($5VgCY$fs)));
        // $FlowFixMe
        (0, ($parcel$interopDefault($5VgCY$fs))).readFileSync = (filename, encoding)=>{
            return this.fs.readFileSync(filename, encoding);
        };
        // $FlowFixMe
        (0, ($parcel$interopDefault($5VgCY$fs))).statSync = (filename)=>{
            return this.fs.statSync(filename);
        };
        try {
            m.load(filePath);
        } catch (err) {
            // $FlowFixMe[prop-missing]
            delete (0, ($parcel$interopDefault($5VgCY$module)))._cache[filePath];
            throw err;
        } finally{
            // $FlowFixMe
            (0, ($parcel$interopDefault($5VgCY$fs))).readFileSync = readFileSync;
            // $FlowFixMe
            (0, ($parcel$interopDefault($5VgCY$fs))).statSync = statSync;
        }
        return m.exports;
    }
    async resolve(id, from, options) {
        let basedir = (0, ($parcel$interopDefault($5VgCY$path))).dirname(from);
        let key = basedir + ":" + id;
        let resolved = cache.get(key);
        if (!resolved) {
            let [name] = (0, $5VgCY$parcelutils.getModuleParts)(id);
            try {
                resolved = this.resolveInternal(id, from);
            } catch (e) {
                if (e.code !== "MODULE_NOT_FOUND" || (options === null || options === void 0 ? void 0 : options.shouldAutoInstall) !== true) {
                    if (e.code === "MODULE_NOT_FOUND" && (options === null || options === void 0 ? void 0 : options.shouldAutoInstall) !== true) {
                        let err = new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
                            diagnostic: {
                                message: (0, $5VgCY$parceldiagnostic.escapeMarkdown)(e.message),
                                hints: [
                                    "Autoinstall is disabled, please install this package manually and restart Parcel."
                                ]
                            }
                        });
                        // $FlowFixMe - needed for loadParcelPlugin
                        err.code = "MODULE_NOT_FOUND";
                        throw err;
                    } else throw e;
                }
                let conflicts = await (0, $1wfKO.getConflictingLocalDependencies)(this.fs, name, from, this.projectRoot);
                if (conflicts == null) {
                    this.invalidate(id, from);
                    var _options_saveDev;
                    await this.install([
                        {
                            name: name,
                            range: options === null || options === void 0 ? void 0 : options.range
                        }
                    ], from, {
                        saveDev: (_options_saveDev = options === null || options === void 0 ? void 0 : options.saveDev) !== null && _options_saveDev !== void 0 ? _options_saveDev : true
                    });
                    return this.resolve(id, from, {
                        ...options,
                        shouldAutoInstall: false
                    });
                }
                throw new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
                    diagnostic: conflicts.fields.map((field)=>({
                            message: (0, $5VgCY$parceldiagnostic.md)`Could not find module "${name}", but it was listed in package.json. Run your package manager first.`,
                            origin: "@parcel/package-manager",
                            codeFrames: [
                                {
                                    filePath: conflicts.filePath,
                                    language: "json",
                                    code: conflicts.json,
                                    codeHighlights: (0, $5VgCY$parceldiagnostic.generateJSONCodeHighlights)(conflicts.json, [
                                        {
                                            key: `/${field}/${(0, $5VgCY$parceldiagnostic.encodeJSONKeyComponent)(name)}`,
                                            type: "key",
                                            message: "Defined here, but not installed"
                                        }
                                    ])
                                }
                            ]
                        }))
                });
            }
            let range = options === null || options === void 0 ? void 0 : options.range;
            if (range != null) {
                let pkg = resolved.pkg;
                if (pkg == null || !(0, ($parcel$interopDefault($5VgCY$semver))).satisfies(pkg.version, range)) {
                    let conflicts = await (0, $1wfKO.getConflictingLocalDependencies)(this.fs, name, from, this.projectRoot);
                    if (conflicts == null && (options === null || options === void 0 ? void 0 : options.shouldAutoInstall) === true) {
                        this.invalidate(id, from);
                        await this.install([
                            {
                                name: name,
                                range: range
                            }
                        ], from);
                        return this.resolve(id, from, {
                            ...options,
                            shouldAutoInstall: false
                        });
                    } else if (conflicts != null) throw new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
                        diagnostic: {
                            message: (0, $5VgCY$parceldiagnostic.md)`Could not find module "${name}" satisfying ${range}.`,
                            origin: "@parcel/package-manager",
                            codeFrames: [
                                {
                                    filePath: conflicts.filePath,
                                    language: "json",
                                    code: conflicts.json,
                                    codeHighlights: (0, $5VgCY$parceldiagnostic.generateJSONCodeHighlights)(conflicts.json, conflicts.fields.map((field)=>({
                                            key: `/${field}/${(0, $5VgCY$parceldiagnostic.encodeJSONKeyComponent)(name)}`,
                                            type: "key",
                                            message: "Found this conflicting local requirement."
                                        })))
                                }
                            ]
                        }
                    });
                    let version = pkg === null || pkg === void 0 ? void 0 : pkg.version;
                    let message = (0, $5VgCY$parceldiagnostic.md)`Could not resolve package "${name}" that satisfies ${range}.`;
                    if (version != null) message += (0, $5VgCY$parceldiagnostic.md)` Found ${version}.`;
                    throw new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
                        diagnostic: {
                            message: message,
                            hints: [
                                "Looks like the incompatible version was installed transitively. Add this package as a direct dependency with a compatible version range."
                            ]
                        }
                    });
                }
            }
            cache.set(key, resolved);
            invalidationsCache.clear();
            // Add the specifier as a child to the parent module.
            // Don't do this if the specifier was an absolute path, as this was likely a dynamically resolved path
            // (e.g. babel uses require() to load .babelrc.js configs and we don't want them to be added  as children of babel itself).
            if (!(0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(name)) {
                let moduleChildren = children.get(from);
                if (!moduleChildren) {
                    moduleChildren = new Set();
                    children.set(from, moduleChildren);
                }
                moduleChildren.add(name);
            }
        }
        return resolved;
    }
    resolveSync(name, from) {
        let basedir = (0, ($parcel$interopDefault($5VgCY$path))).dirname(from);
        let key = basedir + ":" + name;
        let resolved = cache.get(key);
        if (!resolved) {
            resolved = this.resolveInternal(name, from);
            cache.set(key, resolved);
            invalidationsCache.clear();
            if (!(0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(name)) {
                let moduleChildren = children.get(from);
                if (!moduleChildren) {
                    moduleChildren = new Set();
                    children.set(from, moduleChildren);
                }
                moduleChildren.add(name);
            }
        }
        return resolved;
    }
    async install(modules, from, opts) {
        await (0, $a5owR.installPackage)(this.fs, this, modules, from, this.projectRoot, {
            packageInstaller: this.installer,
            ...opts
        });
    }
    getInvalidations(name, from) {
        let basedir = (0, ($parcel$interopDefault($5VgCY$path))).dirname(from);
        let resolved = cache.get(basedir + ":" + name);
        if (resolved && (0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(resolved.resolved)) {
            let cached = invalidationsCache.get(resolved.resolved);
            if (cached != null) return cached;
            let res = {
                invalidateOnFileCreate: [],
                invalidateOnFileChange: new Set(),
                invalidateOnStartup: false
            };
            let seen = new Set();
            let addKey = (name, from)=>{
                let basedir = (0, ($parcel$interopDefault($5VgCY$path))).dirname(from);
                let key = basedir + ":" + name;
                if (seen.has(key)) return;
                seen.add(key);
                let resolved = cache.get(key);
                if (!resolved || !(0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(resolved.resolved)) return;
                res.invalidateOnFileCreate.push(...resolved.invalidateOnFileCreate);
                res.invalidateOnFileChange.add(resolved.resolved);
                for (let file of resolved.invalidateOnFileChange)res.invalidateOnFileChange.add(file);
                let moduleChildren = children.get(resolved.resolved);
                if (moduleChildren) for (let specifier of moduleChildren)addKey(specifier, resolved.resolved);
            };
            addKey(name, from);
            // If this is an ES module, we won't have any of the dependencies because import statements
            // cannot be intercepted. Instead, ask the resolver to parse the file and recursively analyze the deps.
            if (resolved.type === 2) {
                var _res;
                let invalidations = this.resolver.getInvalidations(resolved.resolved);
                invalidations.invalidateOnFileChange.forEach((i)=>res.invalidateOnFileChange.add(i));
                invalidations.invalidateOnFileCreate.forEach((i)=>res.invalidateOnFileCreate.push(i));
                (_res = res).invalidateOnStartup || (_res.invalidateOnStartup = invalidations.invalidateOnStartup);
                if (res.invalidateOnStartup) (0, ($parcel$interopDefault($5VgCY$parcellogger))).warn({
                    message: (0, $5VgCY$parceldiagnostic.md)`${(0, ($parcel$interopDefault($5VgCY$path))).relative(this.projectRoot, resolved.resolved)} contains non-statically analyzable dependencies in its module graph. This causes Parcel to invalidate the cache on startup.`,
                    origin: "@parcel/package-manager"
                });
            }
            invalidationsCache.set(resolved.resolved, res);
            return res;
        }
        return {
            invalidateOnFileCreate: [],
            invalidateOnFileChange: new Set(),
            invalidateOnStartup: false
        };
    }
    invalidate(name, from) {
        let seen = new Set();
        let invalidate = (name, from)=>{
            let basedir = (0, ($parcel$interopDefault($5VgCY$path))).dirname(from);
            let key = basedir + ":" + name;
            if (seen.has(key)) return;
            seen.add(key);
            let resolved = cache.get(key);
            if (!resolved || !(0, ($parcel$interopDefault($5VgCY$path))).isAbsolute(resolved.resolved)) return;
            invalidationsCache.delete(resolved.resolved);
            // $FlowFixMe
            let module1 = (0, ($parcel$interopDefault($5VgCY$module)))._cache[resolved.resolved];
            if (module1) // $FlowFixMe
            delete (0, ($parcel$interopDefault($5VgCY$module)))._cache[resolved.resolved];
            let moduleChildren = children.get(resolved.resolved);
            if (moduleChildren) for (let specifier of moduleChildren)invalidate(specifier, resolved.resolved);
            children.delete(resolved.resolved);
            cache.delete(key);
        };
        invalidate(name, from);
        this.resolver = this._createResolver();
    }
    resolveInternal(name, from) {
        if (this.resolver == null) this.resolver = this._createResolver();
        let res = this.resolver.resolve({
            filename: name,
            specifierType: "commonjs",
            parent: from
        });
        // Invalidate whenever the .pnp.js file changes.
        // TODO: only when we actually resolve a node_modules package?
        if (process.versions.pnp != null && res.invalidateOnFileChange) {
            // $FlowFixMe[prop-missing]
            let pnp = (0, ($parcel$interopDefault($5VgCY$module))).findPnpApi((0, ($parcel$interopDefault($5VgCY$path))).dirname(from));
            res.invalidateOnFileChange.push(pnp.resolveToUnqualified("pnpapi", null));
        }
        if (res.error) {
            let e = new Error(`Could not resolve module "${name}" from "${from}"`);
            // $FlowFixMe
            e.code = "MODULE_NOT_FOUND";
            throw e;
        }
        let getPkg;
        switch(res.resolution.type){
            case "Path":
                getPkg = ()=>{
                    let pkgPath = this.fs.findAncestorFile([
                        "package.json"
                    ], (0, (/*@__PURE__*/$parcel$interopDefault($8Op9T)))(res.resolution.value), this.projectRoot);
                    return pkgPath ? JSON.parse(this.fs.readFileSync(pkgPath, "utf8")) : null;
                };
            // fallthrough
            case "Builtin":
                return {
                    resolved: res.resolution.value,
                    invalidateOnFileChange: new Set(res.invalidateOnFileChange),
                    invalidateOnFileCreate: res.invalidateOnFileCreate,
                    type: res.moduleType,
                    get pkg () {
                        return getPkg();
                    }
                };
            default:
                throw new Error("Unknown resolution type");
        }
    }
}
(0, $5VgCY$parcelcore.registerSerializableClass)(`${(0, (/*@__PURE__*/$parcel$interopDefault($iQzlD))).version}:NodePackageManager`, NodePackageManager);

});
parcelRequire.register("8Op9T", function(module, exports) {
"use strict";
function $66a6823bf479d90d$var$nullthrows(x, message) {
    if (x != null) return x;
    var error = new Error(message !== undefined ? message : "Got unexpected " + x);
    error.framesToPop = 1; // Skip nullthrows's own stack frame.
    throw error;
}
module.exports = $66a6823bf479d90d$var$nullthrows;
module.exports.default = $66a6823bf479d90d$var$nullthrows;
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

});

parcelRequire.register("1wfKO", function(module, exports) {

$parcel$export(module.exports, "exec", () => $11b50004ffd5ca8b$export$78e3044358792147);
$parcel$export(module.exports, "npmSpecifierFromModuleRequest", () => $11b50004ffd5ca8b$export$44a673cac0f09696);
$parcel$export(module.exports, "moduleRequestsFromDependencyMap", () => $11b50004ffd5ca8b$export$8e3ae06b6f2ee6e2);
$parcel$export(module.exports, "getConflictingLocalDependencies", () => $11b50004ffd5ca8b$export$ab9915b45c70a034);





const $11b50004ffd5ca8b$export$78e3044358792147 = (0, $5VgCY$util.promisify)((0, $5VgCY$child_process.exec));
function $11b50004ffd5ca8b$export$44a673cac0f09696(moduleRequest) {
    return moduleRequest.range != null ? [
        moduleRequest.name,
        moduleRequest.range
    ].join("@") : moduleRequest.name;
}
function $11b50004ffd5ca8b$export$8e3ae06b6f2ee6e2(dependencyMap) {
    return Object.entries(dependencyMap).map(([name, range])=>{
        (0, ($parcel$interopDefault($5VgCY$assert)))(typeof range === "string");
        return {
            name: name,
            range: range
        };
    });
}
async function $11b50004ffd5ca8b$export$ab9915b45c70a034(fs, name, local, projectRoot) {
    let pkgPath = await (0, $5VgCY$parcelutils.resolveConfig)(fs, local, [
        "package.json"
    ], projectRoot);
    if (pkgPath == null) return;
    let pkgStr = await fs.readFile(pkgPath, "utf8");
    let pkg;
    try {
        pkg = JSON.parse(pkgStr);
    } catch (e) {
        // TODO: codeframe
        throw new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
            diagnostic: {
                message: "Failed to parse package.json",
                origin: "@parcel/package-manager"
            }
        });
    }
    if (typeof pkg !== "object" || pkg == null) // TODO: codeframe
    throw new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
        diagnostic: {
            message: "Expected package.json contents to be an object.",
            origin: "@parcel/package-manager"
        }
    });
    let fields = [];
    for (let field of [
        "dependencies",
        "devDependencies",
        "peerDependencies"
    ])if (typeof pkg[field] === "object" && pkg[field] != null && pkg[field][name] != null) fields.push(field);
    if (fields.length > 0) return {
        filePath: pkgPath,
        json: pkgStr,
        fields: fields
    };
}

});

parcelRequire.register("a5owR", function(module, exports) {

$parcel$export(module.exports, "_addToInstallQueue", () => $757d65f2d0ad4f8e$export$f09e6d5146bb6da1);
$parcel$export(module.exports, "installPackage", () => $757d65f2d0ad4f8e$export$9c0565d18deefc7f);



var $8Op9T = parcelRequire("8Op9T");






var $c8MW1 = parcelRequire("c8MW1");

var $dVe9H = parcelRequire("dVe9H");

var $cXLl4 = parcelRequire("cXLl4");

var $1wfKO = parcelRequire("1wfKO");

var $dQlwx = parcelRequire("dQlwx");

var $757d65f2d0ad4f8e$var$$parcel$__dirname = $5VgCY$path.resolve(__dirname, "../src");

var $757d65f2d0ad4f8e$var$$parcel$__filename = $5VgCY$path.resolve(__dirname, "../src", "installPackage.js");
async function $757d65f2d0ad4f8e$var$install(fs, packageManager, modules, from, projectRoot, options = {}) {
    let { installPeers: installPeers = true , saveDev: saveDev = true , packageInstaller: packageInstaller  } = options;
    let moduleNames = modules.map((m)=>m.name).join(", ");
    (0, ($parcel$interopDefault($5VgCY$parcellogger))).progress(`Installing ${moduleNames}...`);
    let fromPkgPath = await (0, $5VgCY$parcelutils.resolveConfig)(fs, from, [
        "package.json"
    ], projectRoot);
    let cwd = fromPkgPath ? (0, ($parcel$interopDefault($5VgCY$path))).dirname(fromPkgPath) : fs.cwd();
    if (!packageInstaller) packageInstaller = await $757d65f2d0ad4f8e$var$determinePackageInstaller(fs, from, projectRoot);
    try {
        await packageInstaller.install({
            modules: modules,
            saveDev: saveDev,
            cwd: cwd,
            packagePath: fromPkgPath,
            fs: fs
        });
    } catch (err) {
        throw new Error(`Failed to install ${moduleNames}: ${err.message}`);
    }
    if (installPeers) await Promise.all(modules.map((m)=>$757d65f2d0ad4f8e$var$installPeerDependencies(fs, packageManager, m, from, projectRoot, options)));
}
async function $757d65f2d0ad4f8e$var$installPeerDependencies(fs, packageManager, module, from, projectRoot, options) {
    const { resolved: resolved  } = await packageManager.resolve(module.name, from);
    const modulePkg = (0, (/*@__PURE__*/$parcel$interopDefault($8Op9T)))(await (0, $5VgCY$parcelutils.loadConfig)(fs, resolved, [
        "package.json"
    ], projectRoot)).config;
    const peers = modulePkg.peerDependencies || {};
    let modules = [];
    for (let [name, range] of Object.entries(peers)){
        (0, ($parcel$interopDefault($5VgCY$assert)))(typeof range === "string");
        let conflicts = await (0, $1wfKO.getConflictingLocalDependencies)(fs, name, from, projectRoot);
        if (conflicts) {
            let { pkg: pkg  } = await packageManager.resolve(name, from);
            (0, ($parcel$interopDefault($5VgCY$assert)))(pkg);
            if (!(0, ($parcel$interopDefault($5VgCY$semver))).satisfies(pkg.version, range)) throw new (0, ($parcel$interopDefault($5VgCY$parceldiagnostic)))({
                diagnostic: {
                    message: (0, $5VgCY$parceldiagnostic.md)`Could not install the peer dependency "${name}" for "${module.name}", installed version ${pkg.version} is incompatible with ${range}`,
                    origin: "@parcel/package-manager",
                    codeFrames: [
                        {
                            filePath: conflicts.filePath,
                            language: "json",
                            code: conflicts.json,
                            codeHighlights: (0, $5VgCY$parceldiagnostic.generateJSONCodeHighlights)(conflicts.json, conflicts.fields.map((field)=>({
                                    key: `/${field}/${(0, $5VgCY$parceldiagnostic.encodeJSONKeyComponent)(name)}`,
                                    type: "key",
                                    message: "Found this conflicting local requirement."
                                })))
                        }
                    ]
                }
            });
            continue;
        }
        modules.push({
            name: name,
            range: range
        });
    }
    if (modules.length) await $757d65f2d0ad4f8e$var$install(fs, packageManager, modules, from, projectRoot, Object.assign({}, options, {
        installPeers: false
    }));
}
async function $757d65f2d0ad4f8e$var$determinePackageInstaller(fs, filepath, projectRoot) {
    let configFile = await (0, $5VgCY$parcelutils.resolveConfig)(fs, filepath, [
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock"
    ], projectRoot);
    let configName = configFile && (0, ($parcel$interopDefault($5VgCY$path))).basename(configFile);
    // Always use the package manager that seems to be used in the project,
    // falling back to a different one wouldn't update the existing lockfile.
    if (configName === "package-lock.json") return new (0, $c8MW1.Npm)();
    else if (configName === "pnpm-lock.yaml") return new (0, $cXLl4.Pnpm)();
    else if (configName === "yarn.lock") return new (0, $dVe9H.Yarn)();
    if (await (0, $dVe9H.Yarn).exists()) return new (0, $dVe9H.Yarn)();
    else if (await (0, $cXLl4.Pnpm).exists()) return new (0, $cXLl4.Pnpm)();
    else return new (0, $c8MW1.Npm)();
}
let $757d65f2d0ad4f8e$var$queue = new (0, $5VgCY$parcelutils.PromiseQueue)({
    maxConcurrent: 1
});
let $757d65f2d0ad4f8e$var$modulesInstalling = new Set();
function $757d65f2d0ad4f8e$export$f09e6d5146bb6da1(fs, packageManager, modules, filePath, projectRoot, options) {
    modules = modules.map((request)=>({
            name: (0, $dQlwx.default)(request.name),
            range: request.range
        }));
    // Wrap PromiseQueue and track modules that are currently installing.
    // If a request comes in for a module that is currently installing, don't bother
    // enqueuing it.
    let modulesToInstall = modules.filter((m)=>!$757d65f2d0ad4f8e$var$modulesInstalling.has($757d65f2d0ad4f8e$var$getModuleRequestKey(m)));
    if (modulesToInstall.length) {
        for (let m of modulesToInstall)$757d65f2d0ad4f8e$var$modulesInstalling.add($757d65f2d0ad4f8e$var$getModuleRequestKey(m));
        $757d65f2d0ad4f8e$var$queue.add(()=>$757d65f2d0ad4f8e$var$install(fs, packageManager, modulesToInstall, filePath, projectRoot, options).then(()=>{
                for (let m of modulesToInstall)$757d65f2d0ad4f8e$var$modulesInstalling.delete($757d65f2d0ad4f8e$var$getModuleRequestKey(m));
            })).then(()=>{}, ()=>{});
    }
    return $757d65f2d0ad4f8e$var$queue.run();
}
function $757d65f2d0ad4f8e$export$9c0565d18deefc7f(fs, packageManager, modules, filePath, projectRoot, options) {
    if ((0, ($parcel$interopDefault($5VgCY$parcelworkers))).isWorker()) {
        let workerApi = (0, ($parcel$interopDefault($5VgCY$parcelworkers))).getWorkerApi();
        // TODO this should really be `__filename` but without the rewriting.
        let bundlePath = !process.env.PARCEL_SELF_BUILD ? (0, ($parcel$interopDefault($5VgCY$path))).join($757d65f2d0ad4f8e$var$$parcel$__dirname, "..", "lib/index.js") : $757d65f2d0ad4f8e$var$$parcel$__filename;
        return workerApi.callMaster({
            location: bundlePath,
            args: [
                fs,
                packageManager,
                modules,
                filePath,
                projectRoot,
                options
            ],
            method: "_addToInstallQueue"
        });
    }
    return $757d65f2d0ad4f8e$export$f09e6d5146bb6da1(fs, packageManager, modules, filePath, projectRoot, options);
}
function $757d65f2d0ad4f8e$var$getModuleRequestKey(moduleRequest) {
    return [
        moduleRequest.name,
        moduleRequest.range
    ].join("@");
}

});
parcelRequire.register("c8MW1", function(module, exports) {

$parcel$export(module.exports, "Npm", () => $8d6c30d2df113689$export$bc651973ec076cd0);


var $8JYdY = parcelRequire("8JYdY");


var $hrLKv = parcelRequire("hrLKv");


var $1wfKO = parcelRequire("1wfKO");

var $iQzlD = parcelRequire("iQzlD");
const $8d6c30d2df113689$var$NPM_CMD = "npm";
class $8d6c30d2df113689$export$bc651973ec076cd0 {
    async install({ modules: modules , cwd: cwd , fs: fs , packagePath: packagePath , saveDev: saveDev = true  }) {
        // npm doesn't auto-create a package.json when installing,
        // so create an empty one if needed.
        if (packagePath == null) await fs.writeFile((0, ($parcel$interopDefault($5VgCY$path))).join(cwd, "package.json"), "{}");
        let args = [
            "install",
            "--json",
            saveDev ? "--save-dev" : "--save"
        ].concat(modules.map((0, $1wfKO.npmSpecifierFromModuleRequest)));
        // When Parcel is run by npm (e.g. via package.json scripts), several environment variables are
        // added. When parcel in turn calls npm again, these can cause npm to behave stragely, so we
        // filter them out when installing packages.
        let env = {};
        for(let key in process.env)if (!key.startsWith("npm_") && key !== "INIT_CWD" && key !== "NODE_ENV") env[key] = process.env[key];
        let installProcess = (0, (/*@__PURE__*/$parcel$interopDefault($8JYdY)))($8d6c30d2df113689$var$NPM_CMD, args, {
            cwd: cwd,
            env: env
        });
        let stdout = "";
        installProcess.stdout.on("data", (buf)=>{
            stdout += buf.toString();
        });
        let stderr = [];
        installProcess.stderr.on("data", (buf)=>{
            stderr.push(buf.toString().trim());
        });
        try {
            await (0, $hrLKv.default)(installProcess);
            let results = JSON.parse(stdout);
            let addedCount = results.added.length;
            if (addedCount > 0) (0, ($parcel$interopDefault($5VgCY$parcellogger))).log({
                origin: "@parcel/package-manager",
                message: `Added ${addedCount} packages via npm`
            });
            // Since we succeeded, stderr might have useful information not included
            // in the json written to stdout. It's also not necessary to log these as
            // errors as they often aren't.
            for (let message of stderr)if (message.length > 0) (0, ($parcel$interopDefault($5VgCY$parcellogger))).log({
                origin: "@parcel/package-manager",
                message: message
            });
        } catch (e) {
            throw new Error("npm failed to install modules: " + e.message + " - " + stderr.join("\n"));
        }
    }
}
(0, $5VgCY$parcelcore.registerSerializableClass)(`${(0, (/*@__PURE__*/$parcel$interopDefault($iQzlD))).version}:Npm`, $8d6c30d2df113689$export$bc651973ec076cd0);

});
parcelRequire.register("8JYdY", function(module, exports) {
"use strict";


var $aY1Fc = parcelRequire("aY1Fc");

var $4hfSG = parcelRequire("4hfSG");
function $65d13e0199fca744$var$spawn(command, args, options) {
    // Parse the arguments
    const parsed = $aY1Fc(command, args, options);
    // Spawn the child process
    const spawned = $5VgCY$child_process.spawn(parsed.command, parsed.args, parsed.options);
    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    $4hfSG.hookChildProcess(spawned, parsed);
    return spawned;
}
function $65d13e0199fca744$var$spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = $aY1Fc(command, args, options);
    // Spawn the child process
    const result = $5VgCY$child_process.spawnSync(parsed.command, parsed.args, parsed.options);
    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || $4hfSG.verifyENOENTSync(result.status, parsed);
    return result;
}
module.exports = $65d13e0199fca744$var$spawn;
module.exports.spawn = $65d13e0199fca744$var$spawn;
module.exports.sync = $65d13e0199fca744$var$spawnSync;
module.exports._parse = $aY1Fc;
module.exports._enoent = $4hfSG;

});
parcelRequire.register("aY1Fc", function(module, exports) {
"use strict";


var $78wYX = parcelRequire("78wYX");

var $aZ84w = parcelRequire("aZ84w");

var $7Wxms = parcelRequire("7Wxms");

var $19GvR = parcelRequire("19GvR");

const $7fc0cc57458f8ae8$var$isWin = process.platform === "win32";
const $7fc0cc57458f8ae8$var$isExecutableRegExp = /\.(?:com|exe)$/i;
const $7fc0cc57458f8ae8$var$isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
// `options.shell` is supported in Node ^4.8.0, ^5.7.0 and >= 6.0.0
const $7fc0cc57458f8ae8$var$supportsShellOption = $78wYX(()=>$5VgCY$semver.satisfies(process.version, "^4.8.0 || ^5.7.0 || >= 6.0.0", true)) || false;
function $7fc0cc57458f8ae8$var$detectShebang(parsed) {
    parsed.file = $aZ84w(parsed);
    const shebang = parsed.file && $19GvR(parsed.file);
    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return $aZ84w(parsed);
    }
    return parsed.file;
}
function $7fc0cc57458f8ae8$var$parseNonShell(parsed) {
    if (!$7fc0cc57458f8ae8$var$isWin) return parsed;
    // Detect & add support for shebangs
    const commandFile = $7fc0cc57458f8ae8$var$detectShebang(parsed);
    // We don't need a shell if the command filename is an executable
    const needsShell = !$7fc0cc57458f8ae8$var$isExecutableRegExp.test(commandFile);
    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = $7fc0cc57458f8ae8$var$isCmdShimRegExp.test(commandFile);
        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = $5VgCY$path.normalize(parsed.command);
        // Escape command & arguments
        parsed.command = $7Wxms.command(parsed.command);
        parsed.args = parsed.args.map((arg)=>$7Wxms.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [
            parsed.command
        ].concat(parsed.args).join(" ");
        parsed.args = [
            "/d",
            "/s",
            "/c",
            `"${shellCommand}"`
        ];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }
    return parsed;
}
function $7fc0cc57458f8ae8$var$parseShell(parsed) {
    // If node supports the shell option, there's no need to mimic its behavior
    if ($7fc0cc57458f8ae8$var$supportsShellOption) return parsed;
    // Mimic node shell option
    // See https://github.com/nodejs/node/blob/b9f6a2dc059a1062776133f3d4fd848c4da7d150/lib/child_process.js#L335
    const shellCommand = [
        parsed.command
    ].concat(parsed.args).join(" ");
    if ($7fc0cc57458f8ae8$var$isWin) {
        parsed.command = typeof parsed.options.shell === "string" ? parsed.options.shell : process.env.comspec || "cmd.exe";
        parsed.args = [
            "/d",
            "/s",
            "/c",
            `"${shellCommand}"`
        ];
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    } else {
        if (typeof parsed.options.shell === "string") parsed.command = parsed.options.shell;
        else if (process.platform === "android") parsed.command = "/system/bin/sh";
        else parsed.command = "/bin/sh";
        parsed.args = [
            "-c",
            shellCommand
        ];
    }
    return parsed;
}
function $7fc0cc57458f8ae8$var$parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }
    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original
    // Build our parsed object
    const parsed = {
        command: command,
        args: args,
        options: options,
        file: undefined,
        original: {
            command: command,
            args: args
        }
    };
    // Delegate further parsing to shell or non-shell
    return options.shell ? $7fc0cc57458f8ae8$var$parseShell(parsed) : $7fc0cc57458f8ae8$var$parseNonShell(parsed);
}
module.exports = $7fc0cc57458f8ae8$var$parse;

});
parcelRequire.register("78wYX", function(module, exports) {
"use strict";
/**
 * Tries to execute a function and discards any error that occurs.
 * @param {Function} fn - Function that might or might not throw an error.
 * @returns {?*} Return-value of the function when no error occurred.
 */ module.exports = function(fn) {
    try {
        return fn();
    } catch (e) {}
};

});

parcelRequire.register("aZ84w", function(module, exports) {
"use strict";


var $cw1YF = parcelRequire("cw1YF");

const $02105a455fbe96e1$var$pathKey = (parcelRequire("hjhEx"))();
function $02105a455fbe96e1$var$resolveCommandAttempt(parsed, withoutPathExt) {
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (hasCustomCwd) try {
        process.chdir(parsed.options.cwd);
    } catch (err) {
    /* Empty */ }
    let resolved;
    try {
        resolved = $cw1YF.sync(parsed.command, {
            path: (parsed.options.env || process.env)[$02105a455fbe96e1$var$pathKey],
            pathExt: withoutPathExt ? $5VgCY$path.delimiter : undefined
        });
    } catch (e) {
    /* Empty */ } finally{
        process.chdir(cwd);
    }
    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) resolved = $5VgCY$path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
    return resolved;
}
function $02105a455fbe96e1$var$resolveCommand(parsed) {
    return $02105a455fbe96e1$var$resolveCommandAttempt(parsed) || $02105a455fbe96e1$var$resolveCommandAttempt(parsed, true);
}
module.exports = $02105a455fbe96e1$var$resolveCommand;

});
parcelRequire.register("cw1YF", function(module, exports) {
module.exports = $91ca01e4e19c6a38$var$which;
$91ca01e4e19c6a38$var$which.sync = $91ca01e4e19c6a38$var$whichSync;
var $91ca01e4e19c6a38$var$isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";

var $91ca01e4e19c6a38$var$COLON = $91ca01e4e19c6a38$var$isWindows ? ";" : ":";

var $cciaP = parcelRequire("cciaP");
function $91ca01e4e19c6a38$var$getNotFoundError(cmd) {
    var er = new Error("not found: " + cmd);
    er.code = "ENOENT";
    return er;
}
function $91ca01e4e19c6a38$var$getPathInfo(cmd, opt) {
    var colon = opt.colon || $91ca01e4e19c6a38$var$COLON;
    var pathEnv = opt.path || process.env.PATH || "";
    var pathExt = [
        ""
    ];
    pathEnv = pathEnv.split(colon);
    var pathExtExe = "";
    if ($91ca01e4e19c6a38$var$isWindows) {
        pathEnv.unshift(process.cwd());
        pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
        pathExt = pathExtExe.split(colon);
        // Always test the cmd itself first.  isexe will check to make sure
        // it's found in the pathExt set.
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "") pathExt.unshift("");
    }
    // If it has a slash, then we don't bother searching the pathenv.
    // just check the file itself, and that's it.
    if (cmd.match(/\//) || $91ca01e4e19c6a38$var$isWindows && cmd.match(/\\/)) pathEnv = [
        ""
    ];
    return {
        env: pathEnv,
        ext: pathExt,
        extExe: pathExtExe
    };
}
function $91ca01e4e19c6a38$var$which(cmd, opt, cb) {
    if (typeof opt === "function") {
        cb = opt;
        opt = {};
    }
    var info = $91ca01e4e19c6a38$var$getPathInfo(cmd, opt);
    var pathEnv = info.env;
    var pathExt = info.ext;
    var pathExtExe = info.extExe;
    var found = [];
    (function F(i, l) {
        if (i === l) {
            if (opt.all && found.length) return cb(null, found);
            else return cb($91ca01e4e19c6a38$var$getNotFoundError(cmd));
        }
        var pathPart = pathEnv[i];
        if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
        var p = $5VgCY$path.join(pathPart, cmd);
        if (!pathPart && /^\.[\\\/]/.test(cmd)) p = cmd.slice(0, 2) + p;
        (function E(ii, ll) {
            if (ii === ll) return F(i + 1, l);
            var ext = pathExt[ii];
            $cciaP(p + ext, {
                pathExt: pathExtExe
            }, function(er, is) {
                if (!er && is) {
                    if (opt.all) found.push(p + ext);
                    else return cb(null, p + ext);
                }
                return E(ii + 1, ll);
            });
        })(0, pathExt.length);
    })(0, pathEnv.length);
}
function $91ca01e4e19c6a38$var$whichSync(cmd, opt) {
    opt = opt || {};
    var info = $91ca01e4e19c6a38$var$getPathInfo(cmd, opt);
    var pathEnv = info.env;
    var pathExt = info.ext;
    var pathExtExe = info.extExe;
    var found = [];
    for(var i = 0, l = pathEnv.length; i < l; i++){
        var pathPart = pathEnv[i];
        if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
        var p = $5VgCY$path.join(pathPart, cmd);
        if (!pathPart && /^\.[\\\/]/.test(cmd)) p = cmd.slice(0, 2) + p;
        for(var j = 0, ll = pathExt.length; j < ll; j++){
            var cur = p + pathExt[j];
            var is;
            try {
                is = $cciaP.sync(cur, {
                    pathExt: pathExtExe
                });
                if (is) {
                    if (opt.all) found.push(cur);
                    else return cur;
                }
            } catch (ex) {}
        }
    }
    if (opt.all && found.length) return found;
    if (opt.nothrow) return null;
    throw $91ca01e4e19c6a38$var$getNotFoundError(cmd);
}

});
parcelRequire.register("cciaP", function(module, exports) {

var $8e14b3f1b0658ec2$var$core;


if (process.platform === "win32" || $parcel$global.TESTING_WINDOWS) $8e14b3f1b0658ec2$var$core = (parcelRequire("kbPbH"));
else $8e14b3f1b0658ec2$var$core = (parcelRequire("hW7mX"));
module.exports = $8e14b3f1b0658ec2$var$isexe;
$8e14b3f1b0658ec2$var$isexe.sync = $8e14b3f1b0658ec2$var$sync;
function $8e14b3f1b0658ec2$var$isexe(path, options, cb) {
    if (typeof options === "function") {
        cb = options;
        options = {};
    }
    if (!cb) {
        if (typeof Promise !== "function") throw new TypeError("callback not provided");
        return new Promise(function(resolve, reject) {
            $8e14b3f1b0658ec2$var$isexe(path, options || {}, function(er, is) {
                if (er) reject(er);
                else resolve(is);
            });
        });
    }
    $8e14b3f1b0658ec2$var$core(path, options || {}, function(er, is) {
        // ignore EACCES because that just means we aren't allowed to run it
        if (er) {
            if (er.code === "EACCES" || options && options.ignoreErrors) {
                er = null;
                is = false;
            }
        }
        cb(er, is);
    });
}
function $8e14b3f1b0658ec2$var$sync(path, options) {
    // my kingdom for a filtered catch
    try {
        return $8e14b3f1b0658ec2$var$core.sync(path, options || {});
    } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") return false;
        else throw er;
    }
}

});



parcelRequire.register("7Wxms", function(module, exports) {

$parcel$export(module.exports, "command", () => $5c87d40664726538$export$ae50443ffc990749, (v) => $5c87d40664726538$export$ae50443ffc990749 = v);
$parcel$export(module.exports, "argument", () => $5c87d40664726538$export$6ea29ee575e3f5ff, (v) => $5c87d40664726538$export$6ea29ee575e3f5ff = v);
var $5c87d40664726538$export$ae50443ffc990749;
var $5c87d40664726538$export$6ea29ee575e3f5ff;
"use strict";
// See http://www.robvanderwoude.com/escapechars.php
const $5c87d40664726538$var$metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function $5c87d40664726538$var$escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace($5c87d40664726538$var$metaCharsRegExp, "^$1");
    return arg;
}
function $5c87d40664726538$var$escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;
    // Algorithm below is based on https://qntm.org/cmd
    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');
    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, "$1$1");
    // All other backslashes occur literally
    // Quote the whole thing:
    arg = `"${arg}"`;
    // Escape meta chars
    arg = arg.replace($5c87d40664726538$var$metaCharsRegExp, "^$1");
    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) arg = arg.replace($5c87d40664726538$var$metaCharsRegExp, "^$1");
    return arg;
}
$5c87d40664726538$export$ae50443ffc990749 = $5c87d40664726538$var$escapeCommand;
$5c87d40664726538$export$6ea29ee575e3f5ff = $5c87d40664726538$var$escapeArgument;

});

parcelRequire.register("19GvR", function(module, exports) {
"use strict";


var $g8Sj2 = parcelRequire("g8Sj2");
function $0d779bdd639ffdd4$var$readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    let buffer;
    if (Buffer.alloc) // Node.js v4.5+ / v5.10+
    buffer = Buffer.alloc(size);
    else {
        // Old Node.js API
        buffer = new Buffer(size);
        buffer.fill(0); // zero-fill
    }
    let fd;
    try {
        fd = $5VgCY$fs.openSync(command, "r");
        $5VgCY$fs.readSync(fd, buffer, 0, size, 0);
        $5VgCY$fs.closeSync(fd);
    } catch (e) {}
    // Attempt to extract shebang (null is returned if not a shebang)
    return $g8Sj2(buffer.toString());
}
module.exports = $0d779bdd639ffdd4$var$readShebang;

});
parcelRequire.register("g8Sj2", function(module, exports) {
"use strict";

var $53jZa = parcelRequire("53jZa");
module.exports = function(str) {
    var match = str.match($53jZa);
    if (!match) return null;
    var arr = match[0].replace(/#! ?/, "").split(" ");
    var bin = arr[0].split("/").pop();
    var arg = arr[1];
    return bin === "env" ? arg : bin + (arg ? " " + arg : "");
};

});
parcelRequire.register("53jZa", function(module, exports) {
"use strict";
module.exports = /^#!.*/;

});




parcelRequire.register("4hfSG", function(module, exports) {
"use strict";
const $31d51195df08e49b$var$isWin = process.platform === "win32";
function $31d51195df08e49b$var$notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
    });
}
function $31d51195df08e49b$var$hookChildProcess(cp, parsed) {
    if (!$31d51195df08e49b$var$isWin) return;
    const originalEmit = cp.emit;
    cp.emit = function(name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === "exit") {
            const err = $31d51195df08e49b$var$verifyENOENT(arg1, parsed, "spawn");
            if (err) return originalEmit.call(cp, "error", err);
        }
        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}
function $31d51195df08e49b$var$verifyENOENT(status, parsed) {
    if ($31d51195df08e49b$var$isWin && status === 1 && !parsed.file) return $31d51195df08e49b$var$notFoundError(parsed.original, "spawn");
    return null;
}
function $31d51195df08e49b$var$verifyENOENTSync(status, parsed) {
    if ($31d51195df08e49b$var$isWin && status === 1 && !parsed.file) return $31d51195df08e49b$var$notFoundError(parsed.original, "spawnSync");
    return null;
}
module.exports = {
    hookChildProcess: $31d51195df08e49b$var$hookChildProcess,
    verifyENOENT: $31d51195df08e49b$var$verifyENOENT,
    verifyENOENTSync: $31d51195df08e49b$var$verifyENOENTSync,
    notFoundError: $31d51195df08e49b$var$notFoundError
};

});


parcelRequire.register("hrLKv", function(module, exports) {

$parcel$export(module.exports, "default", () => $cb39ff45a90b358f$export$2e2bcd8739ae039);
function $cb39ff45a90b358f$export$2e2bcd8739ae039(childProcess) {
    return new Promise((resolve, reject)=>{
        childProcess.on("error", reject);
        childProcess.on("close", (code)=>{
            if (code !== 0) {
                reject(new Error("Child process failed"));
                return;
            }
            resolve();
        });
    });
}

});

parcelRequire.register("iQzlD", function(module, exports) {
module.exports = JSON.parse('{"name":"@parcel/package-manager","version":"2.9.2","description":"Blazing fast, zero configuration web application bundler","license":"MIT","publishConfig":{"access":"public"},"funding":{"type":"opencollective","url":"https://opencollective.com/parcel"},"repository":{"type":"git","url":"https://github.com/parcel-bundler/parcel.git"},"main":"lib/index.js","source":"src/index.js","types":"index.d.ts","engines":{"node":">= 12.0.0"},"scripts":{"build-ts":"mkdir -p lib && flow-to-ts src/types.js > lib/types.d.ts","check-ts":"tsc --noEmit index.d.ts","test":"mocha test"},"targets":{"types":false,"main":{"includeNodeModules":{"@parcel/core":false,"@parcel/diagnostic":false,"@parcel/fs":false,"@parcel/logger":false,"@parcel/node-resolver-core":false,"@parcel/types":false,"@parcel/utils":false,"@parcel/workers":false,"semver":false}}},"dependencies":{"@parcel/diagnostic":"2.9.2","@parcel/fs":"2.9.2","@parcel/logger":"2.9.2","@parcel/node-resolver-core":"3.0.2","@parcel/types":"2.9.2","@parcel/utils":"2.9.2","@parcel/workers":"2.9.2","semver":"^5.7.1"},"devDependencies":{"command-exists":"^1.2.6","cross-spawn":"^6.0.4","nullthrows":"^1.1.1","split2":"^3.1.1"},"peerDependencies":{"@parcel/core":"^2.9.2"},"browser":{"./src/Npm.js":false,"./src/Pnpm.js":false,"./src/Yarn.js":false},"gitHead":"76aa20fc2f752fae9c7347f071ea457b112a5dad"}');

});


parcelRequire.register("dVe9H", function(module, exports) {

$parcel$export(module.exports, "Yarn", () => $a22b9434984af292$export$8db243e2edc9d1b8);

var $aS4WB = parcelRequire("aS4WB");

var $8JYdY = parcelRequire("8JYdY");


var $bNoMR = parcelRequire("bNoMR");

var $fj7Np = parcelRequire("fj7Np");

var $hrLKv = parcelRequire("hrLKv");


var $1wfKO = parcelRequire("1wfKO");

var $iQzlD = parcelRequire("iQzlD");
const $a22b9434984af292$var$YARN_CMD = "yarn";
let $a22b9434984af292$var$hasYarn;
let $a22b9434984af292$var$yarnVersion;
class $a22b9434984af292$export$8db243e2edc9d1b8 {
    static async exists() {
        if ($a22b9434984af292$var$hasYarn != null) return $a22b9434984af292$var$hasYarn;
        try {
            $a22b9434984af292$var$hasYarn = Boolean(await (0, (/*@__PURE__*/$parcel$interopDefault($aS4WB)))("yarn"));
        } catch (err) {
            $a22b9434984af292$var$hasYarn = false;
        }
        return $a22b9434984af292$var$hasYarn;
    }
    async install({ modules: modules , cwd: cwd , saveDev: saveDev = true  }) {
        if ($a22b9434984af292$var$yarnVersion == null) {
            let version = await (0, $1wfKO.exec)("yarn --version");
            $a22b9434984af292$var$yarnVersion = parseInt(version.stdout, 10);
        }
        let args = [
            "add",
            "--json"
        ].concat(modules.map((0, $1wfKO.npmSpecifierFromModuleRequest)));
        if (saveDev) {
            args.push("-D");
            if ($a22b9434984af292$var$yarnVersion < 2) args.push("-W");
        }
        // When Parcel is run by Yarn (e.g. via package.json scripts), several environment variables are
        // added. When parcel in turn calls Yarn again, these can cause Yarn to behave stragely, so we
        // filter them out when installing packages.
        let env = {};
        for(let key in process.env)if (!key.startsWith("npm_") && key !== "YARN_WRAP_OUTPUT" && key !== "INIT_CWD" && key !== "NODE_ENV") env[key] = process.env[key];
        let installProcess = (0, (/*@__PURE__*/$parcel$interopDefault($8JYdY)))($a22b9434984af292$var$YARN_CMD, args, {
            cwd: cwd,
            env: env
        });
        installProcess.stdout// Invoking yarn with --json provides streaming, newline-delimited JSON output.
        .pipe((0, (/*@__PURE__*/$parcel$interopDefault($bNoMR)))()).pipe(new (0, $fj7Np.default)()).on("error", (e)=>{
            (0, ($parcel$interopDefault($5VgCY$parcellogger))).error(e, "@parcel/package-manager");
        }).on("data", (message)=>{
            switch(message.type){
                case "step":
                    (0, ($parcel$interopDefault($5VgCY$parcellogger))).progress($a22b9434984af292$var$prefix(`[${message.data.current}/${message.data.total}] ${message.data.message}`));
                    return;
                case "success":
                case "info":
                    (0, ($parcel$interopDefault($5VgCY$parcellogger))).info({
                        origin: "@parcel/package-manager",
                        message: $a22b9434984af292$var$prefix(message.data)
                    });
                    return;
                default:
            }
        });
        installProcess.stderr.pipe((0, (/*@__PURE__*/$parcel$interopDefault($bNoMR)))()).pipe(new (0, $fj7Np.default)()).on("error", (e)=>{
            (0, ($parcel$interopDefault($5VgCY$parcellogger))).error(e, "@parcel/package-manager");
        }).on("data", (message)=>{
            switch(message.type){
                case "warning":
                    (0, ($parcel$interopDefault($5VgCY$parcellogger))).warn({
                        origin: "@parcel/package-manager",
                        message: $a22b9434984af292$var$prefix(message.data)
                    });
                    return;
                case "error":
                    (0, ($parcel$interopDefault($5VgCY$parcellogger))).error({
                        origin: "@parcel/package-manager",
                        message: $a22b9434984af292$var$prefix(message.data)
                    });
                    return;
                default:
            }
        });
        try {
            return await (0, $hrLKv.default)(installProcess);
        } catch (e) {
            throw new Error("Yarn failed to install modules:" + e.message);
        }
    }
}
function $a22b9434984af292$var$prefix(message) {
    return "yarn: " + message;
}
(0, $5VgCY$parcelcore.registerSerializableClass)(`${(0, (/*@__PURE__*/$parcel$interopDefault($iQzlD))).version}:Yarn`, $a22b9434984af292$export$8db243e2edc9d1b8);

});
parcelRequire.register("aS4WB", function(module, exports) {

module.exports = (parcelRequire("doLll"));

});

parcelRequire.register("bNoMR", function(module, exports) {
/*
Copyright (c) 2014-2018, Matteo Collina <hello@matteocollina.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/ "use strict";

var $dMi1x = parcelRequire("dMi1x");
var $89677f88c3eb6e5a$require$Transform = $dMi1x.Transform;

var $89677f88c3eb6e5a$require$StringDecoder = $5VgCY$string_decoder.StringDecoder;
const $89677f88c3eb6e5a$var$kLast = Symbol("last");
const $89677f88c3eb6e5a$var$kDecoder = Symbol("decoder");
function $89677f88c3eb6e5a$var$transform(chunk, enc, cb) {
    var list;
    if (this.overflow) {
        var buf = this[$89677f88c3eb6e5a$var$kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb() // Line ending not found. Discard entire chunk.
        ;
        // Line ending found. Discard trailing fragment of previous line and reset overflow state.
        list.shift();
        this.overflow = false;
    } else {
        this[$89677f88c3eb6e5a$var$kLast] += this[$89677f88c3eb6e5a$var$kDecoder].write(chunk);
        list = this[$89677f88c3eb6e5a$var$kLast].split(this.matcher);
    }
    this[$89677f88c3eb6e5a$var$kLast] = list.pop();
    for(var i = 0; i < list.length; i++)try {
        $89677f88c3eb6e5a$var$push(this, this.mapper(list[i]));
    } catch (error) {
        return cb(error);
    }
    this.overflow = this[$89677f88c3eb6e5a$var$kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) return cb(new Error("maximum buffer reached"));
    cb();
}
function $89677f88c3eb6e5a$var$flush(cb) {
    // forward any gibberish left in there
    this[$89677f88c3eb6e5a$var$kLast] += this[$89677f88c3eb6e5a$var$kDecoder].end();
    if (this[$89677f88c3eb6e5a$var$kLast]) try {
        $89677f88c3eb6e5a$var$push(this, this.mapper(this[$89677f88c3eb6e5a$var$kLast]));
    } catch (error) {
        return cb(error);
    }
    cb();
}
function $89677f88c3eb6e5a$var$push(self, val) {
    if (val !== undefined) self.push(val);
}
function $89677f88c3eb6e5a$var$noop(incoming) {
    return incoming;
}
function $89677f88c3eb6e5a$var$split(matcher, mapper, options) {
    // Set defaults for any arguments not supplied.
    matcher = matcher || /\r?\n/;
    mapper = mapper || $89677f88c3eb6e5a$var$noop;
    options = options || {};
    // Test arguments explicitly.
    switch(arguments.length){
        case 1:
            // If mapper is only argument.
            if (typeof matcher === "function") {
                mapper = matcher;
                matcher = /\r?\n/;
            // If options is only argument.
            } else if (typeof matcher === "object" && !(matcher instanceof RegExp)) {
                options = matcher;
                matcher = /\r?\n/;
            }
            break;
        case 2:
            // If mapper and options are arguments.
            if (typeof matcher === "function") {
                options = mapper;
                mapper = matcher;
                matcher = /\r?\n/;
            // If matcher and options are arguments.
            } else if (typeof mapper === "object") {
                options = mapper;
                mapper = $89677f88c3eb6e5a$var$noop;
            }
    }
    options = Object.assign({}, options);
    options.transform = $89677f88c3eb6e5a$var$transform;
    options.flush = $89677f88c3eb6e5a$var$flush;
    options.readableObjectMode = true;
    const stream = new $89677f88c3eb6e5a$require$Transform(options);
    stream[$89677f88c3eb6e5a$var$kLast] = "";
    stream[$89677f88c3eb6e5a$var$kDecoder] = new $89677f88c3eb6e5a$require$StringDecoder("utf8");
    stream.matcher = matcher;
    stream.mapper = mapper;
    stream.maxLength = options.maxLength;
    stream.skipOverflow = options.skipOverflow;
    stream.overflow = false;
    return stream;
}
module.exports = $89677f88c3eb6e5a$var$split;

});

parcelRequire.register("fj7Np", function(module, exports) {

$parcel$export(module.exports, "default", () => $b24ead79d5605372$export$2e2bcd8739ae039);


class $b24ead79d5605372$export$2e2bcd8739ae039 extends (0, $5VgCY$stream.Transform) {
    constructor(options){
        super({
            ...options,
            objectMode: true
        });
    }
    // $FlowFixMe We are in object mode, so we emit objects, not strings
    _transform(chunk, encoding, callback) {
        try {
            let parsed;
            try {
                parsed = JSON.parse(chunk.toString());
            } catch (e) {
                // Be permissive and ignoreJSON parse errors in case there was
                // a non-JSON line in the package manager's stdout.
                (0, ($parcel$interopDefault($5VgCY$parcellogger))).verbose({
                    message: "Ignored invalid JSON message: " + chunk.toString(),
                    origin: "@parcel/package-manager"
                });
                return;
            }
            callback(null, parsed);
        } catch (err) {
            callback(err);
        }
    }
}

});


parcelRequire.register("cXLl4", function(module, exports) {

$parcel$export(module.exports, "Pnpm", () => $96ffb73a73e9f2e4$export$ad678da47ffaf985);



var $aS4WB = parcelRequire("aS4WB");

var $8JYdY = parcelRequire("8JYdY");


var $bNoMR = parcelRequire("bNoMR");

var $fj7Np = parcelRequire("fj7Np");

var $hrLKv = parcelRequire("hrLKv");


var $1wfKO = parcelRequire("1wfKO");

var $iQzlD = parcelRequire("iQzlD");
const $96ffb73a73e9f2e4$var$PNPM_CMD = "pnpm";
let $96ffb73a73e9f2e4$var$hasPnpm;
let $96ffb73a73e9f2e4$var$pnpmVersion;
class $96ffb73a73e9f2e4$export$ad678da47ffaf985 {
    static async exists() {
        if ($96ffb73a73e9f2e4$var$hasPnpm != null) return $96ffb73a73e9f2e4$var$hasPnpm;
        try {
            $96ffb73a73e9f2e4$var$hasPnpm = Boolean(await (0, (/*@__PURE__*/$parcel$interopDefault($aS4WB)))("pnpm"));
        } catch (err) {
            $96ffb73a73e9f2e4$var$hasPnpm = false;
        }
        return $96ffb73a73e9f2e4$var$hasPnpm;
    }
    async install({ modules: modules , cwd: cwd , saveDev: saveDev = true  }) {
        if ($96ffb73a73e9f2e4$var$pnpmVersion == null) {
            let version = await (0, $1wfKO.exec)("pnpm --version");
            $96ffb73a73e9f2e4$var$pnpmVersion = parseInt(version.stdout, 10);
        }
        let args = [
            "add",
            "--reporter",
            "ndjson"
        ];
        if (saveDev) args.push("-D");
        if ($96ffb73a73e9f2e4$var$pnpmVersion >= 7) {
            if ((0, ($parcel$interopDefault($5VgCY$fs))).existsSync((0, ($parcel$interopDefault($5VgCY$path))).join(cwd, "pnpm-workspace.yaml"))) // installs in workspace root (regardless of cwd)
            args.push("-w");
        } else // ignores workspace root check
        args.push("-W");
        args = args.concat(modules.map((0, $1wfKO.npmSpecifierFromModuleRequest)));
        let env = {};
        for(let key in process.env)if (!key.startsWith("npm_") && key !== "INIT_CWD" && key !== "NODE_ENV") env[key] = process.env[key];
        let addedCount = 0, removedCount = 0;
        let installProcess = (0, (/*@__PURE__*/$parcel$interopDefault($8JYdY)))($96ffb73a73e9f2e4$var$PNPM_CMD, args, {
            cwd: cwd,
            env: env
        });
        installProcess.stdout.pipe((0, (/*@__PURE__*/$parcel$interopDefault($bNoMR)))()).pipe(new (0, $fj7Np.default)()).on("error", (e)=>{
            (0, ($parcel$interopDefault($5VgCY$parcellogger))).warn({
                origin: "@parcel/package-manager",
                message: e.chunk,
                stack: e.stack
            });
        }).on("data", (json)=>{
            if (json.level === "error") (0, ($parcel$interopDefault($5VgCY$parcellogger))).error({
                origin: "@parcel/package-manager",
                message: json.err.message,
                stack: json.err.stack
            });
            else if (json.level === "info" && typeof json.message === "string") (0, ($parcel$interopDefault($5VgCY$parcellogger))).info({
                origin: "@parcel/package-manager",
                message: $96ffb73a73e9f2e4$var$prefix(json.message)
            });
            else if (json.name === "pnpm:stats") {
                var _json_added;
                addedCount += (_json_added = json.added) !== null && _json_added !== void 0 ? _json_added : 0;
                var _json_removed;
                removedCount += (_json_removed = json.removed) !== null && _json_removed !== void 0 ? _json_removed : 0;
            }
        });
        let stderr = [];
        installProcess.stderr.on("data", (str)=>{
            stderr.push(str.toString());
        }).on("error", (e)=>{
            (0, ($parcel$interopDefault($5VgCY$parcellogger))).warn({
                origin: "@parcel/package-manager",
                message: e.message
            });
        });
        try {
            await (0, $hrLKv.default)(installProcess);
            if (addedCount > 0 || removedCount > 0) (0, ($parcel$interopDefault($5VgCY$parcellogger))).log({
                origin: "@parcel/package-manager",
                message: `Added ${addedCount} ${removedCount > 0 ? `and removed ${removedCount} ` : ""}packages via pnpm`
            });
            // Since we succeeded, stderr might have useful information not included
            // in the json written to stdout. It's also not necessary to log these as
            // errors as they often aren't.
            for (let message of stderr)(0, ($parcel$interopDefault($5VgCY$parcellogger))).log({
                origin: "@parcel/package-manager",
                message: message
            });
        } catch (e) {
            throw new Error("pnpm failed to install modules");
        }
    }
}
function $96ffb73a73e9f2e4$var$prefix(message) {
    return "pnpm: " + message;
}
(0, $5VgCY$parcelcore.registerSerializableClass)(`${(0, (/*@__PURE__*/$parcel$interopDefault($iQzlD))).version}:Pnpm`, $96ffb73a73e9f2e4$export$ad678da47ffaf985);

});

parcelRequire.register("dQlwx", function(module, exports) {

$parcel$export(module.exports, "default", () => $a140d3da44df997f$export$2e2bcd8739ae039);
const $a140d3da44df997f$var$MODULE_REGEX = /^((@[^/\s]+\/){0,1}([^/\s.~]+[^/\s]*)){1}(@[^/\s]+){0,1}/;
function $a140d3da44df997f$export$2e2bcd8739ae039(moduleName) {
    let matches = $a140d3da44df997f$var$MODULE_REGEX.exec(moduleName);
    if (matches) return matches[0];
    return "";
}

});




$parcel$export(module.exports, "_addToInstallQueue", () => (parcelRequire("a5owR"))._addToInstallQueue);

var $c8MW1 = parcelRequire("c8MW1");

var $cXLl4 = parcelRequire("cXLl4");

var $dVe9H = parcelRequire("dVe9H");
var $b4feb2846da58d0b$exports = {};

$parcel$export($b4feb2846da58d0b$exports, "MockPackageInstaller", () => $b4feb2846da58d0b$export$75a986c28df5fb9b);




var $iQzlD = parcelRequire("iQzlD");

var $1wfKO = parcelRequire("1wfKO");
class $b4feb2846da58d0b$export$75a986c28df5fb9b {
    packages = new Map();
    register(packageName, fs, packagePath) {
        this.packages.set(packageName, {
            fs: fs,
            packagePath: packagePath
        });
    }
    async install({ modules: modules , fs: fs , cwd: cwd , packagePath: packagePath , saveDev: saveDev = true  }) {
        if (packagePath == null) {
            packagePath = (0, ($parcel$interopDefault($5VgCY$path))).join(cwd, "package.json");
            await fs.writeFile(packagePath, "{}");
        }
        let pkg = JSON.parse(await fs.readFile(packagePath, "utf8"));
        let key = saveDev ? "devDependencies" : "dependencies";
        if (!pkg[key]) pkg[key] = {};
        for (let module of modules)pkg[key][module.name] = "^" + await this.installPackage(module, fs, packagePath);
        await fs.writeFile(packagePath, JSON.stringify(pkg));
    }
    async installPackage(moduleRequest, fs, packagePath) {
        let pkg = this.packages.get(moduleRequest.name);
        if (!pkg) throw new Error("Unknown package " + moduleRequest.name);
        let dest = (0, ($parcel$interopDefault($5VgCY$path))).join((0, ($parcel$interopDefault($5VgCY$path))).dirname(packagePath), "node_modules", moduleRequest.name);
        await (0, $5VgCY$parcelfs.ncp)(pkg.fs, pkg.packagePath, fs, dest);
        let packageJSON = JSON.parse(await fs.readFile((0, ($parcel$interopDefault($5VgCY$path))).join(dest, "package.json"), "utf8"));
        if (packageJSON.dependencies != null) for (let dep of (0, $1wfKO.moduleRequestsFromDependencyMap)(packageJSON.dependencies))await this.installPackage(dep, fs, packagePath);
        return packageJSON.version;
    }
}
(0, $5VgCY$parcelcore.registerSerializableClass)(`${(0, (/*@__PURE__*/$parcel$interopDefault($iQzlD))).version}:MockPackageInstaller`, $b4feb2846da58d0b$export$75a986c28df5fb9b);



var $1A7Gz = parcelRequire("1A7Gz");

var $a5owR = parcelRequire("a5owR");
$parcel$exportWildcard(module.exports, $c8MW1);
$parcel$exportWildcard(module.exports, $cXLl4);
$parcel$exportWildcard(module.exports, $dVe9H);
$parcel$exportWildcard(module.exports, $b4feb2846da58d0b$exports);
$parcel$exportWildcard(module.exports, $1A7Gz);


//# sourceMappingURL=index.js.map