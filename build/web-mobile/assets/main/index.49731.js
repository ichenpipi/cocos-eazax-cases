window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  1: [ function(require, module, exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len = b64.length;
      if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var validLen = b64.indexOf("=");
      -1 === validLen && (validLen = len);
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [ validLen, placeHoldersLen ];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i;
      for (i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      if (2 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = 255 & tmp;
      }
      if (1 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (255 & uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      if (1 === extraBytes) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (2 === extraBytes) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }, {} ],
  2: [ function(require, module, exports) {}, {} ],
  3: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      var base64 = require("base64-js");
      var ieee754 = require("ieee754");
      var isArray = require("isarray");
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
      exports.kMaxLength = kMaxLength();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42;
            }
          };
          return 42 === arr.foo() && "function" === typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
        } catch (e) {
          return false;
        }
      }
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer(that, length) {
        if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          null === that && (that = new Buffer(length));
          that.length = length;
        }
        return that;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
        if ("number" === typeof arg) {
          if ("string" === typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      Buffer._augment = function(arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };
      function from(that, value, encodingOrOffset, length) {
        if ("number" === typeof value) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, encodingOrOffset, length);
        if ("string" === typeof value) return fromString(that, value, encodingOrOffset);
        return fromObject(that, value);
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
      function assertSize(size) {
        if ("number" !== typeof size) throw new TypeError('"size" argument must be a number');
        if (size < 0) throw new RangeError('"size" argument must not be negative');
      }
      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) return createBuffer(that, size);
        if (void 0 !== fill) return "string" === typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        return createBuffer(that, size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
        return that;
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        "string" === typeof encoding && "" !== encoding || (encoding = "utf8");
        if (!Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
        var length = 0 | byteLength(string, encoding);
        that = createBuffer(that, length);
        var actual = that.write(string, encoding);
        actual !== length && (that = that.slice(0, actual));
        return that;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : 0 | checked(array.length);
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
        return that;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength;
        if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
        if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
        array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = array;
          that.__proto__ = Buffer.prototype;
        } else that = fromArrayLike(that, array);
        return that;
      }
      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = 0 | checked(obj.length);
          that = createBuffer(that, len);
          if (0 === that.length) return that;
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if ("undefined" !== typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if ("number" !== typeof obj.length || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
          }
          if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked(length) {
        if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | length;
      }
      function SlowBuffer(length) {
        +length != length && (length = 0);
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(null != b && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
         case "hex":
         case "utf8":
         case "utf-8":
         case "ascii":
         case "latin1":
         case "binary":
         case "base64":
         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return true;

         default:
          return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === list.length) return Buffer.alloc(0);
        var i;
        if (void 0 === length) {
          length = 0;
          for (i = 0; i < list.length; ++i) length += list[i].length;
        }
        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) return string.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
        "string" !== typeof string && (string = "" + string);
        var len = string.length;
        if (0 === len) return 0;
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "ascii":
         case "latin1":
         case "binary":
          return len;

         case "utf8":
         case "utf-8":
         case void 0:
          return utf8ToBytes(string).length;

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return 2 * len;

         case "hex":
          return len >>> 1;

         case "base64":
          return base64ToBytes(string).length;

         default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        (void 0 === start || start < 0) && (start = 0);
        if (start > this.length) return "";
        (void 0 === end || end > this.length) && (end = this.length);
        if (end <= 0) return "";
        end >>>= 0;
        start >>>= 0;
        if (end <= start) return "";
        encoding || (encoding = "utf8");
        while (true) switch (encoding) {
         case "hex":
          return hexSlice(this, start, end);

         case "utf8":
         case "utf-8":
          return utf8Slice(this, start, end);

         case "ascii":
          return asciiSlice(this, start, end);

         case "latin1":
         case "binary":
          return latin1Slice(this, start, end);

         case "base64":
          return base64Slice(this, start, end);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return utf16leSlice(this, start, end);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        var length = 0 | this.length;
        if (0 === length) return "";
        if (0 === arguments.length) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return 0 === Buffer.compare(this, b);
      };
      Buffer.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          this.length > max && (str += " ... ");
        }
        return "<Buffer " + str + ">";
      };
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
        void 0 === start && (start = 0);
        void 0 === end && (end = target ? target.length : 0);
        void 0 === thisStart && (thisStart = 0);
        void 0 === thisEnd && (thisEnd = this.length);
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
        if (thisStart >= thisEnd && start >= end) return 0;
        if (thisStart >= thisEnd) return -1;
        if (start >= end) return 1;
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (0 === buffer.length) return -1;
        if ("string" === typeof byteOffset) {
          encoding = byteOffset;
          byteOffset = 0;
        } else byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648);
        byteOffset = +byteOffset;
        isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1);
        byteOffset < 0 && (byteOffset = buffer.length + byteOffset);
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (!dir) return -1;
          byteOffset = 0;
        }
        "string" === typeof val && (val = Buffer.from(val, encoding));
        if (Buffer.isBuffer(val)) {
          if (0 === val.length) return -1;
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        }
        if ("number" === typeof val) {
          val &= 255;
          if (Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf) return dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (void 0 !== encoding) {
          encoding = String(encoding).toLowerCase();
          if ("ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding) {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i) {
          return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
            -1 === foundIndex && (foundIndex = i);
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            -1 !== foundIndex && (i -= i - foundIndex);
            foundIndex = -1;
          }
        } else {
          byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength);
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return -1 !== this.indexOf(val, byteOffset, encoding);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (length) {
          length = Number(length);
          length > remaining && (length = remaining);
        } else length = remaining;
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        length > strLen / 2 && (length = strLen / 2);
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(2 * i, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (void 0 === offset) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (void 0 === length && "string" === typeof offset) {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else {
          if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          offset |= 0;
          if (isFinite(length)) {
            length |= 0;
            void 0 === encoding && (encoding = "utf8");
          } else {
            encoding = length;
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        (void 0 === length || length > remaining) && (length = remaining);
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        encoding || (encoding = "utf8");
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "hex":
          return hexWrite(this, string, offset, length);

         case "utf8":
         case "utf-8":
          return utf8Write(this, string, offset, length);

         case "ascii":
          return asciiWrite(this, string, offset, length);

         case "latin1":
         case "binary":
          return latin1Write(this, string, offset, length);

         case "base64":
          return base64Write(this, string, offset, length);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return ucs2Write(this, string, offset, length);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
             case 1:
              firstByte < 128 && (codePoint = firstByte);
              break;

             case 2:
              secondByte = buf[i + 1];
              if (128 === (192 & secondByte)) {
                tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte;
                tempCodePoint > 127 && (codePoint = tempCodePoint);
              }
              break;

             case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte)) {
                tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte;
                tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
              }
              break;

             case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) {
                tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte;
                tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
              }
            }
          }
          if (null === codePoint) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | 1023 & codePoint;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
        var res = "";
        var i = 0;
        while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        (!start || start < 0) && (start = 0);
        (!end || end < 0 || end > len) && (end = len);
        var out = "";
        for (var i = start; i < end; ++i) out += toHex(buf[i]);
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = void 0 === end ? len : ~~end;
        if (start < 0) {
          start += len;
          start < 0 && (start = 0);
        } else start > len && (start = len);
        if (end < 0) {
          end += len;
          end < 0 && (end = 0);
        } else end > len && (end = len);
        end < start && (end = start);
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
        }
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 256)) val += this[offset + --byteLength] * mul;
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        if (!(128 & this[offset])) return this[offset];
        return -1 * (255 - this[offset] + 1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 255, 0);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        this[offset] = 255 & value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        value < 0 && (value = 65535 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        value < 0 && (value = 4294967295 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = 255 & value;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 127, -128);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        value < 0 && (value = 255 + value + 1);
        this[offset] = 255 & value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        value < 0 && (value = 4294967295 + value + 1);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        start || (start = 0);
        end || 0 === end || (end = this.length);
        targetStart >= target.length && (targetStart = target.length);
        targetStart || (targetStart = 0);
        end > 0 && end < start && (end = start);
        if (end === start) return 0;
        if (0 === target.length || 0 === this.length) return 0;
        if (targetStart < 0) throw new RangeError("targetStart out of bounds");
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        end > this.length && (end = this.length);
        target.length - targetStart < end - start && (end = target.length - targetStart + start);
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if ("string" === typeof val) {
          if ("string" === typeof start) {
            encoding = start;
            start = 0;
            end = this.length;
          } else if ("string" === typeof end) {
            encoding = end;
            end = this.length;
          }
          if (1 === val.length) {
            var code = val.charCodeAt(0);
            code < 256 && (val = code);
          }
          if (void 0 !== encoding && "string" !== typeof encoding) throw new TypeError("encoding must be a string");
          if ("string" === typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        } else "number" === typeof val && (val &= 255);
        if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
        if (end <= start) return this;
        start >>>= 0;
        end = void 0 === end ? this.length : end >>> 0;
        val || (val = 0);
        var i;
        if ("number" === typeof val) for (i = start; i < end; ++i) this[i] = val; else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) str += "=";
        return str;
      }
      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
          } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          } else {
            if (!(codePoint < 1114112)) throw new Error("Invalid code point");
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan(val) {
        return val !== val;
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "base64-js": 1,
    ieee754: 7,
    isarray: 4
  } ],
  4: [ function(require, module, exports) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return "[object Array]" == toString.call(arr);
    };
  }, {} ],
  5: [ function(require, module, exports) {
    function isArray(arg) {
      if (Array.isArray) return Array.isArray(arg);
      return "[object Array]" === objectToString(arg);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return "boolean" === typeof arg;
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return null === arg;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return null == arg;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return "number" === typeof arg;
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return "string" === typeof arg;
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return "symbol" === typeof arg;
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return void 0 === arg;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return "[object RegExp]" === objectToString(re);
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return "object" === typeof arg && null !== arg;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return "[object Date]" === objectToString(d);
    }
    exports.isDate = isDate;
    function isError(e) {
      return "[object Error]" === objectToString(e) || e instanceof Error;
    }
    exports.isError = isError;
    function isFunction(arg) {
      return "function" === typeof arg;
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return null === arg || "boolean" === typeof arg || "number" === typeof arg || "string" === typeof arg || "symbol" === typeof arg || "undefined" === typeof arg;
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require("buffer").Buffer.isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  }, {
    buffer: 3
  } ],
  6: [ function(require, module, exports) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this;
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      this._events || (this._events = {});
      if ("error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) throw er;
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
        err.context = er;
        throw err;
      }
      handler = this._events[type];
      if (isUndefined(handler)) return false;
      if (isFunction(handler)) switch (arguments.length) {
       case 1:
        handler.call(this);
        break;

       case 2:
        handler.call(this, arguments[1]);
        break;

       case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

       default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++) listeners[i].apply(this, args);
      }
      return true;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      this._events || (this._events = {});
      this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
      this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener;
      if (isObject(this._events[type]) && !this._events[type].warned) {
        m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners;
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          "function" === typeof console.trace && console.trace();
        }
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      var fired = false;
      function g() {
        this.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g.listener = listener;
      this.on(type, g);
      return this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[type]) return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        this._events.removeListener && this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
        if (position < 0) return this;
        if (1 === list.length) {
          list.length = 0;
          delete this._events[type];
        } else list.splice(position, 1);
        this._events.removeListener && this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events) return this;
      if (!this._events.removeListener) {
        0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type];
        return this;
      }
      if (0 === arguments.length) {
        for (key in this._events) {
          if ("removeListener" === key) continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
      delete this._events[type];
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var ret;
      ret = this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
      return ret;
    };
    EventEmitter.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener)) return 1;
        if (evlistener) return evlistener.length;
      }
      return 0;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return "function" === typeof arg;
    }
    function isNumber(arg) {
      return "number" === typeof arg;
    }
    function isObject(arg) {
      return "object" === typeof arg && null !== arg;
    }
    function isUndefined(arg) {
      return void 0 === arg;
    }
  }, {} ],
  7: [ function(require, module, exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
      if (0 === e) e = 1 - eBias; else {
        if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
        m += Math.pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || Infinity === value) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e += eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
      e = e << mLen | m;
      eLen += mLen;
      for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
      buffer[offset + i - d] |= 128 * s;
    };
  }, {} ],
  8: [ function(require, module, exports) {
    "function" === typeof Object.create ? module.exports = function inherits(ctor, superCtor) {
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
    } : module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }, {} ],
  9: [ function(require, module, exports) {
    (function(process) {
      "use strict";
      "undefined" === typeof process || !process.version || 0 === process.version.indexOf("v0.") || 0 === process.version.indexOf("v1.") && 0 !== process.version.indexOf("v1.8.") ? module.exports = {
        nextTick: nextTick
      } : module.exports = process;
      function nextTick(fn, arg1, arg2, arg3) {
        if ("function" !== typeof fn) throw new TypeError('"callback" argument must be a function');
        var len = arguments.length;
        var args, i;
        switch (len) {
         case 0:
         case 1:
          return process.nextTick(fn);

         case 2:
          return process.nextTick(function afterTickOne() {
            fn.call(null, arg1);
          });

         case 3:
          return process.nextTick(function afterTickTwo() {
            fn.call(null, arg1, arg2);
          });

         case 4:
          return process.nextTick(function afterTickThree() {
            fn.call(null, arg1, arg2, arg3);
          });

         default:
          args = new Array(len - 1);
          i = 0;
          while (i < args.length) args[i++] = arguments[i];
          return process.nextTick(function afterTick() {
            fn.apply(null, args);
          });
        }
      }
    }).call(this, require("_process"));
  }, {
    _process: 10
  } ],
  10: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  11: [ function(require, module, exports) {
    module.exports = require("./lib/_stream_duplex.js");
  }, {
    "./lib/_stream_duplex.js": 12
  } ],
  12: [ function(require, module, exports) {
    "use strict";
    var pna = require("process-nextick-args");
    var objectKeys = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj) keys.push(key);
      return keys;
    };
    module.exports = Duplex;
    var util = Object.create(require("core-util-is"));
    util.inherits = require("inherits");
    var Readable = require("./_stream_readable");
    var Writable = require("./_stream_writable");
    util.inherits(Duplex, Readable);
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
    }
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      options && false === options.readable && (this.readable = false);
      options && false === options.writable && (this.writable = false);
      this.allowHalfOpen = true;
      options && false === options.allowHalfOpen && (this.allowHalfOpen = false);
      this.once("end", onend);
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: function() {
        return this._writableState.highWaterMark;
      }
    });
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended) return;
      pna.nextTick(onEndNT, this);
    }
    function onEndNT(self) {
      self.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      get: function() {
        if (void 0 === this._readableState || void 0 === this._writableState) return false;
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function(value) {
        if (void 0 === this._readableState || void 0 === this._writableState) return;
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
    Duplex.prototype._destroy = function(err, cb) {
      this.push(null);
      this.end();
      pna.nextTick(cb, err);
    };
  }, {
    "./_stream_readable": 14,
    "./_stream_writable": 16,
    "core-util-is": 5,
    inherits: 8,
    "process-nextick-args": 9
  } ],
  13: [ function(require, module, exports) {
    "use strict";
    module.exports = PassThrough;
    var Transform = require("./_stream_transform");
    var util = Object.create(require("core-util-is"));
    util.inherits = require("inherits");
    util.inherits(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }, {
    "./_stream_transform": 15,
    "core-util-is": 5,
    inherits: 8
  } ],
  14: [ function(require, module, exports) {
    (function(process, global) {
      "use strict";
      var pna = require("process-nextick-args");
      module.exports = Readable;
      var isArray = require("isarray");
      var Duplex;
      Readable.ReadableState = ReadableState;
      var EE = require("events").EventEmitter;
      var EElistenerCount = function(emitter, type) {
        return emitter.listeners(type).length;
      };
      var Stream = require("./internal/streams/stream");
      var Buffer = require("safe-buffer").Buffer;
      var OurUint8Array = global.Uint8Array || function() {};
      function _uint8ArrayToBuffer(chunk) {
        return Buffer.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var util = Object.create(require("core-util-is"));
      util.inherits = require("inherits");
      var debugUtil = require("util");
      var debug = void 0;
      debug = debugUtil && debugUtil.debuglog ? debugUtil.debuglog("stream") : function() {};
      var BufferList = require("./internal/streams/BufferList");
      var destroyImpl = require("./internal/streams/destroy");
      var StringDecoder;
      util.inherits(Readable, Stream);
      var kProxyEvents = [ "error", "close", "destroy", "pause", "resume" ];
      function prependListener(emitter, event, fn) {
        if ("function" === typeof emitter.prependListener) return emitter.prependListener(event, fn);
        emitter._events && emitter._events[event] ? isArray(emitter._events[event]) ? emitter._events[event].unshift(fn) : emitter._events[event] = [ fn, emitter._events[event] ] : emitter.on(event, fn);
      }
      function ReadableState(options, stream) {
        Duplex = Duplex || require("./_stream_duplex");
        options = options || {};
        var isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        isDuplex && (this.objectMode = this.objectMode || !!options.readableObjectMode);
        var hwm = options.highWaterMark;
        var readableHwm = options.readableHighWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16384;
        this.highWaterMark = hwm || 0 === hwm ? hwm : isDuplex && (readableHwm || 0 === readableHwm) ? readableHwm : defaultHwm;
        this.highWaterMark = Math.floor(this.highWaterMark);
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.destroyed = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          StringDecoder || (StringDecoder = require("string_decoder/").StringDecoder);
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable(options) {
        Duplex = Duplex || require("./_stream_duplex");
        if (!(this instanceof Readable)) return new Readable(options);
        this._readableState = new ReadableState(options, this);
        this.readable = true;
        if (options) {
          "function" === typeof options.read && (this._read = options.read);
          "function" === typeof options.destroy && (this._destroy = options.destroy);
        }
        Stream.call(this);
      }
      Object.defineProperty(Readable.prototype, "destroyed", {
        get: function() {
          if (void 0 === this._readableState) return false;
          return this._readableState.destroyed;
        },
        set: function(value) {
          if (!this._readableState) return;
          this._readableState.destroyed = value;
        }
      });
      Readable.prototype.destroy = destroyImpl.destroy;
      Readable.prototype._undestroy = destroyImpl.undestroy;
      Readable.prototype._destroy = function(err, cb) {
        this.push(null);
        cb(err);
      };
      Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        var skipChunkCheck;
        if (state.objectMode) skipChunkCheck = true; else if ("string" === typeof chunk) {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
        return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
      };
      Readable.prototype.unshift = function(chunk) {
        return readableAddChunk(this, chunk, null, true, false);
      };
      function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
        var state = stream._readableState;
        if (null === chunk) {
          state.reading = false;
          onEofChunk(stream, state);
        } else {
          var er;
          skipChunkCheck || (er = chunkInvalid(state, chunk));
          if (er) stream.emit("error", er); else if (state.objectMode || chunk && chunk.length > 0) {
            "string" === typeof chunk || state.objectMode || Object.getPrototypeOf(chunk) === Buffer.prototype || (chunk = _uint8ArrayToBuffer(chunk));
            if (addToFront) state.endEmitted ? stream.emit("error", new Error("stream.unshift() after end event")) : addChunk(stream, state, chunk, true); else if (state.ended) stream.emit("error", new Error("stream.push() after EOF")); else {
              state.reading = false;
              if (state.decoder && !encoding) {
                chunk = state.decoder.write(chunk);
                state.objectMode || 0 !== chunk.length ? addChunk(stream, state, chunk, false) : maybeReadMore(stream, state);
              } else addChunk(stream, state, chunk, false);
            }
          } else addToFront || (state.reading = false);
        }
        return needMoreData(state);
      }
      function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && 0 === state.length && !state.sync) {
          stream.emit("data", chunk);
          stream.read(0);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk);
          state.needReadable && emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
      function chunkInvalid(state, chunk) {
        var er;
        _isUint8Array(chunk) || "string" === typeof chunk || void 0 === chunk || state.objectMode || (er = new TypeError("Invalid non-string/buffer chunk"));
        return er;
      }
      function needMoreData(state) {
        return !state.ended && (state.needReadable || state.length < state.highWaterMark || 0 === state.length);
      }
      Readable.prototype.isPaused = function() {
        return false === this._readableState.flowing;
      };
      Readable.prototype.setEncoding = function(enc) {
        StringDecoder || (StringDecoder = require("string_decoder/").StringDecoder);
        this._readableState.decoder = new StringDecoder(enc);
        this._readableState.encoding = enc;
        return this;
      };
      var MAX_HWM = 8388608;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) n = MAX_HWM; else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || 0 === state.length && state.ended) return 0;
        if (state.objectMode) return 1;
        if (n !== n) return state.flowing && state.length ? state.buffer.head.data.length : state.length;
        n > state.highWaterMark && (state.highWaterMark = computeNewHighWaterMark(n));
        if (n <= state.length) return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      Readable.prototype.read = function(n) {
        debug("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        0 !== n && (state.emittedReadable = false);
        if (0 === n && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          0 === state.length && state.ended ? endReadable(this) : emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (0 === n && state.ended) {
          0 === state.length && endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug("need readable", doRead);
        if (0 === state.length || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug("reading or ended", doRead);
        } else if (doRead) {
          debug("do read");
          state.reading = true;
          state.sync = true;
          0 === state.length && (state.needReadable = true);
          this._read(state.highWaterMark);
          state.sync = false;
          state.reading || (n = howMuchToRead(nOrig, state));
        }
        var ret;
        ret = n > 0 ? fromList(n, state) : null;
        if (null === ret) {
          state.needReadable = true;
          n = 0;
        } else state.length -= n;
        if (0 === state.length) {
          state.ended || (state.needReadable = true);
          nOrig !== n && state.ended && endReadable(this);
        }
        null !== ret && this.emit("data", ret);
        return ret;
      };
      function onEofChunk(stream, state) {
        if (state.ended) return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        emitReadable(stream);
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          state.sync ? pna.nextTick(emitReadable_, stream) : emitReadable_(stream);
        }
      }
      function emitReadable_(stream) {
        debug("emit readable");
        stream.emit("readable");
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          pna.nextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        var len = state.length;
        while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length) break;
          len = state.length;
        }
        state.readingMore = false;
      }
      Readable.prototype._read = function(n) {
        this.emit("error", new Error("_read() is not implemented"));
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
         case 0:
          state.pipes = dest;
          break;

         case 1:
          state.pipes = [ state.pipes, dest ];
          break;

         default:
          state.pipes.push(dest);
        }
        state.pipesCount += 1;
        debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = (!pipeOpts || false !== pipeOpts.end) && dest !== process.stdout && dest !== process.stderr;
        var endFn = doEnd ? onend : unpipe;
        state.endEmitted ? pna.nextTick(endFn) : src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe");
          if (readable === src && unpipeInfo && false === unpipeInfo.hasUnpiped) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", unpipe);
          src.removeListener("data", ondata);
          cleanedUp = true;
          !state.awaitDrain || dest._writableState && !dest._writableState.needDrain || ondrain();
        }
        var increasedAwaitDrain = false;
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          increasedAwaitDrain = false;
          var ret = dest.write(chunk);
          if (false === ret && !increasedAwaitDrain) {
            if ((1 === state.pipesCount && state.pipes === dest || state.pipesCount > 1 && -1 !== indexOf(state.pipes, dest)) && !cleanedUp) {
              debug("false write response, pause", src._readableState.awaitDrain);
              src._readableState.awaitDrain++;
              increasedAwaitDrain = true;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          0 === EElistenerCount(dest, "error") && dest.emit("error", er);
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function() {
          var state = src._readableState;
          debug("pipeOnDrain", state.awaitDrain);
          state.awaitDrain && state.awaitDrain--;
          if (0 === state.awaitDrain && EElistenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        var unpipeInfo = {
          hasUnpiped: false
        };
        if (0 === state.pipesCount) return this;
        if (1 === state.pipesCount) {
          if (dest && dest !== state.pipes) return this;
          dest || (dest = state.pipes);
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          dest && dest.emit("unpipe", this, unpipeInfo);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, unpipeInfo);
          return this;
        }
        var index = indexOf(state.pipes, dest);
        if (-1 === index) return this;
        state.pipes.splice(index, 1);
        state.pipesCount -= 1;
        1 === state.pipesCount && (state.pipes = state.pipes[0]);
        dest.emit("unpipe", this, unpipeInfo);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn);
        if ("data" === ev) false !== this._readableState.flowing && this.resume(); else if ("readable" === ev) {
          var state = this._readableState;
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.emittedReadable = false;
            state.reading ? state.length && emitReadable(this) : pna.nextTick(nReadingNextTick, this);
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      function nReadingNextTick(self) {
        debug("readable nexttick read 0");
        self.read(0);
      }
      Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = true;
          resume(this, state);
        }
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          pna.nextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        if (!state.reading) {
          debug("resume read 0");
          stream.read(0);
        }
        state.resumeScheduled = false;
        state.awaitDrain = 0;
        stream.emit("resume");
        flow(stream);
        state.flowing && !state.reading && stream.read(0);
      }
      Readable.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (false !== this._readableState.flowing) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && null !== stream.read()) ;
      }
      Readable.prototype.wrap = function(stream) {
        var _this = this;
        var state = this._readableState;
        var paused = false;
        stream.on("end", function() {
          debug("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            chunk && chunk.length && _this.push(chunk);
          }
          _this.push(null);
        });
        stream.on("data", function(chunk) {
          debug("wrapped data");
          state.decoder && (chunk = state.decoder.write(chunk));
          if (state.objectMode && (null === chunk || void 0 === chunk)) return;
          if (!state.objectMode && (!chunk || !chunk.length)) return;
          var ret = _this.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) void 0 === this[i] && "function" === typeof stream[i] && (this[i] = function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        }(i));
        for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
        this._read = function(n) {
          debug("wrapped _read", n);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return this;
      };
      Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
        enumerable: false,
        get: function() {
          return this._readableState.highWaterMark;
        }
      });
      Readable._fromList = fromList;
      function fromList(n, state) {
        if (0 === state.length) return null;
        var ret;
        if (state.objectMode) ret = state.buffer.shift(); else if (!n || n >= state.length) {
          ret = state.decoder ? state.buffer.join("") : 1 === state.buffer.length ? state.buffer.head.data : state.buffer.concat(state.length);
          state.buffer.clear();
        } else ret = fromListPartial(n, state.buffer, state.decoder);
        return ret;
      }
      function fromListPartial(n, list, hasStrings) {
        var ret;
        if (n < list.head.data.length) {
          ret = list.head.data.slice(0, n);
          list.head.data = list.head.data.slice(n);
        } else ret = n === list.head.data.length ? list.shift() : hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
        return ret;
      }
      function copyFromBufferString(n, list) {
        var p = list.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          nb === str.length ? ret += str : ret += str.slice(0, n);
          n -= nb;
          if (0 === n) {
            if (nb === str.length) {
              ++c;
              p.next ? list.head = p.next : list.head = list.tail = null;
            } else {
              list.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        list.length -= c;
        return ret;
      }
      function copyFromBuffer(n, list) {
        var ret = Buffer.allocUnsafe(n);
        var p = list.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (0 === n) {
            if (nb === buf.length) {
              ++c;
              p.next ? list.head = p.next : list.head = list.tail = null;
            } else {
              list.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        list.length -= c;
        return ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
        if (!state.endEmitted) {
          state.ended = true;
          pna.nextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        if (!state.endEmitted && 0 === state.length) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
        }
      }
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
        return -1;
      }
    }).call(this, require("_process"), "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "./_stream_duplex": 12,
    "./internal/streams/BufferList": 17,
    "./internal/streams/destroy": 18,
    "./internal/streams/stream": 19,
    _process: 10,
    "core-util-is": 5,
    events: 6,
    inherits: 8,
    isarray: 20,
    "process-nextick-args": 9,
    "safe-buffer": 26,
    "string_decoder/": 21,
    util: 2
  } ],
  15: [ function(require, module, exports) {
    "use strict";
    module.exports = Transform;
    var Duplex = require("./_stream_duplex");
    var util = Object.create(require("core-util-is"));
    util.inherits = require("inherits");
    util.inherits(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb) return this.emit("error", new Error("write callback called multiple times"));
      ts.writechunk = null;
      ts.writecb = null;
      null != data && this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      (rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.highWaterMark);
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        "function" === typeof options.transform && (this._transform = options.transform);
        "function" === typeof options.flush && (this._flush = options.flush);
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      "function" === typeof this._flush ? this._flush(function(er, data) {
        done(_this, er, data);
      }) : done(this, null, null);
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("_transform() is not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (null !== ts.writechunk && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else ts.needTransform = true;
    };
    Transform.prototype._destroy = function(err, cb) {
      var _this2 = this;
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
        _this2.emit("close");
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      null != data && stream.push(data);
      if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
      if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
      return stream.push(null);
    }
  }, {
    "./_stream_duplex": 12,
    "core-util-is": 5,
    inherits: 8
  } ],
  16: [ function(require, module, exports) {
    (function(process, global) {
      "use strict";
      var pna = require("process-nextick-args");
      module.exports = Writable;
      function WriteReq(chunk, encoding, cb) {
        this.chunk = chunk;
        this.encoding = encoding;
        this.callback = cb;
        this.next = null;
      }
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function() {
          onCorkedFinish(_this, state);
        };
      }
      var asyncWrite = !process.browser && [ "v0.10", "v0.9." ].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
      var Duplex;
      Writable.WritableState = WritableState;
      var util = Object.create(require("core-util-is"));
      util.inherits = require("inherits");
      var internalUtil = {
        deprecate: require("util-deprecate")
      };
      var Stream = require("./internal/streams/stream");
      var Buffer = require("safe-buffer").Buffer;
      var OurUint8Array = global.Uint8Array || function() {};
      function _uint8ArrayToBuffer(chunk) {
        return Buffer.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var destroyImpl = require("./internal/streams/destroy");
      util.inherits(Writable, Stream);
      function nop() {}
      function WritableState(options, stream) {
        Duplex = Duplex || require("./_stream_duplex");
        options = options || {};
        var isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        isDuplex && (this.objectMode = this.objectMode || !!options.writableObjectMode);
        var hwm = options.highWaterMark;
        var writableHwm = options.writableHighWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16384;
        this.highWaterMark = hwm || 0 === hwm ? hwm : isDuplex && (writableHwm || 0 === writableHwm) ? writableHwm : defaultHwm;
        this.highWaterMark = Math.floor(this.highWaterMark);
        this.finalCalled = false;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        this.destroyed = false;
        var noDecode = false === options.decodeStrings;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      (function() {
        try {
          Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate(function() {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
          });
        } catch (_) {}
      })();
      var realHasInstance;
      if ("function" === typeof Symbol && Symbol.hasInstance && "function" === typeof Function.prototype[Symbol.hasInstance]) {
        realHasInstance = Function.prototype[Symbol.hasInstance];
        Object.defineProperty(Writable, Symbol.hasInstance, {
          value: function(object) {
            if (realHasInstance.call(this, object)) return true;
            if (this !== Writable) return false;
            return object && object._writableState instanceof WritableState;
          }
        });
      } else realHasInstance = function(object) {
        return object instanceof this;
      };
      function Writable(options) {
        Duplex = Duplex || require("./_stream_duplex");
        if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) return new Writable(options);
        this._writableState = new WritableState(options, this);
        this.writable = true;
        if (options) {
          "function" === typeof options.write && (this._write = options.write);
          "function" === typeof options.writev && (this._writev = options.writev);
          "function" === typeof options.destroy && (this._destroy = options.destroy);
          "function" === typeof options.final && (this._final = options.final);
        }
        Stream.call(this);
      }
      Writable.prototype.pipe = function() {
        this.emit("error", new Error("Cannot pipe, not readable"));
      };
      function writeAfterEnd(stream, cb) {
        var er = new Error("write after end");
        stream.emit("error", er);
        pna.nextTick(cb, er);
      }
      function validChunk(stream, state, chunk, cb) {
        var valid = true;
        var er = false;
        null === chunk ? er = new TypeError("May not write null values to stream") : "string" === typeof chunk || void 0 === chunk || state.objectMode || (er = new TypeError("Invalid non-string/buffer chunk"));
        if (er) {
          stream.emit("error", er);
          pna.nextTick(cb, er);
          valid = false;
        }
        return valid;
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        var isBuf = !state.objectMode && _isUint8Array(chunk);
        isBuf && !Buffer.isBuffer(chunk) && (chunk = _uint8ArrayToBuffer(chunk));
        if ("function" === typeof encoding) {
          cb = encoding;
          encoding = null;
        }
        isBuf ? encoding = "buffer" : encoding || (encoding = state.defaultEncoding);
        "function" !== typeof cb && (cb = nop);
        if (state.ended) writeAfterEnd(this, cb); else if (isBuf || validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        var state = this._writableState;
        state.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          state.writing || state.corked || state.finished || state.bufferProcessing || !state.bufferedRequest || clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        "string" === typeof encoding && (encoding = encoding.toLowerCase());
        if (!([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      function decodeChunk(state, chunk, encoding) {
        state.objectMode || false === state.decodeStrings || "string" !== typeof chunk || (chunk = Buffer.from(chunk, encoding));
        return chunk;
      }
      Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
        enumerable: false,
        get: function() {
          return this._writableState.highWaterMark;
        }
      });
      function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
        if (!isBuf) {
          var newChunk = decodeChunk(state, chunk, encoding);
          if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
          }
        }
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        ret || (state.needDrain = true);
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
          };
          last ? last.next = state.lastBufferedRequest : state.bufferedRequest = state.lastBufferedRequest;
          state.bufferedRequestCount += 1;
        } else doWrite(stream, state, false, len, chunk, encoding, cb);
        return ret;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        writev ? stream._writev(chunk, state.onwrite) : stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) {
          pna.nextTick(cb, er);
          pna.nextTick(finishMaybe, stream, state);
          stream._writableState.errorEmitted = true;
          stream.emit("error", er);
        } else {
          cb(er);
          stream._writableState.errorEmitted = true;
          stream.emit("error", er);
          finishMaybe(stream, state);
        }
      }
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        onwriteStateUpdate(state);
        if (er) onwriteError(stream, state, sync, er, cb); else {
          var finished = needFinish(state);
          finished || state.corked || state.bufferProcessing || !state.bufferedRequest || clearBuffer(stream, state);
          sync ? asyncWrite(afterWrite, stream, state, finished, cb) : afterWrite(stream, state, finished, cb);
        }
      }
      function afterWrite(stream, state, finished, cb) {
        finished || onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      function onwriteDrain(stream, state) {
        if (0 === state.length && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          var allBuffers = true;
          while (entry) {
            buffer[count] = entry;
            entry.isBuf || (allBuffers = false);
            entry = entry.next;
            count += 1;
          }
          buffer.allBuffers = allBuffers;
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else state.corkedRequestsFree = new CorkedRequest(state);
          state.bufferedRequestCount = 0;
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--;
            if (state.writing) break;
          }
          null === entry && (state.lastBufferedRequest = null);
        }
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new Error("_write() is not implemented"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if ("function" === typeof chunk) {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if ("function" === typeof encoding) {
          cb = encoding;
          encoding = null;
        }
        null !== chunk && void 0 !== chunk && this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        state.ending || state.finished || endWritable(this, state, cb);
      };
      function needFinish(state) {
        return state.ending && 0 === state.length && null === state.bufferedRequest && !state.finished && !state.writing;
      }
      function callFinal(stream, state) {
        stream._final(function(err) {
          state.pendingcb--;
          err && stream.emit("error", err);
          state.prefinished = true;
          stream.emit("prefinish");
          finishMaybe(stream, state);
        });
      }
      function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) if ("function" === typeof stream._final) {
          state.pendingcb++;
          state.finalCalled = true;
          pna.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          prefinish(stream, state);
          if (0 === state.pendingcb) {
            state.finished = true;
            stream.emit("finish");
          }
        }
        return need;
      }
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        cb && (state.finished ? pna.nextTick(cb) : stream.once("finish", cb));
        state.ended = true;
        stream.writable = false;
      }
      function onCorkedFinish(corkReq, state, err) {
        var entry = corkReq.entry;
        corkReq.entry = null;
        while (entry) {
          var cb = entry.callback;
          state.pendingcb--;
          cb(err);
          entry = entry.next;
        }
        state.corkedRequestsFree ? state.corkedRequestsFree.next = corkReq : state.corkedRequestsFree = corkReq;
      }
      Object.defineProperty(Writable.prototype, "destroyed", {
        get: function() {
          if (void 0 === this._writableState) return false;
          return this._writableState.destroyed;
        },
        set: function(value) {
          if (!this._writableState) return;
          this._writableState.destroyed = value;
        }
      });
      Writable.prototype.destroy = destroyImpl.destroy;
      Writable.prototype._undestroy = destroyImpl.undestroy;
      Writable.prototype._destroy = function(err, cb) {
        this.end();
        cb(err);
      };
    }).call(this, require("_process"), "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "./_stream_duplex": 12,
    "./internal/streams/destroy": 18,
    "./internal/streams/stream": 19,
    _process: 10,
    "core-util-is": 5,
    inherits: 8,
    "process-nextick-args": 9,
    "safe-buffer": 26,
    "util-deprecate": 28
  } ],
  17: [ function(require, module, exports) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var Buffer = require("safe-buffer").Buffer;
    var util = require("util");
    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }
    module.exports = function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList.prototype.push = function push(v) {
        var entry = {
          data: v,
          next: null
        };
        this.length > 0 ? this.tail.next = entry : this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function unshift(v) {
        var entry = {
          data: v,
          next: this.head
        };
        0 === this.length && (this.tail = entry);
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function shift() {
        if (0 === this.length) return;
        var ret = this.head.data;
        1 === this.length ? this.head = this.tail = null : this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function join(s) {
        if (0 === this.length) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) ret += s + p.data;
        return ret;
      };
      BufferList.prototype.concat = function concat(n) {
        if (0 === this.length) return Buffer.alloc(0);
        if (1 === this.length) return this.head.data;
        var ret = Buffer.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList;
    }();
    util && util.inspect && util.inspect.custom && (module.exports.prototype[util.inspect.custom] = function() {
      var obj = util.inspect({
        length: this.length
      });
      return this.constructor.name + " " + obj;
    });
  }, {
    "safe-buffer": 26,
    util: 2
  } ],
  18: [ function(require, module, exports) {
    "use strict";
    var pna = require("process-nextick-args");
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        cb ? cb(err) : !err || this._writableState && this._writableState.errorEmitted || pna.nextTick(emitErrorNT, this, err);
        return this;
      }
      this._readableState && (this._readableState.destroyed = true);
      this._writableState && (this._writableState.destroyed = true);
      this._destroy(err || null, function(err) {
        if (!cb && err) {
          pna.nextTick(emitErrorNT, _this, err);
          _this._writableState && (_this._writableState.errorEmitted = true);
        } else cb && cb(err);
      });
      return this;
    }
    function undestroy() {
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
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self, err) {
      self.emit("error", err);
    }
    module.exports = {
      destroy: destroy,
      undestroy: undestroy
    };
  }, {
    "process-nextick-args": 9
  } ],
  19: [ function(require, module, exports) {
    module.exports = require("events").EventEmitter;
  }, {
    events: 6
  } ],
  20: [ function(require, module, exports) {
    arguments[4][4][0].apply(exports, arguments);
  }, {
    dup: 4
  } ],
  21: [ function(require, module, exports) {
    "use strict";
    var Buffer = require("safe-buffer").Buffer;
    var isEncoding = Buffer.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
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
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) switch (enc) {
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
        if (retried) return;
        enc = ("" + enc).toLowerCase();
        retried = true;
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if ("string" !== typeof nenc && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
       case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;

       case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;

       case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;

       default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (0 === buf.length) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (void 0 === r) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else i = 0;
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      if (byte >> 5 === 6) return 2;
      if (byte >> 4 === 14) return 3;
      if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        nb > 0 && (self.lastNeed = nb - 1);
        return nb;
      }
      if (--j < i || -2 === nb) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        nb > 0 && (self.lastNeed = nb - 2);
        return nb;
      }
      if (--j < i || -2 === nb) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        nb > 0 && (2 === nb ? nb = 0 : self.lastNeed = nb - 3);
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self, buf, p) {
      if (128 !== (192 & buf[0])) {
        self.lastNeed = 0;
        return "\ufffd";
      }
      if (self.lastNeed > 1 && buf.length > 1) {
        if (128 !== (192 & buf[1])) {
          self.lastNeed = 1;
          return "\ufffd";
        }
        if (self.lastNeed > 2 && buf.length > 2 && 128 !== (192 & buf[2])) {
          self.lastNeed = 2;
          return "\ufffd";
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (void 0 !== r) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\ufffd";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
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
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (0 === n) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (1 === n) this.lastChar[0] = buf[buf.length - 1]; else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }, {
    "safe-buffer": 26
  } ],
  22: [ function(require, module, exports) {
    module.exports = require("./readable").PassThrough;
  }, {
    "./readable": 23
  } ],
  23: [ function(require, module, exports) {
    exports = module.exports = require("./lib/_stream_readable.js");
    exports.Stream = exports;
    exports.Readable = exports;
    exports.Writable = require("./lib/_stream_writable.js");
    exports.Duplex = require("./lib/_stream_duplex.js");
    exports.Transform = require("./lib/_stream_transform.js");
    exports.PassThrough = require("./lib/_stream_passthrough.js");
  }, {
    "./lib/_stream_duplex.js": 12,
    "./lib/_stream_passthrough.js": 13,
    "./lib/_stream_readable.js": 14,
    "./lib/_stream_transform.js": 15,
    "./lib/_stream_writable.js": 16
  } ],
  24: [ function(require, module, exports) {
    module.exports = require("./readable").Transform;
  }, {
    "./readable": 23
  } ],
  25: [ function(require, module, exports) {
    module.exports = require("./lib/_stream_writable.js");
  }, {
    "./lib/_stream_writable.js": 16
  } ],
  26: [ function(require, module, exports) {
    var buffer = require("buffer");
    var Buffer = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) dst[key] = src[key];
    }
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer; else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length);
    }
    copyProps(Buffer, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if ("number" === typeof arg) throw new TypeError("Argument must not be a number");
      return Buffer(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if ("number" !== typeof size) throw new TypeError("Argument must be a number");
      var buf = Buffer(size);
      void 0 !== fill ? "string" === typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0);
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if ("number" !== typeof size) throw new TypeError("Argument must be a number");
      return Buffer(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if ("number" !== typeof size) throw new TypeError("Argument must be a number");
      return buffer.SlowBuffer(size);
    };
  }, {
    buffer: 3
  } ],
  27: [ function(require, module, exports) {
    module.exports = Stream;
    var EE = require("events").EventEmitter;
    var inherits = require("inherits");
    inherits(Stream, EE);
    Stream.Readable = require("readable-stream/readable.js");
    Stream.Writable = require("readable-stream/writable.js");
    Stream.Duplex = require("readable-stream/duplex.js");
    Stream.Transform = require("readable-stream/transform.js");
    Stream.PassThrough = require("readable-stream/passthrough.js");
    Stream.Stream = Stream;
    function Stream() {
      EE.call(this);
    }
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        dest.writable && false === dest.write(chunk) && source.pause && source.pause();
      }
      source.on("data", ondata);
      function ondrain() {
        source.readable && source.resume && source.resume();
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || false !== options.end)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        "function" === typeof dest.destroy && dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (0 === EE.listenerCount(this, "error")) throw er;
      }
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  }, {
    events: 6,
    inherits: 8,
    "readable-stream/duplex.js": 11,
    "readable-stream/passthrough.js": 22,
    "readable-stream/readable.js": 23,
    "readable-stream/transform.js": 24,
    "readable-stream/writable.js": 25
  } ],
  28: [ function(require, module, exports) {
    (function(global) {
      module.exports = deprecate;
      function deprecate(fn, msg) {
        if (config("noDeprecation")) return fn;
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (config("throwDeprecation")) throw new Error(msg);
            config("traceDeprecation") ? console.trace(msg) : console.warn(msg);
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      }
      function config(name) {
        try {
          if (!global.localStorage) return false;
        } catch (_) {
          return false;
        }
        var val = global.localStorage[name];
        if (null == val) return false;
        return "true" === String(val).toLowerCase();
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  About: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35e25rR9PtMB4CVB0mS10xf", "About");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var About = function(_super) {
      __extends(About, _super);
      function About() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      About = __decorate([ ccclass ], About);
      return About;
    }(cc.Component);
    exports.default = About;
    cc._RF.pop();
  }, {} ],
  ArcProgressBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e815EI+ItLN7UUw8EtiwMA", "ArcProgressBar");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, help = _a.help, menu = _a.menu;
    var ArcProgressBar = function(_super) {
      __extends(ArcProgressBar, _super);
      function ArcProgressBar() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.graphics = null;
        _this._radius = 100;
        _this._clockwise = true;
        _this._startAngle = 90;
        _this._range = 180;
        _this._lineWidth = 20;
        _this._progress = .4;
        _this._lineCap = cc.Graphics.LineCap.ROUND;
        _this._backgroundColor = new cc.Color(255, 255, 255, 255);
        _this._progressColor = new cc.Color(50, 101, 246, 255);
        _this.curStartAngle = 0;
        _this.curStartRadians = 0;
        _this.curEndRadians = 0;
        _this.curTween = null;
        _this.curTweenRes = null;
        return _this;
      }
      Object.defineProperty(ArcProgressBar.prototype, "radius", {
        get: function() {
          return this._radius;
        },
        set: function(value) {
          this._radius = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "clockwise", {
        get: function() {
          return this._clockwise;
        },
        set: function(value) {
          this._clockwise = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "startAngle", {
        get: function() {
          return this._startAngle;
        },
        set: function(value) {
          this._startAngle = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "range", {
        get: function() {
          return this._range;
        },
        set: function(value) {
          this._range = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "lineWidth", {
        get: function() {
          return this._lineWidth;
        },
        set: function(value) {
          this._lineWidth = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "progress", {
        get: function() {
          return this._progress;
        },
        set: function(value) {
          this.updateProgress(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "lineCap", {
        get: function() {
          return this._lineCap;
        },
        set: function(value) {
          this._lineCap = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "backgroundColor", {
        get: function() {
          return this._backgroundColor;
        },
        set: function(value) {
          this._backgroundColor = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ArcProgressBar.prototype, "progressColor", {
        get: function() {
          return this._progressColor;
        },
        set: function(value) {
          this._progressColor = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      ArcProgressBar.prototype.onLoad = function() {
        this.init();
      };
      ArcProgressBar.prototype.resetInEditor = function() {
        this.init();
      };
      ArcProgressBar.prototype.init = function() {
        this.graphics || (this.graphics = this.getComponent(cc.Graphics));
        this.updateProperties();
      };
      ArcProgressBar.prototype.show = function() {
        var _this = this;
        return new Promise(function(res) {
          var node = _this.graphics.node;
          node.opacity = 0;
          node.active = true;
          cc.tween(node).to(.1, {
            opacity: 255
          }).call(res).start();
        });
      };
      ArcProgressBar.prototype.hide = function() {
        var _this = this;
        return new Promise(function(res) {
          var node = _this.graphics.node;
          cc.tween(node).to(.1, {
            opacity: 0
          }).set({
            active: false
          }).call(res).start();
        });
      };
      ArcProgressBar.prototype.updateProperties = function() {
        var graphics = this.graphics;
        graphics.lineWidth = this._lineWidth;
        graphics.lineCap = this._lineCap;
        this.curStartAngle = this._startAngle + 90;
        this.curStartRadians = this.angleToRadians(this.curStartAngle);
        var endAngle = this.curStartAngle + (this._clockwise ? -this._range : this._range);
        this.curEndRadians = this.angleToRadians(endAngle);
        this.updateProgress(this._progress);
      };
      ArcProgressBar.prototype.updateProgress = function(value) {
        value < 0 ? value = 0 : value > 1 && (value = 1);
        this._progress = value;
        var graphics = this.graphics;
        graphics.clear();
        graphics.strokeColor = this._backgroundColor;
        graphics.arc(0, 0, this._radius, this.curStartRadians, this.curEndRadians, !this._clockwise);
        graphics.stroke();
        var offset = this._clockwise ? -this._range : this._range, angle = this.curStartAngle + offset * value, radians = this.angleToRadians(angle);
        graphics.strokeColor = this._progressColor;
        graphics.arc(0, 0, this._radius, this.curStartRadians, radians, !this._clockwise);
        graphics.stroke();
      };
      ArcProgressBar.prototype.to = function(duration, progress) {
        var _this = this;
        return new Promise(function(res) {
          _this.stop();
          _this.curTweenRes = res;
          _this.curTween = cc.tween(_this).to(duration, {
            progress: progress
          }).call(function() {
            _this.curTween = null;
            _this.curTweenRes = null;
          }).call(res).start();
        });
      };
      ArcProgressBar.prototype.stop = function() {
        if (this.curTween) {
          this.curTween.stop();
          this.curTween = null;
        }
        if (this.curTweenRes) {
          this.curTweenRes();
          this.curTweenRes = null;
        }
      };
      ArcProgressBar.prototype.angleToRadians = function(angle) {
        return Math.PI / 180 * angle;
      };
      __decorate([ property(cc.Graphics) ], ArcProgressBar.prototype, "graphics", void 0);
      __decorate([ property() ], ArcProgressBar.prototype, "_radius", void 0);
      __decorate([ property({
        tooltip: false
      }) ], ArcProgressBar.prototype, "radius", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_clockwise", void 0);
      __decorate([ property({
        tooltip: false
      }) ], ArcProgressBar.prototype, "clockwise", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_startAngle", void 0);
      __decorate([ property({
        tooltip: false
      }) ], ArcProgressBar.prototype, "startAngle", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_range", void 0);
      __decorate([ property({
        tooltip: false
      }) ], ArcProgressBar.prototype, "range", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_lineWidth", void 0);
      __decorate([ property({
        tooltip: false
      }) ], ArcProgressBar.prototype, "lineWidth", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_progress", void 0);
      __decorate([ property({
        range: [ 0, 1 ],
        step: .01,
        tooltip: false
      }) ], ArcProgressBar.prototype, "progress", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_lineCap", void 0);
      __decorate([ property({
        type: cc.Graphics.LineCap,
        tooltip: false
      }) ], ArcProgressBar.prototype, "lineCap", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_backgroundColor", void 0);
      __decorate([ property({
        type: cc.Color,
        tooltip: false
      }) ], ArcProgressBar.prototype, "backgroundColor", null);
      __decorate([ property() ], ArcProgressBar.prototype, "_progressColor", void 0);
      __decorate([ property({
        type: cc.Color,
        tooltip: false
      }) ], ArcProgressBar.prototype, "progressColor", null);
      ArcProgressBar = __decorate([ ccclass, requireComponent(cc.Graphics), executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/charts/ArcProgressBar.ts"), menu("eazax/\u56fe\u8868\u7ec4\u4ef6/ArcProgressBar") ], ArcProgressBar);
      return ArcProgressBar;
    }(cc.Component);
    exports.default = ArcProgressBar;
    cc._RF.pop();
  }, {} ],
  ArrayUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a42aehq7N9EZ6copkvQ26I3", "ArrayUtil");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ArrayUtil = function() {
      function ArrayUtil() {}
      ArrayUtil.copy2DArray = function(array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) newArray.push(array[i].concat());
        return newArray;
      };
      ArrayUtil.fisherYatesShuffle = function(array) {
        var count = array.length;
        while (count) {
          var index = Math.floor(Math.random() * count--);
          var temp = array[count];
          array[count] = array[index];
          array[index] = temp;
        }
        return array;
      };
      ArrayUtil.confound = function(array) {
        var result = array.slice().sort(function() {
          return Math.random() - .5;
        });
        return result;
      };
      ArrayUtil.flattening = function(array) {
        for (;array.some(function(v) {
          return Array.isArray(v);
        }); ) array = [].concat.apply([], array);
        return array;
      };
      ArrayUtil.combineArrays = function(array1, array2) {
        var newArray = __spreadArrays(array1, array2);
        return newArray;
      };
      ArrayUtil.getRandomValueInArray = function(array) {
        var newArray = array[Math.floor(Math.random() * array.length)];
        return newArray;
      };
      return ArrayUtil;
    }();
    exports.default = ArrayUtil;
    cc._RF.pop();
  }, {} ],
  AudioPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e98eCtw8tCR6UAJkWYfNjd", "AudioPlayer");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioPlayer = function() {
      function AudioPlayer() {}
      Object.defineProperty(AudioPlayer, "masterVolume", {
        get: function() {
          return this._masterVolume;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AudioPlayer, "musicVolume", {
        get: function() {
          return this._musicVolume;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AudioPlayer, "effectVolume", {
        get: function() {
          return this._effectVolume;
        },
        enumerable: false,
        configurable: true
      });
      AudioPlayer.setMasterVolume = function(value) {
        value < 0 ? value = 0 : value > 1 && (value = 1);
        this._masterVolume = value;
        this.setMusicVolume(this._musicVolume);
        this.setEffectVolume(this._effectVolume);
      };
      AudioPlayer.setVolume = function(value) {
        this.setMusicVolume(value);
        this.setEffectVolume(value);
      };
      AudioPlayer.setMusicVolume = function(value) {
        value < 0 ? value = 0 : value > 1 && (value = 1);
        this._musicVolume = value;
        var realVolume = this._masterVolume * value;
        this._music.forEach(function(id, clip) {
          return cc.audioEngine.setVolume(id, realVolume);
        });
      };
      AudioPlayer.setEffectVolume = function(value) {
        value < 0 ? value = 0 : value > 1 && (value = 1);
        this._effectVolume = value;
        var realVolume = this._masterVolume * value;
        this._effect.forEach(function(clip, id) {
          return cc.audioEngine.setVolume(id, realVolume);
        });
      };
      AudioPlayer.playMusic = function(clip) {
        this._music.has(clip) && this.stopMusic(clip);
        var id = cc.audioEngine.play(clip, true, this._masterVolume * this._musicVolume);
        this._music.set(clip, id);
      };
      AudioPlayer.stopMusic = function(clip) {
        if (!this._music.has(clip)) return;
        cc.audioEngine.stop(this._music.get(clip));
        this._music.delete(clip);
      };
      AudioPlayer.stopAllMusic = function() {
        var _this = this;
        this._music.forEach(function(id, clip) {
          return _this.stopMusic(clip);
        });
      };
      AudioPlayer.pauseMusic = function(clip) {
        if (!this._music.has(clip)) return;
        cc.audioEngine.pause(this._music.get(clip));
      };
      AudioPlayer.pauseAllMusic = function() {
        var _this = this;
        this._music.forEach(function(id, clip) {
          return _this.pauseMusic(clip);
        });
      };
      AudioPlayer.resumeMusic = function(clip) {
        if (!this._music.has(clip)) return;
        cc.audioEngine.resume(this._music.get(clip));
      };
      AudioPlayer.resumeAllMusic = function() {
        var _this = this;
        this._music.forEach(function(id, clip) {
          return _this.resumeMusic(clip);
        });
      };
      AudioPlayer.playEffect = function(clip, loop) {
        var _this = this;
        var id = cc.audioEngine.play(clip, loop, this._masterVolume * this._effectVolume);
        this._effect.set(id, clip);
        loop || cc.audioEngine.setFinishCallback(id, function() {
          return _this._effect.delete(id);
        });
      };
      AudioPlayer.stopEffect = function(clip) {
        var _this = this;
        this._effect.forEach(function(_clip, id) {
          if (_clip === clip) {
            cc.audioEngine.stop(id);
            _this._effect.delete(id);
          }
        });
      };
      AudioPlayer.stopAllEffect = function() {
        var _this = this;
        this._effect.forEach(function(clip, id) {
          cc.audioEngine.stop(id);
          _this._effect.delete(id);
        });
      };
      AudioPlayer.pauseEffect = function(clip) {
        this._effect.forEach(function(_clip, id) {
          return _clip === clip && cc.audioEngine.pause(id);
        });
      };
      AudioPlayer.pauseAllEffect = function() {
        this._effect.forEach(function(clip, id) {
          return cc.audioEngine.pause(id);
        });
      };
      AudioPlayer.resumeEffect = function(clip) {
        this._effect.forEach(function(_clip, id) {
          return _clip === clip && cc.audioEngine.resume(id);
        });
      };
      AudioPlayer.resumeAllEffect = function() {
        this._effect.forEach(function(clip, id) {
          return cc.audioEngine.resume(id);
        });
      };
      AudioPlayer.stopAll = function() {
        this.stopAllMusic();
        this.stopAllEffect();
      };
      AudioPlayer.pauseAll = function() {
        this.pauseAllMusic();
        this.pauseAllEffect();
      };
      AudioPlayer.resumeAll = function() {
        this.resumeAllMusic();
        this.resumeAllEffect();
      };
      AudioPlayer.mute = function() {
        this.setMasterVolume(0);
      };
      AudioPlayer._music = new Map();
      AudioPlayer._effect = new Map();
      AudioPlayer._masterVolume = 1;
      AudioPlayer._musicVolume = 1;
      AudioPlayer._effectVolume = 1;
      return AudioPlayer;
    }();
    exports.default = AudioPlayer;
    cc._RF.pop();
  }, {} ],
  BackgroundFitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec242ucTw5L6IDu4ClT+6Wt", "BackgroundFitter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager_1 = require("../core/EventManager");
    var _a = cc._decorator, ccclass = _a.ccclass, executionOrder = _a.executionOrder;
    var BackgroundFitter = function(_super) {
      __extends(BackgroundFitter, _super);
      function BackgroundFitter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BackgroundFitter.prototype.onLoad = function() {
        this.registerEvent();
      };
      BackgroundFitter.prototype.onEnable = function() {
        this.adapt();
      };
      BackgroundFitter.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      BackgroundFitter.prototype.registerEvent = function() {
        EventManager_1.default.on("view-resize", this.adapt, this);
      };
      BackgroundFitter.prototype.unregisterEvent = function() {
        EventManager_1.default.off("view-resize", this.adapt, this);
      };
      BackgroundFitter.prototype.adapt = function() {
        var winSize = cc.winSize, screenRatio = winSize.height / winSize.width;
        var designResolution = cc.Canvas.instance.designResolution, designRatio = designResolution.height / designResolution.width;
        var scale = 1;
        scale = screenRatio >= designRatio ? winSize.height / designResolution.height : winSize.width / designResolution.width;
        this.node.scale = scale;
      };
      BackgroundFitter = __decorate([ ccclass, executionOrder(-99) ], BackgroundFitter);
      return BackgroundFitter;
    }(cc.Component);
    exports.default = BackgroundFitter;
    cc._RF.pop();
  }, {
    "../core/EventManager": "EventManager"
  } ],
  Base64Util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac5f934G71KKYs0wNZCEae+", "Base64Util");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base64Util = function() {
      function Base64Util() {}
      Base64Util.encodeString = function(string) {
        var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var base64 = "";
        var i = 0;
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        string = Base64Util.encodeUtf8(string);
        while (i < string.length) {
          chr1 = string.charCodeAt(i++);
          chr2 = string.charCodeAt(i++);
          chr3 = string.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (3 & chr1) << 4 | chr2 >> 4;
          enc3 = (15 & chr2) << 2 | chr3 >> 6;
          enc4 = 63 & chr3;
          isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64);
          base64 = base64 + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
        }
        return base64;
      };
      Base64Util.decodeString = function(base64) {
        var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var string = "";
        var i = 0;
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < base64.length) {
          enc1 = keyString.indexOf(base64.charAt(i++));
          enc2 = keyString.indexOf(base64.charAt(i++));
          enc3 = keyString.indexOf(base64.charAt(i++));
          enc4 = keyString.indexOf(base64.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (15 & enc2) << 4 | enc3 >> 2;
          chr3 = (3 & enc3) << 6 | enc4;
          string += String.fromCharCode(chr1);
          64 != enc3 && (string += String.fromCharCode(chr2));
          64 != enc4 && (string += String.fromCharCode(chr3));
        }
        string = Base64Util.decodeUtf8(string);
        return string;
      };
      Base64Util.encodeUtf8 = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utf8 = "";
        for (var i = 0; i < string.length; i++) {
          var c = string.charCodeAt(i);
          if (c < 128) utf8 += String.fromCharCode(c); else if (c > 127 && c < 2048) {
            utf8 += String.fromCharCode(c >> 6 | 192);
            utf8 += String.fromCharCode(63 & c | 128);
          } else {
            utf8 += String.fromCharCode(c >> 12 | 224);
            utf8 += String.fromCharCode(c >> 6 & 63 | 128);
            utf8 += String.fromCharCode(63 & c | 128);
          }
        }
        return utf8;
      };
      Base64Util.decodeUtf8 = function(utf8) {
        var string = "";
        var i = 0;
        var c1 = 0, c2 = 0, c3 = 0;
        while (i < utf8.length) {
          c1 = utf8.charCodeAt(i);
          if (c1 < 128) {
            string += String.fromCharCode(c1);
            i++;
          } else if (c1 > 191 && c1 < 224) {
            c2 = utf8.charCodeAt(i + 1);
            string += String.fromCharCode((31 & c1) << 6 | 63 & c2);
            i += 2;
          } else {
            c2 = utf8.charCodeAt(i + 1);
            c3 = utf8.charCodeAt(i + 2);
            string += String.fromCharCode((15 & c1) << 12 | (63 & c2) << 6 | 63 & c3);
            i += 3;
          }
        }
        return string;
      };
      Base64Util.base64ToBlob = function(base64) {
        if (!window || !window.atob) return null;
        var strings = base64.split(",");
        var type = /image\/\w+|;/.exec(strings[0])[0];
        var data = window.atob(strings[1]);
        var arrayBuffer = new ArrayBuffer(data.length);
        var uint8Array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < data.length; i++) uint8Array[i] = 255 & data.charCodeAt(i);
        return new Blob([ uint8Array ], {
          type: type
        });
      };
      return Base64Util;
    }();
    exports.default = Base64Util;
    false;
    cc._RF.pop();
  }, {} ],
  BaseAssembler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f747dlR2FOJaaY83oRjfM3", "BaseAssembler");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseAssembler = function(_super) {
      __extends(BaseAssembler, _super);
      function BaseAssembler() {
        var _this = _super.call(this) || this;
        _this.floatsPerVert = 5;
        _this.verticesCount = 4;
        _this.indicesCount = 6;
        _this.uvOffset = 2;
        _this.colorOffset = 4;
        _this._local = null;
        _this._renderData = new cc.RenderData();
        _this._renderData.init(_this);
        _this.initData();
        _this.initLocal();
        return _this;
      }
      Object.defineProperty(BaseAssembler.prototype, "verticesFloats", {
        get: function() {
          return this.verticesCount * this.floatsPerVert;
        },
        enumerable: false,
        configurable: true
      });
      BaseAssembler.prototype.init = function(renderComp) {
        _super.prototype.init.call(this, renderComp);
      };
      BaseAssembler.prototype.initData = function() {
        this._renderData.createQuadData(0, this.verticesFloats, this.indicesCount);
      };
      BaseAssembler.prototype.initLocal = function() {
        this._local = [];
        this._local.length = this.verticesCount;
      };
      BaseAssembler.prototype.updateRenderData = function(comp) {
        if (comp._vertsDirty) {
          this.updateUVs(comp);
          this.updateVerts(comp);
          comp._vertsDirty = false;
        }
      };
      BaseAssembler.prototype.updateColor = function(comp, color) {
        var uintVerts = this._renderData.uintVDatas[0];
        if (!uintVerts) return;
        color = null != color ? color : comp.node.color._val;
        var verticesCount = this.verticesCount;
        var colorOffset = this.colorOffset;
        var floatsPerVert = this.floatsPerVert;
        for (var i = 0; i < verticesCount; i++) uintVerts[colorOffset + i * floatsPerVert] = color;
      };
      BaseAssembler.prototype.updateUVs = function(comp) {
        var left = 0, right = 1, bottom = 1, top = 0;
        var uv = [];
        uv[0] = left;
        uv[1] = bottom;
        uv[2] = right;
        uv[3] = bottom;
        uv[4] = left;
        uv[5] = top;
        uv[6] = right;
        uv[7] = top;
        var vData = this._renderData.vDatas[0];
        var floatsPerVert = this.floatsPerVert;
        var uvOffset = this.uvOffset;
        for (var i = 0; i < 4; i++) {
          var srcOffset = 2 * i;
          var dstOffset = floatsPerVert * i + uvOffset;
          vData[dstOffset] = uv[srcOffset];
          vData[dstOffset + 1] = uv[srcOffset + 1];
        }
      };
      BaseAssembler.prototype.updateVerts = function(comp) {
        var node = comp.node, width = node.width, height = node.height, appX = node.anchorX * width, appY = node.anchorY * height;
        var left = -appX, bottom = -appY, right = width - appX, top = height - appY;
        var local = this._local;
        local[0] = left;
        local[1] = bottom;
        local[2] = right;
        local[3] = top;
        this.updateWorldVerts(comp);
      };
      BaseAssembler.prototype.updateWorldVerts = function(comp) {
        var local = this._local;
        var verts = this._renderData.vDatas[0];
        var matrix = comp.node._worldMatrix;
        var matrixData = matrix.m, a = matrixData[0], b = matrixData[1], c = matrixData[4], d = matrixData[5], tx = matrixData[12], ty = matrixData[13];
        var vl = local[0], vr = local[2], vb = local[1], vt = local[3];
        var floatsPerVert = this.floatsPerVert;
        var vertexOffset = 0;
        var justTranslate = 1 === a && 0 === b && 0 === c && 1 === d;
        if (justTranslate) {
          verts[vertexOffset] = vl + tx;
          verts[vertexOffset + 1] = vb + ty;
          vertexOffset += floatsPerVert;
          verts[vertexOffset] = vr + tx;
          verts[vertexOffset + 1] = vb + ty;
          vertexOffset += floatsPerVert;
          verts[vertexOffset] = vl + tx;
          verts[vertexOffset + 1] = vt + ty;
          vertexOffset += floatsPerVert;
          verts[vertexOffset] = vr + tx;
          verts[vertexOffset + 1] = vt + ty;
        } else {
          var al = a * vl, ar = a * vr, bl = b * vl, br = b * vr, cb = c * vb, ct = c * vt, db = d * vb, dt = d * vt;
          verts[vertexOffset] = al + cb + tx;
          verts[vertexOffset + 1] = bl + db + ty;
          vertexOffset += floatsPerVert;
          verts[vertexOffset] = ar + cb + tx;
          verts[vertexOffset + 1] = br + db + ty;
          vertexOffset += floatsPerVert;
          verts[vertexOffset] = al + ct + tx;
          verts[vertexOffset + 1] = bl + dt + ty;
          vertexOffset += floatsPerVert;
          verts[vertexOffset] = ar + ct + tx;
          verts[vertexOffset + 1] = br + dt + ty;
        }
      };
      BaseAssembler.prototype.fillBuffers = function(comp, renderer) {
        renderer.worldMatDirty && this.updateWorldVerts(comp);
        var renderData = this._renderData, vData = renderData.vDatas[0], iData = renderData.iDatas[0];
        var buffer = this.getBuffer(), offsetInfo = buffer.request(this.verticesCount, this.indicesCount);
        var vertexOffset = offsetInfo.byteOffset >> 2, vertexBuffer = buffer._vData;
        vData.length + vertexOffset > vertexBuffer.length ? vertexBuffer.set(vData.subarray(0, vertexBuffer.length - vertexOffset), vertexOffset) : vertexBuffer.set(vData, vertexOffset);
        var indicesBuffer = buffer._iData, vertexId = offsetInfo.vertexOffset;
        var indicesOffset = offsetInfo.indiceOffset;
        for (var i = 0, l = iData.length; i < l; i++) indicesBuffer[indicesOffset++] = vertexId + iData[i];
      };
      BaseAssembler.prototype.getBuffer = function() {
        return cc.renderer._handle._meshBuffer;
      };
      return BaseAssembler;
    }(cc.Assembler);
    exports.default = BaseAssembler;
    cc._RF.pop();
  }, {} ],
  BaseTextureRenderer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9310bbajo5Nr7rcS2aot73p", "BaseTextureRenderer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseAssembler_1 = require("../../core/renderer/BaseAssembler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, help = _a.help, menu = _a.menu;
    var BaseTextureRenderer = function(_super) {
      __extends(BaseTextureRenderer, _super);
      function BaseTextureRenderer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._texture = null;
        _this._assembler = null;
        return _this;
      }
      Object.defineProperty(BaseTextureRenderer.prototype, "texture", {
        get: function() {
          return this._texture;
        },
        set: function(value) {
          this._texture = value;
          this._activateMaterial();
        },
        enumerable: false,
        configurable: true
      });
      BaseTextureRenderer.prototype.onEnable = function() {
        _super.prototype.onEnable.call(this);
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
      };
      BaseTextureRenderer.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
      };
      BaseTextureRenderer.prototype._resetAssembler = function() {
        this._assembler = new BaseAssembler_1.default();
        this._assembler.init(this);
        this.setVertsDirty();
      };
      BaseTextureRenderer.prototype._activateMaterial = function() {
        var materials = this._materials;
        materials[0] || (materials[0] = this._getDefaultMaterial());
        for (var i = 0; i < materials.length; i++) materials[i] = cc.MaterialVariant.create(materials[i], this);
        this._updateMaterial();
      };
      BaseTextureRenderer.prototype._updateMaterial = function() {
        var texture = this._texture;
        if (texture) {
          var material = this.getMaterial(0);
          if (material) {
            void 0 !== material.getDefine("USE_TEXTURE") && material.define("USE_TEXTURE", true);
            material.setProperty("texture", texture);
            this.markForRender(true);
            return;
          }
        }
        this.disableRender();
      };
      BaseTextureRenderer.prototype._validateRender = function() {
        this._texture || this.disableRender();
      };
      __decorate([ property() ], BaseTextureRenderer.prototype, "_texture", void 0);
      __decorate([ property({
        type: cc.Texture2D,
        tooltip: false
      }) ], BaseTextureRenderer.prototype, "texture", null);
      BaseTextureRenderer = __decorate([ ccclass, executeInEditMode, disallowMultiple, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/renderers/BaseTextureRenderer.ts"), menu("eazax/\u6e32\u67d3\u7ec4\u4ef6/BaseTextureRenderer") ], BaseTextureRenderer);
      return BaseTextureRenderer;
    }(cc.RenderComponent);
    exports.default = BaseTextureRenderer;
    cc._RF.pop();
  }, {
    "../../core/renderer/BaseAssembler": "BaseAssembler"
  } ],
  BounceMoveTween: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19e64eCR8JPnLwuwQn0STQe", "BounceMoveTween");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BounceMoveTween = function(_super) {
      __extends(BounceMoveTween, _super);
      function BounceMoveTween() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.frequency = 4;
        _this.decay = 2;
        _this.tween = null;
        return _this;
      }
      BounceMoveTween.prototype.start = function() {
        this.play(cc.v2(0, 0), .5);
      };
      BounceMoveTween.prototype.play = function(targetPos, time) {
        var _this = this;
        this.stop();
        var curPos = this.node.getPosition();
        var direction = targetPos.sub(curPos).normalize();
        var bouncingTime = .75;
        var amplitude = cc.Vec2.distance(curPos, targetPos) / time;
        this.tween = cc.tween(this.node);
        cc.tween(this.node).to(time, {
          x: targetPos.x,
          y: targetPos.y
        }, {
          easing: "quadIn"
        }).to(bouncingTime, {
          position: {
            value: cc.v3(targetPos.x, targetPos.y),
            progress: function(start, end, current, t) {
              var pos = direction.mul(-_this.getDifference(amplitude, t));
              return cc.v3(pos.x, pos.y);
            }
          }
        }).start();
      };
      BounceMoveTween.prototype.stop = function() {
        this.tween && this.tween.stop();
      };
      BounceMoveTween.prototype.getDifference = function(amplitude, time) {
        var angularVelocity = this.frequency * Math.PI * 2;
        return amplitude * (Math.sin(time * angularVelocity) / Math.exp(this.decay * time) / angularVelocity);
      };
      __decorate([ property({
        tooltip: false
      }) ], BounceMoveTween.prototype, "frequency", void 0);
      __decorate([ property({
        tooltip: false
      }) ], BounceMoveTween.prototype, "decay", void 0);
      BounceMoveTween = __decorate([ ccclass ], BounceMoveTween);
      return BounceMoveTween;
    }(cc.Component);
    exports.default = BounceMoveTween;
    cc._RF.pop();
  }, {} ],
  BounceScaleTween: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c48a1EQlO9DfJW0g1STpi3T", "BounceScaleTween");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BounceScaleTween = function(_super) {
      __extends(BounceScaleTween, _super);
      function BounceScaleTween() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.frequency = 4;
        _this.decay = 2;
        _this.targetScale = 1;
        _this.totalTime = 1;
        _this.interval = 1;
        _this.playOnLoad = false;
        _this.originalScale = 1;
        _this.tween = null;
        return _this;
      }
      BounceScaleTween.prototype.start = function() {
        this.originalScale = this.node.scale;
        this.playOnLoad && this.play(this.targetScale);
      };
      BounceScaleTween.prototype.play = function(targetScale, repeatTimes) {
        var _this = this;
        var times = void 0 != repeatTimes && repeatTimes > 0 ? repeatTimes : 1;
        var scalingTime = .25 * this.totalTime;
        var bouncingTime = .75 * this.totalTime;
        var amplitude = (targetScale - this.originalScale) / scalingTime;
        this.tween = cc.tween(this.node).repeat(times, cc.tween().set({
          scale: this.originalScale
        }).to(scalingTime, {
          scale: targetScale
        }).to(bouncingTime, {
          scale: {
            value: targetScale,
            progress: function(start, end, current, t) {
              return end + _this.getDifference(amplitude, t);
            }
          }
        }).delay(this.interval)).start();
      };
      BounceScaleTween.prototype.stop = function() {
        this.tween && this.tween.stop();
        this.node.setScale(this.originalScale);
      };
      BounceScaleTween.prototype.getDifference = function(amplitude, time) {
        var angularVelocity = this.frequency * Math.PI * 2;
        return amplitude * (Math.sin(time * angularVelocity) / Math.exp(this.decay * time) / angularVelocity);
      };
      __decorate([ property({
        tooltip: false
      }) ], BounceScaleTween.prototype, "frequency", void 0);
      __decorate([ property({
        tooltip: false
      }) ], BounceScaleTween.prototype, "decay", void 0);
      __decorate([ property({
        tooltip: false
      }) ], BounceScaleTween.prototype, "targetScale", void 0);
      __decorate([ property({
        tooltip: false
      }) ], BounceScaleTween.prototype, "totalTime", void 0);
      __decorate([ property({
        tooltip: false
      }) ], BounceScaleTween.prototype, "interval", void 0);
      __decorate([ property({
        tooltip: false
      }) ], BounceScaleTween.prototype, "playOnLoad", void 0);
      BounceScaleTween = __decorate([ ccclass ], BounceScaleTween);
      return BounceScaleTween;
    }(cc.Component);
    exports.default = BounceScaleTween;
    cc._RF.pop();
  }, {} ],
  BrowserUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99b90Y8x6RIuZWoY3b1nJuc", "BrowserUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BrowserUtil = function() {
      function BrowserUtil() {}
      BrowserUtil.clearUrlParam = function() {
        if (!window || !window.history) return;
        window.history.replaceState({}, null, ".");
      };
      BrowserUtil.setUrlParam = function(param) {
        if (!window || !window.history) return;
        Array.isArray(param) && (param = param.map(function(v) {
          return v.key + "=" + v.value;
        }).join("&"));
        window.history.replaceState({}, null, "?" + param);
      };
      BrowserUtil.getUrlParam = function(key) {
        if (!window || !window.location) return null;
        var query = window.location.search.replace("?", "");
        if ("" === query) return null;
        var substrings = query.split("&");
        for (var i = 0; i < substrings.length; i++) {
          var keyValue = substrings[i].split("=");
          if (decodeURIComponent(keyValue[0]) === key) return decodeURIComponent(keyValue[1]);
        }
        return null;
      };
      BrowserUtil.getUrlParams = function() {
        if (!window || !window.location) return [];
        var query = window.location.search.replace("?", "");
        if ("" === query) return [];
        var substrings = query.split("&"), params = [];
        for (var i = 0; i < substrings.length; i++) {
          var keyValue = substrings[i].split("=");
          params.push({
            key: keyValue[0],
            value: keyValue[1]
          });
        }
        return params;
      };
      BrowserUtil.copy = function(value) {
        if (!document) return false;
        var element = document.createElement("textarea");
        element.readOnly = true;
        element.style.opacity = "0";
        element.value = value;
        document.body.appendChild(element);
        element.select();
        var range = document.createRange();
        range.selectNodeContents(element);
        var selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        var result = document.execCommand("copy");
        element.remove();
        return result;
      };
      return BrowserUtil;
    }();
    exports.default = BrowserUtil;
    cc._RF.pop();
  }, {} ],
  CardArrayFlip_CardLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38df63Fp/9M7L5YZ2bpVvg0", "CardArrayFlip_CardLayout");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CardArrayFlip_Card_1 = require("./CardArrayFlip_Card");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var CardArrayFlip_Layout = function(_super) {
      __extends(CardArrayFlip_Layout, _super);
      function CardArrayFlip_Layout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._radius = 350;
        _this._offset = 90;
        _this._k = 0;
        _this.cards = null;
        return _this;
      }
      Object.defineProperty(CardArrayFlip_Layout.prototype, "radius", {
        get: function() {
          return this._radius;
        },
        set: function(value) {
          this._radius = value;
          this.updateLayout();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CardArrayFlip_Layout.prototype, "offset", {
        get: function() {
          return this._offset;
        },
        set: function(value) {
          this._offset = value;
          this.updateLayout();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CardArrayFlip_Layout.prototype, "k", {
        get: function() {
          return this._k;
        },
        set: function(value) {
          this._k = value;
          this.updateKValue();
        },
        enumerable: false,
        configurable: true
      });
      CardArrayFlip_Layout.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      CardArrayFlip_Layout.prototype.onDisable = function() {
        this.unregisterEvent();
      };
      CardArrayFlip_Layout.prototype.init = function() {
        this.onChildChange();
      };
      CardArrayFlip_Layout.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChange, this);
      };
      CardArrayFlip_Layout.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.off(cc.Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.off(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChange, this);
      };
      CardArrayFlip_Layout.prototype.onChildChange = function() {
        this.cards = this.getComponentsInChildren(CardArrayFlip_Card_1.default);
        this.updateKValue();
        this.updateLayout();
      };
      CardArrayFlip_Layout.prototype.onRotationChange = function() {
        this.updateHierarchy();
      };
      CardArrayFlip_Layout.prototype.updateLayout = function() {
        var nodes = this.node.children, count = nodes.length, radius = this._radius, offset = this._offset, delta = 360 / count;
        for (var i = 0; i < count; i++) {
          var node = nodes[i], angleY = -delta * i, radian = Math.PI / 180 * (angleY - offset);
          node.x = radius * Math.cos(radian);
          node.z = -radius * Math.sin(radian);
          var _a = node.eulerAngles, x = _a.x, z = _a.z;
          node.eulerAngles = cc.v3(x, angleY, z);
        }
        this.updateHierarchy();
      };
      CardArrayFlip_Layout.prototype.updateHierarchy = function() {
        var cards = this.cards, length = cards.length;
        for (var i = 0; i < length; i++) cards[i].updateWorldZ();
        cards.sort(function(a, b) {
          return a.z - b.z;
        });
        for (var i = 0; i < length; i++) cards[i].setSiblingIndex(i);
      };
      CardArrayFlip_Layout.prototype.updateKValue = function() {
        var cards = this.cards;
        for (var i = 0, l = cards.length; i < l; i++) cards[i].k = this._k;
      };
      __decorate([ property ], CardArrayFlip_Layout.prototype, "_radius", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArrayFlip_Layout.prototype, "radius", null);
      __decorate([ property ], CardArrayFlip_Layout.prototype, "_offset", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArrayFlip_Layout.prototype, "offset", null);
      __decorate([ property ], CardArrayFlip_Layout.prototype, "_k", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArrayFlip_Layout.prototype, "k", null);
      CardArrayFlip_Layout = __decorate([ ccclass, executeInEditMode ], CardArrayFlip_Layout);
      return CardArrayFlip_Layout;
    }(cc.Component);
    exports.default = CardArrayFlip_Layout;
    cc._RF.pop();
  }, {
    "./CardArrayFlip_Card": "CardArrayFlip_Card"
  } ],
  CardArrayFlip_Card: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1df38a4sq1PLIWPe7vghQ6J", "CardArrayFlip_Card");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var CardArrayFlip_Card = function(_super) {
      __extends(CardArrayFlip_Card, _super);
      function CardArrayFlip_Card() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.back = null;
        _this.front = null;
        _this.k = 0;
        _this._z = 0;
        return _this;
      }
      Object.defineProperty(CardArrayFlip_Card.prototype, "z", {
        get: function() {
          return this._z;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CardArrayFlip_Card.prototype, "facingScreen", {
        get: function() {
          return this.node.forward.z >= this.k;
        },
        enumerable: false,
        configurable: true
      });
      CardArrayFlip_Card.prototype.onEnable = function() {
        this.updateWorldZ();
      };
      CardArrayFlip_Card.prototype.update = function(dt) {
        this.updateDisplay();
      };
      CardArrayFlip_Card.prototype.updateDisplay = function() {
        var front = this.facingScreen;
        this.front.active = front;
        this.back.active = !front;
      };
      CardArrayFlip_Card.prototype.updateWorldZ = function() {
        var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        this._z = worldPos.z;
      };
      CardArrayFlip_Card.prototype.setSiblingIndex = function(index) {
        this.node.setSiblingIndex(index);
      };
      __decorate([ property(cc.Node) ], CardArrayFlip_Card.prototype, "back", void 0);
      __decorate([ property(cc.Node) ], CardArrayFlip_Card.prototype, "front", void 0);
      __decorate([ property ], CardArrayFlip_Card.prototype, "k", void 0);
      CardArrayFlip_Card = __decorate([ ccclass, executeInEditMode ], CardArrayFlip_Card);
      return CardArrayFlip_Card;
    }(cc.Component);
    exports.default = CardArrayFlip_Card;
    cc._RF.pop();
  }, {} ],
  CardArrayFlip_FrontCard2D: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f44dz14RZHTpMdYvIF/kTY", "CardArrayFlip_FrontCard2D");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CardArrayFlip_FrontCardBase_1 = require("./CardArrayFlip_FrontCardBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardArrayFlip_FrontCard2D = function(_super) {
      __extends(CardArrayFlip_FrontCard2D, _super);
      function CardArrayFlip_FrontCard2D() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CardArrayFlip_FrontCard2D.prototype.flipToFront = function() {
        var _this = this;
        return new Promise(function(res) {
          var tween = cc.tween, duration = 1, half = duration / 2;
          tween(_this.node).to(duration, {
            scale: 1.1
          }).start();
          tween(_this.main).parallel(tween().to(half, {
            scaleX: 0
          }, {
            easing: "quadIn"
          }), tween().to(half, {
            skewY: -15
          }, {
            easing: "quadOut"
          })).call(function() {
            _this.front.active = true;
            _this.back.active = false;
          }).parallel(tween().to(half, {
            scaleX: -1
          }, {
            easing: "quadOut"
          }), tween().to(half, {
            skewY: 0
          }, {
            easing: "quadIn"
          })).call(res).start();
        });
      };
      CardArrayFlip_FrontCard2D.prototype.flipToBack = function() {
        var _this = this;
        return new Promise(function(res) {
          var tween = cc.tween, duration = 1, half = duration / 2;
          tween(_this.node).to(duration, {
            scale: .8
          }).start();
          tween(_this.main).parallel(tween().to(half, {
            scaleX: 0
          }, {
            easing: "quadIn"
          }), tween().to(half, {
            skewY: 15
          }, {
            easing: "quadOut"
          })).call(function() {
            _this.front.active = false;
            _this.back.active = true;
          }).parallel(tween().to(half, {
            scaleX: 1
          }, {
            easing: "quadOut"
          }), tween().to(half, {
            skewY: 0
          }, {
            easing: "quadIn"
          })).call(res).start();
        });
      };
      CardArrayFlip_FrontCard2D = __decorate([ ccclass ], CardArrayFlip_FrontCard2D);
      return CardArrayFlip_FrontCard2D;
    }(CardArrayFlip_FrontCardBase_1.default);
    exports.default = CardArrayFlip_FrontCard2D;
    cc._RF.pop();
  }, {
    "./CardArrayFlip_FrontCardBase": "CardArrayFlip_FrontCardBase"
  } ],
  CardArrayFlip_FrontCard3D: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0882w0dqRIYJBc/e+K/GqQ", "CardArrayFlip_FrontCard3D");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CardArrayFlip_FrontCardBase_1 = require("./CardArrayFlip_FrontCardBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardArrayFlip_FrontCard3D = function(_super) {
      __extends(CardArrayFlip_FrontCard3D, _super);
      function CardArrayFlip_FrontCard3D() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CardArrayFlip_FrontCard3D.prototype.flipToFront = function() {
        var _this = this;
        return new Promise(function(res) {
          var tween = cc.tween, duration = 1, half = duration / 2;
          tween(_this.node).to(duration, {
            scale: 1.1,
            eulerAngles: cc.v3(0, 0, 0)
          }).start();
          tween(_this.main).to(half, {
            eulerAngles: cc.v3(0, -90, 0)
          }).call(function() {
            _this.front.active = true;
            _this.back.active = false;
          }).to(half, {
            eulerAngles: cc.v3(0, -180, 0)
          }).call(res).start();
        });
      };
      CardArrayFlip_FrontCard3D.prototype.flipToBack = function() {
        var _this = this;
        return new Promise(function(res) {
          var tween = cc.tween, duration = 1, half = duration / 2;
          tween(_this.node).to(duration, {
            scale: .8,
            eulerAngles: cc.v3(10, 0, 0)
          }).start();
          tween(_this.main).to(half, {
            eulerAngles: cc.v3(0, -270, 0)
          }).call(function() {
            _this.front.active = false;
            _this.back.active = true;
          }).to(half, {
            eulerAngles: cc.v3(0, 0, 0)
          }).call(res).start();
        });
      };
      CardArrayFlip_FrontCard3D = __decorate([ ccclass ], CardArrayFlip_FrontCard3D);
      return CardArrayFlip_FrontCard3D;
    }(CardArrayFlip_FrontCardBase_1.default);
    exports.default = CardArrayFlip_FrontCard3D;
    cc._RF.pop();
  }, {
    "./CardArrayFlip_FrontCardBase": "CardArrayFlip_FrontCardBase"
  } ],
  CardArrayFlip_FrontCardBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19c2cbEZllLpou3BWIOrQjG", "CardArrayFlip_FrontCardBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardArrayFlip_FrontCardBase = function(_super) {
      __extends(CardArrayFlip_FrontCardBase, _super);
      function CardArrayFlip_FrontCardBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        _this.back = null;
        _this.front = null;
        return _this;
      }
      CardArrayFlip_FrontCardBase.prototype.onLoad = function() {
        this.init();
      };
      CardArrayFlip_FrontCardBase.prototype.init = function() {
        this.hide();
        this.front.active = false;
        this.back.active = true;
      };
      CardArrayFlip_FrontCardBase.prototype.show = function() {
        this.main.active = true;
      };
      CardArrayFlip_FrontCardBase.prototype.hide = function() {
        this.main.active = false;
      };
      CardArrayFlip_FrontCardBase.prototype.flipToFront = function() {
        return null;
      };
      CardArrayFlip_FrontCardBase.prototype.flipToBack = function() {
        return null;
      };
      __decorate([ property(cc.Node) ], CardArrayFlip_FrontCardBase.prototype, "main", void 0);
      __decorate([ property(cc.Node) ], CardArrayFlip_FrontCardBase.prototype, "back", void 0);
      __decorate([ property(cc.Node) ], CardArrayFlip_FrontCardBase.prototype, "front", void 0);
      CardArrayFlip_FrontCardBase = __decorate([ ccclass ], CardArrayFlip_FrontCardBase);
      return CardArrayFlip_FrontCardBase;
    }(cc.Component);
    exports.default = CardArrayFlip_FrontCardBase;
    cc._RF.pop();
  }, {} ],
  CardArray_CardLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e892crvGPNPVpagVw35wUYQ", "CardArray_CardLayout");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CardArray_Card_1 = require("./CardArray_Card");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var CardArray_Layout = function(_super) {
      __extends(CardArray_Layout, _super);
      function CardArray_Layout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._radius = 350;
        _this._offset = 90;
        _this._k = 0;
        _this.cards = null;
        return _this;
      }
      Object.defineProperty(CardArray_Layout.prototype, "radius", {
        get: function() {
          return this._radius;
        },
        set: function(value) {
          this._radius = value;
          this.updateLayout();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CardArray_Layout.prototype, "offset", {
        get: function() {
          return this._offset;
        },
        set: function(value) {
          this._offset = value;
          this.updateLayout();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CardArray_Layout.prototype, "k", {
        get: function() {
          return this._k;
        },
        set: function(value) {
          this._k = value;
          this.updateKValue();
        },
        enumerable: false,
        configurable: true
      });
      CardArray_Layout.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      CardArray_Layout.prototype.onDisable = function() {
        this.unregisterEvent();
      };
      CardArray_Layout.prototype.init = function() {
        this.onChildChange();
      };
      CardArray_Layout.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChange, this);
      };
      CardArray_Layout.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.off(cc.Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.off(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChange, this);
      };
      CardArray_Layout.prototype.onChildChange = function() {
        this.cards = this.getComponentsInChildren(CardArray_Card_1.default);
        this.updateKValue();
        this.updateLayout();
      };
      CardArray_Layout.prototype.onRotationChange = function() {
        this.updateHierarchy();
      };
      CardArray_Layout.prototype.updateLayout = function() {
        var nodes = this.node.children, count = nodes.length, radius = this._radius, offset = this._offset, delta = 360 / count;
        for (var i = 0; i < count; i++) {
          var node = nodes[i], angleY = -delta * i, radian = Math.PI / 180 * (angleY - offset);
          node.x = radius * Math.cos(radian);
          node.z = -radius * Math.sin(radian);
          var _a = node.eulerAngles, x = _a.x, z = _a.z;
          node.eulerAngles = cc.v3(x, angleY, z);
        }
        this.updateHierarchy();
      };
      CardArray_Layout.prototype.updateHierarchy = function() {
        var cards = this.cards, length = cards.length;
        for (var i = 0; i < length; i++) cards[i].updateWorldZ();
        cards.sort(function(a, b) {
          return a.z - b.z;
        });
        for (var i = 0; i < length; i++) cards[i].setSiblingIndex(i);
      };
      CardArray_Layout.prototype.updateKValue = function() {
        var cards = this.cards;
        for (var i = 0, l = cards.length; i < l; i++) cards[i].k = this._k;
      };
      __decorate([ property ], CardArray_Layout.prototype, "_radius", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArray_Layout.prototype, "radius", null);
      __decorate([ property ], CardArray_Layout.prototype, "_offset", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArray_Layout.prototype, "offset", null);
      __decorate([ property ], CardArray_Layout.prototype, "_k", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArray_Layout.prototype, "k", null);
      CardArray_Layout = __decorate([ ccclass, executeInEditMode ], CardArray_Layout);
      return CardArray_Layout;
    }(cc.Component);
    exports.default = CardArray_Layout;
    cc._RF.pop();
  }, {
    "./CardArray_Card": "CardArray_Card"
  } ],
  CardArray_Card: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5379aMMo9ZMZosfEounqnQe", "CardArray_Card");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var CardArray_Card = function(_super) {
      __extends(CardArray_Card, _super);
      function CardArray_Card() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.back = null;
        _this.front = null;
        _this.k = 0;
        _this._z = 0;
        return _this;
      }
      Object.defineProperty(CardArray_Card.prototype, "z", {
        get: function() {
          return this._z;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CardArray_Card.prototype, "facingScreen", {
        get: function() {
          return this.node.forward.z >= this.k;
        },
        enumerable: false,
        configurable: true
      });
      CardArray_Card.prototype.onEnable = function() {
        this.updateWorldZ();
      };
      CardArray_Card.prototype.update = function(dt) {
        this.updateDisplay();
      };
      CardArray_Card.prototype.updateDisplay = function() {
        var front = this.facingScreen;
        this.front.active = front;
        this.back.active = !front;
      };
      CardArray_Card.prototype.updateWorldZ = function() {
        var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        this._z = worldPos.z;
      };
      CardArray_Card.prototype.setSiblingIndex = function(index) {
        this.node.setSiblingIndex(index);
      };
      __decorate([ property(cc.Node) ], CardArray_Card.prototype, "back", void 0);
      __decorate([ property(cc.Node) ], CardArray_Card.prototype, "front", void 0);
      __decorate([ property ], CardArray_Card.prototype, "k", void 0);
      CardArray_Card = __decorate([ ccclass, executeInEditMode ], CardArray_Card);
      return CardArray_Card;
    }(cc.Component);
    exports.default = CardArray_Card;
    cc._RF.pop();
  }, {} ],
  CaseList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfeb0zMzGxBCISE4TDJIs4C", "CaseList");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CaseInfoMap = void 0;
    exports.CaseInfoMap = {
      postProcessing: {
        name: "\u540e\u671f\u5904\u7406",
        scene: "postProcessing"
      },
      radialBlur: {
        name: "\u5f84\u5411\u6a21\u7cca",
        scene: "radialBlur"
      },
      multipassKawaseBlur: {
        name: "Kawase \u6a21\u7cca\uff08\u591a Pass\uff09",
        scene: "multipassKawaseBlur"
      },
      gaussianBlur: {
        name: "\u9ad8\u65af\u6a21\u7cca\uff08\u8bd5\u9a8c\uff09",
        scene: "gaussianBlur"
      },
      avatar: {
        name: "\u5934\u50cf",
        scene: "avatar"
      },
      pixelClick: {
        name: "\u50cf\u7d20\u70b9\u51fb",
        scene: "pixelClick"
      },
      runtimeTrimming: {
        name: "\u8fd0\u884c\u65f6\u56fe\u50cf\u526a\u88c1",
        scene: "runtimeTrimming"
      },
      colorBrush: {
        name: "\u5f69\u8272\u753b\u7b14",
        scene: "colorBrush"
      },
      gradientColor: {
        name: "\u6e10\u53d8\u8272",
        scene: "gradientColor"
      },
      newUserGuide: {
        name: "\u65b0\u624b\u5f15\u5bfc",
        scene: "newUserGuide"
      },
      radarChart: {
        name: "\u96f7\u8fbe\u56fe",
        scene: "radarChart"
      },
      sineWave: {
        name: "\u6b63\u5f26\u6ce2\u6d6a",
        scene: "sineWave"
      },
      arcProgressBar: {
        name: "\u5f27\u5f62\u8fdb\u5ea6\u6761",
        scene: "arcProgressBar"
      },
      remoteTexture: {
        name: "\u8fdc\u7a0b\u56fe\u50cf",
        scene: "remoteTexture"
      },
      remoteSpine: {
        name: "\u8fdc\u7a0b\u9aa8\u9abc",
        scene: "remoteSpine"
      },
      frameLoading: {
        name: "\u5206\u5e27\u52a0\u8f7d",
        scene: "frameLoading"
      },
      collisionQuadTree: {
        name: "\u78b0\u649e\u68c0\u6d4b\uff08\u56db\u53c9\u6811\uff09",
        scene: "collisionQuadTree"
      },
      rotateAround: {
        name: "\u56f4\u7ed5\u65cb\u8f6c",
        scene: "rotateAround"
      },
      cardArray: {
        name: "\u5361\u7247\u9635\u5217",
        scene: "cardArray"
      },
      cardFlip: {
        name: "\u5361\u7247\u7ffb\u8f6c",
        scene: "cardFlip"
      },
      cardArrayFlip: {
        name: "\u5361\u7247\u9635\u5217 & \u7ffb\u8f6c",
        scene: "cardArrayFlip"
      },
      dragging: {
        name: "\u62d6\u62fd\u793a\u4f8b",
        scene: "dragging"
      },
      popupTesting: {
        name: "\u5f39\u7a97\u6d4b\u8bd5",
        scene: "popupTesting"
      }
    };
    cc._RF.pop();
  }, {} ],
  CaseLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8df3gmqWVLB5fezMRCypC0", "CaseLoading");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var CaseLoading = function(_super) {
      __extends(CaseLoading, _super);
      function CaseLoading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        return _this;
      }
      CaseLoading_1 = CaseLoading;
      CaseLoading.prototype.onLoad = function() {
        this.init();
      };
      CaseLoading.prototype.onDestroy = function() {
        this.release();
      };
      CaseLoading.prototype.init = function() {
        CaseLoading_1.instance = this;
        this.reset();
      };
      CaseLoading.prototype.release = function() {
        CaseLoading_1.instance === this && (CaseLoading_1.instance = null);
      };
      CaseLoading.prototype.reset = function() {
        this.main.active = false;
      };
      CaseLoading.prototype.show = function() {
        var node = this.main;
        node.opacity = 0;
        node.active = true;
        cc.tween(node).to(.2, {
          opacity: 255
        }).start();
      };
      CaseLoading.prototype.hide = function() {
        var node = this.main;
        cc.tween(node).to(.05, {
          opacity: 0
        }).set({
          active: false
        }).start();
      };
      CaseLoading.show = function() {
        if (!this.instance) return;
        this.instance.show();
      };
      CaseLoading.hide = function() {
        if (!this.instance) return;
        this.instance.hide();
      };
      var CaseLoading_1;
      CaseLoading.instance = null;
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], CaseLoading.prototype, "main", void 0);
      CaseLoading = CaseLoading_1 = __decorate([ ccclass ], CaseLoading);
      return CaseLoading;
    }(cc.Component);
    exports.default = CaseLoading;
    cc._RF.pop();
  }, {} ],
  CaseManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "354b8dKhslAHKRdEtOdQhfg", "CaseManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager_1 = require("../../eazax-ccc/core/EventManager");
    var SceneNavigator_1 = require("../../eazax-ccc/core/SceneNavigator");
    var BrowserUtil_1 = require("../../eazax-ccc/utils/BrowserUtil");
    var CaseList_1 = require("./CaseList");
    var CaseLoading_1 = require("./components/global/CaseLoading");
    var Toast_1 = require("./components/global/Toast");
    var Constants_1 = require("./constants/Constants");
    var CustomEvents_1 = require("./constants/CustomEvents");
    var CaseManager = function() {
      function CaseManager() {}
      CaseManager.goHome = function() {
        eazax.log("[Go Home]", "^.^");
        BrowserUtil_1.default.clearUrlParam();
        SceneNavigator_1.default.goHome(null, false, function() {
          EventManager_1.default.emit(CustomEvents_1.SWITCH_CASE, Constants_1.SceneName.Home);
        });
      };
      CaseManager.goCase = function(caseName) {
        eazax.log("[Go Case]", caseName);
        CaseLoading_1.default.show();
        var info = this.getCaseInfo(caseName);
        if (!info) {
          Toast_1.default.show("\u554a\u54e6\uff0c\u6ca1\u6709\u627e\u5230\u8fd9\u4e2a\u793a\u4f8b", caseName);
          CaseLoading_1.default.hide();
          return false;
        }
        var sceneName = info.scene;
        SceneNavigator_1.default.go(sceneName, null, function() {
          BrowserUtil_1.default.setUrlParam("case=" + caseName);
          EventManager_1.default.emit(CustomEvents_1.SWITCH_CASE, sceneName);
          CaseLoading_1.default.hide();
        });
        return true;
      };
      CaseManager.hasCase = function(caseName) {
        return !!this.getCaseInfo(caseName);
      };
      CaseManager.getCaseInfo = function(caseName) {
        return CaseList_1.CaseInfoMap[caseName];
      };
      return CaseManager;
    }();
    exports.default = CaseManager;
    cc._RF.pop();
  }, {
    "../../eazax-ccc/core/EventManager": "EventManager",
    "../../eazax-ccc/core/SceneNavigator": "SceneNavigator",
    "../../eazax-ccc/utils/BrowserUtil": "BrowserUtil",
    "./CaseList": "CaseList",
    "./components/global/CaseLoading": "CaseLoading",
    "./components/global/Toast": "Toast",
    "./constants/Constants": "Constants",
    "./constants/CustomEvents": "CustomEvents"
  } ],
  CaseSettings: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01dcdWgNLxNz6ZURQJg9lu+", "CaseSettings");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClickToShowResPopup_1 = require("./ClickToShowResPopup");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, executeInEditMode = _a.executeInEditMode;
    var CaseSettings = function(_super) {
      __extends(CaseSettings, _super);
      function CaseSettings() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._title = "\u793a\u4f8b";
        _this._resources = [];
        _this.enablePhysics = false;
        _this.enablePhysicsDebugDraw = true;
        return _this;
      }
      Object.defineProperty(CaseSettings.prototype, "title", {
        get: function() {
          return this._title;
        },
        set: function(value) {
          this._title = value;
          this.setTitle(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(CaseSettings.prototype, "resources", {
        get: function() {
          return this._resources;
        },
        set: function(value) {
          this._resources = value;
          this.setResources(value);
        },
        enumerable: false,
        configurable: true
      });
      CaseSettings.prototype.onLoad = function() {
        this.setPhysics(this.enablePhysics);
      };
      CaseSettings.prototype.setPhysics = function(enable) {
        cc.director.getPhysicsManager().enabled = enable;
        enable && (this.enablePhysicsDebugDraw ? cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit : cc.director.getPhysicsManager().debugDrawFlags = 0);
      };
      CaseSettings.prototype.setTitle = function(value) {
        var node = cc.find("Canvas/Main/UI/title/label") || cc.find("Canvas/Main/UI/Title/label"), label = null === node || void 0 === node ? void 0 : node.getComponent(cc.Label);
        label && (label.string = value);
      };
      CaseSettings.prototype.setResources = function(value) {
        var node = cc.find("Canvas/Main/UI/title") || cc.find("Canvas/Main/UI/Title"), component = null === node || void 0 === node ? void 0 : node.getComponent(ClickToShowResPopup_1.default);
        if (component) {
          var list = component.resources = [];
          for (var i = 0; i < value.length; i++) {
            list[i] = new ClickToShowResPopup_1.ResourceInfo();
            list[i].title = value[i].title;
            list[i].url = value[i].url;
          }
        }
      };
      __decorate([ property() ], CaseSettings.prototype, "_title", void 0);
      __decorate([ property({
        displayName: false
      }) ], CaseSettings.prototype, "title", null);
      __decorate([ property() ], CaseSettings.prototype, "_resources", void 0);
      __decorate([ property({
        type: [ ClickToShowResPopup_1.ResourceInfo ],
        displayName: false
      }) ], CaseSettings.prototype, "resources", null);
      __decorate([ property({
        displayName: false
      }) ], CaseSettings.prototype, "enablePhysics", void 0);
      __decorate([ property({
        visible: function() {
          return this.enablePhysics;
        },
        displayName: false
      }) ], CaseSettings.prototype, "enablePhysicsDebugDraw", void 0);
      CaseSettings = __decorate([ ccclass, executionOrder(-1), executeInEditMode() ], CaseSettings);
      return CaseSettings;
    }(cc.Component);
    exports.default = CaseSettings;
    cc._RF.pop();
  }, {
    "./ClickToShowResPopup": "ClickToShowResPopup"
  } ],
  Case_ArcProgressBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d580e1zHGBG/LvB8jB1+Ch7", "Case_ArcProgressBar");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ArcProgressBar_1 = require("../../../eazax-ccc/components/charts/ArcProgressBar");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_ArcProgressBar = function(_super) {
      __extends(Case_ArcProgressBar, _super);
      function Case_ArcProgressBar() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressBar1 = null;
        _this.progressBar2 = null;
        _this.progressBar3 = null;
        _this.progressBar4 = null;
        _this.progressBar5 = null;
        return _this;
      }
      Case_ArcProgressBar.prototype.onLoad = function() {
        this.play(this.progressBar1);
        this.play(this.progressBar2);
        this.play(this.progressBar3);
        this.play(this.progressBar4);
        this.play(this.progressBar5);
      };
      Case_ArcProgressBar.prototype.play = function(progressBar) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              !1;
              progressBar.progress = 0;
              return [ 4, progressBar.to(2.5, 1) ];

             case 1:
              _a.sent();
              return [ 3, 0 ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(ArcProgressBar_1.default) ], Case_ArcProgressBar.prototype, "progressBar1", void 0);
      __decorate([ property(ArcProgressBar_1.default) ], Case_ArcProgressBar.prototype, "progressBar2", void 0);
      __decorate([ property(ArcProgressBar_1.default) ], Case_ArcProgressBar.prototype, "progressBar3", void 0);
      __decorate([ property(ArcProgressBar_1.default) ], Case_ArcProgressBar.prototype, "progressBar4", void 0);
      __decorate([ property(ArcProgressBar_1.default) ], Case_ArcProgressBar.prototype, "progressBar5", void 0);
      Case_ArcProgressBar = __decorate([ ccclass ], Case_ArcProgressBar);
      return Case_ArcProgressBar;
    }(cc.Component);
    exports.default = Case_ArcProgressBar;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/charts/ArcProgressBar": "ArcProgressBar"
  } ],
  Case_CardArrayFlip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afb23B4XMJC+5DoKNtwVyh1", "Case_CardArrayFlip");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PromiseUtil_1 = require("../../../eazax-ccc/utils/PromiseUtil");
    var CardArrayFlip_FrontCardBase_1 = require("./CardArrayFlip_FrontCardBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_CardArrayFlip = function(_super) {
      __extends(Case_CardArrayFlip, _super);
      function Case_CardArrayFlip() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.cardNode = null;
        _this.card = null;
        return _this;
      }
      Object.defineProperty(Case_CardArrayFlip.prototype, "frontArrayCard", {
        get: function() {
          return this.container.children[this.container.childrenCount - 1];
        },
        enumerable: false,
        configurable: true
      });
      Case_CardArrayFlip.prototype.onLoad = function() {
        this.init();
      };
      Case_CardArrayFlip.prototype.init = function() {
        this.card = this.cardNode.getComponent(CardArrayFlip_FrontCardBase_1.default);
        this.play();
      };
      Case_CardArrayFlip.prototype.play = function() {
        return __awaiter(this, void 0, void 0, function() {
          var frontCard;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              frontCard = this.card;
              return [ 4, this.rotate(2) ];

             case 1:
              _a.sent();
              return [ 4, PromiseUtil_1.default.sleep(.2) ];

             case 2:
              _a.sent();
              frontCard.show();
              this.frontArrayCard.active = false;
              return [ 4, frontCard.flipToFront() ];

             case 3:
              _a.sent();
              return [ 4, PromiseUtil_1.default.sleep(2) ];

             case 4:
              _a.sent();
              return [ 4, frontCard.flipToBack() ];

             case 5:
              _a.sent();
              this.frontArrayCard.active = true;
              frontCard.hide();
              return [ 4, PromiseUtil_1.default.sleep(.2) ];

             case 6:
              _a.sent();
              this.play();
              return [ 2 ];
            }
          });
        });
      };
      Case_CardArrayFlip.prototype.rotate = function(round) {
        var _this = this;
        return new Promise(function(res) {
          var node = _this.container, time = 1 * round, _a = _this.node.eulerAngles, x = _a.x, z = _a.z, eulerAngles = cc.v3(x, 360 * round, z);
          cc.tween(node).by(time, {
            eulerAngles: eulerAngles
          }, {
            easing: "quadOut"
          }).call(res).start();
        });
      };
      __decorate([ property(cc.Node) ], Case_CardArrayFlip.prototype, "container", void 0);
      __decorate([ property(cc.Node) ], Case_CardArrayFlip.prototype, "cardNode", void 0);
      Case_CardArrayFlip = __decorate([ ccclass ], Case_CardArrayFlip);
      return Case_CardArrayFlip;
    }(cc.Component);
    exports.default = Case_CardArrayFlip;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/PromiseUtil": "PromiseUtil",
    "./CardArrayFlip_FrontCardBase": "CardArrayFlip_FrontCardBase"
  } ],
  Case_CardArray: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b03eeW/0L9M85qS0tEmzZyL", "Case_CardArray");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_CardArray = function(_super) {
      __extends(Case_CardArray, _super);
      function Case_CardArray() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        return _this;
      }
      Case_CardArray.prototype.start = function() {
        this.rotateForever();
      };
      Case_CardArray.prototype.rotateForever = function() {
        var node = this.container, _a = this.node.eulerAngles, x = _a.x, z = _a.z;
        cc.tween(node).by(2, {
          eulerAngles: cc.v3(x, 90, z)
        }).repeatForever().start();
      };
      __decorate([ property(cc.Node) ], Case_CardArray.prototype, "container", void 0);
      Case_CardArray = __decorate([ ccclass ], Case_CardArray);
      return Case_CardArray;
    }(cc.Component);
    exports.default = Case_CardArray;
    cc._RF.pop();
  }, {} ],
  Case_CardFlip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3cf8arMOblOeL4UxCUU8QcT", "Case_CardFlip");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TweenUtil_1 = require("../../../eazax-ccc/utils/TweenUtil");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_CardFlip = function(_super) {
      __extends(Case_CardFlip, _super);
      function Case_CardFlip() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.card = null;
        _this.flipBtn = null;
        _this.button = null;
        _this.frontColor = cc.Color.WHITE;
        _this.backColor = cc.Color.GRAY;
        return _this;
      }
      Case_CardFlip.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Case_CardFlip.prototype.start = function() {
        this.reset();
      };
      Case_CardFlip.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Case_CardFlip.prototype.registerEvent = function() {
        this.flipBtn.on(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
      };
      Case_CardFlip.prototype.unregisterEvent = function() {
        this.flipBtn.off(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
      };
      Case_CardFlip.prototype.init = function() {
        this.button = this.flipBtn.getComponent(cc.Button) || this.flipBtn.addComponent(cc.Button);
      };
      Case_CardFlip.prototype.reset = function() {
        this.card.color = this.frontColor;
        this.setButtonState(true);
      };
      Case_CardFlip.prototype.onFlipBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this.button.interactable) return [ 2 ];
              this.setButtonState(false);
              return [ 4, TweenUtil_1.default.flip(this.card, 2, function() {
                _this.card.color.equals(_this.frontColor) ? _this.card.color = _this.backColor : _this.card.color = _this.frontColor;
              }) ];

             case 1:
              _a.sent();
              this.setButtonState(true);
              return [ 2 ];
            }
          });
        });
      };
      Case_CardFlip.prototype.setButtonState = function(interactable) {
        this.button.interactable = interactable;
        this.flipBtn.color = interactable ? cc.Color.WHITE : cc.Color.GRAY;
      };
      __decorate([ property({
        displayName: false,
        type: cc.Node
      }) ], Case_CardFlip.prototype, "card", void 0);
      __decorate([ property({
        displayName: false,
        type: cc.Node
      }) ], Case_CardFlip.prototype, "flipBtn", void 0);
      Case_CardFlip = __decorate([ ccclass ], Case_CardFlip);
      return Case_CardFlip;
    }(cc.Component);
    exports.default = Case_CardFlip;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/TweenUtil": "TweenUtil"
  } ],
  Case_CollisionQuadTree_Container: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6508fYmCxVADKbrljbihBWr", "Case_CollisionQuadTree_Container");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Case_CollisionQuadTree_Item_1 = require("./Case_CollisionQuadTree_Item");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_CollisionQuadTree_Container = function(_super) {
      __extends(Case_CollisionQuadTree_Container, _super);
      function Case_CollisionQuadTree_Container() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        return _this;
      }
      Object.defineProperty(Case_CollisionQuadTree_Container.prototype, "rect", {
        get: function() {
          return this.node.getBoundingBoxToWorld();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Case_CollisionQuadTree_Container.prototype, "items", {
        get: function() {
          return this.node.getComponentsInChildren(Case_CollisionQuadTree_Item_1.default);
        },
        enumerable: false,
        configurable: true
      });
      Case_CollisionQuadTree_Container.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_CollisionQuadTree_Container.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Case_CollisionQuadTree_Container.prototype.onClick = function(event) {
        var posInWorld = event.getLocation(), posInNode = this.node.convertToNodeSpaceAR(posInWorld);
        this.addItem(posInNode);
      };
      Case_CollisionQuadTree_Container.prototype.addItem = function(pos) {
        var node = cc.instantiate(this.itemPrefab);
        node.setParent(this.node);
        if (!pos) {
          var node_1 = this.node, x = node_1.width * Math.random() - node_1.width / 2, y = node_1.height * Math.random() - node_1.height / 2;
          pos = cc.v2(x, y);
        }
        node.setPosition(pos);
      };
      Case_CollisionQuadTree_Container.prototype.clearItems = function() {
        this.node.removeAllChildren(true);
      };
      __decorate([ property({
        type: cc.Prefab,
        tooltip: false
      }) ], Case_CollisionQuadTree_Container.prototype, "itemPrefab", void 0);
      Case_CollisionQuadTree_Container = __decorate([ ccclass ], Case_CollisionQuadTree_Container);
      return Case_CollisionQuadTree_Container;
    }(cc.Component);
    exports.default = Case_CollisionQuadTree_Container;
    cc._RF.pop();
  }, {
    "./Case_CollisionQuadTree_Item": "Case_CollisionQuadTree_Item"
  } ],
  Case_CollisionQuadTree_DraggableItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2d44w62rtNeKi12myYnYBX", "Case_CollisionQuadTree_DraggableItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Case_CollisionQuadTree_Item_1 = require("./Case_CollisionQuadTree_Item");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_CollisionQuadTree_DraggableItem = function(_super) {
      __extends(Case_CollisionQuadTree_DraggableItem, _super);
      function Case_CollisionQuadTree_DraggableItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dragOffset = null;
        return _this;
      }
      Case_CollisionQuadTree_DraggableItem.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_CollisionQuadTree_DraggableItem.prototype.lateUpdate = function() {};
      Case_CollisionQuadTree_DraggableItem.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      Case_CollisionQuadTree_DraggableItem.prototype.onTouchStart = function(event) {
        var posInNode = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = posInNode.sub(this.node.getPosition());
      };
      Case_CollisionQuadTree_DraggableItem.prototype.onTouchMove = function(event) {
        if (!this.dragOffset) return;
        var posInWorld = event.getLocation(), posInNode = this.node.getParent().convertToNodeSpaceAR(posInWorld);
        this.node.setPosition(posInNode.sub(this.dragOffset));
      };
      Case_CollisionQuadTree_DraggableItem.prototype.onTouchCancel = function(event) {
        this.onTouchEnd(event);
      };
      Case_CollisionQuadTree_DraggableItem.prototype.onTouchEnd = function(event) {
        if (!this.dragOffset) return;
        this.dragOffset = null;
      };
      Case_CollisionQuadTree_DraggableItem = __decorate([ ccclass ], Case_CollisionQuadTree_DraggableItem);
      return Case_CollisionQuadTree_DraggableItem;
    }(Case_CollisionQuadTree_Item_1.default);
    exports.default = Case_CollisionQuadTree_DraggableItem;
    cc._RF.pop();
  }, {
    "./Case_CollisionQuadTree_Item": "Case_CollisionQuadTree_Item"
  } ],
  Case_CollisionQuadTree_Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3bf33OIIT9BBrWoyBKNjeJD", "Case_CollisionQuadTree_Item");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ItemStatus = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var ItemStatus;
    (function(ItemStatus) {
      ItemStatus[ItemStatus["NONE"] = 1] = "NONE";
      ItemStatus[ItemStatus["CANDIDATE"] = 2] = "CANDIDATE";
      ItemStatus[ItemStatus["COLLISION"] = 3] = "COLLISION";
    })(ItemStatus = exports.ItemStatus || (exports.ItemStatus = {}));
    var Case_CollisionQuadTree_Item = function(_super) {
      __extends(Case_CollisionQuadTree_Item, _super);
      function Case_CollisionQuadTree_Item() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.clickToDestroy = true;
        _this.lastStatus = ItemStatus.NONE;
        _this.curStatus = ItemStatus.NONE;
        return _this;
      }
      Object.defineProperty(Case_CollisionQuadTree_Item.prototype, "rect", {
        get: function() {
          return this.node.getBoundingBoxToWorld();
        },
        enumerable: false,
        configurable: true
      });
      Case_CollisionQuadTree_Item.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Case_CollisionQuadTree_Item.prototype.lateUpdate = function() {
        if (this.curStatus !== this.lastStatus) switch (this.curStatus) {
         case ItemStatus.NONE:
          this.node.color = cc.Color.BLACK;
          break;

         case ItemStatus.CANDIDATE:
          this.node.color = cc.Color.GREEN;
          break;

         case ItemStatus.COLLISION:
          this.node.color = cc.Color.RED;
        }
      };
      Case_CollisionQuadTree_Item.prototype.init = function() {
        this.curStatus = this.lastStatus = ItemStatus.NONE;
        this.node.width = 15;
        this.node.height = 15;
      };
      Case_CollisionQuadTree_Item.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Case_CollisionQuadTree_Item.prototype.onClick = function(event) {
        event.stopPropagation();
        this.clickToDestroy && this.node.destroy();
      };
      Case_CollisionQuadTree_Item.prototype.updateStatus = function(newStatus) {
        this.lastStatus = this.curStatus;
        this.curStatus = newStatus;
      };
      Case_CollisionQuadTree_Item.prototype.onCollisionBegin = function(other, self) {};
      Case_CollisionQuadTree_Item.prototype.onCollisionEnd = function(other, self) {};
      Case_CollisionQuadTree_Item = __decorate([ ccclass, executeInEditMode ], Case_CollisionQuadTree_Item);
      return Case_CollisionQuadTree_Item;
    }(cc.Component);
    exports.default = Case_CollisionQuadTree_Item;
    cc._RF.pop();
  }, {} ],
  Case_CollisionQuadTree: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d79f9YTTiJOGrj26qRioydH", "Case_CollisionQuadTree");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Quadtree = require("../lib/quadtree");
    var Case_CollisionQuadTree_Container_1 = require("./components/Case_CollisionQuadTree_Container");
    var Case_CollisionQuadTree_Item_1 = require("./components/Case_CollisionQuadTree_Item");
    var Case_CollisionQuadTree_DraggableItem_1 = require("./components/Case_CollisionQuadTree_DraggableItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var Case_CollisionQuadTree = function(_super) {
      __extends(Case_CollisionQuadTree, _super);
      function Case_CollisionQuadTree() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.graphics = null;
        _this.dragItem = null;
        _this.addBtnNode = null;
        _this.addBtn2Node = null;
        _this.clearBtnNode = null;
        _this.quadTree = null;
        return _this;
      }
      Case_CollisionQuadTree.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Case_CollisionQuadTree.prototype.start = function() {
        this.initQuadTree();
      };
      Case_CollisionQuadTree.prototype.onDestroy = function() {
        this.unregisterEvent();
        this.release();
      };
      Case_CollisionQuadTree.prototype.update = function() {
        this.doCollision();
      };
      Case_CollisionQuadTree.prototype.initQuadTree = function() {
        var rect = this.container.rect;
        this.quadTree = new Quadtree({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        });
      };
      Case_CollisionQuadTree.prototype.updateQuadTree = function() {
        var quadTree = this.quadTree;
        quadTree.clear();
        var items = this.container.items;
        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i];
          item.updateStatus(Case_CollisionQuadTree_Item_1.ItemStatus.NONE);
          var rect = item.rect, info = {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            item: item
          };
          quadTree.insert(info);
        }
      };
      Case_CollisionQuadTree.prototype.drawQuadTreeNodes = function() {
        var graphics = this.graphics;
        graphics.clear();
        graphics.strokeColor = cc.color(255, 0, 0, 150);
        function creatPath(tree) {
          var subTrees = tree.nodes;
          if (0 === subTrees.length) {
            var rect = tree.bounds;
            graphics.rect(rect.x, rect.y, rect.width, rect.height);
          } else for (var i = 0; i < subTrees.length; i++) creatPath(subTrees[i]);
        }
        creatPath(this.quadTree);
        graphics.stroke();
      };
      Case_CollisionQuadTree.prototype.doCollision = function() {
        this.updateQuadTree();
        this.drawQuadTreeNodes();
        var rect = this.dragItem.rect, info = {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }, candidates = this.quadTree.retrieve(info);
        for (var i = 0, l = candidates.length; i < l; i++) {
          var item = candidates[i].item;
          rect.intersects(item.rect) ? item.updateStatus(Case_CollisionQuadTree_Item_1.ItemStatus.COLLISION) : item.updateStatus(Case_CollisionQuadTree_Item_1.ItemStatus.CANDIDATE);
        }
      };
      Case_CollisionQuadTree.prototype.registerEvent = function() {
        cc.Canvas.instance.node.on(cc.Node.EventType.SIZE_CHANGED, this.onGraphicsNodeChange, this);
        this.container.node.on(cc.Node.EventType.POSITION_CHANGED, this.onGraphicsNodeChange, this);
        this.container.node.on(cc.Node.EventType.SIZE_CHANGED, this.onGraphicsNodeChange, this);
        this.addBtnNode.on(cc.Node.EventType.TOUCH_END, this.onAddBtnClick, this);
        this.addBtn2Node.on(cc.Node.EventType.TOUCH_END, this.onAddBtn2Click, this);
        this.clearBtnNode.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
      };
      Case_CollisionQuadTree.prototype.unregisterEvent = function() {
        cc.Canvas.instance.node.off(cc.Node.EventType.SIZE_CHANGED, this.onGraphicsNodeChange, this);
      };
      Case_CollisionQuadTree.prototype.onGraphicsNodeChange = function() {
        this.graphics.getComponent(cc.Widget).updateAlignment();
        this.initQuadTree();
      };
      Case_CollisionQuadTree.prototype.init = function() {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      };
      Case_CollisionQuadTree.prototype.release = function() {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      };
      Case_CollisionQuadTree.prototype.onAddBtnClick = function() {
        this.container.addItem();
      };
      Case_CollisionQuadTree.prototype.onAddBtn2Click = function() {
        var count = 10;
        while (count--) this.container.addItem();
      };
      Case_CollisionQuadTree.prototype.onClearBtnClick = function() {
        this.container.clearItems();
      };
      __decorate([ property({
        type: Case_CollisionQuadTree_Container_1.default,
        tooltip: false
      }) ], Case_CollisionQuadTree.prototype, "container", void 0);
      __decorate([ property({
        type: cc.Graphics,
        tooltip: false
      }) ], Case_CollisionQuadTree.prototype, "graphics", void 0);
      __decorate([ property({
        type: Case_CollisionQuadTree_DraggableItem_1.default,
        tooltip: false
      }) ], Case_CollisionQuadTree.prototype, "dragItem", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], Case_CollisionQuadTree.prototype, "addBtnNode", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], Case_CollisionQuadTree.prototype, "addBtn2Node", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], Case_CollisionQuadTree.prototype, "clearBtnNode", void 0);
      Case_CollisionQuadTree = __decorate([ ccclass, executeInEditMode ], Case_CollisionQuadTree);
      return Case_CollisionQuadTree;
    }(cc.Component);
    exports.default = Case_CollisionQuadTree;
    cc._RF.pop();
  }, {
    "../lib/quadtree": "quadtree",
    "./components/Case_CollisionQuadTree_Container": "Case_CollisionQuadTree_Container",
    "./components/Case_CollisionQuadTree_DraggableItem": "Case_CollisionQuadTree_DraggableItem",
    "./components/Case_CollisionQuadTree_Item": "Case_CollisionQuadTree_Item"
  } ],
  Case_DraggingContent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "610d6eKtkRHw67YTEQwtX/o", "Case_DraggingContent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Case_Dragging_Container_1 = require("./components/Case_Dragging_Container");
    var Case_Dragging_Item_1 = require("./components/Case_Dragging_Item");
    var PromiseUtil_1 = require("../../../eazax-ccc/utils/PromiseUtil");
    var Case_Dragging_GroupContainer_1 = require("./components/Case_Dragging_GroupContainer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_DraggingContent = function(_super) {
      __extends(Case_DraggingContent, _super);
      function Case_DraggingContent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.groupContainer = null;
        _this.itemSpriteFrame = null;
        return _this;
      }
      Case_DraggingContent.prototype.generateStaticItems = function(number) {
        return __awaiter(this, void 0, void 0, function() {
          var container, itemSize, i, node, sprite, item;
          return __generator(this, function(_a) {
            container = this.container, itemSize = this.container.itemSize;
            container.clear();
            for (i = 0; i < number; i++) {
              node = new cc.Node(), sprite = node.addComponent(cc.Sprite), item = node.addComponent(Case_Dragging_Item_1.default);
              node.name = "Static Item";
              node.setContentSize(itemSize);
              node.setScale(1);
              node.opacity = 0;
              node.active = true;
              sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
              sprite.trim = false;
              sprite.spriteFrame = this.itemSpriteFrame;
              item.group = null;
              container.addStaticItem(item);
            }
            container.enableLayout(true);
            return [ 2, true ];
          });
        });
      };
      Case_DraggingContent.prototype.showStaticItems = function() {
        return __awaiter(this, void 0, void 0, function() {
          var nodes, i, l, node;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              nodes = this.container.contentNode.children;
              i = 0, l = nodes.length;
              _a.label = 1;

             case 1:
              if (!(i < l)) return [ 3, 4 ];
              node = nodes[i];
              if ("Static Item" !== node.name) return [ 3, 4 ];
              cc.tween(node).to(.5, {
                opacity: 255
              }, {
                easing: "cubicOut"
              }).start();
              if (!(i !== l - 1)) return [ 3, 3 ];
              return [ 4, PromiseUtil_1.default.sleep(.05) ];

             case 2:
              _a.sent();
              _a.label = 3;

             case 3:
              i++;
              return [ 3, 1 ];

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      Case_DraggingContent.prototype.generateOptionItems = function(numbers) {
        return __awaiter(this, void 0, void 0, function() {
          var groupContainer, groups, itemSize, i, group, number, color, j, node, sprite, item;
          return __generator(this, function(_a) {
            groupContainer = this.groupContainer, groups = groupContainer.groups, itemSize = this.container.itemSize;
            for (i = 0; i < groups.length; i++) {
              group = groups[i], number = numbers[i];
              group.clear();
              if (void 0 != number) {
                group.node.active = true;
                color = void 0;
                switch (i) {
                 case 0:
                  color = cc.Color.RED;
                  break;

                 case 1:
                  color = cc.Color.GREEN;
                  break;

                 case 2:
                  color = cc.Color.BLUE;
                }
                for (j = 0; j < number; j++) {
                  node = new cc.Node(), sprite = node.addComponent(cc.Sprite), item = node.addComponent(Case_Dragging_Item_1.default);
                  node.name = "Option Item";
                  node.setContentSize(itemSize);
                  node.setScale(.8);
                  node.color = color.clone();
                  node.active = true;
                  sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                  sprite.trim = false;
                  sprite.spriteFrame = this.itemSpriteFrame;
                  group.addOptionItem(item);
                  node.y = -200;
                }
                group.forceUpdateLayout();
                group.node.width = group.layout.node.width;
              } else group.node.active = false;
            }
            groupContainer.forceUpdateLayout();
            groupContainer.enableLayout(false);
            return [ 2 ];
          });
        });
      };
      Case_DraggingContent.prototype.showOptionItems = function() {
        return __awaiter(this, void 0, void 0, function() {
          var groups, i, group, items, j, item;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              groups = this.groupContainer.groups;
              i = 0;
              _a.label = 1;

             case 1:
              if (!(i < groups.length)) return [ 3, 6 ];
              group = groups[i], items = group.items;
              j = 0;
              _a.label = 2;

             case 2:
              if (!(j < items.length)) return [ 3, 5 ];
              item = items[j];
              cc.tween(item.node).to(.5, {
                y: 0
              }, {
                easing: "backOut"
              }).start();
              return [ 4, PromiseUtil_1.default.sleep(.02) ];

             case 3:
              _a.sent();
              _a.label = 4;

             case 4:
              j++;
              return [ 3, 2 ];

             case 5:
              i++;
              return [ 3, 1 ];

             case 6:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property({
        type: Case_Dragging_Container_1.default,
        tooltip: false
      }) ], Case_DraggingContent.prototype, "container", void 0);
      __decorate([ property({
        type: Case_Dragging_GroupContainer_1.default,
        tooltip: false
      }) ], Case_DraggingContent.prototype, "groupContainer", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        tooltip: false
      }) ], Case_DraggingContent.prototype, "itemSpriteFrame", void 0);
      Case_DraggingContent = __decorate([ ccclass ], Case_DraggingContent);
      return Case_DraggingContent;
    }(cc.Component);
    exports.default = Case_DraggingContent;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/PromiseUtil": "PromiseUtil",
    "./components/Case_Dragging_Container": "Case_Dragging_Container",
    "./components/Case_Dragging_GroupContainer": "Case_Dragging_GroupContainer",
    "./components/Case_Dragging_Item": "Case_Dragging_Item"
  } ],
  Case_Dragging_Container: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "24491Dme1hNH6EouX9CdYaE", "Case_Dragging_Container");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NodeUtil_1 = require("../../../../eazax-ccc/utils/NodeUtil");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_Dragging_Container = function(_super) {
      __extends(Case_Dragging_Container, _super);
      function Case_Dragging_Container() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this.itemSize = new cc.Size(80, 80);
        _this.placeholderOpacity = 100;
        _this.placeholders = [];
        _this.nodePool = new cc.NodePool();
        return _this;
      }
      Object.defineProperty(Case_Dragging_Container.prototype, "contentNode", {
        get: function() {
          return this.layout.node;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Case_Dragging_Container.prototype, "itemCount", {
        get: function() {
          return this.contentNode.childrenCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Case_Dragging_Container.prototype, "rect", {
        get: function() {
          return NodeUtil_1.default.getNodeSelfBoundingBoxToWorld(this.node);
        },
        enumerable: false,
        configurable: true
      });
      Case_Dragging_Container.prototype.onDestroy = function() {
        this.release();
      };
      Case_Dragging_Container.prototype.release = function() {
        this.nodePool.clear();
      };
      Case_Dragging_Container.prototype.addStaticItem = function(item) {
        item.node.setParent(this.contentNode);
      };
      Case_Dragging_Container.prototype.addOptionItem = function(item) {
        item.node.setParent(this.contentNode);
      };
      Case_Dragging_Container.prototype.onGroupDragEnter = function(group) {
        this.enableLayout(true);
        var itemNode = group.items[0].node, spriteFrame = itemNode.getComponent(cc.Sprite).spriteFrame;
        this.showPlaceholders(group.itemCount, spriteFrame, itemNode.color.clone());
      };
      Case_Dragging_Container.prototype.onGroupDragLeave = function(group) {
        this.enableLayout(true);
        this.hidePlaceholders();
      };
      Case_Dragging_Container.prototype.onGroupDrop = function(group) {
        this.enableLayout(false);
        this.hidePlaceholders();
      };
      Case_Dragging_Container.prototype.showPlaceholders = function(quantity, spriteFrame, color) {
        var placeholders = this.placeholders, nodePool = this.nodePool, size = this.itemSize, scale = 1, opacity = this.placeholderOpacity;
        for (var i = 0; i < quantity; i++) {
          var node = nodePool.get() || new cc.Node();
          node.name = "Placeholder";
          node.setContentSize(size);
          node.setScale(scale);
          node.opacity = opacity;
          node.color = color;
          var sprite = node.getComponent(cc.Sprite) || node.addComponent(cc.Sprite);
          sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          sprite.trim = false;
          sprite.spriteFrame = spriteFrame;
          node.setParent(this.contentNode);
          placeholders.push(node);
        }
      };
      Case_Dragging_Container.prototype.hidePlaceholders = function() {
        var placeholders = this.placeholders, nodePool = this.nodePool;
        while (placeholders.length > 0) {
          var node = placeholders.shift();
          node.getComponent(cc.Sprite).spriteFrame = null;
          nodePool.put(node);
        }
      };
      Case_Dragging_Container.prototype.clear = function() {
        this.contentNode.destroyAllChildren();
      };
      Case_Dragging_Container.prototype.getTargetSpacePos = function(count) {
        var layout = this.layout, layoutHeight = layout.node.height, layoutWidth = layout.node.width, itemHeight = this.itemSize.height, itemWidth = this.itemSize.width, lineMaxCount = this.getLineMaxCount(), lines = Math.ceil(count / lineMaxCount), rowCount = count % lineMaxCount === 0 ? lineMaxCount : count % lineMaxCount, x = layout.paddingLeft + rowCount * itemWidth + (rowCount - 1) * layout.spacingX - itemWidth / 2 - layoutWidth / 2, y = -(layout.paddingTop + lines * itemHeight + (lines - 1) * layout.spacingY - itemHeight / 2 - .5 * layoutHeight);
        return cc.v3(x, y, 0);
      };
      Case_Dragging_Container.prototype.getNextSpacePos = function() {
        return this.getTargetSpacePos(this.itemCount + 1);
      };
      Case_Dragging_Container.prototype.getLineMaxCount = function() {
        var layoutWidth = this.layout.node.width, _a = this.layout, paddingLeft = _a.paddingLeft, paddingRight = _a.paddingRight, spacingX = _a.spacingX, itemWidth = this.itemSize.width, count = (layoutWidth - paddingLeft - paddingRight + spacingX) / (itemWidth + spacingX);
        return Math.floor(count);
      };
      Case_Dragging_Container.prototype.enableLayout = function(enabled) {
        if (enabled) {
          var nodes = this.contentNode.children;
          for (var i = 0, l = nodes.length; i < l; i++) cc.Tween.stopAllByTarget(nodes[i]);
        }
        this.layout.enabled = enabled;
      };
      __decorate([ property({
        type: cc.Layout,
        tooltip: false
      }) ], Case_Dragging_Container.prototype, "layout", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Case_Dragging_Container.prototype, "itemSize", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Case_Dragging_Container.prototype, "placeholderOpacity", void 0);
      Case_Dragging_Container = __decorate([ ccclass ], Case_Dragging_Container);
      return Case_Dragging_Container;
    }(cc.Component);
    exports.default = Case_Dragging_Container;
    cc._RF.pop();
  }, {
    "../../../../eazax-ccc/utils/NodeUtil": "NodeUtil"
  } ],
  Case_Dragging_GroupContainer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f4c3DMRGpBsrLPQo6m4u/8", "Case_Dragging_GroupContainer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Case_Dragging_Group_1 = require("./Case_Dragging_Group");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_Dragging_GroupContainer = function(_super) {
      __extends(Case_Dragging_GroupContainer, _super);
      function Case_Dragging_GroupContainer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this._groups = null;
        return _this;
      }
      Object.defineProperty(Case_Dragging_GroupContainer.prototype, "groups", {
        get: function() {
          this._groups && 0 !== this._groups.length || (this._groups = this.layout.getComponentsInChildren(Case_Dragging_Group_1.default));
          return this._groups;
        },
        enumerable: false,
        configurable: true
      });
      Case_Dragging_GroupContainer.prototype.enableLayout = function(enabled) {
        this.layout.enabled = enabled;
      };
      Case_Dragging_GroupContainer.prototype.forceUpdateLayout = function() {
        var children = this.layout.node.children;
        for (var i = 0; i < children.length; i++) children[i].active && (children[i]["_activeInHierarchy"] = true);
        this.layout["_layoutDirty"] = true;
        this.layout.updateLayout();
      };
      __decorate([ property({
        type: cc.Layout,
        tooltip: false
      }) ], Case_Dragging_GroupContainer.prototype, "layout", void 0);
      Case_Dragging_GroupContainer = __decorate([ ccclass ], Case_Dragging_GroupContainer);
      return Case_Dragging_GroupContainer;
    }(cc.Component);
    exports.default = Case_Dragging_GroupContainer;
    cc._RF.pop();
  }, {
    "./Case_Dragging_Group": "Case_Dragging_Group"
  } ],
  Case_Dragging_Group: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d8a86V88BABZDaa1otGyTa", "Case_Dragging_Group");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NodeUtil_1 = require("../../../../eazax-ccc/utils/NodeUtil");
    var Case_Dragging_1 = require("../Case_Dragging");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var IntersectionStatus;
    (function(IntersectionStatus) {
      IntersectionStatus[IntersectionStatus["OUT"] = 1] = "OUT";
      IntersectionStatus[IntersectionStatus["IN"] = 2] = "IN";
    })(IntersectionStatus || (IntersectionStatus = {}));
    var Case_Dragging_Group = function(_super) {
      __extends(Case_Dragging_Group, _super);
      function Case_Dragging_Group() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this.dragOffset = null;
        _this.isDragging = false;
        _this.lastStatus = IntersectionStatus.OUT;
        _this.items = [];
        return _this;
      }
      Object.defineProperty(Case_Dragging_Group.prototype, "itemCount", {
        get: function() {
          return this.contentNode.childrenCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Case_Dragging_Group.prototype, "contentNode", {
        get: function() {
          return this.layout.node;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Case_Dragging_Group.prototype, "rect", {
        get: function() {
          return NodeUtil_1.default.getNodeSelfBoundingBoxToWorld(this.contentNode);
        },
        enumerable: false,
        configurable: true
      });
      Case_Dragging_Group.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_Dragging_Group.prototype.registerEvent = function() {
        this.layout.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.layout.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.layout.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.layout.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      Case_Dragging_Group.prototype.onTouchStart = function(event) {
        var node = this.contentNode, touchPosInWorld = event.getLocation(), touchPosInNode = node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        this.dragOffset = touchPosInNode.sub(node.getPosition());
        this.updateIntersection();
      };
      Case_Dragging_Group.prototype.onTouchMove = function(event) {
        if (!this.dragOffset) return;
        var node = this.contentNode, touchPosInWorld = event.getLocation(), touchPosInNode = node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        node.setPosition(touchPosInNode.sub(this.dragOffset));
        if (!this.isDragging) {
          this.isDragging = true;
          this.drag();
        }
        this.updateIntersection();
      };
      Case_Dragging_Group.prototype.onTouchCancel = function(event) {
        this.onTouchEnd(event);
      };
      Case_Dragging_Group.prototype.onTouchEnd = function(event) {
        if (!this.dragOffset) return;
        this.dragOffset = null;
        this.isDragging = false;
        this.drop();
      };
      Case_Dragging_Group.prototype.drag = function() {
        this.node.setSiblingIndex(999);
        this.enableLayout(true);
        var items = this.items;
        for (var i = 0, l = items.length; i < l; i++) items[i].scaleTo(1);
      };
      Case_Dragging_Group.prototype.drop = function() {
        if (this.hitTest()) {
          Case_Dragging_1.default.container.onGroupDrop(this);
          this.embedItems();
          this.contentNode.setPosition(0);
          this.contentNode.active = false;
          this.lastStatus = IntersectionStatus.OUT;
        } else {
          this.enableLayout(true);
          this.reposition();
        }
      };
      Case_Dragging_Group.prototype.updateIntersection = function() {
        var intersects = this.hitTest();
        if (this.lastStatus === IntersectionStatus.OUT && intersects) {
          this.lastStatus = IntersectionStatus.IN;
          Case_Dragging_1.default.container.onGroupDragEnter(this);
        } else if (this.lastStatus === IntersectionStatus.IN && !intersects) {
          this.lastStatus = IntersectionStatus.OUT;
          Case_Dragging_1.default.container.onGroupDragLeave(this);
        }
      };
      Case_Dragging_Group.prototype.hitTest = function() {
        return this.rect.intersects(Case_Dragging_1.default.container.rect);
      };
      Case_Dragging_Group.prototype.reposition = function() {
        return __awaiter(this, void 0, void 0, function() {
          var items, i, l;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              items = this.items;
              for (i = 0, l = items.length; i < l; i++) items[i].scaleTo(.74);
              return [ 4, this.moveTo(cc.v3(0)) ];

             case 1:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      Case_Dragging_Group.prototype.embedItems = function() {
        this.enableLayout(false);
        var container = Case_Dragging_1.default.container, containerContent = container.contentNode, items = this.items;
        var tasks = [];
        var _loop_1 = function(i, l) {
          var item = items[i], node = item.node;
          var targetPosInContainer = container.getNextSpacePos(), curPosInWorld = node.getParent().convertToWorldSpaceAR(node.getPosition()), curPosInContainer = containerContent.convertToNodeSpaceAR(curPosInWorld);
          container.addOptionItem(item);
          item.embedToContainer();
          node.setPosition(curPosInContainer);
          var duration = .1 + .02 * i;
          tasks.push(new Promise(function(res) {
            cc.tween(node).to(duration, {
              position: targetPosInContainer,
              scale: 1
            }, {
              easing: "cubicOut"
            }).call(res).start();
          }));
        };
        for (var i = 0, l = items.length; i < l; i++) _loop_1(i, l);
        return Promise.all(tasks);
      };
      Case_Dragging_Group.prototype.regroupItems = function(triggerItem) {
        var contentNode = this.contentNode, items = this.items;
        var itemPosInContent = this.getTargetSpacePos(items.indexOf(triggerItem) + 1);
        var triggerNode = triggerItem.node, itemPosInWorld = triggerNode.getParent().convertToWorldSpaceAR(triggerNode.getPosition()), posInContentParent = contentNode.getParent().convertToNodeSpaceAR(itemPosInWorld);
        contentNode.setPosition(posInContentParent.sub(itemPosInContent));
        this.enableLayout(false);
        contentNode.active = true;
        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i], node = item.node;
          cc.Tween.stopAllByTarget(node);
          var targetPosInGroup = this.getNextSpacePos();
          item.backToGroup();
          node.setParent(contentNode);
          node.setPosition(targetPosInGroup);
        }
      };
      Case_Dragging_Group.prototype.moveTo = function(pos) {
        var _this = this;
        return new Promise(function(res) {
          var node = _this.contentNode, distance = cc.Vec2.distance(node.position, pos), duration = distance * (1 / 1500);
          cc.tween(node).to(duration, {
            position: pos
          }, {
            easing: "cubicOut"
          }).call(res).start();
        });
      };
      Case_Dragging_Group.prototype.addOptionItem = function(item) {
        item.group = this;
        item.node.setParent(this.contentNode);
        this.items.push(item);
      };
      Case_Dragging_Group.prototype.clear = function() {
        this.contentNode.destroyAllChildren();
      };
      Case_Dragging_Group.prototype.getTargetSpacePos = function(count) {
        var layout = this.layout, paddingLeft = layout.paddingLeft, spacingX = layout.spacingX, layoutWidth = layout.node.width, itemWidth = this.items[0].node.width, x = paddingLeft + count * itemWidth + (count - 1) * spacingX - itemWidth / 2 - layoutWidth / 2;
        return cc.v3(x, 0, 0);
      };
      Case_Dragging_Group.prototype.getNextSpacePos = function() {
        return this.getTargetSpacePos(this.itemCount + 1);
      };
      Case_Dragging_Group.prototype.enableLayout = function(enabled) {
        this.layout.enabled = enabled;
      };
      Case_Dragging_Group.prototype.forceUpdateLayout = function() {
        var children = this.layout.node.children;
        for (var i = 0; i < children.length; i++) children[i].active && (children[i]["_activeInHierarchy"] = true);
        this.layout["_layoutDirty"] = true;
        this.layout.updateLayout();
      };
      __decorate([ property({
        type: cc.Layout,
        tooltip: false
      }) ], Case_Dragging_Group.prototype, "layout", void 0);
      Case_Dragging_Group = __decorate([ ccclass ], Case_Dragging_Group);
      return Case_Dragging_Group;
    }(cc.Component);
    exports.default = Case_Dragging_Group;
    cc._RF.pop();
  }, {
    "../../../../eazax-ccc/utils/NodeUtil": "NodeUtil",
    "../Case_Dragging": "Case_Dragging"
  } ],
  Case_Dragging_Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c88cdVMwkVGloNefrqgJRse", "Case_Dragging_Item");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Case_Dragging_1 = require("../Case_Dragging");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_Dragging_Item = function(_super) {
      __extends(Case_Dragging_Item, _super);
      function Case_Dragging_Item() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.group = null;
        _this.touchStartPos = null;
        _this.dragOffset = null;
        _this.isDragging = false;
        _this.inGroup = false;
        _this.inContainer = false;
        return _this;
      }
      Case_Dragging_Item.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_Dragging_Item.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      Case_Dragging_Item.prototype.onTouchStart = function(event) {
        if (!this.group || !this.inContainer) return;
        this.touchStartPos = event.getLocation();
        var touchPosInNode = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = touchPosInNode.sub(this.node.getPosition());
      };
      Case_Dragging_Item.prototype.onTouchMove = function(event) {
        if (!this.dragOffset) return;
        if (this.inGroup) {
          this.group.onTouchMove(event);
          return;
        }
        var touchPosInWorld = event.getLocation();
        if (!this.isDragging) {
          var distance = cc.Vec2.distance(this.touchStartPos, touchPosInWorld);
          if (distance >= 1) {
            this.isDragging = true;
            this.drag();
            var touchPosInNode_1 = this.node.getParent().convertToNodeSpaceAR(touchPosInWorld);
            this.node.setPosition(touchPosInNode_1.sub(this.dragOffset));
            this.group.regroupItems(this);
            this.group.onTouchStart(event);
          }
          return;
        }
        var touchPosInNode = this.node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        this.node.setPosition(touchPosInNode.sub(this.dragOffset));
      };
      Case_Dragging_Item.prototype.onTouchCancel = function(event) {
        this.onTouchEnd(event);
      };
      Case_Dragging_Item.prototype.onTouchEnd = function(event) {
        if (!this.dragOffset) return;
        this.dragOffset = null;
        this.isDragging = false;
        this.inGroup && this.group.onTouchEnd(event);
      };
      Case_Dragging_Item.prototype.drag = function() {
        var node = this.node, moveLayer = Case_Dragging_1.default.moveLayer, curPosInWorld = node.getParent().convertToWorldSpaceAR(node.getPosition()), curPosInMoveLayer = moveLayer.convertToNodeSpaceAR(curPosInWorld);
        node.setParent(moveLayer);
        node.setPosition(curPosInMoveLayer);
        node.setSiblingIndex(999);
      };
      Case_Dragging_Item.prototype.embedToContainer = function() {
        this.inContainer = true;
        this.inGroup = false;
      };
      Case_Dragging_Item.prototype.backToGroup = function() {
        this.inContainer = false;
        this.inGroup = true;
      };
      Case_Dragging_Item.prototype.moveTo = function(pos) {
        var _this = this;
        return new Promise(function(res) {
          var node = _this.node, distance = cc.Vec2.distance(node.position, pos), duration = distance * (1 / 1800);
          cc.tween(node).to(duration, {
            position: pos
          }, {
            easing: "cubicOut"
          }).call(res).start();
        });
      };
      Case_Dragging_Item.prototype.scaleTo = function(scale, duration) {
        var _this = this;
        void 0 === duration && (duration = .1);
        return new Promise(function(res) {
          var node = _this.node;
          cc.tween(node).to(duration, {
            scale: scale
          }, {
            easing: "cubicOut"
          }).call(res).start();
        });
      };
      Case_Dragging_Item = __decorate([ ccclass ], Case_Dragging_Item);
      return Case_Dragging_Item;
    }(cc.Component);
    exports.default = Case_Dragging_Item;
    cc._RF.pop();
  }, {
    "../Case_Dragging": "Case_Dragging"
  } ],
  Case_Dragging: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9def8J4d05Dh67XnF30hFYP", "Case_Dragging");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Case_DraggingContent_1 = require("./Case_DraggingContent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_Dragging = function(_super) {
      __extends(Case_Dragging, _super);
      function Case_Dragging() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.content = null;
        return _this;
      }
      Case_Dragging_1 = Case_Dragging;
      Case_Dragging.prototype.onLoad = function() {
        this.init();
      };
      Case_Dragging.prototype.start = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.play();
        }, .2);
      };
      Case_Dragging.prototype.onDestroy = function() {
        this.release();
      };
      Case_Dragging.prototype.init = function() {
        Case_Dragging_1.instance = this;
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      };
      Case_Dragging.prototype.release = function() {
        Case_Dragging_1.instance === this && (Case_Dragging_1.instance = null);
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      };
      Case_Dragging.prototype.play = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.content.generateStaticItems(5) ];

             case 1:
              _a.sent();
              return [ 4, this.content.generateOptionItems([ 3, 4, 5 ]) ];

             case 2:
              _a.sent();
              return [ 4, Promise.all([ this.content.showStaticItems(), this.content.showOptionItems() ]) ];

             case 3:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      Object.defineProperty(Case_Dragging, "moveLayer", {
        get: function() {
          return this.instance.content.node;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Case_Dragging, "container", {
        get: function() {
          return this.instance.content.container;
        },
        enumerable: false,
        configurable: true
      });
      var Case_Dragging_1;
      Case_Dragging.instance = null;
      __decorate([ property({
        type: Case_DraggingContent_1.default,
        tooltip: false
      }) ], Case_Dragging.prototype, "content", void 0);
      Case_Dragging = Case_Dragging_1 = __decorate([ ccclass ], Case_Dragging);
      return Case_Dragging;
    }(cc.Component);
    exports.default = Case_Dragging;
    cc._RF.pop();
  }, {
    "./Case_DraggingContent": "Case_DraggingContent"
  } ],
  Case_FrameLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a40au3FthMvYHjcvwK8lLd", "Case_FrameLoading");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_FrameLoading = function(_super) {
      __extends(Case_FrameLoading, _super);
      function Case_FrameLoading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.content = null;
        _this.normalBtn = null;
        _this.clearBtn = null;
        _this.frameBtn = null;
        return _this;
      }
      Case_FrameLoading.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_FrameLoading.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Case_FrameLoading.prototype.registerEvent = function() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.on(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
      };
      Case_FrameLoading.prototype.unregisterEvent = function() {
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.off(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.off(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
      };
      Case_FrameLoading.prototype.onNormalBtnClick = function() {
        this.clear();
        this.loadAtOnce();
      };
      Case_FrameLoading.prototype.onClearBtnClick = function() {
        this.clear();
      };
      Case_FrameLoading.prototype.onFrameBtnClick = function() {
        this.clear();
        this.loadByFrames();
      };
      Case_FrameLoading.prototype.loadAtOnce = function() {
        var total = 2e3;
        for (var i = 0; i < total; i++) this.addItem(i);
      };
      Case_FrameLoading.prototype.loadByFrames = function() {
        var _this = this;
        var total = 2e3, countPerFrame = 30;
        var index = 0;
        var load = function() {
          var count = Math.min(total - index, countPerFrame);
          for (var i = 0; i < count; i++) {
            _this.addItem(index);
            index++;
          }
          index < total && _this.scheduleOnce(function() {
            return load();
          });
        };
        load();
      };
      Case_FrameLoading.prototype.addItem = function(index) {
        var node = cc.instantiate(this.itemPrefab);
        node.setParent(this.content);
        node.getComponentInChildren(cc.Label).string = "" + (index + 1);
        node.active = true;
      };
      Case_FrameLoading.prototype.clear = function() {
        this.unscheduleAllCallbacks();
        this.content.destroyAllChildren();
      };
      __decorate([ property(cc.Node) ], Case_FrameLoading.prototype, "itemPrefab", void 0);
      __decorate([ property(cc.Node) ], Case_FrameLoading.prototype, "content", void 0);
      __decorate([ property(cc.Node) ], Case_FrameLoading.prototype, "normalBtn", void 0);
      __decorate([ property(cc.Node) ], Case_FrameLoading.prototype, "clearBtn", void 0);
      __decorate([ property(cc.Node) ], Case_FrameLoading.prototype, "frameBtn", void 0);
      Case_FrameLoading = __decorate([ ccclass ], Case_FrameLoading);
      return Case_FrameLoading;
    }(cc.Component);
    exports.default = Case_FrameLoading;
    cc._RF.pop();
  }, {} ],
  Case_MultipassKawaseBlur: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "57f6d8LrfFDu6/Rj+pNtFXs", "Case_MultipassKawaseBlur");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_MultipassKawaseBlur = function(_super) {
      __extends(Case_MultipassKawaseBlur, _super);
      function Case_MultipassKawaseBlur() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.material = null;
        _this.renderTexture = null;
        return _this;
      }
      Case_MultipassKawaseBlur.prototype.start = function() {
        var sprite = this.sprite, node = this.sprite.node;
        var material = this.material;
        material.setProperty("resolution", cc.v2(node.width, node.height));
        var srcRT = new cc.RenderTexture(), dstRT = new cc.RenderTexture();
        this.getRenderTexture(node, srcRT);
        this.renderWithMaterial(srcRT, dstRT, material);
        this.renderWithMaterial(dstRT, srcRT, material);
        this.renderWithMaterial(srcRT, dstRT, material);
        this.renderWithMaterial(dstRT, srcRT, material);
        this.renderWithMaterial(srcRT, dstRT, material);
        this.renderTexture = dstRT;
        sprite.spriteFrame = new cc.SpriteFrame(this.renderTexture);
        srcRT.destroy();
      };
      Case_MultipassKawaseBlur.prototype.onDestroy = function() {
        this.renderTexture && this.renderTexture.destroy();
      };
      Case_MultipassKawaseBlur.prototype.getRenderTexture = function(node, out) {
        if (!cc.isValid(node)) return null;
        out && out instanceof cc.RenderTexture || (out = new cc.RenderTexture());
        var width = Math.floor(node.width), height = Math.floor(node.height);
        out.initWithSize(width, height);
        var cameraNode = new cc.Node();
        cameraNode.parent = node;
        var camera = cameraNode.addComponent(cc.Camera);
        camera.clearFlags |= cc.Camera.ClearFlags.COLOR;
        camera.backgroundColor = cc.color(0, 0, 0, 0);
        camera.zoomRatio = cc.winSize.height / height;
        camera.targetTexture = out;
        camera.render(node);
        cameraNode.destroy();
        return out;
      };
      Case_MultipassKawaseBlur.prototype.renderWithMaterial = function(srcRT, dstRT, material) {
        if (dstRT instanceof cc.Material) {
          material = dstRT;
          dstRT = new cc.RenderTexture();
        }
        var tempNode = new cc.Node();
        tempNode.setParent(cc.Canvas.instance.node);
        var tempSprite = tempNode.addComponent(cc.Sprite);
        tempSprite.sizeMode = cc.Sprite.SizeMode.RAW;
        tempSprite.trim = false;
        tempSprite.spriteFrame = new cc.SpriteFrame(srcRT);
        var width = srcRT.width, height = srcRT.height;
        dstRT.initWithSize(width, height);
        material instanceof cc.Material && tempSprite.setMaterial(0, material);
        var cameraNode = new cc.Node();
        cameraNode.setParent(tempNode);
        var camera = cameraNode.addComponent(cc.Camera);
        camera.clearFlags |= cc.Camera.ClearFlags.COLOR;
        camera.backgroundColor = cc.color(0, 0, 0, 0);
        camera.zoomRatio = cc.winSize.height / height;
        camera.targetTexture = dstRT;
        camera.render(tempNode);
        cameraNode.destroy();
        tempNode.destroy();
        return dstRT;
      };
      __decorate([ property({
        type: cc.Sprite,
        tooltip: false
      }) ], Case_MultipassKawaseBlur.prototype, "sprite", void 0);
      __decorate([ property({
        type: cc.Material,
        tooltip: false
      }) ], Case_MultipassKawaseBlur.prototype, "material", void 0);
      Case_MultipassKawaseBlur = __decorate([ ccclass ], Case_MultipassKawaseBlur);
      return Case_MultipassKawaseBlur;
    }(cc.Component);
    exports.default = Case_MultipassKawaseBlur;
    cc._RF.pop();
  }, {} ],
  Case_NewUserGuide: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a50fcdznlNkoYkMJatN+XL", "Case_NewUserGuide");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HollowOut_1 = require("../../../eazax-ccc/components/effects/HollowOut");
    var TouchBlocker_1 = require("../../../eazax-ccc/components/TouchBlocker");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_NewUserGuide = function(_super) {
      __extends(Case_NewUserGuide, _super);
      function Case_NewUserGuide() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hollowOut = null;
        _this.touchBlocker = null;
        _this.startBtn = null;
        _this.oneBtn = null;
        _this.twoBtn = null;
        _this.threeBtn = null;
        return _this;
      }
      Case_NewUserGuide.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_NewUserGuide.prototype.start = function() {
        this.reset();
      };
      Case_NewUserGuide.prototype.registerEvent = function() {
        this.startBtn.on(cc.Node.EventType.TOUCH_END, this.onStartBtnClick, this);
        this.oneBtn.on(cc.Node.EventType.TOUCH_END, this.onOneBtnClick, this);
        this.twoBtn.on(cc.Node.EventType.TOUCH_END, this.onTwoBtnClick, this);
        this.threeBtn.on(cc.Node.EventType.TOUCH_END, this.onThreeBtnClick, this);
      };
      Case_NewUserGuide.prototype.reset = function() {
        this.hollowOut.node.active = true;
        this.hollowOut.setNodeSize();
        this.touchBlocker.passAll();
      };
      Case_NewUserGuide.prototype.onStartBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var node, x, y;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.touchBlocker.blockAll();
              node = this.oneBtn, x = node.width + 10, y = node.height + 10;
              return [ 4, this.hollowOut.rectTo(.5, node.getPosition(), x, y, 5, 5) ];

             case 1:
              _a.sent();
              this.touchBlocker.setTarget(node);
              return [ 2 ];
            }
          });
        });
      };
      Case_NewUserGuide.prototype.onOneBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var node, x, y;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.hollowOut.setNodeSize();
              this.touchBlocker.blockAll();
              node = this.twoBtn, x = node.width + 10, y = node.height + 10;
              return [ 4, this.hollowOut.rectTo(.5, node.getPosition(), x, y, 5, 5) ];

             case 1:
              _a.sent();
              this.touchBlocker.setTarget(node);
              return [ 2 ];
            }
          });
        });
      };
      Case_NewUserGuide.prototype.onTwoBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var node;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.hollowOut.setNodeSize();
              this.touchBlocker.blockAll();
              node = this.threeBtn;
              return [ 4, this.hollowOut.circleTo(.5, node.getPosition(), node.width / 2, 0) ];

             case 1:
              _a.sent();
              this.touchBlocker.setTarget(node);
              return [ 2 ];
            }
          });
        });
      };
      Case_NewUserGuide.prototype.onThreeBtnClick = function() {
        this.hollowOut.setNodeSize();
        this.touchBlocker.passAll();
      };
      __decorate([ property(HollowOut_1.default) ], Case_NewUserGuide.prototype, "hollowOut", void 0);
      __decorate([ property(TouchBlocker_1.default) ], Case_NewUserGuide.prototype, "touchBlocker", void 0);
      __decorate([ property(cc.Node) ], Case_NewUserGuide.prototype, "startBtn", void 0);
      __decorate([ property(cc.Node) ], Case_NewUserGuide.prototype, "oneBtn", void 0);
      __decorate([ property(cc.Node) ], Case_NewUserGuide.prototype, "twoBtn", void 0);
      __decorate([ property(cc.Node) ], Case_NewUserGuide.prototype, "threeBtn", void 0);
      Case_NewUserGuide = __decorate([ ccclass ], Case_NewUserGuide);
      return Case_NewUserGuide;
    }(cc.Component);
    exports.default = Case_NewUserGuide;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/TouchBlocker": "TouchBlocker",
    "../../../eazax-ccc/components/effects/HollowOut": "HollowOut"
  } ],
  Case_PixelClick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31bfagXWgVLV4IZVa90tZra", "Case_PixelClick");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RenderUtil_1 = require("../../../eazax-ccc/utils/RenderUtil");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_PixelClick = function(_super) {
      __extends(Case_PixelClick, _super);
      function Case_PixelClick() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.reference = null;
        _this.label = null;
        _this.pixelsData = null;
        return _this;
      }
      Case_PixelClick.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Case_PixelClick.prototype.init = function() {
        this.label.string = "\u70b9\u51fb\u6216\u6ed1\u52a8\u4e0a\u65b9\u56fe\u50cf";
      };
      Case_PixelClick.prototype.registerEvent = function() {
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTargetClick, this);
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTargetClick, this);
      };
      Case_PixelClick.prototype.onTargetClick = function(event) {
        var touchPos = event.getLocation(), node = this.target, localPos = node.convertToNodeSpaceAR(touchPos);
        if (!node.getBoundingBoxToWorld().contains(touchPos)) return;
        this.pixelsData || (this.pixelsData = RenderUtil_1.default.getPixelsData(this.target));
        var x = localPos.x + node.anchorX * node.width, y = -(localPos.y - node.anchorY * node.height);
        var index = 4 * node.width * Math.floor(y) + 4 * Math.floor(x), colors = this.pixelsData.slice(index, index + 4);
        this.reference.color = cc.color(colors[0], colors[1], colors[2]);
        this.reference.opacity = colors[3];
        this.label.string = "\u70b9\u51fb\u4fe1\u606f\uff1a\n";
        this.label.string += " - \u57fa\u4e8e\u4e16\u754c\u7684\u5750\u6807\uff1a" + touchPos.toString() + "\n";
        this.label.string += " - \u57fa\u4e8e\u951a\u70b9\u7684\u5750\u6807\uff1a" + localPos.toString() + "\n";
        this.label.string += " - \u57fa\u4e8e\u5de6\u4e0a\u89d2\u7684\u5750\u6807\uff1a" + cc.v2(x, y).toString() + "\n";
        this.label.string += " - \u50cf\u7d20\u4e0b\u6807\uff1a" + index / 4 + "\n";
        this.label.string += " - \u989c\u8272\u4e0b\u6807\uff1a" + index + "\n";
        this.label.string += " - \u989c\u8272\u503c\uff1a\n";
        this.label.string += "            - R\uff1a" + colors[0] + "\n";
        this.label.string += "            - G\uff1a" + colors[1] + "\n";
        this.label.string += "            - B\uff1a" + colors[2] + "\n";
        this.label.string += "            - A\uff1a" + colors[3];
      };
      __decorate([ property(cc.Node) ], Case_PixelClick.prototype, "target", void 0);
      __decorate([ property(cc.Node) ], Case_PixelClick.prototype, "reference", void 0);
      __decorate([ property(cc.Label) ], Case_PixelClick.prototype, "label", void 0);
      Case_PixelClick = __decorate([ ccclass ], Case_PixelClick);
      return Case_PixelClick;
    }(cc.Component);
    exports.default = Case_PixelClick;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/RenderUtil": "RenderUtil"
  } ],
  Case_PopupTesting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38e54J2q41JyIOt2ki5tkk4", "Case_PopupTesting");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PopupManager_1 = require("../../../eazax-ccc/core/PopupManager");
    var TestPopup_1 = require("./TestPopup");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_PopupTesting = function(_super) {
      __extends(Case_PopupTesting, _super);
      function Case_PopupTesting() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btn = null;
        return _this;
      }
      Case_PopupTesting.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_PopupTesting.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Case_PopupTesting.prototype.registerEvent = function() {
        this.btn.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Case_PopupTesting.prototype.unregisterEvent = function() {
        this.btn.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Case_PopupTesting.prototype.onClick = function() {
        var options = (1e4 * Math.random()).toFixed(0).padStart(5, "0");
        var params = {
          mode: PopupManager_1.default.CacheMode.Frequent
        };
        PopupManager_1.default.show(TestPopup_1.default.path, options, params);
      };
      __decorate([ property(cc.Node) ], Case_PopupTesting.prototype, "btn", void 0);
      Case_PopupTesting = __decorate([ ccclass ], Case_PopupTesting);
      return Case_PopupTesting;
    }(cc.Component);
    exports.default = Case_PopupTesting;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/core/PopupManager": "PopupManager",
    "./TestPopup": "TestPopup"
  } ],
  Case_PostProcessing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d24fVSWGlC2KYSdGaaOGpu", "Case_PostProcessing");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Mosaic_1 = require("../../../eazax-ccc/components/effects/Mosaic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_PostProcessing = function(_super) {
      __extends(Case_PostProcessing, _super);
      function Case_PostProcessing() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.avatar = null;
        _this.btn1 = null;
        _this.btn2 = null;
        _this.btn3 = null;
        _this.btn4 = null;
        _this.outputSprite = null;
        _this.normalMaterial = null;
        _this.inversionMaterial = null;
        _this.radialBlurMaterial = null;
        _this.outputMosaic = null;
        return _this;
      }
      Case_PostProcessing.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Case_PostProcessing.prototype.init = function() {
        cc.tween(this.avatar).by(5, {
          angle: -360
        }).repeatForever().start();
      };
      Case_PostProcessing.prototype.registerEvent = function() {
        this.btn1.on(cc.Node.EventType.TOUCH_END, this.onBtn1Click, this);
        this.btn2.on(cc.Node.EventType.TOUCH_END, this.onBtn2Click, this);
        this.btn3.on(cc.Node.EventType.TOUCH_END, this.onBtn3Click, this);
        this.btn4.on(cc.Node.EventType.TOUCH_END, this.onBtn4Click, this);
      };
      Case_PostProcessing.prototype.onBtn1Click = function() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.normalMaterial);
      };
      Case_PostProcessing.prototype.onBtn2Click = function() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.inversionMaterial);
      };
      Case_PostProcessing.prototype.onBtn3Click = function() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.radialBlurMaterial);
      };
      Case_PostProcessing.prototype.onBtn4Click = function() {
        var mosaic = this.outputMosaic;
        mosaic.enabled = true;
        mosaic.set(0);
        mosaic.to(10, 1);
      };
      __decorate([ property(cc.Node) ], Case_PostProcessing.prototype, "avatar", void 0);
      __decorate([ property(cc.Node) ], Case_PostProcessing.prototype, "btn1", void 0);
      __decorate([ property(cc.Node) ], Case_PostProcessing.prototype, "btn2", void 0);
      __decorate([ property(cc.Node) ], Case_PostProcessing.prototype, "btn3", void 0);
      __decorate([ property(cc.Node) ], Case_PostProcessing.prototype, "btn4", void 0);
      __decorate([ property(cc.Sprite) ], Case_PostProcessing.prototype, "outputSprite", void 0);
      __decorate([ property(cc.Material) ], Case_PostProcessing.prototype, "normalMaterial", void 0);
      __decorate([ property(cc.Material) ], Case_PostProcessing.prototype, "inversionMaterial", void 0);
      __decorate([ property(cc.Material) ], Case_PostProcessing.prototype, "radialBlurMaterial", void 0);
      __decorate([ property(Mosaic_1.default) ], Case_PostProcessing.prototype, "outputMosaic", void 0);
      Case_PostProcessing = __decorate([ ccclass ], Case_PostProcessing);
      return Case_PostProcessing;
    }(cc.Component);
    exports.default = Case_PostProcessing;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/effects/Mosaic": "Mosaic"
  } ],
  Case_RadarChart: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76fc5oxGitDSogggrj2rphY", "Case_RadarChart");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RadarChart_1 = require("../../../eazax-ccc/components/charts/RadarChart");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_RadarChart = function(_super) {
      __extends(Case_RadarChart, _super);
      function Case_RadarChart() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.radarChart = null;
        _this.timeEditBox = null;
        _this.randomBtn = null;
        _this.lengthEditBox = null;
        _this.axesEditBox = null;
        _this.drawAxesToggle = null;
        _this.drawDataJoinToggle = null;
        _this.nodesEditBox = null;
        _this.lineWidthEditBox = null;
        _this.innerLineWidthEditBox = null;
        _this.data1EditBox = null;
        _this.data2EditBox = null;
        return _this;
      }
      Case_RadarChart.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_RadarChart.prototype.registerEvent = function() {
        this.randomBtn.on(cc.Node.EventType.TOUCH_END, this.onRandomBtnClick, this);
        this.lengthEditBox.node.on("text-changed", this.onAxixLengthChanged, this);
        this.axesEditBox.node.on("text-changed", this.onAxesChanged, this);
        this.drawAxesToggle.node.on("toggle", this.onDrawAxesChanged, this);
        this.drawDataJoinToggle.node.on("toggle", this.onDrawDataJoinChanged, this);
        this.nodesEditBox.node.on("text-changed", this.onAxisScalesChanged, this);
        this.lineWidthEditBox.node.on("text-changed", this.onLineWidthChanged, this);
        this.innerLineWidthEditBox.node.on("text-changed", this.onInnerLineWidthChanged, this);
        this.data1EditBox.node.on("text-changed", this.onDataChanged, this);
        this.data2EditBox.node.on("text-changed", this.onDataChanged, this);
      };
      Case_RadarChart.prototype.onRandomBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var datas, i, numbers, j, data, time;
          return __generator(this, function(_a) {
            eazax.log("[RadarChartController]", "Random Data");
            datas = [];
            for (i = 0; i < this.radarChart.curDatas.length; i++) {
              numbers = [];
              for (j = 0; j < this.radarChart.curDatas[0].values.length; j++) numbers.push(.8 * Math.random() + .2);
              data = {
                values: i % 2 === 0 ? numbers : numbers.reverse(),
                lineWidth: 6,
                lineColor: this.getRandomColor(255),
                fillColor: this.getRandomColor(100)
              };
              datas.push(data);
            }
            console.log(datas);
            time = parseFloat(this.timeEditBox.string);
            time < 0 || isNaN(time) ? time = .5 : time > 100 && (time = 100);
            this.timeEditBox.string = time.toString();
            this.radarChart.to(datas, time);
            return [ 2 ];
          });
        });
      };
      Case_RadarChart.prototype.getRandomColor = function(a) {
        var rgb = [ 205 * Math.random() + 50, 205 * Math.random() + 50, 205 * Math.random() + 50 ];
        rgb.sort(function() {
          return .5 - Math.random();
        });
        return cc.color.apply(cc, __spreadArrays(rgb, [ a ]));
      };
      Case_RadarChart.prototype.onAxixLengthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        (number < 10 || number > 1e3 || isNaN(number)) && (number = 300);
        this.radarChart.axisLength = number;
        editbox.string = this.radarChart.axisLength.toString();
      };
      Case_RadarChart.prototype.onAxesChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < 3 || isNaN(number) ? number = 3 : number > 500 && (number = 500);
        var axes = Math.floor(number);
        this.radarChart.axes = axes;
        editbox.string = this.radarChart.axes.toString();
      };
      Case_RadarChart.prototype.onDrawAxesChanged = function(toggle) {
        this.radarChart.drawAxes = toggle.isChecked;
      };
      Case_RadarChart.prototype.onDrawDataJoinChanged = function(toggle) {
        this.radarChart.drawDataJoin = toggle.isChecked;
      };
      Case_RadarChart.prototype.onAxisScalesChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < 1 || isNaN(number) ? number = 1 : number > 200 && (number = 200);
        var axes = Math.floor(number);
        this.radarChart.axisScales = axes;
        editbox.string = this.radarChart.axisScales.toString();
      };
      Case_RadarChart.prototype.onLineWidthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < .1 || isNaN(number) ? number = 4 : number > 100 && (number = 100);
        this.radarChart.gridLineWidth = number;
        editbox.string = this.radarChart.gridLineWidth.toString();
      };
      Case_RadarChart.prototype.onInnerLineWidthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < .1 || isNaN(number) ? number = 4 : number > 100 && (number = 100);
        this.radarChart.innerGridLineWidth = number;
        editbox.string = this.radarChart.innerGridLineWidth.toString();
      };
      Case_RadarChart.prototype.onDataChanged = function(editbox) {
        this.radarChart.dataValuesStrings = [ this.data1EditBox.string, this.data2EditBox.string ];
      };
      __decorate([ property(RadarChart_1.default) ], Case_RadarChart.prototype, "radarChart", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "timeEditBox", void 0);
      __decorate([ property(cc.Node) ], Case_RadarChart.prototype, "randomBtn", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "lengthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "axesEditBox", void 0);
      __decorate([ property(cc.Toggle) ], Case_RadarChart.prototype, "drawAxesToggle", void 0);
      __decorate([ property(cc.Toggle) ], Case_RadarChart.prototype, "drawDataJoinToggle", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "nodesEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "lineWidthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "innerLineWidthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "data1EditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart.prototype, "data2EditBox", void 0);
      Case_RadarChart = __decorate([ ccclass ], Case_RadarChart);
      return Case_RadarChart;
    }(cc.Component);
    exports.default = Case_RadarChart;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/charts/RadarChart": "RadarChart"
  } ],
  Case_RemoteSpine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73fbeLBc5tEH6QM5Hydp0KI", "Case_RemoteSpine");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RemoteSpine_1 = require("../../../eazax-ccc/components/remote/RemoteSpine");
    var Toast_1 = require("../../../scripts/common/components/global/Toast");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_RemoteSpine = function(_super) {
      __extends(Case_RemoteSpine, _super);
      function Case_RemoteSpine() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.remoteSpine = null;
        _this.urlEditorBox = null;
        _this.skinEditorBox = null;
        _this.animEditorBox = null;
        return _this;
      }
      Case_RemoteSpine.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Case_RemoteSpine.prototype.start = function() {
        this.reloadTexture();
      };
      Case_RemoteSpine.prototype.registerEvent = function() {
        this.urlEditorBox.node.on("editing-did-ended", this.onUrlEditorBoxEnded, this);
        this.skinEditorBox.node.on("editing-did-ended", this.onSkinEditorBoxEnded, this);
        this.animEditorBox.node.on("editing-did-ended", this.onAnimEditorBoxEnded, this);
      };
      Case_RemoteSpine.prototype.onUrlEditorBoxEnded = function(editorBox) {
        this.reloadTexture();
      };
      Case_RemoteSpine.prototype.onSkinEditorBoxEnded = function(editorBox) {
        var skin = this.skinEditorBox.string;
        this.remoteSpine.skeleton.setSkin(skin);
      };
      Case_RemoteSpine.prototype.onAnimEditorBoxEnded = function(editorBox) {
        var anim = this.animEditorBox.string;
        this.remoteSpine.skeleton.animation = anim;
      };
      Case_RemoteSpine.prototype.init = function() {
        this.skinEditorBox.string = this.remoteSpine.defaultSkin;
        this.animEditorBox.string = this.remoteSpine.defaultAnimation;
      };
      Case_RemoteSpine.prototype.reloadTexture = function() {
        return __awaiter(this, void 0, void 0, function() {
          var url, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              url = this.urlEditorBox.string;
              "" !== url && Toast_1.default.show("\ud83c\udf00 \u6b63\u5728\u52a0\u8f7d\u8fdc\u7a0b\u9aa8\u9abc...");
              this.remoteSpine.set(null);
              return [ 4, this.remoteSpine.load(url) ];

             case 1:
              result = _a.sent();
              "" !== result.url && (result.loaded ? Toast_1.default.show("\ud83c\udf89 \u8fdc\u7a0b\u9aa8\u9abc\u52a0\u8f7d\u6210\u529f") : Toast_1.default.show("\u274c \u8fdc\u7a0b\u9aa8\u9abc\u52a0\u8f7d\u5931\u8d25"));
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(RemoteSpine_1.default) ], Case_RemoteSpine.prototype, "remoteSpine", void 0);
      __decorate([ property(cc.EditBox) ], Case_RemoteSpine.prototype, "urlEditorBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RemoteSpine.prototype, "skinEditorBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RemoteSpine.prototype, "animEditorBox", void 0);
      Case_RemoteSpine = __decorate([ ccclass ], Case_RemoteSpine);
      return Case_RemoteSpine;
    }(cc.Component);
    exports.default = Case_RemoteSpine;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/remote/RemoteSpine": "RemoteSpine",
    "../../../scripts/common/components/global/Toast": "Toast"
  } ],
  Case_RemoteTexture: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0ec25lOqhIsqGiy45GyU0v", "Case_RemoteTexture");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RemoteTexture_1 = require("../../../eazax-ccc/components/remote/RemoteTexture");
    var Toast_1 = require("../../../scripts/common/components/global/Toast");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_RemoteTexture = function(_super) {
      __extends(Case_RemoteTexture, _super);
      function Case_RemoteTexture() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.remoteTexture = null;
        _this.urlEditorBox = null;
        return _this;
      }
      Case_RemoteTexture.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_RemoteTexture.prototype.start = function() {
        this.reloadTexture();
      };
      Case_RemoteTexture.prototype.registerEvent = function() {
        this.urlEditorBox.node.on("editing-did-ended", this.onUrlEditorBoxEnded, this);
      };
      Case_RemoteTexture.prototype.onUrlEditorBoxEnded = function(editorBox) {
        this.reloadTexture();
      };
      Case_RemoteTexture.prototype.reloadTexture = function() {
        return __awaiter(this, void 0, void 0, function() {
          var url, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              url = this.urlEditorBox.string;
              "" !== url && Toast_1.default.show("\ud83c\udf00 \u6b63\u5728\u52a0\u8f7d\u8fdc\u7a0b\u56fe\u50cf...");
              this.remoteTexture.set(null);
              return [ 4, this.remoteTexture.load(url) ];

             case 1:
              result = _a.sent();
              "" !== result.url && (result.loaded ? Toast_1.default.show("\ud83c\udf89 \u8fdc\u7a0b\u56fe\u50cf\u52a0\u8f7d\u6210\u529f") : Toast_1.default.show("\u274c \u8fdc\u7a0b\u56fe\u50cf\u52a0\u8f7d\u5931\u8d25"));
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(RemoteTexture_1.default) ], Case_RemoteTexture.prototype, "remoteTexture", void 0);
      __decorate([ property(cc.EditBox) ], Case_RemoteTexture.prototype, "urlEditorBox", void 0);
      Case_RemoteTexture = __decorate([ ccclass ], Case_RemoteTexture);
      return Case_RemoteTexture;
    }(cc.Component);
    exports.default = Case_RemoteTexture;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/remote/RemoteTexture": "RemoteTexture",
    "../../../scripts/common/components/global/Toast": "Toast"
  } ],
  Case_RuntimeTrimming: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aaa56NP/+5MTokumB51Q+L1", "Case_RuntimeTrimming");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ImageUtil_1 = require("../../../eazax-ccc/utils/ImageUtil");
    var RenderUtil_1 = require("../../../eazax-ccc/utils/RenderUtil");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_RuntimeTrimming = function(_super) {
      __extends(Case_RuntimeTrimming, _super);
      function Case_RuntimeTrimming() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.reference = null;
        _this.target = null;
        _this.texture = null;
        _this.label = null;
        return _this;
      }
      Case_RuntimeTrimming.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_RuntimeTrimming.prototype.start = function() {};
      Case_RuntimeTrimming.prototype.registerEvent = function() {
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTargetClick, this);
      };
      Case_RuntimeTrimming.prototype.onTargetClick = function(event) {
        this.trim(event.target);
      };
      Case_RuntimeTrimming.prototype.init = function() {
        this.label.string = "\u70b9\u51fb\u4e0a\u65b9\u53f3\u4fa7\u56fe\u50cf\u8fdb\u884c\u526a\u88c1 \ud83d\udc46";
      };
      Case_RuntimeTrimming.prototype.trim = function(node) {
        var sprite = node.getComponent(cc.Sprite), originalRect = sprite.spriteFrame.getRect();
        if (0 !== originalRect.xMin && 0 !== originalRect.yMin) {
          console.log("\u8bf7\u52ff\u91cd\u590d\u526a\u88c1");
          return;
        }
        console.time("\u23f1 getPixelsData \u8017\u65f6");
        var pixelsData = RenderUtil_1.default.getPixelsData(node);
        console.timeEnd("\u23f1 getPixelsData \u8017\u65f6");
        console.time("\u23f1 getTrim \u8017\u65f6");
        var trimInfo = ImageUtil_1.default.getTrim(pixelsData, node.width, node.height);
        console.timeEnd("\u23f1 getTrim \u8017\u65f6");
        var originalSize = sprite.spriteFrame.getOriginalSize();
        this.label.string = "\u88c1\u526a\u4fe1\u606f\uff1a\n";
        this.label.string += "    - \u5de6\uff1a" + trimInfo.minX + "\n";
        this.label.string += "    - \u53f3\uff1a" + (originalSize.width - trimInfo.maxX) + "\n";
        this.label.string += "    - \u4e0a\uff1a" + trimInfo.minY + "\n";
        this.label.string += "    - \u4e0b\uff1a" + (originalSize.height - trimInfo.maxY) + "\n";
        this.label.string += "\u88c1\u526a\u540e\u5bbd\u5ea6\uff1a" + (trimInfo.maxX - trimInfo.minX) + "\n";
        this.label.string += "\u88c1\u526a\u540e\u9ad8\u5ea6\uff1a" + (trimInfo.maxY - trimInfo.minY);
        var min = cc.v2(trimInfo.minX, trimInfo.minY), max = cc.v2(trimInfo.maxX, trimInfo.maxY), trimmedRect = cc.Rect.fromMinMax(min, max);
        console.log("\ud83d\udcd0 \u539f\u59cb Rect\uff1a" + originalRect);
        console.log("\ud83d\udcd0 \u526a\u88c1 Rect\uff1a" + trimmedRect);
        sprite.spriteFrame.setRect(trimmedRect);
        sprite.trim = true;
        sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
      };
      __decorate([ property(cc.Node) ], Case_RuntimeTrimming.prototype, "reference", void 0);
      __decorate([ property(cc.Node) ], Case_RuntimeTrimming.prototype, "target", void 0);
      __decorate([ property(cc.Texture2D) ], Case_RuntimeTrimming.prototype, "texture", void 0);
      __decorate([ property(cc.Label) ], Case_RuntimeTrimming.prototype, "label", void 0);
      Case_RuntimeTrimming = __decorate([ ccclass ], Case_RuntimeTrimming);
      return Case_RuntimeTrimming;
    }(cc.Component);
    exports.default = Case_RuntimeTrimming;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/ImageUtil": "ImageUtil",
    "../../../eazax-ccc/utils/RenderUtil": "RenderUtil"
  } ],
  Case_SineWave: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d11caHtQJRPOKyBXwLEJ8Bc", "Case_SineWave");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SineWave_1 = require("../../../eazax-ccc/components/effects/SineWave");
    var JellyTween_1 = require("../../../eazax-ccc/components/tweens/JellyTween");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_SineWave = function(_super) {
      __extends(Case_SineWave, _super);
      function Case_SineWave() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sineWave = null;
        _this.fillBtn = null;
        _this.amplitudeEditBox = null;
        _this.angularVelocityEditBox = null;
        _this.frequencyEditBox = null;
        _this.heightEditBox = null;
        _this.toLeftToggle = null;
        _this.interactable = true;
        _this.status = 0;
        return _this;
      }
      Case_SineWave.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_SineWave.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Case_SineWave.prototype.registerEvent = function() {
        this.fillBtn.on(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
        this.amplitudeEditBox.node.on("text-changed", this.onAmplitudeChanged, this);
        this.angularVelocityEditBox.node.on("text-changed", this.onAngularVelocityChanged, this);
        this.frequencyEditBox.node.on("text-changed", this.onFrequencyChanged, this);
        this.heightEditBox.node.on("text-changed", this.onHeightChanged, this);
        this.toLeftToggle.node.on("toggle", this.onToLeftChanged, this);
      };
      Case_SineWave.prototype.unregisterEvent = function() {
        this.fillBtn.off(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
      };
      Case_SineWave.prototype.onFillBtnClick = function() {
        var _this = this;
        if (!this.interactable) return;
        this.interactable = false;
        if (0 === this.status) {
          this.status = 1;
          var button_1 = this.fillBtn.getComponent(cc.Button);
          button_1.interactable = false;
          var jelly_1 = this.fillBtn.getComponent(JellyTween_1.default);
          jelly_1.stop();
          cc.tween(this.sineWave).to(3, {
            height: 1
          }).call(function() {
            return _this.heightEditBox.string = "1.0";
          }).to(.5, {
            amplitude: 0
          }).call(function() {
            return _this.amplitudeEditBox.string = "0.0";
          }).call(function() {
            _this.interactable = true;
            _this.fillBtn.getComponentInChildren(cc.Label).string = "\u6062\u590d";
            button_1.interactable = true;
            jelly_1.play();
          }).start();
        } else {
          this.status = 0;
          this.sineWave.height = .5;
          this.heightEditBox.string = "0.5";
          this.sineWave.amplitude = .05;
          this.amplitudeEditBox.string = "0.05";
          this.interactable = true;
          this.fillBtn.getComponentInChildren(cc.Label).string = "\u52a0\u6ee1";
        }
      };
      Case_SineWave.prototype.onAmplitudeChanged = function(editbox) {
        this.sineWave.amplitude = parseFloat(editbox.string);
      };
      Case_SineWave.prototype.onAngularVelocityChanged = function(editbox) {
        this.sineWave.angularVelocity = parseFloat(editbox.string);
      };
      Case_SineWave.prototype.onFrequencyChanged = function(editbox) {
        this.sineWave.frequency = parseFloat(editbox.string);
      };
      Case_SineWave.prototype.onHeightChanged = function(editbox) {
        this.sineWave.height = parseFloat(editbox.string);
      };
      Case_SineWave.prototype.onToLeftChanged = function(toggle) {
        this.sineWave.direction = toggle.isChecked ? SineWave_1.SineWaveDirection.Left : SineWave_1.SineWaveDirection.Right;
      };
      __decorate([ property(SineWave_1.default) ], Case_SineWave.prototype, "sineWave", void 0);
      __decorate([ property(cc.Node) ], Case_SineWave.prototype, "fillBtn", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave.prototype, "amplitudeEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave.prototype, "angularVelocityEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave.prototype, "frequencyEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave.prototype, "heightEditBox", void 0);
      __decorate([ property(cc.Toggle) ], Case_SineWave.prototype, "toLeftToggle", void 0);
      Case_SineWave = __decorate([ ccclass ], Case_SineWave);
      return Case_SineWave;
    }(cc.Component);
    exports.default = Case_SineWave;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/effects/SineWave": "SineWave",
    "../../../eazax-ccc/components/tweens/JellyTween": "JellyTween"
  } ],
  ClickToLoadUrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea72dfs9ulL86r9WCWSk1ts", "ClickToLoadUrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ClickToLoadUrl = function(_super) {
      __extends(ClickToLoadUrl, _super);
      function ClickToLoadUrl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.url = "https://gitee.com/ifaswind/eazax-ccc";
        _this.openInNewTap = true;
        return _this;
      }
      ClickToLoadUrl.prototype.onLoad = function() {
        this.registerEvent();
      };
      ClickToLoadUrl.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      ClickToLoadUrl.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      ClickToLoadUrl.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      ClickToLoadUrl.prototype.onClick = function() {
        var url = this.url;
        if (!url || "" === url) return;
        this.openInNewTap ? window.open(url) : window.location.href = url;
      };
      __decorate([ property({
        multiline: true
      }) ], ClickToLoadUrl.prototype, "url", void 0);
      __decorate([ property({
        tooltip: false
      }) ], ClickToLoadUrl.prototype, "openInNewTap", void 0);
      ClickToLoadUrl = __decorate([ ccclass ], ClickToLoadUrl);
      return ClickToLoadUrl;
    }(cc.Component);
    exports.default = ClickToLoadUrl;
    cc._RF.pop();
  }, {} ],
  ClickToShowResPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4eefcThCNNIv7Hni6oMtecW", "ClickToShowResPopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ResourceInfo = void 0;
    var PopupManager_1 = require("../../../eazax-ccc/core/PopupManager");
    var ResPopup_1 = require("./popups/resPopup/ResPopup");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResourceInfo = function() {
      function ResourceInfo() {
        this.title = "";
        this.url = "";
      }
      __decorate([ property({
        displayName: false
      }) ], ResourceInfo.prototype, "title", void 0);
      __decorate([ property({
        multiline: true,
        displayName: false
      }) ], ResourceInfo.prototype, "url", void 0);
      ResourceInfo = __decorate([ ccclass("ResourceInfo") ], ResourceInfo);
      return ResourceInfo;
    }();
    exports.ResourceInfo = ResourceInfo;
    var ClickToShowResPopup = function(_super) {
      __extends(ClickToShowResPopup, _super);
      function ClickToShowResPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.resources = [];
        return _this;
      }
      ClickToShowResPopup.prototype.onLoad = function() {
        this.registerEvent();
      };
      ClickToShowResPopup.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      ClickToShowResPopup.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      ClickToShowResPopup.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      ClickToShowResPopup.prototype.onClick = function() {
        var options = {
          items: []
        }, resources = this.resources;
        for (var i = 0, l = resources.length; i < l; i++) options.items.push({
          name: resources[i].title,
          url: resources[i].url
        });
        var params = {
          mode: PopupManager_1.default.CacheMode.Frequent
        };
        PopupManager_1.default.show(ResPopup_1.default.path, options, params);
      };
      __decorate([ property({
        type: [ ResourceInfo ],
        displayName: false
      }) ], ClickToShowResPopup.prototype, "resources", void 0);
      ClickToShowResPopup = __decorate([ ccclass ], ClickToShowResPopup);
      return ClickToShowResPopup;
    }(cc.Component);
    exports.default = ClickToShowResPopup;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/core/PopupManager": "PopupManager",
    "./popups/resPopup/ResPopup": "ResPopup"
  } ],
  ColorBrush: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7efa2Ur7ddBHaUWPfAVg3Gy", "ColorBrush");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ColorBrush = function(_super) {
      __extends(ColorBrush, _super);
      function ColorBrush() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.graphics = null;
        _this.material = null;
        return _this;
      }
      ColorBrush.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      ColorBrush.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      ColorBrush.prototype.init = function() {
        var graphics = this.graphics = this.node.getComponent(cc.Graphics) || this.node.addComponent(cc.Graphics);
        graphics.strokeColor = cc.Color.WHITE;
        graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        graphics.lineCap = cc.Graphics.LineCap.ROUND;
        graphics.lineWidth = 20;
        this.material = graphics.getMaterial(0);
        this.material.setProperty("size", this.getNodeSize());
      };
      ColorBrush.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      };
      ColorBrush.prototype.unregisterEvent = function() {
        this.node.targetOff(this);
      };
      ColorBrush.prototype.onTouchStart = function(event) {
        var pos = this.node.parent.convertToNodeSpaceAR(event.getLocation()), graphics = this.graphics;
        graphics.moveTo(pos.x - 5, pos.y);
        graphics.circle(pos.x - 5, pos.y, 1);
        graphics.stroke();
        graphics.moveTo(pos.x - 5, pos.y);
      };
      ColorBrush.prototype.onTouchMove = function(event) {
        var pos = this.node.parent.convertToNodeSpaceAR(event.getLocation()), graphics = this.graphics;
        graphics.lineTo(pos.x - 5, pos.y);
        graphics.stroke();
        graphics.moveTo(pos.x - 5, pos.y);
      };
      ColorBrush.prototype.getNodeSize = function() {
        return cc.v2(this.node.width, this.node.height);
      };
      ColorBrush = __decorate([ ccclass ], ColorBrush);
      return ColorBrush;
    }(cc.Component);
    exports.default = ColorBrush;
    cc._RF.pop();
  }, {} ],
  ColorUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0c56RHZahA25SHAgzg6M5R", "ColorUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ColorUtil = function() {
      function ColorUtil() {}
      ColorUtil.hexToRgba = function(hex) {
        if (!ColorUtil.isHex(hex)) return null;
        var r = parseInt(hex.substr(1, 2), 16) || 0, g = parseInt(hex.substr(3, 2), 16) || 0, b = parseInt(hex.substr(5, 2), 16) || 0, a = parseInt(hex.substr(7, 2), 16) || 255;
        return {
          r: r,
          g: g,
          b: b,
          a: a
        };
      };
      ColorUtil.rgbaToHex = function(color) {
        var r = (256 | color.r).toString(16).slice(1), g = (256 | color.g).toString(16).slice(1), b = (256 | color.b).toString(16).slice(1);
        if (void 0 == color.a) return ("#" + r + g + b).toUpperCase();
        var a = (256 | color.a).toString(16).slice(1);
        return ("#" + r + g + b + a).toUpperCase();
      };
      ColorUtil.isHex = function(hex) {
        return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(hex);
      };
      return ColorUtil;
    }();
    exports.default = ColorUtil;
    cc._RF.pop();
  }, {} ],
  CommonUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64d63bLpbxL/ZNT7vfU1XKE", "CommonUI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager_1 = require("../../../../eazax-ccc/core/EventManager");
    var PopupManager_1 = require("../../../../eazax-ccc/core/PopupManager");
    var SceneNavigator_1 = require("../../../../eazax-ccc/core/SceneNavigator");
    var CaseManager_1 = require("../../CaseManager");
    var Constants_1 = require("../../constants/Constants");
    var CustomEvents_1 = require("../../constants/CustomEvents");
    var Toast_1 = require("./Toast");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var CommonUI = function(_super) {
      __extends(CommonUI, _super);
      function CommonUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.homeBtn = null;
        _this.titleTip = null;
        return _this;
      }
      CommonUI.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      CommonUI.prototype.start = function() {
        this.reset();
      };
      CommonUI.prototype.onEnable = function() {
        this.onCaseSwitch();
      };
      CommonUI.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      CommonUI.prototype.registerEvent = function() {
        EventManager_1.default.on(CustomEvents_1.CHANGE_SCENE, this.onSceneChange, this);
        EventManager_1.default.on(CustomEvents_1.SWITCH_CASE, this.onCaseSwitch, this);
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.on(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);
      };
      CommonUI.prototype.unregisterEvent = function() {
        EventManager_1.default.off(CustomEvents_1.CHANGE_SCENE, this.onSceneChange, this);
        EventManager_1.default.off(CustomEvents_1.SWITCH_CASE, this.onCaseSwitch, this);
      };
      CommonUI.prototype.init = function() {
        PopupManager_1.default.container = this.node;
      };
      CommonUI.prototype.reset = function() {
        this.titleTip.active = true;
      };
      CommonUI.prototype.onHomeBtnClick = function() {
        CaseManager_1.default.goHome();
      };
      CommonUI.prototype.onTitleTipClick = function() {
        this.titleTip.active = false;
        Toast_1.default.show("^_^");
      };
      CommonUI.prototype.onSceneChange = function() {};
      CommonUI.prototype.onCaseSwitch = function() {
        this.homeBtn.active = SceneNavigator_1.default.curScene !== Constants_1.SceneName.Home;
      };
      __decorate([ property(cc.Node) ], CommonUI.prototype, "homeBtn", void 0);
      __decorate([ property(cc.Node) ], CommonUI.prototype, "titleTip", void 0);
      CommonUI = __decorate([ ccclass, executionOrder(-1) ], CommonUI);
      return CommonUI;
    }(cc.Component);
    exports.default = CommonUI;
    cc._RF.pop();
  }, {
    "../../../../eazax-ccc/core/EventManager": "EventManager",
    "../../../../eazax-ccc/core/PopupManager": "PopupManager",
    "../../../../eazax-ccc/core/SceneNavigator": "SceneNavigator",
    "../../CaseManager": "CaseManager",
    "../../constants/Constants": "Constants",
    "../../constants/CustomEvents": "CustomEvents",
    "./Toast": "Toast"
  } ],
  ConfirmPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a300P3mKpFN6kATTIgk3Hw", "ConfirmPopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PopupBase_1 = require("./PopupBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ConfirmPopup = function(_super) {
      __extends(ConfirmPopup, _super);
      function ConfirmPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.contentLabel = null;
        _this.confirmBtn = null;
        return _this;
      }
      ConfirmPopup.prototype.onLoad = function() {
        this.registerEvent();
      };
      ConfirmPopup.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      ConfirmPopup.prototype.registerEvent = function() {
        this.confirmBtn.on(cc.Node.EventType.TOUCH_END, this.onConfirmBtnClick, this);
      };
      ConfirmPopup.prototype.unregisterEvent = function() {
        this.confirmBtn.targetOff(this);
      };
      ConfirmPopup.prototype.init = function() {};
      ConfirmPopup.prototype.updateDisplay = function(options) {
        this.titleLabel.string = options.title;
        this.contentLabel.string = options.content;
      };
      ConfirmPopup.prototype.onConfirmBtnClick = function() {
        this.options.confirmCallback && this.options.confirmCallback();
        this.hide();
      };
      __decorate([ property(cc.Label) ], ConfirmPopup.prototype, "titleLabel", void 0);
      __decorate([ property(cc.Label) ], ConfirmPopup.prototype, "contentLabel", void 0);
      __decorate([ property(cc.Node) ], ConfirmPopup.prototype, "confirmBtn", void 0);
      ConfirmPopup = __decorate([ ccclass ], ConfirmPopup);
      return ConfirmPopup;
    }(PopupBase_1.default);
    exports.default = ConfirmPopup;
    cc._RF.pop();
  }, {
    "./PopupBase": "PopupBase"
  } ],
  Constants: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7466XBleNKUJMj3Qu09GcU", "Constants");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SceneName = void 0;
    var SceneName;
    (function(SceneName) {
      SceneName["Home"] = "home";
      SceneName["About"] = "about";
    })(SceneName = exports.SceneName || (exports.SceneName = {}));
    cc._RF.pop();
  }, {} ],
  Counter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "092af/2BZlPjY+nAg7SFRVb", "Counter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var Counter = function(_super) {
      __extends(Counter, _super);
      function Counter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.duration = .5;
        _this.keepInteger = true;
        _this.actualValue = 0;
        _this._curValue = 0;
        _this.tweenRes = null;
        return _this;
      }
      Object.defineProperty(Counter.prototype, "value", {
        get: function() {
          return this.actualValue;
        },
        set: function(value) {
          this.keepInteger && (value = Math.floor(value));
          this.curValue = this.actualValue = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Counter.prototype, "curValue", {
        get: function() {
          return this._curValue;
        },
        set: function(value) {
          this.keepInteger && (value = Math.floor(value));
          this._curValue = value;
          this.label.string = value.toString();
        },
        enumerable: false,
        configurable: true
      });
      Counter.prototype.onLoad = function() {
        this.init();
      };
      Counter.prototype.init = function() {
        this.label || (this.label = this.getComponent(cc.Label));
        this.value = 0;
      };
      Counter.prototype.set = function(value) {
        this.value = value;
      };
      Counter.prototype.setDuration = function(duration) {
        this.duration = duration;
      };
      Counter.prototype.to = function(value, duration, callback) {
        var _this = this;
        return new Promise(function(res) {
          if (_this.tweenRes) {
            cc.Tween.stopAllByTarget(_this);
            _this.tweenRes();
          }
          _this.tweenRes = res;
          _this.actualValue = value;
          void 0 == duration && (duration = _this.duration);
          cc.tween(_this).to(duration, {
            curValue: value
          }).call(function() {
            _this.tweenRes = null;
            callback && callback();
            res();
          }).start();
        });
      };
      Counter.prototype.by = function(diff, duration, callback) {
        var value = this.actualValue + diff;
        return this.to(value, duration, callback);
      };
      __decorate([ property(cc.Label) ], Counter.prototype, "label", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Counter.prototype, "duration", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Counter.prototype, "keepInteger", void 0);
      Counter = __decorate([ ccclass, requireComponent(cc.Label) ], Counter);
      return Counter;
    }(cc.Component);
    exports.default = Counter;
    cc._RF.pop();
  }, {} ],
  CustomEvents: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "608c2JM+IBHT4tYbjMLBwr5", "CustomEvents");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SWITCH_CASE = exports.CHANGE_SCENE = void 0;
    exports.CHANGE_SCENE = "change-scene";
    exports.SWITCH_CASE = "switch-case";
    cc._RF.pop();
  }, {} ],
  DebugUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "443c0HZOJxHiadWuJBZmIbO", "DebugUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DebugUtil = function() {
      function DebugUtil() {}
      DebugUtil.log = function(title, msg) {
        msg ? console.log("%c " + title + " %c " + msg + " ", "background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;") : console.log("%c " + title + " ", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
      };
      DebugUtil.showDynamicAtlas = function(status) {
        void 0 === status && (status = true);
        return cc.dynamicAtlasManager.showDebug(status);
      };
      DebugUtil.showStats = function(status) {
        void 0 === status && (status = true);
        cc.debug.setDisplayStats(status);
      };
      DebugUtil.setStatsColor = function(font, background) {
        void 0 === font && (font = cc.Color.WHITE);
        void 0 === background && (background = cc.color(0, 0, 0, 150));
        var profiler = cc.find("PROFILER-NODE");
        if (!profiler) return cc.warn("\u672a\u627e\u5230\u7edf\u8ba1\u9762\u677f\u8282\u70b9\uff01");
        profiler.children.forEach(function(node) {
          return node.color = font;
        });
        var node = profiler.getChildByName("BACKGROUND");
        if (!node) {
          node = new cc.Node("BACKGROUND");
          profiler.addChild(node, cc.macro.MIN_ZINDEX);
          node.setContentSize(profiler.getBoundingBoxToWorld());
          node.setPosition(0, 0);
        }
        var graphics = node.getComponent(cc.Graphics) || node.addComponent(cc.Graphics);
        graphics.clear();
        graphics.rect(-5, 12.5, node.width + 10, node.height - 10);
        graphics.fillColor = background;
        graphics.fill();
      };
      DebugUtil.getDrawCalls = function() {
        return cc.renderer.drawCalls;
      };
      return DebugUtil;
    }();
    exports.default = DebugUtil;
    false;
    cc._RF.pop();
  }, {} ],
  DeviceUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a78caXjP+hHlK6eYe66xvL7", "DeviceUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DeviceUtil = function() {
      function DeviceUtil() {}
      DeviceUtil.getSafeAreaRect = function() {
        return cc.sys.getSafeAreaRect();
      };
      Object.defineProperty(DeviceUtil, "platform", {
        get: function() {
          return cc.sys.platform;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "os", {
        get: function() {
          return cc.sys.os;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isAndroid", {
        get: function() {
          return cc.sys.platform === cc.sys.ANDROID;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isNative", {
        get: function() {
          return cc.sys.isNative;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isBrowser", {
        get: function() {
          return cc.sys.isBrowser;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isMobile", {
        get: function() {
          return cc.sys.isMobile;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isIPhone", {
        get: function() {
          return cc.sys.platform === cc.sys.IPHONE;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isIPad", {
        get: function() {
          return cc.sys.platform === cc.sys.IPAD;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isMobileBrowser", {
        get: function() {
          return cc.sys.platform === cc.sys.MOBILE_BROWSER;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isDesktopBrowser", {
        get: function() {
          return cc.sys.platform === cc.sys.DESKTOP_BROWSER;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isWeChat", {
        get: function() {
          return cc.sys.platform === cc.sys.WECHAT_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isQQPlay", {
        get: function() {
          return cc.sys.platform === cc.sys.QQ_PLAY;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isByteDance", {
        get: function() {
          return cc.sys.platform === cc.sys.BYTEDANCE_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isBaidu", {
        get: function() {
          return cc.sys.platform === cc.sys.BAIDU_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isVivo", {
        get: function() {
          return cc.sys.platform === cc.sys.VIVO_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isOPPO", {
        get: function() {
          return cc.sys.platform === cc.sys.OPPO_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isXiaomi", {
        get: function() {
          return cc.sys.platform === cc.sys.XIAOMI_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isHuawei", {
        get: function() {
          return cc.sys.platform === cc.sys.HUAWEI_GAME;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DeviceUtil, "isAlipay", {
        get: function() {
          return cc.sys.platform === cc.sys.ALIPAY_GAME;
        },
        enumerable: false,
        configurable: true
      });
      return DeviceUtil;
    }();
    exports.default = DeviceUtil;
    cc._RF.pop();
  }, {} ],
  Draggable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d0f1VyVQhDQp0ZiEop8B4P", "Draggable");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, help = _a.help, menu = _a.menu;
    var Draggable = function(_super) {
      __extends(Draggable, _super);
      function Draggable() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dragThreshold = 1;
        _this.touchStartPos = null;
        _this.dragOffset = null;
        _this.isDragging = false;
        return _this;
      }
      Object.defineProperty(Draggable, "EventType", {
        get: function() {
          return EventType;
        },
        enumerable: false,
        configurable: true
      });
      Draggable.prototype.onLoad = function() {
        this.registerEvent();
      };
      Draggable.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Draggable.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      Draggable.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      };
      Draggable.prototype.onTouchStart = function(event) {
        this.touchStartPos = event.getLocation();
        var touchPosInNode = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = touchPosInNode.sub(this.node.getPosition());
      };
      Draggable.prototype.onTouchMove = function(event) {
        if (!this.dragOffset) return;
        var touchPosInWorld = event.getLocation();
        var touchPosInNode = this.node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        if (!this.isDragging && 0 !== this.dragThreshold) {
          var distance = cc.Vec2.distance(this.touchStartPos, touchPosInWorld);
          if (distance < this.dragThreshold) return;
          this.dragOffset = touchPosInNode.sub(this.node.getPosition());
        }
        this.node.setPosition(touchPosInNode.sub(this.dragOffset));
        if (this.isDragging) this.onDragMove(); else {
          this.isDragging = true;
          this.onDragStart();
        }
      };
      Draggable.prototype.onTouchCancel = function(event) {
        this.onTouchEnd(event);
      };
      Draggable.prototype.onTouchEnd = function(event) {
        if (!this.dragOffset) return;
        this.touchStartPos = null;
        this.dragOffset = null;
        if (this.isDragging) {
          this.isDragging = false;
          this.onDragEnd();
        }
      };
      Draggable.prototype.onDragStart = function() {};
      Draggable.prototype.onDragMove = function() {};
      Draggable.prototype.onDragEnd = function() {};
      __decorate([ property({
        tooltip: false
      }) ], Draggable.prototype, "dragThreshold", void 0);
      Draggable = __decorate([ ccclass, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/interaction/Draggable.ts"), menu("eazax/\u4ea4\u4e92\u7ec4\u4ef6/Draggable") ], Draggable);
      return Draggable;
    }(cc.Component);
    exports.default = Draggable;
    var EventType;
    (function(EventType) {
      EventType["DRAG_START"] = "drag-start";
      EventType["DRAG_MOVE"] = "drag-move";
      EventType["DRAG_END"] = "drag-end";
    })(EventType || (EventType = {}));
    cc._RF.pop();
  }, {} ],
  EditorAsset: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8a7dbrDZNCQ5X+Op8kS6VR", "EditorAsset");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditorAsset = function() {
      function EditorAsset() {}
      EditorAsset.load = function(path, assetType, callback) {
        return new Promise(function(res) {
          true;
          res(null);
          cc.warn("[EditorAsset]", "\u8be5\u51fd\u6570\u53ea\u5728\u7f16\u8f91\u5668\u73af\u5883\u5185\u6709\u6548\uff01");
          return;
        });
      };
      return EditorAsset;
    }();
    exports.default = EditorAsset;
    cc._RF.pop();
  }, {} ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7cf6diX//1L45BRBZxjpzab", "EventManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager = function() {
      function EventManager() {}
      EventManager.on = function(name, callback, target) {
        var events = this.events;
        if (!events.has(name)) {
          events.set(name, [ {
            callback: callback,
            target: target
          } ]);
          return;
        }
        events.get(name).push({
          callback: callback,
          target: target
        });
      };
      EventManager.once = function(name, callback, target) {
        var events = this.onceEvents;
        if (!events.has(name)) {
          events.set(name, [ {
            callback: callback,
            target: target
          } ]);
          return;
        }
        events.get(name).push({
          callback: callback,
          target: target
        });
      };
      EventManager.off = function(name, callback, target) {
        var event = this.events.get(name);
        if (event) for (var i = 0, l = event.length; i < l; i++) if (this.compare(event[i], callback, target)) {
          event.splice(i, 1);
          0 === event.length && this.events.delete(name);
          break;
        }
        var onceEvent = this.onceEvents.get(name);
        if (onceEvent) for (var i = 0, l = onceEvent.length; i < l; i++) if (this.compare(onceEvent[i], callback, target)) {
          onceEvent.splice(i, 1);
          0 === onceEvent.length && this.onceEvents.delete(name);
          break;
        }
      };
      EventManager.emit = function(name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        var event = this.events.get(name);
        if (event) for (var i = 0; i < event.length; i++) {
          var _a = event[i], callback = _a.callback, target = _a.target;
          callback.apply(target, args);
        }
        var onceEvent = this.onceEvents.get(name);
        if (onceEvent) {
          for (var i = 0; i < onceEvent.length; i++) {
            var _b = onceEvent[i], callback = _b.callback, target = _b.target;
            callback.apply(target, args);
          }
          this.onceEvents.delete(name);
        }
      };
      EventManager.remove = function(name) {
        this.events.has(name) && this.events.delete(name);
        this.onceEvents.has(name) && this.onceEvents.delete(name);
      };
      EventManager.removeAll = function() {
        this.events.clear();
        this.onceEvents.clear();
      };
      EventManager.compare = function(subscription, inCallback, inTarget) {
        var callback = subscription.callback, target = subscription.target;
        return target === inTarget && (callback === inCallback || callback.toString() === inCallback.toString());
      };
      EventManager.events = new Map();
      EventManager.onceEvents = new Map();
      return EventManager;
    }();
    exports.default = EventManager;
    cc._RF.pop();
  }, {} ],
  GaussianBlur: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f550cOVCwBCkIweEVb2yV8C", "GaussianBlur");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditorAsset_1 = require("../../misc/EditorAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder;
    var GaussianBlur = function(_super) {
      __extends(GaussianBlur, _super);
      function GaussianBlur() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effect = null;
        _this._radius = 10;
        _this.sprite = null;
        _this.material = null;
        return _this;
      }
      Object.defineProperty(GaussianBlur.prototype, "effect", {
        get: function() {
          return this._effect;
        },
        set: function(value) {
          this._effect = value;
          this.init();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GaussianBlur.prototype, "radius", {
        get: function() {
          return this._radius;
        },
        set: function(value) {
          this._radius = value > 50 ? 50 : value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      GaussianBlur.prototype.onLoad = function() {
        this.init();
      };
      GaussianBlur.prototype.resetInEditor = function() {
        this.init();
      };
      GaussianBlur.prototype.init = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              true;
              return [ 3, 2 ];

             case 1:
              _a.sent();
              _a.label = 2;

             case 2:
              if (!this._effect) return [ 2 ];
              this.sprite = this.node.getComponent(cc.Sprite);
              this.sprite.spriteFrame && (this.sprite.spriteFrame.getTexture().packable = false);
              this.material = cc.Material.create(this._effect);
              this.sprite.setMaterial(0, this.material);
              this.updateProperties();
              return [ 2 ];
            }
          });
        });
      };
      GaussianBlur.prototype.updateProperties = function() {
        this.material.setProperty("size", this.getNodeSize());
        this.material.setProperty("radius", this.radius);
      };
      GaussianBlur.prototype.getNodeSize = function() {
        return cc.v2(this.node.width, this.node.height);
      };
      __decorate([ property ], GaussianBlur.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false,
        readonly: true
      }) ], GaussianBlur.prototype, "effect", null);
      __decorate([ property ], GaussianBlur.prototype, "_radius", void 0);
      __decorate([ property({
        tooltip: false
      }) ], GaussianBlur.prototype, "radius", null);
      GaussianBlur = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple, executionOrder(-100) ], GaussianBlur);
      return GaussianBlur;
    }(cc.Component);
    exports.default = GaussianBlur;
    cc._RF.pop();
  }, {
    "../../misc/EditorAsset": "EditorAsset"
  } ],
  GeometryUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aeb79QTOtpMALa1FDHVgonp", "GeometryUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GeometryUtil = function() {
      function GeometryUtil() {}
      GeometryUtil.pointOnLine = function(p, a, b) {
        var ab = b.sub(a);
        var ap = p.sub(a);
        var collinear = 0 === ab.cross(ap).mag();
        var between = p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x) && p.y >= Math.min(a.y, b.y) && p.y <= Math.max(a.y, b.y);
        return collinear && between;
      };
      GeometryUtil.pointInTriangle = function(p, a, b, c) {
        function sameSide(_p, _a, _b, _c) {
          var ab = _b.sub(_a);
          var ac = _c.sub(_a);
          var ap = _p.sub(_a);
          var v1 = ab.cross(ac);
          var v2 = ab.cross(ap);
          return v1.dot(v2) >= 0;
        }
        return sameSide(p, a, b, c) && sameSide(p, b, c, a) && sameSide(p, c, a, b);
      };
      GeometryUtil.pointLineDistance = function(p, a, b) {
        var ab = b.sub(a);
        var ap = p.sub(a);
        var radians = cc.Vec3.angle(ab, ap);
        var length = ap.mag();
        var distance = Math.sin(radians) * length;
        return distance;
      };
      return GeometryUtil;
    }();
    exports.default = GeometryUtil;
    false;
    cc._RF.pop();
  }, {} ],
  GradientColor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72d61Yz231LY4HpNvsxGQdP", "GradientColor");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, executeInEditMode = _a.executeInEditMode, help = _a.help, menu = _a.menu;
    var GradientColor = function(_super) {
      __extends(GradientColor, _super);
      function GradientColor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._colors = [ cc.Color.RED, cc.Color.BLUE, cc.Color.RED, cc.Color.BLUE ];
        return _this;
      }
      Object.defineProperty(GradientColor.prototype, "colors", {
        get: function() {
          return this._colors;
        },
        set: function(colors) {
          colors.length > 4 && (colors.length = 4);
          this._colors = colors;
          this.markForRender();
        },
        enumerable: false,
        configurable: true
      });
      GradientColor.prototype.onEnable = function() {
        this.replaceFunction();
      };
      GradientColor.prototype.onDisable = function() {
        this.restoreFunction();
      };
      GradientColor.prototype.resetInEditor = function() {
        this.markForRender();
      };
      GradientColor.prototype.replaceFunction = function() {
        var _this = this;
        var renderComponent = this.getComponent(cc.RenderComponent);
        if (!renderComponent) return;
        var assembler = renderComponent._assembler;
        if (!(assembler instanceof cc.Assembler2D)) return;
        assembler.updateColor = function() {
          var uintVDatas = assembler._renderData.uintVDatas[0];
          if (!uintVDatas) return;
          var floatsPerVert = assembler.floatsPerVert;
          var colorOffset = assembler.colorOffset;
          var nodeColor = _this.node.color;
          var offset = 0;
          for (var i = colorOffset, l = uintVDatas.length; i < l; i += floatsPerVert) uintVDatas[i] = (_this.colors[offset++] || nodeColor)._val;
        };
        this.markForRender();
      };
      GradientColor.prototype.restoreFunction = function() {
        var renderComponent = this.getComponent(cc.RenderComponent);
        if (!renderComponent) return;
        var assembler = renderComponent._assembler;
        if (!(assembler instanceof cc.Assembler2D)) return;
        assembler.updateColor = cc.Assembler2D.prototype.updateColor;
        this.markForRender();
      };
      GradientColor.prototype.markForRender = function() {
        this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
      };
      __decorate([ property() ], GradientColor.prototype, "_colors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], GradientColor.prototype, "colors", null);
      GradientColor = __decorate([ ccclass, requireComponent(cc.RenderComponent), disallowMultiple, executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/renderers/GradientColor.ts"), menu("eazax/\u6e32\u67d3\u7ec4\u4ef6/GradientColor") ], GradientColor);
      return GradientColor;
    }(cc.Component);
    exports.default = GradientColor;
    cc._RF.pop();
  }, {} ],
  GuideItemBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c41cdamoftO5I+QfaaCZ4jN", "GuideItemBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GuideManager_1 = require("../core/GuideManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GuideItemBase = function(_super) {
      __extends(GuideItemBase, _super);
      function GuideItemBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.id = "";
        return _this;
      }
      GuideItemBase.prototype.onLoad = function() {
        this.registerEvent();
      };
      GuideItemBase.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      GuideItemBase.prototype.registerEvent = function() {
        cc.game.on(GuideManager_1.default.EventType.BROADCAST, this.onBroadcast, this);
      };
      GuideItemBase.prototype.unregisterEvent = function() {
        cc.game.off(GuideManager_1.default.EventType.BROADCAST, this.onBroadcast, this);
      };
      GuideItemBase.prototype.onBroadcast = function(id) {
        this.id === id && this.onTriggered();
      };
      GuideItemBase.prototype.onTriggered = function() {};
      __decorate([ property({
        tooltip: false
      }) ], GuideItemBase.prototype, "id", void 0);
      GuideItemBase = __decorate([ ccclass ], GuideItemBase);
      return GuideItemBase;
    }(cc.Component);
    exports.default = GuideItemBase;
    cc._RF.pop();
  }, {
    "../core/GuideManager": "GuideManager"
  } ],
  GuideManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d348ujpr1Je5BXS0MvjbTq", "GuideManager");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventType;
    (function(EventType) {
      EventType["BROADCAST"] = "guide-broadcast";
      EventType["STARTED"] = "guide-started";
      EventType["INTERRUPTED"] = "guide-interrupted";
      EventType["FINISHED"] = "guide-finished";
    })(EventType || (EventType = {}));
    var GuideManager = function() {
      function GuideManager() {}
      Object.defineProperty(GuideManager, "queue", {
        get: function() {
          return this._queue;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GuideManager, "current", {
        get: function() {
          return this._current;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GuideManager, "EventType", {
        get: function() {
          return EventType;
        },
        enumerable: false,
        configurable: true
      });
      GuideManager.init = function() {
        cc.game.on(GuideManager.EventType.STARTED, GuideManager.onStarted, GuideManager);
        cc.game.on(GuideManager.EventType.BROADCAST, GuideManager.onInterrupted, GuideManager);
        cc.game.on(GuideManager.EventType.FINISHED, GuideManager.onFinished, GuideManager);
      };
      GuideManager.show = function(ids) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        if (!this.inited) {
          this.inited = true;
          this.init();
        }
        "string" === typeof ids && (ids = [ ids ]);
        this._current || this.broadcast.apply(this, __spreadArrays([ ids.shift() ], args));
        (_a = this._queue).push.apply(_a, ids);
      };
      GuideManager.broadcast = function(id) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        cc.log("[GuideManager]", "broadcast", id);
        (_a = cc.game).emit.apply(_a, __spreadArrays([ GuideManager.EventType.BROADCAST, id ], args));
      };
      GuideManager.next = function() {};
      GuideManager.onStarted = function(id, item) {
        cc.log("[GuideManager]", "onStarted", id, item);
      };
      GuideManager.onInterrupted = function(id, item) {
        cc.log("[GuideManager]", "onInterrupted", id, item);
        this._current === id;
      };
      GuideManager.onFinished = function(id, item) {
        cc.log("[GuideManager]", "onFinished", id, item);
      };
      GuideManager._queue = [];
      GuideManager._current = null;
      GuideManager.inited = false;
      return GuideManager;
    }();
    exports.default = GuideManager;
    cc._RF.pop();
  }, {} ],
  GuideSequence: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a46a12YGhhHH59GCOdSnajB", "GuideSequence");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GuideManager_1 = require("../core/GuideManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GuideSequence = function(_super) {
      __extends(GuideSequence, _super);
      function GuideSequence() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ids = [];
        return _this;
      }
      GuideSequence.prototype.start = function() {
        this.ids.length > 0 && this.show();
      };
      GuideSequence.prototype.show = function() {
        GuideManager_1.default.show(this.ids);
      };
      __decorate([ property({
        tooltip: false
      }) ], GuideSequence.prototype, "ids", void 0);
      GuideSequence = __decorate([ ccclass ], GuideSequence);
      return GuideSequence;
    }(cc.Component);
    exports.default = GuideSequence;
    cc._RF.pop();
  }, {
    "../core/GuideManager": "GuideManager"
  } ],
  Hack_RunSpineInEditor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b398dqir49DTr6hUG36CwOz", "Hack_RunSpineInEditor");
    false;
    cc._RF.pop();
  }, {} ],
  Hack_ScrollView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30afd2d26hIn42/JWBCcpNC", "Hack_ScrollView");
    var _onTouchMoved_old = cc.ScrollView.prototype["_onTouchMoved"];
    cc.ScrollView.prototype["_onTouchMoved"] = function(event, captureListeners) {
      if (event.target !== this.node) return;
      _onTouchMoved_old.call(this, event, captureListeners);
    };
    cc._RF.pop();
  }, {} ],
  HollowOut: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ea60f2V5RO+IB+WDgN5MHK", "HollowOut");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HollowOutShape = void 0;
    var EditorAsset_1 = require("../../misc/EditorAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder;
    var HollowOutShape;
    (function(HollowOutShape) {
      HollowOutShape[HollowOutShape["Rect"] = 1] = "Rect";
      HollowOutShape[HollowOutShape["Circle"] = 2] = "Circle";
    })(HollowOutShape = exports.HollowOutShape || (exports.HollowOutShape = {}));
    var HollowOut = function(_super) {
      __extends(HollowOut, _super);
      function HollowOut() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effect = null;
        _this._shape = HollowOutShape.Rect;
        _this._center = cc.v2();
        _this._width = 300;
        _this._height = 300;
        _this._round = 1;
        _this._radius = 200;
        _this._feather = .5;
        _this.sprite = null;
        _this.material = null;
        _this.tweenRes = null;
        return _this;
      }
      Object.defineProperty(HollowOut.prototype, "effect", {
        get: function() {
          return this._effect;
        },
        set: function(value) {
          this._effect = value;
          this.init();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "shape", {
        get: function() {
          return this._shape;
        },
        set: function(value) {
          this._shape = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "center", {
        get: function() {
          return this._center;
        },
        set: function(value) {
          this._center = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "width", {
        get: function() {
          return this._width;
        },
        set: function(value) {
          this._width = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "height", {
        get: function() {
          return this._height;
        },
        set: function(value) {
          this._height = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "round", {
        get: function() {
          return this._round;
        },
        set: function(value) {
          this._round = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "radius", {
        get: function() {
          return this._radius;
        },
        set: function(value) {
          this._radius = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HollowOut.prototype, "feather", {
        get: function() {
          return this._feather;
        },
        set: function(value) {
          this._feather = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      HollowOut.prototype.onLoad = function() {
        this.init();
      };
      HollowOut.prototype.resetInEditor = function() {
        this.init();
      };
      HollowOut.prototype.init = function() {
        return __awaiter(this, void 0, void 0, function() {
          var sprite;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              true;
              return [ 3, 2 ];

             case 1:
              _a.sent();
              _a.label = 2;

             case 2:
              if (!this._effect) return [ 2 ];
              sprite = this.sprite = this.node.getComponent(cc.Sprite);
              sprite.spriteFrame && (sprite.spriteFrame.getTexture().packable = false);
              this.material = cc.Material.create(this._effect);
              sprite.setMaterial(0, this.material);
              this.updateProperties();
              return [ 2 ];
            }
          });
        });
      };
      HollowOut.prototype.updateProperties = function() {
        switch (this._shape) {
         case HollowOutShape.Rect:
          this.rect(this._center, this._width, this._height, this._round, this._feather);
          break;

         case HollowOutShape.Circle:
          this.circle(this._center, this._radius, this._feather);
        }
      };
      HollowOut.prototype.rect = function(center, width, height, round, feather) {
        this._shape = HollowOutShape.Rect;
        null != center && (this._center = center);
        null != width && (this._width = width);
        null != height && (this._height = height);
        if (null != round) {
          this._round = round >= 0 ? round : 0;
          var min = Math.min(this._width / 2, this._height / 2);
          this._round = this._round <= min ? this._round : min;
        }
        if (null != feather) {
          this._feather = feather >= 0 ? feather : 0;
          this._feather = this._feather <= this._round ? this._feather : this._round;
        }
        var material = this.material;
        material.setProperty("size", this.getNodeSize());
        material.setProperty("center", this.getCenter(this._center));
        material.setProperty("width", this.getWidth(this._width));
        material.setProperty("height", this.getHeight(this._height));
        material.setProperty("round", this.getRound(this._round));
        material.setProperty("feather", this.getFeather(this._feather));
      };
      HollowOut.prototype.circle = function(center, radius, feather) {
        this._shape = HollowOutShape.Circle;
        null != center && (this._center = center);
        null != radius && (this._radius = radius);
        null != feather && (this._feather = feather >= 0 ? feather : 0);
        var material = this.material;
        material.setProperty("size", this.getNodeSize());
        material.setProperty("center", this.getCenter(this._center));
        material.setProperty("width", this.getWidth(2 * this._radius));
        material.setProperty("height", this.getHeight(2 * this._radius));
        material.setProperty("round", this.getRound(this._radius));
        material.setProperty("feather", this.getFeather(this._feather));
      };
      HollowOut.prototype.rectTo = function(time, center, width, height, round, feather) {
        var _this = this;
        void 0 === round && (round = 0);
        void 0 === feather && (feather = 0);
        return new Promise(function(res) {
          _this._shape = HollowOutShape.Rect;
          cc.Tween.stopAllByTarget(_this);
          _this.unscheduleAllCallbacks();
          _this.tweenRes && _this.tweenRes();
          _this.tweenRes = res;
          round = Math.min(round, width / 2, height / 2);
          feather = Math.min(feather, round);
          cc.tween(_this).to(time, {
            center: center,
            width: width,
            height: height,
            round: round,
            feather: feather
          }).call(function() {
            _this.scheduleOnce(function() {
              if (_this.tweenRes) {
                _this.tweenRes();
                _this.tweenRes = null;
              }
            });
          }).start();
        });
      };
      HollowOut.prototype.circleTo = function(time, center, radius, feather) {
        var _this = this;
        void 0 === feather && (feather = 0);
        return new Promise(function(res) {
          _this._shape = HollowOutShape.Circle;
          cc.Tween.stopAllByTarget(_this);
          _this.unscheduleAllCallbacks();
          _this.tweenRes && _this.tweenRes();
          _this.tweenRes = res;
          cc.tween(_this).to(time, {
            center: center,
            radius: radius,
            feather: feather
          }).call(function() {
            _this.scheduleOnce(function() {
              if (_this.tweenRes) {
                _this.tweenRes();
                _this.tweenRes = null;
              }
            });
          }).start();
        });
      };
      HollowOut.prototype.reset = function() {
        this.rect(cc.v2(), 0, 0, 0, 0);
      };
      HollowOut.prototype.setNodeSize = function() {
        var node = this.node, width = node.width, height = node.height;
        this._radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        this.rect(node.getPosition(), width, height, 0, 0);
      };
      HollowOut.prototype.getCenter = function(center) {
        var node = this.node, width = node.width, height = node.height;
        var x = (center.x + width / 2) / width, y = (-center.y + height / 2) / height;
        return cc.v2(x, y);
      };
      HollowOut.prototype.getNodeSize = function() {
        return cc.v2(this.node.width, this.node.height);
      };
      HollowOut.prototype.getWidth = function(width) {
        return width / this.node.width;
      };
      HollowOut.prototype.getHeight = function(height) {
        return height / this.node.width;
      };
      HollowOut.prototype.getRound = function(round) {
        return round / this.node.width;
      };
      HollowOut.prototype.getFeather = function(feather) {
        return feather / this.node.width;
      };
      __decorate([ property ], HollowOut.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false,
        readonly: true
      }) ], HollowOut.prototype, "effect", null);
      __decorate([ property ], HollowOut.prototype, "_shape", void 0);
      __decorate([ property({
        type: cc.Enum(HollowOutShape),
        tooltip: false
      }) ], HollowOut.prototype, "shape", null);
      __decorate([ property ], HollowOut.prototype, "_center", void 0);
      __decorate([ property({
        tooltip: false
      }) ], HollowOut.prototype, "center", null);
      __decorate([ property ], HollowOut.prototype, "_width", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this._shape === HollowOutShape.Rect;
        }
      }) ], HollowOut.prototype, "width", null);
      __decorate([ property ], HollowOut.prototype, "_height", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this._shape === HollowOutShape.Rect;
        }
      }) ], HollowOut.prototype, "height", null);
      __decorate([ property ], HollowOut.prototype, "_round", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this._shape === HollowOutShape.Rect;
        }
      }) ], HollowOut.prototype, "round", null);
      __decorate([ property ], HollowOut.prototype, "_radius", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this._shape === HollowOutShape.Circle;
        }
      }) ], HollowOut.prototype, "radius", null);
      __decorate([ property ], HollowOut.prototype, "_feather", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this._shape === HollowOutShape.Circle || this.round > 0;
        }
      }) ], HollowOut.prototype, "feather", null);
      HollowOut = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple, executionOrder(-10) ], HollowOut);
      return HollowOut;
    }(cc.Component);
    exports.default = HollowOut;
    cc._RF.pop();
  }, {
    "../../misc/EditorAsset": "EditorAsset"
  } ],
  Home_CaseBtn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb0069qJgRMG64bpcpdzHpM", "Home_CaseBtn");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CaseManager_1 = require("../../common/CaseManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Home_CaseBtn = function(_super) {
      __extends(Home_CaseBtn, _super);
      function Home_CaseBtn() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.caseName = null;
        return _this;
      }
      Home_CaseBtn.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Home_CaseBtn.prototype.start = function() {
        this.reset();
      };
      Home_CaseBtn.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Home_CaseBtn.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Home_CaseBtn.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Home_CaseBtn.prototype.init = function() {};
      Home_CaseBtn.prototype.reset = function() {};
      Home_CaseBtn.prototype.onClick = function() {
        CaseManager_1.default.goCase(this.caseName);
      };
      Home_CaseBtn.prototype.set = function(caseName, info) {
        this.caseName = caseName;
        this.nameLabel.string = info.name;
      };
      __decorate([ property(cc.Label) ], Home_CaseBtn.prototype, "nameLabel", void 0);
      Home_CaseBtn = __decorate([ ccclass ], Home_CaseBtn);
      return Home_CaseBtn;
    }(cc.Component);
    exports.default = Home_CaseBtn;
    cc._RF.pop();
  }, {
    "../../common/CaseManager": "CaseManager"
  } ],
  Home_CaseList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2154bCWMgJGPLI4JDK7owxR", "Home_CaseList");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CaseList_1 = require("../../common/CaseList");
    var Home_CaseBtn_1 = require("./Home_CaseBtn");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Home_CaseList = function(_super) {
      __extends(Home_CaseList, _super);
      function Home_CaseList() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.btnPrefab = null;
        return _this;
      }
      Home_CaseList.prototype.start = function() {
        this.generate();
      };
      Home_CaseList.prototype.generate = function() {
        var container = this.container, prefab = this.btnPrefab;
        container.destroyAllChildren();
        for (var key in CaseList_1.CaseInfoMap) {
          var node = cc.instantiate(prefab);
          node.getComponent(Home_CaseBtn_1.default).set(key, CaseList_1.CaseInfoMap[key]);
          node.setParent(container);
        }
      };
      __decorate([ property(cc.Node) ], Home_CaseList.prototype, "container", void 0);
      __decorate([ property(cc.Prefab) ], Home_CaseList.prototype, "btnPrefab", void 0);
      Home_CaseList = __decorate([ ccclass ], Home_CaseList);
      return Home_CaseList;
    }(cc.Component);
    exports.default = Home_CaseList;
    cc._RF.pop();
  }, {
    "../../common/CaseList": "CaseList",
    "./Home_CaseBtn": "Home_CaseBtn"
  } ],
  Home_Content: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe1924BPtRIy6UHAj8LyHbt", "Home_Content");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Home_Content = function(_super) {
      __extends(Home_Content, _super);
      function Home_Content() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Home_Content = __decorate([ ccclass ], Home_Content);
      return Home_Content;
    }(cc.Component);
    exports.default = Home_Content;
    cc._RF.pop();
  }, {} ],
  Home_UI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b0acqCn/9E2JVAPHN5qPEE", "Home_UI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager_1 = require("../../eazax-ccc/core/EventManager");
    var SceneNavigator_1 = require("../../eazax-ccc/core/SceneNavigator");
    var Constants_1 = require("../common/constants/Constants");
    var CustomEvents_1 = require("../common/constants/CustomEvents");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Home_UI = function(_super) {
      __extends(Home_UI, _super);
      function Home_UI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.aboutBtn = null;
        return _this;
      }
      Home_UI.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Home_UI.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Home_UI.prototype.registerEvent = function() {
        this.aboutBtn.on(cc.Node.EventType.TOUCH_END, this.onAboutBtnClick, this);
      };
      Home_UI.prototype.unregisterEvent = function() {};
      Home_UI.prototype.init = function() {};
      Home_UI.prototype.onAboutBtnClick = function() {
        SceneNavigator_1.default.go("about", false, function() {
          EventManager_1.default.emit(CustomEvents_1.SWITCH_CASE, Constants_1.SceneName.About);
        });
      };
      __decorate([ property(cc.Node) ], Home_UI.prototype, "aboutBtn", void 0);
      Home_UI = __decorate([ ccclass ], Home_UI);
      return Home_UI;
    }(cc.Component);
    exports.default = Home_UI;
    cc._RF.pop();
  }, {
    "../../eazax-ccc/core/EventManager": "EventManager",
    "../../eazax-ccc/core/SceneNavigator": "SceneNavigator",
    "../common/constants/Constants": "Constants",
    "../common/constants/CustomEvents": "CustomEvents"
  } ],
  Home: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25566cocBlKmoVdf7n3NiKX", "Home");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BrowserUtil_1 = require("../../eazax-ccc/utils/BrowserUtil");
    var PopupManager_1 = require("../../eazax-ccc/core/PopupManager");
    var SceneNavigator_1 = require("../../eazax-ccc/core/SceneNavigator");
    var Constants_1 = require("../common/constants/Constants");
    var CaseManager_1 = require("../common/CaseManager");
    var LoadingTip_1 = require("../common/components/global/LoadingTip");
    var TextureUsage_1 = require("../common/components/global/TextureUsage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var Home = function(_super) {
      __extends(Home, _super);
      function Home() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Home.prototype.onLoad = function() {
        this.init();
      };
      Home.prototype.start = function() {
        this.detectCaseParam();
      };
      Home.prototype.init = function() {
        SceneNavigator_1.default.setHome(Constants_1.SceneName.Home);
        PopupManager_1.default.loadStartCallback = function() {
          return LoadingTip_1.default.show();
        };
        PopupManager_1.default.loadFinishCallback = function() {
          return LoadingTip_1.default.hide();
        };
        TextureUsage_1.default.show();
      };
      Home.prototype.detectCaseParam = function() {
        var caseName = BrowserUtil_1.default.getUrlParam("case");
        if (caseName) {
          var ok = CaseManager_1.default.goCase(caseName);
          !ok && false;
        }
      };
      Home = __decorate([ ccclass, executionOrder(-100) ], Home);
      return Home;
    }(cc.Component);
    exports.default = Home;
    cc._RF.pop();
  }, {
    "../../eazax-ccc/core/PopupManager": "PopupManager",
    "../../eazax-ccc/core/SceneNavigator": "SceneNavigator",
    "../../eazax-ccc/utils/BrowserUtil": "BrowserUtil",
    "../common/CaseManager": "CaseManager",
    "../common/components/global/LoadingTip": "LoadingTip",
    "../common/components/global/TextureUsage": "TextureUsage",
    "../common/constants/Constants": "Constants"
  } ],
  ImageUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "24dc1M+91dNJ4Rf8evARs5H", "ImageUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ImageUtil = function() {
      function ImageUtil() {}
      ImageUtil.getTrim = function(data, width, height) {
        var minX = 0, maxX = 0, minY = 0, maxY = 0;
        var i = 0, j = 0;
        var lineWidth = 4 * width;
        left: for (i = 0; i < width; i++) for (j = 0; j < height; j++) {
          var index = lineWidth * j + 4 * i + 3;
          if (0 !== data[index]) break left;
        }
        minX = i;
        right: for (i = width - 1; i >= 0; i--) for (j = 0; j < height; j++) {
          var index = lineWidth * j + 4 * i + 3;
          if (0 !== data[index]) break right;
        }
        maxX = i + 1;
        top: for (i = 0; i < height; i++) for (j = 0; j < width; j++) {
          var index = lineWidth * i + 4 * j + 3;
          if (0 !== data[index]) break top;
        }
        minY = i;
        bottom: for (i = height - 1; i >= 0; i--) for (j = 0; j < width; j++) {
          var index = lineWidth * i + 4 * j + 3;
          if (0 !== data[index]) break bottom;
        }
        maxY = i + 1;
        return {
          minX: minX,
          maxX: maxX,
          minY: minY,
          maxY: maxY
        };
      };
      ImageUtil.getPixelsData = function(texture) {
        if (!window || !window.document) return null;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var width = texture.width, height = texture.height;
        canvas.width = width;
        canvas.height = height;
        var image = texture.getHtmlElementObj();
        ctx.drawImage(image, 0, 0, width, height);
        var imageData = ctx.getImageData(0, 0, width, height);
        image.remove();
        canvas.remove();
        return new Uint8Array(imageData.data);
      };
      ImageUtil.getPixelColor = function(texture, x, y) {
        if (!window || !window.document) return null;
        var pixelsData = ImageUtil.getPixelsData(texture), width = texture.width;
        var index = 4 * width * Math.floor(y) + 4 * Math.floor(x), data = pixelsData.slice(index, index + 4), color = cc.color(data[0], data[1], data[2], data[3]);
        return color;
      };
      ImageUtil.imageToBase64 = function(url, callback) {
        return new Promise(function(res) {
          var _a;
          var extname = null === (_a = /\.png|\.jpg|\.jpeg/.exec(url)) || void 0 === _a ? void 0 : _a[0];
          if ([ ".png", ".jpg", ".jpeg" ].includes(extname)) {
            var canvas_1 = document.createElement("canvas");
            var ctx_1 = canvas_1.getContext("2d");
            var image_1 = new Image();
            image_1.src = url;
            image_1.onload = function() {
              canvas_1.height = image_1.height;
              canvas_1.width = image_1.width;
              ctx_1.drawImage(image_1, 0, 0);
              extname = ".jpg" === extname ? "jpeg" : extname.replace(".", "");
              var dataURL = canvas_1.toDataURL("image/" + extname);
              callback && callback(dataURL);
              res(dataURL);
              image_1.remove();
              canvas_1.remove();
            };
          } else {
            console.warn("Not a jpg/jpeg or png resource!");
            callback && callback(null);
            res(null);
          }
        });
      };
      ImageUtil.base64ToCCTexture = function(base64) {
        if (!window || !window.document) return null;
        var image = new Image();
        image.src = base64;
        var texture = new cc.Texture2D();
        texture.initWithElement(image);
        image.remove();
        return texture;
      };
      return ImageUtil;
    }();
    exports.default = ImageUtil;
    cc._RF.pop();
  }, {} ],
  InstanceEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e5b7ZoW8FHbo2+rROOT/5g", "InstanceEvent");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InstanceEvent = void 0;
    var InstanceEvent = function() {
      function InstanceEvent() {
        this.events = null;
        this.onceEvents = null;
        this.events = new Array();
        this.onceEvents = new Array();
      }
      InstanceEvent.prototype.on = function(callback, target) {
        this.events.push({
          callback: callback,
          target: target
        });
      };
      InstanceEvent.prototype.once = function(callback, target) {
        this.onceEvents.push({
          callback: callback,
          target: target
        });
      };
      InstanceEvent.prototype.off = function(callback, target) {
        for (var i = 0; i < this.events.length; i++) this.events[i].callback !== callback || target && this.events[i].target !== target || this.events.splice(i, 1);
        for (var i = 0; i < this.onceEvents.length; i++) this.onceEvents[i].callback !== callback || target && this.onceEvents[i].target !== target || this.onceEvents.splice(i, 1);
      };
      InstanceEvent.prototype.emit = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var promises = [];
        for (var i = 0; i < this.events.length; i++) promises.push(this.events[i].callback.apply(this.events[i].target, args));
        for (var i = 0; i < this.onceEvents.length; i++) promises.push(this.onceEvents[i].callback.apply(this.onceEvents[i].target, args));
        this.onceEvents.length = 0;
        return Promise.all(promises);
      };
      InstanceEvent.prototype.removeAll = function() {
        this.events.length = 0;
        this.onceEvents.length = 0;
      };
      return InstanceEvent;
    }();
    exports.InstanceEvent = InstanceEvent;
    cc._RF.pop();
  }, {} ],
  JellyTween: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc72cElpc1BHpnyDh2UMQQh", "JellyTween");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var JellyTween = function(_super) {
      __extends(JellyTween, _super);
      function JellyTween() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.frequency = 4;
        _this.decay = 2;
        _this.pressScale = .2;
        _this.totalTime = 1;
        _this.interval = 1;
        _this.playOnLoad = false;
        _this.originalScale = 1;
        _this.tween = null;
        return _this;
      }
      JellyTween.prototype.start = function() {
        this.originalScale = this.node.scale;
        this.playOnLoad && this.play();
      };
      JellyTween.prototype.play = function(repeatTimes) {
        var _this = this;
        var times = void 0 != repeatTimes && repeatTimes > 0 ? repeatTimes : 1e9;
        var pressTime = .2 * this.totalTime;
        var scaleBackTime = .15 * this.totalTime;
        var bouncingTime = .65 * this.totalTime;
        var amplitude = this.pressScale / scaleBackTime;
        this.tween = cc.tween(this.node).repeat(times, cc.tween().to(pressTime, {
          scaleX: this.originalScale + this.pressScale,
          scaleY: this.originalScale - this.pressScale
        }, {
          easing: "sineOut"
        }).to(scaleBackTime, {
          scaleX: this.originalScale,
          scaleY: this.originalScale
        }).to(bouncingTime, {
          scaleX: {
            value: this.originalScale,
            progress: function(start, end, current, t) {
              return end - _this.getDifference(amplitude, t);
            }
          },
          scaleY: {
            value: this.originalScale,
            progress: function(start, end, current, t) {
              return end + _this.getDifference(amplitude, t);
            }
          }
        }).delay(this.interval)).start();
      };
      JellyTween.prototype.stop = function() {
        this.tween && this.tween.stop();
        this.node.setScale(this.originalScale);
      };
      JellyTween.prototype.getDifference = function(amplitude, time) {
        var angularVelocity = this.frequency * Math.PI * 2;
        return amplitude * (Math.sin(time * angularVelocity) / Math.exp(this.decay * time) / angularVelocity);
      };
      __decorate([ property({
        tooltip: false
      }) ], JellyTween.prototype, "frequency", void 0);
      __decorate([ property({
        tooltip: false
      }) ], JellyTween.prototype, "decay", void 0);
      __decorate([ property({
        tooltip: false
      }) ], JellyTween.prototype, "pressScale", void 0);
      __decorate([ property({
        tooltip: false
      }) ], JellyTween.prototype, "totalTime", void 0);
      __decorate([ property({
        tooltip: false
      }) ], JellyTween.prototype, "interval", void 0);
      __decorate([ property({
        tooltip: false
      }) ], JellyTween.prototype, "playOnLoad", void 0);
      JellyTween = __decorate([ ccclass ], JellyTween);
      return JellyTween;
    }(cc.Component);
    exports.default = JellyTween;
    cc._RF.pop();
  }, {} ],
  LoadingTip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a6a6v9xNlGP7ZxoJbg3IJd", "LoadingTip");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var LoadingTip = function(_super) {
      __extends(LoadingTip, _super);
      function LoadingTip() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        return _this;
      }
      LoadingTip_1 = LoadingTip;
      LoadingTip.prototype.onLoad = function() {
        this.init();
      };
      LoadingTip.prototype.onDestroy = function() {
        this.release();
      };
      LoadingTip.prototype.init = function() {
        LoadingTip_1.instance = this;
        this.reset();
      };
      LoadingTip.prototype.release = function() {
        LoadingTip_1.instance && (LoadingTip_1.instance = null);
      };
      LoadingTip.prototype.reset = function() {
        this.main.active = false;
      };
      LoadingTip.prototype.show = function() {
        var node = this.main;
        node.active = true;
      };
      LoadingTip.prototype.hide = function() {
        var node = this.main;
        node.active = false;
      };
      LoadingTip.show = function() {
        if (!this.instance) return;
        this.instance.show();
      };
      LoadingTip.hide = function() {
        if (!this.instance) return;
        this.instance.hide();
      };
      var LoadingTip_1;
      LoadingTip.instance = null;
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], LoadingTip.prototype, "main", void 0);
      LoadingTip = LoadingTip_1 = __decorate([ ccclass ], LoadingTip);
      return LoadingTip;
    }(cc.Component);
    exports.default = LoadingTip;
    cc._RF.pop();
  }, {} ],
  LocalizationBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2da35x6KthImKlsTLjYrDi5", "LocalizationBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DefaultLang = exports.Lang = exports.LANG_CHANGED = void 0;
    var EventManager_1 = require("../../core/EventManager");
    exports.LANG_CHANGED = "lang-change";
    var Lang;
    (function(Lang) {
      Lang["Cn"] = "cn";
      Lang["Eng"] = "eng";
    })(Lang = exports.Lang || (exports.Lang = {}));
    var DefaultLang;
    (function(DefaultLang) {
      DefaultLang[DefaultLang["cn"] = 1] = "cn";
      DefaultLang[DefaultLang["eng"] = 2] = "eng";
    })(DefaultLang = exports.DefaultLang || (exports.DefaultLang = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LocalizationBase = function(_super) {
      __extends(LocalizationBase, _super);
      function LocalizationBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.defaultLang = DefaultLang.cn;
        _this.curLang = Lang.Cn;
        _this.langChanged = function(lang) {
          _this.curLang = lang;
          _this.onLangChanged(lang);
        };
        return _this;
      }
      LocalizationBase.prototype.onLoad = function() {
        EventManager_1.default.on(exports.LANG_CHANGED, this.langChanged, this);
      };
      LocalizationBase.prototype.onDestroy = function() {
        EventManager_1.default.off(exports.LANG_CHANGED, this.langChanged, this);
      };
      LocalizationBase.prototype.onLangChanged = function(lang) {};
      LocalizationBase.prototype.get = function() {
        return this[this.curLang] ? Array.isArray(this[this.curLang]) && 0 === this[this.curLang].length ? this[DefaultLang[this.defaultLang]] : this[this.curLang] : this[DefaultLang[this.defaultLang]];
      };
      __decorate([ property({
        type: cc.Enum(DefaultLang),
        tooltip: false
      }) ], LocalizationBase.prototype, "defaultLang", void 0);
      LocalizationBase = __decorate([ ccclass ], LocalizationBase);
      return LocalizationBase;
    }(cc.Component);
    exports.default = LocalizationBase;
    cc._RF.pop();
  }, {
    "../../core/EventManager": "EventManager"
  } ],
  LocalizationLabelString: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "526f8Shm4BDLpHAiRDRJtQz", "LocalizationLabelString");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LocalizationBase_1 = require("./LocalizationBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var LocalizationLabelString = function(_super) {
      __extends(LocalizationLabelString, _super);
      function LocalizationLabelString() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cn = "";
        _this.eng = "";
        _this.label = null;
        return _this;
      }
      LocalizationLabelString.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.label = this.node.getComponent(cc.Label);
      };
      LocalizationLabelString.prototype.onLangChanged = function() {
        this.label && (this.label.string = this.get());
      };
      __decorate([ property() ], LocalizationLabelString.prototype, "cn", void 0);
      __decorate([ property() ], LocalizationLabelString.prototype, "eng", void 0);
      LocalizationLabelString = __decorate([ ccclass, requireComponent(cc.Label) ], LocalizationLabelString);
      return LocalizationLabelString;
    }(LocalizationBase_1.default);
    exports.default = LocalizationLabelString;
    cc._RF.pop();
  }, {
    "./LocalizationBase": "LocalizationBase"
  } ],
  LocalizationSpriteFrame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b7fb1M65dDXr7mGqAb8NT8", "LocalizationSpriteFrame");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LocalizationBase_1 = require("./LocalizationBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var LocalizationSpriteFrame = function(_super) {
      __extends(LocalizationSpriteFrame, _super);
      function LocalizationSpriteFrame() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cn = null;
        _this.eng = null;
        _this.sprite = null;
        return _this;
      }
      LocalizationSpriteFrame.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.sprite = this.node.getComponent(cc.Sprite);
      };
      LocalizationSpriteFrame.prototype.onLangChanged = function() {
        this.sprite && (this.sprite.spriteFrame = this.get());
      };
      __decorate([ property(cc.SpriteFrame) ], LocalizationSpriteFrame.prototype, "cn", void 0);
      __decorate([ property(cc.SpriteFrame) ], LocalizationSpriteFrame.prototype, "eng", void 0);
      LocalizationSpriteFrame = __decorate([ ccclass, requireComponent(cc.Sprite) ], LocalizationSpriteFrame);
      return LocalizationSpriteFrame;
    }(LocalizationBase_1.default);
    exports.default = LocalizationSpriteFrame;
    cc._RF.pop();
  }, {
    "./LocalizationBase": "LocalizationBase"
  } ],
  LongPress: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dcd9cs7q9MNY+LUd0TPUX+", "LongPress");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TriggerWay = exports.LONG_PRESS = void 0;
    exports.LONG_PRESS = "longpress";
    var TriggerWay;
    (function(TriggerWay) {
      TriggerWay[TriggerWay["Immediately"] = 1] = "Immediately";
      TriggerWay[TriggerWay["AfterLoosing"] = 2] = "AfterLoosing";
    })(TriggerWay = exports.TriggerWay || (exports.TriggerWay = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LongPress = function(_super) {
      __extends(LongPress, _super);
      function LongPress() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.trggerTime = 2;
        _this.trggerWay = TriggerWay.Immediately;
        _this.longPressEvents = [];
        _this.hasAccomplished = false;
        return _this;
      }
      LongPress.prototype.onEnable = function() {
        this.registerNodeEvent();
      };
      LongPress.prototype.onDisable = function() {
        this.unregisterNodeEvent();
      };
      LongPress.prototype.registerNodeEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
      };
      LongPress.prototype.unregisterNodeEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
      };
      LongPress.prototype.onTouchStart = function() {
        this.hasAccomplished = false;
        this.scheduleOnce(this.onPressAccomplished.bind(this), this.trggerTime);
      };
      LongPress.prototype.onTouchEnd = function() {
        if (this.hasAccomplished) {
          this.hasAccomplished = false;
          this.trigger();
        }
        this.unscheduleAllCallbacks();
      };
      LongPress.prototype.onTouchCancel = function() {
        if (this.hasAccomplished) {
          this.hasAccomplished = false;
          this.trigger();
        }
        this.unscheduleAllCallbacks();
      };
      LongPress.prototype.onPressAccomplished = function() {
        this.trggerWay === TriggerWay.Immediately ? this.trigger() : this.trggerWay === TriggerWay.AfterLoosing && (this.hasAccomplished = true);
      };
      LongPress.prototype.trigger = function() {
        cc.Component.EventHandler.emitEvents(this.longPressEvents, this);
        this.node.emit(exports.LONG_PRESS, this);
      };
      __decorate([ property({
        tooltip: false
      }) ], LongPress.prototype, "trggerTime", void 0);
      __decorate([ property({
        type: cc.Enum(TriggerWay),
        tooltip: false
      }) ], LongPress.prototype, "trggerWay", void 0);
      __decorate([ property({
        type: cc.Component.EventHandler,
        tooltip: false
      }) ], LongPress.prototype, "longPressEvents", void 0);
      LongPress = __decorate([ ccclass ], LongPress);
      return LongPress;
    }(cc.Component);
    exports.default = LongPress;
    cc._RF.pop();
  }, {} ],
  MarchingSquares: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1765/mh59PQ7K6SHAzqmO2", "MarchingSquares");
    "use strict";
    (function(window) {
      var MarchingSquares = {};
      MarchingSquares.NONE = 0;
      MarchingSquares.UP = 1;
      MarchingSquares.LEFT = 2;
      MarchingSquares.DOWN = 3;
      MarchingSquares.RIGHT = 4;
      MarchingSquares.getBlobOutlinePoints = function(sourceCanvas) {
        MarchingSquares.sourceCanvas = document.createElement("canvas");
        MarchingSquares.sourceCanvas.width = sourceCanvas.width + 2;
        MarchingSquares.sourceCanvas.height = sourceCanvas.height + 2;
        MarchingSquares.sourceContext = MarchingSquares.sourceCanvas.getContext("2d");
        MarchingSquares.sourceContext.drawImage(sourceCanvas, 1, 1);
        var startingPoint = MarchingSquares.getFirstNonTransparentPixelTopDown(MarchingSquares.sourceCanvas);
        return MarchingSquares.walkPerimeter(startingPoint.x, startingPoint.y);
      };
      MarchingSquares.getFirstNonTransparentPixelTopDown = function(canvas) {
        var context = canvas.getContext("2d");
        var y, i, rowData;
        for (y = 0; y < canvas.height; y++) {
          rowData = context.getImageData(0, y, canvas.width, 1).data;
          for (i = 0; i < rowData.length; i += 4) if (rowData[i + 3] > 0) return {
            x: i / 4,
            y: y
          };
        }
        return null;
      };
      MarchingSquares.walkPerimeter = function(startX, startY) {
        startX < 0 && (startX = 0);
        startX > MarchingSquares.sourceCanvas.width && (startX = MarchingSquares.sourceCanvas.width);
        startY < 0 && (startY = 0);
        startY > MarchingSquares.sourceCanvas.height && (startY = MarchingSquares.sourceCanvas.height);
        var pointList = [];
        var x = startX;
        var y = startY;
        var imageData = MarchingSquares.sourceContext.getImageData(0, 0, MarchingSquares.sourceCanvas.width, MarchingSquares.sourceCanvas.height);
        var index, width4 = 4 * imageData.width;
        do {
          index = (y - 1) * width4 + 4 * (x - 1);
          MarchingSquares.step(index, imageData.data, width4);
          x >= 0 && x < MarchingSquares.sourceCanvas.width && y >= 0 && y < MarchingSquares.sourceCanvas.height && pointList.push(x - 2, y - 1);
          switch (MarchingSquares.nextStep) {
           case MarchingSquares.UP:
            y--;
            break;

           case MarchingSquares.LEFT:
            x--;
            break;

           case MarchingSquares.DOWN:
            y++;
            break;

           case MarchingSquares.RIGHT:
            x++;
          }
        } while (x != startX || y != startY);
        pointList.push(x - 1, y - 1);
        return pointList;
      };
      MarchingSquares.step = function(index, data, width4) {
        MarchingSquares.upLeft = data[index + 3] > 0;
        MarchingSquares.upRight = data[index + 7] > 0;
        MarchingSquares.downLeft = data[index + width4 + 3] > 0;
        MarchingSquares.downRight = data[index + width4 + 7] > 0;
        MarchingSquares.previousStep = MarchingSquares.nextStep;
        MarchingSquares.state = 0;
        MarchingSquares.upLeft && (MarchingSquares.state |= 1);
        MarchingSquares.upRight && (MarchingSquares.state |= 2);
        MarchingSquares.downLeft && (MarchingSquares.state |= 4);
        MarchingSquares.downRight && (MarchingSquares.state |= 8);
        switch (MarchingSquares.state) {
         case 1:
          MarchingSquares.nextStep = MarchingSquares.UP;
          break;

         case 2:
         case 3:
          MarchingSquares.nextStep = MarchingSquares.RIGHT;
          break;

         case 4:
          MarchingSquares.nextStep = MarchingSquares.LEFT;
          break;

         case 5:
          MarchingSquares.nextStep = MarchingSquares.UP;
          break;

         case 6:
          MarchingSquares.previousStep == MarchingSquares.UP ? MarchingSquares.nextStep = MarchingSquares.LEFT : MarchingSquares.nextStep = MarchingSquares.RIGHT;
          break;

         case 7:
          MarchingSquares.nextStep = MarchingSquares.RIGHT;
          break;

         case 8:
          MarchingSquares.nextStep = MarchingSquares.DOWN;
          break;

         case 9:
          MarchingSquares.previousStep == MarchingSquares.RIGHT ? MarchingSquares.nextStep = MarchingSquares.UP : MarchingSquares.nextStep = MarchingSquares.DOWN;
          break;

         case 10:
         case 11:
          MarchingSquares.nextStep = MarchingSquares.DOWN;
          break;

         case 12:
          MarchingSquares.nextStep = MarchingSquares.LEFT;
          break;

         case 13:
          MarchingSquares.nextStep = MarchingSquares.UP;
          break;

         case 14:
          MarchingSquares.nextStep = MarchingSquares.LEFT;
          break;

         default:
          MarchingSquares.nextStep = MarchingSquares.NONE;
        }
      };
      window.MarchingSquares = MarchingSquares;
    })(window);
    cc._RF.pop();
  }, {} ],
  Marquee: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fbc9dvqZdRO6rqKofACuje5", "Marquee");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Marquee = function(_super) {
      __extends(Marquee, _super);
      function Marquee() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.view = null;
        _this.label = null;
        _this.texts = [];
        _this.speed = 1;
        _this.loop = false;
        _this.playOnLoad = false;
        _this.index = 0;
        _this.isPlaying = false;
        _this.endCallback = null;
        return _this;
      }
      Marquee.prototype.onLoad = function() {
        this.init();
        this.playOnLoad && this.play(0, this.loop);
      };
      Marquee.prototype.update = function(dt) {
        if (!this.isPlaying || 0 === this.texts.length) return;
        this.updatePosition();
      };
      Marquee.prototype.init = function() {
        this.label.node.anchorX = 0;
        this.setLabel("");
      };
      Marquee.prototype.updatePosition = function() {
        this.label.node.x -= this.speed;
        this.label.node.x <= -(this.view.width / 2 + this.label.node.width) && this.next();
      };
      Marquee.prototype.setLabel = function(text) {
        this.label.string = text;
        this.label.node.x = this.view.width / 2;
      };
      Marquee.prototype.next = function() {
        this.index++;
        if (this.index >= this.texts.length) if (this.loop) {
          this.index = 0;
          this.setLabel(this.texts[0]);
        } else {
          if (this.endCallback) {
            this.endCallback();
            this.endCallback = null;
          }
          this.clean();
        } else this.setLabel(this.texts[this.index]);
      };
      Marquee.prototype.push = function(texts) {
        var _a;
        Array.isArray(texts) ? (_a = this.texts).push.apply(_a, texts) : this.texts.push(texts);
      };
      Marquee.prototype.play = function(index, loop, callback) {
        void 0 === index && (index = 0);
        void 0 === loop && (loop = false);
        void 0 === callback && (callback = null);
        if (0 === this.texts.length) return;
        this.index = index < this.texts.length ? index : 0;
        this.setLabel(this.texts[this.index]);
        this.loop = loop;
        this.endCallback = callback;
        this.isPlaying = true;
      };
      Marquee.prototype.stop = function() {
        this.isPlaying = false;
        this.index = 0;
      };
      Marquee.prototype.pause = function() {
        this.isPlaying = false;
      };
      Marquee.prototype.resume = function() {
        this.isPlaying = true;
      };
      Marquee.prototype.clean = function() {
        this.stop();
        this.index = 0;
        this.texts = [];
        this.endCallback = null;
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], Marquee.prototype, "view", void 0);
      __decorate([ property({
        type: cc.RichText,
        tooltip: false
      }) ], Marquee.prototype, "label", void 0);
      __decorate([ property({
        tooltip: "\u6587\u672c\u961f\u5217"
      }) ], Marquee.prototype, "texts", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Marquee.prototype, "speed", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Marquee.prototype, "loop", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Marquee.prototype, "playOnLoad", void 0);
      Marquee = __decorate([ ccclass ], Marquee);
      return Marquee;
    }(cc.Component);
    exports.default = Marquee;
    cc._RF.pop();
  }, {} ],
  MathUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4decaALYrFHY67N5M180Dt0", "MathUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MathUtil = function() {
      function MathUtil() {}
      MathUtil.getRandomInt = function(min, max) {
        void 0 === min && (min = 0);
        void 0 === max && (max = 1);
        return Math.floor(Math.random() * (max - min) + min);
      };
      MathUtil.getPseudoRandomInt = function(seed, key) {
        return Math.ceil((9301 * seed + 49297) % 233280 / 233280 * key);
      };
      MathUtil.getAngle = function(p1, p2) {
        return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
      };
      MathUtil.getDistance = function(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      };
      MathUtil.angleToRadian = function(angle) {
        return angle * Math.PI / 180;
      };
      MathUtil.addSafely = function(a, b) {
        var aDigits = (a.toString().split(".")[1] || "").length;
        var bDigits = (b.toString().split(".")[1] || "").length;
        var multiplier = Math.pow(10, Math.max(aDigits, bDigits));
        return (a * multiplier + b * multiplier) / multiplier;
      };
      return MathUtil;
    }();
    exports.default = MathUtil;
    cc._RF.pop();
  }, {} ],
  Mosaic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd9c41LXaRE27sI72UX4CGD", "Mosaic");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditorAsset_1 = require("../../misc/EditorAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple;
    var Mosaic = function(_super) {
      __extends(Mosaic, _super);
      function Mosaic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effect = null;
        _this._size = new cc.Size(20, 20);
        _this.sprite = null;
        _this.material = null;
        return _this;
      }
      Object.defineProperty(Mosaic.prototype, "effect", {
        get: function() {
          return this._effect;
        },
        set: function(value) {
          this._effect = value;
          this.init();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Mosaic.prototype, "size", {
        get: function() {
          return this._size;
        },
        set: function(value) {
          this._size = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Mosaic.prototype.onEnable = function() {
        this.init();
      };
      Mosaic.prototype.resetInEditor = function() {
        this.init();
      };
      Mosaic.prototype.init = function() {
        return __awaiter(this, void 0, void 0, function() {
          var path, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              true;
              return [ 3, 2 ];

             case 1:
              _a._effect = _b.sent();
              _b.label = 2;

             case 2:
              if (!this._effect) {
                cc.warn("[" + this["__proto__"]["__classname__"] + "]", "\u8bf7\u624b\u52a8\u6307\u5b9a\u7ec4\u4ef6\u7684 Effect \u8d44\u6e90\uff01");
                return [ 2 ];
              }
              this.sprite = this.node.getComponent(cc.Sprite);
              this.sprite.spriteFrame && (this.sprite.spriteFrame.getTexture().packable = false);
              this.material || (this.material = cc.Material.create(this._effect));
              this.sprite.setMaterial(0, this.material);
              this.updateProperties();
              return [ 2 ];
            }
          });
        });
      };
      Mosaic.prototype.updateProperties = function() {
        if (!this.material) return;
        this.material.setProperty("resolution", this.resolution);
        this.material.setProperty("tileSize", this.tileSize);
      };
      Mosaic.prototype.set = function(width, height) {
        this.size.width = width;
        this.size.height = null !== height && void 0 !== height ? height : width;
        this.updateProperties();
      };
      Mosaic.prototype.to = function(width, height, duration) {
        var _this = this;
        return new Promise(function(res) {
          if (void 0 == duration) {
            duration = height;
            height = width;
          }
          cc.tween(_this).to(duration, {
            size: cc.size(width, height)
          }).call(res).start();
        });
      };
      Object.defineProperty(Mosaic.prototype, "resolution", {
        get: function() {
          return cc.v2(this.node.width, this.node.height);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Mosaic.prototype, "tileSize", {
        get: function() {
          return cc.v2(this._size.width, this._size.height);
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property() ], Mosaic.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false
      }) ], Mosaic.prototype, "effect", null);
      __decorate([ property() ], Mosaic.prototype, "_size", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Mosaic.prototype, "size", null);
      Mosaic = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple ], Mosaic);
      return Mosaic;
    }(cc.Component);
    exports.default = Mosaic;
    cc._RF.pop();
  }, {
    "../../misc/EditorAsset": "EditorAsset"
  } ],
  NetworkManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbd78IU+FxM/pEGmi/66qM0", "NetworkManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetworkManager = function() {
      function NetworkManager() {}
      NetworkManager.request = function(url, data) {};
      NetworkManager.xhr = new XMLHttpRequest();
      return NetworkManager;
    }();
    exports.default = NetworkManager;
    cc._RF.pop();
  }, {} ],
  NodeUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55cdbUdSaNNaqWUdZx+xknk", "NodeUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NodeUtil = function() {
      function NodeUtil() {}
      NodeUtil.getRelativePosition = function(node, container) {
        var worldPos = (node.getParent() || node).convertToWorldSpaceAR(node.getPosition());
        return container.convertToNodeSpaceAR(worldPos);
      };
      NodeUtil.isPosOnNodeRect = function(pos, target) {
        var rect = target.getBoundingBoxToWorld();
        return rect.contains(pos);
      };
      NodeUtil.areNodesOverlap = function(node1, node2, contains) {
        void 0 === contains && (contains = false);
        var rect1 = node1.getBoundingBoxToWorld(), rect2 = node2.getBoundingBoxToWorld();
        return contains ? rect1.containsRect(rect2) : rect1.intersects(rect2);
      };
      NodeUtil.getNodeSelfBoundingBoxToWorld = function(node) {
        node.parent["_updateWorldMatrix"]();
        var _a = node.getContentSize(), width = _a.width, height = _a.height, anchorPoint = node.getAnchorPoint(), rect = cc.rect(-anchorPoint.x * width, -anchorPoint.y * height, width, height);
        node["_calculWorldMatrix"]();
        rect.transformMat4(rect, node["_worldMatrix"]);
        return rect;
      };
      return NodeUtil;
    }();
    exports.default = NodeUtil;
    cc._RF.pop();
  }, {} ],
  ObjectUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cfb3aTbO1CNpcW8SypPvaS", "ObjectUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ObjectUtil = function() {
      function ObjectUtil() {}
      ObjectUtil.isObject = function(value) {
        return "[object Object]" === Object.prototype.toString.call(value);
      };
      ObjectUtil.deepCopy = function(target) {
        if (null == target || "object" !== typeof target) return target;
        if (target instanceof Array) {
          var result = [];
          for (var i = 0, length = target.length; i < length; i++) result[i] = ObjectUtil.deepCopy(target[i]);
          return result;
        }
        if (target instanceof Object) {
          var result = {};
          for (var key in target) target.hasOwnProperty(key) && (result[key] = ObjectUtil.deepCopy(target[key]));
          return result;
        }
        if (target instanceof Date) return new Date().setTime(target.getTime());
        console.warn("\u4e0d\u652f\u6301\u7684\u7c7b\u578b\uff1a" + target);
        return null;
      };
      ObjectUtil.copy = function(target) {
        return JSON.parse(JSON.stringify(target));
      };
      return ObjectUtil;
    }();
    exports.default = ObjectUtil;
    cc._RF.pop();
  }, {} ],
  OneWayCollider: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c97dEbN6JMIJjLdIVDc7xL", "OneWayCollider");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var OneWayCollider = function(_super) {
      __extends(OneWayCollider, _super);
      function OneWayCollider() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      OneWayCollider.prototype.onEnable = function() {
        var rigidBody = this.getComponent(cc.RigidBody);
        rigidBody && (rigidBody.enabledContactListener = true);
      };
      OneWayCollider.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        var points = contact.getWorldManifold().points;
        var selfBody = selfCollider.body;
        var otherBody = otherCollider.body;
        var selfPoint = new cc.Vec2();
        var otherPoint = new cc.Vec2();
        var relativeVelocity = new cc.Vec2();
        for (var i = 0; i < points.length; i++) {
          selfBody.getLinearVelocityFromWorldPoint(points[i], selfPoint);
          otherBody.getLinearVelocityFromWorldPoint(points[i], otherPoint);
          selfBody.getLocalVector(otherPoint.subSelf(selfPoint), relativeVelocity);
          if (relativeVelocity.y <= 0) return;
        }
        contact.disabled = true;
      };
      OneWayCollider = __decorate([ ccclass, menu("eazax/\u7269\u7406\u7ec4\u4ef6/OneWayCollider") ], OneWayCollider);
      return OneWayCollider;
    }(cc.Component);
    exports.default = OneWayCollider;
    cc._RF.pop();
  }, {} ],
  PersistNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "013b5q6muxMoIMItx1ac22N", "PersistNode");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, executionOrder = _a.executionOrder, menu = _a.menu;
    var PersistNode = function(_super) {
      __extends(PersistNode, _super);
      function PersistNode() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PersistNode.prototype.onLoad = function() {
        this.node.setParent(cc.director.getScene());
        cc.game.addPersistRootNode(this.node);
      };
      PersistNode = __decorate([ ccclass, executionOrder(-1), menu("eazax/\u5176\u4ed6\u7ec4\u4ef6/PersistNode") ], PersistNode);
      return PersistNode;
    }(cc.Component);
    exports.default = PersistNode;
    cc._RF.pop();
  }, {} ],
  PoolManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61d6cGTtGROj5qxDo2PG8ej", "PoolManager");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PoolManager = function() {
      function PoolManager() {}
      Object.defineProperty(PoolManager, "poolMap", {
        get: function() {
          return this._poolMap;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PoolManager, "prefabMap", {
        get: function() {
          return this._prefabMap;
        },
        enumerable: false,
        configurable: true
      });
      PoolManager.get = function(path) {
        return __awaiter(this, void 0, Promise, function() {
          var pool, node;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              pool = this._poolMap.get(path);
              if (pool && pool.size() > 0) return [ 2, pool.get() ];
              if (this._prefabMap.has(path)) return [ 2, cc.instantiate(this._prefabMap.get(path)) ];
              return [ 4, this.getFromRes(path) ];

             case 1:
              node = _a.sent();
              return [ 2, node || null ];
            }
          });
        });
      };
      PoolManager.put = function(path, node) {
        var pool = this._poolMap.get(path);
        if (!pool) {
          pool = new cc.NodePool();
          this._poolMap.set(path, pool);
        }
        pool.put(node);
      };
      PoolManager.getFromRes = function(path) {
        var _this = this;
        return new Promise(function(res) {
          cc.resources.load(path, function(error, prefab) {
            if (error) res(null); else {
              prefab.addRef();
              _this._prefabMap.set(path, prefab);
              res(cc.instantiate(prefab));
            }
          });
        });
      };
      PoolManager._poolMap = new Map();
      PoolManager._prefabMap = new Map();
      return PoolManager;
    }();
    exports.default = PoolManager;
    cc._RF.pop();
  }, {} ],
  PopupBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4f06bMKddJh4jxlZJ7rcMt", "PopupBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PopupBase = function(_super) {
      __extends(PopupBase, _super);
      function PopupBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.background = null;
        _this.main = null;
        _this.animationDuration = .3;
        _this.blocker = null;
        _this.options = null;
        _this.finishCallback = null;
        return _this;
      }
      PopupBase.prototype.show = function(options, duration) {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.options = options;
              this.init(options);
              this.updateDisplay(options);
              _a = this.onBeforeShow;
              if (!_a) return [ 3, 2 ];
              return [ 4, this.onBeforeShow() ];

             case 1:
              _a = _b.sent();
              _b.label = 2;

             case 2:
              _a;
              void 0 == duration && (duration = duration < 0 ? 0 : this.animationDuration);
              return [ 4, this.playShowAnimation(duration) ];

             case 3:
              _b.sent();
              this.onAfterShow && this.onAfterShow();
              return [ 2 ];
            }
          });
        });
      };
      PopupBase.prototype.hide = function(suspended, duration) {
        void 0 === suspended && (suspended = false);
        return __awaiter(this, void 0, void 0, function() {
          var node, blocker, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              node = this.node;
              if (0 !== duration) {
                blocker = this.blocker;
                if (!blocker) {
                  blocker = this.blocker = new cc.Node("blocker");
                  blocker.addComponent(cc.BlockInputEvents);
                  blocker.setParent(node);
                  blocker.setContentSize(node.getContentSize());
                }
                blocker.active = true;
              }
              _a = this.onBeforeHide;
              if (!_a) return [ 3, 2 ];
              return [ 4, this.onBeforeHide(suspended) ];

             case 1:
              _a = _b.sent();
              _b.label = 2;

             case 2:
              _a;
              void 0 == duration && (duration = duration < 0 ? 0 : this.animationDuration);
              return [ 4, this.playHideAnimation(duration) ];

             case 3:
              _b.sent();
              this.blocker && (this.blocker.active = false);
              node.active = false;
              this.onAfterHide && this.onAfterHide(suspended);
              this.finishCallback && this.finishCallback(suspended);
              return [ 2 ];
            }
          });
        });
      };
      PopupBase.prototype.playShowAnimation = function(duration) {
        var _this = this;
        return new Promise(function(res) {
          var background = _this.background, main = _this.main;
          _this.node.active = true;
          background.active = true;
          background.opacity = 0;
          main.active = true;
          main.scale = .5;
          main.opacity = 0;
          cc.tween(background).to(.5 * duration, {
            opacity: 150
          }).start();
          cc.tween(main).to(duration, {
            scale: 1,
            opacity: 255
          }, {
            easing: "backOut"
          }).call(res).start();
        });
      };
      PopupBase.prototype.playHideAnimation = function(duration) {
        var _this = this;
        return new Promise(function(res) {
          cc.tween(_this.background).delay(.5 * duration).to(.5 * duration, {
            opacity: 0
          }).start();
          cc.tween(_this.main).to(duration, {
            scale: .5,
            opacity: 0
          }, {
            easing: "backIn"
          }).call(res).start();
        });
      };
      PopupBase.prototype.init = function(options) {};
      PopupBase.prototype.updateDisplay = function(options) {};
      PopupBase.prototype.onBeforeShow = function() {
        return new Promise(function(res) {
          return res();
        });
      };
      PopupBase.prototype.onAfterShow = function() {};
      PopupBase.prototype.onBeforeHide = function(suspended) {
        return new Promise(function(res) {
          return res();
        });
      };
      PopupBase.prototype.onAfterHide = function(suspended) {};
      PopupBase.prototype.onSuspended = function() {
        return new Promise(function(res) {
          return res();
        });
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], PopupBase.prototype, "background", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], PopupBase.prototype, "main", void 0);
      PopupBase = __decorate([ ccclass ], PopupBase);
      return PopupBase;
    }(cc.Component);
    exports.default = PopupBase;
    cc._RF.pop();
  }, {} ],
  PopupManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50eaawLPZRENJEcGEpVVJKs", "PopupManager");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PopupBase_1 = require("../components/popups/PopupBase");
    var CacheMode;
    (function(CacheMode) {
      CacheMode[CacheMode["Once"] = 1] = "Once";
      CacheMode[CacheMode["Normal"] = 2] = "Normal";
      CacheMode[CacheMode["Frequent"] = 3] = "Frequent";
    })(CacheMode || (CacheMode = {}));
    var ShowResultType;
    (function(ShowResultType) {
      ShowResultType[ShowResultType["Done"] = 1] = "Done";
      ShowResultType[ShowResultType["Failed"] = 2] = "Failed";
      ShowResultType[ShowResultType["Waiting"] = 3] = "Waiting";
    })(ShowResultType || (ShowResultType = {}));
    var PopupManager = function() {
      function PopupManager() {}
      Object.defineProperty(PopupManager, "prefabCache", {
        get: function() {
          return this._prefabCache;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "nodeCache", {
        get: function() {
          return this._nodeCache;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "current", {
        get: function() {
          return this._current;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "queue", {
        get: function() {
          return this._queue;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "suspended", {
        get: function() {
          return this._suspended;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "container", {
        get: function() {
          return this._container || cc.Canvas.instance.node;
        },
        set: function(value) {
          this._container = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "CacheMode", {
        get: function() {
          return CacheMode;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "ShowResultType", {
        get: function() {
          return ShowResultType;
        },
        enumerable: false,
        configurable: true
      });
      PopupManager.show = function(path, options, params) {
        var _this = this;
        return new Promise(function(res) {
          return __awaiter(_this, void 0, void 0, function() {
            var node, prefab, popup;
            var _this = this;
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                params = this.parseParams(params);
                if (!(this._current || this.locked)) return [ 3, 3 ];
                if (!(params && params.immediately)) return [ 3, 2 ];
                this.locked = false;
                return [ 4, this.suspend() ];

               case 1:
                _a.sent();
                return [ 3, 3 ];

               case 2:
                this.push(path, options, params);
                res(ShowResultType.Waiting);
                return [ 2 ];

               case 3:
                this._current = {
                  path: path,
                  options: options,
                  params: params
                };
                node = this.getNodeFromCache(path);
                if (!!cc.isValid(node)) return [ 3, 5 ];
                this.loadStartCallback && this.loadStartCallback();
                return [ 4, this.load(path) ];

               case 4:
                prefab = _a.sent();
                this.loadFinishCallback && this.loadFinishCallback();
                if (!cc.isValid(prefab)) {
                  cc.warn("[PopupManager]", "\u5f39\u7a97\u52a0\u8f7d\u5931\u8d25", path);
                  this._current = null;
                  res(ShowResultType.Failed);
                  return [ 2 ];
                }
                node = cc.instantiate(prefab);
                _a.label = 5;

               case 5:
                popup = node.getComponent(PopupBase_1.default);
                if (!popup) {
                  cc.warn("[PopupManager]", "\u672a\u627e\u5230\u5f39\u7a97\u7ec4\u4ef6", path);
                  this._current = null;
                  res(ShowResultType.Failed);
                  return [ 2 ];
                }
                this._current.popup = popup;
                this._current.node = node;
                node.setParent(this.container);
                node.setSiblingIndex(cc.macro.MAX_ZINDEX);
                popup.finishCallback = function(suspended) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var _this = this;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                       case 0:
                        if (suspended) return [ 2 ];
                        this.locked = this._suspended.length > 0 || this._queue.length > 0;
                        this.recycle(path, node, params.mode);
                        this._current = null;
                        res(ShowResultType.Done);
                        return [ 4, new Promise(function(_res) {
                          cc.Canvas.instance.scheduleOnce(_res, _this.interval);
                        }) ];

                       case 1:
                        _a.sent();
                        this.next();
                        return [ 2 ];
                      }
                    });
                  });
                };
                popup.show(options);
                return [ 2 ];
              }
            });
          });
        });
      };
      PopupManager.hide = function() {
        cc.isValid(this._current.popup) && this._current.popup.hide();
      };
      PopupManager.getNodeFromCache = function(path) {
        var nodeCache = this._nodeCache;
        if (nodeCache.has(path)) {
          var node = nodeCache.get(path);
          if (cc.isValid(node)) return node;
          nodeCache.delete(path);
        }
        var prefabCache = this._prefabCache;
        if (prefabCache.has(path)) {
          var prefab = prefabCache.get(path);
          if (cc.isValid(prefab)) {
            prefab.addRef();
            return cc.instantiate(prefab);
          }
          prefabCache.delete(path);
        }
        return null;
      };
      PopupManager.next = function() {
        if (this._current || 0 === this._suspended.length && 0 === this._queue.length) return;
        var request = null;
        request = this._suspended.length > 0 ? this._suspended.shift() : this._queue.shift();
        this.locked = false;
        if (cc.isValid(request.popup)) {
          this._current = request;
          request.node.setParent(this.container);
          request.popup.show(request.options);
          return;
        }
        this.show(request.path, request.options, request.params);
      };
      PopupManager.push = function(path, options, params) {
        if (!this._current && !this.locked) {
          this.show(path, options, params);
          return;
        }
        this._queue.push({
          path: path,
          options: options,
          params: params
        });
        this._queue.sort(function(a, b) {
          return a.params.priority - b.params.priority;
        });
      };
      PopupManager.suspend = function() {
        return __awaiter(this, void 0, void 0, function() {
          var request;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this._current) return [ 2 ];
              request = this._current;
              this._suspended.push(request);
              return [ 4, request.popup.onSuspended() ];

             case 1:
              _a.sent();
              return [ 4, request.popup.hide(true) ];

             case 2:
              _a.sent();
              this._current = null;
              return [ 2 ];
            }
          });
        });
      };
      PopupManager.recycle = function(path, node, mode) {
        switch (mode) {
         case CacheMode.Once:
          this._nodeCache.delete(path);
          node.destroy();
          this.release(path);
          break;

         case CacheMode.Normal:
          this._nodeCache.delete(path);
          node.destroy();
          break;

         case CacheMode.Frequent:
          node.removeFromParent(false);
          this._nodeCache.set(path, node);
        }
      };
      PopupManager.load = function(path) {
        var _this = this;
        return new Promise(function(res) {
          var prefabMap = _this._prefabCache;
          if (prefabMap.has(path)) {
            var prefab = prefabMap.get(path);
            if (cc.isValid(prefab)) {
              res(prefab);
              return;
            }
            prefabMap.delete(path);
          }
          cc.resources.load(path, function(error, prefab) {
            if (error) {
              res(null);
              return;
            }
            prefabMap.set(path, prefab);
            res(prefab);
          });
        });
      };
      PopupManager.release = function(path) {
        var nodeCache = this._nodeCache;
        var node = nodeCache.get(path);
        if (node) {
          nodeCache.delete(path);
          cc.isValid(node) && node.destroy();
          node = null;
        }
        var prefabCache = this._prefabCache;
        var prefab = prefabCache.get(path);
        if (prefab) {
          prefab.refCount <= 1 && prefabCache.delete(path);
          prefab.decRef();
          prefab = null;
        }
      };
      PopupManager.parseParams = function(params) {
        if (void 0 == params) return new PopupParamsType();
        if ("[object Object]" !== Object.prototype.toString.call(params)) {
          cc.warn("[PopupManager]", "\u5f39\u7a97\u53c2\u6570\u65e0\u6548\uff0c\u4f7f\u7528\u9ed8\u8ba4\u53c2\u6570");
          return new PopupParamsType();
        }
        void 0 == params.mode && (params.mode = CacheMode.Normal);
        void 0 == params.priority && (params.priority = 0);
        void 0 == params.immediately && (params.immediately = false);
        return params;
      };
      PopupManager._prefabCache = new Map();
      PopupManager._nodeCache = new Map();
      PopupManager._current = null;
      PopupManager._queue = [];
      PopupManager._suspended = [];
      PopupManager.locked = false;
      PopupManager._container = null;
      PopupManager.interval = .05;
      PopupManager.loadStartCallback = null;
      PopupManager.loadFinishCallback = null;
      return PopupManager;
    }();
    exports.default = PopupManager;
    var PopupParamsType = function() {
      function PopupParamsType() {
        this.mode = CacheMode.Normal;
        this.priority = 0;
        this.immediately = false;
      }
      return PopupParamsType;
    }();
    var PopupRequestType = function() {
      function PopupRequestType() {}
      return PopupRequestType;
    }();
    cc._RF.pop();
  }, {
    "../components/popups/PopupBase": "PopupBase"
  } ],
  PostProcessing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13bb6FawLtHzph91dUR2qSA", "PostProcessing");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, help = _a.help, menu = _a.menu;
    var PostProcessing = function(_super) {
      __extends(PostProcessing, _super);
      function PostProcessing() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inputCamera = null;
        _this.outputSprite = null;
        _this.renderTexture = null;
        return _this;
      }
      PostProcessing.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      PostProcessing.prototype.onDestroy = function() {
        this.unregisterEvent();
        this.release();
      };
      PostProcessing.prototype.registerEvent = function() {
        cc.Canvas.instance.node.on(cc.Node.EventType.SIZE_CHANGED, this.onCanvasSizeChanged, this);
      };
      PostProcessing.prototype.unregisterEvent = function() {
        cc.Canvas.instance.node.off(cc.Node.EventType.SIZE_CHANGED, this.onCanvasSizeChanged, this);
      };
      PostProcessing.prototype.init = function() {
        var renderTexture = this.renderTexture = new cc.RenderTexture(), screenSize = cc.view.getVisibleSizeInPixel();
        renderTexture.initWithSize(screenSize.width, screenSize.height);
        this.inputCamera.targetTexture = renderTexture;
        this.outputSprite.spriteFrame = new cc.SpriteFrame(renderTexture);
        this.outputSprite.node.scaleY = -Math.abs(this.outputSprite.node.scaleY);
      };
      PostProcessing.prototype.release = function() {
        this.renderTexture.destroy();
      };
      PostProcessing.prototype.onCanvasSizeChanged = function() {
        var screenSize = cc.view.getVisibleSizeInPixel();
        this.renderTexture.updateSize(screenSize.width, screenSize.height);
      };
      __decorate([ property({
        type: cc.Camera,
        tooltip: false
      }) ], PostProcessing.prototype, "inputCamera", void 0);
      __decorate([ property({
        type: cc.Sprite,
        tooltip: false
      }) ], PostProcessing.prototype, "outputSprite", void 0);
      PostProcessing = __decorate([ ccclass, executionOrder(-1), help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/PostProcessing.ts"), menu("eazax/\u6548\u679c\u7ec4\u4ef6/PostProcessing") ], PostProcessing);
      return PostProcessing;
    }(cc.Component);
    exports.default = PostProcessing;
    cc._RF.pop();
  }, {} ],
  PromiseUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c127O4BelOEJ0va+YPLUah", "PromiseUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PromiseUtil = function() {
      function PromiseUtil() {}
      PromiseUtil.sleep = function(time) {
        return new Promise(function(res) {
          return cc.Canvas.instance.scheduleOnce(res, time);
        });
      };
      return PromiseUtil;
    }();
    exports.default = PromiseUtil;
    cc._RF.pop();
  }, {} ],
  RadarChart: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "37a55PFvLVK3bflj3g4a2rl", "RadarChart");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, executionOrder = _a.executionOrder, help = _a.help, menu = _a.menu;
    var RadarChart = function(_super) {
      __extends(RadarChart, _super);
      function RadarChart() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this._axisLength = 200;
        _this._axes = 6;
        _this._axisScales = 3;
        _this._drawAxes = true;
        _this._gridLineWidth = 4;
        _this._innerGridLineWidth = 4;
        _this._gridLineColor = cc.Color.GRAY;
        _this._gridFillColor = cc.color(100, 100, 100, 100);
        _this._dataValuesStrings = [ "0.8,0.5,0.6,0.5,0.8,0.6", "0.5,0.9,0.5,0.8,0.5,0.9" ];
        _this._dataLineWidths = [ 5, 5 ];
        _this._dataLineColors = [ cc.Color.BLUE, cc.Color.RED ];
        _this._dataFillColors = [ cc.color(120, 120, 180, 100), cc.color(180, 120, 120, 100) ];
        _this._dataJoinColors = [];
        _this._drawDataJoin = true;
        _this.graphics = null;
        _this.keepUpdating = false;
        _this.angles = null;
        _this._curDatas = [];
        _this.curTweenRes = null;
        return _this;
      }
      Object.defineProperty(RadarChart.prototype, "axisLength", {
        get: function() {
          return this._axisLength;
        },
        set: function(value) {
          this._axisLength = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "axes", {
        get: function() {
          return this._axes;
        },
        set: function(value) {
          this._axes = Math.floor(value >= 3 ? value : 3);
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "axisScales", {
        get: function() {
          return this._axisScales;
        },
        set: function(value) {
          this._axisScales = Math.floor(value >= 1 ? value : 1);
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "drawAxes", {
        get: function() {
          return this._drawAxes;
        },
        set: function(value) {
          this._drawAxes = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "gridLineWidth", {
        get: function() {
          return this._gridLineWidth;
        },
        set: function(value) {
          this._gridLineWidth = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "innerGridLineWidth", {
        get: function() {
          return this._innerGridLineWidth;
        },
        set: function(value) {
          this._innerGridLineWidth = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "gridLineColor", {
        get: function() {
          return this._gridLineColor;
        },
        set: function(value) {
          this._gridLineColor = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "gridFillColor", {
        get: function() {
          return this._gridFillColor;
        },
        set: function(value) {
          this._gridFillColor = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "dataValuesStrings", {
        get: function() {
          return this._dataValuesStrings;
        },
        set: function(value) {
          this._dataValuesStrings = value;
          this.drawWithProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "dataLineWidths", {
        get: function() {
          return this._dataLineWidths;
        },
        set: function(value) {
          this._dataLineWidths = value;
          this.drawWithProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "dataLineColors", {
        get: function() {
          return this._dataLineColors;
        },
        set: function(value) {
          this._dataLineColors = value;
          this.drawWithProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "dataFillColors", {
        get: function() {
          return this._dataFillColors;
        },
        set: function(value) {
          this._dataFillColors = value;
          this.drawWithProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "dataJoinColors", {
        get: function() {
          return this._dataJoinColors;
        },
        set: function(value) {
          this._dataJoinColors = value;
          this.drawWithProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "drawDataJoin", {
        get: function() {
          return this._drawDataJoin;
        },
        set: function(value) {
          this._drawDataJoin = value;
          this.draw(this.curDatas);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadarChart.prototype, "curDatas", {
        get: function() {
          return this._curDatas;
        },
        enumerable: false,
        configurable: true
      });
      RadarChart.prototype.onLoad = function() {
        this.init();
        this.drawWithProperties();
      };
      RadarChart.prototype.update = function() {
        if (!this.keepUpdating || 0 === this._curDatas.length) return;
        this.draw(this._curDatas);
      };
      RadarChart.prototype.init = function() {
        this.target || (this.target = this.node);
        this.graphics = this.target.getComponent(cc.Graphics) || this.target.addComponent(cc.Graphics);
        this.graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this.graphics.lineCap = cc.Graphics.LineCap.ROUND;
      };
      RadarChart.prototype.drawWithProperties = function() {
        var datas = [], valueStrings = this.dataValuesStrings, lineWidths = this._dataLineWidths, lineColors = this._dataLineColors, fillColors = this._dataFillColors, joinColors = this._dataJoinColors;
        for (var i = 0; i < valueStrings.length; i++) datas.push({
          values: this.processValuesString(valueStrings[i]),
          lineWidth: lineWidths[i] || defaultOptions.lineWidth,
          lineColor: lineColors[i] || defaultOptions.lineColor,
          fillColor: fillColors[i] || defaultOptions.fillColor,
          joinColor: joinColors[i] || defaultOptions.joinColor
        });
        this.draw(datas);
      };
      RadarChart.prototype.processValuesString = function(valuesString) {
        var strings = valuesString.split(","), values = [];
        for (var j = 0; j < strings.length; j++) {
          var value = parseFloat(strings[j]);
          values.push(isNaN(value) ? 0 : value);
        }
        return values;
      };
      RadarChart.prototype.drawBase = function() {
        var graphics = this.graphics;
        graphics.lineWidth = this._gridLineWidth;
        graphics.strokeColor = this._gridLineColor;
        graphics.fillColor = this._gridFillColor;
        var angles = this.angles = [], iAngle = 360 / this.axes;
        for (var i = 0; i < this.axes; i++) angles.push(iAngle * i);
        var scalesSet = [], axisLength = this._axisLength, axisScales = this._axisScales, iLength = axisLength / axisScales;
        for (var i = 0; i < axisScales; i++) {
          var scales = [];
          var length = axisLength - iLength * i;
          for (var j = 0, l = this.angles.length; j < l; j++) {
            var radian = Math.PI / 180 * this.angles[j];
            scales.push(cc.v2(length * Math.cos(radian), length * Math.sin(radian)));
          }
          scalesSet.push(scales);
        }
        var out = scalesSet[0];
        if (this._drawAxes) for (var i = 0; i < out.length; i++) {
          graphics.moveTo(0, 0);
          graphics.lineTo(out[i].x, out[i].y);
        }
        graphics.moveTo(out[0].x, out[0].y);
        for (var i = 1; i < out.length; i++) graphics.lineTo(out[i].x, out[i].y);
        graphics.close();
        graphics.fill();
        graphics.stroke();
        if (scalesSet.length > 1) {
          graphics.lineWidth = this._innerGridLineWidth;
          for (var i = 1; i < scalesSet.length; i++) {
            var set = scalesSet[i];
            graphics.moveTo(set[0].x, set[0].y);
            for (var j = 1; j < set.length; j++) graphics.lineTo(set[j].x, set[j].y);
            graphics.close();
          }
          graphics.stroke();
        }
      };
      RadarChart.prototype.draw = function(data) {
        var graphics = this.graphics;
        graphics.clear();
        this.drawBase();
        var datas = Array.isArray(data) ? data : [ data ];
        this._curDatas = datas;
        this.resizeCurDatasValues(0);
        var axes = this.axes, axisLength = this.axisLength, angles = this.angles;
        for (var i = 0; i < datas.length; i++) {
          var data_1 = datas[i];
          graphics.strokeColor = data_1.lineColor || defaultOptions.lineColor;
          graphics.fillColor = data_1.fillColor || defaultOptions.fillColor;
          graphics.lineWidth = data_1.lineWidth || defaultOptions.lineWidth;
          var coords = [];
          for (var j = 0; j < axes; j++) {
            var length = (data_1.values[j] > 1 ? 1 : data_1.values[j]) * axisLength, radian = Math.PI / 180 * angles[j];
            coords.push(cc.v2(length * Math.cos(radian), length * Math.sin(radian)));
          }
          graphics.moveTo(coords[0].x, coords[0].y);
          for (var j = 1; j < coords.length; j++) graphics.lineTo(coords[j].x, coords[j].y);
          graphics.close();
          graphics.fill();
          graphics.stroke();
          if (this._drawDataJoin) for (var j = 0; j < coords.length; j++) {
            var coord = coords[j];
            graphics.strokeColor = data_1.lineColor || defaultOptions.lineColor;
            graphics.circle(coord.x, coord.y, 2);
            graphics.stroke();
            graphics.strokeColor = data_1.joinColor || defaultOptions.joinColor;
            graphics.circle(coord.x, coord.y, .65);
            graphics.stroke();
          }
        }
      };
      RadarChart.prototype.to = function(data, duration) {
        var _this = this;
        return new Promise(function(res) {
          var _a;
          _this.unscheduleAllCallbacks();
          _this.curTweenRes && _this.curTweenRes();
          _this.curTweenRes = res;
          var datas = Array.isArray(data) ? data : [ data ];
          _this.keepUpdating = true;
          for (var i = 0; i < datas.length; i++) {
            var curData = _this._curDatas[i];
            if (!curData) continue;
            var data_2 = datas[i];
            for (var j = 0; j < curData.values.length; j++) cc.tween(curData.values).to(duration, (_a = {}, 
            _a[j] = data_2.values[j] > 1 ? 1 : data_2.values[j], _a)).start();
            cc.tween(curData).to(duration, {
              lineWidth: data_2.lineWidth || curData.lineWidth,
              lineColor: data_2.lineColor || curData.lineColor,
              fillColor: data_2.fillColor || curData.fillColor,
              joinColor: data_2.joinColor || curData.joinColor
            }).start();
          }
          _this.scheduleOnce(function() {
            _this.keepUpdating = false;
            _this.curTweenRes();
            _this.curTweenRes = null;
          }, duration);
        });
      };
      RadarChart.prototype.resizeCurDatasValues = function(fill) {
        void 0 === fill && (fill = 0);
        var curDatas = this._curDatas;
        for (var i = 0; i < curDatas.length; i++) {
          var curData = curDatas[i];
          if (curData.values.length < this._axes) {
            var diff = this._axes - curData.values.length;
            for (var j = 0; j < diff; j++) curData.values.push(fill);
          }
        }
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], RadarChart.prototype, "target", void 0);
      __decorate([ property() ], RadarChart.prototype, "_axisLength", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "axisLength", null);
      __decorate([ property() ], RadarChart.prototype, "_axes", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "axes", null);
      __decorate([ property() ], RadarChart.prototype, "_axisScales", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "axisScales", null);
      __decorate([ property() ], RadarChart.prototype, "_drawAxes", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "drawAxes", null);
      __decorate([ property() ], RadarChart.prototype, "_gridLineWidth", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "gridLineWidth", null);
      __decorate([ property() ], RadarChart.prototype, "_innerGridLineWidth", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "innerGridLineWidth", null);
      __decorate([ property() ], RadarChart.prototype, "_gridLineColor", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "gridLineColor", null);
      __decorate([ property() ], RadarChart.prototype, "_gridFillColor", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "gridFillColor", null);
      __decorate([ property() ], RadarChart.prototype, "_dataValuesStrings", void 0);
      __decorate([ property({
        type: [ cc.String ],
        tooltip: false
      }) ], RadarChart.prototype, "dataValuesStrings", null);
      __decorate([ property() ], RadarChart.prototype, "_dataLineWidths", void 0);
      __decorate([ property({
        type: [ cc.Integer ],
        tooltip: false
      }) ], RadarChart.prototype, "dataLineWidths", null);
      __decorate([ property() ], RadarChart.prototype, "_dataLineColors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], RadarChart.prototype, "dataLineColors", null);
      __decorate([ property() ], RadarChart.prototype, "_dataFillColors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], RadarChart.prototype, "dataFillColors", null);
      __decorate([ property() ], RadarChart.prototype, "_dataJoinColors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], RadarChart.prototype, "dataJoinColors", null);
      __decorate([ property() ], RadarChart.prototype, "_drawDataJoin", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "drawDataJoin", null);
      RadarChart = __decorate([ ccclass, executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/chart/RadarChart.ts"), menu("eazax/\u56fe\u8868\u7ec4\u4ef6/RadarChart") ], RadarChart);
      return RadarChart;
    }(cc.Component);
    exports.default = RadarChart;
    var defaultOptions = {
      lineWidth: 5,
      lineColor: cc.Color.BLUE,
      fillColor: cc.color(120, 120, 180, 100),
      joinColor: cc.Color.WHITE
    };
    cc._RF.pop();
  }, {} ],
  RadialBlur: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4961IiUphHfaCzNM9yoTl9", "RadialBlur");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditorAsset_1 = require("../../misc/EditorAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple;
    var RadialBlur = function(_super) {
      __extends(RadialBlur, _super);
      function RadialBlur() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effect = null;
        _this._center = new cc.Vec2(.5, .5);
        _this._strength = .5;
        _this.sprite = null;
        _this.material = null;
        return _this;
      }
      Object.defineProperty(RadialBlur.prototype, "effect", {
        get: function() {
          return this._effect;
        },
        set: function(value) {
          this._effect = value;
          this.init();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadialBlur.prototype, "center", {
        get: function() {
          return this._center;
        },
        set: function(value) {
          this._center = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RadialBlur.prototype, "strength", {
        get: function() {
          return this._strength;
        },
        set: function(value) {
          this._strength = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      RadialBlur.prototype.onLoad = function() {
        this.init();
      };
      RadialBlur.prototype.resetInEditor = function() {
        this.init();
      };
      RadialBlur.prototype.init = function() {
        return __awaiter(this, void 0, void 0, function() {
          var path, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              true;
              return [ 3, 2 ];

             case 1:
              _a._effect = _b.sent();
              _b.label = 2;

             case 2:
              if (!this._effect) {
                cc.warn("[" + this["__proto__"]["__classname__"] + "]", "\u8bf7\u624b\u52a8\u6307\u5b9a\u7ec4\u4ef6\u7684 Effect \u8d44\u6e90\uff01");
                return [ 2 ];
              }
              this.sprite = this.node.getComponent(cc.Sprite);
              this.sprite.spriteFrame && (this.sprite.spriteFrame.getTexture().packable = false);
              this.material = cc.Material.create(this._effect);
              this.sprite.setMaterial(0, this.material);
              this.updateProperties();
              return [ 2 ];
            }
          });
        });
      };
      RadialBlur.prototype.updateProperties = function() {
        this.material.setProperty("center", this._center);
        this.material.setProperty("strength", this._strength);
      };
      Object.defineProperty(RadialBlur.prototype, "nodeSize", {
        get: function() {
          return cc.v2(this.node.width, this.node.height);
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property ], RadialBlur.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false,
        readonly: true
      }) ], RadialBlur.prototype, "effect", null);
      __decorate([ property ], RadialBlur.prototype, "_center", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadialBlur.prototype, "center", null);
      __decorate([ property ], RadialBlur.prototype, "_strength", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadialBlur.prototype, "strength", null);
      RadialBlur = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple ], RadialBlur);
      return RadialBlur;
    }(cc.Component);
    exports.default = RadialBlur;
    cc._RF.pop();
  }, {
    "../../misc/EditorAsset": "EditorAsset"
  } ],
  RegexUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96a04sFvMhOMqfue6e/AFZD", "RegexUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RegexUtil = function() {
      function RegexUtil() {}
      RegexUtil.isDWORD = function(string) {
        return /[^\x00-\xff]/.test(string);
      };
      return RegexUtil;
    }();
    exports.default = RegexUtil;
    cc._RF.pop();
  }, {} ],
  RemoteAsset: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c063ToGUhNarEAP2A+VdV1", "RemoteAsset");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var RemoteAsset = function(_super) {
      __extends(RemoteAsset, _super);
      function RemoteAsset() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      RemoteAsset.prototype.load = function(url) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, {
              url: url,
              loaded: false,
              interrupted: false,
              component: this
            } ];
          });
        });
      };
      RemoteAsset.prototype.set = function(asset) {};
      RemoteAsset = __decorate([ ccclass, executeInEditMode ], RemoteAsset);
      return RemoteAsset;
    }(cc.Component);
    exports.default = RemoteAsset;
    cc._RF.pop();
  }, {} ],
  RemoteLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cacf7ln9gFPaIqyyLEXTO/4", "RemoteLoader");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RemoteLoader = function() {
      function RemoteLoader() {}
      RemoteLoader.loadTexture = function(url, callback) {
        return new Promise(function(res) {
          cc.assetManager.loadRemote(url, function(error, texture) {
            if (!error && texture instanceof cc.Texture2D) {
              callback && callback(null, texture);
              res(texture);
            } else {
              callback && callback(error, null);
              res(null);
            }
          });
        });
      };
      return RemoteLoader;
    }();
    exports.default = RemoteLoader;
    cc._RF.pop();
  }, {} ],
  RemoteSpine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d455c606jBIcbAaulx5gQXO", "RemoteSpine");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SpineLoader_1 = require("../../core/remote/SpineLoader");
    var RemoteAsset_1 = require("./RemoteAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, help = _a.help, menu = _a.menu;
    var RemoteSpine = function(_super) {
      __extends(RemoteSpine, _super);
      function RemoteSpine() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._skeleton = null;
        _this._url = "";
        _this._defaultSkin = "default";
        _this._defaultAnimation = "";
        _this.retryTimes = 2;
        _this._previewInEditor = true;
        _this._showPreviewNode = false;
        _this.lastRequestId = 0;
        return _this;
      }
      Object.defineProperty(RemoteSpine.prototype, "skeleton", {
        get: function() {
          return this._skeleton;
        },
        set: function(value) {
          this._skeleton = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteSpine.prototype, "url", {
        get: function() {
          return this._url;
        },
        set: function(value) {
          this._url = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteSpine.prototype, "defaultSkin", {
        get: function() {
          return this._defaultSkin;
        },
        set: function(value) {
          this._defaultSkin = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteSpine.prototype, "defaultAnimation", {
        get: function() {
          return this._defaultAnimation;
        },
        set: function(value) {
          this._defaultAnimation = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteSpine.prototype, "previewInEditor", {
        get: function() {
          return this._previewInEditor;
        },
        set: function(value) {
          this._previewInEditor = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteSpine.prototype, "showPreviewNode", {
        get: function() {
          return this._showPreviewNode;
        },
        set: function(value) {
          this._showPreviewNode = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      RemoteSpine.prototype.onLoad = function() {
        this.init();
      };
      RemoteSpine.prototype.resetInEditor = function() {
        this.init();
      };
      RemoteSpine.prototype.init = function() {
        cc.isValid(this._skeleton) || (this._skeleton = this.getComponent(sp.Skeleton));
        this.onPropertyUpdated();
      };
      RemoteSpine.prototype.onPropertyUpdated = function() {
        false;
        this.load(this._url);
      };
      RemoteSpine.prototype.load = function(url) {
        void 0 === url && (url = this._url);
        return __awaiter(this, void 0, Promise, function() {
          var curRequestId, skeletonData, loadCount, maxLoadTimes;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!cc.isValid(this._skeleton)) {
                cc.warn("[RemoteSpine]", "load", "->", "\u7f3a\u5c11 sp.Skeleton \u7ec4\u4ef6");
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
              this._url = url;
              if (!url || "" === url) {
                this.set(null);
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
              curRequestId = ++this.lastRequestId;
              skeletonData = null, loadCount = 0;
              maxLoadTimes = this.retryTimes + 1;
              _a.label = 1;

             case 1:
              if (!(!skeletonData && loadCount < maxLoadTimes)) return [ 3, 3 ];
              loadCount++;
              return [ 4, SpineLoader_1.default.loadRemote(url) ];

             case 2:
              skeletonData = _a.sent();
              if (this.lastRequestId !== curRequestId) {
                skeletonData = null;
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: true,
                  component: this
                } ];
              }
              return [ 3, 1 ];

             case 3:
              if (!skeletonData) {
                cc.warn("[RemoteSpine]", "load", "->", "\u8d44\u6e90\u52a0\u8f7d\u5931\u8d25", url);
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
              this.set(skeletonData);
              return [ 2, {
                url: url,
                loaded: true,
                interrupted: false,
                component: this
              } ];
            }
          });
        });
      };
      RemoteSpine.prototype.set = function(skeletonData) {
        var skeleton = this._skeleton;
        if (!skeleton) return;
        skeleton.skeletonData = skeletonData;
        if (skeletonData) {
          "" !== this._defaultSkin && skeleton.setSkin(this._defaultSkin);
          skeleton.animation = this._defaultAnimation;
        } else skeleton.animation = "";
        this.node.emit("skeleton:skeleton-data-updated", this._skeleton, skeletonData);
      };
      RemoteSpine.prototype.updatePreview = function() {
        return __awaiter(this, void 0, void 0, function() {
          var actualSkeleton, actualNode, previewNode, skeletonData, previewSkeleton;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              true;
              return [ 2 ];

             case 1:
              skeletonData = _a.sent();
              if (!cc.isValid(previewNode) || !skeletonData) {
                previewNode.removeFromParent(true);
                return [ 2 ];
              }
              previewSkeleton = previewNode.addComponent(sp.Skeleton);
              previewSkeleton.loop = actualSkeleton.loop;
              previewSkeleton.premultipliedAlpha = actualSkeleton.premultipliedAlpha;
              previewSkeleton.timeScale = actualSkeleton.timeScale;
              previewSkeleton.skeletonData = skeletonData;
              "" !== this._defaultSkin && previewSkeleton.setSkin(this._defaultSkin);
              previewSkeleton.animation = this._defaultAnimation;
              this._showPreviewNode && cc.log("[RemoteSpine]", "Preview", "->", "\u9884\u89c8\u8282\u70b9\uff08PREVIEW_NODE\uff09\u4e0d\u4f1a\u88ab\u4fdd\u5b58\uff0c\u65e0\u9700\u624b\u52a8\u5220\u9664");
              cc.log("[RemoteSpine]", "Preview", "->", "skins", Object.keys(skeletonData.skeletonJson.skins));
              cc.log("[RemoteSpine]", "Preview", "->", "animations", Object.keys(skeletonData.skeletonJson.animations));
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property() ], RemoteSpine.prototype, "_skeleton", void 0);
      __decorate([ property(sp.Skeleton) ], RemoteSpine.prototype, "skeleton", null);
      __decorate([ property() ], RemoteSpine.prototype, "_url", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RemoteSpine.prototype, "url", null);
      __decorate([ property() ], RemoteSpine.prototype, "_defaultSkin", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RemoteSpine.prototype, "defaultSkin", null);
      __decorate([ property() ], RemoteSpine.prototype, "_defaultAnimation", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RemoteSpine.prototype, "defaultAnimation", null);
      __decorate([ property({
        tooltip: false
      }) ], RemoteSpine.prototype, "retryTimes", void 0);
      __decorate([ property() ], RemoteSpine.prototype, "_previewInEditor", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RemoteSpine.prototype, "previewInEditor", null);
      __decorate([ property() ], RemoteSpine.prototype, "_showPreviewNode", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this["_previewInEditor"];
        }
      }) ], RemoteSpine.prototype, "showPreviewNode", null);
      RemoteSpine = __decorate([ ccclass, executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteSpine.ts"), menu("eazax/\u8fdc\u7a0b\u7ec4\u4ef6/RemoteSpine") ], RemoteSpine);
      return RemoteSpine;
    }(RemoteAsset_1.default);
    exports.default = RemoteSpine;
    cc._RF.pop();
  }, {
    "../../core/remote/SpineLoader": "SpineLoader",
    "./RemoteAsset": "RemoteAsset"
  } ],
  RemoteTexture: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29920+t+GZDp4r1TsCxTX6l", "RemoteTexture");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RemoteLoader_1 = require("../../core/remote/RemoteLoader");
    var RemoteAsset_1 = require("./RemoteAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, help = _a.help, menu = _a.menu;
    var RemoteTexture = function(_super) {
      __extends(RemoteTexture, _super);
      function RemoteTexture() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._sprite = null;
        _this._url = "";
        _this.retryTimes = 2;
        _this._previewInEditor = true;
        _this._showPreviewNode = false;
        _this.texture = null;
        _this.lastRequestId = 0;
        return _this;
      }
      Object.defineProperty(RemoteTexture.prototype, "sprite", {
        get: function() {
          return this._sprite;
        },
        set: function(value) {
          this._sprite = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteTexture.prototype, "url", {
        get: function() {
          return this._url;
        },
        set: function(value) {
          this._url = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteTexture.prototype, "previewInEditor", {
        get: function() {
          return this._previewInEditor;
        },
        set: function(value) {
          this._previewInEditor = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RemoteTexture.prototype, "showPreviewNode", {
        get: function() {
          return this._showPreviewNode;
        },
        set: function(value) {
          this._showPreviewNode = value;
          this.onPropertyUpdated();
        },
        enumerable: false,
        configurable: true
      });
      RemoteTexture.prototype.onLoad = function() {
        this.init();
      };
      RemoteTexture.prototype.onDestroy = function() {
        this.release();
      };
      RemoteTexture.prototype.resetInEditor = function() {
        this.init();
      };
      RemoteTexture.prototype.init = function() {
        cc.isValid(this._sprite) || (this._sprite = this.getComponent(cc.Sprite));
        this.onPropertyUpdated();
      };
      RemoteTexture.prototype.release = function() {
        if (cc.isValid(this.texture) && this.texture["remote"]) {
          this.texture.decRef();
          this.texture = null;
        }
      };
      RemoteTexture.prototype.onPropertyUpdated = function() {
        false;
        this.load(this._url);
      };
      RemoteTexture.prototype.load = function(url) {
        void 0 === url && (url = this._url);
        return __awaiter(this, void 0, Promise, function() {
          var curRequestId, texture, loadCount, maxLoadTimes;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this._url = url;
              if (!cc.isValid(this._sprite)) {
                cc.warn("[RemoteTexture]", "load", "->", "\u7f3a\u5c11 cc.Sprite \u7ec4\u4ef6");
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
              if (!url || "" === url) {
                this.set(null);
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
              curRequestId = ++this.lastRequestId;
              texture = null, loadCount = 0;
              maxLoadTimes = this.retryTimes + 1;
              _a.label = 1;

             case 1:
              if (!(!texture && loadCount < maxLoadTimes)) return [ 3, 3 ];
              loadCount++;
              return [ 4, RemoteLoader_1.default.loadTexture(url) ];

             case 2:
              texture = _a.sent();
              if (this.lastRequestId !== curRequestId) {
                if (texture) {
                  texture.addRef().decRef();
                  texture = null;
                }
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: true,
                  component: this
                } ];
              }
              return [ 3, 1 ];

             case 3:
              if (!texture) {
                cc.warn("[RemoteTexture]", "load", "->", "\u8d44\u6e90\u52a0\u8f7d\u5931\u8d25", url);
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
              texture["remote"] = true;
              this.set(texture);
              return [ 2, {
                url: url,
                loaded: true,
                interrupted: false,
                component: this
              } ];
            }
          });
        });
      };
      RemoteTexture.prototype.set = function(texture) {
        this.release();
        if (texture) {
          this._sprite.spriteFrame = new cc.SpriteFrame(texture);
          texture.addRef();
        } else this._sprite.spriteFrame = null;
        this.texture = texture;
        this.node.emit("sprite:sprite-frame-updated", this._sprite, texture);
      };
      RemoteTexture.prototype.updatePreview = function() {
        return __awaiter(this, void 0, void 0, function() {
          var actualSprite, actualNode, previewNode, texture, previewSprite;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              true;
              return [ 2 ];

             case 1:
              texture = _a.sent();
              if (!cc.isValid(previewNode) || !texture) {
                previewNode.removeFromParent(true);
                return [ 2 ];
              }
              previewSprite = previewNode.addComponent(cc.Sprite);
              previewSprite.type = actualSprite.type;
              previewSprite.sizeMode = actualSprite.sizeMode;
              previewSprite.trim = actualSprite.trim;
              previewSprite.spriteFrame = new cc.SpriteFrame(texture);
              this._showPreviewNode && cc.log("[RemoteTexture]", "Preview", "->", "\u9884\u89c8\u8282\u70b9\uff08PREVIEW_NODE\uff09\u4e0d\u4f1a\u88ab\u4fdd\u5b58\uff0c\u65e0\u9700\u624b\u52a8\u5220\u9664");
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property() ], RemoteTexture.prototype, "_sprite", void 0);
      __decorate([ property(cc.Sprite) ], RemoteTexture.prototype, "sprite", null);
      __decorate([ property() ], RemoteTexture.prototype, "_url", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RemoteTexture.prototype, "url", null);
      __decorate([ property({
        tooltip: false
      }) ], RemoteTexture.prototype, "retryTimes", void 0);
      __decorate([ property() ], RemoteTexture.prototype, "_previewInEditor", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RemoteTexture.prototype, "previewInEditor", null);
      __decorate([ property() ], RemoteTexture.prototype, "_showPreviewNode", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this["_previewInEditor"];
        }
      }) ], RemoteTexture.prototype, "showPreviewNode", null);
      RemoteTexture = __decorate([ ccclass, executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteTexture.ts"), menu("eazax/\u8fdc\u7a0b\u7ec4\u4ef6/RemoteTexture") ], RemoteTexture);
      return RemoteTexture;
    }(RemoteAsset_1.default);
    exports.default = RemoteTexture;
    cc._RF.pop();
  }, {
    "../../core/remote/RemoteLoader": "RemoteLoader",
    "./RemoteAsset": "RemoteAsset"
  } ],
  RenderUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0dd11xqTiND8b0Ol9vTXdum", "RenderUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RenderUtil = function() {
      function RenderUtil() {}
      RenderUtil.getRenderTexture = function(node, out) {
        if (!cc.isValid(node)) return null;
        out && out instanceof cc.RenderTexture || (out = new cc.RenderTexture());
        var width = Math.floor(node.width), height = Math.floor(node.height);
        out.initWithSize(width, height);
        var cameraNode = new cc.Node();
        cameraNode.parent = node;
        var camera = cameraNode.addComponent(cc.Camera);
        camera.clearFlags |= cc.Camera.ClearFlags.COLOR;
        camera.backgroundColor = cc.color(0, 0, 0, 0);
        camera.zoomRatio = cc.winSize.height / height;
        camera.targetTexture = out;
        camera.render(node);
        cameraNode.destroy();
        return out;
      };
      RenderUtil.renderWithMaterial = function(srcRT, dstRT, material) {
        if (dstRT instanceof cc.Material) {
          material = dstRT;
          dstRT = new cc.RenderTexture();
        }
        var tempNode = new cc.Node();
        tempNode.setParent(cc.Canvas.instance.node);
        var tempSprite = tempNode.addComponent(cc.Sprite);
        tempSprite.sizeMode = cc.Sprite.SizeMode.RAW;
        tempSprite.trim = false;
        tempSprite.spriteFrame = new cc.SpriteFrame(srcRT);
        var width = srcRT.width, height = srcRT.height;
        dstRT.initWithSize(width, height);
        material instanceof cc.Material && tempSprite.setMaterial(0, material);
        var cameraNode = new cc.Node();
        cameraNode.setParent(tempNode);
        var camera = cameraNode.addComponent(cc.Camera);
        camera.clearFlags |= cc.Camera.ClearFlags.COLOR;
        camera.backgroundColor = cc.color(0, 0, 0, 0);
        camera.zoomRatio = cc.winSize.height / height;
        camera.targetTexture = dstRT;
        camera.render(tempNode);
        cameraNode.destroy();
        tempNode.destroy();
        return dstRT;
      };
      RenderUtil.getPixelsData = function(node, flipY) {
        void 0 === flipY && (flipY = true);
        if (!cc.isValid(node)) return null;
        var width = Math.floor(node.width), height = Math.floor(node.height);
        var cameraNode = new cc.Node();
        cameraNode.parent = node;
        var camera = cameraNode.addComponent(cc.Camera);
        camera.clearFlags |= cc.Camera.ClearFlags.COLOR;
        camera.backgroundColor = cc.color(0, 0, 0, 0);
        camera.zoomRatio = cc.winSize.height / height;
        var renderTexture = new cc.RenderTexture();
        renderTexture.initWithSize(width, height, cc.RenderTexture.DepthStencilFormat.RB_FMT_S8);
        camera.targetTexture = renderTexture;
        camera.render(node);
        var pixelsData = renderTexture.readPixels();
        renderTexture.destroy();
        cameraNode.destroy();
        if (flipY) {
          var length = pixelsData.length, lineWidth = 4 * width, data = new Uint8Array(length);
          for (var i = 0, j = length - lineWidth; i < length; i += lineWidth, j -= lineWidth) for (var k = 0; k < lineWidth; k++) data[i + k] = pixelsData[j + k];
          return data;
        }
        return pixelsData;
      };
      RenderUtil.flipY = function(array, width) {
        var length = array.length, flipped = new Uint8Array(length);
        for (var i = 0, j = length - width; i < length; i += width, j -= width) for (var k = 0; k < width; k++) flipped[i + k] = array[j + k];
        return flipped;
      };
      return RenderUtil;
    }();
    exports.default = RenderUtil;
    cc._RF.pop();
  }, {} ],
  ResPopupItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b337W92WlCu6btwC1TvGOE", "ResPopupItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ClickToLoadUrl_1 = require("../../ClickToLoadUrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResPopupItem = function(_super) {
      __extends(ResPopupItem, _super);
      function ResPopupItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.typeLabel = null;
        _this.nameLabel = null;
        _this.clicker = null;
        return _this;
      }
      ResPopupItem.prototype.set = function(name, url) {
        var extname = name.slice(name.lastIndexOf("."));
        this.typeLabel.string = SymbolMap[extname] || SymbolMap[""];
        this.nameLabel.string = name;
        this.clicker.url = url;
      };
      __decorate([ property(cc.Label) ], ResPopupItem.prototype, "typeLabel", void 0);
      __decorate([ property(cc.Label) ], ResPopupItem.prototype, "nameLabel", void 0);
      __decorate([ property(ClickToLoadUrl_1.default) ], ResPopupItem.prototype, "clicker", void 0);
      ResPopupItem = __decorate([ ccclass ], ResPopupItem);
      return ResPopupItem;
    }(cc.Component);
    exports.default = ResPopupItem;
    var SymbolMap = {
      "": "\ud83d\udce6",
      ".ts": "\ud83d\udcc4",
      ".effect": "\ud83c\udfa8"
    };
    cc._RF.pop();
  }, {
    "../../ClickToLoadUrl": "ClickToLoadUrl"
  } ],
  ResPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "342f2b0zQFF/YtFsX6a3E70", "ResPopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PopupBase_1 = require("../../../../../eazax-ccc/components/popups/PopupBase");
    var ResPopupItem_1 = require("./ResPopupItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResPopup = function(_super) {
      __extends(ResPopup, _super);
      function ResPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.closeBtn = null;
        _this.content = null;
        _this.item = null;
        _this.items = [];
        return _this;
      }
      Object.defineProperty(ResPopup, "path", {
        get: function() {
          return "prefabs/ResPopup";
        },
        enumerable: false,
        configurable: true
      });
      ResPopup.prototype.onLoad = function() {
        this.registerEvent();
      };
      ResPopup.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      ResPopup.prototype.registerEvent = function() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
      };
      ResPopup.prototype.unregisterEvent = function() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
      };
      ResPopup.prototype.updateDisplay = function(options) {
        var existedItems = this.items, optionItems = options.items.filter(function(v) {
          return "" !== v.name || "" !== v.url;
        }), count = Math.max(optionItems.length, existedItems.length);
        for (var i = 0; i < count; i++) if (optionItems[i] && !existedItems[i]) {
          var node = cc.instantiate(this.item);
          node.setParent(this.content);
          var item = node.getComponent(ResPopupItem_1.default);
          item.set(optionItems[i].name, optionItems[i].url);
          item.node.active = true;
          existedItems.push(item);
        } else if (optionItems[i] && existedItems[i]) {
          var item = existedItems[i];
          item.set(optionItems[i].name, optionItems[i].url);
          item.node.active = true;
        } else existedItems[i].node.active = false;
      };
      ResPopup.prototype.onCloseBtnClick = function() {
        this.hide();
      };
      __decorate([ property(cc.Node) ], ResPopup.prototype, "closeBtn", void 0);
      __decorate([ property(cc.Node) ], ResPopup.prototype, "content", void 0);
      __decorate([ property(cc.Prefab) ], ResPopup.prototype, "item", void 0);
      ResPopup = __decorate([ ccclass ], ResPopup);
      return ResPopup;
    }(PopupBase_1.default);
    exports.default = ResPopup;
    cc._RF.pop();
  }, {
    "../../../../../eazax-ccc/components/popups/PopupBase": "PopupBase",
    "./ResPopupItem": "ResPopupItem"
  } ],
  ResourceManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6ede1lrUyJKG43/vR0bFL0z", "ResourceManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ResourceManager = function() {
      function ResourceManager() {}
      Object.defineProperty(ResourceManager, "resMap", {
        get: function() {
          return this._resMap;
        },
        enumerable: false,
        configurable: true
      });
      ResourceManager.load = function(path) {
        var _this = this;
        return new Promise(function(res) {
          var cache = _this._resMap.get(path);
          if (cache) return res(cache);
          cc.resources.load(path, function(error, asset) {
            if (error) {
              cc.log("[ResourceManager]", "\u52a0\u8f7d\u5931\u8d25", path);
              return res(null);
            }
            _this._resMap.set(path, asset);
            res(asset);
          });
        });
      };
      ResourceManager.get = function(path) {
        return this._resMap.get(path);
      };
      ResourceManager.has = function(path) {
        return this._resMap.has(path);
      };
      ResourceManager.release = function() {};
      ResourceManager.getDepsRecursively = function(uuid) {
        return cc.assetManager.dependUtil.getDepsRecursively(uuid);
      };
      ResourceManager._resMap = new Map();
      return ResourceManager;
    }();
    exports.default = ResourceManager;
    cc._RF.pop();
  }, {} ],
  RotateAround: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3903fJFh9D85nIWFGQJpbF", "RotateAround");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Axis = void 0;
    var Axis;
    (function(Axis) {
      Axis[Axis["PositiveX"] = 0] = "PositiveX";
      Axis[Axis["PositiveY"] = 1] = "PositiveY";
      Axis[Axis["NegativeX"] = 2] = "NegativeX";
      Axis[Axis["NegativeY"] = 3] = "NegativeY";
    })(Axis = exports.Axis || (exports.Axis = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, help = _a.help, menu = _a.menu;
    var RotateAround = function(_super) {
      __extends(RotateAround, _super);
      function RotateAround() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.clockwise = true;
        _this.timePerRound = 10;
        _this.faceToTarget = false;
        _this.faceAxis = Axis.NegativeY;
        _this.autoStart = false;
        _this.angle = 0;
        _this.radius = 0;
        _this.isRotating = false;
        return _this;
      }
      RotateAround.prototype.start = function() {
        this.autoStart && this.run();
      };
      RotateAround.prototype.update = function(dt) {
        if (!this.isRotating || !this.target) return;
        var angle = this.angle;
        var radian = Math.PI / 180 * angle;
        var node = this.node, target = this.target, radius = this.radius;
        node.x = target.x + radius * Math.cos(radian);
        node.y = target.y + radius * Math.sin(radian);
        if (this.faceToTarget) switch (this.faceAxis) {
         case Axis.PositiveX:
          node.angle = angle + 180;
          break;

         case Axis.PositiveY:
          node.angle = angle + 90;
          break;

         case Axis.NegativeX:
          node.angle = angle;
          break;

         case Axis.NegativeY:
          node.angle = angle - 90;
        }
        var anglePerFrame = dt * (360 / this.timePerRound);
        angle = this.angle += this.clockwise ? -anglePerFrame : anglePerFrame;
        angle >= 720 ? this.angle %= 360 : angle <= -720 && (this.angle %= -360);
      };
      RotateAround.prototype.run = function(target, clockwise, timePerRound, faceToTarget, faceAxis) {
        void 0 != target && (this.target = target);
        void 0 != clockwise && (this.clockwise = clockwise);
        void 0 != timePerRound && (this.timePerRound = timePerRound);
        void 0 != faceToTarget && (this.faceToTarget = faceToTarget);
        void 0 != faceAxis && (this.faceAxis = faceAxis);
        if (!this.target) {
          cc.warn("[RotateAround]", "No target!");
          return;
        }
        var p1 = this.target.getPosition(), p2 = this.node.getPosition();
        this.angle = this.getAngle(p1, p2);
        this.radius = this.getDistance(p1, p2);
        this.isRotating = true;
      };
      RotateAround.prototype.stop = function() {
        this.isRotating = false;
      };
      RotateAround.prototype.getAngle = function(p1, p2) {
        return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
      };
      RotateAround.prototype.getDistance = function(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], RotateAround.prototype, "target", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RotateAround.prototype, "clockwise", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RotateAround.prototype, "timePerRound", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RotateAround.prototype, "faceToTarget", void 0);
      __decorate([ property({
        type: cc.Enum(Axis),
        visible: function() {
          return this.faceToTarget;
        },
        tooltip: false
      }) ], RotateAround.prototype, "faceAxis", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RotateAround.prototype, "autoStart", void 0);
      RotateAround = __decorate([ ccclass, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/RotateAround.ts"), menu("eazax/\u5176\u4ed6\u7ec4\u4ef6/RotateAround") ], RotateAround);
      return RotateAround;
    }(cc.Component);
    exports.default = RotateAround;
    cc._RF.pop();
  }, {} ],
  RunInBackground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "970dctLoZZCzYoa6ziVrFrx", "RunInBackground");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, help = _a.help, menu = _a.menu;
    var RunInBackground = function(_super) {
      __extends(RunInBackground, _super);
      function RunInBackground() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.url = "/worker.js";
        _this.worker = null;
        return _this;
      }
      RunInBackground.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      RunInBackground.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      RunInBackground.prototype.registerEvent = function() {
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
        document.addEventListener("visibilitychange", this.onVisibilityChange);
      };
      RunInBackground.prototype.unregisterEvent = function() {
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
      };
      RunInBackground.prototype.init = function() {};
      RunInBackground.prototype.onVisibilityChange = function() {
        if ("hidden" === document.visibilityState) {
          cc.game.isPaused() && cc.game.resume();
          this.worker = new Worker(this.url);
          this.worker.onmessage = function() {
            cc.director["mainLoop"]();
          };
        } else if ("visible" === document.visibilityState && this.worker) {
          this.worker.terminate();
          this.worker = null;
        }
      };
      __decorate([ property({
        displayName: false,
        tooltip: false
      }) ], RunInBackground.prototype, "url", void 0);
      RunInBackground = __decorate([ ccclass, executionOrder(-1), help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/RunInBackground.ts"), menu("eazax/\u5176\u4ed6\u7ec4\u4ef6/RunInBackground") ], RunInBackground);
      return RunInBackground;
    }(cc.Component);
    exports.default = RunInBackground;
    cc._RF.pop();
  }, {} ],
  SceneNavigator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14cc97JUYJKyLHeB8Y2fKwp", "SceneNavigator");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SceneNavigator = function() {
      function SceneNavigator() {}
      Object.defineProperty(SceneNavigator, "home", {
        get: function() {
          return this._home;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SceneNavigator, "history", {
        get: function() {
          return this._history;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SceneNavigator, "curScene", {
        get: function() {
          return this._curScene;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SceneNavigator, "param", {
        get: function() {
          return this._param;
        },
        enumerable: false,
        configurable: true
      });
      SceneNavigator.setHome = function(name) {
        this._home = name;
        this._history = [ name ];
        this._curScene = name;
      };
      SceneNavigator.goHome = function(param, coverHistory, onLaunched) {
        var _this = this;
        this._param = null;
        var name = this._home;
        if (this._curScene === name) return;
        cc.director.loadScene(name, function() {
          coverHistory && (_this._history.length = 0);
          _this._history.push(name);
          _this._curScene = name;
          _this._param = param || null;
          onLaunched && onLaunched();
        });
      };
      SceneNavigator.go = function(name, param, onLaunched) {
        var _this = this;
        this._param = null;
        cc.director.loadScene(name, function() {
          _this._history.push(name);
          _this._curScene = name;
          _this._param = param || null;
          onLaunched && onLaunched();
        });
      };
      SceneNavigator.back = function(param, onLaunched) {
        var _this = this;
        if (this._history.length < 1) return;
        this._param = null;
        var history = this._history, name = history[history.length - 2];
        cc.director.loadScene(name, function() {
          history.pop();
          _this._curScene = name;
          _this._param = param || null;
          onLaunched && onLaunched();
        });
      };
      SceneNavigator._home = null;
      SceneNavigator._history = [];
      SceneNavigator._curScene = null;
      SceneNavigator._param = null;
      return SceneNavigator;
    }();
    exports.default = SceneNavigator;
    cc._RF.pop();
  }, {} ],
  ScreenAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "32ac7U3+OdFpJMImIy13br0", "ScreenAdapter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager_1 = require("../core/EventManager");
    var _a = cc._decorator, ccclass = _a.ccclass, executionOrder = _a.executionOrder, help = _a.help, menu = _a.menu;
    var ScreenAdapter = function(_super) {
      __extends(ScreenAdapter, _super);
      function ScreenAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ScreenAdapter.prototype.onLoad = function() {
        this.init();
      };
      ScreenAdapter.prototype.onEnable = function() {
        this.adapt();
      };
      ScreenAdapter.prototype.init = function() {
        var _this = this;
        cc.view.setResizeCallback(function() {
          return _this.onResize();
        });
      };
      ScreenAdapter.prototype.onResize = function() {
        EventManager_1.default.emit("view-resize");
        this.adapt();
      };
      ScreenAdapter.prototype.adapt = function() {
        var winSize = cc.winSize, screenRatio = winSize.width / winSize.height;
        var designResolution = cc.Canvas.instance.designResolution, designRatio = designResolution.width / designResolution.height;
        screenRatio <= 1 && screenRatio <= designRatio ? this.setFitWidth() : this.setFitHeight();
      };
      ScreenAdapter.prototype.setFitHeight = function() {
        var canvas = cc.Canvas.instance;
        canvas.fitHeight = true;
        canvas.fitWidth = false;
      };
      ScreenAdapter.prototype.setFitWidth = function() {
        var canvas = cc.Canvas.instance;
        canvas.fitHeight = false;
        canvas.fitWidth = true;
      };
      ScreenAdapter = __decorate([ ccclass, executionOrder(-1), help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/ScreenAdapter.ts"), menu("eazax/\u5176\u4ed6\u7ec4\u4ef6/ScreenAdapter") ], ScreenAdapter);
      return ScreenAdapter;
    }(cc.Component);
    exports.default = ScreenAdapter;
    cc._RF.pop();
  }, {
    "../core/EventManager": "EventManager"
  } ],
  SineWave: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8873cgmM19Mb414MmY3ZA8/", "SineWave");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SineWaveDirection = void 0;
    var EditorAsset_1 = require("../../misc/EditorAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder;
    var SineWaveDirection;
    (function(SineWaveDirection) {
      SineWaveDirection[SineWaveDirection["Left"] = 1] = "Left";
      SineWaveDirection[SineWaveDirection["Right"] = 2] = "Right";
    })(SineWaveDirection = exports.SineWaveDirection || (exports.SineWaveDirection = {}));
    var SineWave = function(_super) {
      __extends(SineWave, _super);
      function SineWave() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effect = null;
        _this._amplitude = .05;
        _this._angularVelocity = 10;
        _this._frequency = 10;
        _this._height = .5;
        _this._direction = SineWaveDirection.Left;
        _this.sprite = null;
        _this.material = null;
        return _this;
      }
      Object.defineProperty(SineWave.prototype, "effect", {
        get: function() {
          return this._effect;
        },
        set: function(value) {
          this._effect = value;
          this.init();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SineWave.prototype, "amplitude", {
        get: function() {
          return this._amplitude;
        },
        set: function(value) {
          this._amplitude = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SineWave.prototype, "angularVelocity", {
        get: function() {
          return this._angularVelocity;
        },
        set: function(value) {
          this._angularVelocity = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SineWave.prototype, "frequency", {
        get: function() {
          return this._frequency;
        },
        set: function(value) {
          this._frequency = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SineWave.prototype, "height", {
        get: function() {
          return this._height;
        },
        set: function(value) {
          this._height = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SineWave.prototype, "direction", {
        get: function() {
          return this._direction;
        },
        set: function(value) {
          this._direction = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      SineWave.prototype.onLoad = function() {
        this.init();
      };
      SineWave.prototype.resetInEditor = function() {
        this.init();
      };
      SineWave.prototype.init = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              true;
              return [ 3, 2 ];

             case 1:
              _a.sent();
              _a.label = 2;

             case 2:
              if (!this._effect) return [ 2 ];
              this.sprite = this.node.getComponent(cc.Sprite);
              this.sprite.spriteFrame && (this.sprite.spriteFrame.getTexture().packable = false);
              this.material = cc.Material.create(this._effect);
              this.sprite.setMaterial(0, this.material);
              this.updateProperties();
              return [ 2 ];
            }
          });
        });
      };
      SineWave.prototype.setSpriteFrame = function(spriteFrame) {
        this.sprite.spriteFrame = spriteFrame;
        this.sprite.spriteFrame.getTexture().packable = false;
        this.updateProperties();
      };
      SineWave.prototype.updateProperties = function() {
        if (!this.effect) return cc.warn("[SineWave]", "\u8bf7\u6307\u5b9a Effect \u8d44\u6e90\uff01");
        this.material.setProperty("amplitude", this._amplitude);
        this.material.setProperty("angularVelocity", this._angularVelocity);
        this.material.setProperty("frequency", this._frequency);
        this.material.setProperty("offset", 1 - this._height + this._amplitude);
        this.material.setProperty("toLeft", this._direction === SineWaveDirection.Left);
      };
      __decorate([ property ], SineWave.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false,
        readonly: true
      }) ], SineWave.prototype, "effect", null);
      __decorate([ property ], SineWave.prototype, "_amplitude", void 0);
      __decorate([ property({
        tooltip: false
      }) ], SineWave.prototype, "amplitude", null);
      __decorate([ property ], SineWave.prototype, "_angularVelocity", void 0);
      __decorate([ property({
        tooltip: false
      }) ], SineWave.prototype, "angularVelocity", null);
      __decorate([ property ], SineWave.prototype, "_frequency", void 0);
      __decorate([ property({
        tooltip: false
      }) ], SineWave.prototype, "frequency", null);
      __decorate([ property ], SineWave.prototype, "_height", void 0);
      __decorate([ property({
        tooltip: false
      }) ], SineWave.prototype, "height", null);
      __decorate([ property ], SineWave.prototype, "_direction", void 0);
      __decorate([ property({
        type: cc.Enum(SineWaveDirection),
        tooltip: false
      }) ], SineWave.prototype, "direction", null);
      SineWave = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple, executionOrder(-100) ], SineWave);
      return SineWave;
    }(cc.Component);
    exports.default = SineWave;
    cc._RF.pop();
  }, {
    "../../misc/EditorAsset": "EditorAsset"
  } ],
  SpineLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bc29zDh2FJYqlE6lLUi+ZT", "SpineLoader");
    "use strict";
    var __assign = this && this.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ZipLoader_1 = require("./ZipLoader");
    var SpineLoader = function() {
      function SpineLoader() {}
      SpineLoader.loadRemote = function(url, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var zip, files, skeletonData;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, ZipLoader_1.default.loadRemote(url) ];

             case 1:
              zip = _a.sent();
              if (!zip) {
                callback && callback(new Error("download failed"), null);
                return [ 2, null ];
              }
              return [ 4, SpineLoader.extractFiles(zip) ];

             case 2:
              files = _a.sent();
              if (!files) {
                callback && callback(new Error("parse zip file failed"), null);
                return [ 2, null ];
              }
              skeletonData = SpineLoader.getSkeletonData(__assign({
                url: url
              }, files));
              if (!skeletonData) {
                callback && callback(new Error("generate skeleton data failed"), null);
                return [ 2, null ];
              }
              callback && callback(null, skeletonData);
              return [ 2, skeletonData ];
            }
          });
        });
      };
      SpineLoader.extractFiles = function(zip) {
        return __awaiter(this, void 0, void 0, function() {
          var json, jsonName, texture, textureName, atlas, files, tasks, _loop_1, key;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              files = zip.files, tasks = [];
              _loop_1 = function(key) {
                tasks.push(function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    var file, fileName, extname, _a;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                       case 0:
                        file = files[key], fileName = file.name, extname = fileName.slice(fileName.lastIndexOf("."));
                        _a = extname;
                        switch (_a) {
                         case ".json":
                          return [ 3, 1 ];

                         case ".png":
                          return [ 3, 3 ];

                         case ".atlas":
                         case ".txt":
                          return [ 3, 5 ];
                        }
                        return [ 3, 7 ];

                       case 1:
                        return [ 4, ZipLoader_1.default.toJson(file) ];

                       case 2:
                        json = _b.sent();
                        jsonName = key;
                        return [ 3, 7 ];

                       case 3:
                        return [ 4, ZipLoader_1.default.toCCTexture(file) ];

                       case 4:
                        texture = _b.sent();
                        texture.name = fileName;
                        textureName = key;
                        return [ 3, 7 ];

                       case 5:
                        return [ 4, ZipLoader_1.default.toText(file) ];

                       case 6:
                        atlas = _b.sent();
                        return [ 3, 7 ];

                       case 7:
                        return [ 2 ];
                      }
                    });
                  });
                }());
              };
              for (key in files) _loop_1(key);
              return [ 4, Promise.all(tasks) ];

             case 1:
              _a.sent();
              if (!json || !texture || !atlas) return [ 2, null ];
              return [ 2, {
                json: json,
                jsonName: jsonName,
                texture: texture,
                textureName: textureName,
                atlas: atlas
              } ];
            }
          });
        });
      };
      SpineLoader.getSkeletonData = function(data) {
        var skeletonData = new sp.SkeletonData();
        skeletonData.skeletonJson = data.json;
        skeletonData.atlasText = data.atlas;
        skeletonData.textures = [ data.texture ];
        skeletonData["textureNames"] = [ data.textureName ];
        skeletonData["_name"] = data.jsonName;
        skeletonData["_uuid"] = data.url;
        skeletonData["_native"] = data.url;
        skeletonData.loaded = true;
        return skeletonData;
      };
      return SpineLoader;
    }();
    exports.default = SpineLoader;
    cc._RF.pop();
  }, {
    "./ZipLoader": "ZipLoader"
  } ],
  StorageUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d48cd0WtsJDRJOp/8A4XMho", "StorageUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StorageUtil = function() {
      function StorageUtil() {}
      StorageUtil.set = function(key, value) {
        "object" === typeof value ? cc.sys.localStorage.setItem(key, JSON.stringify(value)) : cc.sys.localStorage.setItem(key, value);
      };
      StorageUtil.get = function(key, parse) {
        void 0 === parse && (parse = true);
        var dataString = cc.sys.localStorage.getItem(key);
        if (dataString) {
          if (parse) try {
            return JSON.parse(dataString);
          } catch (_a) {
            return dataString;
          }
          return dataString;
        }
        return null;
      };
      StorageUtil.remove = function(key) {
        cc.sys.localStorage.removeItem(key);
      };
      return StorageUtil;
    }();
    exports.default = StorageUtil;
    cc._RF.pop();
  }, {} ],
  Subtitle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04105hiMEhM04bn/nXGON/8", "Subtitle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Subtitle = function(_super) {
      __extends(Subtitle, _super);
      function Subtitle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.queen = [];
        _this.curIndex = 0;
        _this.interval = 1.5;
        return _this;
      }
      Subtitle_1 = Subtitle;
      Subtitle.prototype.onLoad = function() {
        Subtitle_1.instance = this;
      };
      Subtitle.print = function(texts, interval) {
        void 0 === interval && (interval = 1.5);
        this.instance.print(texts, interval);
      };
      Subtitle.clear = function() {
        this.instance.clear();
      };
      Subtitle.prototype.print = function(texts, interval) {
        void 0 === interval && (interval = 1.5);
        if (0 === texts.length) return;
        this.unscheduleAllCallbacks();
        this.queen = texts;
        this.interval = interval;
        this.curIndex = -1;
        this.next();
      };
      Subtitle.prototype.next = function() {
        var _this = this;
        this.curIndex++;
        if (this.curIndex >= this.queen.length) {
          this.unscheduleAllCallbacks();
          return;
        }
        this.label.string = this.queen[this.curIndex];
        this.scheduleOnce(function() {
          return _this.next();
        }, this.interval);
      };
      Subtitle.prototype.clear = function() {
        this.unscheduleAllCallbacks();
        this.queen = [];
        this.curIndex = 0;
        this.label.string = "";
      };
      var Subtitle_1;
      Subtitle.instance = null;
      __decorate([ property(cc.Label) ], Subtitle.prototype, "label", void 0);
      Subtitle = Subtitle_1 = __decorate([ ccclass ], Subtitle);
      return Subtitle;
    }(cc.Component);
    exports.default = Subtitle;
    cc._RF.pop();
  }, {} ],
  TestPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a280amvZ71EppVV4wlg851a", "TestPopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PopupBase_1 = require("../../../eazax-ccc/components/popups/PopupBase");
    var PopupManager_1 = require("../../../eazax-ccc/core/PopupManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TestPopup = function(_super) {
      __extends(TestPopup, _super);
      function TestPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.closeBtn = null;
        _this.curFlagLabel = null;
        _this.newFlagLabel = null;
        _this.normalBtn = null;
        _this.priorityBtn = null;
        _this.immediatelyBtn = null;
        _this.newFlag = null;
        return _this;
      }
      TestPopup_1 = TestPopup;
      Object.defineProperty(TestPopup, "path", {
        get: function() {
          return "prefabs/TestPopup";
        },
        enumerable: false,
        configurable: true
      });
      TestPopup.prototype.onLoad = function() {
        this.registerEvent();
      };
      TestPopup.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      TestPopup.prototype.registerEvent = function() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.priorityBtn.on(cc.Node.EventType.TOUCH_END, this.onPriorityBtnClick, this);
        this.immediatelyBtn.on(cc.Node.EventType.TOUCH_END, this.onImmediatelyBtnClick, this);
      };
      TestPopup.prototype.unregisterEvent = function() {};
      TestPopup.prototype.updateDisplay = function(options) {
        this.curFlagLabel.string = options;
        this.updateFlag();
      };
      TestPopup.prototype.updateFlag = function() {
        this.newFlag = (1e4 * Math.random()).toFixed(0).padStart(5, "0");
        this.newFlagLabel.string = this.newFlag;
      };
      TestPopup.prototype.onCloseBtnClick = function() {
        this.hide();
      };
      TestPopup.prototype.onNormalBtnClick = function() {
        var params = {
          mode: PopupManager_1.default.CacheMode.Normal,
          priority: 0
        };
        PopupManager_1.default.show(TestPopup_1.path, this.newFlag, params);
        this.updateFlag();
      };
      TestPopup.prototype.onPriorityBtnClick = function() {
        var params = {
          mode: PopupManager_1.default.CacheMode.Normal,
          priority: -1
        };
        PopupManager_1.default.show(TestPopup_1.path, this.newFlag, params);
        this.updateFlag();
      };
      TestPopup.prototype.onImmediatelyBtnClick = function() {
        var params = {
          mode: PopupManager_1.default.CacheMode.Frequent,
          immediately: true
        };
        PopupManager_1.default.show(TestPopup_1.path, this.newFlag, params);
      };
      var TestPopup_1;
      __decorate([ property(cc.Node) ], TestPopup.prototype, "closeBtn", void 0);
      __decorate([ property(cc.Label) ], TestPopup.prototype, "curFlagLabel", void 0);
      __decorate([ property(cc.Label) ], TestPopup.prototype, "newFlagLabel", void 0);
      __decorate([ property(cc.Node) ], TestPopup.prototype, "normalBtn", void 0);
      __decorate([ property(cc.Node) ], TestPopup.prototype, "priorityBtn", void 0);
      __decorate([ property(cc.Node) ], TestPopup.prototype, "immediatelyBtn", void 0);
      TestPopup = TestPopup_1 = __decorate([ ccclass ], TestPopup);
      return TestPopup;
    }(PopupBase_1.default);
    exports.default = TestPopup;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/popups/PopupBase": "PopupBase",
    "../../../eazax-ccc/core/PopupManager": "PopupManager"
  } ],
  Test_3DNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "919f1iDvJpK1bqzNi6SlZXI", "Test_3DNode");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {};
      NewClass.prototype.start = function() {};
      NewClass.prototype.update = function(dt) {};
      NewClass = __decorate([ ccclass, executeInEditMode ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Test_NodeOrder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60620aQTsBI07ze2UFgB6P2", "Test_NodeOrder");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var Test_NodeOrder = function(_super) {
      __extends(Test_NodeOrder, _super);
      function Test_NodeOrder() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(Test_NodeOrder.prototype, "siblingIndex", {
        get: function() {
          return this.node.getSiblingIndex();
        },
        set: function(value) {
          this.node.setSiblingIndex(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Test_NodeOrder.prototype, "zIndex", {
        get: function() {
          return this.node.zIndex;
        },
        set: function(value) {
          this.node.zIndex = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Test_NodeOrder.prototype, "localZOrder", {
        get: function() {
          return this.node._localZOrder;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Test_NodeOrder.prototype, "localZOrderBinary", {
        get: function() {
          return this.node._localZOrder.toString(2).padStart(32, 0);
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property({
        displayName: "siblingIndex"
      }) ], Test_NodeOrder.prototype, "siblingIndex", null);
      __decorate([ property({
        displayName: "zIndex"
      }) ], Test_NodeOrder.prototype, "zIndex", null);
      __decorate([ property({
        displayName: "_localZOrder"
      }) ], Test_NodeOrder.prototype, "localZOrder", null);
      __decorate([ property({
        displayName: "_localZOrder (\u4e8c\u8fdb\u5236)"
      }) ], Test_NodeOrder.prototype, "localZOrderBinary", null);
      Test_NodeOrder = __decorate([ ccclass, executeInEditMode ], Test_NodeOrder);
      return Test_NodeOrder;
    }(cc.Component);
    exports.default = Test_NodeOrder;
    cc._RF.pop();
  }, {} ],
  Test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9868fF6/QZPo5kW5eeYC6qJ", "Test");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Test = function(_super) {
      __extends(Test, _super);
      function Test() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Test.prototype.start = function() {};
      Test = __decorate([ ccclass ], Test);
      return Test;
    }(cc.Component);
    exports.default = Test;
    cc._RF.pop();
  }, {} ],
  TextureUsage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2e35cRJpYhOJpL/WOdV1ZGq", "TextureUsage");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var TextureUsage = function(_super) {
      __extends(TextureUsage, _super);
      function TextureUsage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        _this.label = null;
        return _this;
      }
      TextureUsage_1 = TextureUsage;
      TextureUsage.prototype.onLoad = function() {
        this.init();
      };
      TextureUsage.prototype.lateUpdate = function(dt) {
        this.main.active && this.updateTextureUsage();
      };
      TextureUsage.prototype.onDestroy = function() {
        this.release();
      };
      TextureUsage.prototype.init = function() {
        TextureUsage_1.instance = this;
        this.reset();
      };
      TextureUsage.prototype.release = function() {
        TextureUsage_1.instance && (TextureUsage_1.instance = null);
      };
      TextureUsage.prototype.reset = function() {
        this.main.active = false;
      };
      TextureUsage.prototype.show = function() {
        this.main.active = true;
      };
      TextureUsage.prototype.hide = function() {
        this.main.active = false;
      };
      TextureUsage.prototype.updateTextureUsage = function() {
        var _a = this.getTextureUsage(), count = _a.count, memory = _a.memory;
        this.label.string = "\u7eb9\u7406 [\u6570\u91cf: " + count + " | \u5185\u5b58: " + memory.toFixed(2) + "M ]";
      };
      TextureUsage.prototype.getTextureUsage = function() {
        var count = 0, memory = 0;
        cc.assetManager.assets.forEach(function(asset, key) {
          if (asset instanceof cc.Texture2D) {
            count++;
            var pixelSize = ".jpg" === asset["_native"] ? 3 : 4, textureSize = asset.width * asset.height * pixelSize / 1048576;
            memory += textureSize;
          }
        });
        return {
          count: count,
          memory: memory
        };
      };
      TextureUsage.show = function() {
        if (!this.instance) return;
        this.instance.show();
      };
      TextureUsage.hide = function() {
        if (!this.instance) return;
        this.instance.hide();
      };
      var TextureUsage_1;
      TextureUsage.instance = null;
      __decorate([ property({
        type: cc.Node,
        displayName: false
      }) ], TextureUsage.prototype, "main", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: false
      }) ], TextureUsage.prototype, "label", void 0);
      TextureUsage = TextureUsage_1 = __decorate([ ccclass ], TextureUsage);
      return TextureUsage;
    }(cc.Component);
    exports.default = TextureUsage;
    cc._RF.pop();
  }, {} ],
  TextureWithTilingOffset: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "210beBhmsFKuINV/YIju8O3", "TextureWithTilingOffset");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseAssembler_1 = require("../../core/renderer/BaseAssembler");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple, help = _a.help, menu = _a.menu;
    var TextureWithTilingOffset = function(_super) {
      __extends(TextureWithTilingOffset, _super);
      function TextureWithTilingOffset() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._material = null;
        _this._texture = null;
        _this._tilingOffset = new cc.Vec4(1, 1, 0, 0);
        _this._assembler = null;
        return _this;
      }
      Object.defineProperty(TextureWithTilingOffset.prototype, "materials", {
        get: function() {
          return this._materials;
        },
        set: function(value) {
          this._materials = value;
          this._activateMaterial();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TextureWithTilingOffset.prototype, "material", {
        get: function() {
          return this._material;
        },
        set: function(value) {
          this._material = value;
          this._activateMaterial();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TextureWithTilingOffset.prototype, "texture", {
        get: function() {
          return this._texture;
        },
        set: function(value) {
          this._texture = value;
          this._activateMaterial();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TextureWithTilingOffset.prototype, "tiling", {
        get: function() {
          return new cc.Vec2(this._tilingOffset.x, this._tilingOffset.y);
        },
        set: function(value) {
          this._tilingOffset.x = value.x;
          this._tilingOffset.y = value.y;
          this._updateMaterial();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(TextureWithTilingOffset.prototype, "offset", {
        get: function() {
          return new cc.Vec2(this._tilingOffset.z, this._tilingOffset.w);
        },
        set: function(value) {
          this._tilingOffset.z = value.x;
          this._tilingOffset.w = value.y;
          this._updateMaterial();
        },
        enumerable: false,
        configurable: true
      });
      TextureWithTilingOffset.prototype.onEnable = function() {
        _super.prototype.onEnable.call(this);
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
      };
      TextureWithTilingOffset.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
      };
      TextureWithTilingOffset.prototype._resetAssembler = function() {
        this._assembler = new BaseAssembler_1.default();
        this._assembler.init(this);
        this.setVertsDirty();
      };
      TextureWithTilingOffset.prototype._activateMaterial = function() {
        this._material && (this._materials[0] = cc.MaterialVariant.create(this._material, this));
        this._updateMaterial();
      };
      TextureWithTilingOffset.prototype._updateMaterial = function() {
        if (this._texture && this._materials[0]) {
          var material = this._materials[0];
          void 0 !== material.getDefine("USE_TEXTURE") && material.define("USE_TEXTURE", true);
          material.setProperty("texture", this._texture);
          material.setProperty("tilingOffset", this._tilingOffset);
          this.markForRender(true);
        } else this.disableRender();
      };
      TextureWithTilingOffset.prototype._validateRender = function() {
        this._texture && this._materials[0] || this.disableRender();
      };
      __decorate([ property({
        override: true,
        visible: false
      }) ], TextureWithTilingOffset.prototype, "materials", null);
      __decorate([ property() ], TextureWithTilingOffset.prototype, "_material", void 0);
      __decorate([ property({
        type: cc.Material,
        tooltip: false
      }) ], TextureWithTilingOffset.prototype, "material", null);
      __decorate([ property() ], TextureWithTilingOffset.prototype, "_texture", void 0);
      __decorate([ property({
        type: cc.Texture2D,
        tooltip: false
      }) ], TextureWithTilingOffset.prototype, "texture", null);
      __decorate([ property() ], TextureWithTilingOffset.prototype, "_tilingOffset", void 0);
      __decorate([ property({
        type: cc.Vec2,
        tooltip: false
      }) ], TextureWithTilingOffset.prototype, "tiling", null);
      __decorate([ property({
        type: cc.Vec2,
        tooltip: false
      }) ], TextureWithTilingOffset.prototype, "offset", null);
      TextureWithTilingOffset = __decorate([ ccclass, executeInEditMode, disallowMultiple, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/renderers/TextureWithTilingOffset.ts"), menu("eazax/\u6e32\u67d3\u7ec4\u4ef6/BaseTextureRenderer") ], TextureWithTilingOffset);
      return TextureWithTilingOffset;
    }(cc.RenderComponent);
    exports.default = TextureWithTilingOffset;
    cc._RF.pop();
  }, {
    "../../core/renderer/BaseAssembler": "BaseAssembler"
  } ],
  TimeUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48b69XZILlEzJX3Tl7x6Yp8", "TimeUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TimeUtil = function() {
      function TimeUtil() {}
      TimeUtil.getTimestamp = function() {
        return new Date().getTime();
      };
      TimeUtil.getDate = function() {
        return new Date().toLocaleDateString();
      };
      TimeUtil.getTargetTimestamp = function(hour, minute, second) {
        void 0 === hour && (hour = 0);
        void 0 === minute && (minute = 0);
        void 0 === second && (second = 0);
        var start = new Date(new Date().toLocaleDateString()).getTime();
        var target = 1e3 * (3600 * hour + 60 * minute + second);
        return new Date(start + target).getTime();
      };
      TimeUtil.msToHMS = function(time, separator, keepHours) {
        void 0 === separator && (separator = ":");
        void 0 === keepHours && (keepHours = true);
        var hours = Math.floor(time / 36e5);
        var minutes = Math.floor((time - 36e5 * hours) / 6e4);
        var seconds = Math.floor((time - 36e5 * hours - 6e4 * minutes) / 1e3);
        var hoursString = 0 !== hours || keepHours ? hours.toString().padStart(2, "0") + ":" : "";
        return "" + hoursString + minutes.toString().padStart(2, "0") + separator + seconds.toString().padStart(2, "0");
      };
      return TimeUtil;
    }();
    exports.default = TimeUtil;
    cc._RF.pop();
  }, {} ],
  Toast: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d3fc6Gw9JFCafs9DKPfbjt", "Toast");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var Toast = function(_super) {
      __extends(Toast, _super);
      function Toast() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.main = null;
        _this.label = null;
        return _this;
      }
      Toast_1 = Toast;
      Toast.prototype.onLoad = function() {
        this.init();
      };
      Toast.prototype.onDestroy = function() {
        this.release();
      };
      Toast.prototype.init = function() {
        Toast_1.instance = this;
        this.reset();
      };
      Toast.prototype.release = function() {
        Toast_1.instance && (Toast_1.instance = null);
      };
      Toast.prototype.reset = function() {
        this.main.active = false;
      };
      Toast.prototype.show = function() {
        var texts = [];
        for (var _i = 0; _i < arguments.length; _i++) texts[_i] = arguments[_i];
        var node = this.main;
        cc.Tween.stopAllByTarget(node);
        if (!node.active) {
          node.opacity = 0;
          node.active = true;
        }
        this.label.string = texts.join(" ");
        var duration = (200 - node.opacity) / 200 * .2;
        cc.tween(node).to(duration, {
          opacity: 200
        }).delay(2).to(.2, {
          opacity: 0
        }).set({
          active: false
        }).start();
      };
      Toast.prototype.hide = function() {
        var node = this.main;
        cc.Tween.stopAllByTarget(node);
        var duration = node.opacity / 200 * .2;
        cc.tween(node).to(duration, {
          opacity: 0
        }).set({
          active: false
        }).start();
      };
      Toast.show = function() {
        var _a;
        var texts = [];
        for (var _i = 0; _i < arguments.length; _i++) texts[_i] = arguments[_i];
        if (!this.instance) return;
        (_a = this.instance).show.apply(_a, texts);
      };
      Toast.hide = function() {
        if (!this.instance) return;
        this.instance.hide();
      };
      var Toast_1;
      Toast.instance = null;
      __decorate([ property({
        type: cc.Node,
        displayName: false
      }) ], Toast.prototype, "main", void 0);
      __decorate([ property({
        type: cc.Label,
        displayName: false
      }) ], Toast.prototype, "label", void 0);
      Toast = Toast_1 = __decorate([ ccclass ], Toast);
      return Toast;
    }(cc.Component);
    exports.default = Toast;
    cc._RF.pop();
  }, {} ],
  TouchBlocker2: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b209X9V79HAbgaI2cogShP", "TouchBlocker2");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TouchBlocker2 = function(_super) {
      __extends(TouchBlocker2, _super);
      function TouchBlocker2() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.allowList = [];
        _this.blocked = false;
        _this.persist = false;
        return _this;
      }
      TouchBlocker2_1 = TouchBlocker2;
      TouchBlocker2.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      TouchBlocker2.prototype.onDestroy = function() {
        this.unregisterEvent();
        TouchBlocker2_1.instance = null;
      };
      TouchBlocker2.prototype.init = function() {
        if (this.persist) {
          this.node.setParent(cc.Canvas.instance.node);
          this.node.setSiblingIndex(cc.macro.MAX_ZINDEX);
          cc.game.addPersistRootNode(this.node);
        }
        TouchBlocker2_1.instance = this;
      };
      TouchBlocker2.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEvent, this);
        this.setSwallowTouches(false);
      };
      TouchBlocker2.prototype.unregisterEvent = function() {
        this.node.targetOff(this);
      };
      TouchBlocker2.prototype.onEvent = function(event) {
        this.blocked && !this.clickOnAnyTarget(event.getLocation()) && event.stopPropagationImmediate();
      };
      TouchBlocker2.prototype.clickOnAnyTarget = function(pos) {
        for (var i = 0; i < this.allowList.length; i++) {
          var rect = this.allowList[i].getBoundingBoxToWorld();
          if (rect.contains(pos)) return true;
        }
        return false;
      };
      TouchBlocker2.prototype.setSwallowTouches = function(swallow) {
        this.node._touchListener.setSwallowTouches(swallow);
      };
      TouchBlocker2.addTargets = function(nodes) {
        var _a;
        Array.isArray(nodes) ? (_a = this.instance.allowList).push.apply(_a, nodes) : this.instance.allowList.push(nodes);
      };
      TouchBlocker2.setTarget = function(node) {
        this.clearTargets();
        this.instance.allowList.push(node);
      };
      TouchBlocker2.clearTargets = function() {
        this.instance.allowList.length = 0;
      };
      TouchBlocker2.on = function() {
        this.instance.blocked = true;
      };
      TouchBlocker2.off = function() {
        this.instance.blocked = false;
      };
      var TouchBlocker2_1;
      TouchBlocker2.instance = null;
      __decorate([ property({
        type: [ cc.Node ],
        tooltip: false
      }) ], TouchBlocker2.prototype, "allowList", void 0);
      __decorate([ property({
        tooltip: false
      }) ], TouchBlocker2.prototype, "blocked", void 0);
      __decorate([ property({
        tooltip: false
      }) ], TouchBlocker2.prototype, "persist", void 0);
      TouchBlocker2 = TouchBlocker2_1 = __decorate([ ccclass ], TouchBlocker2);
      return TouchBlocker2;
    }(cc.Component);
    exports.default = TouchBlocker2;
    cc._RF.pop();
  }, {} ],
  TouchBlocker: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff5f8f/CqNOH5gfQbiVhjvH", "TouchBlocker");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TouchBlocker = function(_super) {
      __extends(TouchBlocker, _super);
      function TouchBlocker() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.isBlockAll = false;
        _this.isPassAll = false;
        return _this;
      }
      TouchBlocker.prototype.onLoad = function() {
        this.registerEvent();
      };
      TouchBlocker.prototype.start = function() {
        this.reset();
      };
      TouchBlocker.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      TouchBlocker.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEvent, this);
      };
      TouchBlocker.prototype.unregisterEvent = function() {
        this.node.targetOff(this);
      };
      TouchBlocker.prototype.reset = function() {
        this.setSwallowTouches(false);
      };
      TouchBlocker.prototype.onTouchEvent = function(event) {
        if (this.isPassAll) return;
        if (this.isBlockAll || !this.target) {
          event.stopPropagationImmediate();
          return;
        }
        var targetRect = this.target.getBoundingBoxToWorld(), isContains = targetRect.contains(event.getLocation());
        isContains || event.stopPropagationImmediate();
      };
      TouchBlocker.prototype.blockAll = function() {
        this.isBlockAll = true;
        this.isPassAll = false;
      };
      TouchBlocker.prototype.passAll = function() {
        this.isPassAll = true;
        this.isBlockAll = false;
      };
      TouchBlocker.prototype.setTarget = function(node) {
        this.target = node;
        this.isBlockAll = false;
        this.isPassAll = false;
      };
      TouchBlocker.prototype.setSwallowTouches = function(swallow) {
        this.node._touchListener && this.node._touchListener.setSwallowTouches(swallow);
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], TouchBlocker.prototype, "target", void 0);
      TouchBlocker = __decorate([ ccclass ], TouchBlocker);
      return TouchBlocker;
    }(cc.Component);
    exports.default = TouchBlocker;
    cc._RF.pop();
  }, {} ],
  TouchEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a2c9N0MhRLqp5P1w0Y0Arf", "TouchEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TouchEffect = function(_super) {
      __extends(TouchEffect, _super);
      function TouchEffect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.effectPrefab = null;
        _this.effectContainer = null;
        _this.duration = .5;
        _this.interval = .5;
        _this.maxQuantity = 20;
        _this.triggerByMoving = false;
        _this.useNodePool = false;
        _this.nodePoolLimit = 20;
        _this.curCount = 0;
        _this.lastTriggerTime = 0;
        _this.nodePool = new cc.NodePool();
        return _this;
      }
      TouchEffect.prototype.onLoad = function() {
        this.registerEvent();
      };
      TouchEffect.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      TouchEffect.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.setSwallowTouches(false);
      };
      TouchEffect.prototype.unregisterEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      };
      TouchEffect.prototype.onTouchStart = function(event) {
        this.playEffect(event.getLocation());
      };
      TouchEffect.prototype.onTouchMove = function(event) {
        if (!this.triggerByMoving) return;
        this.playEffect(event.getLocation());
      };
      TouchEffect.prototype.playEffect = function(pos) {
        var _this = this;
        var now = Date.now();
        if (this.curCount >= this.maxQuantity || this.lastTriggerTime > now - 1e3 * this.interval) return;
        this.lastTriggerTime = now;
        this.curCount++;
        var node = null;
        node = this.nodePool.size() > 0 ? this.nodePool.get() : cc.instantiate(this.effectPrefab);
        var container = this.effectContainer || this.node;
        node.setParent(container);
        node.setPosition(container.convertToNodeSpaceAR(pos));
        node.opacity = 255;
        cc.tween(node).to(this.duration, {
          opacity: 0
        }).call(function() {
          return _this.recycleEffect(node);
        }).start();
      };
      TouchEffect.prototype.recycleEffect = function(node) {
        this.curCount--;
        this.useNodePool && this.nodePool.size() < this.nodePoolLimit ? this.nodePool.put(node) : node.destroy();
      };
      TouchEffect.prototype.setSwallowTouches = function(swallow) {
        this.node._touchListener && this.node._touchListener.setSwallowTouches(swallow);
      };
      __decorate([ property({
        type: cc.Prefab,
        displayName: false
      }) ], TouchEffect.prototype, "effectPrefab", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: false
      }) ], TouchEffect.prototype, "effectContainer", void 0);
      __decorate([ property({
        displayName: false
      }) ], TouchEffect.prototype, "duration", void 0);
      __decorate([ property({
        displayName: false
      }) ], TouchEffect.prototype, "interval", void 0);
      __decorate([ property({
        displayName: false
      }) ], TouchEffect.prototype, "maxQuantity", void 0);
      __decorate([ property({
        displayName: false,
        tooltip: false
      }) ], TouchEffect.prototype, "triggerByMoving", void 0);
      __decorate([ property({
        displayName: false,
        tooltip: false
      }) ], TouchEffect.prototype, "useNodePool", void 0);
      __decorate([ property({
        visible: function() {
          return this.useNodePool;
        },
        displayName: false,
        tooltip: false
      }) ], TouchEffect.prototype, "nodePoolLimit", void 0);
      TouchEffect = __decorate([ ccclass ], TouchEffect);
      return TouchEffect;
    }(cc.Component);
    exports.default = TouchEffect;
    cc._RF.pop();
  }, {} ],
  TweenUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c56feN05ThJQKJVb9TcoCoG", "TweenUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TweenUtil = function() {
      function TweenUtil() {}
      TweenUtil.flip = function(node, duration, onMiddle, onComplete) {
        return new Promise(function(res) {
          var tween = cc.tween, time = duration / 2, scaleX = node.scale, skewY = scaleX > 0 ? 20 : -20;
          tween(node).parallel(tween().to(time, {
            scaleX: 0
          }, {
            easing: "quadIn"
          }), tween().to(time, {
            skewY: -skewY
          }, {
            easing: "quadOut"
          })).call(function() {
            onMiddle && onMiddle();
          }).parallel(tween().to(time, {
            scaleX: -scaleX
          }, {
            easing: "quadOut"
          }), tween().to(time, {
            skewY: 0
          }, {
            easing: "quadIn"
          })).call(function() {
            onComplete && onComplete();
            res();
          }).start();
        });
      };
      return TweenUtil;
    }();
    exports.default = TweenUtil;
    cc._RF.pop();
  }, {} ],
  ZipLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "397c26H6ptGtqQmvciqu9HQ", "ZipLoader");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var JSZip = require("../../third-party/jszip");
    cc.assetManager.downloader.register({
      ".zip": cc.assetManager.downloader["_downloaders"][".bin"]
    });
    var ZipLoader = function() {
      function ZipLoader() {}
      ZipLoader.loadRemote = function(url, callback) {
        return new Promise(function(res) {
          cc.assetManager.loadRemote(url, function(error, asset) {
            if (error) {
              cc.error(error);
              callback && callback(error, null);
              res(null);
              return;
            }
            if (!(asset instanceof cc.Asset) || !asset["_nativeAsset"]) {
              cc.error(new Error("invalid asset"));
              callback && callback(new Error("invalid asset"), null);
              res(null);
              return;
            }
            var jszip = new JSZip(), nativeAsset = asset["_nativeAsset"];
            jszip.loadAsync(nativeAsset).then(function(zip) {
              callback && callback(null, zip);
              res(zip);
            }).catch(function(error) {
              cc.error(error);
              callback && callback(error, null);
              res(null);
            });
          });
        });
      };
      ZipLoader.toText = function(file) {
        return new Promise(function(res) {
          file ? file.async("text").then(function(result) {
            res(result);
          }).catch(function(error) {
            cc.error(error);
            res(null);
          }) : res(null);
        });
      };
      ZipLoader.toJson = function(file) {
        return __awaiter(this, void 0, void 0, function() {
          var text;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, ZipLoader.toText(file) ];

             case 1:
              text = _a.sent();
              if (!text) return [ 2, null ];
              try {
                return [ 2, JSON.parse(text) ];
              } catch (error) {
                cc.error(error);
                return [ 2, null ];
              }
              return [ 2 ];
            }
          });
        });
      };
      ZipLoader.toBase64 = function(file) {
        return new Promise(function(res) {
          file ? file.async("base64").then(function(result) {
            res(result);
          }).catch(function(error) {
            cc.error(error);
            res(null);
          }) : res(null);
        });
      };
      ZipLoader.toCCTexture = function(file) {
        return __awaiter(this, void 0, void 0, function() {
          var base64;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, ZipLoader.toBase64(file) ];

             case 1:
              base64 = _a.sent();
              if (!base64) return [ 2, null ];
              base64.startsWith("data:image/png") || (base64 = "data:image/png;base64," + base64);
              return [ 2, ZipLoader.base64ToTexture(base64) ];
            }
          });
        });
      };
      ZipLoader.base64ToTexture = function(base64) {
        if (!window || !window.document) return null;
        var image = new Image();
        image.src = base64;
        var texture = new cc.Texture2D();
        texture.initWithElement(image);
        image.remove();
        return texture;
      };
      return ZipLoader;
    }();
    exports.default = ZipLoader;
    false;
    cc._RF.pop();
  }, {
    "../../third-party/jszip": "jszip"
  } ],
  eazax: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df2d6IVrmJFHJG6OVslZw+5", "eazax");
    var eazax;
    (function(eazax) {
      function log(title, msg) {
        msg ? console.log("%c " + title + " %c " + msg + " ", "background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;") : console.log("%c " + title + " ", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
      }
      eazax.log = log;
    })(eazax || (eazax = {}));
    window["eazax"] = eazax;
    window["ez"] = window["eazax"];
    cc._RF.pop();
  }, {} ],
  extension: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65190se/TJEoqBXOTLv8jep", "extension");
    String.prototype.clamp = function(start, threshold, suffix) {
      void 0 === suffix && (suffix = "...");
      if (this.replace(/[^\x00-\xff]/g, "xx").length <= threshold) return this;
      var charCount = 0;
      var result = "";
      for (var i = start; i < this.length; i++) {
        charCount += /[^\x00-\xff]/.test(this[i]) ? 2 : 1;
        if (charCount > threshold) return result + suffix;
        result += this[i];
      }
      return result;
    };
    cc._RF.pop();
  }, {} ],
  jszip: [ function(require, module, exports) {
    (function(global, Buffer) {
      "use strict";
      cc._RF.push(module, "1f15eDNKUpBUq/E4Kz8m2fF", "jszip");
      "use strict";
      (function(f) {
        if ("object" === typeof exports && "undefined" !== typeof module) module.exports = f(); else if ("function" === typeof define && define.amd) define([], f); else {
          var g;
          g = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this;
          g.JSZip = f();
        }
      })(function() {
        var define, module, exports;
        return function e(t, n, r) {
          function s(o, u) {
            if (!n[o]) {
              if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
              }
              var l = n[o] = {
                exports: {}
              };
              t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n || e);
              }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
          }
          var i = "function" == typeof require && require;
          for (var o = 0; o < r.length; o++) s(r[o]);
          return s;
        }({
          1: [ function(require, module, exports) {
            var utils = require("./utils");
            var support = require("./support");
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            exports.encode = function(input) {
              var output = [];
              var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
              var i = 0, len = input.length, remainingBytes = len;
              var isArray = "string" !== utils.getTypeOf(input);
              while (i < input.length) {
                remainingBytes = len - i;
                if (isArray) {
                  chr1 = input[i++];
                  chr2 = i < len ? input[i++] : 0;
                  chr3 = i < len ? input[i++] : 0;
                } else {
                  chr1 = input.charCodeAt(i++);
                  chr2 = i < len ? input.charCodeAt(i++) : 0;
                  chr3 = i < len ? input.charCodeAt(i++) : 0;
                }
                enc1 = chr1 >> 2;
                enc2 = (3 & chr1) << 4 | chr2 >> 4;
                enc3 = remainingBytes > 1 ? (15 & chr2) << 2 | chr3 >> 6 : 64;
                enc4 = remainingBytes > 2 ? 63 & chr3 : 64;
                output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
              }
              return output.join("");
            };
            exports.decode = function(input) {
              var chr1, chr2, chr3;
              var enc1, enc2, enc3, enc4;
              var i = 0, resultIndex = 0;
              var dataUrlPrefix = "data:";
              if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) throw new Error("Invalid base64 input, it looks like a data url.");
              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
              var totalLength = 3 * input.length / 4;
              input.charAt(input.length - 1) === _keyStr.charAt(64) && totalLength--;
              input.charAt(input.length - 2) === _keyStr.charAt(64) && totalLength--;
              if (totalLength % 1 !== 0) throw new Error("Invalid base64 input, bad content length.");
              var output;
              output = support.uint8array ? new Uint8Array(0 | totalLength) : new Array(0 | totalLength);
              while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (15 & enc2) << 4 | enc3 >> 2;
                chr3 = (3 & enc3) << 6 | enc4;
                output[resultIndex++] = chr1;
                64 !== enc3 && (output[resultIndex++] = chr2);
                64 !== enc4 && (output[resultIndex++] = chr3);
              }
              return output;
            };
          }, {
            "./support": 30,
            "./utils": 32
          } ],
          2: [ function(require, module, exports) {
            var external = require("./external");
            var DataWorker = require("./stream/DataWorker");
            var Crc32Probe = require("./stream/Crc32Probe");
            var DataLengthProbe = require("./stream/DataLengthProbe");
            function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
              this.compressedSize = compressedSize;
              this.uncompressedSize = uncompressedSize;
              this.crc32 = crc32;
              this.compression = compression;
              this.compressedContent = data;
            }
            CompressedObject.prototype = {
              getContentWorker: function getContentWorker() {
                var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
                var that = this;
                worker.on("end", function() {
                  if (this.streamInfo["data_length"] !== that.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
                });
                return worker;
              },
              getCompressedWorker: function getCompressedWorker() {
                return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
              }
            };
            CompressedObject.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
              return uncompressedWorker.pipe(new Crc32Probe()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
            };
            module.exports = CompressedObject;
          }, {
            "./external": 6,
            "./stream/Crc32Probe": 25,
            "./stream/DataLengthProbe": 26,
            "./stream/DataWorker": 27
          } ],
          3: [ function(require, module, exports) {
            var GenericWorker = require("./stream/GenericWorker");
            exports.STORE = {
              magic: "\0\0",
              compressWorker: function compressWorker(compressionOptions) {
                return new GenericWorker("STORE compression");
              },
              uncompressWorker: function uncompressWorker() {
                return new GenericWorker("STORE decompression");
              }
            };
            exports.DEFLATE = require("./flate");
          }, {
            "./flate": 7,
            "./stream/GenericWorker": 28
          } ],
          4: [ function(require, module, exports) {
            var utils = require("./utils");
            function makeTable() {
              var c, table = [];
              for (var n = 0; n < 256; n++) {
                c = n;
                for (var k = 0; k < 8; k++) c = 1 & c ? 3988292384 ^ c >>> 1 : c >>> 1;
                table[n] = c;
              }
              return table;
            }
            var crcTable = makeTable();
            function crc32(crc, buf, len, pos) {
              var t = crcTable, end = pos + len;
              crc ^= -1;
              for (var i = pos; i < end; i++) crc = crc >>> 8 ^ t[255 & (crc ^ buf[i])];
              return -1 ^ crc;
            }
            function crc32str(crc, str, len, pos) {
              var t = crcTable, end = pos + len;
              crc ^= -1;
              for (var i = pos; i < end; i++) crc = crc >>> 8 ^ t[255 & (crc ^ str.charCodeAt(i))];
              return -1 ^ crc;
            }
            module.exports = function crc32wrapper(input, crc) {
              if ("undefined" === typeof input || !input.length) return 0;
              var isArray = "string" !== utils.getTypeOf(input);
              return isArray ? crc32(0 | crc, input, input.length, 0) : crc32str(0 | crc, input, input.length, 0);
            };
          }, {
            "./utils": 32
          } ],
          5: [ function(require, module, exports) {
            exports.base64 = false;
            exports.binary = false;
            exports.dir = false;
            exports.createFolders = true;
            exports.date = null;
            exports.compression = null;
            exports.compressionOptions = null;
            exports.comment = null;
            exports.unixPermissions = null;
            exports.dosPermissions = null;
          }, {} ],
          6: [ function(require, module, exports) {
            var ES6Promise = null;
            ES6Promise = "undefined" !== typeof Promise ? Promise : require("lie");
            module.exports = {
              Promise: ES6Promise
            };
          }, {
            lie: 37
          } ],
          7: [ function(require, module, exports) {
            var USE_TYPEDARRAY = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array;
            var pako = require("pako");
            var utils = require("./utils");
            var GenericWorker = require("./stream/GenericWorker");
            var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
            exports.magic = "\b\0";
            function FlateWorker(action, options) {
              GenericWorker.call(this, "FlateWorker/" + action);
              this._pako = null;
              this._pakoAction = action;
              this._pakoOptions = options;
              this.meta = {};
            }
            utils.inherits(FlateWorker, GenericWorker);
            FlateWorker.prototype.processChunk = function(chunk) {
              this.meta = chunk.meta;
              null === this._pako && this._createPako();
              this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
            };
            FlateWorker.prototype.flush = function() {
              GenericWorker.prototype.flush.call(this);
              null === this._pako && this._createPako();
              this._pako.push([], true);
            };
            FlateWorker.prototype.cleanUp = function() {
              GenericWorker.prototype.cleanUp.call(this);
              this._pako = null;
            };
            FlateWorker.prototype._createPako = function() {
              this._pako = new pako[this._pakoAction]({
                raw: true,
                level: this._pakoOptions.level || -1
              });
              var self = this;
              this._pako.onData = function(data) {
                self.push({
                  data: data,
                  meta: self.meta
                });
              };
            };
            exports.compressWorker = function(compressionOptions) {
              return new FlateWorker("Deflate", compressionOptions);
            };
            exports.uncompressWorker = function() {
              return new FlateWorker("Inflate", {});
            };
          }, {
            "./stream/GenericWorker": 28,
            "./utils": 32,
            pako: 38
          } ],
          8: [ function(require, module, exports) {
            var utils = require("../utils");
            var GenericWorker = require("../stream/GenericWorker");
            var utf8 = require("../utf8");
            var crc32 = require("../crc32");
            var signature = require("../signature");
            var decToHex = function decToHex(dec, bytes) {
              var hex = "", i;
              for (i = 0; i < bytes; i++) {
                hex += String.fromCharCode(255 & dec);
                dec >>>= 8;
              }
              return hex;
            };
            var generateUnixExternalFileAttr = function generateUnixExternalFileAttr(unixPermissions, isDir) {
              var result = unixPermissions;
              unixPermissions || (result = isDir ? 16893 : 33204);
              return (65535 & result) << 16;
            };
            var generateDosExternalFileAttr = function generateDosExternalFileAttr(dosPermissions, isDir) {
              return 63 & (dosPermissions || 0);
            };
            var generateZipParts = function generateZipParts(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
              var file = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8.utf8encode, encodedFileName = utils.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)), comment = file.comment, encodedComment = utils.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir = file.dir, date = file.date;
              var dataInfo = {
                crc32: 0,
                compressedSize: 0,
                uncompressedSize: 0
              };
              if (!streamedContent || streamingEnded) {
                dataInfo.crc32 = streamInfo["crc32"];
                dataInfo.compressedSize = streamInfo["compressedSize"];
                dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
              }
              var bitflag = 0;
              streamedContent && (bitflag |= 8);
              useCustomEncoding || !useUTF8ForFileName && !useUTF8ForComment || (bitflag |= 2048);
              var extFileAttr = 0;
              var versionMadeBy = 0;
              dir && (extFileAttr |= 16);
              if ("UNIX" === platform) {
                versionMadeBy = 798;
                extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
              } else {
                versionMadeBy = 20;
                extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
              }
              dosTime = date.getUTCHours();
              dosTime <<= 6;
              dosTime |= date.getUTCMinutes();
              dosTime <<= 5;
              dosTime |= date.getUTCSeconds() / 2;
              dosDate = date.getUTCFullYear() - 1980;
              dosDate <<= 4;
              dosDate |= date.getUTCMonth() + 1;
              dosDate <<= 5;
              dosDate |= date.getUTCDate();
              if (useUTF8ForFileName) {
                unicodePathExtraField = decToHex(1, 1) + decToHex(crc32(encodedFileName), 4) + utfEncodedFileName;
                extraFields += "up" + decToHex(unicodePathExtraField.length, 2) + unicodePathExtraField;
              }
              if (useUTF8ForComment) {
                unicodeCommentExtraField = decToHex(1, 1) + decToHex(crc32(encodedComment), 4) + utfEncodedComment;
                extraFields += "uc" + decToHex(unicodeCommentExtraField.length, 2) + unicodeCommentExtraField;
              }
              var header = "";
              header += "\n\0";
              header += decToHex(bitflag, 2);
              header += compression.magic;
              header += decToHex(dosTime, 2);
              header += decToHex(dosDate, 2);
              header += decToHex(dataInfo.crc32, 4);
              header += decToHex(dataInfo.compressedSize, 4);
              header += decToHex(dataInfo.uncompressedSize, 4);
              header += decToHex(encodedFileName.length, 2);
              header += decToHex(extraFields.length, 2);
              var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
              var dirRecord = signature.CENTRAL_FILE_HEADER + decToHex(versionMadeBy, 2) + header + decToHex(encodedComment.length, 2) + "\0\0\0\0" + decToHex(extFileAttr, 4) + decToHex(offset, 4) + encodedFileName + extraFields + encodedComment;
              return {
                fileRecord: fileRecord,
                dirRecord: dirRecord
              };
            };
            var generateCentralDirectoryEnd = function generateCentralDirectoryEnd(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
              var dirEnd = "";
              var encodedComment = utils.transformTo("string", encodeFileName(comment));
              dirEnd = signature.CENTRAL_DIRECTORY_END + "\0\0\0\0" + decToHex(entriesCount, 2) + decToHex(entriesCount, 2) + decToHex(centralDirLength, 4) + decToHex(localDirLength, 4) + decToHex(encodedComment.length, 2) + encodedComment;
              return dirEnd;
            };
            var generateDataDescriptors = function generateDataDescriptors(streamInfo) {
              var descriptor = "";
              descriptor = signature.DATA_DESCRIPTOR + decToHex(streamInfo["crc32"], 4) + decToHex(streamInfo["compressedSize"], 4) + decToHex(streamInfo["uncompressedSize"], 4);
              return descriptor;
            };
            function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
              GenericWorker.call(this, "ZipFileWorker");
              this.bytesWritten = 0;
              this.zipComment = comment;
              this.zipPlatform = platform;
              this.encodeFileName = encodeFileName;
              this.streamFiles = streamFiles;
              this.accumulate = false;
              this.contentBuffer = [];
              this.dirRecords = [];
              this.currentSourceOffset = 0;
              this.entriesCount = 0;
              this.currentFile = null;
              this._sources = [];
            }
            utils.inherits(ZipFileWorker, GenericWorker);
            ZipFileWorker.prototype.push = function(chunk) {
              var currentFilePercent = chunk.meta.percent || 0;
              var entriesCount = this.entriesCount;
              var remainingFiles = this._sources.length;
              if (this.accumulate) this.contentBuffer.push(chunk); else {
                this.bytesWritten += chunk.data.length;
                GenericWorker.prototype.push.call(this, {
                  data: chunk.data,
                  meta: {
                    currentFile: this.currentFile,
                    percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
                  }
                });
              }
            };
            ZipFileWorker.prototype.openedSource = function(streamInfo) {
              this.currentSourceOffset = this.bytesWritten;
              this.currentFile = streamInfo["file"].name;
              var streamedContent = this.streamFiles && !streamInfo["file"].dir;
              if (streamedContent) {
                var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                this.push({
                  data: record.fileRecord,
                  meta: {
                    percent: 0
                  }
                });
              } else this.accumulate = true;
            };
            ZipFileWorker.prototype.closedSource = function(streamInfo) {
              this.accumulate = false;
              var streamedContent = this.streamFiles && !streamInfo["file"].dir;
              var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.dirRecords.push(record.dirRecord);
              if (streamedContent) this.push({
                data: generateDataDescriptors(streamInfo),
                meta: {
                  percent: 100
                }
              }); else {
                this.push({
                  data: record.fileRecord,
                  meta: {
                    percent: 0
                  }
                });
                while (this.contentBuffer.length) this.push(this.contentBuffer.shift());
              }
              this.currentFile = null;
            };
            ZipFileWorker.prototype.flush = function() {
              var localDirLength = this.bytesWritten;
              for (var i = 0; i < this.dirRecords.length; i++) this.push({
                data: this.dirRecords[i],
                meta: {
                  percent: 100
                }
              });
              var centralDirLength = this.bytesWritten - localDirLength;
              var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
              this.push({
                data: dirEnd,
                meta: {
                  percent: 100
                }
              });
            };
            ZipFileWorker.prototype.prepareNextSource = function() {
              this.previous = this._sources.shift();
              this.openedSource(this.previous.streamInfo);
              this.isPaused ? this.previous.pause() : this.previous.resume();
            };
            ZipFileWorker.prototype.registerPrevious = function(previous) {
              this._sources.push(previous);
              var self = this;
              previous.on("data", function(chunk) {
                self.processChunk(chunk);
              });
              previous.on("end", function() {
                self.closedSource(self.previous.streamInfo);
                self._sources.length ? self.prepareNextSource() : self.end();
              });
              previous.on("error", function(e) {
                self.error(e);
              });
              return this;
            };
            ZipFileWorker.prototype.resume = function() {
              if (!GenericWorker.prototype.resume.call(this)) return false;
              if (!this.previous && this._sources.length) {
                this.prepareNextSource();
                return true;
              }
              if (!this.previous && !this._sources.length && !this.generatedError) {
                this.end();
                return true;
              }
            };
            ZipFileWorker.prototype.error = function(e) {
              var sources = this._sources;
              if (!GenericWorker.prototype.error.call(this, e)) return false;
              for (var i = 0; i < sources.length; i++) try {
                sources[i].error(e);
              } catch (e) {}
              return true;
            };
            ZipFileWorker.prototype.lock = function() {
              GenericWorker.prototype.lock.call(this);
              var sources = this._sources;
              for (var i = 0; i < sources.length; i++) sources[i].lock();
            };
            module.exports = ZipFileWorker;
          }, {
            "../crc32": 4,
            "../signature": 23,
            "../stream/GenericWorker": 28,
            "../utf8": 31,
            "../utils": 32
          } ],
          9: [ function(require, module, exports) {
            var compressions = require("../compressions");
            var ZipFileWorker = require("./ZipFileWorker");
            var getCompression = function getCompression(fileCompression, zipCompression) {
              var compressionName = fileCompression || zipCompression;
              var compression = compressions[compressionName];
              if (!compression) throw new Error(compressionName + " is not a valid compression method !");
              return compression;
            };
            exports.generateWorker = function(zip, options, comment) {
              var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
              var entriesCount = 0;
              try {
                zip.forEach(function(relativePath, file) {
                  entriesCount++;
                  var compression = getCompression(file.options.compression, options.compression);
                  var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
                  var dir = file.dir, date = file.date;
                  file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
                    name: relativePath,
                    dir: dir,
                    date: date,
                    comment: file.comment || "",
                    unixPermissions: file.unixPermissions,
                    dosPermissions: file.dosPermissions
                  }).pipe(zipFileWorker);
                });
                zipFileWorker.entriesCount = entriesCount;
              } catch (e) {
                zipFileWorker.error(e);
              }
              return zipFileWorker;
            };
          }, {
            "../compressions": 3,
            "./ZipFileWorker": 8
          } ],
          10: [ function(require, module, exports) {
            function JSZip() {
              if (!(this instanceof JSZip)) return new JSZip();
              if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
              this.files = Object.create(null);
              this.comment = null;
              this.root = "";
              this.clone = function() {
                var newObj = new JSZip();
                for (var i in this) "function" !== typeof this[i] && (newObj[i] = this[i]);
                return newObj;
              };
            }
            JSZip.prototype = require("./object");
            JSZip.prototype.loadAsync = require("./load");
            JSZip.support = require("./support");
            JSZip.defaults = require("./defaults");
            JSZip.version = "3.7.1";
            JSZip.loadAsync = function(content, options) {
              return new JSZip().loadAsync(content, options);
            };
            JSZip.external = require("./external");
            module.exports = JSZip;
          }, {
            "./defaults": 5,
            "./external": 6,
            "./load": 11,
            "./object": 15,
            "./support": 30
          } ],
          11: [ function(require, module, exports) {
            var utils = require("./utils");
            var external = require("./external");
            var utf8 = require("./utf8");
            var ZipEntries = require("./zipEntries");
            var Crc32Probe = require("./stream/Crc32Probe");
            var nodejsUtils = require("./nodejsUtils");
            function checkEntryCRC32(zipEntry) {
              return new external.Promise(function(resolve, reject) {
                var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
                worker.on("error", function(e) {
                  reject(e);
                }).on("end", function() {
                  worker.streamInfo.crc32 !== zipEntry.decompressed.crc32 ? reject(new Error("Corrupted zip : CRC32 mismatch")) : resolve();
                }).resume();
              });
            }
            module.exports = function(data, options) {
              var zip = this;
              options = utils.extend(options || {}, {
                base64: false,
                checkCRC32: false,
                optimizedBinaryString: false,
                createFolders: false,
                decodeFileName: utf8.utf8decode
              });
              if (nodejsUtils.isNode && nodejsUtils.isStream(data)) return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
              return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data) {
                var zipEntries = new ZipEntries(options);
                zipEntries.load(data);
                return zipEntries;
              }).then(function checkCRC32(zipEntries) {
                var promises = [ external.Promise.resolve(zipEntries) ];
                var files = zipEntries.files;
                if (options.checkCRC32) for (var i = 0; i < files.length; i++) promises.push(checkEntryCRC32(files[i]));
                return external.Promise.all(promises);
              }).then(function addFiles(results) {
                var zipEntries = results.shift();
                var files = zipEntries.files;
                for (var i = 0; i < files.length; i++) {
                  var input = files[i];
                  zip.file(input.fileNameStr, input.decompressed, {
                    binary: true,
                    optimizedBinaryString: true,
                    date: input.date,
                    dir: input.dir,
                    comment: input.fileCommentStr.length ? input.fileCommentStr : null,
                    unixPermissions: input.unixPermissions,
                    dosPermissions: input.dosPermissions,
                    createFolders: options.createFolders
                  });
                }
                zipEntries.zipComment.length && (zip.comment = zipEntries.zipComment);
                return zip;
              });
            };
          }, {
            "./external": 6,
            "./nodejsUtils": 14,
            "./stream/Crc32Probe": 25,
            "./utf8": 31,
            "./utils": 32,
            "./zipEntries": 33
          } ],
          12: [ function(require, module, exports) {
            var utils = require("../utils");
            var GenericWorker = require("../stream/GenericWorker");
            function NodejsStreamInputAdapter(filename, stream) {
              GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
              this._upstreamEnded = false;
              this._bindStream(stream);
            }
            utils.inherits(NodejsStreamInputAdapter, GenericWorker);
            NodejsStreamInputAdapter.prototype._bindStream = function(stream) {
              var self = this;
              this._stream = stream;
              stream.pause();
              stream.on("data", function(chunk) {
                self.push({
                  data: chunk,
                  meta: {
                    percent: 0
                  }
                });
              }).on("error", function(e) {
                self.isPaused ? this.generatedError = e : self.error(e);
              }).on("end", function() {
                self.isPaused ? self._upstreamEnded = true : self.end();
              });
            };
            NodejsStreamInputAdapter.prototype.pause = function() {
              if (!GenericWorker.prototype.pause.call(this)) return false;
              this._stream.pause();
              return true;
            };
            NodejsStreamInputAdapter.prototype.resume = function() {
              if (!GenericWorker.prototype.resume.call(this)) return false;
              this._upstreamEnded ? this.end() : this._stream.resume();
              return true;
            };
            module.exports = NodejsStreamInputAdapter;
          }, {
            "../stream/GenericWorker": 28,
            "../utils": 32
          } ],
          13: [ function(require, module, exports) {
            var Readable = require("readable-stream").Readable;
            var utils = require("../utils");
            utils.inherits(NodejsStreamOutputAdapter, Readable);
            function NodejsStreamOutputAdapter(helper, options, updateCb) {
              Readable.call(this, options);
              this._helper = helper;
              var self = this;
              helper.on("data", function(data, meta) {
                self.push(data) || self._helper.pause();
                updateCb && updateCb(meta);
              }).on("error", function(e) {
                self.emit("error", e);
              }).on("end", function() {
                self.push(null);
              });
            }
            NodejsStreamOutputAdapter.prototype._read = function() {
              this._helper.resume();
            };
            module.exports = NodejsStreamOutputAdapter;
          }, {
            "../utils": 32,
            "readable-stream": 16
          } ],
          14: [ function(require, module, exports) {
            module.exports = {
              isNode: "undefined" !== typeof Buffer,
              newBufferFrom: function newBufferFrom(data, encoding) {
                if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(data, encoding);
                if ("number" === typeof data) throw new Error('The "data" argument must not be a number');
                return new Buffer(data, encoding);
              },
              allocBuffer: function allocBuffer(size) {
                if (Buffer.alloc) return Buffer.alloc(size);
                var buf = new Buffer(size);
                buf.fill(0);
                return buf;
              },
              isBuffer: function isBuffer(b) {
                return Buffer.isBuffer(b);
              },
              isStream: function isStream(obj) {
                return obj && "function" === typeof obj.on && "function" === typeof obj.pause && "function" === typeof obj.resume;
              }
            };
          }, {} ],
          15: [ function(require, module, exports) {
            var utf8 = require("./utf8");
            var utils = require("./utils");
            var GenericWorker = require("./stream/GenericWorker");
            var StreamHelper = require("./stream/StreamHelper");
            var defaults = require("./defaults");
            var CompressedObject = require("./compressedObject");
            var ZipObject = require("./zipObject");
            var generate = require("./generate");
            var nodejsUtils = require("./nodejsUtils");
            var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");
            var fileAdd = function fileAdd(name, data, originalOptions) {
              var dataType = utils.getTypeOf(data), parent;
              var o = utils.extend(originalOptions || {}, defaults);
              o.date = o.date || new Date();
              null !== o.compression && (o.compression = o.compression.toUpperCase());
              "string" === typeof o.unixPermissions && (o.unixPermissions = parseInt(o.unixPermissions, 8));
              o.unixPermissions && 16384 & o.unixPermissions && (o.dir = true);
              o.dosPermissions && 16 & o.dosPermissions && (o.dir = true);
              o.dir && (name = forceTrailingSlash(name));
              o.createFolders && (parent = parentFolder(name)) && folderAdd.call(this, parent, true);
              var isUnicodeString = "string" === dataType && false === o.binary && false === o.base64;
              originalOptions && "undefined" !== typeof originalOptions.binary || (o.binary = !isUnicodeString);
              var isCompressedEmpty = data instanceof CompressedObject && 0 === data.uncompressedSize;
              if (isCompressedEmpty || o.dir || !data || 0 === data.length) {
                o.base64 = false;
                o.binary = true;
                data = "";
                o.compression = "STORE";
                dataType = "string";
              }
              var zipObjectContent = null;
              zipObjectContent = data instanceof CompressedObject || data instanceof GenericWorker ? data : nodejsUtils.isNode && nodejsUtils.isStream(data) ? new NodejsStreamInputAdapter(name, data) : utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
              var object = new ZipObject(name, zipObjectContent, o);
              this.files[name] = object;
            };
            var parentFolder = function parentFolder(path) {
              "/" === path.slice(-1) && (path = path.substring(0, path.length - 1));
              var lastSlash = path.lastIndexOf("/");
              return lastSlash > 0 ? path.substring(0, lastSlash) : "";
            };
            var forceTrailingSlash = function forceTrailingSlash(path) {
              "/" !== path.slice(-1) && (path += "/");
              return path;
            };
            var folderAdd = function folderAdd(name, createFolders) {
              createFolders = "undefined" !== typeof createFolders ? createFolders : defaults.createFolders;
              name = forceTrailingSlash(name);
              this.files[name] || fileAdd.call(this, name, null, {
                dir: true,
                createFolders: createFolders
              });
              return this.files[name];
            };
            function isRegExp(object) {
              return "[object RegExp]" === Object.prototype.toString.call(object);
            }
            var out = {
              load: function load() {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
              },
              forEach: function forEach(cb) {
                var filename, relativePath, file;
                for (filename in this.files) {
                  file = this.files[filename];
                  relativePath = filename.slice(this.root.length, filename.length);
                  relativePath && filename.slice(0, this.root.length) === this.root && cb(relativePath, file);
                }
              },
              filter: function filter(search) {
                var result = [];
                this.forEach(function(relativePath, entry) {
                  search(relativePath, entry) && result.push(entry);
                });
                return result;
              },
              file: function file(name, data, o) {
                if (1 === arguments.length) {
                  if (isRegExp(name)) {
                    var regexp = name;
                    return this.filter(function(relativePath, file) {
                      return !file.dir && regexp.test(relativePath);
                    });
                  }
                  var obj = this.files[this.root + name];
                  return obj && !obj.dir ? obj : null;
                }
                name = this.root + name;
                fileAdd.call(this, name, data, o);
                return this;
              },
              folder: function folder(arg) {
                if (!arg) return this;
                if (isRegExp(arg)) return this.filter(function(relativePath, file) {
                  return file.dir && arg.test(relativePath);
                });
                var name = this.root + arg;
                var newFolder = folderAdd.call(this, name);
                var ret = this.clone();
                ret.root = newFolder.name;
                return ret;
              },
              remove: function remove(name) {
                name = this.root + name;
                var file = this.files[name];
                if (!file) {
                  "/" !== name.slice(-1) && (name += "/");
                  file = this.files[name];
                }
                if (file && !file.dir) delete this.files[name]; else {
                  var kids = this.filter(function(relativePath, file) {
                    return file.name.slice(0, name.length) === name;
                  });
                  for (var i = 0; i < kids.length; i++) delete this.files[kids[i].name];
                }
                return this;
              },
              generate: function generate(options) {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
              },
              generateInternalStream: function generateInternalStream(options) {
                var worker, opts = {};
                try {
                  opts = utils.extend(options || {}, {
                    streamFiles: false,
                    compression: "STORE",
                    compressionOptions: null,
                    type: "",
                    platform: "DOS",
                    comment: null,
                    mimeType: "application/zip",
                    encodeFileName: utf8.utf8encode
                  });
                  opts.type = opts.type.toLowerCase();
                  opts.compression = opts.compression.toUpperCase();
                  "binarystring" === opts.type && (opts.type = "string");
                  if (!opts.type) throw new Error("No output type specified.");
                  utils.checkSupport(opts.type);
                  "darwin" !== opts.platform && "freebsd" !== opts.platform && "linux" !== opts.platform && "sunos" !== opts.platform || (opts.platform = "UNIX");
                  "win32" === opts.platform && (opts.platform = "DOS");
                  var comment = opts.comment || this.comment || "";
                  worker = generate.generateWorker(this, opts, comment);
                } catch (e) {
                  worker = new GenericWorker("error");
                  worker.error(e);
                }
                return new StreamHelper(worker, opts.type || "string", opts.mimeType);
              },
              generateAsync: function generateAsync(options, onUpdate) {
                return this.generateInternalStream(options).accumulate(onUpdate);
              },
              generateNodeStream: function generateNodeStream(options, onUpdate) {
                options = options || {};
                options.type || (options.type = "nodebuffer");
                return this.generateInternalStream(options).toNodejsStream(onUpdate);
              }
            };
            module.exports = out;
          }, {
            "./compressedObject": 2,
            "./defaults": 5,
            "./generate": 9,
            "./nodejs/NodejsStreamInputAdapter": 12,
            "./nodejsUtils": 14,
            "./stream/GenericWorker": 28,
            "./stream/StreamHelper": 29,
            "./utf8": 31,
            "./utils": 32,
            "./zipObject": 35
          } ],
          16: [ function(require, module, exports) {
            module.exports = require("stream");
          }, {
            stream: void 0
          } ],
          17: [ function(require, module, exports) {
            var DataReader = require("./DataReader");
            var utils = require("../utils");
            function ArrayReader(data) {
              DataReader.call(this, data);
              for (var i = 0; i < this.data.length; i++) data[i] = 255 & data[i];
            }
            utils.inherits(ArrayReader, DataReader);
            ArrayReader.prototype.byteAt = function(i) {
              return this.data[this.zero + i];
            };
            ArrayReader.prototype.lastIndexOfSignature = function(sig) {
              var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
              for (var i = this.length - 4; i >= 0; --i) if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) return i - this.zero;
              return -1;
            };
            ArrayReader.prototype.readAndCheckSignature = function(sig) {
              var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3), data = this.readData(4);
              return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
            };
            ArrayReader.prototype.readData = function(size) {
              this.checkOffset(size);
              if (0 === size) return [];
              var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
              this.index += size;
              return result;
            };
            module.exports = ArrayReader;
          }, {
            "../utils": 32,
            "./DataReader": 18
          } ],
          18: [ function(require, module, exports) {
            var utils = require("../utils");
            function DataReader(data) {
              this.data = data;
              this.length = data.length;
              this.index = 0;
              this.zero = 0;
            }
            DataReader.prototype = {
              checkOffset: function checkOffset(offset) {
                this.checkIndex(this.index + offset);
              },
              checkIndex: function checkIndex(newIndex) {
                if (this.length < this.zero + newIndex || newIndex < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
              },
              setIndex: function setIndex(newIndex) {
                this.checkIndex(newIndex);
                this.index = newIndex;
              },
              skip: function skip(n) {
                this.setIndex(this.index + n);
              },
              byteAt: function byteAt(i) {},
              readInt: function readInt(size) {
                var result = 0, i;
                this.checkOffset(size);
                for (i = this.index + size - 1; i >= this.index; i--) result = (result << 8) + this.byteAt(i);
                this.index += size;
                return result;
              },
              readString: function readString(size) {
                return utils.transformTo("string", this.readData(size));
              },
              readData: function readData(size) {},
              lastIndexOfSignature: function lastIndexOfSignature(sig) {},
              readAndCheckSignature: function readAndCheckSignature(sig) {},
              readDate: function readDate() {
                var dostime = this.readInt(4);
                return new Date(Date.UTC(1980 + (dostime >> 25 & 127), (dostime >> 21 & 15) - 1, dostime >> 16 & 31, dostime >> 11 & 31, dostime >> 5 & 63, (31 & dostime) << 1));
              }
            };
            module.exports = DataReader;
          }, {
            "../utils": 32
          } ],
          19: [ function(require, module, exports) {
            var Uint8ArrayReader = require("./Uint8ArrayReader");
            var utils = require("../utils");
            function NodeBufferReader(data) {
              Uint8ArrayReader.call(this, data);
            }
            utils.inherits(NodeBufferReader, Uint8ArrayReader);
            NodeBufferReader.prototype.readData = function(size) {
              this.checkOffset(size);
              var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
              this.index += size;
              return result;
            };
            module.exports = NodeBufferReader;
          }, {
            "../utils": 32,
            "./Uint8ArrayReader": 21
          } ],
          20: [ function(require, module, exports) {
            var DataReader = require("./DataReader");
            var utils = require("../utils");
            function StringReader(data) {
              DataReader.call(this, data);
            }
            utils.inherits(StringReader, DataReader);
            StringReader.prototype.byteAt = function(i) {
              return this.data.charCodeAt(this.zero + i);
            };
            StringReader.prototype.lastIndexOfSignature = function(sig) {
              return this.data.lastIndexOf(sig) - this.zero;
            };
            StringReader.prototype.readAndCheckSignature = function(sig) {
              var data = this.readData(4);
              return sig === data;
            };
            StringReader.prototype.readData = function(size) {
              this.checkOffset(size);
              var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
              this.index += size;
              return result;
            };
            module.exports = StringReader;
          }, {
            "../utils": 32,
            "./DataReader": 18
          } ],
          21: [ function(require, module, exports) {
            var ArrayReader = require("./ArrayReader");
            var utils = require("../utils");
            function Uint8ArrayReader(data) {
              ArrayReader.call(this, data);
            }
            utils.inherits(Uint8ArrayReader, ArrayReader);
            Uint8ArrayReader.prototype.readData = function(size) {
              this.checkOffset(size);
              if (0 === size) return new Uint8Array(0);
              var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
              this.index += size;
              return result;
            };
            module.exports = Uint8ArrayReader;
          }, {
            "../utils": 32,
            "./ArrayReader": 17
          } ],
          22: [ function(require, module, exports) {
            var utils = require("../utils");
            var support = require("../support");
            var ArrayReader = require("./ArrayReader");
            var StringReader = require("./StringReader");
            var NodeBufferReader = require("./NodeBufferReader");
            var Uint8ArrayReader = require("./Uint8ArrayReader");
            module.exports = function(data) {
              var type = utils.getTypeOf(data);
              utils.checkSupport(type);
              if ("string" === type && !support.uint8array) return new StringReader(data);
              if ("nodebuffer" === type) return new NodeBufferReader(data);
              if (support.uint8array) return new Uint8ArrayReader(utils.transformTo("uint8array", data));
              return new ArrayReader(utils.transformTo("array", data));
            };
          }, {
            "../support": 30,
            "../utils": 32,
            "./ArrayReader": 17,
            "./NodeBufferReader": 19,
            "./StringReader": 20,
            "./Uint8ArrayReader": 21
          } ],
          23: [ function(require, module, exports) {
            exports.LOCAL_FILE_HEADER = "PK\x03\x04";
            exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
            exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
            exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
            exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
            exports.DATA_DESCRIPTOR = "PK\x07\b";
          }, {} ],
          24: [ function(require, module, exports) {
            var GenericWorker = require("./GenericWorker");
            var utils = require("../utils");
            function ConvertWorker(destType) {
              GenericWorker.call(this, "ConvertWorker to " + destType);
              this.destType = destType;
            }
            utils.inherits(ConvertWorker, GenericWorker);
            ConvertWorker.prototype.processChunk = function(chunk) {
              this.push({
                data: utils.transformTo(this.destType, chunk.data),
                meta: chunk.meta
              });
            };
            module.exports = ConvertWorker;
          }, {
            "../utils": 32,
            "./GenericWorker": 28
          } ],
          25: [ function(require, module, exports) {
            var GenericWorker = require("./GenericWorker");
            var crc32 = require("../crc32");
            var utils = require("../utils");
            function Crc32Probe() {
              GenericWorker.call(this, "Crc32Probe");
              this.withStreamInfo("crc32", 0);
            }
            utils.inherits(Crc32Probe, GenericWorker);
            Crc32Probe.prototype.processChunk = function(chunk) {
              this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
              this.push(chunk);
            };
            module.exports = Crc32Probe;
          }, {
            "../crc32": 4,
            "../utils": 32,
            "./GenericWorker": 28
          } ],
          26: [ function(require, module, exports) {
            var utils = require("../utils");
            var GenericWorker = require("./GenericWorker");
            function DataLengthProbe(propName) {
              GenericWorker.call(this, "DataLengthProbe for " + propName);
              this.propName = propName;
              this.withStreamInfo(propName, 0);
            }
            utils.inherits(DataLengthProbe, GenericWorker);
            DataLengthProbe.prototype.processChunk = function(chunk) {
              if (chunk) {
                var length = this.streamInfo[this.propName] || 0;
                this.streamInfo[this.propName] = length + chunk.data.length;
              }
              GenericWorker.prototype.processChunk.call(this, chunk);
            };
            module.exports = DataLengthProbe;
          }, {
            "../utils": 32,
            "./GenericWorker": 28
          } ],
          27: [ function(require, module, exports) {
            var utils = require("../utils");
            var GenericWorker = require("./GenericWorker");
            var DEFAULT_BLOCK_SIZE = 16384;
            function DataWorker(dataP) {
              GenericWorker.call(this, "DataWorker");
              var self = this;
              this.dataIsReady = false;
              this.index = 0;
              this.max = 0;
              this.data = null;
              this.type = "";
              this._tickScheduled = false;
              dataP.then(function(data) {
                self.dataIsReady = true;
                self.data = data;
                self.max = data && data.length || 0;
                self.type = utils.getTypeOf(data);
                self.isPaused || self._tickAndRepeat();
              }, function(e) {
                self.error(e);
              });
            }
            utils.inherits(DataWorker, GenericWorker);
            DataWorker.prototype.cleanUp = function() {
              GenericWorker.prototype.cleanUp.call(this);
              this.data = null;
            };
            DataWorker.prototype.resume = function() {
              if (!GenericWorker.prototype.resume.call(this)) return false;
              if (!this._tickScheduled && this.dataIsReady) {
                this._tickScheduled = true;
                utils.delay(this._tickAndRepeat, [], this);
              }
              return true;
            };
            DataWorker.prototype._tickAndRepeat = function() {
              this._tickScheduled = false;
              if (this.isPaused || this.isFinished) return;
              this._tick();
              if (!this.isFinished) {
                utils.delay(this._tickAndRepeat, [], this);
                this._tickScheduled = true;
              }
            };
            DataWorker.prototype._tick = function() {
              if (this.isPaused || this.isFinished) return false;
              var size = DEFAULT_BLOCK_SIZE;
              var data = null, nextIndex = Math.min(this.max, this.index + size);
              if (this.index >= this.max) return this.end();
              switch (this.type) {
               case "string":
                data = this.data.substring(this.index, nextIndex);
                break;

               case "uint8array":
                data = this.data.subarray(this.index, nextIndex);
                break;

               case "array":
               case "nodebuffer":
                data = this.data.slice(this.index, nextIndex);
              }
              this.index = nextIndex;
              return this.push({
                data: data,
                meta: {
                  percent: this.max ? this.index / this.max * 100 : 0
                }
              });
            };
            module.exports = DataWorker;
          }, {
            "../utils": 32,
            "./GenericWorker": 28
          } ],
          28: [ function(require, module, exports) {
            function GenericWorker(name) {
              this.name = name || "default";
              this.streamInfo = {};
              this.generatedError = null;
              this.extraStreamInfo = {};
              this.isPaused = true;
              this.isFinished = false;
              this.isLocked = false;
              this._listeners = {
                data: [],
                end: [],
                error: []
              };
              this.previous = null;
            }
            GenericWorker.prototype = {
              push: function push(chunk) {
                this.emit("data", chunk);
              },
              end: function end() {
                if (this.isFinished) return false;
                this.flush();
                try {
                  this.emit("end");
                  this.cleanUp();
                  this.isFinished = true;
                } catch (e) {
                  this.emit("error", e);
                }
                return true;
              },
              error: function error(e) {
                if (this.isFinished) return false;
                if (this.isPaused) this.generatedError = e; else {
                  this.isFinished = true;
                  this.emit("error", e);
                  this.previous && this.previous.error(e);
                  this.cleanUp();
                }
                return true;
              },
              on: function on(name, listener) {
                this._listeners[name].push(listener);
                return this;
              },
              cleanUp: function cleanUp() {
                this.streamInfo = this.generatedError = this.extraStreamInfo = null;
                this._listeners = [];
              },
              emit: function emit(name, arg) {
                if (this._listeners[name]) for (var i = 0; i < this._listeners[name].length; i++) this._listeners[name][i].call(this, arg);
              },
              pipe: function pipe(next) {
                return next.registerPrevious(this);
              },
              registerPrevious: function registerPrevious(previous) {
                if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                this.streamInfo = previous.streamInfo;
                this.mergeStreamInfo();
                this.previous = previous;
                var self = this;
                previous.on("data", function(chunk) {
                  self.processChunk(chunk);
                });
                previous.on("end", function() {
                  self.end();
                });
                previous.on("error", function(e) {
                  self.error(e);
                });
                return this;
              },
              pause: function pause() {
                if (this.isPaused || this.isFinished) return false;
                this.isPaused = true;
                this.previous && this.previous.pause();
                return true;
              },
              resume: function resume() {
                if (!this.isPaused || this.isFinished) return false;
                this.isPaused = false;
                var withError = false;
                if (this.generatedError) {
                  this.error(this.generatedError);
                  withError = true;
                }
                this.previous && this.previous.resume();
                return !withError;
              },
              flush: function flush() {},
              processChunk: function processChunk(chunk) {
                this.push(chunk);
              },
              withStreamInfo: function withStreamInfo(key, value) {
                this.extraStreamInfo[key] = value;
                this.mergeStreamInfo();
                return this;
              },
              mergeStreamInfo: function mergeStreamInfo() {
                for (var key in this.extraStreamInfo) {
                  if (!this.extraStreamInfo.hasOwnProperty(key)) continue;
                  this.streamInfo[key] = this.extraStreamInfo[key];
                }
              },
              lock: function lock() {
                if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                this.isLocked = true;
                this.previous && this.previous.lock();
              },
              toString: function toString() {
                var me = "Worker " + this.name;
                return this.previous ? this.previous + " -> " + me : me;
              }
            };
            module.exports = GenericWorker;
          }, {} ],
          29: [ function(require, module, exports) {
            var utils = require("../utils");
            var ConvertWorker = require("./ConvertWorker");
            var GenericWorker = require("./GenericWorker");
            var base64 = require("../base64");
            var support = require("../support");
            var external = require("../external");
            var NodejsStreamOutputAdapter = null;
            if (support.nodestream) try {
              NodejsStreamOutputAdapter = require("../nodejs/NodejsStreamOutputAdapter");
            } catch (e) {}
            function transformZipOutput(type, content, mimeType) {
              switch (type) {
               case "blob":
                return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);

               case "base64":
                return base64.encode(content);

               default:
                return utils.transformTo(type, content);
              }
            }
            function concat(type, dataArray) {
              var i, index = 0, res = null, totalLength = 0;
              for (i = 0; i < dataArray.length; i++) totalLength += dataArray[i].length;
              switch (type) {
               case "string":
                return dataArray.join("");

               case "array":
                return Array.prototype.concat.apply([], dataArray);

               case "uint8array":
                res = new Uint8Array(totalLength);
                for (i = 0; i < dataArray.length; i++) {
                  res.set(dataArray[i], index);
                  index += dataArray[i].length;
                }
                return res;

               case "nodebuffer":
                return Buffer.concat(dataArray);

               default:
                throw new Error("concat : unsupported type '" + type + "'");
              }
            }
            function _accumulate(helper, updateCallback) {
              return new external.Promise(function(resolve, reject) {
                var dataArray = [];
                var chunkType = helper._internalType, resultType = helper._outputType, mimeType = helper._mimeType;
                helper.on("data", function(data, meta) {
                  dataArray.push(data);
                  updateCallback && updateCallback(meta);
                }).on("error", function(err) {
                  dataArray = [];
                  reject(err);
                }).on("end", function() {
                  try {
                    var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                    resolve(result);
                  } catch (e) {
                    reject(e);
                  }
                  dataArray = [];
                }).resume();
              });
            }
            function StreamHelper(worker, outputType, mimeType) {
              var internalType = outputType;
              switch (outputType) {
               case "blob":
               case "arraybuffer":
                internalType = "uint8array";
                break;

               case "base64":
                internalType = "string";
              }
              try {
                this._internalType = internalType;
                this._outputType = outputType;
                this._mimeType = mimeType;
                utils.checkSupport(internalType);
                this._worker = worker.pipe(new ConvertWorker(internalType));
                worker.lock();
              } catch (e) {
                this._worker = new GenericWorker("error");
                this._worker.error(e);
              }
            }
            StreamHelper.prototype = {
              accumulate: function accumulate(updateCb) {
                return _accumulate(this, updateCb);
              },
              on: function on(evt, fn) {
                var self = this;
                "data" === evt ? this._worker.on(evt, function(chunk) {
                  fn.call(self, chunk.data, chunk.meta);
                }) : this._worker.on(evt, function() {
                  utils.delay(fn, arguments, self);
                });
                return this;
              },
              resume: function resume() {
                utils.delay(this._worker.resume, [], this._worker);
                return this;
              },
              pause: function pause() {
                this._worker.pause();
                return this;
              },
              toNodejsStream: function toNodejsStream(updateCb) {
                utils.checkSupport("nodestream");
                if ("nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
                return new NodejsStreamOutputAdapter(this, {
                  objectMode: "nodebuffer" !== this._outputType
                }, updateCb);
              }
            };
            module.exports = StreamHelper;
          }, {
            "../base64": 1,
            "../external": 6,
            "../nodejs/NodejsStreamOutputAdapter": 13,
            "../support": 30,
            "../utils": 32,
            "./ConvertWorker": 24,
            "./GenericWorker": 28
          } ],
          30: [ function(require, module, exports) {
            exports.base64 = true;
            exports.array = true;
            exports.string = true;
            exports.arraybuffer = "undefined" !== typeof ArrayBuffer && "undefined" !== typeof Uint8Array;
            exports.nodebuffer = "undefined" !== typeof Buffer;
            exports.uint8array = "undefined" !== typeof Uint8Array;
            if ("undefined" === typeof ArrayBuffer) exports.blob = false; else {
              var buffer = new ArrayBuffer(0);
              try {
                exports.blob = 0 === new Blob([ buffer ], {
                  type: "application/zip"
                }).size;
              } catch (e) {
                try {
                  var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
                  var builder = new Builder();
                  builder.append(buffer);
                  exports.blob = 0 === builder.getBlob("application/zip").size;
                } catch (e) {
                  exports.blob = false;
                }
              }
            }
            try {
              exports.nodestream = !!require("readable-stream").Readable;
            } catch (e) {
              exports.nodestream = false;
            }
          }, {
            "readable-stream": 16
          } ],
          31: [ function(require, module, exports) {
            var utils = require("./utils");
            var support = require("./support");
            var nodejsUtils = require("./nodejsUtils");
            var GenericWorker = require("./stream/GenericWorker");
            var _utf8len = new Array(256);
            for (var i = 0; i < 256; i++) _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
            _utf8len[254] = _utf8len[254] = 1;
            var string2buf = function string2buf(str) {
              var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
              for (m_pos = 0; m_pos < str_len; m_pos++) {
                c = str.charCodeAt(m_pos);
                if (55296 === (64512 & c) && m_pos + 1 < str_len) {
                  c2 = str.charCodeAt(m_pos + 1);
                  if (56320 === (64512 & c2)) {
                    c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                    m_pos++;
                  }
                }
                buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
              }
              buf = support.uint8array ? new Uint8Array(buf_len) : new Array(buf_len);
              for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                c = str.charCodeAt(m_pos);
                if (55296 === (64512 & c) && m_pos + 1 < str_len) {
                  c2 = str.charCodeAt(m_pos + 1);
                  if (56320 === (64512 & c2)) {
                    c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                    m_pos++;
                  }
                }
                if (c < 128) buf[i++] = c; else if (c < 2048) {
                  buf[i++] = 192 | c >>> 6;
                  buf[i++] = 128 | 63 & c;
                } else if (c < 65536) {
                  buf[i++] = 224 | c >>> 12;
                  buf[i++] = 128 | c >>> 6 & 63;
                  buf[i++] = 128 | 63 & c;
                } else {
                  buf[i++] = 240 | c >>> 18;
                  buf[i++] = 128 | c >>> 12 & 63;
                  buf[i++] = 128 | c >>> 6 & 63;
                  buf[i++] = 128 | 63 & c;
                }
              }
              return buf;
            };
            var utf8border = function utf8border(buf, max) {
              var pos;
              max = max || buf.length;
              max > buf.length && (max = buf.length);
              pos = max - 1;
              while (pos >= 0 && 128 === (192 & buf[pos])) pos--;
              if (pos < 0) return max;
              if (0 === pos) return max;
              return pos + _utf8len[buf[pos]] > max ? pos : max;
            };
            var buf2string = function buf2string(buf) {
              var str, i, out, c, c_len;
              var len = buf.length;
              var utf16buf = new Array(2 * len);
              for (out = 0, i = 0; i < len; ) {
                c = buf[i++];
                if (c < 128) {
                  utf16buf[out++] = c;
                  continue;
                }
                c_len = _utf8len[c];
                if (c_len > 4) {
                  utf16buf[out++] = 65533;
                  i += c_len - 1;
                  continue;
                }
                c &= 2 === c_len ? 31 : 3 === c_len ? 15 : 7;
                while (c_len > 1 && i < len) {
                  c = c << 6 | 63 & buf[i++];
                  c_len--;
                }
                if (c_len > 1) {
                  utf16buf[out++] = 65533;
                  continue;
                }
                if (c < 65536) utf16buf[out++] = c; else {
                  c -= 65536;
                  utf16buf[out++] = 55296 | c >> 10 & 1023;
                  utf16buf[out++] = 56320 | 1023 & c;
                }
              }
              utf16buf.length !== out && (utf16buf.subarray ? utf16buf = utf16buf.subarray(0, out) : utf16buf.length = out);
              return utils.applyFromCharCode(utf16buf);
            };
            exports.utf8encode = function utf8encode(str) {
              if (support.nodebuffer) return nodejsUtils.newBufferFrom(str, "utf-8");
              return string2buf(str);
            };
            exports.utf8decode = function utf8decode(buf) {
              if (support.nodebuffer) return utils.transformTo("nodebuffer", buf).toString("utf-8");
              buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
              return buf2string(buf);
            };
            function Utf8DecodeWorker() {
              GenericWorker.call(this, "utf-8 decode");
              this.leftOver = null;
            }
            utils.inherits(Utf8DecodeWorker, GenericWorker);
            Utf8DecodeWorker.prototype.processChunk = function(chunk) {
              var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);
              if (this.leftOver && this.leftOver.length) {
                if (support.uint8array) {
                  var previousData = data;
                  data = new Uint8Array(previousData.length + this.leftOver.length);
                  data.set(this.leftOver, 0);
                  data.set(previousData, this.leftOver.length);
                } else data = this.leftOver.concat(data);
                this.leftOver = null;
              }
              var nextBoundary = utf8border(data);
              var usableData = data;
              if (nextBoundary !== data.length) if (support.uint8array) {
                usableData = data.subarray(0, nextBoundary);
                this.leftOver = data.subarray(nextBoundary, data.length);
              } else {
                usableData = data.slice(0, nextBoundary);
                this.leftOver = data.slice(nextBoundary, data.length);
              }
              this.push({
                data: exports.utf8decode(usableData),
                meta: chunk.meta
              });
            };
            Utf8DecodeWorker.prototype.flush = function() {
              if (this.leftOver && this.leftOver.length) {
                this.push({
                  data: exports.utf8decode(this.leftOver),
                  meta: {}
                });
                this.leftOver = null;
              }
            };
            exports.Utf8DecodeWorker = Utf8DecodeWorker;
            function Utf8EncodeWorker() {
              GenericWorker.call(this, "utf-8 encode");
            }
            utils.inherits(Utf8EncodeWorker, GenericWorker);
            Utf8EncodeWorker.prototype.processChunk = function(chunk) {
              this.push({
                data: exports.utf8encode(chunk.data),
                meta: chunk.meta
              });
            };
            exports.Utf8EncodeWorker = Utf8EncodeWorker;
          }, {
            "./nodejsUtils": 14,
            "./stream/GenericWorker": 28,
            "./support": 30,
            "./utils": 32
          } ],
          32: [ function(require, module, exports) {
            var support = require("./support");
            var base64 = require("./base64");
            var nodejsUtils = require("./nodejsUtils");
            var setImmediate = require("set-immediate-shim");
            var external = require("./external");
            function string2binary(str) {
              var result = null;
              result = support.uint8array ? new Uint8Array(str.length) : new Array(str.length);
              return stringToArrayLike(str, result);
            }
            exports.newBlob = function(part, type) {
              exports.checkSupport("blob");
              try {
                return new Blob([ part ], {
                  type: type
                });
              } catch (e) {
                try {
                  var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
                  var builder = new Builder();
                  builder.append(part);
                  return builder.getBlob(type);
                } catch (e) {
                  throw new Error("Bug : can't construct the Blob.");
                }
              }
            };
            function identity(input) {
              return input;
            }
            function stringToArrayLike(str, array) {
              for (var i = 0; i < str.length; ++i) array[i] = 255 & str.charCodeAt(i);
              return array;
            }
            var arrayToStringHelper = {
              stringifyByChunk: function stringifyByChunk(array, type, chunk) {
                var result = [], k = 0, len = array.length;
                if (len <= chunk) return String.fromCharCode.apply(null, array);
                while (k < len) {
                  "array" === type || "nodebuffer" === type ? result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len)))) : result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
                  k += chunk;
                }
                return result.join("");
              },
              stringifyByChar: function stringifyByChar(array) {
                var resultStr = "";
                for (var i = 0; i < array.length; i++) resultStr += String.fromCharCode(array[i]);
                return resultStr;
              },
              applyCanBeUsed: {
                uint8array: function() {
                  try {
                    return support.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
                  } catch (e) {
                    return false;
                  }
                }(),
                nodebuffer: function() {
                  try {
                    return support.nodebuffer && 1 === String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length;
                  } catch (e) {
                    return false;
                  }
                }()
              }
            };
            function arrayLikeToString(array) {
              var chunk = 65536, type = exports.getTypeOf(array), canUseApply = true;
              "uint8array" === type ? canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array : "nodebuffer" === type && (canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer);
              if (canUseApply) while (chunk > 1) try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
              } catch (e) {
                chunk = Math.floor(chunk / 2);
              }
              return arrayToStringHelper.stringifyByChar(array);
            }
            exports.applyFromCharCode = arrayLikeToString;
            function arrayLikeToArrayLike(arrayFrom, arrayTo) {
              for (var i = 0; i < arrayFrom.length; i++) arrayTo[i] = arrayFrom[i];
              return arrayTo;
            }
            var transform = {};
            transform["string"] = {
              string: identity,
              array: function array(input) {
                return stringToArrayLike(input, new Array(input.length));
              },
              arraybuffer: function arraybuffer(input) {
                return transform["string"]["uint8array"](input).buffer;
              },
              uint8array: function uint8array(input) {
                return stringToArrayLike(input, new Uint8Array(input.length));
              },
              nodebuffer: function nodebuffer(input) {
                return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
              }
            };
            transform["array"] = {
              string: arrayLikeToString,
              array: identity,
              arraybuffer: function arraybuffer(input) {
                return new Uint8Array(input).buffer;
              },
              uint8array: function uint8array(input) {
                return new Uint8Array(input);
              },
              nodebuffer: function nodebuffer(input) {
                return nodejsUtils.newBufferFrom(input);
              }
            };
            transform["arraybuffer"] = {
              string: function string(input) {
                return arrayLikeToString(new Uint8Array(input));
              },
              array: function array(input) {
                return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
              },
              arraybuffer: identity,
              uint8array: function uint8array(input) {
                return new Uint8Array(input);
              },
              nodebuffer: function nodebuffer(input) {
                return nodejsUtils.newBufferFrom(new Uint8Array(input));
              }
            };
            transform["uint8array"] = {
              string: arrayLikeToString,
              array: function array(input) {
                return arrayLikeToArrayLike(input, new Array(input.length));
              },
              arraybuffer: function arraybuffer(input) {
                return input.buffer;
              },
              uint8array: identity,
              nodebuffer: function nodebuffer(input) {
                return nodejsUtils.newBufferFrom(input);
              }
            };
            transform["nodebuffer"] = {
              string: arrayLikeToString,
              array: function array(input) {
                return arrayLikeToArrayLike(input, new Array(input.length));
              },
              arraybuffer: function arraybuffer(input) {
                return transform["nodebuffer"]["uint8array"](input).buffer;
              },
              uint8array: function uint8array(input) {
                return arrayLikeToArrayLike(input, new Uint8Array(input.length));
              },
              nodebuffer: identity
            };
            exports.transformTo = function(outputType, input) {
              input || (input = "");
              if (!outputType) return input;
              exports.checkSupport(outputType);
              var inputType = exports.getTypeOf(input);
              var result = transform[inputType][outputType](input);
              return result;
            };
            exports.getTypeOf = function(input) {
              if ("string" === typeof input) return "string";
              if ("[object Array]" === Object.prototype.toString.call(input)) return "array";
              if (support.nodebuffer && nodejsUtils.isBuffer(input)) return "nodebuffer";
              if (support.uint8array && input instanceof Uint8Array) return "uint8array";
              if (support.arraybuffer && input instanceof ArrayBuffer) return "arraybuffer";
            };
            exports.checkSupport = function(type) {
              var supported = support[type.toLowerCase()];
              if (!supported) throw new Error(type + " is not supported by this platform");
            };
            exports.MAX_VALUE_16BITS = 65535;
            exports.MAX_VALUE_32BITS = -1;
            exports.pretty = function(str) {
              var res = "", code, i;
              for (i = 0; i < (str || "").length; i++) {
                code = str.charCodeAt(i);
                res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
              }
              return res;
            };
            exports.delay = function(callback, args, self) {
              setImmediate(function() {
                callback.apply(self || null, args || []);
              });
            };
            exports.inherits = function(ctor, superCtor) {
              var Obj = function Obj() {};
              Obj.prototype = superCtor.prototype;
              ctor.prototype = new Obj();
            };
            exports.extend = function() {
              var result = {}, i, attr;
              for (i = 0; i < arguments.length; i++) for (attr in arguments[i]) arguments[i].hasOwnProperty(attr) && "undefined" === typeof result[attr] && (result[attr] = arguments[i][attr]);
              return result;
            };
            exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
              var promise = external.Promise.resolve(inputData).then(function(data) {
                var isBlob = support.blob && (data instanceof Blob || -1 !== [ "[object File]", "[object Blob]" ].indexOf(Object.prototype.toString.call(data)));
                return isBlob && "undefined" !== typeof FileReader ? new external.Promise(function(resolve, reject) {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                    resolve(e.target.result);
                  };
                  reader.onerror = function(e) {
                    reject(e.target.error);
                  };
                  reader.readAsArrayBuffer(data);
                }) : data;
              });
              return promise.then(function(data) {
                var dataType = exports.getTypeOf(data);
                if (!dataType) return external.Promise.reject(new Error("Can't read the data of '" + name + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
                "arraybuffer" === dataType ? data = exports.transformTo("uint8array", data) : "string" === dataType && (isBase64 ? data = base64.decode(data) : isBinary && true !== isOptimizedBinaryString && (data = string2binary(data)));
                return data;
              });
            };
          }, {
            "./base64": 1,
            "./external": 6,
            "./nodejsUtils": 14,
            "./support": 30,
            "set-immediate-shim": 54
          } ],
          33: [ function(require, module, exports) {
            var readerFor = require("./reader/readerFor");
            var utils = require("./utils");
            var sig = require("./signature");
            var ZipEntry = require("./zipEntry");
            var utf8 = require("./utf8");
            var support = require("./support");
            function ZipEntries(loadOptions) {
              this.files = [];
              this.loadOptions = loadOptions;
            }
            ZipEntries.prototype = {
              checkSignature: function checkSignature(expectedSignature) {
                if (!this.reader.readAndCheckSignature(expectedSignature)) {
                  this.reader.index -= 4;
                  var signature = this.reader.readString(4);
                  throw new Error("Corrupted zip or bug: unexpected signature (" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
                }
              },
              isSignature: function isSignature(askedIndex, expectedSignature) {
                var currentIndex = this.reader.index;
                this.reader.setIndex(askedIndex);
                var signature = this.reader.readString(4);
                var result = signature === expectedSignature;
                this.reader.setIndex(currentIndex);
                return result;
              },
              readBlockEndOfCentral: function readBlockEndOfCentral() {
                this.diskNumber = this.reader.readInt(2);
                this.diskWithCentralDirStart = this.reader.readInt(2);
                this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
                this.centralDirRecords = this.reader.readInt(2);
                this.centralDirSize = this.reader.readInt(4);
                this.centralDirOffset = this.reader.readInt(4);
                this.zipCommentLength = this.reader.readInt(2);
                var zipComment = this.reader.readData(this.zipCommentLength);
                var decodeParamType = support.uint8array ? "uint8array" : "array";
                var decodeContent = utils.transformTo(decodeParamType, zipComment);
                this.zipComment = this.loadOptions.decodeFileName(decodeContent);
              },
              readBlockZip64EndOfCentral: function readBlockZip64EndOfCentral() {
                this.zip64EndOfCentralSize = this.reader.readInt(8);
                this.reader.skip(4);
                this.diskNumber = this.reader.readInt(4);
                this.diskWithCentralDirStart = this.reader.readInt(4);
                this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
                this.centralDirRecords = this.reader.readInt(8);
                this.centralDirSize = this.reader.readInt(8);
                this.centralDirOffset = this.reader.readInt(8);
                this.zip64ExtensibleData = {};
                var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
                while (index < extraDataSize) {
                  extraFieldId = this.reader.readInt(2);
                  extraFieldLength = this.reader.readInt(4);
                  extraFieldValue = this.reader.readData(extraFieldLength);
                  this.zip64ExtensibleData[extraFieldId] = {
                    id: extraFieldId,
                    length: extraFieldLength,
                    value: extraFieldValue
                  };
                }
              },
              readBlockZip64EndOfCentralLocator: function readBlockZip64EndOfCentralLocator() {
                this.diskWithZip64CentralDirStart = this.reader.readInt(4);
                this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
                this.disksCount = this.reader.readInt(4);
                if (this.disksCount > 1) throw new Error("Multi-volumes zip are not supported");
              },
              readLocalFiles: function readLocalFiles() {
                var i, file;
                for (i = 0; i < this.files.length; i++) {
                  file = this.files[i];
                  this.reader.setIndex(file.localHeaderOffset);
                  this.checkSignature(sig.LOCAL_FILE_HEADER);
                  file.readLocalPart(this.reader);
                  file.handleUTF8();
                  file.processAttributes();
                }
              },
              readCentralDir: function readCentralDir() {
                var file;
                this.reader.setIndex(this.centralDirOffset);
                while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
                  file = new ZipEntry({
                    zip64: this.zip64
                  }, this.loadOptions);
                  file.readCentralPart(this.reader);
                  this.files.push(file);
                }
                if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
              },
              readEndOfCentral: function readEndOfCentral() {
                var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
                if (offset < 0) {
                  var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
                  throw isGarbage ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
                }
                this.reader.setIndex(offset);
                var endOfCentralDirOffset = offset;
                this.checkSignature(sig.CENTRAL_DIRECTORY_END);
                this.readBlockEndOfCentral();
                if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
                  this.zip64 = true;
                  offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
                  if (offset < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                  this.reader.setIndex(offset);
                  this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
                  this.readBlockZip64EndOfCentralLocator();
                  if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                    this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                    if (this.relativeOffsetEndOfZip64CentralDir < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                  }
                  this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
                  this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                  this.readBlockZip64EndOfCentral();
                }
                var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
                if (this.zip64) {
                  expectedEndOfCentralDirOffset += 20;
                  expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
                }
                var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
                if (extraBytes > 0) this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER) || (this.reader.zero = extraBytes); else if (extraBytes < 0) throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
              },
              prepareReader: function prepareReader(data) {
                this.reader = readerFor(data);
              },
              load: function load(data) {
                this.prepareReader(data);
                this.readEndOfCentral();
                this.readCentralDir();
                this.readLocalFiles();
              }
            };
            module.exports = ZipEntries;
          }, {
            "./reader/readerFor": 22,
            "./signature": 23,
            "./support": 30,
            "./utf8": 31,
            "./utils": 32,
            "./zipEntry": 34
          } ],
          34: [ function(require, module, exports) {
            var readerFor = require("./reader/readerFor");
            var utils = require("./utils");
            var CompressedObject = require("./compressedObject");
            var crc32fn = require("./crc32");
            var utf8 = require("./utf8");
            var compressions = require("./compressions");
            var support = require("./support");
            var MADE_BY_DOS = 0;
            var MADE_BY_UNIX = 3;
            var findCompression = function findCompression(compressionMethod) {
              for (var method in compressions) {
                if (!compressions.hasOwnProperty(method)) continue;
                if (compressions[method].magic === compressionMethod) return compressions[method];
              }
              return null;
            };
            function ZipEntry(options, loadOptions) {
              this.options = options;
              this.loadOptions = loadOptions;
            }
            ZipEntry.prototype = {
              isEncrypted: function isEncrypted() {
                return 1 === (1 & this.bitFlag);
              },
              useUTF8: function useUTF8() {
                return 2048 === (2048 & this.bitFlag);
              },
              readLocalPart: function readLocalPart(reader) {
                var compression, localExtraFieldsLength;
                reader.skip(22);
                this.fileNameLength = reader.readInt(2);
                localExtraFieldsLength = reader.readInt(2);
                this.fileName = reader.readData(this.fileNameLength);
                reader.skip(localExtraFieldsLength);
                if (-1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                compression = findCompression(this.compressionMethod);
                if (null === compression) throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
                this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
              },
              readCentralPart: function readCentralPart(reader) {
                this.versionMadeBy = reader.readInt(2);
                reader.skip(2);
                this.bitFlag = reader.readInt(2);
                this.compressionMethod = reader.readString(2);
                this.date = reader.readDate();
                this.crc32 = reader.readInt(4);
                this.compressedSize = reader.readInt(4);
                this.uncompressedSize = reader.readInt(4);
                var fileNameLength = reader.readInt(2);
                this.extraFieldsLength = reader.readInt(2);
                this.fileCommentLength = reader.readInt(2);
                this.diskNumberStart = reader.readInt(2);
                this.internalFileAttributes = reader.readInt(2);
                this.externalFileAttributes = reader.readInt(4);
                this.localHeaderOffset = reader.readInt(4);
                if (this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                reader.skip(fileNameLength);
                this.readExtraFields(reader);
                this.parseZIP64ExtraField(reader);
                this.fileComment = reader.readData(this.fileCommentLength);
              },
              processAttributes: function processAttributes() {
                this.unixPermissions = null;
                this.dosPermissions = null;
                var madeBy = this.versionMadeBy >> 8;
                this.dir = !!(16 & this.externalFileAttributes);
                madeBy === MADE_BY_DOS && (this.dosPermissions = 63 & this.externalFileAttributes);
                madeBy === MADE_BY_UNIX && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535);
                this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
              },
              parseZIP64ExtraField: function parseZIP64ExtraField(reader) {
                if (!this.extraFields[1]) return;
                var extraReader = readerFor(this.extraFields[1].value);
                this.uncompressedSize === utils.MAX_VALUE_32BITS && (this.uncompressedSize = extraReader.readInt(8));
                this.compressedSize === utils.MAX_VALUE_32BITS && (this.compressedSize = extraReader.readInt(8));
                this.localHeaderOffset === utils.MAX_VALUE_32BITS && (this.localHeaderOffset = extraReader.readInt(8));
                this.diskNumberStart === utils.MAX_VALUE_32BITS && (this.diskNumberStart = extraReader.readInt(4));
              },
              readExtraFields: function readExtraFields(reader) {
                var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
                this.extraFields || (this.extraFields = {});
                while (reader.index + 4 < end) {
                  extraFieldId = reader.readInt(2);
                  extraFieldLength = reader.readInt(2);
                  extraFieldValue = reader.readData(extraFieldLength);
                  this.extraFields[extraFieldId] = {
                    id: extraFieldId,
                    length: extraFieldLength,
                    value: extraFieldValue
                  };
                }
                reader.setIndex(end);
              },
              handleUTF8: function handleUTF8() {
                var decodeParamType = support.uint8array ? "uint8array" : "array";
                if (this.useUTF8()) {
                  this.fileNameStr = utf8.utf8decode(this.fileName);
                  this.fileCommentStr = utf8.utf8decode(this.fileComment);
                } else {
                  var upath = this.findExtraFieldUnicodePath();
                  if (null !== upath) this.fileNameStr = upath; else {
                    var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
                    this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
                  }
                  var ucomment = this.findExtraFieldUnicodeComment();
                  if (null !== ucomment) this.fileCommentStr = ucomment; else {
                    var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
                    this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
                  }
                }
              },
              findExtraFieldUnicodePath: function findExtraFieldUnicodePath() {
                var upathField = this.extraFields[28789];
                if (upathField) {
                  var extraReader = readerFor(upathField.value);
                  if (1 !== extraReader.readInt(1)) return null;
                  if (crc32fn(this.fileName) !== extraReader.readInt(4)) return null;
                  return utf8.utf8decode(extraReader.readData(upathField.length - 5));
                }
                return null;
              },
              findExtraFieldUnicodeComment: function findExtraFieldUnicodeComment() {
                var ucommentField = this.extraFields[25461];
                if (ucommentField) {
                  var extraReader = readerFor(ucommentField.value);
                  if (1 !== extraReader.readInt(1)) return null;
                  if (crc32fn(this.fileComment) !== extraReader.readInt(4)) return null;
                  return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
                }
                return null;
              }
            };
            module.exports = ZipEntry;
          }, {
            "./compressedObject": 2,
            "./compressions": 3,
            "./crc32": 4,
            "./reader/readerFor": 22,
            "./support": 30,
            "./utf8": 31,
            "./utils": 32
          } ],
          35: [ function(require, module, exports) {
            var StreamHelper = require("./stream/StreamHelper");
            var DataWorker = require("./stream/DataWorker");
            var utf8 = require("./utf8");
            var CompressedObject = require("./compressedObject");
            var GenericWorker = require("./stream/GenericWorker");
            var ZipObject = function ZipObject(name, data, options) {
              this.name = name;
              this.dir = options.dir;
              this.date = options.date;
              this.comment = options.comment;
              this.unixPermissions = options.unixPermissions;
              this.dosPermissions = options.dosPermissions;
              this._data = data;
              this._dataBinary = options.binary;
              this.options = {
                compression: options.compression,
                compressionOptions: options.compressionOptions
              };
            };
            ZipObject.prototype = {
              internalStream: function internalStream(type) {
                var result = null, outputType = "string";
                try {
                  if (!type) throw new Error("No output type specified.");
                  outputType = type.toLowerCase();
                  var askUnicodeString = "string" === outputType || "text" === outputType;
                  "binarystring" !== outputType && "text" !== outputType || (outputType = "string");
                  result = this._decompressWorker();
                  var isUnicodeString = !this._dataBinary;
                  isUnicodeString && !askUnicodeString && (result = result.pipe(new utf8.Utf8EncodeWorker()));
                  !isUnicodeString && askUnicodeString && (result = result.pipe(new utf8.Utf8DecodeWorker()));
                } catch (e) {
                  result = new GenericWorker("error");
                  result.error(e);
                }
                return new StreamHelper(result, outputType, "");
              },
              async: function async(type, onUpdate) {
                return this.internalStream(type).accumulate(onUpdate);
              },
              nodeStream: function nodeStream(type, onUpdate) {
                return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
              },
              _compressWorker: function _compressWorker(compression, compressionOptions) {
                if (this._data instanceof CompressedObject && this._data.compression.magic === compression.magic) return this._data.getCompressedWorker();
                var result = this._decompressWorker();
                this._dataBinary || (result = result.pipe(new utf8.Utf8EncodeWorker()));
                return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
              },
              _decompressWorker: function _decompressWorker() {
                return this._data instanceof CompressedObject ? this._data.getContentWorker() : this._data instanceof GenericWorker ? this._data : new DataWorker(this._data);
              }
            };
            var removedMethods = [ "asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer" ];
            var removedFn = function removedFn() {
              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            };
            for (var i = 0; i < removedMethods.length; i++) ZipObject.prototype[removedMethods[i]] = removedFn;
            module.exports = ZipObject;
          }, {
            "./compressedObject": 2,
            "./stream/DataWorker": 27,
            "./stream/GenericWorker": 28,
            "./stream/StreamHelper": 29,
            "./utf8": 31
          } ],
          36: [ function(require, module, exports) {
            (function(global) {
              var Mutation = global.MutationObserver || global.WebKitMutationObserver;
              var scheduleDrain;
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global.document.createTextNode("");
                observer.observe(element, {
                  characterData: true
                });
                scheduleDrain = function scheduleDrain() {
                  element.data = called = ++called % 2;
                };
              } else if (global.setImmediate || "undefined" === typeof global.MessageChannel) scheduleDrain = "document" in global && "onreadystatechange" in global.document.createElement("script") ? function scheduleDrain() {
                var scriptEl = global.document.createElement("script");
                scriptEl.onreadystatechange = function() {
                  nextTick();
                  scriptEl.onreadystatechange = null;
                  scriptEl.parentNode.removeChild(scriptEl);
                  scriptEl = null;
                };
                global.document.documentElement.appendChild(scriptEl);
              } : function scheduleDrain() {
                setTimeout(nextTick, 0);
              }; else {
                var channel = new global.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function scheduleDrain() {
                  channel.port2.postMessage(0);
                };
              }
              var draining;
              var queue = [];
              function nextTick() {
                draining = true;
                var i, oldQueue;
                var len = queue.length;
                while (len) {
                  oldQueue = queue;
                  queue = [];
                  i = -1;
                  while (++i < len) oldQueue[i]();
                  len = queue.length;
                }
                draining = false;
              }
              module.exports = immediate;
              function immediate(task) {
                1 !== queue.push(task) || draining || scheduleDrain();
              }
            }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
          }, {} ],
          37: [ function(require, module, exports) {
            var immediate = require("immediate");
            function INTERNAL() {}
            var handlers = {};
            var REJECTED = [ "REJECTED" ];
            var FULFILLED = [ "FULFILLED" ];
            var PENDING = [ "PENDING" ];
            module.exports = Promise;
            function Promise(resolver) {
              if ("function" !== typeof resolver) throw new TypeError("resolver must be a function");
              this.state = PENDING;
              this.queue = [];
              this.outcome = void 0;
              resolver !== INTERNAL && safelyResolveThenable(this, resolver);
            }
            Promise.prototype["finally"] = function(callback) {
              if ("function" !== typeof callback) return this;
              var p = this.constructor;
              return this.then(resolve, reject);
              function resolve(value) {
                function yes() {
                  return value;
                }
                return p.resolve(callback()).then(yes);
              }
              function reject(reason) {
                function no() {
                  throw reason;
                }
                return p.resolve(callback()).then(no);
              }
            };
            Promise.prototype["catch"] = function(onRejected) {
              return this.then(null, onRejected);
            };
            Promise.prototype.then = function(onFulfilled, onRejected) {
              if ("function" !== typeof onFulfilled && this.state === FULFILLED || "function" !== typeof onRejected && this.state === REJECTED) return this;
              var promise = new this.constructor(INTERNAL);
              if (this.state !== PENDING) {
                var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                unwrap(promise, resolver, this.outcome);
              } else this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
              return promise;
            };
            function QueueItem(promise, onFulfilled, onRejected) {
              this.promise = promise;
              if ("function" === typeof onFulfilled) {
                this.onFulfilled = onFulfilled;
                this.callFulfilled = this.otherCallFulfilled;
              }
              if ("function" === typeof onRejected) {
                this.onRejected = onRejected;
                this.callRejected = this.otherCallRejected;
              }
            }
            QueueItem.prototype.callFulfilled = function(value) {
              handlers.resolve(this.promise, value);
            };
            QueueItem.prototype.otherCallFulfilled = function(value) {
              unwrap(this.promise, this.onFulfilled, value);
            };
            QueueItem.prototype.callRejected = function(value) {
              handlers.reject(this.promise, value);
            };
            QueueItem.prototype.otherCallRejected = function(value) {
              unwrap(this.promise, this.onRejected, value);
            };
            function unwrap(promise, func, value) {
              immediate(function() {
                var returnValue;
                try {
                  returnValue = func(value);
                } catch (e) {
                  return handlers.reject(promise, e);
                }
                returnValue === promise ? handlers.reject(promise, new TypeError("Cannot resolve promise with itself")) : handlers.resolve(promise, returnValue);
              });
            }
            handlers.resolve = function(self, value) {
              var result = tryCatch(getThen, value);
              if ("error" === result.status) return handlers.reject(self, result.value);
              var thenable = result.value;
              if (thenable) safelyResolveThenable(self, thenable); else {
                self.state = FULFILLED;
                self.outcome = value;
                var i = -1;
                var len = self.queue.length;
                while (++i < len) self.queue[i].callFulfilled(value);
              }
              return self;
            };
            handlers.reject = function(self, error) {
              self.state = REJECTED;
              self.outcome = error;
              var i = -1;
              var len = self.queue.length;
              while (++i < len) self.queue[i].callRejected(error);
              return self;
            };
            function getThen(obj) {
              var then = obj && obj.then;
              if (obj && ("object" === typeof obj || "function" === typeof obj) && "function" === typeof then) return function appyThen() {
                then.apply(obj, arguments);
              };
            }
            function safelyResolveThenable(self, thenable) {
              var called = false;
              function onError(value) {
                if (called) return;
                called = true;
                handlers.reject(self, value);
              }
              function onSuccess(value) {
                if (called) return;
                called = true;
                handlers.resolve(self, value);
              }
              function tryToUnwrap() {
                thenable(onSuccess, onError);
              }
              var result = tryCatch(tryToUnwrap);
              "error" === result.status && onError(result.value);
            }
            function tryCatch(func, value) {
              var out = {};
              try {
                out.value = func(value);
                out.status = "success";
              } catch (e) {
                out.status = "error";
                out.value = e;
              }
              return out;
            }
            Promise.resolve = resolve;
            function resolve(value) {
              if (value instanceof this) return value;
              return handlers.resolve(new this(INTERNAL), value);
            }
            Promise.reject = reject;
            function reject(reason) {
              var promise = new this(INTERNAL);
              return handlers.reject(promise, reason);
            }
            Promise.all = all;
            function all(iterable) {
              var self = this;
              if ("[object Array]" !== Object.prototype.toString.call(iterable)) return this.reject(new TypeError("must be an array"));
              var len = iterable.length;
              var called = false;
              if (!len) return this.resolve([]);
              var values = new Array(len);
              var resolved = 0;
              var i = -1;
              var promise = new this(INTERNAL);
              while (++i < len) allResolver(iterable[i], i);
              return promise;
              function allResolver(value, i) {
                self.resolve(value).then(resolveFromAll, function(error) {
                  if (!called) {
                    called = true;
                    handlers.reject(promise, error);
                  }
                });
                function resolveFromAll(outValue) {
                  values[i] = outValue;
                  if (++resolved === len && !called) {
                    called = true;
                    handlers.resolve(promise, values);
                  }
                }
              }
            }
            Promise.race = race;
            function race(iterable) {
              var self = this;
              if ("[object Array]" !== Object.prototype.toString.call(iterable)) return this.reject(new TypeError("must be an array"));
              var len = iterable.length;
              var called = false;
              if (!len) return this.resolve([]);
              var i = -1;
              var promise = new this(INTERNAL);
              while (++i < len) resolver(iterable[i]);
              return promise;
              function resolver(value) {
                self.resolve(value).then(function(response) {
                  if (!called) {
                    called = true;
                    handlers.resolve(promise, response);
                  }
                }, function(error) {
                  if (!called) {
                    called = true;
                    handlers.reject(promise, error);
                  }
                });
              }
            }
          }, {
            immediate: 36
          } ],
          38: [ function(require, module, exports) {
            var assign = require("./lib/utils/common").assign;
            var deflate = require("./lib/deflate");
            var inflate = require("./lib/inflate");
            var constants = require("./lib/zlib/constants");
            var pako = {};
            assign(pako, deflate, inflate, constants);
            module.exports = pako;
          }, {
            "./lib/deflate": 39,
            "./lib/inflate": 40,
            "./lib/utils/common": 41,
            "./lib/zlib/constants": 44
          } ],
          39: [ function(require, module, exports) {
            var zlib_deflate = require("./zlib/deflate");
            var utils = require("./utils/common");
            var strings = require("./utils/strings");
            var msg = require("./zlib/messages");
            var ZStream = require("./zlib/zstream");
            var toString = Object.prototype.toString;
            var Z_NO_FLUSH = 0;
            var Z_FINISH = 4;
            var Z_OK = 0;
            var Z_STREAM_END = 1;
            var Z_SYNC_FLUSH = 2;
            var Z_DEFAULT_COMPRESSION = -1;
            var Z_DEFAULT_STRATEGY = 0;
            var Z_DEFLATED = 8;
            function Deflate(options) {
              if (!(this instanceof Deflate)) return new Deflate(options);
              this.options = utils.assign({
                level: Z_DEFAULT_COMPRESSION,
                method: Z_DEFLATED,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: Z_DEFAULT_STRATEGY,
                to: ""
              }, options || {});
              var opt = this.options;
              opt.raw && opt.windowBits > 0 ? opt.windowBits = -opt.windowBits : opt.gzip && opt.windowBits > 0 && opt.windowBits < 16 && (opt.windowBits += 16);
              this.err = 0;
              this.msg = "";
              this.ended = false;
              this.chunks = [];
              this.strm = new ZStream();
              this.strm.avail_out = 0;
              var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
              if (status !== Z_OK) throw new Error(msg[status]);
              opt.header && zlib_deflate.deflateSetHeader(this.strm, opt.header);
              if (opt.dictionary) {
                var dict;
                dict = "string" === typeof opt.dictionary ? strings.string2buf(opt.dictionary) : "[object ArrayBuffer]" === toString.call(opt.dictionary) ? new Uint8Array(opt.dictionary) : opt.dictionary;
                status = zlib_deflate.deflateSetDictionary(this.strm, dict);
                if (status !== Z_OK) throw new Error(msg[status]);
                this._dict_set = true;
              }
            }
            Deflate.prototype.push = function(data, mode) {
              var strm = this.strm;
              var chunkSize = this.options.chunkSize;
              var status, _mode;
              if (this.ended) return false;
              _mode = mode === ~~mode ? mode : true === mode ? Z_FINISH : Z_NO_FLUSH;
              "string" === typeof data ? strm.input = strings.string2buf(data) : "[object ArrayBuffer]" === toString.call(data) ? strm.input = new Uint8Array(data) : strm.input = data;
              strm.next_in = 0;
              strm.avail_in = strm.input.length;
              do {
                if (0 === strm.avail_out) {
                  strm.output = new utils.Buf8(chunkSize);
                  strm.next_out = 0;
                  strm.avail_out = chunkSize;
                }
                status = zlib_deflate.deflate(strm, _mode);
                if (status !== Z_STREAM_END && status !== Z_OK) {
                  this.onEnd(status);
                  this.ended = true;
                  return false;
                }
                0 !== strm.avail_out && (0 !== strm.avail_in || _mode !== Z_FINISH && _mode !== Z_SYNC_FLUSH) || ("string" === this.options.to ? this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out))) : this.onData(utils.shrinkBuf(strm.output, strm.next_out)));
              } while ((strm.avail_in > 0 || 0 === strm.avail_out) && status !== Z_STREAM_END);
              if (_mode === Z_FINISH) {
                status = zlib_deflate.deflateEnd(this.strm);
                this.onEnd(status);
                this.ended = true;
                return status === Z_OK;
              }
              if (_mode === Z_SYNC_FLUSH) {
                this.onEnd(Z_OK);
                strm.avail_out = 0;
                return true;
              }
              return true;
            };
            Deflate.prototype.onData = function(chunk) {
              this.chunks.push(chunk);
            };
            Deflate.prototype.onEnd = function(status) {
              status === Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = utils.flattenChunks(this.chunks));
              this.chunks = [];
              this.err = status;
              this.msg = this.strm.msg;
            };
            function deflate(input, options) {
              var deflator = new Deflate(options);
              deflator.push(input, true);
              if (deflator.err) throw deflator.msg || msg[deflator.err];
              return deflator.result;
            }
            function deflateRaw(input, options) {
              options = options || {};
              options.raw = true;
              return deflate(input, options);
            }
            function gzip(input, options) {
              options = options || {};
              options.gzip = true;
              return deflate(input, options);
            }
            exports.Deflate = Deflate;
            exports.deflate = deflate;
            exports.deflateRaw = deflateRaw;
            exports.gzip = gzip;
          }, {
            "./utils/common": 41,
            "./utils/strings": 42,
            "./zlib/deflate": 46,
            "./zlib/messages": 51,
            "./zlib/zstream": 53
          } ],
          40: [ function(require, module, exports) {
            var zlib_inflate = require("./zlib/inflate");
            var utils = require("./utils/common");
            var strings = require("./utils/strings");
            var c = require("./zlib/constants");
            var msg = require("./zlib/messages");
            var ZStream = require("./zlib/zstream");
            var GZheader = require("./zlib/gzheader");
            var toString = Object.prototype.toString;
            function Inflate(options) {
              if (!(this instanceof Inflate)) return new Inflate(options);
              this.options = utils.assign({
                chunkSize: 16384,
                windowBits: 0,
                to: ""
              }, options || {});
              var opt = this.options;
              if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
                opt.windowBits = -opt.windowBits;
                0 === opt.windowBits && (opt.windowBits = -15);
              }
              opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits) && (opt.windowBits += 32);
              opt.windowBits > 15 && opt.windowBits < 48 && 0 === (15 & opt.windowBits) && (opt.windowBits |= 15);
              this.err = 0;
              this.msg = "";
              this.ended = false;
              this.chunks = [];
              this.strm = new ZStream();
              this.strm.avail_out = 0;
              var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
              if (status !== c.Z_OK) throw new Error(msg[status]);
              this.header = new GZheader();
              zlib_inflate.inflateGetHeader(this.strm, this.header);
            }
            Inflate.prototype.push = function(data, mode) {
              var strm = this.strm;
              var chunkSize = this.options.chunkSize;
              var dictionary = this.options.dictionary;
              var status, _mode;
              var next_out_utf8, tail, utf8str;
              var dict;
              var allowBufError = false;
              if (this.ended) return false;
              _mode = mode === ~~mode ? mode : true === mode ? c.Z_FINISH : c.Z_NO_FLUSH;
              "string" === typeof data ? strm.input = strings.binstring2buf(data) : "[object ArrayBuffer]" === toString.call(data) ? strm.input = new Uint8Array(data) : strm.input = data;
              strm.next_in = 0;
              strm.avail_in = strm.input.length;
              do {
                if (0 === strm.avail_out) {
                  strm.output = new utils.Buf8(chunkSize);
                  strm.next_out = 0;
                  strm.avail_out = chunkSize;
                }
                status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
                if (status === c.Z_NEED_DICT && dictionary) {
                  dict = "string" === typeof dictionary ? strings.string2buf(dictionary) : "[object ArrayBuffer]" === toString.call(dictionary) ? new Uint8Array(dictionary) : dictionary;
                  status = zlib_inflate.inflateSetDictionary(this.strm, dict);
                }
                if (status === c.Z_BUF_ERROR && true === allowBufError) {
                  status = c.Z_OK;
                  allowBufError = false;
                }
                if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
                  this.onEnd(status);
                  this.ended = true;
                  return false;
                }
                if (strm.next_out && (0 === strm.avail_out || status === c.Z_STREAM_END || 0 === strm.avail_in && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) if ("string" === this.options.to) {
                  next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                  tail = strm.next_out - next_out_utf8;
                  utf8str = strings.buf2string(strm.output, next_out_utf8);
                  strm.next_out = tail;
                  strm.avail_out = chunkSize - tail;
                  tail && utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
                  this.onData(utf8str);
                } else this.onData(utils.shrinkBuf(strm.output, strm.next_out));
                0 === strm.avail_in && 0 === strm.avail_out && (allowBufError = true);
              } while ((strm.avail_in > 0 || 0 === strm.avail_out) && status !== c.Z_STREAM_END);
              status === c.Z_STREAM_END && (_mode = c.Z_FINISH);
              if (_mode === c.Z_FINISH) {
                status = zlib_inflate.inflateEnd(this.strm);
                this.onEnd(status);
                this.ended = true;
                return status === c.Z_OK;
              }
              if (_mode === c.Z_SYNC_FLUSH) {
                this.onEnd(c.Z_OK);
                strm.avail_out = 0;
                return true;
              }
              return true;
            };
            Inflate.prototype.onData = function(chunk) {
              this.chunks.push(chunk);
            };
            Inflate.prototype.onEnd = function(status) {
              status === c.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = utils.flattenChunks(this.chunks));
              this.chunks = [];
              this.err = status;
              this.msg = this.strm.msg;
            };
            function inflate(input, options) {
              var inflator = new Inflate(options);
              inflator.push(input, true);
              if (inflator.err) throw inflator.msg || msg[inflator.err];
              return inflator.result;
            }
            function inflateRaw(input, options) {
              options = options || {};
              options.raw = true;
              return inflate(input, options);
            }
            exports.Inflate = Inflate;
            exports.inflate = inflate;
            exports.inflateRaw = inflateRaw;
            exports.ungzip = inflate;
          }, {
            "./utils/common": 41,
            "./utils/strings": 42,
            "./zlib/constants": 44,
            "./zlib/gzheader": 47,
            "./zlib/inflate": 49,
            "./zlib/messages": 51,
            "./zlib/zstream": 53
          } ],
          41: [ function(require, module, exports) {
            var TYPED_OK = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
            exports.assign = function(obj) {
              var sources = Array.prototype.slice.call(arguments, 1);
              while (sources.length) {
                var source = sources.shift();
                if (!source) continue;
                if ("object" !== typeof source) throw new TypeError(source + "must be non-object");
                for (var p in source) source.hasOwnProperty(p) && (obj[p] = source[p]);
              }
              return obj;
            };
            exports.shrinkBuf = function(buf, size) {
              if (buf.length === size) return buf;
              if (buf.subarray) return buf.subarray(0, size);
              buf.length = size;
              return buf;
            };
            var fnTyped = {
              arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
                if (src.subarray && dest.subarray) {
                  dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
                  return;
                }
                for (var i = 0; i < len; i++) dest[dest_offs + i] = src[src_offs + i];
              },
              flattenChunks: function flattenChunks(chunks) {
                var i, l, len, pos, chunk, result;
                len = 0;
                for (i = 0, l = chunks.length; i < l; i++) len += chunks[i].length;
                result = new Uint8Array(len);
                pos = 0;
                for (i = 0, l = chunks.length; i < l; i++) {
                  chunk = chunks[i];
                  result.set(chunk, pos);
                  pos += chunk.length;
                }
                return result;
              }
            };
            var fnUntyped = {
              arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
                for (var i = 0; i < len; i++) dest[dest_offs + i] = src[src_offs + i];
              },
              flattenChunks: function flattenChunks(chunks) {
                return [].concat.apply([], chunks);
              }
            };
            exports.setTyped = function(on) {
              if (on) {
                exports.Buf8 = Uint8Array;
                exports.Buf16 = Uint16Array;
                exports.Buf32 = Int32Array;
                exports.assign(exports, fnTyped);
              } else {
                exports.Buf8 = Array;
                exports.Buf16 = Array;
                exports.Buf32 = Array;
                exports.assign(exports, fnUntyped);
              }
            };
            exports.setTyped(TYPED_OK);
          }, {} ],
          42: [ function(require, module, exports) {
            var utils = require("./common");
            var STR_APPLY_OK = true;
            var STR_APPLY_UIA_OK = true;
            try {
              String.fromCharCode.apply(null, [ 0 ]);
            } catch (__) {
              STR_APPLY_OK = false;
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1));
            } catch (__) {
              STR_APPLY_UIA_OK = false;
            }
            var _utf8len = new utils.Buf8(256);
            for (var q = 0; q < 256; q++) _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
            _utf8len[254] = _utf8len[254] = 1;
            exports.string2buf = function(str) {
              var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
              for (m_pos = 0; m_pos < str_len; m_pos++) {
                c = str.charCodeAt(m_pos);
                if (55296 === (64512 & c) && m_pos + 1 < str_len) {
                  c2 = str.charCodeAt(m_pos + 1);
                  if (56320 === (64512 & c2)) {
                    c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                    m_pos++;
                  }
                }
                buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
              }
              buf = new utils.Buf8(buf_len);
              for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                c = str.charCodeAt(m_pos);
                if (55296 === (64512 & c) && m_pos + 1 < str_len) {
                  c2 = str.charCodeAt(m_pos + 1);
                  if (56320 === (64512 & c2)) {
                    c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                    m_pos++;
                  }
                }
                if (c < 128) buf[i++] = c; else if (c < 2048) {
                  buf[i++] = 192 | c >>> 6;
                  buf[i++] = 128 | 63 & c;
                } else if (c < 65536) {
                  buf[i++] = 224 | c >>> 12;
                  buf[i++] = 128 | c >>> 6 & 63;
                  buf[i++] = 128 | 63 & c;
                } else {
                  buf[i++] = 240 | c >>> 18;
                  buf[i++] = 128 | c >>> 12 & 63;
                  buf[i++] = 128 | c >>> 6 & 63;
                  buf[i++] = 128 | 63 & c;
                }
              }
              return buf;
            };
            function buf2binstring(buf, len) {
              if (len < 65537 && (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK)) return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
              var result = "";
              for (var i = 0; i < len; i++) result += String.fromCharCode(buf[i]);
              return result;
            }
            exports.buf2binstring = function(buf) {
              return buf2binstring(buf, buf.length);
            };
            exports.binstring2buf = function(str) {
              var buf = new utils.Buf8(str.length);
              for (var i = 0, len = buf.length; i < len; i++) buf[i] = str.charCodeAt(i);
              return buf;
            };
            exports.buf2string = function(buf, max) {
              var i, out, c, c_len;
              var len = max || buf.length;
              var utf16buf = new Array(2 * len);
              for (out = 0, i = 0; i < len; ) {
                c = buf[i++];
                if (c < 128) {
                  utf16buf[out++] = c;
                  continue;
                }
                c_len = _utf8len[c];
                if (c_len > 4) {
                  utf16buf[out++] = 65533;
                  i += c_len - 1;
                  continue;
                }
                c &= 2 === c_len ? 31 : 3 === c_len ? 15 : 7;
                while (c_len > 1 && i < len) {
                  c = c << 6 | 63 & buf[i++];
                  c_len--;
                }
                if (c_len > 1) {
                  utf16buf[out++] = 65533;
                  continue;
                }
                if (c < 65536) utf16buf[out++] = c; else {
                  c -= 65536;
                  utf16buf[out++] = 55296 | c >> 10 & 1023;
                  utf16buf[out++] = 56320 | 1023 & c;
                }
              }
              return buf2binstring(utf16buf, out);
            };
            exports.utf8border = function(buf, max) {
              var pos;
              max = max || buf.length;
              max > buf.length && (max = buf.length);
              pos = max - 1;
              while (pos >= 0 && 128 === (192 & buf[pos])) pos--;
              if (pos < 0) return max;
              if (0 === pos) return max;
              return pos + _utf8len[buf[pos]] > max ? pos : max;
            };
          }, {
            "./common": 41
          } ],
          43: [ function(require, module, exports) {
            function adler32(adler, buf, len, pos) {
              var s1 = 65535 & adler | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
              while (0 !== len) {
                n = len > 2e3 ? 2e3 : len;
                len -= n;
                do {
                  s1 = s1 + buf[pos++] | 0;
                  s2 = s2 + s1 | 0;
                } while (--n);
                s1 %= 65521;
                s2 %= 65521;
              }
              return s1 | s2 << 16 | 0;
            }
            module.exports = adler32;
          }, {} ],
          44: [ function(require, module, exports) {
            module.exports = {
              Z_NO_FLUSH: 0,
              Z_PARTIAL_FLUSH: 1,
              Z_SYNC_FLUSH: 2,
              Z_FULL_FLUSH: 3,
              Z_FINISH: 4,
              Z_BLOCK: 5,
              Z_TREES: 6,
              Z_OK: 0,
              Z_STREAM_END: 1,
              Z_NEED_DICT: 2,
              Z_ERRNO: -1,
              Z_STREAM_ERROR: -2,
              Z_DATA_ERROR: -3,
              Z_BUF_ERROR: -5,
              Z_NO_COMPRESSION: 0,
              Z_BEST_SPEED: 1,
              Z_BEST_COMPRESSION: 9,
              Z_DEFAULT_COMPRESSION: -1,
              Z_FILTERED: 1,
              Z_HUFFMAN_ONLY: 2,
              Z_RLE: 3,
              Z_FIXED: 4,
              Z_DEFAULT_STRATEGY: 0,
              Z_BINARY: 0,
              Z_TEXT: 1,
              Z_UNKNOWN: 2,
              Z_DEFLATED: 8
            };
          }, {} ],
          45: [ function(require, module, exports) {
            function makeTable() {
              var c, table = [];
              for (var n = 0; n < 256; n++) {
                c = n;
                for (var k = 0; k < 8; k++) c = 1 & c ? 3988292384 ^ c >>> 1 : c >>> 1;
                table[n] = c;
              }
              return table;
            }
            var crcTable = makeTable();
            function crc32(crc, buf, len, pos) {
              var t = crcTable, end = pos + len;
              crc ^= -1;
              for (var i = pos; i < end; i++) crc = crc >>> 8 ^ t[255 & (crc ^ buf[i])];
              return -1 ^ crc;
            }
            module.exports = crc32;
          }, {} ],
          46: [ function(require, module, exports) {
            var utils = require("../utils/common");
            var trees = require("./trees");
            var adler32 = require("./adler32");
            var crc32 = require("./crc32");
            var msg = require("./messages");
            var Z_NO_FLUSH = 0;
            var Z_PARTIAL_FLUSH = 1;
            var Z_FULL_FLUSH = 3;
            var Z_FINISH = 4;
            var Z_BLOCK = 5;
            var Z_OK = 0;
            var Z_STREAM_END = 1;
            var Z_STREAM_ERROR = -2;
            var Z_DATA_ERROR = -3;
            var Z_BUF_ERROR = -5;
            var Z_DEFAULT_COMPRESSION = -1;
            var Z_FILTERED = 1;
            var Z_HUFFMAN_ONLY = 2;
            var Z_RLE = 3;
            var Z_FIXED = 4;
            var Z_DEFAULT_STRATEGY = 0;
            var Z_UNKNOWN = 2;
            var Z_DEFLATED = 8;
            var MAX_MEM_LEVEL = 9;
            var MAX_WBITS = 15;
            var DEF_MEM_LEVEL = 8;
            var LENGTH_CODES = 29;
            var LITERALS = 256;
            var L_CODES = LITERALS + 1 + LENGTH_CODES;
            var D_CODES = 30;
            var BL_CODES = 19;
            var HEAP_SIZE = 2 * L_CODES + 1;
            var MAX_BITS = 15;
            var MIN_MATCH = 3;
            var MAX_MATCH = 258;
            var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
            var PRESET_DICT = 32;
            var INIT_STATE = 42;
            var EXTRA_STATE = 69;
            var NAME_STATE = 73;
            var COMMENT_STATE = 91;
            var HCRC_STATE = 103;
            var BUSY_STATE = 113;
            var FINISH_STATE = 666;
            var BS_NEED_MORE = 1;
            var BS_BLOCK_DONE = 2;
            var BS_FINISH_STARTED = 3;
            var BS_FINISH_DONE = 4;
            var OS_CODE = 3;
            function err(strm, errorCode) {
              strm.msg = msg[errorCode];
              return errorCode;
            }
            function rank(f) {
              return (f << 1) - (f > 4 ? 9 : 0);
            }
            function zero(buf) {
              var len = buf.length;
              while (--len >= 0) buf[len] = 0;
            }
            function flush_pending(strm) {
              var s = strm.state;
              var len = s.pending;
              len > strm.avail_out && (len = strm.avail_out);
              if (0 === len) return;
              utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
              strm.next_out += len;
              s.pending_out += len;
              strm.total_out += len;
              strm.avail_out -= len;
              s.pending -= len;
              0 === s.pending && (s.pending_out = 0);
            }
            function flush_block_only(s, last) {
              trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
              s.block_start = s.strstart;
              flush_pending(s.strm);
            }
            function put_byte(s, b) {
              s.pending_buf[s.pending++] = b;
            }
            function putShortMSB(s, b) {
              s.pending_buf[s.pending++] = b >>> 8 & 255;
              s.pending_buf[s.pending++] = 255 & b;
            }
            function read_buf(strm, buf, start, size) {
              var len = strm.avail_in;
              len > size && (len = size);
              if (0 === len) return 0;
              strm.avail_in -= len;
              utils.arraySet(buf, strm.input, strm.next_in, len, start);
              1 === strm.state.wrap ? strm.adler = adler32(strm.adler, buf, len, start) : 2 === strm.state.wrap && (strm.adler = crc32(strm.adler, buf, len, start));
              strm.next_in += len;
              strm.total_in += len;
              return len;
            }
            function longest_match(s, cur_match) {
              var chain_length = s.max_chain_length;
              var scan = s.strstart;
              var match;
              var len;
              var best_len = s.prev_length;
              var nice_match = s.nice_match;
              var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
              var _win = s.window;
              var wmask = s.w_mask;
              var prev = s.prev;
              var strend = s.strstart + MAX_MATCH;
              var scan_end1 = _win[scan + best_len - 1];
              var scan_end = _win[scan + best_len];
              s.prev_length >= s.good_match && (chain_length >>= 2);
              nice_match > s.lookahead && (nice_match = s.lookahead);
              do {
                match = cur_match;
                if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) continue;
                scan += 2;
                match++;
                do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
                len = MAX_MATCH - (strend - scan);
                scan = strend - MAX_MATCH;
                if (len > best_len) {
                  s.match_start = cur_match;
                  best_len = len;
                  if (len >= nice_match) break;
                  scan_end1 = _win[scan + best_len - 1];
                  scan_end = _win[scan + best_len];
                }
              } while ((cur_match = prev[cur_match & wmask]) > limit && 0 !== --chain_length);
              if (best_len <= s.lookahead) return best_len;
              return s.lookahead;
            }
            function fill_window(s) {
              var _w_size = s.w_size;
              var p, n, m, more, str;
              do {
                more = s.window_size - s.lookahead - s.strstart;
                if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
                  utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
                  s.match_start -= _w_size;
                  s.strstart -= _w_size;
                  s.block_start -= _w_size;
                  n = s.hash_size;
                  p = n;
                  do {
                    m = s.head[--p];
                    s.head[p] = m >= _w_size ? m - _w_size : 0;
                  } while (--n);
                  n = _w_size;
                  p = n;
                  do {
                    m = s.prev[--p];
                    s.prev[p] = m >= _w_size ? m - _w_size : 0;
                  } while (--n);
                  more += _w_size;
                }
                if (0 === s.strm.avail_in) break;
                n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
                s.lookahead += n;
                if (s.lookahead + s.insert >= MIN_MATCH) {
                  str = s.strstart - s.insert;
                  s.ins_h = s.window[str];
                  s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
                  while (s.insert) {
                    s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
                    s.prev[str & s.w_mask] = s.head[s.ins_h];
                    s.head[s.ins_h] = str;
                    str++;
                    s.insert--;
                    if (s.lookahead + s.insert < MIN_MATCH) break;
                  }
                }
              } while (s.lookahead < MIN_LOOKAHEAD && 0 !== s.strm.avail_in);
            }
            function deflate_stored(s, flush) {
              var max_block_size = 65535;
              max_block_size > s.pending_buf_size - 5 && (max_block_size = s.pending_buf_size - 5);
              for (;;) {
                if (s.lookahead <= 1) {
                  fill_window(s);
                  if (0 === s.lookahead && flush === Z_NO_FLUSH) return BS_NEED_MORE;
                  if (0 === s.lookahead) break;
                }
                s.strstart += s.lookahead;
                s.lookahead = 0;
                var max_start = s.block_start + max_block_size;
                if (0 === s.strstart || s.strstart >= max_start) {
                  s.lookahead = s.strstart - max_start;
                  s.strstart = max_start;
                  flush_block_only(s, false);
                  if (0 === s.strm.avail_out) return BS_NEED_MORE;
                }
                if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
                  flush_block_only(s, false);
                  if (0 === s.strm.avail_out) return BS_NEED_MORE;
                }
              }
              s.insert = 0;
              if (flush === Z_FINISH) {
                flush_block_only(s, true);
                if (0 === s.strm.avail_out) return BS_FINISH_STARTED;
                return BS_FINISH_DONE;
              }
              if (s.strstart > s.block_start) {
                flush_block_only(s, false);
                if (0 === s.strm.avail_out) return BS_NEED_MORE;
              }
              return BS_NEED_MORE;
            }
            function deflate_fast(s, flush) {
              var hash_head;
              var bflush;
              for (;;) {
                if (s.lookahead < MIN_LOOKAHEAD) {
                  fill_window(s);
                  if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) return BS_NEED_MORE;
                  if (0 === s.lookahead) break;
                }
                hash_head = 0;
                if (s.lookahead >= MIN_MATCH) {
                  s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                  hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                  s.head[s.ins_h] = s.strstart;
                }
                0 !== hash_head && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD && (s.match_length = longest_match(s, hash_head));
                if (s.match_length >= MIN_MATCH) {
                  bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
                  s.lookahead -= s.match_length;
                  if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
                    s.match_length--;
                    do {
                      s.strstart++;
                      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                      s.head[s.ins_h] = s.strstart;
                    } while (0 !== --s.match_length);
                    s.strstart++;
                  } else {
                    s.strstart += s.match_length;
                    s.match_length = 0;
                    s.ins_h = s.window[s.strstart];
                    s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
                  }
                } else {
                  bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                  s.lookahead--;
                  s.strstart++;
                }
                if (bflush) {
                  flush_block_only(s, false);
                  if (0 === s.strm.avail_out) return BS_NEED_MORE;
                }
              }
              s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
              if (flush === Z_FINISH) {
                flush_block_only(s, true);
                if (0 === s.strm.avail_out) return BS_FINISH_STARTED;
                return BS_FINISH_DONE;
              }
              if (s.last_lit) {
                flush_block_only(s, false);
                if (0 === s.strm.avail_out) return BS_NEED_MORE;
              }
              return BS_BLOCK_DONE;
            }
            function deflate_slow(s, flush) {
              var hash_head;
              var bflush;
              var max_insert;
              for (;;) {
                if (s.lookahead < MIN_LOOKAHEAD) {
                  fill_window(s);
                  if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) return BS_NEED_MORE;
                  if (0 === s.lookahead) break;
                }
                hash_head = 0;
                if (s.lookahead >= MIN_MATCH) {
                  s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                  hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                  s.head[s.ins_h] = s.strstart;
                }
                s.prev_length = s.match_length;
                s.prev_match = s.match_start;
                s.match_length = MIN_MATCH - 1;
                if (0 !== hash_head && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
                  s.match_length = longest_match(s, hash_head);
                  s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096) && (s.match_length = MIN_MATCH - 1);
                }
                if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
                  max_insert = s.strstart + s.lookahead - MIN_MATCH;
                  bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
                  s.lookahead -= s.prev_length - 1;
                  s.prev_length -= 2;
                  do {
                    if (++s.strstart <= max_insert) {
                      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                      s.head[s.ins_h] = s.strstart;
                    }
                  } while (0 !== --s.prev_length);
                  s.match_available = 0;
                  s.match_length = MIN_MATCH - 1;
                  s.strstart++;
                  if (bflush) {
                    flush_block_only(s, false);
                    if (0 === s.strm.avail_out) return BS_NEED_MORE;
                  }
                } else if (s.match_available) {
                  bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
                  bflush && flush_block_only(s, false);
                  s.strstart++;
                  s.lookahead--;
                  if (0 === s.strm.avail_out) return BS_NEED_MORE;
                } else {
                  s.match_available = 1;
                  s.strstart++;
                  s.lookahead--;
                }
              }
              if (s.match_available) {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
                s.match_available = 0;
              }
              s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
              if (flush === Z_FINISH) {
                flush_block_only(s, true);
                if (0 === s.strm.avail_out) return BS_FINISH_STARTED;
                return BS_FINISH_DONE;
              }
              if (s.last_lit) {
                flush_block_only(s, false);
                if (0 === s.strm.avail_out) return BS_NEED_MORE;
              }
              return BS_BLOCK_DONE;
            }
            function deflate_rle(s, flush) {
              var bflush;
              var prev;
              var scan, strend;
              var _win = s.window;
              for (;;) {
                if (s.lookahead <= MAX_MATCH) {
                  fill_window(s);
                  if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) return BS_NEED_MORE;
                  if (0 === s.lookahead) break;
                }
                s.match_length = 0;
                if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
                  scan = s.strstart - 1;
                  prev = _win[scan];
                  if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
                    strend = s.strstart + MAX_MATCH;
                    do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
                    s.match_length = MAX_MATCH - (strend - scan);
                    s.match_length > s.lookahead && (s.match_length = s.lookahead);
                  }
                }
                if (s.match_length >= MIN_MATCH) {
                  bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
                  s.lookahead -= s.match_length;
                  s.strstart += s.match_length;
                  s.match_length = 0;
                } else {
                  bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                  s.lookahead--;
                  s.strstart++;
                }
                if (bflush) {
                  flush_block_only(s, false);
                  if (0 === s.strm.avail_out) return BS_NEED_MORE;
                }
              }
              s.insert = 0;
              if (flush === Z_FINISH) {
                flush_block_only(s, true);
                if (0 === s.strm.avail_out) return BS_FINISH_STARTED;
                return BS_FINISH_DONE;
              }
              if (s.last_lit) {
                flush_block_only(s, false);
                if (0 === s.strm.avail_out) return BS_NEED_MORE;
              }
              return BS_BLOCK_DONE;
            }
            function deflate_huff(s, flush) {
              var bflush;
              for (;;) {
                if (0 === s.lookahead) {
                  fill_window(s);
                  if (0 === s.lookahead) {
                    if (flush === Z_NO_FLUSH) return BS_NEED_MORE;
                    break;
                  }
                }
                s.match_length = 0;
                bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                s.lookahead--;
                s.strstart++;
                if (bflush) {
                  flush_block_only(s, false);
                  if (0 === s.strm.avail_out) return BS_NEED_MORE;
                }
              }
              s.insert = 0;
              if (flush === Z_FINISH) {
                flush_block_only(s, true);
                if (0 === s.strm.avail_out) return BS_FINISH_STARTED;
                return BS_FINISH_DONE;
              }
              if (s.last_lit) {
                flush_block_only(s, false);
                if (0 === s.strm.avail_out) return BS_NEED_MORE;
              }
              return BS_BLOCK_DONE;
            }
            function Config(good_length, max_lazy, nice_length, max_chain, func) {
              this.good_length = good_length;
              this.max_lazy = max_lazy;
              this.nice_length = nice_length;
              this.max_chain = max_chain;
              this.func = func;
            }
            var configuration_table;
            configuration_table = [ new Config(0, 0, 0, 0, deflate_stored), new Config(4, 4, 8, 4, deflate_fast), new Config(4, 5, 16, 8, deflate_fast), new Config(4, 6, 32, 32, deflate_fast), new Config(4, 4, 16, 16, deflate_slow), new Config(8, 16, 32, 32, deflate_slow), new Config(8, 16, 128, 128, deflate_slow), new Config(8, 32, 128, 256, deflate_slow), new Config(32, 128, 258, 1024, deflate_slow), new Config(32, 258, 258, 4096, deflate_slow) ];
            function lm_init(s) {
              s.window_size = 2 * s.w_size;
              zero(s.head);
              s.max_lazy_match = configuration_table[s.level].max_lazy;
              s.good_match = configuration_table[s.level].good_length;
              s.nice_match = configuration_table[s.level].nice_length;
              s.max_chain_length = configuration_table[s.level].max_chain;
              s.strstart = 0;
              s.block_start = 0;
              s.lookahead = 0;
              s.insert = 0;
              s.match_length = s.prev_length = MIN_MATCH - 1;
              s.match_available = 0;
              s.ins_h = 0;
            }
            function DeflateState() {
              this.strm = null;
              this.status = 0;
              this.pending_buf = null;
              this.pending_buf_size = 0;
              this.pending_out = 0;
              this.pending = 0;
              this.wrap = 0;
              this.gzhead = null;
              this.gzindex = 0;
              this.method = Z_DEFLATED;
              this.last_flush = -1;
              this.w_size = 0;
              this.w_bits = 0;
              this.w_mask = 0;
              this.window = null;
              this.window_size = 0;
              this.prev = null;
              this.head = null;
              this.ins_h = 0;
              this.hash_size = 0;
              this.hash_bits = 0;
              this.hash_mask = 0;
              this.hash_shift = 0;
              this.block_start = 0;
              this.match_length = 0;
              this.prev_match = 0;
              this.match_available = 0;
              this.strstart = 0;
              this.match_start = 0;
              this.lookahead = 0;
              this.prev_length = 0;
              this.max_chain_length = 0;
              this.max_lazy_match = 0;
              this.level = 0;
              this.strategy = 0;
              this.good_match = 0;
              this.nice_match = 0;
              this.dyn_ltree = new utils.Buf16(2 * HEAP_SIZE);
              this.dyn_dtree = new utils.Buf16(2 * (2 * D_CODES + 1));
              this.bl_tree = new utils.Buf16(2 * (2 * BL_CODES + 1));
              zero(this.dyn_ltree);
              zero(this.dyn_dtree);
              zero(this.bl_tree);
              this.l_desc = null;
              this.d_desc = null;
              this.bl_desc = null;
              this.bl_count = new utils.Buf16(MAX_BITS + 1);
              this.heap = new utils.Buf16(2 * L_CODES + 1);
              zero(this.heap);
              this.heap_len = 0;
              this.heap_max = 0;
              this.depth = new utils.Buf16(2 * L_CODES + 1);
              zero(this.depth);
              this.l_buf = 0;
              this.lit_bufsize = 0;
              this.last_lit = 0;
              this.d_buf = 0;
              this.opt_len = 0;
              this.static_len = 0;
              this.matches = 0;
              this.insert = 0;
              this.bi_buf = 0;
              this.bi_valid = 0;
            }
            function deflateResetKeep(strm) {
              var s;
              if (!strm || !strm.state) return err(strm, Z_STREAM_ERROR);
              strm.total_in = strm.total_out = 0;
              strm.data_type = Z_UNKNOWN;
              s = strm.state;
              s.pending = 0;
              s.pending_out = 0;
              s.wrap < 0 && (s.wrap = -s.wrap);
              s.status = s.wrap ? INIT_STATE : BUSY_STATE;
              strm.adler = 2 === s.wrap ? 0 : 1;
              s.last_flush = Z_NO_FLUSH;
              trees._tr_init(s);
              return Z_OK;
            }
            function deflateReset(strm) {
              var ret = deflateResetKeep(strm);
              ret === Z_OK && lm_init(strm.state);
              return ret;
            }
            function deflateSetHeader(strm, head) {
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              if (2 !== strm.state.wrap) return Z_STREAM_ERROR;
              strm.state.gzhead = head;
              return Z_OK;
            }
            function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
              if (!strm) return Z_STREAM_ERROR;
              var wrap = 1;
              level === Z_DEFAULT_COMPRESSION && (level = 6);
              if (windowBits < 0) {
                wrap = 0;
                windowBits = -windowBits;
              } else if (windowBits > 15) {
                wrap = 2;
                windowBits -= 16;
              }
              if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) return err(strm, Z_STREAM_ERROR);
              8 === windowBits && (windowBits = 9);
              var s = new DeflateState();
              strm.state = s;
              s.strm = strm;
              s.wrap = wrap;
              s.gzhead = null;
              s.w_bits = windowBits;
              s.w_size = 1 << s.w_bits;
              s.w_mask = s.w_size - 1;
              s.hash_bits = memLevel + 7;
              s.hash_size = 1 << s.hash_bits;
              s.hash_mask = s.hash_size - 1;
              s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
              s.window = new utils.Buf8(2 * s.w_size);
              s.head = new utils.Buf16(s.hash_size);
              s.prev = new utils.Buf16(s.w_size);
              s.lit_bufsize = 1 << memLevel + 6;
              s.pending_buf_size = 4 * s.lit_bufsize;
              s.pending_buf = new utils.Buf8(s.pending_buf_size);
              s.d_buf = 1 * s.lit_bufsize;
              s.l_buf = 3 * s.lit_bufsize;
              s.level = level;
              s.strategy = strategy;
              s.method = method;
              return deflateReset(strm);
            }
            function deflateInit(strm, level) {
              return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
            }
            function deflate(strm, flush) {
              var old_flush, s;
              var beg, val;
              if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
              s = strm.state;
              if (!strm.output || !strm.input && 0 !== strm.avail_in || s.status === FINISH_STATE && flush !== Z_FINISH) return err(strm, 0 === strm.avail_out ? Z_BUF_ERROR : Z_STREAM_ERROR);
              s.strm = strm;
              old_flush = s.last_flush;
              s.last_flush = flush;
              if (s.status === INIT_STATE) if (2 === s.wrap) {
                strm.adler = 0;
                put_byte(s, 31);
                put_byte(s, 139);
                put_byte(s, 8);
                if (s.gzhead) {
                  put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0));
                  put_byte(s, 255 & s.gzhead.time);
                  put_byte(s, s.gzhead.time >> 8 & 255);
                  put_byte(s, s.gzhead.time >> 16 & 255);
                  put_byte(s, s.gzhead.time >> 24 & 255);
                  put_byte(s, 9 === s.level ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
                  put_byte(s, 255 & s.gzhead.os);
                  if (s.gzhead.extra && s.gzhead.extra.length) {
                    put_byte(s, 255 & s.gzhead.extra.length);
                    put_byte(s, s.gzhead.extra.length >> 8 & 255);
                  }
                  s.gzhead.hcrc && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0));
                  s.gzindex = 0;
                  s.status = EXTRA_STATE;
                } else {
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 9 === s.level ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
                  put_byte(s, OS_CODE);
                  s.status = BUSY_STATE;
                }
              } else {
                var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
                var level_flags = -1;
                level_flags = s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 0 : s.level < 6 ? 1 : 6 === s.level ? 2 : 3;
                header |= level_flags << 6;
                0 !== s.strstart && (header |= PRESET_DICT);
                header += 31 - header % 31;
                s.status = BUSY_STATE;
                putShortMSB(s, header);
                if (0 !== s.strstart) {
                  putShortMSB(s, strm.adler >>> 16);
                  putShortMSB(s, 65535 & strm.adler);
                }
                strm.adler = 1;
              }
              if (s.status === EXTRA_STATE) if (s.gzhead.extra) {
                beg = s.pending;
                while (s.gzindex < (65535 & s.gzhead.extra.length)) {
                  if (s.pending === s.pending_buf_size) {
                    s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg));
                    flush_pending(strm);
                    beg = s.pending;
                    if (s.pending === s.pending_buf_size) break;
                  }
                  put_byte(s, 255 & s.gzhead.extra[s.gzindex]);
                  s.gzindex++;
                }
                s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg));
                if (s.gzindex === s.gzhead.extra.length) {
                  s.gzindex = 0;
                  s.status = NAME_STATE;
                }
              } else s.status = NAME_STATE;
              if (s.status === NAME_STATE) if (s.gzhead.name) {
                beg = s.pending;
                do {
                  if (s.pending === s.pending_buf_size) {
                    s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg));
                    flush_pending(strm);
                    beg = s.pending;
                    if (s.pending === s.pending_buf_size) {
                      val = 1;
                      break;
                    }
                  }
                  val = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0;
                  put_byte(s, val);
                } while (0 !== val);
                s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg));
                if (0 === val) {
                  s.gzindex = 0;
                  s.status = COMMENT_STATE;
                }
              } else s.status = COMMENT_STATE;
              if (s.status === COMMENT_STATE) if (s.gzhead.comment) {
                beg = s.pending;
                do {
                  if (s.pending === s.pending_buf_size) {
                    s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg));
                    flush_pending(strm);
                    beg = s.pending;
                    if (s.pending === s.pending_buf_size) {
                      val = 1;
                      break;
                    }
                  }
                  val = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0;
                  put_byte(s, val);
                } while (0 !== val);
                s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg));
                0 === val && (s.status = HCRC_STATE);
              } else s.status = HCRC_STATE;
              if (s.status === HCRC_STATE) if (s.gzhead.hcrc) {
                s.pending + 2 > s.pending_buf_size && flush_pending(strm);
                if (s.pending + 2 <= s.pending_buf_size) {
                  put_byte(s, 255 & strm.adler);
                  put_byte(s, strm.adler >> 8 & 255);
                  strm.adler = 0;
                  s.status = BUSY_STATE;
                }
              } else s.status = BUSY_STATE;
              if (0 !== s.pending) {
                flush_pending(strm);
                if (0 === strm.avail_out) {
                  s.last_flush = -1;
                  return Z_OK;
                }
              } else if (0 === strm.avail_in && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) return err(strm, Z_BUF_ERROR);
              if (s.status === FINISH_STATE && 0 !== strm.avail_in) return err(strm, Z_BUF_ERROR);
              if (0 !== strm.avail_in || 0 !== s.lookahead || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
                var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
                bstate !== BS_FINISH_STARTED && bstate !== BS_FINISH_DONE || (s.status = FINISH_STATE);
                if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
                  0 === strm.avail_out && (s.last_flush = -1);
                  return Z_OK;
                }
                if (bstate === BS_BLOCK_DONE) {
                  if (flush === Z_PARTIAL_FLUSH) trees._tr_align(s); else if (flush !== Z_BLOCK) {
                    trees._tr_stored_block(s, 0, 0, false);
                    if (flush === Z_FULL_FLUSH) {
                      zero(s.head);
                      if (0 === s.lookahead) {
                        s.strstart = 0;
                        s.block_start = 0;
                        s.insert = 0;
                      }
                    }
                  }
                  flush_pending(strm);
                  if (0 === strm.avail_out) {
                    s.last_flush = -1;
                    return Z_OK;
                  }
                }
              }
              if (flush !== Z_FINISH) return Z_OK;
              if (s.wrap <= 0) return Z_STREAM_END;
              if (2 === s.wrap) {
                put_byte(s, 255 & strm.adler);
                put_byte(s, strm.adler >> 8 & 255);
                put_byte(s, strm.adler >> 16 & 255);
                put_byte(s, strm.adler >> 24 & 255);
                put_byte(s, 255 & strm.total_in);
                put_byte(s, strm.total_in >> 8 & 255);
                put_byte(s, strm.total_in >> 16 & 255);
                put_byte(s, strm.total_in >> 24 & 255);
              } else {
                putShortMSB(s, strm.adler >>> 16);
                putShortMSB(s, 65535 & strm.adler);
              }
              flush_pending(strm);
              s.wrap > 0 && (s.wrap = -s.wrap);
              return 0 !== s.pending ? Z_OK : Z_STREAM_END;
            }
            function deflateEnd(strm) {
              var status;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              status = strm.state.status;
              if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) return err(strm, Z_STREAM_ERROR);
              strm.state = null;
              return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
            }
            function deflateSetDictionary(strm, dictionary) {
              var dictLength = dictionary.length;
              var s;
              var str, n;
              var wrap;
              var avail;
              var next;
              var input;
              var tmpDict;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              s = strm.state;
              wrap = s.wrap;
              if (2 === wrap || 1 === wrap && s.status !== INIT_STATE || s.lookahead) return Z_STREAM_ERROR;
              1 === wrap && (strm.adler = adler32(strm.adler, dictionary, dictLength, 0));
              s.wrap = 0;
              if (dictLength >= s.w_size) {
                if (0 === wrap) {
                  zero(s.head);
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
                tmpDict = new utils.Buf8(s.w_size);
                utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
                dictionary = tmpDict;
                dictLength = s.w_size;
              }
              avail = strm.avail_in;
              next = strm.next_in;
              input = strm.input;
              strm.avail_in = dictLength;
              strm.next_in = 0;
              strm.input = dictionary;
              fill_window(s);
              while (s.lookahead >= MIN_MATCH) {
                str = s.strstart;
                n = s.lookahead - (MIN_MATCH - 1);
                do {
                  s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
                  s.prev[str & s.w_mask] = s.head[s.ins_h];
                  s.head[s.ins_h] = str;
                  str++;
                } while (--n);
                s.strstart = str;
                s.lookahead = MIN_MATCH - 1;
                fill_window(s);
              }
              s.strstart += s.lookahead;
              s.block_start = s.strstart;
              s.insert = s.lookahead;
              s.lookahead = 0;
              s.match_length = s.prev_length = MIN_MATCH - 1;
              s.match_available = 0;
              strm.next_in = next;
              strm.input = input;
              strm.avail_in = avail;
              s.wrap = wrap;
              return Z_OK;
            }
            exports.deflateInit = deflateInit;
            exports.deflateInit2 = deflateInit2;
            exports.deflateReset = deflateReset;
            exports.deflateResetKeep = deflateResetKeep;
            exports.deflateSetHeader = deflateSetHeader;
            exports.deflate = deflate;
            exports.deflateEnd = deflateEnd;
            exports.deflateSetDictionary = deflateSetDictionary;
            exports.deflateInfo = "pako deflate (from Nodeca project)";
          }, {
            "../utils/common": 41,
            "./adler32": 43,
            "./crc32": 45,
            "./messages": 51,
            "./trees": 52
          } ],
          47: [ function(require, module, exports) {
            function GZheader() {
              this.text = 0;
              this.time = 0;
              this.xflags = 0;
              this.os = 0;
              this.extra = null;
              this.extra_len = 0;
              this.name = "";
              this.comment = "";
              this.hcrc = 0;
              this.done = false;
            }
            module.exports = GZheader;
          }, {} ],
          48: [ function(require, module, exports) {
            var BAD = 30;
            var TYPE = 12;
            module.exports = function inflate_fast(strm, start) {
              var state;
              var _in;
              var last;
              var _out;
              var beg;
              var end;
              var dmax;
              var wsize;
              var whave;
              var wnext;
              var s_window;
              var hold;
              var bits;
              var lcode;
              var dcode;
              var lmask;
              var dmask;
              var here;
              var op;
              var len;
              var dist;
              var from;
              var from_source;
              var input, output;
              state = strm.state;
              _in = strm.next_in;
              input = strm.input;
              last = _in + (strm.avail_in - 5);
              _out = strm.next_out;
              output = strm.output;
              beg = _out - (start - strm.avail_out);
              end = _out + (strm.avail_out - 257);
              dmax = state.dmax;
              wsize = state.wsize;
              whave = state.whave;
              wnext = state.wnext;
              s_window = state.window;
              hold = state.hold;
              bits = state.bits;
              lcode = state.lencode;
              dcode = state.distcode;
              lmask = (1 << state.lenbits) - 1;
              dmask = (1 << state.distbits) - 1;
              top: do {
                if (bits < 15) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                here = lcode[hold & lmask];
                dolen: for (;;) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (0 === op) output[_out++] = 65535 & here; else {
                    if (!(16 & op)) {
                      if (0 === (64 & op)) {
                        here = lcode[(65535 & here) + (hold & (1 << op) - 1)];
                        continue dolen;
                      }
                      if (32 & op) {
                        state.mode = TYPE;
                        break top;
                      }
                      strm.msg = "invalid literal/length code";
                      state.mode = BAD;
                      break top;
                    }
                    len = 65535 & here;
                    op &= 15;
                    if (op) {
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                      len += hold & (1 << op) - 1;
                      hold >>>= op;
                      bits -= op;
                    }
                    if (bits < 15) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                    here = dcode[hold & dmask];
                    dodist: for (;;) {
                      op = here >>> 24;
                      hold >>>= op;
                      bits -= op;
                      op = here >>> 16 & 255;
                      if (!(16 & op)) {
                        if (0 === (64 & op)) {
                          here = dcode[(65535 & here) + (hold & (1 << op) - 1)];
                          continue dodist;
                        }
                        strm.msg = "invalid distance code";
                        state.mode = BAD;
                        break top;
                      }
                      dist = 65535 & here;
                      op &= 15;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                        }
                      }
                      dist += hold & (1 << op) - 1;
                      if (dist > dmax) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break top;
                      }
                      hold >>>= op;
                      bits -= op;
                      op = _out - beg;
                      if (dist > op) {
                        op = dist - op;
                        if (op > whave && state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD;
                          break top;
                        }
                        from = 0;
                        from_source = s_window;
                        if (0 === wnext) {
                          from += wsize - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        } else if (wnext < op) {
                          from += wsize + wnext - op;
                          op -= wnext;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = 0;
                            if (wnext < len) {
                              op = wnext;
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                        } else {
                          from += wnext - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                        while (len > 2) {
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          len -= 3;
                        }
                        if (len) {
                          output[_out++] = from_source[from++];
                          len > 1 && (output[_out++] = from_source[from++]);
                        }
                      } else {
                        from = _out - dist;
                        do {
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          len -= 3;
                        } while (len > 2);
                        if (len) {
                          output[_out++] = output[from++];
                          len > 1 && (output[_out++] = output[from++]);
                        }
                      }
                      break;
                    }
                  }
                  break;
                }
              } while (_in < last && _out < end);
              len = bits >> 3;
              _in -= len;
              bits -= len << 3;
              hold &= (1 << bits) - 1;
              strm.next_in = _in;
              strm.next_out = _out;
              strm.avail_in = _in < last ? last - _in + 5 : 5 - (_in - last);
              strm.avail_out = _out < end ? end - _out + 257 : 257 - (_out - end);
              state.hold = hold;
              state.bits = bits;
              return;
            };
          }, {} ],
          49: [ function(require, module, exports) {
            var utils = require("../utils/common");
            var adler32 = require("./adler32");
            var crc32 = require("./crc32");
            var inflate_fast = require("./inffast");
            var inflate_table = require("./inftrees");
            var CODES = 0;
            var LENS = 1;
            var DISTS = 2;
            var Z_FINISH = 4;
            var Z_BLOCK = 5;
            var Z_TREES = 6;
            var Z_OK = 0;
            var Z_STREAM_END = 1;
            var Z_NEED_DICT = 2;
            var Z_STREAM_ERROR = -2;
            var Z_DATA_ERROR = -3;
            var Z_MEM_ERROR = -4;
            var Z_BUF_ERROR = -5;
            var Z_DEFLATED = 8;
            var HEAD = 1;
            var FLAGS = 2;
            var TIME = 3;
            var OS = 4;
            var EXLEN = 5;
            var EXTRA = 6;
            var NAME = 7;
            var COMMENT = 8;
            var HCRC = 9;
            var DICTID = 10;
            var DICT = 11;
            var TYPE = 12;
            var TYPEDO = 13;
            var STORED = 14;
            var COPY_ = 15;
            var COPY = 16;
            var TABLE = 17;
            var LENLENS = 18;
            var CODELENS = 19;
            var LEN_ = 20;
            var LEN = 21;
            var LENEXT = 22;
            var DIST = 23;
            var DISTEXT = 24;
            var MATCH = 25;
            var LIT = 26;
            var CHECK = 27;
            var LENGTH = 28;
            var DONE = 29;
            var BAD = 30;
            var MEM = 31;
            var SYNC = 32;
            var ENOUGH_LENS = 852;
            var ENOUGH_DISTS = 592;
            var MAX_WBITS = 15;
            var DEF_WBITS = MAX_WBITS;
            function zswap32(q) {
              return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((65280 & q) << 8) + ((255 & q) << 24);
            }
            function InflateState() {
              this.mode = 0;
              this.last = false;
              this.wrap = 0;
              this.havedict = false;
              this.flags = 0;
              this.dmax = 0;
              this.check = 0;
              this.total = 0;
              this.head = null;
              this.wbits = 0;
              this.wsize = 0;
              this.whave = 0;
              this.wnext = 0;
              this.window = null;
              this.hold = 0;
              this.bits = 0;
              this.length = 0;
              this.offset = 0;
              this.extra = 0;
              this.lencode = null;
              this.distcode = null;
              this.lenbits = 0;
              this.distbits = 0;
              this.ncode = 0;
              this.nlen = 0;
              this.ndist = 0;
              this.have = 0;
              this.next = null;
              this.lens = new utils.Buf16(320);
              this.work = new utils.Buf16(288);
              this.lendyn = null;
              this.distdyn = null;
              this.sane = 0;
              this.back = 0;
              this.was = 0;
            }
            function inflateResetKeep(strm) {
              var state;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              state = strm.state;
              strm.total_in = strm.total_out = state.total = 0;
              strm.msg = "";
              state.wrap && (strm.adler = 1 & state.wrap);
              state.mode = HEAD;
              state.last = 0;
              state.havedict = 0;
              state.dmax = 32768;
              state.head = null;
              state.hold = 0;
              state.bits = 0;
              state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
              state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
              state.sane = 1;
              state.back = -1;
              return Z_OK;
            }
            function inflateReset(strm) {
              var state;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              state = strm.state;
              state.wsize = 0;
              state.whave = 0;
              state.wnext = 0;
              return inflateResetKeep(strm);
            }
            function inflateReset2(strm, windowBits) {
              var wrap;
              var state;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              state = strm.state;
              if (windowBits < 0) {
                wrap = 0;
                windowBits = -windowBits;
              } else {
                wrap = 1 + (windowBits >> 4);
                windowBits < 48 && (windowBits &= 15);
              }
              if (windowBits && (windowBits < 8 || windowBits > 15)) return Z_STREAM_ERROR;
              null !== state.window && state.wbits !== windowBits && (state.window = null);
              state.wrap = wrap;
              state.wbits = windowBits;
              return inflateReset(strm);
            }
            function inflateInit2(strm, windowBits) {
              var ret;
              var state;
              if (!strm) return Z_STREAM_ERROR;
              state = new InflateState();
              strm.state = state;
              state.window = null;
              ret = inflateReset2(strm, windowBits);
              ret !== Z_OK && (strm.state = null);
              return ret;
            }
            function inflateInit(strm) {
              return inflateInit2(strm, DEF_WBITS);
            }
            var virgin = true;
            var lenfix, distfix;
            function fixedtables(state) {
              if (virgin) {
                var sym;
                lenfix = new utils.Buf32(512);
                distfix = new utils.Buf32(32);
                sym = 0;
                while (sym < 144) state.lens[sym++] = 8;
                while (sym < 256) state.lens[sym++] = 9;
                while (sym < 280) state.lens[sym++] = 7;
                while (sym < 288) state.lens[sym++] = 8;
                inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
                  bits: 9
                });
                sym = 0;
                while (sym < 32) state.lens[sym++] = 5;
                inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
                  bits: 5
                });
                virgin = false;
              }
              state.lencode = lenfix;
              state.lenbits = 9;
              state.distcode = distfix;
              state.distbits = 5;
            }
            function updatewindow(strm, src, end, copy) {
              var dist;
              var state = strm.state;
              if (null === state.window) {
                state.wsize = 1 << state.wbits;
                state.wnext = 0;
                state.whave = 0;
                state.window = new utils.Buf8(state.wsize);
              }
              if (copy >= state.wsize) {
                utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
                state.wnext = 0;
                state.whave = state.wsize;
              } else {
                dist = state.wsize - state.wnext;
                dist > copy && (dist = copy);
                utils.arraySet(state.window, src, end - copy, dist, state.wnext);
                copy -= dist;
                if (copy) {
                  utils.arraySet(state.window, src, end - copy, copy, 0);
                  state.wnext = copy;
                  state.whave = state.wsize;
                } else {
                  state.wnext += dist;
                  state.wnext === state.wsize && (state.wnext = 0);
                  state.whave < state.wsize && (state.whave += dist);
                }
              }
              return 0;
            }
            function inflate(strm, flush) {
              var state;
              var input, output;
              var next;
              var put;
              var have, left;
              var hold;
              var bits;
              var _in, _out;
              var copy;
              var from;
              var from_source;
              var here = 0;
              var here_bits, here_op, here_val;
              var last_bits, last_op, last_val;
              var len;
              var ret;
              var hbuf = new utils.Buf8(4);
              var opts;
              var n;
              var order = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];
              if (!strm || !strm.state || !strm.output || !strm.input && 0 !== strm.avail_in) return Z_STREAM_ERROR;
              state = strm.state;
              state.mode === TYPE && (state.mode = TYPEDO);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              _in = have;
              _out = left;
              ret = Z_OK;
              inf_leave: for (;;) switch (state.mode) {
               case HEAD:
                if (0 === state.wrap) {
                  state.mode = TYPEDO;
                  break;
                }
                while (bits < 16) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (2 & state.wrap && 35615 === hold) {
                  state.check = 0;
                  hbuf[0] = 255 & hold;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32(state.check, hbuf, 2, 0);
                  hold = 0;
                  bits = 0;
                  state.mode = FLAGS;
                  break;
                }
                state.flags = 0;
                state.head && (state.head.done = false);
                if (!(1 & state.wrap) || (((255 & hold) << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check";
                  state.mode = BAD;
                  break;
                }
                if ((15 & hold) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                hold >>>= 4;
                bits -= 4;
                len = 8 + (15 & hold);
                if (0 === state.wbits) state.wbits = len; else if (len > state.wbits) {
                  strm.msg = "invalid window size";
                  state.mode = BAD;
                  break;
                }
                state.dmax = 1 << len;
                strm.adler = state.check = 1;
                state.mode = 512 & hold ? DICTID : TYPE;
                hold = 0;
                bits = 0;
                break;

               case FLAGS:
                while (bits < 16) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.flags = hold;
                if ((255 & state.flags) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                if (57344 & state.flags) {
                  strm.msg = "unknown header flags set";
                  state.mode = BAD;
                  break;
                }
                state.head && (state.head.text = hold >> 8 & 1);
                if (512 & state.flags) {
                  hbuf[0] = 255 & hold;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = TIME;

               case TIME:
                while (bits < 32) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.head && (state.head.time = hold);
                if (512 & state.flags) {
                  hbuf[0] = 255 & hold;
                  hbuf[1] = hold >>> 8 & 255;
                  hbuf[2] = hold >>> 16 & 255;
                  hbuf[3] = hold >>> 24 & 255;
                  state.check = crc32(state.check, hbuf, 4, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = OS;

               case OS:
                while (bits < 16) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.xflags = 255 & hold;
                  state.head.os = hold >> 8;
                }
                if (512 & state.flags) {
                  hbuf[0] = 255 & hold;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = EXLEN;

               case EXLEN:
                if (1024 & state.flags) {
                  while (bits < 16) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length = hold;
                  state.head && (state.head.extra_len = hold);
                  if (512 & state.flags) {
                    hbuf[0] = 255 & hold;
                    hbuf[1] = hold >>> 8 & 255;
                    state.check = crc32(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                } else state.head && (state.head.extra = null);
                state.mode = EXTRA;

               case EXTRA:
                if (1024 & state.flags) {
                  copy = state.length;
                  copy > have && (copy = have);
                  if (copy) {
                    if (state.head) {
                      len = state.head.extra_len - state.length;
                      state.head.extra || (state.head.extra = new Array(state.head.extra_len));
                      utils.arraySet(state.head.extra, input, next, copy, len);
                    }
                    512 & state.flags && (state.check = crc32(state.check, input, copy, next));
                    have -= copy;
                    next += copy;
                    state.length -= copy;
                  }
                  if (state.length) break inf_leave;
                }
                state.length = 0;
                state.mode = NAME;

               case NAME:
                if (2048 & state.flags) {
                  if (0 === have) break inf_leave;
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    state.head && len && state.length < 65536 && (state.head.name += String.fromCharCode(len));
                  } while (len && copy < have);
                  512 & state.flags && (state.check = crc32(state.check, input, copy, next));
                  have -= copy;
                  next += copy;
                  if (len) break inf_leave;
                } else state.head && (state.head.name = null);
                state.length = 0;
                state.mode = COMMENT;

               case COMMENT:
                if (4096 & state.flags) {
                  if (0 === have) break inf_leave;
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    state.head && len && state.length < 65536 && (state.head.comment += String.fromCharCode(len));
                  } while (len && copy < have);
                  512 & state.flags && (state.check = crc32(state.check, input, copy, next));
                  have -= copy;
                  next += copy;
                  if (len) break inf_leave;
                } else state.head && (state.head.comment = null);
                state.mode = HCRC;

               case HCRC:
                if (512 & state.flags) {
                  while (bits < 16) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (hold !== (65535 & state.check)) {
                    strm.msg = "header crc mismatch";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                if (state.head) {
                  state.head.hcrc = state.flags >> 9 & 1;
                  state.head.done = true;
                }
                strm.adler = state.check = 0;
                state.mode = TYPE;
                break;

               case DICTID:
                while (bits < 32) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                strm.adler = state.check = zswap32(hold);
                hold = 0;
                bits = 0;
                state.mode = DICT;

               case DICT:
                if (0 === state.havedict) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  return Z_NEED_DICT;
                }
                strm.adler = state.check = 1;
                state.mode = TYPE;

               case TYPE:
                if (flush === Z_BLOCK || flush === Z_TREES) break inf_leave;

               case TYPEDO:
                if (state.last) {
                  hold >>>= 7 & bits;
                  bits -= 7 & bits;
                  state.mode = CHECK;
                  break;
                }
                while (bits < 3) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.last = 1 & hold;
                hold >>>= 1;
                bits -= 1;
                switch (3 & hold) {
                 case 0:
                  state.mode = STORED;
                  break;

                 case 1:
                  fixedtables(state);
                  state.mode = LEN_;
                  if (flush === Z_TREES) {
                    hold >>>= 2;
                    bits -= 2;
                    break inf_leave;
                  }
                  break;

                 case 2:
                  state.mode = TABLE;
                  break;

                 case 3:
                  strm.msg = "invalid block type";
                  state.mode = BAD;
                }
                hold >>>= 2;
                bits -= 2;
                break;

               case STORED:
                hold >>>= 7 & bits;
                bits -= 7 & bits;
                while (bits < 32) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((65535 & hold) !== (hold >>> 16 ^ 65535)) {
                  strm.msg = "invalid stored block lengths";
                  state.mode = BAD;
                  break;
                }
                state.length = 65535 & hold;
                hold = 0;
                bits = 0;
                state.mode = COPY_;
                if (flush === Z_TREES) break inf_leave;

               case COPY_:
                state.mode = COPY;

               case COPY:
                copy = state.length;
                if (copy) {
                  copy > have && (copy = have);
                  copy > left && (copy = left);
                  if (0 === copy) break inf_leave;
                  utils.arraySet(output, input, next, copy, put);
                  have -= copy;
                  next += copy;
                  left -= copy;
                  put += copy;
                  state.length -= copy;
                  break;
                }
                state.mode = TYPE;
                break;

               case TABLE:
                while (bits < 14) {
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.nlen = 257 + (31 & hold);
                hold >>>= 5;
                bits -= 5;
                state.ndist = 1 + (31 & hold);
                hold >>>= 5;
                bits -= 5;
                state.ncode = 4 + (15 & hold);
                hold >>>= 4;
                bits -= 4;
                if (state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = LENLENS;

               case LENLENS:
                while (state.have < state.ncode) {
                  while (bits < 3) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.lens[order[state.have++]] = 7 & hold;
                  hold >>>= 3;
                  bits -= 3;
                }
                while (state.have < 19) state.lens[order[state.have++]] = 0;
                state.lencode = state.lendyn;
                state.lenbits = 7;
                opts = {
                  bits: state.lenbits
                };
                ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid code lengths set";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = CODELENS;

               case CODELENS:
                while (state.have < state.nlen + state.ndist) {
                  for (;;) {
                    here = state.lencode[hold & (1 << state.lenbits) - 1];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = 65535 & here;
                    if (here_bits <= bits) break;
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (here_val < 16) {
                    hold >>>= here_bits;
                    bits -= here_bits;
                    state.lens[state.have++] = here_val;
                  } else {
                    if (16 === here_val) {
                      n = here_bits + 2;
                      while (bits < n) {
                        if (0 === have) break inf_leave;
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      if (0 === state.have) {
                        strm.msg = "invalid bit length repeat";
                        state.mode = BAD;
                        break;
                      }
                      len = state.lens[state.have - 1];
                      copy = 3 + (3 & hold);
                      hold >>>= 2;
                      bits -= 2;
                    } else if (17 === here_val) {
                      n = here_bits + 3;
                      while (bits < n) {
                        if (0 === have) break inf_leave;
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 3 + (7 & hold);
                      hold >>>= 3;
                      bits -= 3;
                    } else {
                      n = here_bits + 7;
                      while (bits < n) {
                        if (0 === have) break inf_leave;
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 11 + (127 & hold);
                      hold >>>= 7;
                      bits -= 7;
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD;
                      break;
                    }
                    while (copy--) state.lens[state.have++] = len;
                  }
                }
                if (state.mode === BAD) break;
                if (0 === state.lens[256]) {
                  strm.msg = "invalid code -- missing end-of-block";
                  state.mode = BAD;
                  break;
                }
                state.lenbits = 9;
                opts = {
                  bits: state.lenbits
                };
                ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid literal/lengths set";
                  state.mode = BAD;
                  break;
                }
                state.distbits = 6;
                state.distcode = state.distdyn;
                opts = {
                  bits: state.distbits
                };
                ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                state.distbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid distances set";
                  state.mode = BAD;
                  break;
                }
                state.mode = LEN_;
                if (flush === Z_TREES) break inf_leave;

               case LEN_:
                state.mode = LEN;

               case LEN:
                if (have >= 6 && left >= 258) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  inflate_fast(strm, _out);
                  put = strm.next_out;
                  output = strm.output;
                  left = strm.avail_out;
                  next = strm.next_in;
                  input = strm.input;
                  have = strm.avail_in;
                  hold = state.hold;
                  bits = state.bits;
                  state.mode === TYPE && (state.back = -1);
                  break;
                }
                state.back = 0;
                for (;;) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = 65535 & here;
                  if (here_bits <= bits) break;
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_op && 0 === (240 & here_op)) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (;;) {
                    here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = 65535 & here;
                    if (last_bits + here_bits <= bits) break;
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                state.length = here_val;
                if (0 === here_op) {
                  state.mode = LIT;
                  break;
                }
                if (32 & here_op) {
                  state.back = -1;
                  state.mode = TYPE;
                  break;
                }
                if (64 & here_op) {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break;
                }
                state.extra = 15 & here_op;
                state.mode = LENEXT;

               case LENEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                state.was = state.length;
                state.mode = DIST;

               case DIST:
                for (;;) {
                  here = state.distcode[hold & (1 << state.distbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = 65535 & here;
                  if (here_bits <= bits) break;
                  if (0 === have) break inf_leave;
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (0 === (240 & here_op)) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (;;) {
                    here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = 65535 & here;
                    if (last_bits + here_bits <= bits) break;
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                if (64 & here_op) {
                  strm.msg = "invalid distance code";
                  state.mode = BAD;
                  break;
                }
                state.offset = here_val;
                state.extra = 15 & here_op;
                state.mode = DISTEXT;

               case DISTEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.offset += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
                state.mode = MATCH;

               case MATCH:
                if (0 === left) break inf_leave;
                copy = _out - left;
                if (state.offset > copy) {
                  copy = state.offset - copy;
                  if (copy > state.whave && state.sane) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD;
                    break;
                  }
                  if (copy > state.wnext) {
                    copy -= state.wnext;
                    from = state.wsize - copy;
                  } else from = state.wnext - copy;
                  copy > state.length && (copy = state.length);
                  from_source = state.window;
                } else {
                  from_source = output;
                  from = put - state.offset;
                  copy = state.length;
                }
                copy > left && (copy = left);
                left -= copy;
                state.length -= copy;
                do {
                  output[put++] = from_source[from++];
                } while (--copy);
                0 === state.length && (state.mode = LEN);
                break;

               case LIT:
                if (0 === left) break inf_leave;
                output[put++] = state.length;
                left--;
                state.mode = LEN;
                break;

               case CHECK:
                if (state.wrap) {
                  while (bits < 32) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold |= input[next++] << bits;
                    bits += 8;
                  }
                  _out -= left;
                  strm.total_out += _out;
                  state.total += _out;
                  _out && (strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));
                  _out = left;
                  if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                    strm.msg = "incorrect data check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = LENGTH;

               case LENGTH:
                if (state.wrap && state.flags) {
                  while (bits < 32) {
                    if (0 === have) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (hold !== (4294967295 & state.total)) {
                    strm.msg = "incorrect length check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = DONE;

               case DONE:
                ret = Z_STREAM_END;
                break inf_leave;

               case BAD:
                ret = Z_DATA_ERROR;
                break inf_leave;

               case MEM:
                return Z_MEM_ERROR;

               case SYNC:
               default:
                return Z_STREAM_ERROR;
              }
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              if ((state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) && updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
                state.mode = MEM;
                return Z_MEM_ERROR;
              }
              _in -= strm.avail_in;
              _out -= strm.avail_out;
              strm.total_in += _in;
              strm.total_out += _out;
              state.total += _out;
              state.wrap && _out && (strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
              strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
              (0 === _in && 0 === _out || flush === Z_FINISH) && ret === Z_OK && (ret = Z_BUF_ERROR);
              return ret;
            }
            function inflateEnd(strm) {
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              var state = strm.state;
              state.window && (state.window = null);
              strm.state = null;
              return Z_OK;
            }
            function inflateGetHeader(strm, head) {
              var state;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              state = strm.state;
              if (0 === (2 & state.wrap)) return Z_STREAM_ERROR;
              state.head = head;
              head.done = false;
              return Z_OK;
            }
            function inflateSetDictionary(strm, dictionary) {
              var dictLength = dictionary.length;
              var state;
              var dictid;
              var ret;
              if (!strm || !strm.state) return Z_STREAM_ERROR;
              state = strm.state;
              if (0 !== state.wrap && state.mode !== DICT) return Z_STREAM_ERROR;
              if (state.mode === DICT) {
                dictid = 1;
                dictid = adler32(dictid, dictionary, dictLength, 0);
                if (dictid !== state.check) return Z_DATA_ERROR;
              }
              ret = updatewindow(strm, dictionary, dictLength, dictLength);
              if (ret) {
                state.mode = MEM;
                return Z_MEM_ERROR;
              }
              state.havedict = 1;
              return Z_OK;
            }
            exports.inflateReset = inflateReset;
            exports.inflateReset2 = inflateReset2;
            exports.inflateResetKeep = inflateResetKeep;
            exports.inflateInit = inflateInit;
            exports.inflateInit2 = inflateInit2;
            exports.inflate = inflate;
            exports.inflateEnd = inflateEnd;
            exports.inflateGetHeader = inflateGetHeader;
            exports.inflateSetDictionary = inflateSetDictionary;
            exports.inflateInfo = "pako inflate (from Nodeca project)";
          }, {
            "../utils/common": 41,
            "./adler32": 43,
            "./crc32": 45,
            "./inffast": 48,
            "./inftrees": 50
          } ],
          50: [ function(require, module, exports) {
            var utils = require("../utils/common");
            var MAXBITS = 15;
            var ENOUGH_LENS = 852;
            var ENOUGH_DISTS = 592;
            var CODES = 0;
            var LENS = 1;
            var DISTS = 2;
            var lbase = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0 ];
            var lext = [ 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78 ];
            var dbase = [ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0 ];
            var dext = [ 16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64 ];
            module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
              var bits = opts.bits;
              var len = 0;
              var sym = 0;
              var min = 0, max = 0;
              var root = 0;
              var curr = 0;
              var drop = 0;
              var left = 0;
              var used = 0;
              var huff = 0;
              var incr;
              var fill;
              var low;
              var mask;
              var next;
              var base = null;
              var base_index = 0;
              var end;
              var count = new utils.Buf16(MAXBITS + 1);
              var offs = new utils.Buf16(MAXBITS + 1);
              var extra = null;
              var extra_index = 0;
              var here_bits, here_op, here_val;
              for (len = 0; len <= MAXBITS; len++) count[len] = 0;
              for (sym = 0; sym < codes; sym++) count[lens[lens_index + sym]]++;
              root = bits;
              for (max = MAXBITS; max >= 1; max--) if (0 !== count[max]) break;
              root > max && (root = max);
              if (0 === max) {
                table[table_index++] = 20971520;
                table[table_index++] = 20971520;
                opts.bits = 1;
                return 0;
              }
              for (min = 1; min < max; min++) if (0 !== count[min]) break;
              root < min && (root = min);
              left = 1;
              for (len = 1; len <= MAXBITS; len++) {
                left <<= 1;
                left -= count[len];
                if (left < 0) return -1;
              }
              if (left > 0 && (type === CODES || 1 !== max)) return -1;
              offs[1] = 0;
              for (len = 1; len < MAXBITS; len++) offs[len + 1] = offs[len] + count[len];
              for (sym = 0; sym < codes; sym++) 0 !== lens[lens_index + sym] && (work[offs[lens[lens_index + sym]]++] = sym);
              if (type === CODES) {
                base = extra = work;
                end = 19;
              } else if (type === LENS) {
                base = lbase;
                base_index -= 257;
                extra = lext;
                extra_index -= 257;
                end = 256;
              } else {
                base = dbase;
                extra = dext;
                end = -1;
              }
              huff = 0;
              sym = 0;
              len = min;
              next = table_index;
              curr = root;
              drop = 0;
              low = -1;
              used = 1 << root;
              mask = used - 1;
              if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) return 1;
              for (;;) {
                here_bits = len - drop;
                if (work[sym] < end) {
                  here_op = 0;
                  here_val = work[sym];
                } else if (work[sym] > end) {
                  here_op = extra[extra_index + work[sym]];
                  here_val = base[base_index + work[sym]];
                } else {
                  here_op = 96;
                  here_val = 0;
                }
                incr = 1 << len - drop;
                fill = 1 << curr;
                min = fill;
                do {
                  fill -= incr;
                  table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
                } while (0 !== fill);
                incr = 1 << len - 1;
                while (huff & incr) incr >>= 1;
                if (0 !== incr) {
                  huff &= incr - 1;
                  huff += incr;
                } else huff = 0;
                sym++;
                if (0 === --count[len]) {
                  if (len === max) break;
                  len = lens[lens_index + work[sym]];
                }
                if (len > root && (huff & mask) !== low) {
                  0 === drop && (drop = root);
                  next += min;
                  curr = len - drop;
                  left = 1 << curr;
                  while (curr + drop < max) {
                    left -= count[curr + drop];
                    if (left <= 0) break;
                    curr++;
                    left <<= 1;
                  }
                  used += 1 << curr;
                  if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) return 1;
                  low = huff & mask;
                  table[low] = root << 24 | curr << 16 | next - table_index | 0;
                }
              }
              0 !== huff && (table[next + huff] = len - drop << 24 | 64 << 16 | 0);
              opts.bits = root;
              return 0;
            };
          }, {
            "../utils/common": 41
          } ],
          51: [ function(require, module, exports) {
            module.exports = {
              2: "need dictionary",
              1: "stream end",
              0: "",
              "-1": "file error",
              "-2": "stream error",
              "-3": "data error",
              "-4": "insufficient memory",
              "-5": "buffer error",
              "-6": "incompatible version"
            };
          }, {} ],
          52: [ function(require, module, exports) {
            var utils = require("../utils/common");
            var Z_FIXED = 4;
            var Z_BINARY = 0;
            var Z_TEXT = 1;
            var Z_UNKNOWN = 2;
            function zero(buf) {
              var len = buf.length;
              while (--len >= 0) buf[len] = 0;
            }
            var STORED_BLOCK = 0;
            var STATIC_TREES = 1;
            var DYN_TREES = 2;
            var MIN_MATCH = 3;
            var MAX_MATCH = 258;
            var LENGTH_CODES = 29;
            var LITERALS = 256;
            var L_CODES = LITERALS + 1 + LENGTH_CODES;
            var D_CODES = 30;
            var BL_CODES = 19;
            var HEAP_SIZE = 2 * L_CODES + 1;
            var MAX_BITS = 15;
            var Buf_size = 16;
            var MAX_BL_BITS = 7;
            var END_BLOCK = 256;
            var REP_3_6 = 16;
            var REPZ_3_10 = 17;
            var REPZ_11_138 = 18;
            var extra_lbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ];
            var extra_dbits = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ];
            var extra_blbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ];
            var bl_order = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];
            var DIST_CODE_LEN = 512;
            var static_ltree = new Array(2 * (L_CODES + 2));
            zero(static_ltree);
            var static_dtree = new Array(2 * D_CODES);
            zero(static_dtree);
            var _dist_code = new Array(DIST_CODE_LEN);
            zero(_dist_code);
            var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
            zero(_length_code);
            var base_length = new Array(LENGTH_CODES);
            zero(base_length);
            var base_dist = new Array(D_CODES);
            zero(base_dist);
            function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
              this.static_tree = static_tree;
              this.extra_bits = extra_bits;
              this.extra_base = extra_base;
              this.elems = elems;
              this.max_length = max_length;
              this.has_stree = static_tree && static_tree.length;
            }
            var static_l_desc;
            var static_d_desc;
            var static_bl_desc;
            function TreeDesc(dyn_tree, stat_desc) {
              this.dyn_tree = dyn_tree;
              this.max_code = 0;
              this.stat_desc = stat_desc;
            }
            function d_code(dist) {
              return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
            }
            function put_short(s, w) {
              s.pending_buf[s.pending++] = 255 & w;
              s.pending_buf[s.pending++] = w >>> 8 & 255;
            }
            function send_bits(s, value, length) {
              if (s.bi_valid > Buf_size - length) {
                s.bi_buf |= value << s.bi_valid & 65535;
                put_short(s, s.bi_buf);
                s.bi_buf = value >> Buf_size - s.bi_valid;
                s.bi_valid += length - Buf_size;
              } else {
                s.bi_buf |= value << s.bi_valid & 65535;
                s.bi_valid += length;
              }
            }
            function send_code(s, c, tree) {
              send_bits(s, tree[2 * c], tree[2 * c + 1]);
            }
            function bi_reverse(code, len) {
              var res = 0;
              do {
                res |= 1 & code;
                code >>>= 1;
                res <<= 1;
              } while (--len > 0);
              return res >>> 1;
            }
            function bi_flush(s) {
              if (16 === s.bi_valid) {
                put_short(s, s.bi_buf);
                s.bi_buf = 0;
                s.bi_valid = 0;
              } else if (s.bi_valid >= 8) {
                s.pending_buf[s.pending++] = 255 & s.bi_buf;
                s.bi_buf >>= 8;
                s.bi_valid -= 8;
              }
            }
            function gen_bitlen(s, desc) {
              var tree = desc.dyn_tree;
              var max_code = desc.max_code;
              var stree = desc.stat_desc.static_tree;
              var has_stree = desc.stat_desc.has_stree;
              var extra = desc.stat_desc.extra_bits;
              var base = desc.stat_desc.extra_base;
              var max_length = desc.stat_desc.max_length;
              var h;
              var n, m;
              var bits;
              var xbits;
              var f;
              var overflow = 0;
              for (bits = 0; bits <= MAX_BITS; bits++) s.bl_count[bits] = 0;
              tree[2 * s.heap[s.heap_max] + 1] = 0;
              for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
                n = s.heap[h];
                bits = tree[2 * tree[2 * n + 1] + 1] + 1;
                if (bits > max_length) {
                  bits = max_length;
                  overflow++;
                }
                tree[2 * n + 1] = bits;
                if (n > max_code) continue;
                s.bl_count[bits]++;
                xbits = 0;
                n >= base && (xbits = extra[n - base]);
                f = tree[2 * n];
                s.opt_len += f * (bits + xbits);
                has_stree && (s.static_len += f * (stree[2 * n + 1] + xbits));
              }
              if (0 === overflow) return;
              do {
                bits = max_length - 1;
                while (0 === s.bl_count[bits]) bits--;
                s.bl_count[bits]--;
                s.bl_count[bits + 1] += 2;
                s.bl_count[max_length]--;
                overflow -= 2;
              } while (overflow > 0);
              for (bits = max_length; 0 !== bits; bits--) {
                n = s.bl_count[bits];
                while (0 !== n) {
                  m = s.heap[--h];
                  if (m > max_code) continue;
                  if (tree[2 * m + 1] !== bits) {
                    s.opt_len += (bits - tree[2 * m + 1]) * tree[2 * m];
                    tree[2 * m + 1] = bits;
                  }
                  n--;
                }
              }
            }
            function gen_codes(tree, max_code, bl_count) {
              var next_code = new Array(MAX_BITS + 1);
              var code = 0;
              var bits;
              var n;
              for (bits = 1; bits <= MAX_BITS; bits++) next_code[bits] = code = code + bl_count[bits - 1] << 1;
              for (n = 0; n <= max_code; n++) {
                var len = tree[2 * n + 1];
                if (0 === len) continue;
                tree[2 * n] = bi_reverse(next_code[len]++, len);
              }
            }
            function tr_static_init() {
              var n;
              var bits;
              var length;
              var code;
              var dist;
              var bl_count = new Array(MAX_BITS + 1);
              length = 0;
              for (code = 0; code < LENGTH_CODES - 1; code++) {
                base_length[code] = length;
                for (n = 0; n < 1 << extra_lbits[code]; n++) _length_code[length++] = code;
              }
              _length_code[length - 1] = code;
              dist = 0;
              for (code = 0; code < 16; code++) {
                base_dist[code] = dist;
                for (n = 0; n < 1 << extra_dbits[code]; n++) _dist_code[dist++] = code;
              }
              dist >>= 7;
              for (;code < D_CODES; code++) {
                base_dist[code] = dist << 7;
                for (n = 0; n < 1 << extra_dbits[code] - 7; n++) _dist_code[256 + dist++] = code;
              }
              for (bits = 0; bits <= MAX_BITS; bits++) bl_count[bits] = 0;
              n = 0;
              while (n <= 143) {
                static_ltree[2 * n + 1] = 8;
                n++;
                bl_count[8]++;
              }
              while (n <= 255) {
                static_ltree[2 * n + 1] = 9;
                n++;
                bl_count[9]++;
              }
              while (n <= 279) {
                static_ltree[2 * n + 1] = 7;
                n++;
                bl_count[7]++;
              }
              while (n <= 287) {
                static_ltree[2 * n + 1] = 8;
                n++;
                bl_count[8]++;
              }
              gen_codes(static_ltree, L_CODES + 1, bl_count);
              for (n = 0; n < D_CODES; n++) {
                static_dtree[2 * n + 1] = 5;
                static_dtree[2 * n] = bi_reverse(n, 5);
              }
              static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
              static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
              static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
            }
            function init_block(s) {
              var n;
              for (n = 0; n < L_CODES; n++) s.dyn_ltree[2 * n] = 0;
              for (n = 0; n < D_CODES; n++) s.dyn_dtree[2 * n] = 0;
              for (n = 0; n < BL_CODES; n++) s.bl_tree[2 * n] = 0;
              s.dyn_ltree[2 * END_BLOCK] = 1;
              s.opt_len = s.static_len = 0;
              s.last_lit = s.matches = 0;
            }
            function bi_windup(s) {
              s.bi_valid > 8 ? put_short(s, s.bi_buf) : s.bi_valid > 0 && (s.pending_buf[s.pending++] = s.bi_buf);
              s.bi_buf = 0;
              s.bi_valid = 0;
            }
            function copy_block(s, buf, len, header) {
              bi_windup(s);
              if (header) {
                put_short(s, len);
                put_short(s, ~len);
              }
              utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
              s.pending += len;
            }
            function smaller(tree, n, m, depth) {
              var _n2 = 2 * n;
              var _m2 = 2 * m;
              return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
            }
            function pqdownheap(s, tree, k) {
              var v = s.heap[k];
              var j = k << 1;
              while (j <= s.heap_len) {
                j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth) && j++;
                if (smaller(tree, v, s.heap[j], s.depth)) break;
                s.heap[k] = s.heap[j];
                k = j;
                j <<= 1;
              }
              s.heap[k] = v;
            }
            function compress_block(s, ltree, dtree) {
              var dist;
              var lc;
              var lx = 0;
              var code;
              var extra;
              if (0 !== s.last_lit) do {
                dist = s.pending_buf[s.d_buf + 2 * lx] << 8 | s.pending_buf[s.d_buf + 2 * lx + 1];
                lc = s.pending_buf[s.l_buf + lx];
                lx++;
                if (0 === dist) send_code(s, lc, ltree); else {
                  code = _length_code[lc];
                  send_code(s, code + LITERALS + 1, ltree);
                  extra = extra_lbits[code];
                  if (0 !== extra) {
                    lc -= base_length[code];
                    send_bits(s, lc, extra);
                  }
                  dist--;
                  code = d_code(dist);
                  send_code(s, code, dtree);
                  extra = extra_dbits[code];
                  if (0 !== extra) {
                    dist -= base_dist[code];
                    send_bits(s, dist, extra);
                  }
                }
              } while (lx < s.last_lit);
              send_code(s, END_BLOCK, ltree);
            }
            function build_tree(s, desc) {
              var tree = desc.dyn_tree;
              var stree = desc.stat_desc.static_tree;
              var has_stree = desc.stat_desc.has_stree;
              var elems = desc.stat_desc.elems;
              var n, m;
              var max_code = -1;
              var node;
              s.heap_len = 0;
              s.heap_max = HEAP_SIZE;
              for (n = 0; n < elems; n++) if (0 !== tree[2 * n]) {
                s.heap[++s.heap_len] = max_code = n;
                s.depth[n] = 0;
              } else tree[2 * n + 1] = 0;
              while (s.heap_len < 2) {
                node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
                tree[2 * node] = 1;
                s.depth[node] = 0;
                s.opt_len--;
                has_stree && (s.static_len -= stree[2 * node + 1]);
              }
              desc.max_code = max_code;
              for (n = s.heap_len >> 1; n >= 1; n--) pqdownheap(s, tree, n);
              node = elems;
              do {
                n = s.heap[1];
                s.heap[1] = s.heap[s.heap_len--];
                pqdownheap(s, tree, 1);
                m = s.heap[1];
                s.heap[--s.heap_max] = n;
                s.heap[--s.heap_max] = m;
                tree[2 * node] = tree[2 * n] + tree[2 * m];
                s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
                tree[2 * n + 1] = tree[2 * m + 1] = node;
                s.heap[1] = node++;
                pqdownheap(s, tree, 1);
              } while (s.heap_len >= 2);
              s.heap[--s.heap_max] = s.heap[1];
              gen_bitlen(s, desc);
              gen_codes(tree, max_code, s.bl_count);
            }
            function scan_tree(s, tree, max_code) {
              var n;
              var prevlen = -1;
              var curlen;
              var nextlen = tree[1];
              var count = 0;
              var max_count = 7;
              var min_count = 4;
              if (0 === nextlen) {
                max_count = 138;
                min_count = 3;
              }
              tree[2 * (max_code + 1) + 1] = 65535;
              for (n = 0; n <= max_code; n++) {
                curlen = nextlen;
                nextlen = tree[2 * (n + 1) + 1];
                if (++count < max_count && curlen === nextlen) continue;
                if (count < min_count) s.bl_tree[2 * curlen] += count; else if (0 !== curlen) {
                  curlen !== prevlen && s.bl_tree[2 * curlen]++;
                  s.bl_tree[2 * REP_3_6]++;
                } else count <= 10 ? s.bl_tree[2 * REPZ_3_10]++ : s.bl_tree[2 * REPZ_11_138]++;
                count = 0;
                prevlen = curlen;
                if (0 === nextlen) {
                  max_count = 138;
                  min_count = 3;
                } else if (curlen === nextlen) {
                  max_count = 6;
                  min_count = 3;
                } else {
                  max_count = 7;
                  min_count = 4;
                }
              }
            }
            function send_tree(s, tree, max_code) {
              var n;
              var prevlen = -1;
              var curlen;
              var nextlen = tree[1];
              var count = 0;
              var max_count = 7;
              var min_count = 4;
              if (0 === nextlen) {
                max_count = 138;
                min_count = 3;
              }
              for (n = 0; n <= max_code; n++) {
                curlen = nextlen;
                nextlen = tree[2 * (n + 1) + 1];
                if (++count < max_count && curlen === nextlen) continue;
                if (count < min_count) do {
                  send_code(s, curlen, s.bl_tree);
                } while (0 !== --count); else if (0 !== curlen) {
                  if (curlen !== prevlen) {
                    send_code(s, curlen, s.bl_tree);
                    count--;
                  }
                  send_code(s, REP_3_6, s.bl_tree);
                  send_bits(s, count - 3, 2);
                } else if (count <= 10) {
                  send_code(s, REPZ_3_10, s.bl_tree);
                  send_bits(s, count - 3, 3);
                } else {
                  send_code(s, REPZ_11_138, s.bl_tree);
                  send_bits(s, count - 11, 7);
                }
                count = 0;
                prevlen = curlen;
                if (0 === nextlen) {
                  max_count = 138;
                  min_count = 3;
                } else if (curlen === nextlen) {
                  max_count = 6;
                  min_count = 3;
                } else {
                  max_count = 7;
                  min_count = 4;
                }
              }
            }
            function build_bl_tree(s) {
              var max_blindex;
              scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
              scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
              build_tree(s, s.bl_desc);
              for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) if (0 !== s.bl_tree[2 * bl_order[max_blindex] + 1]) break;
              s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
              return max_blindex;
            }
            function send_all_trees(s, lcodes, dcodes, blcodes) {
              var rank;
              send_bits(s, lcodes - 257, 5);
              send_bits(s, dcodes - 1, 5);
              send_bits(s, blcodes - 4, 4);
              for (rank = 0; rank < blcodes; rank++) send_bits(s, s.bl_tree[2 * bl_order[rank] + 1], 3);
              send_tree(s, s.dyn_ltree, lcodes - 1);
              send_tree(s, s.dyn_dtree, dcodes - 1);
            }
            function detect_data_type(s) {
              var black_mask = 4093624447;
              var n;
              for (n = 0; n <= 31; n++, black_mask >>>= 1) if (1 & black_mask && 0 !== s.dyn_ltree[2 * n]) return Z_BINARY;
              if (0 !== s.dyn_ltree[18] || 0 !== s.dyn_ltree[20] || 0 !== s.dyn_ltree[26]) return Z_TEXT;
              for (n = 32; n < LITERALS; n++) if (0 !== s.dyn_ltree[2 * n]) return Z_TEXT;
              return Z_BINARY;
            }
            var static_init_done = false;
            function _tr_init(s) {
              if (!static_init_done) {
                tr_static_init();
                static_init_done = true;
              }
              s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
              s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
              s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
              s.bi_buf = 0;
              s.bi_valid = 0;
              init_block(s);
            }
            function _tr_stored_block(s, buf, stored_len, last) {
              send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
              copy_block(s, buf, stored_len, true);
            }
            function _tr_align(s) {
              send_bits(s, STATIC_TREES << 1, 3);
              send_code(s, END_BLOCK, static_ltree);
              bi_flush(s);
            }
            function _tr_flush_block(s, buf, stored_len, last) {
              var opt_lenb, static_lenb;
              var max_blindex = 0;
              if (s.level > 0) {
                s.strm.data_type === Z_UNKNOWN && (s.strm.data_type = detect_data_type(s));
                build_tree(s, s.l_desc);
                build_tree(s, s.d_desc);
                max_blindex = build_bl_tree(s);
                opt_lenb = s.opt_len + 3 + 7 >>> 3;
                static_lenb = s.static_len + 3 + 7 >>> 3;
                static_lenb <= opt_lenb && (opt_lenb = static_lenb);
              } else opt_lenb = static_lenb = stored_len + 5;
              if (stored_len + 4 <= opt_lenb && -1 !== buf) _tr_stored_block(s, buf, stored_len, last); else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
                send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
                compress_block(s, static_ltree, static_dtree);
              } else {
                send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
                send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
                compress_block(s, s.dyn_ltree, s.dyn_dtree);
              }
              init_block(s);
              last && bi_windup(s);
            }
            function _tr_tally(s, dist, lc) {
              s.pending_buf[s.d_buf + 2 * s.last_lit] = dist >>> 8 & 255;
              s.pending_buf[s.d_buf + 2 * s.last_lit + 1] = 255 & dist;
              s.pending_buf[s.l_buf + s.last_lit] = 255 & lc;
              s.last_lit++;
              if (0 === dist) s.dyn_ltree[2 * lc]++; else {
                s.matches++;
                dist--;
                s.dyn_ltree[2 * (_length_code[lc] + LITERALS + 1)]++;
                s.dyn_dtree[2 * d_code(dist)]++;
              }
              return s.last_lit === s.lit_bufsize - 1;
            }
            exports._tr_init = _tr_init;
            exports._tr_stored_block = _tr_stored_block;
            exports._tr_flush_block = _tr_flush_block;
            exports._tr_tally = _tr_tally;
            exports._tr_align = _tr_align;
          }, {
            "../utils/common": 41
          } ],
          53: [ function(require, module, exports) {
            function ZStream() {
              this.input = null;
              this.next_in = 0;
              this.avail_in = 0;
              this.total_in = 0;
              this.output = null;
              this.next_out = 0;
              this.avail_out = 0;
              this.total_out = 0;
              this.msg = "";
              this.state = null;
              this.data_type = 2;
              this.adler = 0;
            }
            module.exports = ZStream;
          }, {} ],
          54: [ function(require, module, exports) {
            module.exports = "function" === typeof setImmediate ? setImmediate : function setImmediate() {
              var args = [].slice.apply(arguments);
              args.splice(1, 0, 0);
              setTimeout.apply(null, args);
            };
          }, {} ]
        }, {}, [ 10 ])(10);
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {}, require("buffer").Buffer);
  }, {
    "../base64": void 0,
    "../compressions": void 0,
    "../crc32": void 0,
    "../external": void 0,
    "../nodejs/NodejsStreamOutputAdapter": void 0,
    "../signature": void 0,
    "../stream/GenericWorker": void 0,
    "../support": void 0,
    "../utf8": void 0,
    "../utils": void 0,
    "../utils/common": void 0,
    "./ArrayReader": void 0,
    "./ConvertWorker": void 0,
    "./DataReader": void 0,
    "./GenericWorker": void 0,
    "./NodeBufferReader": void 0,
    "./StringReader": void 0,
    "./Uint8ArrayReader": void 0,
    "./ZipFileWorker": void 0,
    "./adler32": void 0,
    "./base64": void 0,
    "./common": void 0,
    "./compressedObject": void 0,
    "./compressions": void 0,
    "./crc32": void 0,
    "./defaults": void 0,
    "./external": void 0,
    "./flate": void 0,
    "./generate": void 0,
    "./inffast": void 0,
    "./inftrees": void 0,
    "./lib/deflate": void 0,
    "./lib/inflate": void 0,
    "./lib/utils/common": void 0,
    "./lib/zlib/constants": void 0,
    "./load": void 0,
    "./messages": void 0,
    "./nodejs/NodejsStreamInputAdapter": void 0,
    "./nodejsUtils": void 0,
    "./object": void 0,
    "./reader/readerFor": void 0,
    "./signature": void 0,
    "./stream/Crc32Probe": void 0,
    "./stream/DataLengthProbe": void 0,
    "./stream/DataWorker": void 0,
    "./stream/GenericWorker": void 0,
    "./stream/StreamHelper": void 0,
    "./support": void 0,
    "./trees": void 0,
    "./utf8": void 0,
    "./utils": void 0,
    "./utils/common": void 0,
    "./utils/strings": void 0,
    "./zipEntries": void 0,
    "./zipEntry": void 0,
    "./zipObject": void 0,
    "./zlib/constants": void 0,
    "./zlib/deflate": void 0,
    "./zlib/gzheader": void 0,
    "./zlib/inflate": void 0,
    "./zlib/messages": void 0,
    "./zlib/zstream": void 0,
    buffer: 3,
    immediate: void 0,
    lie: void 0,
    pako: void 0,
    "readable-stream": void 0,
    "set-immediate-shim": void 0,
    stream: 27
  } ],
  quadtree: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8b56el+ZatDG6VbPyNdl3vW", "quadtree");
    "use strict";
    (function() {
      function Quadtree(bounds, max_objects, max_levels, level) {
        this.max_objects = max_objects || 10;
        this.max_levels = max_levels || 4;
        this.level = level || 0;
        this.bounds = bounds;
        this.objects = [];
        this.nodes = [];
      }
      Quadtree.prototype.split = function() {
        var nextLevel = this.level + 1, subWidth = this.bounds.width / 2, subHeight = this.bounds.height / 2, x = this.bounds.x, y = this.bounds.y;
        this.nodes[0] = new Quadtree({
          x: x + subWidth,
          y: y,
          width: subWidth,
          height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
        this.nodes[1] = new Quadtree({
          x: x,
          y: y,
          width: subWidth,
          height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
        this.nodes[2] = new Quadtree({
          x: x,
          y: y + subHeight,
          width: subWidth,
          height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
        this.nodes[3] = new Quadtree({
          x: x + subWidth,
          y: y + subHeight,
          width: subWidth,
          height: subHeight
        }, this.max_objects, this.max_levels, nextLevel);
      };
      Quadtree.prototype.getIndex = function(pRect) {
        var indexes = [], verticalMidpoint = this.bounds.x + this.bounds.width / 2, horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
        var startIsNorth = pRect.y < horizontalMidpoint, startIsWest = pRect.x < verticalMidpoint, endIsEast = pRect.x + pRect.width > verticalMidpoint, endIsSouth = pRect.y + pRect.height > horizontalMidpoint;
        startIsNorth && endIsEast && indexes.push(0);
        startIsWest && startIsNorth && indexes.push(1);
        startIsWest && endIsSouth && indexes.push(2);
        endIsEast && endIsSouth && indexes.push(3);
        return indexes;
      };
      Quadtree.prototype.insert = function(pRect) {
        var i = 0, indexes;
        if (this.nodes.length) {
          indexes = this.getIndex(pRect);
          for (i = 0; i < indexes.length; i++) this.nodes[indexes[i]].insert(pRect);
          return;
        }
        this.objects.push(pRect);
        if (this.objects.length > this.max_objects && this.level < this.max_levels) {
          this.nodes.length || this.split();
          for (i = 0; i < this.objects.length; i++) {
            indexes = this.getIndex(this.objects[i]);
            for (var k = 0; k < indexes.length; k++) this.nodes[indexes[k]].insert(this.objects[i]);
          }
          this.objects = [];
        }
      };
      Quadtree.prototype.retrieve = function(pRect) {
        var indexes = this.getIndex(pRect), returnObjects = this.objects;
        if (this.nodes.length) for (var i = 0; i < indexes.length; i++) returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect));
        returnObjects = returnObjects.filter(function(item, index) {
          return returnObjects.indexOf(item) >= index;
        });
        return returnObjects;
      };
      Quadtree.prototype.clear = function() {
        this.objects = [];
        for (var i = 0; i < this.nodes.length; i++) this.nodes.length && this.nodes[i].clear();
        this.nodes = [];
      };
      "undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports = Quadtree : window.Quadtree = Quadtree;
    })();
    cc._RF.pop();
  }, {} ]
}, {}, [ "Case_ArcProgressBar", "CardArray_Card", "CardArray_CardLayout", "Case_CardArray", "CardArrayFlip_Card", "CardArrayFlip_CardLayout", "CardArrayFlip_FrontCard2D", "CardArrayFlip_FrontCard3D", "CardArrayFlip_FrontCardBase", "Case_CardArrayFlip", "Case_CardFlip", "quadtree", "Case_CollisionQuadTree", "Case_CollisionQuadTree_Container", "Case_CollisionQuadTree_DraggableItem", "Case_CollisionQuadTree_Item", "Case_Dragging", "Case_DraggingContent", "Case_Dragging_Container", "Case_Dragging_Group", "Case_Dragging_GroupContainer", "Case_Dragging_Item", "Case_FrameLoading", "Case_MultipassKawaseBlur", "Case_NewUserGuide", "Case_PixelClick", "Case_PopupTesting", "TestPopup", "Case_PostProcessing", "Case_RadarChart", "Case_RemoteSpine", "Case_RemoteTexture", "Case_RuntimeTrimming", "Case_SineWave", "BackgroundFitter", "Counter", "LongPress", "Marquee", "PersistNode", "RotateAround", "RunInBackground", "ScreenAdapter", "Subtitle", "TouchBlocker", "TouchBlocker2", "TouchEffect", "ArcProgressBar", "RadarChart", "ColorBrush", "GaussianBlur", "HollowOut", "Mosaic", "PostProcessing", "RadialBlur", "SineWave", "Draggable", "LocalizationBase", "LocalizationLabelString", "LocalizationSpriteFrame", "OneWayCollider", "ConfirmPopup", "PopupBase", "RemoteAsset", "RemoteSpine", "RemoteTexture", "BaseTextureRenderer", "GradientColor", "TextureWithTilingOffset", "BounceMoveTween", "BounceScaleTween", "JellyTween", "AudioPlayer", "EventManager", "InstanceEvent", "PopupManager", "SceneNavigator", "RemoteLoader", "SpineLoader", "ZipLoader", "BaseAssembler", "eazax", "extension", "EditorAsset", "jszip", "ArrayUtil", "Base64Util", "BrowserUtil", "ColorUtil", "DebugUtil", "DeviceUtil", "GeometryUtil", "ImageUtil", "MathUtil", "NodeUtil", "ObjectUtil", "PromiseUtil", "RegexUtil", "RenderUtil", "StorageUtil", "TimeUtil", "TweenUtil", "About", "CaseList", "CaseManager", "CaseSettings", "ClickToLoadUrl", "ClickToShowResPopup", "CaseLoading", "CommonUI", "LoadingTip", "TextureUsage", "Toast", "ResPopup", "ResPopupItem", "Constants", "CustomEvents", "Hack_RunSpineInEditor", "Hack_ScrollView", "Home", "Home_Content", "Home_UI", "Home_CaseBtn", "Home_CaseList", "Test_3DNode", "Test", "NetworkManager", "PoolManager", "ResourceManager", "MarchingSquares", "GuideItemBase", "GuideSequence", "GuideManager", "Test_NodeOrder" ]);