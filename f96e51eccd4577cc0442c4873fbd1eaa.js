require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t){this.shapes=[],this.viewport={x:0,y:0,width:0,height:0,scale:1},this.canvas=t,this.aspectRatio=this.canvas.width/this.canvas.height;const s=t.getContext("2d");if(!s)throw new Error("No canvas found");this.context=s,this.setViewport(0,0,1)}get width(){return this.canvas.width}get height(){return this.canvas.height}setCanvasSize(t,s){this.canvas.width=t,this.canvas.height=s,this.aspectRatio=this.canvas.width/this.canvas.height,this.setViewport(this.viewport.x,this.viewport.y,this.viewport.width)}setViewport(t,s,e){const i=this.canvas.width/e,h=e/this.aspectRatio;this.viewport={x:t,y:s,width:e,height:h,scale:i},this.context.setTransform(i,0,0,i,-t*i,-s*i)}start(){const t=performance.now();let s=t;const e=i=>{const h=i-t,a=i-s;s=i,this.frame(h,a),window.requestAnimationFrame(e)};window.requestAnimationFrame(e)}clear(){this.context.clearRect(0,0,this.width,this.height)}frame(t,s){this.update(t/1e3,s/1e3),this.render()}render(){this.clear();for(const t of this.shapes)t.draw(this.context)}}exports.Scene=t;
},{}],19:[function(require,module,exports) {
"use strict";function t(t,e){return"number"==typeof t?{x:t,y:null!=e?e:t}:Object.assign({},t)}function e(t,e){return t.x*e.x+t.y*e.y}function r(t){return Math.sqrt(e(t,t))}function n(t,e){return{x:t.x+e.x,y:t.y+e.y}}function u(t,e){return{x:t.x-e.x,y:t.y-e.y}}function x(t,e){return{x:t.x*e,y:t.y*e}}function o(t,e){return{x:t.x/e,y:t.y/e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vector=t,exports.dot=e,exports.length=r,exports.add=n,exports.sub=u,exports.mul=x,exports.div=o;
},{}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Line=exports.Circle=exports.Shape=void 0;var t=require("./vector.ts");class e{constructor(e,{translate:s=(0,t.Vector)(0,0),rotate:r=0,scale:a=(0,t.Vector)(1,1)}){this.color=e,this.translate=(0,t.Vector)(s),this.rotate=r,this.scale=(0,t.Vector)(a)}draw(t){t.save(),t.translate(this.translate.x,this.translate.y),t.rotate(this.rotate),t.scale(this.scale.x,this.scale.y),this.drawInternal(t),t.restore()}}exports.Shape=e;class s extends e{constructor(t,e,s){super(e,s),this.radius=t}drawInternal(t){t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill()}}exports.Circle=s;class r extends e{constructor(e,s,r,a,i){super(a,i),this.a=(0,t.Vector)(e),this.b=(0,t.Vector)(s),this.width=r}drawInternal(t){t.beginPath(),t.strokeStyle=this.color,t.lineWidth=this.width,t.moveTo(this.a.x,this.a.y),t.lineTo(this.b.x,this.b.y),t.stroke()}}exports.Line=r;
},{"./vector.ts":19}],11:[function(require,module,exports) {
"use strict";var e=require("../../src/scene.ts"),t=require("../../src/shapes.ts"),s=require("../../src/vector.ts");const n=1,r=1,a=10,l=10,c=9.81;function o(e,t,s,n){return e+t*n+.5*s*n*n}function i(e,t,s){return e+t*s}class u extends t.Circle{constructor(){super(...arguments),this.vel=(0,s.Vector)(0,0),this.bounciness=.8}}class d extends e.Scene{constructor(e){super(e),this.shapes.push(new t.Line((0,s.Vector)(0,0),(0,s.Vector)(a,0),.1,"#000000",{translate:(0,s.Vector)(n,r)}),new t.Line((0,s.Vector)(0,0),(0,s.Vector)(a,0),.1,"#000000",{translate:(0,s.Vector)(n,r+l)}),new t.Line((0,s.Vector)(0,0),(0,s.Vector)(0,l),.1,"#000000",{translate:(0,s.Vector)(n,r)}),new t.Line((0,s.Vector)(0,0),(0,s.Vector)(0,l),.1,"#000000",{translate:(0,s.Vector)(n+a,r)})),this.ball=new u(.5,"#00AA77",{translate:(0,s.Vector)(n+a/2,r+2)}),this.ball.vel=(0,s.add)(this.ball.vel,(0,s.Vector)(40*Math.random()-20,40*Math.random()-20)),this.shapes.push(this.ball)}update(e,t){const s=this.ball;s.translate.x=o(s.translate.x,s.vel.x,0,t),s.translate.y=o(s.translate.y,s.vel.y,c,t),s.vel.x=i(s.vel.x,0,t),s.vel.y=i(s.vel.y,c,t);const u=r+s.radius,d=r+l-s.radius,v=n+s.radius,h=n+a-s.radius;s.translate.y>d?(s.translate.y=d,s.vel.y*=-s.bounciness):s.translate.y<u&&(s.translate.y=u,s.vel.y*=-s.bounciness),s.translate.x>h?(s.translate.x=h,s.vel.x*=-s.bounciness):s.translate.x<v&&(s.translate.x=v,s.vel.x*=-s.bounciness)}}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("canvas"),t=new d(e);t.setCanvasSize(600,600),t.setViewport(n-1,r-1,a+2),t.start()});
},{"../../src/scene.ts":15,"../../src/shapes.ts":17,"../../src/vector.ts":19}]},{},[11])