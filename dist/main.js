(()=>{var t={663:(t,e,s)=>{const i=s(758);t.exports=class extends i{constructor(){super(),this.previousAttacks=[]}makeRandomAttack(t){let e,s;do{e=Math.floor(10*Math.random()),s=Math.floor(10*Math.random())}while(this.previousAttacks.some((t=>t.row===e&&t.col===s)));this.previousAttacks.push({row:e,col:s}),this.attack(t,e,s)}placeShipsRandomly(){this.shipsToPlace.forEach((t=>{let e=!1;for(;!e;){const s=Math.floor(9*Math.random()),i=Math.floor(9*Math.random()),r=Math.random()<.5;t.isVertical=r,e=this.gameboard.placeShip(t,s,i)}}))}reset(){super.reset(),this.previousAttacks=[]}}},82:(t,e,s)=>{const i=s(758),r=s(663);function c(){!function(t,e){const s=document.getElementById("placeShip"),i=document.getElementById("placeBoard"),r=document.querySelector(".overlay"),a=document.querySelector(".rotate");let o=!1;a.onclick=()=>{o=!o};const l=(i,a)=>{if(t.currentShip&&(t.currentShip.isVertical=o,t.gameboard.placeShip(t.currentShip,i,a))){if(document.getElementById(`${i}${a}`).classList.add("placed"),o)for(let e=0;e<t.currentShip.length;e+=1){const t=document.getElementById(`${i+e}${a}`);t&&t.classList.add("placed")}else for(let e=0;e<t.currentShip.length;e+=1){const t=document.getElementById(`${i}${a+e}`);t&&t.classList.add("placed")}t.nextShipToPlace(),t.currentShip||(e.placeShipsRandomly(),function(t,e){const s=document.getElementById("playerBoard"),i=document.getElementById("computerBoard"),r=document.getElementById("gameOver"),a=document.querySelector(".overlay"),o=document.querySelector(".restart");let l=!1;s.innerHTML="",i.innerHTML="",n(s,t,!0),n(i,e);const d=()=>{const n=document.querySelector(".win"),l=()=>{r.classList.remove("active"),a.classList.remove("active"),s.innerHTML="",i.innerHTML="",c()};return e.gameboard.allShipsSunk()?(n.innerText="You Win!",r.classList.add("active"),a.classList.add("active"),o.addEventListener("click",l),!0):!!t.gameboard.allShipsSunk()&&(n.innerText="You Lose!",r.classList.add("active"),a.classList.add("active"),o.addEventListener("click",l),!0)};i.addEventListener("click",(r=>{if(l)return;const c=r.target;if(t.attack(e.gameboard,c.id[0],c.id[1])){if(n(i,e),d())return void(l=!0);e.makeRandomAttack(t.gameboard),n(s,t,!0),d()&&(l=!0)}}))}(t,e),s.classList.remove("active"),r.classList.remove("active"))}},d=(e,s,i)=>{const r=document.getElementById(`${e}${s}`);if(i){if(r.classList.add("active"),t.currentShip)if(o)for(let i=0;i<t.currentShip.length;i+=1){const t=document.getElementById(`${e+i}${s}`);t&&t.classList.add("active")}else for(let i=0;i<t.currentShip.length;i+=1){const t=document.getElementById(`${e}${s+i}`);t&&t.classList.add("active")}}else{if(r.classList.remove("active"),!t.currentShip)return;for(let i=0;i<=t.currentShip.length;i+=1){const t=document.getElementById(`${e}${s+i}`),r=document.getElementById(`${e+i}${s}`);t&&t.classList.remove("active"),r&&r.classList.remove("active")}}};s.classList.add("active"),r.classList.add("active"),i.innerHTML="",(()=>{for(let t=0;t<10;t+=1){const e=document.createElement("div");e.classList.add("row"),i.appendChild(e);for(let s=0;s<10;s+=1){const i=document.createElement("div");i.classList.add("preview"),i.setAttribute("id",`${t}${s}`),i.addEventListener("click",(()=>l(t,s))),i.addEventListener("mouseover",(()=>d(t,s,!0))),i.addEventListener("mouseout",(()=>d(t,s,!1))),e.appendChild(i)}}})()}(new i,new r)}function n(t,e,s){t.innerHTML="";for(let i=0;i<10;i+=1){const r=document.createElement("div");r.classList.add("row"),t.appendChild(r);for(let t=0;t<10;t+=1){const c=document.createElement("div");c.classList.add("cell");const n=e.gameboard.grid[i][t];n&&n.isHit(i,t)?c.classList.add("hit"):null===e.gameboard.grid[i][t]&&e.gameboard.missedAttacks.some((e=>e.row==i&&e.col==t))?c.classList.add("miss"):n&&s&&c.classList.add("show"),c.setAttribute("id",`${i}${t}`),r.appendChild(c)}}}t.exports=c},112:t=>{t.exports=class{constructor(){this.grid=[];for(let t=0;t<10;t+=1)this.grid.push(Array(10).fill(null));this.ships=[],this.missedAttacks=[]}placeShip(t,e,s){if(this.checkShipPlacement(t,e,s)){if(t.setPosition(e,s),!0===t.isVertical)for(let i=0;i<t.length;i+=1)this.grid[e+i][s]=t;else if(!1===t.isVertical)for(let i=0;i<t.length;i+=1)this.grid[e][s+i]=t;return this.ships.push(t),!0}return!1}checkShipPlacement(t,e,s){if(!0===t.isVertical){if(e+t.length>10)return!1}else if(!1===t.isVertical&&s+t.length>10)return!1;for(let i=0;i<t.length;i+=1)if(!0===t.isVertical){if(null!==this.grid[e+i][s])return!1}else if(!1===t.isVertical&&null!==this.grid[e][s+i])return!1;return!0}receiveAttack(t,e){if(null===this.grid[t][e]&&this.missedAttacks.some((s=>s.row===t&&s.col===e)))return!1;const s=this.grid[t][e];if(null!==this.grid[t][e]&&!s.isSunk()){let i;return i=!0===s.isVertical?t-s.row:e-s.col,!!s.hit(i)}return this.missedAttacks.push({row:t,col:e}),!0}allShipsSunk(){return this.ships.every((t=>t.isSunk()))}}},758:(t,e,s)=>{const i=s(112),r=s(547);t.exports=class{constructor(){this.gameboard=new i,this.shipsToPlace=[new r(5,!1),new r(4,!1),new r(3,!1),new r(3,!1),new r(2,!1)],this.currentShip=this.shipsToPlace[0]}nextShipToPlace(){this.shipsToPlace.shift(),this.currentShip=this.shipsToPlace[0]}attack(t,e,s){return t.receiveAttack(e,s)}reset(){this.gameboard=new i}}},547:t=>{t.exports=class{constructor(t,e){this.length=t,this.isVertical=e,this.hits=Array(t).fill(!1),this.row=null,this.col=null}setPosition(t,e){this.row=t,this.col=e}hit(t){return!this.hits[t]&&(this.hits[t]=!0,!0)}isHit(t,e){return this.isVertical?this.hits[t-this.row]:this.hits[e-this.col]}isSunk(){return this.hits.every((t=>t))}}}},e={};!function s(i){var r=e[i];if(void 0!==r)return r.exports;var c=e[i]={exports:{}};return t[i](c,c.exports,s),c.exports}(82)()})();