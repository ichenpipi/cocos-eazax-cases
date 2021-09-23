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
  AfterEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13bb6FawLtHzph91dUR2qSA", "AfterEffect");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, executeInEditMode = _a.executeInEditMode;
    var AfterEffect = function(_super) {
      __extends(AfterEffect, _super);
      function AfterEffect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.targetSprite = null;
        _this.targetTexture = null;
        return _this;
      }
      AfterEffect.prototype.onLoad = function() {
        this.init();
        this.registerEvent();
      };
      AfterEffect.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      AfterEffect.prototype.registerEvent = function() {
        cc.Canvas.instance.node.on(cc.Node.EventType.SIZE_CHANGED, this.onCanvasSizeChanged, this);
      };
      AfterEffect.prototype.unregisterEvent = function() {
        cc.Canvas.instance.node.off(cc.Node.EventType.SIZE_CHANGED, this.onCanvasSizeChanged, this);
      };
      AfterEffect.prototype.init = function() {
        var texture = this.targetTexture = new cc.RenderTexture();
        var size = cc.view.getVisibleSizeInPixel();
        texture.initWithSize(size.width, size.height);
        this.camera.targetTexture = texture;
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        this.targetSprite.spriteFrame = spriteFrame;
        var scale = Math.abs(this.targetSprite.node.scaleY);
        this.targetSprite.node.scaleY = -scale;
      };
      AfterEffect.prototype.onCanvasSizeChanged = function() {
        var size = cc.view.getVisibleSizeInPixel();
        this.targetTexture.updateSize(size.width, size.height);
      };
      __decorate([ property({
        type: cc.Camera,
        tooltip: false
      }) ], AfterEffect.prototype, "camera", void 0);
      __decorate([ property({
        type: cc.Sprite,
        tooltip: false
      }) ], AfterEffect.prototype, "targetSprite", void 0);
      AfterEffect = __decorate([ ccclass, executionOrder(-10), executeInEditMode ], AfterEffect);
      return AfterEffect;
    }(cc.Component);
    exports.default = AfterEffect;
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, help = _a.help;
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
        _this.tweenRes = null;
        _this.tween = null;
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
          _this.tweenRes = res;
          _this.tween = cc.tween(_this).to(duration, {
            progress: progress
          }).call(function() {
            _this.tween = null;
            _this.tweenRes = null;
          }).call(res).start();
        });
      };
      ArcProgressBar.prototype.stop = function() {
        if (this.tween) {
          this.tween.stop();
          this.tween = null;
        }
        if (this.tweenRes) {
          this.tweenRes();
          this.tweenRes = null;
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
      ArcProgressBar = __decorate([ ccclass, requireComponent(cc.Graphics), executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/ArcProgressBar.ts") ], ArcProgressBar);
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
      afterEffect: {
        name: "\u540e\u671f\u7279\u6548",
        scene: "afterEffect"
      },
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
      cardArrayFlip: {
        name: "\u5361\u7247\u9635\u5217 & \u7ffb\u8f6c",
        scene: "cardArrayFlip"
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
      radarChart: {
        name: "\u96f7\u8fbe\u56fe",
        scene: "radarChart"
      },
      rotateAround: {
        name: "\u56f4\u7ed5\u65cb\u8f6c",
        scene: "rotateAround"
      },
      sineWave: {
        name: "\u6b63\u5f26\u6ce2\u6d6a",
        scene: "sineWave"
      },
      arcProgressBar: {
        name: "\u5f27\u5f62\u8fdb\u5ea6\u6761",
        scene: "arcProgressBar"
      },
      remoteAsset: {
        name: "\u8fdc\u7a0b\u8d44\u6e90",
        scene: "remoteAsset"
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
      CaseLoading.prototype.start = function() {
        this.reset();
      };
      CaseLoading.prototype.init = function() {
        cc.game.addPersistRootNode(this.node);
        CaseLoading_1.instance = this;
      };
      CaseLoading.prototype.reset = function() {
        CaseLoading_1.hide();
      };
      CaseLoading.show = function() {
        var node = this.instance.main;
        node.opacity = 0;
        node.active = true;
        cc.tween(node).to(.2, {
          opacity: 255
        }).start();
      };
      CaseLoading.hide = function() {
        var node = this.instance.main;
        cc.tween(node).to(.05, {
          opacity: 0
        }).call(function() {
          return node.active = false;
        }).start();
      };
      var CaseLoading_1;
      CaseLoading.instance = null;
      __decorate([ property({
        type: cc.Node,
        tooltip: false
      }) ], CaseLoading.prototype, "main", void 0);
      CaseLoading = CaseLoading_1 = __decorate([ ccclass, executionOrder(-100) ], CaseLoading);
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
    var CaseLoading_1 = require("./components/CaseLoading");
    var Toast_1 = require("./components/Toast");
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
    "./components/CaseLoading": "CaseLoading",
    "./components/Toast": "Toast",
    "./constants/Constants": "Constants",
    "./constants/CustomEvents": "CustomEvents"
  } ],
  Case_AfterEffect_Controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d24fVSWGlC2KYSdGaaOGpu", "Case_AfterEffect_Controller");
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
    var Case_AfterEffect_Controller = function(_super) {
      __extends(Case_AfterEffect_Controller, _super);
      function Case_AfterEffect_Controller() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.grayMaterial = null;
        _this.mosaic = null;
        _this.normalBtn = null;
        _this.grayBtn = null;
        _this.mosaicBtn = null;
        _this.normalMaterial = cc.Material.getBuiltinMaterial("2d-sprite");
        return _this;
      }
      Case_AfterEffect_Controller.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_AfterEffect_Controller.prototype.registerEvent = function() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.grayBtn.on(cc.Node.EventType.TOUCH_END, this.onGrayBtnClick, this);
        this.mosaicBtn.on(cc.Node.EventType.TOUCH_END, this.onMosaicBtnClick, this);
      };
      Case_AfterEffect_Controller.prototype.onNormalBtnClick = function() {
        this.mosaic.enabled = false;
        this.sprite.setMaterial(0, this.normalMaterial);
      };
      Case_AfterEffect_Controller.prototype.onGrayBtnClick = function() {
        this.mosaic.enabled = false;
        this.sprite.setMaterial(0, this.grayMaterial);
      };
      Case_AfterEffect_Controller.prototype.onMosaicBtnClick = function() {
        var mosaic = this.mosaic;
        mosaic.enabled = true;
        mosaic.init();
        mosaic.set(0, 0);
        mosaic.to(15, 15, .5);
      };
      __decorate([ property(cc.Sprite) ], Case_AfterEffect_Controller.prototype, "sprite", void 0);
      __decorate([ property(cc.Material) ], Case_AfterEffect_Controller.prototype, "grayMaterial", void 0);
      __decorate([ property(Mosaic_1.default) ], Case_AfterEffect_Controller.prototype, "mosaic", void 0);
      __decorate([ property(cc.Node) ], Case_AfterEffect_Controller.prototype, "normalBtn", void 0);
      __decorate([ property(cc.Node) ], Case_AfterEffect_Controller.prototype, "grayBtn", void 0);
      __decorate([ property(cc.Node) ], Case_AfterEffect_Controller.prototype, "mosaicBtn", void 0);
      Case_AfterEffect_Controller = __decorate([ ccclass ], Case_AfterEffect_Controller);
      return Case_AfterEffect_Controller;
    }(cc.Component);
    exports.default = Case_AfterEffect_Controller;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/effects/Mosaic": "Mosaic"
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
    var ArcProgressBar_1 = require("../../../eazax-ccc/components/ArcProgressBar");
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
        this.play1();
        this.play2();
        this.play3();
        this.play4();
        this.play5();
      };
      Case_ArcProgressBar.prototype.play1 = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              !1;
              this.progressBar1.progress = 0;
              return [ 4, this.progressBar1.to(2.5, 1) ];

             case 1:
              _a.sent();
              return [ 3, 0 ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      Case_ArcProgressBar.prototype.play2 = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              !1;
              this.progressBar2.progress = 0;
              return [ 4, this.progressBar2.to(2.5, 1) ];

             case 1:
              _a.sent();
              return [ 3, 0 ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      Case_ArcProgressBar.prototype.play3 = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              !1;
              this.progressBar3.progress = 0;
              return [ 4, this.progressBar3.to(2.5, 1) ];

             case 1:
              _a.sent();
              return [ 3, 0 ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      Case_ArcProgressBar.prototype.play4 = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              !1;
              this.progressBar4.progress = 0;
              return [ 4, this.progressBar4.to(2.5, 1) ];

             case 1:
              _a.sent();
              return [ 3, 0 ];

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      Case_ArcProgressBar.prototype.play5 = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              !1;
              this.progressBar5.progress = 0;
              return [ 4, this.progressBar5.to(2.5, 1) ];

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
    "../../../eazax-ccc/components/ArcProgressBar": "ArcProgressBar"
  } ],
  Case_CardArrayFlip_Controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afb23B4XMJC+5DoKNtwVyh1", "Case_CardArrayFlip_Controller");
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
    var Case_CardArrayFlip_Controller = function(_super) {
      __extends(Case_CardArrayFlip_Controller, _super);
      function Case_CardArrayFlip_Controller() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.cardNode = null;
        _this.card = null;
        return _this;
      }
      Object.defineProperty(Case_CardArrayFlip_Controller.prototype, "frontArrayCard", {
        get: function() {
          return this.container.children[this.container.childrenCount - 1];
        },
        enumerable: false,
        configurable: true
      });
      Case_CardArrayFlip_Controller.prototype.onLoad = function() {
        this.init();
      };
      Case_CardArrayFlip_Controller.prototype.init = function() {
        this.card = this.cardNode.getComponent(CardArrayFlip_FrontCardBase_1.default);
        this.play();
      };
      Case_CardArrayFlip_Controller.prototype.play = function() {
        return __awaiter(this, void 0, void 0, function() {
          var frontCard;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              frontCard = this.card;
              return [ 4, this.rotate(2) ];

             case 1:
              _a.sent();
              return [ 4, PromiseUtil_1.default.wait(.2) ];

             case 2:
              _a.sent();
              frontCard.show();
              this.frontArrayCard.active = false;
              return [ 4, frontCard.flipToFront() ];

             case 3:
              _a.sent();
              return [ 4, PromiseUtil_1.default.wait(2) ];

             case 4:
              _a.sent();
              return [ 4, frontCard.flipToBack() ];

             case 5:
              _a.sent();
              this.frontArrayCard.active = true;
              frontCard.hide();
              return [ 4, PromiseUtil_1.default.wait(.2) ];

             case 6:
              _a.sent();
              this.play();
              return [ 2 ];
            }
          });
        });
      };
      Case_CardArrayFlip_Controller.prototype.rotate = function(round) {
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
      __decorate([ property(cc.Node) ], Case_CardArrayFlip_Controller.prototype, "container", void 0);
      __decorate([ property(cc.Node) ], Case_CardArrayFlip_Controller.prototype, "cardNode", void 0);
      Case_CardArrayFlip_Controller = __decorate([ ccclass ], Case_CardArrayFlip_Controller);
      return Case_CardArrayFlip_Controller;
    }(cc.Component);
    exports.default = Case_CardArrayFlip_Controller;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/utils/PromiseUtil": "PromiseUtil",
    "./CardArrayFlip_FrontCardBase": "CardArrayFlip_FrontCardBase"
  } ],
  Case_CardArray_Controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b03eeW/0L9M85qS0tEmzZyL", "Case_CardArray_Controller");
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
    var Case_CardArray_Controller = function(_super) {
      __extends(Case_CardArray_Controller, _super);
      function Case_CardArray_Controller() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.container = null;
        return _this;
      }
      Case_CardArray_Controller.prototype.start = function() {
        this.rotateForever();
      };
      Case_CardArray_Controller.prototype.rotateForever = function() {
        var node = this.container, _a = this.node.eulerAngles, x = _a.x, z = _a.z;
        cc.tween(node).by(2, {
          eulerAngles: cc.v3(x, 90, z)
        }).repeatForever().start();
      };
      __decorate([ property(cc.Node) ], Case_CardArray_Controller.prototype, "container", void 0);
      Case_CardArray_Controller = __decorate([ ccclass ], Case_CardArray_Controller);
      return Case_CardArray_Controller;
    }(cc.Component);
    exports.default = Case_CardArray_Controller;
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
        this.loadByFrame();
      };
      Case_FrameLoading.prototype.clear = function() {
        this.unscheduleAllCallbacks();
        this.content.destroyAllChildren();
      };
      Case_FrameLoading.prototype.addItem = function(index) {
        var node = cc.instantiate(this.itemPrefab);
        node.setParent(this.content);
        node.getComponentInChildren(cc.Label).string = "" + (index + 1);
        node.active = true;
      };
      Case_FrameLoading.prototype.loadAtOnce = function() {
        var total = 2e3;
        for (var i = 0; i < total; i++) this.addItem(i);
      };
      Case_FrameLoading.prototype.loadByFrame = function() {
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
  Case_MultiPassKawaseBlur: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34be8PeFuJCYYl8asjkccOr", "Case_MultiPassKawaseBlur");
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
    var Case_MultiPassKawaseBlur = function(_super) {
      __extends(Case_MultiPassKawaseBlur, _super);
      function Case_MultiPassKawaseBlur() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite0 = null;
        _this.sprite1 = null;
        _this.sprite2 = null;
        _this.sprite3 = null;
        return _this;
      }
      Case_MultiPassKawaseBlur.prototype.onLoad = function() {};
      __decorate([ property(cc.Sprite) ], Case_MultiPassKawaseBlur.prototype, "sprite0", void 0);
      __decorate([ property(cc.Sprite) ], Case_MultiPassKawaseBlur.prototype, "sprite1", void 0);
      __decorate([ property(cc.Sprite) ], Case_MultiPassKawaseBlur.prototype, "sprite2", void 0);
      __decorate([ property(cc.Sprite) ], Case_MultiPassKawaseBlur.prototype, "sprite3", void 0);
      Case_MultiPassKawaseBlur = __decorate([ ccclass ], Case_MultiPassKawaseBlur);
      return Case_MultiPassKawaseBlur;
    }(cc.Component);
    exports.default = Case_MultiPassKawaseBlur;
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
  Case_PopupTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38e54J2q41JyIOt2ki5tkk4", "Case_PopupTest");
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
    var Case_PopupTest = function(_super) {
      __extends(Case_PopupTest, _super);
      function Case_PopupTest() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btn = null;
        return _this;
      }
      Case_PopupTest.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_PopupTest.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Case_PopupTest.prototype.registerEvent = function() {
        this.btn.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Case_PopupTest.prototype.unregisterEvent = function() {
        this.btn.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      Case_PopupTest.prototype.onClick = function() {
        var options = (1e4 * Math.random()).toFixed(0).padStart(5, "0");
        var params = {
          mode: PopupManager_1.default.CacheMode.Frequent
        };
        PopupManager_1.default.show(TestPopup_1.default.path, options, params);
      };
      __decorate([ property(cc.Node) ], Case_PopupTest.prototype, "btn", void 0);
      Case_PopupTest = __decorate([ ccclass ], Case_PopupTest);
      return Case_PopupTest;
    }(cc.Component);
    exports.default = Case_PopupTest;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/core/PopupManager": "PopupManager",
    "./TestPopup": "TestPopup"
  } ],
  Case_RadarChart_Controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76fc5oxGitDSogggrj2rphY", "Case_RadarChart_Controller");
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
    var Case_RadarChart_Controller = function(_super) {
      __extends(Case_RadarChart_Controller, _super);
      function Case_RadarChart_Controller() {
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
      Case_RadarChart_Controller.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_RadarChart_Controller.prototype.registerEvent = function() {
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
      Case_RadarChart_Controller.prototype.onRandomBtnClick = function() {
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
      Case_RadarChart_Controller.prototype.getRandomColor = function(a) {
        var rgb = [ 205 * Math.random() + 50, 205 * Math.random() + 50, 205 * Math.random() + 50 ];
        rgb.sort(function() {
          return .5 - Math.random();
        });
        return cc.color.apply(cc, __spreadArrays(rgb, [ a ]));
      };
      Case_RadarChart_Controller.prototype.onAxixLengthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        (number < 10 || number > 1e3 || isNaN(number)) && (number = 300);
        this.radarChart.axisLength = number;
        editbox.string = this.radarChart.axisLength.toString();
      };
      Case_RadarChart_Controller.prototype.onAxesChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < 3 || isNaN(number) ? number = 3 : number > 500 && (number = 500);
        var axes = Math.floor(number);
        this.radarChart.axes = axes;
        editbox.string = this.radarChart.axes.toString();
      };
      Case_RadarChart_Controller.prototype.onDrawAxesChanged = function(toggle) {
        this.radarChart.drawAxes = toggle.isChecked;
      };
      Case_RadarChart_Controller.prototype.onDrawDataJoinChanged = function(toggle) {
        this.radarChart.drawDataJoin = toggle.isChecked;
      };
      Case_RadarChart_Controller.prototype.onAxisScalesChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < 1 || isNaN(number) ? number = 1 : number > 200 && (number = 200);
        var axes = Math.floor(number);
        this.radarChart.axisScales = axes;
        editbox.string = this.radarChart.axisScales.toString();
      };
      Case_RadarChart_Controller.prototype.onLineWidthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < .1 || isNaN(number) ? number = 4 : number > 100 && (number = 100);
        this.radarChart.gridLineWidth = number;
        editbox.string = this.radarChart.gridLineWidth.toString();
      };
      Case_RadarChart_Controller.prototype.onInnerLineWidthChanged = function(editbox) {
        var number = parseFloat(editbox.string);
        number < .1 || isNaN(number) ? number = 4 : number > 100 && (number = 100);
        this.radarChart.innerGridLineWidth = number;
        editbox.string = this.radarChart.innerGridLineWidth.toString();
      };
      Case_RadarChart_Controller.prototype.onDataChanged = function(editbox) {
        this.radarChart.dataValuesStrings = [ this.data1EditBox.string, this.data2EditBox.string ];
      };
      __decorate([ property(RadarChart_1.default) ], Case_RadarChart_Controller.prototype, "radarChart", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "timeEditBox", void 0);
      __decorate([ property(cc.Node) ], Case_RadarChart_Controller.prototype, "randomBtn", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "lengthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "axesEditBox", void 0);
      __decorate([ property(cc.Toggle) ], Case_RadarChart_Controller.prototype, "drawAxesToggle", void 0);
      __decorate([ property(cc.Toggle) ], Case_RadarChart_Controller.prototype, "drawDataJoinToggle", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "nodesEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "lineWidthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "innerLineWidthEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "data1EditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_RadarChart_Controller.prototype, "data2EditBox", void 0);
      Case_RadarChart_Controller = __decorate([ ccclass ], Case_RadarChart_Controller);
      return Case_RadarChart_Controller;
    }(cc.Component);
    exports.default = Case_RadarChart_Controller;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/RadarChart": "RadarChart"
  } ],
  Case_RemoteAsset: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0ec25lOqhIsqGiy45GyU0v", "Case_RemoteAsset");
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
    var Toast_1 = require("../../../scripts/common/components/Toast");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Case_RemoteAsset = function(_super) {
      __extends(Case_RemoteAsset, _super);
      function Case_RemoteAsset() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.remoteTexture = null;
        _this.remoteTextureEditorBox = null;
        return _this;
      }
      Case_RemoteAsset.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_RemoteAsset.prototype.start = function() {
        this.reloadTexture();
      };
      Case_RemoteAsset.prototype.registerEvent = function() {
        this.remoteTextureEditorBox.node.on("editing-did-ended", this.onRemoteTextureEditorBoxEnded, this);
      };
      Case_RemoteAsset.prototype.onRemoteTextureEditorBoxEnded = function(editorBox) {
        this.reloadTexture();
      };
      Case_RemoteAsset.prototype.reloadTexture = function() {
        return __awaiter(this, void 0, void 0, function() {
          var url, result;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              url = this.remoteTextureEditorBox.string;
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
      __decorate([ property(RemoteTexture_1.default) ], Case_RemoteAsset.prototype, "remoteTexture", void 0);
      __decorate([ property(cc.EditBox) ], Case_RemoteAsset.prototype, "remoteTextureEditorBox", void 0);
      Case_RemoteAsset = __decorate([ ccclass ], Case_RemoteAsset);
      return Case_RemoteAsset;
    }(cc.Component);
    exports.default = Case_RemoteAsset;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/components/remote/RemoteTexture": "RemoteTexture",
    "../../../scripts/common/components/Toast": "Toast"
  } ],
  Case_SineWave_Controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d11caHtQJRPOKyBXwLEJ8Bc", "Case_SineWave_Controller");
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
    var Case_SineWave_Controller = function(_super) {
      __extends(Case_SineWave_Controller, _super);
      function Case_SineWave_Controller() {
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
      Case_SineWave_Controller.prototype.onLoad = function() {
        this.registerEvent();
      };
      Case_SineWave_Controller.prototype.onDestroy = function() {
        this.unregisterEvent();
      };
      Case_SineWave_Controller.prototype.registerEvent = function() {
        this.fillBtn.on(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
        this.amplitudeEditBox.node.on("text-changed", this.onAmplitudeChanged, this);
        this.angularVelocityEditBox.node.on("text-changed", this.onAngularVelocityChanged, this);
        this.frequencyEditBox.node.on("text-changed", this.onFrequencyChanged, this);
        this.heightEditBox.node.on("text-changed", this.onHeightChanged, this);
        this.toLeftToggle.node.on("toggle", this.onToLeftChanged, this);
      };
      Case_SineWave_Controller.prototype.unregisterEvent = function() {
        this.fillBtn.off(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
      };
      Case_SineWave_Controller.prototype.onFillBtnClick = function() {
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
      Case_SineWave_Controller.prototype.onAmplitudeChanged = function(editbox) {
        this.sineWave.amplitude = parseFloat(editbox.string);
      };
      Case_SineWave_Controller.prototype.onAngularVelocityChanged = function(editbox) {
        this.sineWave.angularVelocity = parseFloat(editbox.string);
      };
      Case_SineWave_Controller.prototype.onFrequencyChanged = function(editbox) {
        this.sineWave.frequency = parseFloat(editbox.string);
      };
      Case_SineWave_Controller.prototype.onHeightChanged = function(editbox) {
        this.sineWave.height = parseFloat(editbox.string);
      };
      Case_SineWave_Controller.prototype.onToLeftChanged = function(toggle) {
        this.sineWave.direction = toggle.isChecked ? SineWave_1.SineWaveDirection.Left : SineWave_1.SineWaveDirection.Right;
      };
      __decorate([ property(SineWave_1.default) ], Case_SineWave_Controller.prototype, "sineWave", void 0);
      __decorate([ property(cc.Node) ], Case_SineWave_Controller.prototype, "fillBtn", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave_Controller.prototype, "amplitudeEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave_Controller.prototype, "angularVelocityEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave_Controller.prototype, "frequencyEditBox", void 0);
      __decorate([ property(cc.EditBox) ], Case_SineWave_Controller.prototype, "heightEditBox", void 0);
      __decorate([ property(cc.Toggle) ], Case_SineWave_Controller.prototype, "toLeftToggle", void 0);
      Case_SineWave_Controller = __decorate([ ccclass ], Case_SineWave_Controller);
      return Case_SineWave_Controller;
    }(cc.Component);
    exports.default = Case_SineWave_Controller;
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
          mode: PopupManager_1.default.CacheMode.Frequent
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
      CommonUI = __decorate([ ccclass, executionOrder(-100) ], CommonUI);
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
        caseName && CaseManager_1.default.goCase(caseName);
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
  KawaseBlur: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6f20SUGOpITZpFupzU1uTW", "KawaseBlur");
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
    var EditorAsset_1 = require("../../../eazax-ccc/misc/EditorAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, disallowMultiple = _a.disallowMultiple;
    var KawaseBlur = function(_super) {
      __extends(KawaseBlur, _super);
      function KawaseBlur() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._effect = null;
        _this._offset = 3;
        _this.sprite = null;
        _this.material = null;
        return _this;
      }
      Object.defineProperty(KawaseBlur.prototype, "effect", {
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
      Object.defineProperty(KawaseBlur.prototype, "offset", {
        get: function() {
          return this._offset;
        },
        set: function(value) {
          this._offset = value;
          this.updateProperties();
        },
        enumerable: false,
        configurable: true
      });
      KawaseBlur.prototype.onEnable = function() {
        this.init();
      };
      KawaseBlur.prototype.resetInEditor = function() {
        this.init();
      };
      KawaseBlur.prototype.init = function() {
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
              this.setupMaterial();
              return [ 2 ];
            }
          });
        });
      };
      KawaseBlur.prototype.setupMaterial = function() {
        if (!this._effect) {
          cc.warn("[" + this["__proto__"]["__classname__"] + "]", "\u7f3a\u5c11 Effect \u8d44\u6e90\uff01");
          return;
        }
        var sprite = this.sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame && (sprite.spriteFrame.getTexture().packable = false);
        this.material || (this.material = cc.Material.create(this._effect));
        sprite.setMaterial(0, this.material);
        this.updateProperties();
      };
      KawaseBlur.prototype.updateProperties = function() {
        if (!this.material) return;
        this.material.setProperty("nodeSize", this.nodeSize);
        this.material.setProperty("pixelOffset", this._offset);
      };
      Object.defineProperty(KawaseBlur.prototype, "nodeSize", {
        get: function() {
          return cc.v2(this.node.width, this.node.height);
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property ], KawaseBlur.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false
      }) ], KawaseBlur.prototype, "effect", null);
      __decorate([ property ], KawaseBlur.prototype, "_offset", void 0);
      __decorate([ property({
        tooltip: false
      }) ], KawaseBlur.prototype, "offset", null);
      KawaseBlur = __decorate([ ccclass, requireComponent(cc.Sprite), executeInEditMode, disallowMultiple ], KawaseBlur);
      return KawaseBlur;
    }(cc.Component);
    exports.default = KawaseBlur;
    cc._RF.pop();
  }, {
    "../../../eazax-ccc/misc/EditorAsset": "EditorAsset"
  } ],
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
        _this._width = 5;
        _this._height = 5;
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
      Object.defineProperty(Mosaic.prototype, "width", {
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
      Object.defineProperty(Mosaic.prototype, "height", {
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
      Mosaic.prototype.onEnable = function() {
        this.init();
      };
      Mosaic.prototype.resetInEditor = function() {
        this.init();
      };
      Mosaic.prototype.init = function() {
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
              this.material || (this.material = cc.Material.create(this._effect));
              sprite.setMaterial(0, this.material);
              this.updateProperties();
              return [ 2 ];
            }
          });
        });
      };
      Mosaic.prototype.updateProperties = function() {
        if (!this.material) return;
        this.material.setProperty("nodeSize", this.nodeSize);
        this.material.setProperty("tileSize", this.tileSize);
      };
      Mosaic.prototype.set = function(width, height) {
        this._width = width;
        this._height = height || width;
        this.updateProperties();
      };
      Mosaic.prototype.to = function(width, height, duration) {
        var _this = this;
        return new Promise(function(res) {
          cc.tween(_this).to(duration, {
            width: width,
            height: height
          }).call(res).start();
        });
      };
      Object.defineProperty(Mosaic.prototype, "nodeSize", {
        get: function() {
          return cc.v2(this.node.width, this.node.height);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Mosaic.prototype, "tileSize", {
        get: function() {
          return cc.v2(this._width, this._height);
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property ], Mosaic.prototype, "_effect", void 0);
      __decorate([ property({
        type: cc.EffectAsset,
        tooltip: false
      }) ], Mosaic.prototype, "effect", null);
      __decorate([ property ], Mosaic.prototype, "_width", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Mosaic.prototype, "width", null);
      __decorate([ property ], Mosaic.prototype, "_height", void 0);
      __decorate([ property({
        tooltip: false
      }) ], Mosaic.prototype, "height", null);
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
    var PopupBase_1 = require("../components/popups/PopupBase");
    var CacheMode;
    (function(CacheMode) {
      CacheMode[CacheMode["Once"] = 1] = "Once";
      CacheMode[CacheMode["Normal"] = 2] = "Normal";
      CacheMode[CacheMode["Frequent"] = 3] = "Frequent";
    })(CacheMode || (CacheMode = {}));
    var ShowResult;
    (function(ShowResult) {
      ShowResult[ShowResult["Done"] = 1] = "Done";
      ShowResult[ShowResult["Failed"] = 2] = "Failed";
      ShowResult[ShowResult["Waiting"] = 3] = "Waiting";
    })(ShowResult || (ShowResult = {}));
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
      Object.defineProperty(PopupManager, "CacheMode", {
        get: function() {
          return CacheMode;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PopupManager, "ShowResult", {
        get: function() {
          return ShowResult;
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
                res(ShowResult.Waiting);
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
                  res(ShowResult.Failed);
                  return [ 2 ];
                }
                node = cc.instantiate(prefab);
                _a.label = 5;

               case 5:
                popup = node.getComponent(PopupBase_1.default);
                if (!popup) {
                  cc.warn("[PopupManager]", "\u672a\u627e\u5230\u5f39\u7a97\u7ec4\u4ef6", path);
                  this._current = null;
                  res(ShowResult.Failed);
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
                        res(ShowResult.Done);
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
                popup.setFinishCallback(finishCallback);
                popup.show(options);
                return [ 2 ];
              }
            });
          });
        });
      };
      PopupManager.hide = function() {
        this._current.popup && this._current.popup.hide();
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
      PopupManager.container = null;
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
          _this.toRes && _this.toRes();
          _this.toRes = res;
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
            _this.toRes();
            _this.toRes = null;
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
      RadarChart = __decorate([ ccclass, executeInEditMode, executionOrder(-1) ], RadarChart);
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RemoteAsset_1 = require("./RemoteAsset");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
    var RemoteSpine = function(_super) {
      __extends(RemoteSpine, _super);
      function RemoteSpine() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      RemoteSpine = __decorate([ ccclass, executeInEditMode ], RemoteSpine);
      return RemoteSpine;
    }(RemoteAsset_1.default);
    exports.default = RemoteSpine;
    cc._RF.pop();
  }, {
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
    var RemoteAsset_1 = require("./RemoteAsset");
    var RemoteLoader_1 = require("./RemoteLoader");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, help = _a.help;
    var RemoteTexture = function(_super) {
      __extends(RemoteTexture, _super);
      function RemoteTexture() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._sprite = null;
        _this._url = "";
        _this.retryTimes = 2;
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
      RemoteTexture.prototype.onLoad = function() {
        this.init();
      };
      RemoteTexture.prototype.resetInEditor = function() {
        this.init();
      };
      RemoteTexture.prototype.init = function() {
        cc.isValid(this._sprite) || (this._sprite = this.getComponent(cc.Sprite));
        this.onPropertyUpdated();
      };
      RemoteTexture.prototype.onPropertyUpdated = function() {
        false;
        this.load();
      };
      RemoteTexture.prototype.load = function(url) {
        void 0 === url && (url = this._url);
        return __awaiter(this, void 0, Promise, function() {
          var curRequestId, texture, loadCount, maxLoadTimes;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!cc.isValid(this._sprite)) {
                cc.warn("[RemoteTexture]", "load", "->", "\u7f3a\u5c11 Sprite \u7ec4\u4ef6");
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
                texture = null;
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
                cc.warn("[RemoteTexture]", "load", "->", "\u8fdc\u7a0b\u8d44\u6e90\u52a0\u8f7d\u5931\u8d25", url);
                return [ 2, {
                  url: url,
                  loaded: false,
                  interrupted: false,
                  component: this
                } ];
              }
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
        this._sprite.spriteFrame = texture ? new cc.SpriteFrame(texture) : null;
        this.node.emit("sprite:sprite-frame-updated", this._sprite, texture);
      };
      RemoteTexture.prototype.preview = function() {
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
                previewNode = null;
                return [ 2 ];
              }
              previewSprite = previewNode.addComponent(cc.Sprite);
              previewSprite.type = actualSprite.type;
              previewSprite.sizeMode = actualSprite.sizeMode;
              previewSprite.trim = actualSprite.trim;
              previewSprite.spriteFrame = new cc.SpriteFrame(texture);
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
      RemoteTexture = __decorate([ ccclass, executeInEditMode, help("https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteTexture.ts") ], RemoteTexture);
      return RemoteTexture;
    }(RemoteAsset_1.default);
    exports.default = RemoteTexture;
    cc._RF.pop();
  }, {
    "./RemoteAsset": "RemoteAsset",
    "./RemoteLoader": "RemoteLoader"
  } ],
  RenderTarget: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8604NCJi1Frp4mm3d2WofH", "RenderTarget");
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
    var RenderTarget = function(_super) {
      __extends(RenderTarget, _super);
      function RenderTarget() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._source = null;
        _this._target = null;
        _this.camera = null;
        _this.texture = null;
        return _this;
      }
      Object.defineProperty(RenderTarget.prototype, "source", {
        get: function() {
          return this._source;
        },
        set: function(value) {
          this._source = value;
          this.setTarget(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RenderTarget.prototype, "target", {
        get: function() {
          return this._target;
        },
        set: function(value) {
          this._target = value;
          this.setTarget(value);
        },
        enumerable: false,
        configurable: true
      });
      RenderTarget.prototype.onLoad = function() {
        this.init();
      };
      RenderTarget.prototype.init = function() {
        this.camera = this.getComponent(cc.Camera);
        this._target && this.setTarget(this._target);
      };
      RenderTarget.prototype.setTarget = function(target) {
        var texture = this.texture = new cc.RenderTexture();
        var size = cc.view.getVisibleSizeInPixel();
        texture.initWithSize(size.width, size.height);
        this.camera.targetTexture = texture;
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        target.spriteFrame = spriteFrame;
        var scale = Math.abs(target.node.scaleY);
        target.node.scaleY = -scale;
      };
      __decorate([ property() ], RenderTarget.prototype, "_source", void 0);
      __decorate([ property(cc.Sprite) ], RenderTarget.prototype, "source", null);
      __decorate([ property() ], RenderTarget.prototype, "_target", void 0);
      __decorate([ property(cc.Sprite) ], RenderTarget.prototype, "target", null);
      RenderTarget = __decorate([ ccclass, executeInEditMode ], RenderTarget);
      return RenderTarget;
    }(cc.Component);
    exports.default = RenderTarget;
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
      ScreenAdapter = __decorate([ ccclass, executionOrder(-999) ], ScreenAdapter);
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
  TestCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "156dbtBefVF5bbrbB2rqC9t", "TestCard");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, playOnFocus = _a.playOnFocus;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.back = null;
        _this.front = null;
        return _this;
      }
      NewClass.prototype.update = function(dt) {
        var _a = this.node.eulerAngles, x = _a.x, y = _a.y, z = _a.z;
        this.node.eulerAngles = cc.v3(x, y + 1, z);
        this.updateDisplay();
      };
      NewClass.prototype.updateDisplay = function() {
        var front = this.facingScreen;
        this.front.active = front;
        this.back.active = !front;
      };
      Object.defineProperty(NewClass.prototype, "facingScreen", {
        get: function() {
          return this.node.forward.z >= 0;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property(cc.Node) ], NewClass.prototype, "back", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "front", void 0);
      NewClass = __decorate([ ccclass, executeInEditMode, playOnFocus ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
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
}, {}, [ "AfterEffect", "Case_AfterEffect_Controller", "Case_ArcProgressBar", "CardArrayFlip_Card", "CardArrayFlip_CardLayout", "CardArrayFlip_FrontCard2D", "CardArrayFlip_FrontCard3D", "CardArrayFlip_FrontCardBase", "Case_CardArrayFlip_Controller", "CardArray_Card", "CardArray_CardLayout", "Case_CardArray_Controller", "Case_CardFlip", "Case_FrameLoading", "Case_NewUserGuide", "Case_PopupTest", "TestPopup", "Case_RadarChart_Controller", "Case_RemoteAsset", "Case_SineWave_Controller", "ArcProgressBar", "BackgroundFitter", "Counter", "LongPress", "Marquee", "RadarChart", "RotateAround", "RunInBackground", "ScreenAdapter", "Subtitle", "TouchBlocker", "TouchBlocker2", "ColorBrush", "GaussianBlur", "HollowOut", "Mosaic", "SineWave", "LocalizationBase", "LocalizationLabelString", "LocalizationSpriteFrame", "ConfirmPopup", "PopupBase", "RemoteAsset", "RemoteLoader", "RemoteSpine", "RemoteTexture", "GradientColor", "BounceMoveTween", "BounceScaleTween", "JellyTween", "AudioPlayer", "EventManager", "InstanceEvent", "NetworkManager", "PoolManager", "PopupManager", "ResourceManager", "SceneNavigator", "eazax", "extension", "EditorAsset", "ArrayUtil", "BrowserUtil", "DebugUtil", "DeviceUtil", "ImageUtil", "MathUtil", "NodeUtil", "ObjectUtil", "PromiseUtil", "RegexUtil", "StorageUtil", "TimeUtil", "TweenUtil", "CaseList", "CaseManager", "CaseLoading", "ClickToLoadUrl", "ClickToShowResPopup", "CommonUI", "LoadingTip", "Toast", "ResPopup", "ResPopupItem", "ResPopupItemInfo", "Constants", "CustomEvents", "Home", "Home_Content", "Home_UI", "Home_CaseBtn", "Home_CaseList", "TestCard", "Test_3DNode", "Test_NodeOrder", "Case_MultiPassKawaseBlur", "KawaseBlur", "RenderTarget" ]);