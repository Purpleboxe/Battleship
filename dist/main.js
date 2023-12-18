(()=>{var t={663:(t,e,i)=>{const r=i(758);t.exports=class extends r{constructor(){super(),this.previousAttacks=[],this.berserk=!1,this.direction=null,this.attacks=1,this.look=!1}makeRandomAttack(t){let e,i;if(this.berserk){const r=this.previousAttacks[this.previousAttacks.length-this.attacks],{row:n,col:a}=r,o=[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1}];if(this.direction){const r=o.find((t=>t.row===this.direction.row&&t.col===this.direction.col)),s=n+r.row,l=a+r.col;if(s>=0&&s<10&&l>=0&&l<10&&!this.previousAttacks.some((t=>t.row===s&&t.col===l)))e=s,i=l;else{const r=o.filter((t=>{const e=n+t.row,i=a+t.col;return e>=0&&e<10&&i>=0&&i<10&&!this.previousAttacks.some((t=>t.row===e&&t.col===i))}));if(!(r.length>0))return this.direction=null,this.berserk=!1,this.makeRandomAttack(t);this.direction=r[Math.floor(Math.random()*r.length)],e=n+this.direction.row,i=a+this.direction.col}}else{const r=o.filter((t=>{const e=n+t.row,i=a+t.col;return e>=0&&e<10&&i>=0&&i<10&&!this.previousAttacks.some((t=>t.row===e&&t.col===i))}));if(!(r.length>0))return this.berserk=!1,this.direction=null,this.makeRandomAttack(t);this.direction=r[Math.floor(Math.random()*r.length)],e=n+this.direction.row,i=a+this.direction.col,null===t.grid[e][i]&&(this.attacks+=1)}const s=t.grid[e][i];(null===s||s.isSunk())&&(this.direction=null,this.berserk=!1)}else{if(this.attacks=1,Math.random()<.2)do{e=Math.floor(10*Math.random()),i=Math.floor(10*Math.random())}while(this.previousAttacks.some((t=>t.row===e&&t.col===i))||null===t.grid[e][i]);else do{e=Math.floor(10*Math.random()),i=Math.floor(10*Math.random())}while(this.previousAttacks.some((t=>t.row===e&&t.col===i)));null===t.grid[e][i]||t.grid[e][i].isSunk()||(this.berserk=!0)}return this.previousAttacks.push({row:e,col:i}),this.attack(t,e,i)}placeShipsRandomly(){this.shipsToPlace.forEach((t=>{let e=!1;for(;!e;){const i=Math.floor(10*Math.random()),r=Math.floor(10*Math.random()),n=Math.random()<.5;t.isVertical=n,e=this.gameboard.placeShip(t,i,r)}}))}reset(){super.reset(),this.previousAttacks=[],this.berserk=!1,this.direction=null,this.attacks=1}}},286:(t,e,i)=>{const r=i(883);t.exports=function(){const t=document.createElement("canvas"),e=document.querySelector(".confettiCanvas"),i=r.create(t);t.classList.add("canvas"),t.width=800,t.height=800,e.appendChild(t),i({particleCount:200,spread:200,gravity:2}).then((()=>e.removeChild(t)))}},82:(t,e,i)=>{const r=i(758),n=i(663),a=i(286);function o(){!function(t,e){const i=document.getElementById("placeShip"),r=document.getElementById("placeBoard"),n=document.querySelector(".overlay"),l=document.querySelector(".rotate");let c=!1;l.onclick=()=>{c=!c};const h=(r,l)=>{if(t.currentShip&&(t.currentShip.isVertical=c,t.gameboard.placeShip(t.currentShip,r,l))){if(document.getElementById(`${r}${l}`).classList.add("placed"),c)for(let e=0;e<t.currentShip.length;e+=1){const t=document.getElementById(`${r+e}${l}`);t&&t.classList.add("placed")}else for(let e=0;e<t.currentShip.length;e+=1){const t=document.getElementById(`${r}${l+e}`);t&&t.classList.add("placed")}t.nextShipToPlace(),t.currentShip||(e.placeShipsRandomly(),function(t,e){const i=document.getElementById("playerBoard"),r=document.getElementById("computerBoard"),n=document.getElementById("gameOver"),l=document.querySelector(".overlay"),c=document.querySelector(".restart"),h=document.querySelector(".playerShips"),d=document.querySelector(".computerShips");let u=!1;i.innerHTML="",r.innerHTML="",s(i,t,!0),s(r,e),h.innerHTML=`Ships: ${t.gameboard.amountOfShipsSunk()}`,d.innerHTML=`Ships: ${e.gameboard.amountOfShipsSunk()}`;const f=()=>{const s=document.querySelector(".verdict"),u=()=>{n.classList.remove("active"),l.classList.remove("active"),i.innerHTML="",r.innerHTML="",h.innerHTML="Ships: ",d.innerHTML="Ships: ",o()};return e.gameboard.allShipsSunk()?(s.innerText="You Win!",s.classList.remove("win","lose"),s.classList.add("win"),n.classList.add("active"),l.classList.add("active"),c.addEventListener("click",u),a(),!0):!!t.gameboard.allShipsSunk()&&(s.innerText="You Lose!",s.classList.remove("win","lose"),s.classList.add("lose"),n.classList.add("active"),l.classList.add("active"),c.addEventListener("click",u),!0)};r.addEventListener("click",(n=>{if(u)return;const a=n.target,o=t.attack(e.gameboard,a.id[0],a.id[1]);if(d.innerHTML=`Ships: ${e.gameboard.amountOfShipsSunk()}`,o){if(s(r,e),f())return void(u=!0);e.makeRandomAttack(t.gameboard),s(i,t,!0),f()&&(u=!0)}h.innerHTML=`Ships: ${t.gameboard.amountOfShipsSunk()}`}))}(t,e),i.classList.remove("active"),n.classList.remove("active"))}},d=(e,i,r)=>{const n=document.getElementById(`${e}${i}`);if(r){if(n.classList.add("active"),t.currentShip)if(c)for(let r=0;r<t.currentShip.length;r+=1){const t=document.getElementById(`${e+r}${i}`);t&&t.classList.add("active")}else for(let r=0;r<t.currentShip.length;r+=1){const t=document.getElementById(`${e}${i+r}`);t&&t.classList.add("active")}}else{if(n.classList.remove("active"),!t.currentShip)return;for(let r=0;r<=t.currentShip.length;r+=1){const t=document.getElementById(`${e}${i+r}`),n=document.getElementById(`${e+r}${i}`);t&&t.classList.remove("active"),n&&n.classList.remove("active")}}};i.classList.add("active"),n.classList.add("active"),r.innerHTML="",(()=>{for(let t=0;t<10;t+=1){const e=document.createElement("div");e.classList.add("row"),r.appendChild(e);for(let i=0;i<10;i+=1){const r=document.createElement("div");r.classList.add("preview"),r.setAttribute("id",`${t}${i}`),r.addEventListener("click",(()=>h(t,i))),r.addEventListener("mouseover",(()=>d(t,i,!0))),r.addEventListener("mouseout",(()=>d(t,i,!1))),e.appendChild(r)}}})()}(new r,new n)}function s(t,e,i){t.innerHTML="";for(let r=0;r<10;r+=1){const n=document.createElement("div");n.classList.add("row"),t.appendChild(n);for(let t=0;t<10;t+=1){const a=document.createElement("div");a.classList.add("cell");const o=e.gameboard.grid[r][t];o&&o.isSunk()?a.classList.add("sunk"):o&&o.isHit(r,t)?a.classList.add("hit"):null===e.gameboard.grid[r][t]&&e.gameboard.missedAttacks.some((e=>e.row==r&&e.col==t))?a.classList.add("miss"):o&&i&&a.classList.add("show"),a.setAttribute("id",`${r}${t}`),n.appendChild(a)}}}t.exports=o},112:t=>{t.exports=class{constructor(){this.grid=[];for(let t=0;t<10;t+=1)this.grid.push(Array(10).fill(null));this.ships=[],this.missedAttacks=[],this.numberOfShips=this.ships.length}placeShip(t,e,i){if(this.checkShipPlacement(t,e,i)){t.setPosition(e,i);for(let r=0;r<t.length;r+=1)t.isVertical?this.grid[e+r][i]=t:t.isVertical||(this.grid[e][i+r]=t);return this.ships.push(t),!0}return!1}checkShipPlacement(t,e,i){if(t.isVertical){if(e+t.length>10)return!1}else if(!t.isVertical&&i+t.length>10)return!1;for(let r=0;r<t.length;r+=1)if(t.isVertical){if(null!==this.grid[e+r][i])return!1}else if(!t.isVertical&&null!==this.grid[e][i+r])return!1;return!0}receiveAttack(t,e){if(null===this.grid[t][e]&&this.missedAttacks.some((i=>i.row===t&&i.col===e)))return!1;if(null===this.grid[t][e])return this.missedAttacks.push({row:t,col:e}),!0;const i=this.grid[t][e];if(!i.isSunk()&&null!==this.grid[t][e]){let r;if(r=!0===i.isVertical?t-i.row:e-i.col,i.hit(r))return!0}return!1}allShipsSunk(){return this.ships.every((t=>t.isSunk()))}amountOfShipsSunk(){this.numberOfShips=this.ships.length;for(let t=0;t<this.ships.length;t+=1)this.ships[t].isSunk()&&(this.numberOfShips-=1);return this.numberOfShips}}},758:(t,e,i)=>{const r=i(112),n=i(547);t.exports=class{constructor(){this.gameboard=new r,this.shipsToPlace=[new n(4,!1),new n(3,!1),new n(3,!1),new n(2,!1),new n(2,!1),new n(2,!1),new n(1,!1),new n(1,!1),new n(1,!1),new n(1,!1)],this.currentShip=this.shipsToPlace[0]}nextShipToPlace(){this.shipsToPlace.shift(),this.currentShip=this.shipsToPlace[0]}attack(t,e,i){return t.receiveAttack(e,i)}reset(){this.gameboard=new r}}},547:t=>{t.exports=class{constructor(t,e){this.length=t,this.isVertical=e,this.hits=Array(t).fill(!1),this.row=null,this.col=null}setPosition(t,e){this.row=t,this.col=e}hit(t){return!1===this.hits[t]&&!this.isSunk()&&(this.hits[t]=!0,!0)}isHit(t,e){return this.isVertical?this.hits[t-this.row]:this.hits[e-this.col]}isSunk(){return this.hits.every((t=>t))}}},883:(t,e,i)=>{"use strict";i.r(e),i.d(e,{create:()=>a,default:()=>n});var r={};!function t(e,i,r,n){var a=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o="function"==typeof Path2D&&"function"==typeof DOMMatrix,s=function(){if(!e.OffscreenCanvas)return!1;var t=new OffscreenCanvas(1,1),i=t.getContext("2d");i.fillRect(0,0,1,1);var r=t.transferToImageBitmap();try{i.createPattern(r,"no-repeat")}catch(t){return!1}return!0}();function l(){}function c(t){var r=i.exports.Promise,n=void 0!==r?r:e.Promise;return"function"==typeof n?new n(t):(t(l,l),null)}var h,d,u,f,m,p,g,v,b,w,M,y=(h=s,d=new Map,{transform:function(t){if(h)return t;if(d.has(t))return d.get(t);var e=new OffscreenCanvas(t.width,t.height);return e.getContext("2d").drawImage(t,0,0),d.set(t,e),e},clear:function(){d.clear()}}),S=(m=Math.floor(1e3/60),p={},g=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(u=function(t){var e=Math.random();return p[e]=requestAnimationFrame((function i(r){g===r||g+m-1<r?(g=r,delete p[e],t()):p[e]=requestAnimationFrame(i)})),e},f=function(t){p[t]&&cancelAnimationFrame(p[t])}):(u=function(t){return setTimeout(t,m)},f=function(t){return clearTimeout(t)}),{frame:u,cancel:f}),k=(w={},function(){if(v)return v;if(!r&&a){var e=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n");try{v=new Worker(URL.createObjectURL(new Blob([e])))}catch(t){return void 0!==typeof console&&"function"==typeof console.warn&&console.warn("🎊 Could not load worker",t),null}!function(t){function e(e,i){t.postMessage({options:e||{},callback:i})}t.init=function(e){var i=e.transferControlToOffscreen();t.postMessage({canvas:i},[i])},t.fire=function(i,r,n){if(b)return e(i,null),b;var a=Math.random().toString(36).slice(2);return b=c((function(r){function o(e){e.data.callback===a&&(delete w[a],t.removeEventListener("message",o),b=null,y.clear(),n(),r())}t.addEventListener("message",o),e(i,a),w[a]=o.bind(null,{data:{callback:a}})}))},t.reset=function(){for(var e in t.postMessage({reset:!0}),w)w[e](),delete w[e]}}(v)}return v}),x={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function L(t,e,i){return function(t,e){return e?e(t):t}(t&&null!=t[e]?t[e]:x[e],i)}function T(t){return t<0?0:Math.floor(t)}function E(t){return parseInt(t,16)}function C(t){return t.map(I)}function I(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:E(e.substring(0,2)),g:E(e.substring(2,4)),b:E(e.substring(4,6))}}function P(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function A(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function O(t,i){var s,l=!t,h=!!L(i||{},"resize"),d=!1,u=L(i,"disableForReducedMotion",Boolean),f=a&&L(i||{},"useWorker")?k():null,m=l?P:A,p=!(!t||!f||!t.__confetti_initialized),g="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function v(e,i,a){for(var l,h,d,u,f=L(e,"particleCount",T),p=L(e,"angle",Number),g=L(e,"spread",Number),v=L(e,"startVelocity",Number),b=L(e,"decay",Number),w=L(e,"gravity",Number),M=L(e,"drift",Number),k=L(e,"colors",C),x=L(e,"ticks",Number),E=L(e,"shapes"),I=L(e,"scalar"),P=!!L(e,"flat"),A=function(t){var e=L(t,"origin",Object);return e.x=L(e,"x",Number),e.y=L(e,"y",Number),e}(e),O=f,B=[],$=t.width*A.x,R=t.height*A.y;O--;)B.push((void 0,void 0,h=(l={x:$,y:R,angle:p,spread:g,startVelocity:v,color:k[O%k.length],shape:E[(0,u=E.length,Math.floor(Math.random()*(u-0))+0)],ticks:x,decay:b,gravity:w,drift:M,scalar:I,flat:P}).angle*(Math.PI/180),d=l.spread*(Math.PI/180),{x:l.x,y:l.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*l.startVelocity+Math.random()*l.startVelocity,angle2D:-h+(.5*d-Math.random()*d),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:l.color,shape:l.shape,tick:0,totalTicks:l.ticks,decay:l.decay,drift:l.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*l.gravity,ovalScalar:.6,scalar:l.scalar,flat:l.flat}));return s?s.addFettis(B):(s=function(t,e,i,a,s){var l,h,d=e.slice(),u=t.getContext("2d"),f=c((function(e){function c(){l=h=null,u.clearRect(0,0,a.width,a.height),y.clear(),s(),e()}l=S.frame((function e(){!r||a.width===n.width&&a.height===n.height||(a.width=t.width=n.width,a.height=t.height=n.height),a.width||a.height||(i(t),a.width=t.width,a.height=t.height),u.clearRect(0,0,a.width,a.height),(d=d.filter((function(t){return function(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var i=e.tick++/e.totalTicks,r=e.x+e.random*e.tiltCos,n=e.y+e.random*e.tiltSin,a=e.wobbleX+e.random*e.tiltCos,s=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-i)+")",t.beginPath(),o&&"path"===e.shape.type&&"string"==typeof e.shape.path&&Array.isArray(e.shape.matrix))t.fill(function(t,e,i,r,n,a,o){var s=new Path2D(t),l=new Path2D;l.addPath(s,new DOMMatrix(e));var c=new Path2D;return c.addPath(l,new DOMMatrix([Math.cos(o)*n,Math.sin(o)*n,-Math.sin(o)*a,Math.cos(o)*a,i,r])),c}(e.shape.path,e.shape.matrix,e.x,e.y,.1*Math.abs(a-r),.1*Math.abs(s-n),Math.PI/10*e.wobble));else if("bitmap"===e.shape.type){var l=Math.PI/10*e.wobble,c=.1*Math.abs(a-r),h=.1*Math.abs(s-n),d=e.shape.bitmap.width*e.scalar,u=e.shape.bitmap.height*e.scalar,f=new DOMMatrix([Math.cos(l)*c,Math.sin(l)*c,-Math.sin(l)*h,Math.cos(l)*h,e.x,e.y]);f.multiplySelf(new DOMMatrix(e.shape.matrix));var m=t.createPattern(y.transform(e.shape.bitmap),"no-repeat");m.setTransform(f),t.globalAlpha=1-i,t.fillStyle=m,t.fillRect(e.x-d/2,e.y-u/2,d,u),t.globalAlpha=1}else if("circle"===e.shape)t.ellipse?t.ellipse(e.x,e.y,Math.abs(a-r)*e.ovalScalar,Math.abs(s-n)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):function(t,e,i,r,n,a,o,s,l){t.save(),t.translate(e,i),t.rotate(a),t.scale(r,n),t.arc(0,0,1,0,s,void 0),t.restore()}(t,e.x,e.y,Math.abs(a-r)*e.ovalScalar,Math.abs(s-n)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if("star"===e.shape)for(var p=Math.PI/2*3,g=4*e.scalar,v=8*e.scalar,b=e.x,w=e.y,M=5,S=Math.PI/M;M--;)b=e.x+Math.cos(p)*v,w=e.y+Math.sin(p)*v,t.lineTo(b,w),p+=S,b=e.x+Math.cos(p)*g,w=e.y+Math.sin(p)*g,t.lineTo(b,w),p+=S;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(n)),t.lineTo(Math.floor(a),Math.floor(s)),t.lineTo(Math.floor(r),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}(u,t)}))).length?l=S.frame(e):c()})),h=c}));return{addFettis:function(t){return d=d.concat(t),f},canvas:t,promise:f,reset:function(){l&&S.cancel(l),h&&h()}}}(t,B,m,i,a),s.promise)}function b(i){var r=u||L(i,"disableForReducedMotion",Boolean),n=L(i,"zIndex",Number);if(r&&g)return c((function(t){t()}));l&&s?t=s.canvas:l&&!t&&(t=function(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}(n),document.body.appendChild(t)),h&&!p&&m(t);var a={width:t.width,height:t.height};function o(){if(f){var e={getBoundingClientRect:function(){if(!l)return t.getBoundingClientRect()}};return m(e),void f.postMessage({resize:{width:e.width,height:e.height}})}a.width=a.height=null}function b(){s=null,h&&(d=!1,e.removeEventListener("resize",o)),l&&t&&(document.body.removeChild(t),t=null,p=!1)}return f&&!p&&f.init(t),p=!0,f&&(t.__confetti_initialized=!0),h&&!d&&(d=!0,e.addEventListener("resize",o,!1)),f?f.fire(i,a,b):v(i,a,b)}return b.reset=function(){f&&f.reset(),s&&s.reset()},b}function B(){return M||(M=O(null,{useWorker:!0,resize:!0})),M}i.exports=function(){return B().apply(this,arguments)},i.exports.reset=function(){B().reset()},i.exports.create=O,i.exports.shapeFromPath=function(t){if(!o)throw new Error("path confetti are not supported in this browser");var e,i;"string"==typeof t?e=t:(e=t.path,i=t.matrix);var r=new Path2D(e),n=document.createElement("canvas").getContext("2d");if(!i){for(var a,s,l=1e3,c=l,h=l,d=0,u=0,f=0;f<l;f+=2)for(var m=0;m<l;m+=2)n.isPointInPath(r,f,m,"nonzero")&&(c=Math.min(c,f),h=Math.min(h,m),d=Math.max(d,f),u=Math.max(u,m));a=d-c,s=u-h;var p=Math.min(10/a,10/s);i=[p,0,0,p,-Math.round(a/2+c)*p,-Math.round(s/2+h)*p]}return{type:"path",path:e,matrix:i}},i.exports.shapeFromText=function(t){var e,i=1,r="#000000",n='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';"string"==typeof t?e=t:(e=t.text,i="scalar"in t?t.scalar:i,n="fontFamily"in t?t.fontFamily:n,r="color"in t?t.color:r);var a=10*i,o=a+"px "+n,s=new OffscreenCanvas(a,a),l=s.getContext("2d");l.font=o;var c=l.measureText(e),h=Math.ceil(c.actualBoundingBoxRight+c.actualBoundingBoxLeft),d=Math.ceil(c.actualBoundingBoxAscent+c.actualBoundingBoxDescent),u=c.actualBoundingBoxLeft+2,f=c.actualBoundingBoxAscent+2;h+=4,d+=4,(l=(s=new OffscreenCanvas(h,d)).getContext("2d")).font=o,l.fillStyle=r,l.fillText(e,u,f);var m=1/i;return{type:"bitmap",bitmap:s.transferToImageBitmap(),matrix:[m,0,0,m,-h*m/2,-d*m/2]}}}(function(){return"undefined"!=typeof window?window:"undefined"!=typeof self?self:this||{}}(),r,!1);const n=r.exports;var a=r.exports.create}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,i),a.exports}i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(82)()})();