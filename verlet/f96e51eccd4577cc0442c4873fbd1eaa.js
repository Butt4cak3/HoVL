// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Scene {
    constructor(canvas) {
        this.shapes = [];
        this.canvas = canvas;
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.viewport = { x: 0, y: 0, width: 0, height: 0, scale: 1 };
        const ctx = canvas.getContext("2d");
        if (ctx) {
            this.context = ctx;
        } else {
            throw new Error("No canvas found");
        }
        this.setViewport(0, 0, 1);
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    setCanvasSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.setViewport(this.viewport.x, this.viewport.y, this.viewport.width);
    }
    setViewport(x, y, width) {
        const scale = this.canvas.width / width;
        const height = width / this.aspectRatio;
        this.viewport = { x, y, width, height, scale };
        this.context.setTransform(scale, 0, 0, scale, -x * scale, -y * scale);
    }
    start() {
        const start = performance.now();
        let last = start;
        const frame = now => {
            const time = now - start;
            const dt = now - last;
            last = now;
            this.frame(time, dt);
            window.requestAnimationFrame(frame);
        };
        window.requestAnimationFrame(frame);
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    frame(time, dt) {
        this.update(time / 1000, dt / 1000);
        this.render();
    }
    render() {
        this.clear();
        for (const shape of this.shapes) {
            shape.draw(this.context);
        }
    }
}
exports.Scene = Scene;
},{}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vector = Vector;
exports.dot = dot;
exports.length = length;
exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.div = div;
function Vector(x, y) {
    if (typeof x === "number") {
        return { x, y: y != null ? y : x };
    } else {
        return Object.assign({}, x);
    }
}
function dot(lhs, rhs) {
    return lhs.x * rhs.x + lhs.y * rhs.y;
}
function length(v) {
    return Math.sqrt(dot(v, v));
}
function add(lhs, rhs) {
    return { x: lhs.x + rhs.x, y: lhs.y + rhs.y };
}
function sub(lhs, rhs) {
    return { x: lhs.x - rhs.x, y: lhs.y - rhs.y };
}
function mul(lhs, rhs) {
    return { x: lhs.x * rhs, y: lhs.y * rhs };
}
function div(lhs, rhs) {
    return { x: lhs.x / rhs, y: lhs.y / rhs };
}
},{}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Line = exports.Circle = exports.Shape = undefined;

var _vector = require("./vector.ts");

