"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheSerializedObject = cacheSerializedObject;
exports.deserialize = deserialize;
Object.defineProperty(exports, "deserializeRaw", {
  enumerable: true,
  get: function () {
    return _serializerCore.deserializeRaw;
  }
});
exports.deserializeToCache = deserializeToCache;
exports.prepareForSerialization = prepareForSerialization;
exports.registerSerializableClass = registerSerializableClass;
exports.removeSerializedObjectFromCache = removeSerializedObjectFromCache;
exports.restoreDeserializedObject = restoreDeserializedObject;
exports.serialize = serialize;
Object.defineProperty(exports, "serializeRaw", {
  enumerable: true,
  get: function () {
    return _serializerCore.serializeRaw;
  }
});
exports.unregisterSerializableClass = unregisterSerializableClass;
var _buildCache = require("./buildCache");
var _serializerCore = require("./serializerCore");
const nameToCtor = new Map();
const ctorToName = new Map();
function registerSerializableClass(name, ctor) {
  if (ctorToName.has(ctor)) {
    throw new Error('Class already registered with serializer');
  }
  nameToCtor.set(name, ctor);
  ctorToName.set(ctor, name);
}
function unregisterSerializableClass(name, ctor) {
  if (nameToCtor.get(name) === ctor) {
    nameToCtor.delete(name);
  }
  if (ctorToName.get(ctor) === name) {
    ctorToName.delete(ctor);
  }
}
function shallowCopy(object) {
  if (object && typeof object === 'object') {
    if (Array.isArray(object)) {
      return [...object];
    }
    if (object instanceof Map) {
      return new Map(object);
    }
    if (object instanceof Set) {
      return new Set(object);
    }
    return Object.create(Object.getPrototypeOf(object), Object.getOwnPropertyDescriptors(object));
  }
  return object;
}
function isBuffer(object) {
  return object.buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== 'undefined' && object.buffer instanceof SharedArrayBuffer;
}
function shouldContinueMapping(value) {
  return value && typeof value === 'object' && value.$$raw !== true;
}
function mapObject(object, fn, preOrder = false) {
  let cache = new Map();
  let memo = new Map();

  // Memoize the passed function to ensure it always returns the exact same
  // output by reference for the same input. This is important to maintain
  // reference integrity when deserializing rather than cloning.
  let memoizedFn = val => {
    let res = memo.get(val);
    if (res == null) {
      res = fn(val);
      memo.set(val, res);
    }
    return res;
  };
  let walk = (object, shouldCopy = false) => {
    // Check the cache first, both for performance and cycle detection.
    if (cache.has(object)) {
      return cache.get(object);
    }
    let result = object;
    cache.set(object, result);
    let processKey = (key, value) => {
      let newValue = value;
      if (preOrder && value && typeof value === 'object') {
        newValue = memoizedFn(value);
      }

      // Recursively walk the children
      if (preOrder ? shouldContinueMapping(newValue) : newValue && typeof newValue === 'object' && shouldContinueMapping(object)) {
        newValue = walk(newValue, newValue === value);
      }
      if (!preOrder && newValue && typeof newValue === 'object') {
        newValue = memoizedFn(newValue);
      }
      if (newValue !== value) {
        // Copy on write. We only need to do this when serializing, not deserializing.
        if (object === result && preOrder && shouldCopy) {
          result = shallowCopy(object);
          cache.set(object, result);
        }

        // Replace the key with the new value
        if (result instanceof Map) {
          result.set(key, newValue);
        } else if (result instanceof Set) {
          let _result = result; // For Flow
          // TODO: do we care about iteration order??
          _result.delete(value);
          _result.add(newValue);
        } else {
          result[key] = newValue;
        }
      }
    };

    // Iterate in various ways depending on type.
    if (Array.isArray(object)) {
      for (let i = 0; i < object.length; i++) {
        processKey(i, object[i]);
      }
    } else if (object instanceof Map || object instanceof Set) {
      for (let [key, val] of object.entries()) {
        processKey(key, val);
      }
    } else if (!isBuffer(object)) {
      for (let key in object) {
        processKey(key, object[key]);
      }
    }
    return result;
  };
  let mapped = memoizedFn(object);
  if (preOrder ? shouldContinueMapping(mapped) : mapped && typeof mapped === 'object' && shouldContinueMapping(object)) {
    return walk(mapped, mapped === object);
  }
  return mapped;
}
function prepareForSerialization(object) {
  if (object !== null && object !== void 0 && object.$$raw) {
    return object;
  }
  return mapObject(object, value => {
    // Add a $$type property with the name of this class, if any is registered.
    if (value && typeof value === 'object' && typeof value.constructor === 'function') {
      let type = ctorToName.get(value.constructor);
      if (type != null) {
        let serialized = value;
        let raw = false;
        if (value && typeof value.serialize === 'function') {
          var _ref;
          // If the object has a serialize method, call it
          serialized = value.serialize();
          raw = (_ref = serialized && serialized.$$raw) !== null && _ref !== void 0 ? _ref : true;
          if (serialized) {
            delete serialized.$$raw;
          }
        }
        return {
          $$type: type,
          $$raw: raw,
          value: {
            ...serialized
          }
        };
      }
    }
    return value;
  }, true);
}
function restoreDeserializedObject(object) {
  return mapObject(object, value => {
    // If the value has a $$type property, use it to restore the object type
    if (value && value.$$type) {
      let ctor = nameToCtor.get(value.$$type);
      if (ctor == null) {
        throw new Error(`Expected constructor ${value.$$type} to be registered with serializer to deserialize`);
      }
      if (typeof ctor.deserialize === 'function') {
        return ctor.deserialize(value.value);
      }
      value = value.value;
      Object.setPrototypeOf(value, ctor.prototype);
    }
    return value;
  });
}
const serializeCache = (0, _buildCache.createBuildCache)();
function serialize(object) {
  let cached = serializeCache.get(object);
  if (cached) {
    return cached;
  }
  let mapped = prepareForSerialization(object);
  return (0, _serializerCore.serializeRaw)(mapped);
}
function deserialize(buffer) {
  let obj = (0, _serializerCore.deserializeRaw)(buffer);
  return restoreDeserializedObject(obj);
}
function cacheSerializedObject(object, buffer) {
  serializeCache.set(object, buffer || serialize(object));
}
function deserializeToCache(buffer) {
  let deserialized = deserialize(buffer);
  serializeCache.set(deserialized, buffer);
  return deserialized;
}
function removeSerializedObjectFromCache(object) {
  serializeCache.delete(object);
}