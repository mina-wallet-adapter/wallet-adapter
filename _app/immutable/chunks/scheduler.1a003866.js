function k(){}const Y=t=>t;function H(t,e){for(const n in e)t[n]=e[n];return t}function P(t){return t()}function Z(){return Object.create(null)}function B(t){t.forEach(P)}function L(t){return typeof t=="function"}function $(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let h;function tt(t,e){return t===e?!0:(h||(h=document.createElement("a")),h.href=e,t===h.href)}function et(t){return Object.keys(t).length===0}function A(t,...e){if(t==null){for(const r of e)r(void 0);return k}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function nt(t){let e;return A(t,n=>e=n)(),e}function rt(t,e,n){t.$$.on_destroy.push(A(e,n))}function it(t,e,n,r){if(t){const i=j(t,e,n,r);return t[0](i)}}function j(t,e,n,r){return t[1]&&r?H(n.ctx.slice(),t[1](r(e))):n.ctx}function ct(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const o=[],c=Math.max(e.dirty.length,i.length);for(let s=0;s<c;s+=1)o[s]=e.dirty[s]|i[s];return o}return e.dirty|i}return e.dirty}function lt(t,e,n,r,i,o){if(i){const c=j(e,n,r,o);t.p(c,i)}}function st(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function ot(t){const e={};for(const n in t)e[n]=!0;return e}function ut(t){return t&&L(t.destroy)?t.destroy:k}let p=!1;function at(){p=!0}function ft(){p=!1}function M(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function O(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&l.push(a)}e=l}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,a=(i>0&&e[n[i]].claim_order<=u?i+1:M(1,i,q=>e[n[q]].claim_order,u))-1;r[l]=n[a]+1;const E=a+1;n[E]=l,i=Math.max(E,i)}const o=[],c=[];let s=e.length-1;for(let l=n[i]+1;l!=0;l=r[l-1]){for(o.push(e[l-1]);s>=l;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);o.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<o.length&&c[l].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(c[l],a)}}function R(t,e){t.appendChild(e)}function z(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function _t(t){const e=C("style");return e.textContent="/* empty */",F(z(t),e),e.sheet}function F(t,e){return R(t.head||t,e),e.sheet}function I(t,e){if(p){for(O(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function dt(t,e,n){p&&!n?I(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ht(t){t.parentNode&&t.parentNode.removeChild(t)}function mt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function C(t){return document.createElement(t)}function U(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function x(t){return document.createTextNode(t)}function pt(){return x(" ")}function yt(){return x("")}function bt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function gt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function xt(t){return t.dataset.svelteH}function vt(t){return t===""?null:+t}function Et(t){return Array.from(t.childNodes)}function W(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,r,i=!1){W(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const l=n(s);return l===void 0?t.splice(c,1):t[c]=l,i||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const l=n(s);return l===void 0?t.splice(c,1):t[c]=l,i?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return r()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function S(t,e,n,r){return D(t,i=>i.nodeName===e,i=>{const o=[];for(let c=0;c<i.attributes.length;c++){const s=i.attributes[c];n[s.name]||o.push(s.name)}o.forEach(c=>i.removeAttribute(c))},()=>r(e))}function wt(t,e,n){return S(t,e,n,C)}function Nt(t,e,n){return S(t,e,n,U)}function G(t,e){return D(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>x(e),!0)}function kt(t){return G(t," ")}function At(t,e){e=""+e,t.data!==e&&(t.data=e)}function jt(t,e){t.value=e??""}function Ct(t,e,n,r){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function Dt(t,e,n){t.classList.toggle(e,!!n)}function J(t,e,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:r})}function St(t,e){const n=[];let r=0;for(const i of e.childNodes)if(i.nodeType===8){const o=i.textContent.trim();o===`HEAD_${t}_END`?(r-=1,n.push(i)):o===`HEAD_${t}_START`&&(r+=1,n.push(i))}else r>0&&n.push(i);return n}function Tt(t,e){return new t(e)}let m;function y(t){m=t}function v(){if(!m)throw new Error("Function called outside component initialization");return m}function qt(t){v().$$.on_mount.push(t)}function Ht(t){v().$$.after_update.push(t)}function Pt(){const t=v();return(e,n,{cancelable:r=!1}={})=>{const i=t.$$.callbacks[e];if(i){const o=J(e,n,{cancelable:r});return i.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function Bt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(r=>r.call(this,e))}const d=[],w=[];let _=[];const N=[],T=Promise.resolve();let g=!1;function K(){g||(g=!0,T.then(V))}function Lt(){return K(),T}function Q(t){_.push(t)}const b=new Set;let f=0;function V(){if(f!==0)return;const t=m;do{try{for(;f<d.length;){const e=d[f];f++,y(e),X(e.$$)}}catch(e){throw d.length=0,f=0,e}for(y(null),d.length=0,f=0;w.length;)w.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];b.has(n)||(b.add(n),n())}_.length=0}while(d.length);for(;N.length;)N.pop()();g=!1,b.clear(),y(t)}function X(t){if(t.fragment!==null){t.update(),B(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Q)}}function Mt(t){const e=[],n=[];_.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),_=e}export{y as $,nt as A,bt as B,ot as C,Bt as D,tt as E,xt as F,ut as G,B as H,Pt as I,U as J,Nt as K,Dt as L,mt as M,Q as N,L as O,St as P,jt as Q,vt as R,z as S,_t as T,J as U,Y as V,Z as W,V as X,et as Y,Mt as Z,m as _,pt as a,P as a0,d as a1,K as a2,at as a3,ft as a4,Ht as b,kt as c,ht as d,yt as e,C as f,wt as g,Et as h,dt as i,gt as j,Ct as k,x as l,G as m,At as n,qt as o,w as p,Tt as q,it as r,$ as s,Lt as t,lt as u,st as v,ct as w,I as x,k as y,rt as z};