class Shape {
    constructor(color, { translate = (0, _vector.Vector)(0, 0), rotate = 0, scale = (0, _vector.Vector)(1, 1) }) {
        this.color = color;
        this.translate = (0, _vector.Vector)(translate);
        this.rotate = rotate;
        this.scale = (0, _vector.Vector)(scale);
    }
    draw(context) {
        context.save();
        context.translate(this.translate.x, this.translate.y);
        context.rotate(this.rotate);
        context.scale(this.scale.x, this.scale.y);
        this.drawInternal(context);
        context.restore();
    }
}
exports.Shape = Shape;
class Circle extends Shape {
    constructor(radius, color, trs) {
        super(color, trs);
        this.radius = radius;
    }
    drawInternal(context) {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}
exports.Circle = Circle;
class Line extends Shape {
    constructor(a, b, width, color, trs) {
        super(color, trs);
        this.a = (0, _vector.Vector)(a);
        this.b = (0, _vector.Vector)(b);
        this.width = width;
    }
    drawInternal(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.moveTo(this.a.x, this.a.y);
        context.lineTo(this.b.x, this.b.y);
        context.stroke();
    }
}
exports.Line = Line;
},{"./vector.ts":10}],4:[function(require,module,exports) {
"use strict";

var _scene = require("../../src/scene.ts");

var _shapes = require("../../src/shapes.ts");

var _vector = require("../../src/vector.ts");

const BOX_X = 1;
const BOX_Y = 1;
const BOX_WIDTH = 10;
const BOX_HEIGHT = 10;
const GRAVITY = 9.81;
// Velocity Verlet
function verletPos(x, v, a, dt) {
    return x + v * dt + 0.5 * a * dt * dt;
}
function verletVel(v, a, dt) {
    return v + a * dt;
}
// We need a circle that knows its velocity and bounciness
class Ball extends _shapes.Circle {
    constructor() {
        super(...arguments);
        this.vel = (0, _vector.Vector)(0, 0);
        this.bounciness = 0.8;
    }
}
class VerletScene extends _scene.Scene {
    constructor(canvas) {
        super(canvas);
        // These lines create a bounding box that the ball will bounce off of
        this.shapes.push(new _shapes.Line((0, _vector.Vector)(0, 0), (0, _vector.Vector)(BOX_WIDTH, 0), 0.1, "#000000", {
            translate: (0, _vector.Vector)(BOX_X, BOX_Y)
        }), new _shapes.Line((0, _vector.Vector)(0, 0), (0, _vector.Vector)(BOX_WIDTH, 0), 0.1, "#000000", {
            translate: (0, _vector.Vector)(BOX_X, BOX_Y + BOX_HEIGHT)
        }), new _shapes.Line((0, _vector.Vector)(0, 0), (0, _vector.Vector)(0, BOX_HEIGHT), 0.1, "#000000", {
            translate: (0, _vector.Vector)(BOX_X, BOX_Y)
        }), new _shapes.Line((0, _vector.Vector)(0, 0), (0, _vector.Vector)(0, BOX_HEIGHT), 0.1, "#000000", {
            translate: (0, _vector.Vector)(BOX_X + BOX_WIDTH, BOX_Y)
        }));
        // Create a ball a bit above the center of the box
        this.ball = new Ball(0.5, "#00AA77", {
            translate: (0, _vector.Vector)(BOX_X + BOX_WIDTH / 2, BOX_Y + 2)
        });
        // Give it a random starting velocity
        this.ball.vel = (0, _vector.add)(this.ball.vel, (0, _vector.Vector)(Math.random() * 40 - 20, Math.random() * 40 - 20));
        // Add the ball to the shapes so that it gets drawn
        this.shapes.push(this.ball);
    }
    update(_, dt) {
        const ball = this.ball;
        // Calculate the new position
        ball.translate.x = verletPos(ball.translate.x, ball.vel.x, 0, dt);
        ball.translate.y = verletPos(ball.translate.y, ball.vel.y, GRAVITY, dt);
        // Calculate the new velocity
        ball.vel.x = verletVel(ball.vel.x, 0, dt);
        ball.vel.y = verletVel(ball.vel.y, GRAVITY, dt);
        // These are the coordinates at which the ball hits a wall
        const boundTop = BOX_Y + ball.radius;
        const boundBottom = BOX_Y + BOX_HEIGHT - ball.radius;
        const boundLeft = BOX_X + ball.radius;
        const boundRight = BOX_X + BOX_WIDTH - ball.radius;
        // Check for and resolve collisions
        if (ball.translate.y > boundBottom) {
            ball.translate.y = boundBottom;
            ball.vel.y *= -ball.bounciness;
        } else if (ball.translate.y < boundTop) {
            ball.translate.y = boundTop;
            ball.vel.y *= -ball.bounciness;
        }
        if (ball.translate.x > boundRight) {
            ball.translate.x = boundRight;
            ball.vel.x *= -ball.bounciness;
        } else if (ball.translate.x < boundLeft) {
            ball.translate.x = boundLeft;
            ball.vel.x *= -ball.bounciness;
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const scene = new VerletScene(canvas);
    scene.setCanvasSize(600, 600);
    scene.setViewport(BOX_X - 1, BOX_Y - 1, BOX_WIDTH + 2);
    scene.start();
});
},{"../../src/scene.ts":6,"../../src/shapes.ts":8,"../../src/vector.ts":10}],12:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '38349' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[12,4])
//# sourceMappingURL=/verlet/f96e51eccd4577cc0442c4873fbd1eaa.map