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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var Events_1 = require("../constants/Events");
    var ccclass = cc._decorator.ccclass;
    var BackgroundFitter = function(_super) {
      __extends(BackgroundFitter, _super);
      function BackgroundFitter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BackgroundFitter.prototype.onLoad = function() {
        EventManager_1.default.on(Events_1.VIEW_RESIZE, this.adapt, this);
      };
      BackgroundFitter.prototype.start = function() {
        this.adapt();
      };
      BackgroundFitter.prototype.onDestroy = function() {
        EventManager_1.default.off(Events_1.VIEW_RESIZE, this.adapt, this);
      };
      BackgroundFitter.prototype.adapt = function() {
        var screenRatio = cc.winSize.height / cc.winSize.width;
        var designRatio = cc.Canvas.instance.designResolution.height / cc.Canvas.instance.designResolution.width;
        if (screenRatio >= designRatio) {
          var scale = cc.winSize.height / cc.Canvas.instance.designResolution.height;
          this.node.scale = scale;
        } else {
          var scale = cc.winSize.width / cc.Canvas.instance.designResolution.width;
          this.node.scale = scale;
        }
      };
      BackgroundFitter = __decorate([ ccclass ], BackgroundFitter);
      return BackgroundFitter;
    }(cc.Component);
    exports.default = BackgroundFitter;
    cc._RF.pop();
  }, {
    "../constants/Events": "Events",
    "../core/EventManager": "EventManager"
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
        window.history.replaceState({}, null, "?" + param);
      };
      BrowserUtil.getUrlParam = function(key) {
        if (!window || !window.location) return;
        var query = window.location.search.replace("?", "");
        if ("" === query) return null;
        var keyValues = query.split("&");
        for (var i = 0; i < keyValues.length; i++) {
          var strings = keyValues[i].split("=");
          if (decodeURIComponent(strings[0]) === key) return decodeURIComponent(strings[1]);
        }
        return null;
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
  CardArray_CardArray: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b03eeW/0L9M85qS0tEmzZyL", "CardArray_CardArray");
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
    var CardArray_CardArray = function(_super) {
      __extends(CardArray_CardArray, _super);
      function CardArray_CardArray() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        return _this;
      }
      CardArray_CardArray.prototype.start = function() {
        this.rotateForever();
      };
      CardArray_CardArray.prototype.rotateForever = function() {
        cc.tween(this.container).by(2, {
          eulerAngles: cc.v3(0, 90, 0)
        }).repeatForever().start();
      };
      __decorate([ property(cc.Node) ], CardArray_CardArray.prototype, "container", void 0);
      CardArray_CardArray = __decorate([ ccclass ], CardArray_CardArray);
      return CardArray_CardArray;
    }(cc.Component);
    exports.default = CardArray_CardArray;
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
      CardArray_Layout.prototype.onLoad = function() {
        this.init();
      };
      CardArray_Layout.prototype.onEnable = function() {
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
        this.updateLayout();
      };
      CardArray_Layout.prototype.onRotationChange = function() {
        this.updateHierarchy();
      };
      CardArray_Layout.prototype.updateLayout = function() {
        var nodes = this.node.children, count = nodes.length, radius = this._radius, offset = this._offset, delta = 360 / count;
        for (var i = 0; i < count; i++) {
          var node = nodes[i], angleY = -delta * i, radian = Math.PI / 180 * (angleY - offset), _a = node.eulerAngles, x = _a.x, z = _a.z;
          node.x = radius * Math.cos(radian);
          node.z = -radius * Math.sin(radian);
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
      __decorate([ property ], CardArray_Layout.prototype, "_radius", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArray_Layout.prototype, "radius", null);
      __decorate([ property ], CardArray_Layout.prototype, "_offset", void 0);
      __decorate([ property({
        displayName: false
      }) ], CardArray_Layout.prototype, "offset", null);
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
        _this.front = null;
        _this.back = null;
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
      __decorate([ property(cc.Node) ], CardArray_Card.prototype, "front", void 0);
      __decorate([ property(cc.Node) ], CardArray_Card.prototype, "back", void 0);
      __decorate([ property() ], CardArray_Card.prototype, "k", void 0);
      CardArray_Card = __decorate([ ccclass, executeInEditMode ], CardArray_Card);
      return CardArray_Card;
    }(cc.Component);
    exports.default = CardArray_Card;
    cc._RF.pop();
  }, {} ],
  CardArray_Content: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1b90/rohdEk4SdmmEZANaD", "CardArray_Content");
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
    var CardArray_Content = function(_super) {
      __extends(CardArray_Content, _super);
      function CardArray_Content() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CardArray_Content.prototype.onLoad = function() {
        this.init();
      };
      CardArray_Content.prototype.init = function() {};
      CardArray_Content = __decorate([ ccclass ], CardArray_Content);
      return CardArray_Content;
    }(cc.Component);
    exports.default = CardArray_Content;
    cc._RF.pop();
  }, {} ],
  CardArray_UI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eae8fLcp+VKh68szaWpbsHS", "CardArray_UI");
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
    var CardArray_UI = function(_super) {
      __extends(CardArray_UI, _super);
      function CardArray_UI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.loopBtn = null;
        return _this;
      }
      CardArray_UI.prototype.onLoad = function() {};
      CardArray_UI.prototype.start = function() {};
      __decorate([ property(cc.Node) ], CardArray_UI.prototype, "loopBtn", void 0);
      CardArray_UI = __decorate([ ccclass ], CardArray_UI);
      return CardArray_UI;
    }(cc.Component);
    exports.default = CardArray_UI;
    cc._RF.pop();
  }, {} ],
  CardFlip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3cf8arMOblOeL4UxCUU8QcT", "CardFlip");
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
    var CardFlip = function(_super) {
      __extends(CardFlip, _super);
      function CardFlip() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.card = null;
        _this.flipBtn = null;
        _this.button = null;
        _this.frontColor = cc.Color.WHITE;
        _this.backColor = cc.Color.GRAY;
        return _this;
      }
      CardFlip.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      CardFlip.prototype.start = function() {
        this.reset();
      };
      CardFlip.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      CardFlip.prototype.registerEvent = function() {
        this.flipBtn.on(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
      };
      CardFlip.prototype.unregisterEvent = function() {
        this.flipBtn.off(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
      };
      CardFlip.prototype.init = function() {
        this.button = this.flipBtn.getComponent(cc.Button) || this.flipBtn.addComponent(cc.Button);
      };
      CardFlip.prototype.reset = function() {
        this.card.color = this.frontColor;
        this.setButtonState(true);
      };
      CardFlip.prototype.onFlipBtnClick = function() {
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
      CardFlip.prototype.setButtonState = function(interactable) {
        this.button.interactable = interactable;
        this.flipBtn.color = interactable ? cc.Color.WHITE : cc.Color.GRAY;
      };
      __decorate([ property({
        displayName: false,
        type: cc.Node
      }) ], CardFlip.prototype, "card", void 0);
      __decorate([ property({
        displayName: false,
        type: cc.Node
      }) ], CardFlip.prototype, "flipBtn", void 0);
      CardFlip = __decorate([ ccclass ], CardFlip);
      return CardFlip;
    }(cc.Component);
    exports.default = CardFlip;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/TweenUtil": "TweenUtil"
  } ],
  CaseManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "354b8dKhslAHKRdEtOdQhfg", "CaseManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CaseInfoMap = void 0;
    var EventManager_1 = require("../../eazax-ccc/core/EventManager");
    var SceneNavigator_1 = require("../../eazax-ccc/core/SceneNavigator");
    var BrowserUtil_1 = require("../../eazax-ccc/utils/BrowserUtil");
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
        var sceneName = this.getCaseInfo(caseName).scene;
        SceneNavigator_1.default.go(sceneName, null, function() {
          BrowserUtil_1.default.setUrlParam("case=" + caseName);
          EventManager_1.default.emit(CustomEvents_1.SWITCH_CASE, sceneName);
        });
      };
      CaseManager.hasCase = function(caseName) {
        return !!this.getCaseInfo(caseName);
      };
      CaseManager.getCaseInfo = function(caseName) {
        return exports.CaseInfoMap[caseName];
      };
      return CaseManager;
    }();
    exports.default = CaseManager;
    exports.CaseInfoMap = {
      avatar: {
        name: "\u5934\u50cf",
        scene: "avatar"
      },
      cardArray: {
        name: "\u5361\u7247\u9635\u5217",
        scene: "cardArray"
      },
      cardFlip: {
        name: "\u5361\u7247\u7ffb\u8f6c",
        scene: "cardFlip"
      },
      colorBrush: {
        name: "\u5f69\u8272\u753b\u7b14",
        scene: "colorBrush"
      },
      frameLoading: {
        name: "\u5206\u5e27\u52a0\u8f7d",
        scene: "frameLoading"
      },
      gaussianBlur: {
        name: "\u9ad8\u65af\u6a21\u7cca",
        scene: "gaussianBlur"
      },
      gradientColor: {
        name: "\u6e10\u53d8\u8272",
        scene: "gradientColor"
      },
      newUserGuide: {
        name: "\u65b0\u624b\u5f15\u5bfc",
        scene: "newUserGuide"
      },
      popupTest: {
        name: "\u5f39\u7a97\u6d4b\u8bd5",
        scene: "popupTest"
      },
      rotateAround: {
        name: "\u56f4\u7ed5\u65cb\u8f6c",
        scene: "rotateAround"
      },
      sineWave: {
        name: "\u6b63\u5f26\u6ce2\u6d6a",
        scene: "sineWave"
      }
    };
    cc._RF.pop();
  }, {
    "../../eazax-ccc/core/EventManager": "EventManager",
    "../../eazax-ccc/core/SceneNavigator": "SceneNavigator",
    "../../eazax-ccc/utils/BrowserUtil": "BrowserUtil",
    "./constants/Constants": "Constants",
    "./constants/CustomEvents": "CustomEvents"
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
    var PopupManager_1 = require("../../../eazax-ccc/core/PopupManager");
    var ResPopup_1 = require("./popups/resPopup/ResPopup");
    var ResPopupItemInfo_1 = require("./popups/resPopup/ResPopupItemInfo");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ClickToShowResPopup = function(_super) {
      __extends(ClickToShowResPopup, _super);
      function ClickToShowResPopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.items = [];
        return _this;
      }
      ClickToShowResPopup.prototype.onLoad = function() {
        this.registerEvent();
      };
      ClickToShowResPopup.prototype.registerEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      ClickToShowResPopup.prototype.onClick = function() {
        var options = {
          items: []
        }, items = this.items;
        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i], info = {
            name: item.title,
            url: item.url
          };
          options.items.push(info);
        }
        var params = {
          mode: PopupManager_1.PopupCacheMode.Frequent
        };
        PopupManager_1.default.show(ResPopup_1.default.path, options, params);
      };
      __decorate([ property({
        type: [ ResPopupItemInfo_1.default ]
      }) ], ClickToShowResPopup.prototype, "items", void 0);
      ClickToShowResPopup = __decorate([ ccclass ], ClickToShowResPopup);
      return ClickToShowResPopup;
    }(cc.Component);
    exports.default = ClickToShowResPopup;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/core/PopupManager": "PopupManager",
    "./popups/resPopup/ResPopup": "ResPopup",
    "./popups/resPopup/ResPopupItemInfo": "ResPopupItemInfo"
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
    var EventManager_1 = require("../../../eazax-ccc/core/EventManager");
    var PopupManager_1 = require("../../../eazax-ccc/core/PopupManager");
    var SceneNavigator_1 = require("../../../eazax-ccc/core/SceneNavigator");
    var CaseManager_1 = require("../CaseManager");
    var Constants_1 = require("../constants/Constants");
    var CustomEvents_1 = require("../constants/CustomEvents");
    var Toast_1 = require("./Toast");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
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
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.on(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);
        EventManager_1.default.on(CustomEvents_1.CHANGE_SCENE, this.onSceneChange, this);
        EventManager_1.default.on(CustomEvents_1.SWITCH_CASE, this.onCaseSwitch, this);
      };
      CommonUI.prototype.unregisterEvent = function() {
        EventManager_1.default.off(CustomEvents_1.CHANGE_SCENE, this.onSceneChange, this);
        EventManager_1.default.off(CustomEvents_1.SWITCH_CASE, this.onCaseSwitch, this);
      };
      CommonUI.prototype.init = function() {
        cc.game.addPersistRootNode(this.node);
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
      CommonUI = __decorate([ ccclass ], CommonUI);
      return CommonUI;
    }(cc.Component);
    exports.default = CommonUI;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/core/EventManager": "EventManager",
    "../../../eazax-ccc/core/PopupManager": "PopupManager",
    "../../../eazax-ccc/core/SceneNavigator": "SceneNavigator",
    "../CaseManager": "CaseManager",
    "../constants/Constants": "Constants",
    "../constants/CustomEvents": "CustomEvents",
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
        _this.time = 1;
        _this.keepInteger = true;
        _this.label = null;
        _this._value = 0;
        _this.tween = null;
        _this.lastTarget = 0;
        return _this;
      }
      Object.defineProperty(Counter.prototype, "value", {
        get: function() {
          return this._value;
        },
        set: function(value) {
          this.keepInteger && (value = Math.floor(value));
          this._value = value;
          this.label.string = value.toString();
        },
        enumerable: false,
        configurable: true
      });
      Counter.prototype.onLoad = function() {
        this.init();
      };
      Counter.prototype.init = function() {
        this.label = this.getComponent(cc.Label);
        this.value = 0;
      };
      Counter.prototype.setValue = function(value) {
        this.value = value;
      };
      Counter.prototype.setTime = function(time) {
        this.time = time;
      };
      Counter.prototype.to = function(target, time, callback) {
        var _this = this;
        void 0 === time && (time = null);
        return new Promise(function(res) {
          if (_this.tween) {
            _this.tween.stop();
            _this.tween = null;
          }
          null !== time && (_this.time = time);
          _this.lastTarget = target;
          _this.tween = cc.tween(_this).to(_this.time, {
            value: target
          }).call(function() {
            callback && callback();
            _this.tween = null;
            res();
          }).start();
        });
      };
      Counter.prototype.by = function(diff, time, callback) {
        var _this = this;
        void 0 === time && (time = null);
        return new Promise(function(res) {
          if (_this.tween) {
            _this.tween.stop();
            _this.tween = null;
            _this.value = _this.lastTarget;
          }
          null !== time && (_this.time = time);
          _this.lastTarget = _this.value + diff;
          _this.tween = cc.tween(_this).to(_this.time, {
            value: _this.lastTarget
          }).call(function() {
            callback && callback();
            _this.tween = null;
            res();
          }).start();
        });
      };
      __decorate([ property({
        tooltip: false
      }) ], Counter.prototype, "time", void 0);
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
    window["eazax"] && (window["eazax"]["debug"] = DebugUtil);
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
        true;
        return cc.warn("[EditorAsset]", "\u8be5\u51fd\u6570\u53ea\u5728\u7f16\u8f91\u5668\u73af\u5883\u5185\u6709\u6548\uff01");
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
  Events: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e0c381izNdO5aoU43JPjvWU", "Events");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.VIEW_RESIZE = void 0;
    exports.VIEW_RESIZE = "view-resize";
    cc._RF.pop();
  }, {} ],
  FrameLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a40au3FthMvYHjcvwK8lLd", "FrameLoading");
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
    var FrameLoading = function(_super) {
      __extends(FrameLoading, _super);
      function FrameLoading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.content = null;
        _this.normalBtn = null;
        _this.clearBtn = null;
        _this.frameBtn = null;
        return _this;
      }
      FrameLoading.prototype.onLoad = function() {
        this.registerEvent();
      };
      FrameLoading.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      FrameLoading.prototype.registerEvent = function() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.on(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
      };
      FrameLoading.prototype.unregisterEvent = function() {
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.off(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.off(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
      };
      FrameLoading.prototype.onNormalBtnClick = function() {
        this.clear();
        this.loadAtOnce();
      };
      FrameLoading.prototype.onClearBtnClick = function() {
        this.clear();
      };
      FrameLoading.prototype.onFrameBtnClick = function() {
        this.clear();
        this.loadByFrame();
      };
      FrameLoading.prototype.clear = function() {
        this.unscheduleAllCallbacks();
        this.content.destroyAllChildren();
      };
      FrameLoading.prototype.addItem = function(index) {
        var node = cc.instantiate(this.itemPrefab);
        node.setParent(this.content);
        node.getComponentInChildren(cc.Label).string = "" + (index + 1);
        node.active = true;
      };
      FrameLoading.prototype.loadAtOnce = function() {
        var total = 2e3;
        for (var i = 0; i < total; i++) this.addItem(i);
      };
      FrameLoading.prototype.loadByFrame = function() {
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
      __decorate([ property(cc.Node) ], FrameLoading.prototype, "itemPrefab", void 0);
      __decorate([ property(cc.Node) ], FrameLoading.prototype, "content", void 0);
      __decorate([ property(cc.Node) ], FrameLoading.prototype, "normalBtn", void 0);
      __decorate([ property(cc.Node) ], FrameLoading.prototype, "clearBtn", void 0);
      __decorate([ property(cc.Node) ], FrameLoading.prototype, "frameBtn", void 0);
      FrameLoading = __decorate([ ccclass ], FrameLoading);
      return FrameLoading;
    }(cc.Component);
    exports.default = FrameLoading;
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, executeInEditMode = _a.executeInEditMode;
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
      __decorate([ property ], GradientColor.prototype, "_colors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], GradientColor.prototype, "colors", null);
      GradientColor = __decorate([ ccclass, requireComponent(cc.RenderComponent), disallowMultiple, executeInEditMode ], GradientColor);
      return GradientColor;
    }(cc.Component);
    exports.default = GradientColor;
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
        null !== center && (this._center = center);
        null !== width && (this._width = width);
        null !== height && (this._height = height);
        if (null !== round) {
          this._round = round >= 0 ? round : 0;
          var min = Math.min(this._width / 2, this._height / 2);
          this._round = this._round <= min ? this._round : min;
        }
        if (null !== feather) {
          this._feather = feather >= 0 ? feather : 0;
          this._feather = this._feather <= this._round ? this._feather : this._round;
        }
        this.material.setProperty("size", this.getNodeSize());
        this.material.setProperty("center", this.getCenter(this._center));
        this.material.setProperty("width", this.getWidth(this._width));
        this.material.setProperty("height", this.getHeight(this._height));
        this.material.setProperty("round", this.getRound(this._round));
        this.material.setProperty("feather", this.getFeather(this._feather));
      };
      HollowOut.prototype.circle = function(center, radius, feather) {
        this._shape = HollowOutShape.Circle;
        null !== center && (this._center = center);
        null !== radius && (this._radius = radius);
        null !== feather && (this._feather = feather >= 0 ? feather : 0);
        this.material.setProperty("size", this.getNodeSize());
        this.material.setProperty("center", this.getCenter(this._center));
        this.material.setProperty("width", this.getWidth(2 * this._radius));
        this.material.setProperty("height", this.getHeight(2 * this._radius));
        this.material.setProperty("round", this.getRound(this._radius));
        this.material.setProperty("feather", this.getFeather(this._feather));
      };
      HollowOut.prototype.rectTo = function(time, center, width, height, round, feather) {
        var _this = this;
        void 0 === round && (round = 0);
        void 0 === feather && (feather = 0);
        return new Promise(function(res) {
          cc.Tween.stopAllByTarget(_this);
          _this.unscheduleAllCallbacks();
          _this.tweenRes && _this.tweenRes();
          _this.tweenRes = res;
          round > width / 2 && (round = width / 2);
          round > height / 2 && (round = height / 2);
          feather > round && (feather = round);
          _this._shape = HollowOutShape.Rect;
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
          cc.Tween.stopAllByTarget(_this);
          _this.unscheduleAllCallbacks();
          _this.tweenRes && _this.tweenRes();
          _this.tweenRes = res;
          _this._shape = HollowOutShape.Circle;
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
      HollowOut.prototype.nodeSize = function() {
        this._radius = Math.sqrt(this.node.width * this.node.width + this.node.height * this.node.height) / 2;
        this.rect(this.node.getPosition(), this.node.width, this.node.height, 0, 0);
      };
      HollowOut.prototype.getCenter = function(center) {
        var x = (center.x + this.node.width / 2) / this.node.width;
        var y = (-center.y + this.node.height / 2) / this.node.height;
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
          return this.shape === HollowOutShape.Rect;
        }
      }) ], HollowOut.prototype, "width", null);
      __decorate([ property ], HollowOut.prototype, "_height", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this.shape === HollowOutShape.Rect;
        }
      }) ], HollowOut.prototype, "height", null);
      __decorate([ property ], HollowOut.prototype, "_round", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this.shape === HollowOutShape.Rect;
        }
      }) ], HollowOut.prototype, "round", null);
      __decorate([ property ], HollowOut.prototype, "_radius", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this.shape === HollowOutShape.Circle;
        }
      }) ], HollowOut.prototype, "radius", null);
      __decorate([ property ], HollowOut.prototype, "_feather", void 0);
      __decorate([ property({
        tooltip: false,
        visible: function() {
          return this.shape === HollowOutShape.Circle || this.round > 0;
        }
      }) ], HollowOut.prototype, "feather", null);
      HollowOut = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple, executionOrder(-100) ], HollowOut);
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
    var CaseManager_1 = require("../../common/CaseManager");
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
        for (var key in CaseManager_1.CaseInfoMap) {
          var node = cc.instantiate(prefab);
          node.getComponent(Home_CaseBtn_1.default).set(key, CaseManager_1.CaseInfoMap[key]);
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
    "../../common/CaseManager": "CaseManager",
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Home_UI = function(_super) {
      __extends(Home_UI, _super);
      function Home_UI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Home_UI.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      Home_UI.prototype.start = function() {
        this.reset();
      };
      Home_UI.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Home_UI.prototype.registerEvent = function() {};
      Home_UI.prototype.unregisterEvent = function() {};
      Home_UI.prototype.init = function() {};
      Home_UI.prototype.reset = function() {};
      Home_UI = __decorate([ ccclass ], Home_UI);
      return Home_UI;
    }(cc.Component);
    exports.default = Home_UI;
    cc._RF.pop();
  }, {} ],
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
    var LoadingTip_1 = require("../common/components/LoadingTip");
    var Toast_1 = require("../common/components/Toast");
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
      };
      Home.prototype.detectCaseParam = function() {
        var caseName = BrowserUtil_1.default.getUrlParam("case");
        caseName && (CaseManager_1.default.hasCase(caseName) ? CaseManager_1.default.goCase(caseName) : Toast_1.default.show("\u554a\u54e6\uff0c\u6ca1\u6709\u627e\u5230\u8fd9\u4e2a\u793a\u4f8b", caseName));
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
    "../common/components/LoadingTip": "LoadingTip",
    "../common/components/Toast": "Toast",
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
      ImageUtil.getPixelColor = function(texture, x, y) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = texture.width;
        canvas.height = texture.height;
        var image = texture.getHtmlElementObj();
        ctx.drawImage(image, 0, 0, texture.width, texture.height);
        var imageData = ctx.getImageData(0, 0, texture.width, texture.height);
        var pixelIndex = (y - 1) * texture.width * 4 + 4 * (x - 1);
        var pixelData = imageData.data.slice(pixelIndex, pixelIndex + 4);
        var color = cc.color(pixelData[0], pixelData[1], pixelData[2], pixelData[3]);
        image.remove();
        canvas.remove();
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
      ImageUtil.base64ToTexture = function(base64) {
        var image = document.createElement("img");
        image.src = base64;
        var texture = new cc.Texture2D();
        texture.initWithElement(image);
        image.remove();
        return texture;
      };
      ImageUtil.base64ToBlob = function(base64) {
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
      LoadingTip.prototype.start = function() {
        this.reset();
      };
      LoadingTip.prototype.init = function() {
        cc.game.addPersistRootNode(this.node);
        LoadingTip_1.instance = this;
      };
      LoadingTip.prototype.reset = function() {
        LoadingTip_1.hide();
      };
      LoadingTip.show = function() {
        this.instance.main.active = true;
      };
      LoadingTip.hide = function() {
        this.instance.main.active = false;
      };
      var LoadingTip_1;
      LoadingTip.instance = null;
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], LoadingTip.prototype, "main", void 0);
      LoadingTip = LoadingTip_1 = __decorate([ ccclass, executionOrder(-100) ], LoadingTip);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
  NewUserGuide: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a50fcdznlNkoYkMJatN+XL", "NewUserGuide");
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
    var NewUserGuide = function(_super) {
      __extends(NewUserGuide, _super);
      function NewUserGuide() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hollowOut = null;
        _this.touchBlocker = null;
        _this.startBtn = null;
        _this.oneBtn = null;
        _this.twoBtn = null;
        _this.threeBtn = null;
        return _this;
      }
      NewUserGuide.prototype.onLoad = function() {
        this.registerEvent();
      };
      NewUserGuide.prototype.start = function() {
        this.reset();
      };
      NewUserGuide.prototype.registerEvent = function() {
        this.startBtn.on(cc.Node.EventType.TOUCH_END, this.onStartBtnClick, this);
        this.oneBtn.on(cc.Node.EventType.TOUCH_END, this.onOneBtnClick, this);
        this.twoBtn.on(cc.Node.EventType.TOUCH_END, this.onTwoBtnClick, this);
        this.threeBtn.on(cc.Node.EventType.TOUCH_END, this.onThreeBtnClick, this);
      };
      NewUserGuide.prototype.reset = function() {
        this.hollowOut.node.active = true;
        this.hollowOut.nodeSize();
        this.touchBlocker.passAll();
      };
      NewUserGuide.prototype.onStartBtnClick = function() {
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
      NewUserGuide.prototype.onOneBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var node, x, y;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.hollowOut.nodeSize();
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
      NewUserGuide.prototype.onTwoBtnClick = function() {
        return __awaiter(this, void 0, void 0, function() {
          var node;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.hollowOut.nodeSize();
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
      NewUserGuide.prototype.onThreeBtnClick = function() {
        this.hollowOut.nodeSize();
        this.touchBlocker.passAll();
      };
      __decorate([ property(HollowOut_1.default) ], NewUserGuide.prototype, "hollowOut", void 0);
      __decorate([ property(TouchBlocker_1.default) ], NewUserGuide.prototype, "touchBlocker", void 0);
      __decorate([ property(cc.Node) ], NewUserGuide.prototype, "startBtn", void 0);
      __decorate([ property(cc.Node) ], NewUserGuide.prototype, "oneBtn", void 0);
      __decorate([ property(cc.Node) ], NewUserGuide.prototype, "twoBtn", void 0);
      __decorate([ property(cc.Node) ], NewUserGuide.prototype, "threeBtn", void 0);
      NewUserGuide = __decorate([ ccclass ], NewUserGuide);
      return NewUserGuide;
    }(cc.Component);
    exports.default = NewUserGuide;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/TouchBlocker": "TouchBlocker",
    "../../../eazax-ccc/components/effects/HollowOut": "HollowOut"
  } ],
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
        var rect2 = node2.getBoundingBoxToWorld();
        var rect1 = node1.getBoundingBoxToWorld();
        return contains ? rect2.containsRect(rect1) : rect2.intersects(rect1);
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
        var result = null;
        if (target instanceof Date) {
          result = new Date();
          result.setTime(target.getTime());
          return result;
        }
        if (target instanceof Array) {
          result = [];
          for (var i = 0, length = target.length; i < length; i++) result[i] = this.deepCopy(target[i]);
          return result;
        }
        if (target instanceof Object) {
          result = {};
          for (var key in target) target.hasOwnProperty(key) && (result[key] = this.deepCopy(target[key]));
          return result;
        }
        console.warn("\u4e0d\u652f\u6301\u7684\u7c7b\u578b\uff1a" + result);
      };
      ObjectUtil.copy = function(target) {
        return JSON.parse(JSON.stringify(target));
      };
      return ObjectUtil;
    }();
    exports.default = ObjectUtil;
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
        _this.animDuration = .3;
        _this.blocker = null;
        _this.options = null;
        _this.finishCallback = null;
        return _this;
      }
      PopupBase.prototype.show = function(options, duration) {
        var _this = this;
        void 0 === duration && (duration = this.animDuration);
        return new Promise(function(res) {
          _this.options = options;
          var background = _this.background, main = _this.main;
          _this.node.active = true;
          background.active = true;
          background.opacity = 0;
          main.active = true;
          main.scale = .5;
          main.opacity = 0;
          _this.init(_this.options);
          _this.updateDisplay(_this.options);
          cc.tween(background).to(.8 * duration, {
            opacity: 200
          }).start();
          cc.tween(main).to(duration, {
            scale: 1,
            opacity: 255
          }, {
            easing: "backOut"
          }).call(function() {
            _this.onShow && _this.onShow();
            res();
          }).start();
        });
      };
      PopupBase.prototype.hide = function(suspended, duration) {
        var _this = this;
        void 0 === suspended && (suspended = false);
        void 0 === duration && (duration = this.animDuration);
        return new Promise(function(res) {
          var node = _this.node;
          if (0 !== duration) {
            var blocker = _this.blocker;
            if (!blocker) {
              blocker = _this.blocker = new cc.Node("blocker");
              blocker.addComponent(cc.BlockInputEvents);
              blocker.setParent(node);
              blocker.setContentSize(node.getContentSize());
            }
            blocker.active = true;
          }
          cc.tween(_this.background).delay(.2 * duration).to(.8 * duration, {
            opacity: 0
          }).start();
          cc.tween(_this.main).to(duration, {
            scale: .5,
            opacity: 0
          }, {
            easing: "backIn"
          }).call(function() {
            _this.blocker && (_this.blocker.active = false);
            node.active = false;
            _this.onHide && _this.onHide(suspended);
            res();
            _this.finishCallback && _this.finishCallback(suspended);
          }).start();
        });
      };
      PopupBase.prototype.init = function(options) {};
      PopupBase.prototype.updateDisplay = function(options) {};
      PopupBase.prototype.onShow = function() {};
      PopupBase.prototype.onHide = function(suspended) {};
      PopupBase.prototype.setFinishCallback = function(callback) {
        this.finishCallback = callback;
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
    exports.PopupCacheMode = exports.PopupShowResult = exports.PopupParams = void 0;
    var PopupBase_1 = require("../components/popups/PopupBase");
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
      PopupManager.show = function(path, options, params) {
        var _this = this;
        return new Promise(function(res) {
          return __awaiter(_this, void 0, void 0, function() {
            var node, prefab, popup, finishCallback;
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
                res(PopupShowResult.Wait);
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
                  res(PopupShowResult.Fail);
                  return [ 2 ];
                }
                node = cc.instantiate(prefab);
                _a.label = 5;

               case 5:
                popup = node.getComponent(PopupBase_1.default);
                if (!popup) {
                  cc.warn("[PopupManager]", "\u672a\u627e\u5230\u5f39\u7a97\u7ec4\u4ef6", path);
                  this._current = null;
                  res(PopupShowResult.Fail);
                  return [ 2 ];
                }
                this._current.popup = popup;
                this._current.node = node;
                node.setParent(this.container || cc.Canvas.instance.node);
                node.setSiblingIndex(cc.macro.MAX_ZINDEX);
                finishCallback = function(suspended) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var _this = this;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                       case 0:
                        if (suspended) return [ 2 ];
                        this.locked = this._suspended.length > 0 || this._queue.length > 0;
                        this.recycle(path, node, params.mode);
                        this._current = null;
                        res(PopupShowResult.Done);
                        return [ 4, new Promise(function(_res) {
                          return cc.Canvas.instance.scheduleOnce(_res, _this.interval);
                        }) ];

                       case 1:
                        _a.sent();
                        this.next();
                        return [ 2 ];
                      }
                    });
                  });
                };
                popup.setFinishCallback(finishCallback);
                popup.show(options);
                return [ 2 ];
              }
            });
          });
        });
      };
      PopupManager.hide = function() {
        var current = this._current;
        current.popup && current.popup.hide();
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
          if (cc.isValid(prefab)) return cc.instantiate(prefab);
          prefabCache.delete(path);
        }
        return null;
      };
      PopupManager.next = function() {
        this.locked = false;
        if (this._current || 0 === this._suspended.length && 0 === this._queue.length) return;
        var request = null;
        this._suspended.length > 0 ? request = this._suspended.shift() : this._queue.length > 0 && (request = this._queue.shift());
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
              return [ 4, request.popup.hide(true) ];

             case 1:
              _a.sent();
              this._current = null;
              return [ 2 ];
            }
          });
        });
      };
      PopupManager.recycle = function(path, node, mode) {
        var nodeCache = this._nodeCache;
        switch (mode) {
         case PopupCacheMode.Once:
          node.destroy();
          nodeCache.delete(path);
          this.release(path);
          break;

         case PopupCacheMode.Normal:
          node.destroy();
          nodeCache.delete(path);
          break;

         case PopupCacheMode.Frequent:
          node.removeFromParent(false);
          nodeCache.has(path) || nodeCache.set(path, node);
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
          }
          cc.resources.load(path, function(error, prefab) {
            if (error) {
              res(null);
              return;
            }
            prefabMap.set(path, prefab);
            prefab.addRef();
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
          prefabCache.delete(path);
          prefab.decRef();
          prefab = null;
        }
      };
      PopupManager.parseParams = function(params) {
        if (void 0 == params) return new PopupParams();
        if ("[object Object]" !== Object.prototype.toString.call(params)) {
          cc.warn("[PopupManager]", "\u5f39\u7a97\u53c2\u6570\u65e0\u6548\uff0c\u4f7f\u7528\u9ed8\u8ba4\u53c2\u6570");
          return new PopupParams();
        }
        void 0 == params.mode && (params.mode = PopupCacheMode.Normal);
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
      PopupManager.container = null;
      PopupManager.interval = .05;
      PopupManager.loadStartCallback = null;
      PopupManager.loadFinishCallback = null;
      return PopupManager;
    }();
    exports.default = PopupManager;
    var PopupParams = function() {
      function PopupParams() {
        this.mode = PopupCacheMode.Normal;
        this.priority = 0;
        this.immediately = false;
      }
      return PopupParams;
    }();
    exports.PopupParams = PopupParams;
    var PopupShowResult;
    (function(PopupShowResult) {
      PopupShowResult[PopupShowResult["Done"] = 1] = "Done";
      PopupShowResult[PopupShowResult["Fail"] = 2] = "Fail";
      PopupShowResult[PopupShowResult["Wait"] = 3] = "Wait";
    })(PopupShowResult = exports.PopupShowResult || (exports.PopupShowResult = {}));
    var PopupCacheMode;
    (function(PopupCacheMode) {
      PopupCacheMode[PopupCacheMode["Once"] = 1] = "Once";
      PopupCacheMode[PopupCacheMode["Normal"] = 2] = "Normal";
      PopupCacheMode[PopupCacheMode["Frequent"] = 3] = "Frequent";
    })(PopupCacheMode = exports.PopupCacheMode || (exports.PopupCacheMode = {}));
    cc._RF.pop();
  }, {
    "../components/popups/PopupBase": "PopupBase"
  } ],
  PopupTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38e54J2q41JyIOt2ki5tkk4", "PopupTest");
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
    var PopupTest = function(_super) {
      __extends(PopupTest, _super);
      function PopupTest() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btn = null;
        return _this;
      }
      PopupTest.prototype.onLoad = function() {
        this.registerEvent();
      };
      PopupTest.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      PopupTest.prototype.registerEvent = function() {
        this.btn.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      PopupTest.prototype.unregisterEvent = function() {
        this.btn.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      PopupTest.prototype.onClick = function() {
        var options = (1e4 * Math.random()).toFixed(0).padStart(5, "0");
        var params = {
          mode: PopupManager_1.PopupCacheMode.Frequent
        };
        PopupManager_1.default.show(TestPopup_1.default.path, options, params);
      };
      __decorate([ property(cc.Node) ], PopupTest.prototype, "btn", void 0);
      PopupTest = __decorate([ ccclass ], PopupTest);
      return PopupTest;
    }(cc.Component);
    exports.default = PopupTest;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/core/PopupManager": "PopupManager",
    "./TestPopup": "TestPopup"
  } ],
  PromiseUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c127O4BelOEJ0va+YPLUah", "PromiseUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PromiseUtil = function() {
      function PromiseUtil() {}
      PromiseUtil.wait = function(time) {
        return new Promise(function(res) {
          return cc.Canvas.instance.scheduleOnce(res, time);
        });
      };
      return PromiseUtil;
    }();
    exports.default = PromiseUtil;
    cc._RF.pop();
  }, {} ],
  RadarChartController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76fc5oxGitDSogggrj2rphY", "RadarChartController");
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
    var RadarChart_1 = require("../../../eazax-ccc/components/RadarChart");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RadarChartController = function(_super) {
      __extends(RadarChartController, _super);
      function RadarChartController() {
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
      RadarChartController.prototype.onLoad = function() {
        this.registerEvent();
      };
      RadarChartController.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      RadarChartController.prototype.registerEvent = function() {
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
      RadarChartController.prototype.unregisterEvent = function() {
        this.randomBtn.off(cc.Node.EventType.TOUCH_END, this.onRandomBtnClick, this);
        this.lengthEditBox.node.off("text-changed", this.onAxixLengthChanged, this);
        this.axesEditBox.node.off("text-changed", this.onAxesChanged, this);
        this.drawAxesToggle.node.off("toggle", this.onDrawAxesChanged, this);
        this.drawDataJoinToggle.node.off("toggle", this.onDrawDataJoinChanged, this);
        this.nodesEditBox.node.off("text-changed", this.onAxisScalesChanged, this);
        this.lineWidthEditBox.node.off("text-changed", this.onLineWidthChanged, this);
        this.innerLineWidthEditBox.node.off("text-changed", this.onInnerLineWidthChanged, this);
        this.data1EditBox.node.off("text-changed", this.onDataChanged, this);
        this.data2EditBox.node.off("text-changed", this.onDataChanged, this);
      };
      RadarChartController.prototype.onRandomBtnClick = function() {
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
      RadarChartController.prototype.getRandomColor = function(a) {
        var rgb = [ 205 * Math.random() + 50, 205 * Math.random() + 50, 205 * Math.random() + 50 ];
        rgb.sort(function() {
          return .5 - Math.random();
        });
        return cc.color.apply(cc, __spreadArrays(rgb, [ a ]));
      };
      RadarChartController.prototype.onAxixLengthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        (number < 10 || number > 1e3 || isNaN(number)) && (number = 300);
        this.radarChart.axisLength = number;
        editbox.string = this.radarChart.axisLength.toString();
      };
      RadarChartController.prototype.onAxesChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < 3 || isNaN(number) ? number = 3 : number > 500 && (number = 500);
        var axes = Math.floor(number);
        this.radarChart.axes = axes;
        editbox.string = this.radarChart.axes.toString();
      };
      RadarChartController.prototype.onDrawAxesChanged = function(toggle) {
        this.radarChart.drawAxes = toggle.isChecked;
      };
      RadarChartController.prototype.onDrawDataJoinChanged = function(toggle) {
        this.radarChart.drawDataJoin = toggle.isChecked;
      };
      RadarChartController.prototype.onAxisScalesChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < 1 || isNaN(number) ? number = 1 : number > 200 && (number = 200);
        var axes = Math.floor(number);
        this.radarChart.axisScales = axes;
        editbox.string = this.radarChart.axisScales.toString();
      };
      RadarChartController.prototype.onLineWidthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < .1 || isNaN(number) ? number = 4 : number > 100 && (number = 100);
        this.radarChart.gridLineWidth = number;
        editbox.string = this.radarChart.gridLineWidth.toString();
      };
      RadarChartController.prototype.onInnerLineWidthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < .1 || isNaN(number) ? number = 4 : number > 100 && (number = 100);
        this.radarChart.innerGridLineWidth = number;
        editbox.string = this.radarChart.innerGridLineWidth.toString();
      };
      RadarChartController.prototype.onDataChanged = function(editbox) {
        this.radarChart.dataValuesStrings = [ this.data1EditBox.string, this.data2EditBox.string ];
      };
      __decorate([ property(RadarChart_1.default) ], RadarChartController.prototype, "radarChart", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "timeEditBox", void 0);
      __decorate([ property(cc.Node) ], RadarChartController.prototype, "randomBtn", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "lengthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "axesEditBox", void 0);
      __decorate([ property(cc.Toggle) ], RadarChartController.prototype, "drawAxesToggle", void 0);
      __decorate([ property(cc.Toggle) ], RadarChartController.prototype, "drawDataJoinToggle", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "nodesEditBox", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "lineWidthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "innerLineWidthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "data1EditBox", void 0);
      __decorate([ property(cc.EditBox) ], RadarChartController.prototype, "data2EditBox", void 0);
      RadarChartController = __decorate([ ccclass ], RadarChartController);
      return RadarChartController;
    }(cc.Component);
    exports.default = RadarChartController;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/RadarChart": "RadarChart"
  } ],
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, executionOrder = _a.executionOrder;
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
        _this.toRes = null;
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
        var datas = [];
        for (var i = 0; i < this.dataValuesStrings.length; i++) datas.push({
          values: this.processValuesString(this.dataValuesStrings[i]),
          lineWidth: this._dataLineWidths[i] || defaultOptions.lineWidth,
          lineColor: this._dataLineColors[i] || defaultOptions.lineColor,
          fillColor: this._dataFillColors[i] || defaultOptions.fillColor,
          joinColor: this._dataJoinColors[i] || defaultOptions.joinColor
        });
        this.draw(datas);
      };
      RadarChart.prototype.processValuesString = function(valuesString) {
        var strings = valuesString.split(",");
        var values = [];
        for (var j = 0; j < strings.length; j++) {
          var value = parseFloat(strings[j]);
          values.push(isNaN(value) ? 0 : value);
        }
        return values;
      };
      RadarChart.prototype.drawBase = function() {
        this.graphics.lineWidth = this._gridLineWidth;
        this.graphics.strokeColor = this._gridLineColor;
        this.graphics.fillColor = this._gridFillColor;
        this.angles = [];
        var iAngle = 360 / this.axes;
        for (var i = 0; i < this.axes; i++) this.angles.push(iAngle * i);
        var scalesSet = [];
        var iLength = this._axisLength / this._axisScales;
        for (var i = 0; i < this._axisScales; i++) {
          var scales = [];
          var length = this._axisLength - iLength * i;
          for (var j = 0; j < this.angles.length; j++) {
            var radian = Math.PI / 180 * this.angles[j];
            scales.push(cc.v2(length * Math.cos(radian), length * Math.sin(radian)));
          }
          scalesSet.push(scales);
        }
        if (this._drawAxes) for (var i = 0; i < scalesSet[0].length; i++) {
          this.graphics.moveTo(0, 0);
          this.graphics.lineTo(scalesSet[0][i].x, scalesSet[0][i].y);
        }
        this.graphics.moveTo(scalesSet[0][0].x, scalesSet[0][0].y);
        for (var i = 1; i < scalesSet[0].length; i++) this.graphics.lineTo(scalesSet[0][i].x, scalesSet[0][i].y);
        this.graphics.close();
        this.graphics.fill();
        this.graphics.stroke();
        if (scalesSet.length > 1) {
          this.graphics.lineWidth = this._innerGridLineWidth;
          for (var i = 1; i < scalesSet.length; i++) {
            this.graphics.moveTo(scalesSet[i][0].x, scalesSet[i][0].y);
            for (var j = 1; j < scalesSet[i].length; j++) this.graphics.lineTo(scalesSet[i][j].x, scalesSet[i][j].y);
            this.graphics.close();
          }
          this.graphics.stroke();
        }
      };
      RadarChart.prototype.draw = function(data) {
        this.graphics.clear();
        this.drawBase();
        var datas = Array.isArray(data) ? data : [ data ];
        this._curDatas = datas;
        this.resizeCurDatasValues(0);
        for (var i = 0; i < datas.length; i++) {
          this.graphics.strokeColor = datas[i].lineColor || defaultOptions.lineColor;
          this.graphics.fillColor = datas[i].fillColor || defaultOptions.fillColor;
          this.graphics.lineWidth = datas[i].lineWidth || defaultOptions.lineWidth;
          var coords = [];
          for (var j = 0; j < this.axes; j++) {
            var length = (datas[i].values[j] > 1 ? 1 : datas[i].values[j]) * this.axisLength;
            var radian = Math.PI / 180 * this.angles[j];
            coords.push(cc.v2(length * Math.cos(radian), length * Math.sin(radian)));
          }
          this.graphics.moveTo(coords[0].x, coords[0].y);
          for (var j = 1; j < coords.length; j++) this.graphics.lineTo(coords[j].x, coords[j].y);
          this.graphics.close();
          this.graphics.fill();
          this.graphics.stroke();
          if (this._drawDataJoin) for (var j = 0; j < coords.length; j++) {
            this.graphics.strokeColor = datas[i].lineColor || defaultOptions.lineColor;
            this.graphics.circle(coords[j].x, coords[j].y, 2);
            this.graphics.stroke();
            this.graphics.strokeColor = datas[i].joinColor || defaultOptions.joinColor;
            this.graphics.circle(coords[j].x, coords[j].y, .65);
            this.graphics.stroke();
          }
        }
      };
      RadarChart.prototype.to = function(data, duration) {
        var _this = this;
        return new Promise(function(res) {
          var _a;
          _this.unscheduleAllCallbacks();
          _this.toRes && _this.toRes();
          _this.toRes = res;
          var datas = Array.isArray(data) ? data : [ data ];
          _this.keepUpdating = true;
          for (var i = 0; i < datas.length; i++) {
            if (!_this._curDatas[i]) continue;
            for (var j = 0; j < _this._curDatas[i].values.length; j++) cc.tween(_this._curDatas[i].values).to(duration, (_a = {}, 
            _a[j] = datas[i].values[j] > 1 ? 1 : datas[i].values[j], _a)).start();
            cc.tween(_this._curDatas[i]).to(duration, {
              lineWidth: datas[i].lineWidth || _this._curDatas[i].lineWidth,
              lineColor: datas[i].lineColor || _this._curDatas[i].lineColor,
              fillColor: datas[i].fillColor || _this._curDatas[i].fillColor,
              joinColor: datas[i].joinColor || _this._curDatas[i].joinColor
            }).start();
          }
          _this.scheduleOnce(function() {
            _this.keepUpdating = false;
            _this.toRes();
            _this.toRes = null;
          }, duration);
        });
      };
      RadarChart.prototype.resizeCurDatasValues = function(fill) {
        void 0 === fill && (fill = 0);
        for (var i = 0; i < this._curDatas.length; i++) if (this._curDatas[i].values.length < this._axes) {
          var diff = this._axes - this._curDatas[i].values.length;
          for (var j = 0; j < diff; j++) this._curDatas[i].values.push(fill);
        }
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], RadarChart.prototype, "target", void 0);
      __decorate([ property ], RadarChart.prototype, "_axisLength", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "axisLength", null);
      __decorate([ property ], RadarChart.prototype, "_axes", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "axes", null);
      __decorate([ property ], RadarChart.prototype, "_axisScales", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "axisScales", null);
      __decorate([ property ], RadarChart.prototype, "_drawAxes", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "drawAxes", null);
      __decorate([ property ], RadarChart.prototype, "_gridLineWidth", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "gridLineWidth", null);
      __decorate([ property ], RadarChart.prototype, "_innerGridLineWidth", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "innerGridLineWidth", null);
      __decorate([ property ], RadarChart.prototype, "_gridLineColor", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "gridLineColor", null);
      __decorate([ property ], RadarChart.prototype, "_gridFillColor", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "gridFillColor", null);
      __decorate([ property ], RadarChart.prototype, "_dataValuesStrings", void 0);
      __decorate([ property({
        type: [ cc.String ],
        tooltip: false
      }) ], RadarChart.prototype, "dataValuesStrings", null);
      __decorate([ property ], RadarChart.prototype, "_dataLineWidths", void 0);
      __decorate([ property({
        type: [ cc.Integer ],
        tooltip: false
      }) ], RadarChart.prototype, "dataLineWidths", null);
      __decorate([ property ], RadarChart.prototype, "_dataLineColors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], RadarChart.prototype, "dataLineColors", null);
      __decorate([ property ], RadarChart.prototype, "_dataFillColors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], RadarChart.prototype, "dataFillColors", null);
      __decorate([ property ], RadarChart.prototype, "_dataJoinColors", void 0);
      __decorate([ property({
        type: [ cc.Color ],
        tooltip: false
      }) ], RadarChart.prototype, "dataJoinColors", null);
      __decorate([ property ], RadarChart.prototype, "_drawDataJoin", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RadarChart.prototype, "drawDataJoin", null);
      RadarChart = __decorate([ ccclass, executeInEditMode, executionOrder(-10) ], RadarChart);
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
  ResPopupItemInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16c3cfuVoNGu461eBK2NvRw", "ResPopupItemInfo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResPopupItemInfo = function() {
      function ResPopupItemInfo() {
        this.title = "";
        this.url = "";
      }
      __decorate([ property() ], ResPopupItemInfo.prototype, "title", void 0);
      __decorate([ property() ], ResPopupItemInfo.prototype, "url", void 0);
      ResPopupItemInfo = __decorate([ ccclass("ResPopupItemInfo") ], ResPopupItemInfo);
      return ResPopupItemInfo;
    }();
    exports.default = ResPopupItemInfo;
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
        this.typeLabel.string = SymbolMap[extname] || "\ud83d\udce6";
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
        var count = Math.max(options.items.length, this.items.length);
        for (var i = 0; i < count; i++) if (options.items[i] && !this.items[i]) {
          var node = cc.instantiate(this.item);
          node.setParent(this.content);
          var item = node.getComponent(ResPopupItem_1.default);
          item.set(options.items[i].name, options.items[i].url);
          item.node.active = true;
          this.items.push(item);
        } else if (options.items[i] && this.items[i]) {
          var item = this.items[i];
          item.set(options.items[i].name, options.items[i].url);
          item.node.active = true;
        } else this.items[i].node.active = false;
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
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
        target && (this.target = target);
        clockwise && (this.clockwise = clockwise);
        timePerRound && (this.timePerRound = timePerRound);
        faceToTarget && (this.faceToTarget = faceToTarget);
        faceAxis && (this.faceAxis = faceAxis);
        if (!this.target) return cc.log("No target!");
        this.angle = this.getAngle(this.target.getPosition(), this.node.getPosition());
        this.radius = this.getDistance(this.target.getPosition(), this.node.getPosition());
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
        tooltip: false,
        visible: function() {
          return this.faceToTarget;
        }
      }) ], RotateAround.prototype, "faceAxis", void 0);
      __decorate([ property({
        tooltip: false
      }) ], RotateAround.prototype, "autoStart", void 0);
      RotateAround = __decorate([ ccclass ], RotateAround);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var ccclass = cc._decorator.ccclass;
    var RunInBackground = function(_super) {
      __extends(RunInBackground, _super);
      function RunInBackground() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.worker = null;
        _this.url = "Worker.js";
        return _this;
      }
      RunInBackground.prototype.onLoad = function() {
        var _this = this;
        true;
        this.url = "app/editor/static/preview-templates/Worker.js";
        document.addEventListener("visibilitychange", function() {
          if ("hidden" === document.visibilityState) {
            cc.game["_paused"] && cc.game["resume"]();
            _this.worker = new Worker(_this.url);
            _this.worker.onmessage = function() {
              cc.director["mainLoop"]();
            };
          } else "visible" === document.visibilityState && _this.worker && _this.worker.terminate();
        });
      };
      RunInBackground = __decorate([ ccclass ], RunInBackground);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var Events_1 = require("../constants/Events");
    var ccclass = cc._decorator.ccclass;
    var ScreenAdapter = function(_super) {
      __extends(ScreenAdapter, _super);
      function ScreenAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ScreenAdapter.prototype.onLoad = function() {
        var _this = this;
        cc.view.setResizeCallback(function() {
          return _this.onResize();
        });
      };
      ScreenAdapter.prototype.start = function() {
        this.adapt();
      };
      ScreenAdapter.prototype.onResize = function() {
        EventManager_1.default.emit(Events_1.VIEW_RESIZE);
        this.adapt();
      };
      ScreenAdapter.prototype.adapt = function() {
        var screenRatio = cc.winSize.width / cc.winSize.height;
        var designRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;
        screenRatio <= 1 && screenRatio <= designRatio ? this.setFitWidth() : this.setFitHeight();
      };
      ScreenAdapter.prototype.setFitHeight = function() {
        cc.Canvas.instance.fitHeight = true;
        cc.Canvas.instance.fitWidth = false;
      };
      ScreenAdapter.prototype.setFitWidth = function() {
        cc.Canvas.instance.fitHeight = false;
        cc.Canvas.instance.fitWidth = true;
      };
      ScreenAdapter = __decorate([ ccclass ], ScreenAdapter);
      return ScreenAdapter;
    }(cc.Component);
    exports.default = ScreenAdapter;
    cc._RF.pop();
  }, {
    "../constants/Events": "Events",
    "../core/EventManager": "EventManager"
  } ],
  SineWaveController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d11caHtQJRPOKyBXwLEJ8Bc", "SineWaveController");
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
    var SineWaveController = function(_super) {
      __extends(SineWaveController, _super);
      function SineWaveController() {
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
      SineWaveController.prototype.onLoad = function() {
        this.registerEvent();
      };
      SineWaveController.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      SineWaveController.prototype.registerEvent = function() {
        this.fillBtn.on(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
        this.amplitudeEditBox.node.on("text-changed", this.onAmplitudeChanged, this);
        this.angularVelocityEditBox.node.on("text-changed", this.onAngularVelocityChanged, this);
        this.frequencyEditBox.node.on("text-changed", this.onFrequencyChanged, this);
        this.heightEditBox.node.on("text-changed", this.onHeightChanged, this);
        this.toLeftToggle.node.on("toggle", this.onToLeftChanged, this);
      };
      SineWaveController.prototype.unregisterEvent = function() {
        this.fillBtn.off(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
      };
      SineWaveController.prototype.onFillBtnClick = function() {
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
      SineWaveController.prototype.onAmplitudeChanged = function(editbox) {
        this.sineWave.amplitude = parseFloat(editbox.string);
      };
      SineWaveController.prototype.onAngularVelocityChanged = function(editbox) {
        this.sineWave.angularVelocity = parseFloat(editbox.string);
      };
      SineWaveController.prototype.onFrequencyChanged = function(editbox) {
        this.sineWave.frequency = parseFloat(editbox.string);
      };
      SineWaveController.prototype.onHeightChanged = function(editbox) {
        this.sineWave.height = parseFloat(editbox.string);
      };
      SineWaveController.prototype.onToLeftChanged = function(toggle) {
        this.sineWave.direction = toggle.isChecked ? SineWave_1.SineWaveDirection.Left : SineWave_1.SineWaveDirection.Right;
      };
      __decorate([ property(SineWave_1.default) ], SineWaveController.prototype, "sineWave", void 0);
      __decorate([ property(cc.Node) ], SineWaveController.prototype, "fillBtn", void 0);
      __decorate([ property(cc.EditBox) ], SineWaveController.prototype, "amplitudeEditBox", void 0);
      __decorate([ property(cc.EditBox) ], SineWaveController.prototype, "angularVelocityEditBox", void 0);
      __decorate([ property(cc.EditBox) ], SineWaveController.prototype, "frequencyEditBox", void 0);
      __decorate([ property(cc.EditBox) ], SineWaveController.prototype, "heightEditBox", void 0);
      __decorate([ property(cc.Toggle) ], SineWaveController.prototype, "toLeftToggle", void 0);
      SineWaveController = __decorate([ ccclass ], SineWaveController);
      return SineWaveController;
    }(cc.Component);
    exports.default = SineWaveController;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/effects/SineWave": "SineWave",
    "../../../eazax-ccc/components/tweens/JellyTween": "JellyTween"
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
        var dataString = "object" === typeof value ? JSON.stringify(value) : value;
        cc.sys.localStorage.setItem(key, dataString);
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
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
          mode: PopupManager_1.PopupCacheMode.Normal,
          priority: 0
        };
        PopupManager_1.default.show(TestPopup_1.path, this.newFlag, params);
        this.updateFlag();
      };
      TestPopup.prototype.onPriorityBtnClick = function() {
        var params = {
          mode: PopupManager_1.PopupCacheMode.Normal,
          priority: -1
        };
        PopupManager_1.default.show(TestPopup_1.path, this.newFlag, params);
        this.updateFlag();
      };
      TestPopup.prototype.onImmediatelyBtnClick = function() {
        var params = {
          mode: PopupManager_1.PopupCacheMode.Normal,
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
  Test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "919f1iDvJpK1bqzNi6SlZXI", "Test");
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
      Toast.prototype.start = function() {
        this.reset();
      };
      Toast.prototype.onDestroy = function() {
        this.release();
      };
      Toast.prototype.init = function() {
        cc.game.addPersistRootNode(this.node);
        Toast_1.instance = this;
      };
      Toast.prototype.release = function() {
        Toast_1.instance = null;
      };
      Toast.prototype.reset = function() {
        this.main.active = false;
      };
      Toast.show = function() {
        var _this = this;
        var texts = [];
        for (var _i = 0; _i < arguments.length; _i++) texts[_i] = arguments[_i];
        return new Promise(function(res) {
          var instance = _this.instance;
          if (!instance) {
            res();
            return;
          }
          var main = instance.main, label = instance.label;
          cc.Tween.stopAllByTarget(main);
          main.opacity = 0;
          main.active = true;
          label.string = texts.join(" ");
          cc.tween(main).to(.2, {
            opacity: 200
          }).delay(2).to(.2, {
            opacity: 0
          }).set({
            active: false
          }).call(res).start();
        });
      };
      var Toast_1;
      Toast.instance = null;
      __decorate([ property({
        displayName: false,
        type: cc.Node
      }) ], Toast.prototype, "main", void 0);
      __decorate([ property({
        displayName: false,
        type: cc.Label
      }) ], Toast.prototype, "label", void 0);
      Toast = Toast_1 = __decorate([ ccclass, executionOrder(-101) ], Toast);
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
  }, {} ]
}, {}, [ "CardArray_Card", "CardArray_CardArray", "CardArray_CardLayout", "CardArray_Content", "CardArray_UI", "CardFlip", "FrameLoading", "NewUserGuide", "PopupTest", "TestPopup", "RadarChartController", "SineWaveController", "BackgroundFitter", "Counter", "LongPress", "Marquee", "RadarChart", "RotateAround", "RunInBackground", "ScreenAdapter", "Subtitle", "TouchBlocker", "TouchBlocker2", "ColorBrush", "GaussianBlur", "HollowOut", "SineWave", "LocalizationBase", "LocalizationLabelString", "LocalizationSpriteFrame", "ConfirmPopup", "PopupBase", "GradientColor", "BounceMoveTween", "BounceScaleTween", "JellyTween", "Events", "AudioPlayer", "EventManager", "InstanceEvent", "NetworkManager", "PoolManager", "PopupManager", "ResourceManager", "SceneNavigator", "eazax", "extension", "EditorAsset", "ArrayUtil", "BrowserUtil", "DebugUtil", "DeviceUtil", "ImageUtil", "MathUtil", "NodeUtil", "ObjectUtil", "PromiseUtil", "RegexUtil", "StorageUtil", "TimeUtil", "TweenUtil", "CaseManager", "ClickToLoadUrl", "ClickToShowResPopup", "CommonUI", "LoadingTip", "Toast", "ResPopup", "ResPopupItem", "ResPopupItemInfo", "Constants", "CustomEvents", "Home", "Home_Content", "Home_UI", "Home_CaseBtn", "Home_CaseList", "Test" ]);