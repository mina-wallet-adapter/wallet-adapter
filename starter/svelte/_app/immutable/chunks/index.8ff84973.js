import{y as x,S as F,T as H,d as V,H as v,O as j,N as R,U as L,V as T,W as A,h as W,X,Y,Z,_ as q,$ as I,a0 as G,a1 as J,a2 as K,a3 as Q,a4 as tt}from"./scheduler.55cf6ca1.js";const k=typeof window<"u";let et=k?()=>window.performance.now():()=>Date.now(),z=k?t=>requestAnimationFrame(t):x;const y=new Set;function B(t){y.forEach(e=>{e.c(t)||(y.delete(e),e.f())}),y.size!==0&&z(B)}function nt(t){let e;return y.size===0&&z(B),{promise:new Promise(n=>{y.add(e={c:t,f:n})}),abort(){y.delete(e)}}}const E=new Map;let O=0;function st(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function it(t,e){const n={stylesheet:H(e),rules:{}};return E.set(t,n),n}function U(t,e,n,r,c,f,l,s=0){const u=16.666/r;let i=`{
`;for(let d=0;d<=1;d+=u){const g=e+(n-e)*f(d);i+=d*100+`%{${l(g,1-g)}}
`}const $=i+`100% {${l(n,1-n)}}
}`,o=`__svelte_${st($)}_${s}`,m=F(t),{stylesheet:p,rules:a}=E.get(m)||it(m,t);a[o]||(a[o]=!0,p.insertRule(`@keyframes ${o} ${$}`,p.cssRules.length));const _=t.style.animation||"";return t.style.animation=`${_?`${_}, `:""}${o} ${r}ms linear ${c}ms 1 both`,O+=1,o}function rt(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?f=>f.indexOf(e)<0:f=>f.indexOf("__svelte")===-1),c=n.length-r.length;c&&(t.style.animation=r.join(", "),O-=c,O||at())}function at(){z(()=>{O||(E.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&V(e)}),E.clear())})}let w;function ot(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function P(t,e,n){t.dispatchEvent(L(`${e?"intro":"outro"}${n}`))}const b=new Set;let h;function ht(){h={r:0,c:[],p:h}}function mt(){h.r||v(h.c),h=h.p}function ft(t,e){t&&t.i&&(b.delete(t),t.i(e))}function pt(t,e,n,r){if(t&&t.o){if(b.has(t))return;b.add(t),h.c.push(()=>{b.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const ut={duration:0};function gt(t,e,n,r){let f=e(t,n,{direction:"both"}),l=r?0:1,s=null,u=null,i=null,$;function o(){i&&rt(t,i)}function m(a,_){const d=a.b-l;return _*=Math.abs(d),{a:l,b:a.b,d,duration:_,start:a.start,end:a.start+_,group:a.group}}function p(a){const{delay:_=0,duration:d=300,easing:g=T,tick:C=x,css:M}=f||ut,N={start:et()+_,b:a};a||(N.group=h,h.r+=1),"inert"in t&&(a?$!==void 0&&(t.inert=$):($=t.inert,t.inert=!0)),s||u?u=N:(M&&(o(),i=U(t,l,a,d,_,g,M)),a&&C(0,1),s=m(N,d),R(()=>P(t,a,"start")),nt(S=>{if(u&&S>u.start&&(s=m(u,d),u=null,P(t,s.b,"start"),M&&(o(),i=U(t,l,s.b,s.duration,0,g,f.css))),s){if(S>=s.end)C(l=s.b,1-l),P(t,s.b,"end"),u||(s.b?o():--s.group.r||v(s.group.c)),s=null;else if(S>=s.start){const D=S-s.start;l=s.a+s.d*g(D/s.duration),C(l,1-l)}}return!!(s||u)}))}return{run(a){j(f)?ot().then(()=>{f=f({direction:a?"in":"out"}),p(a)}):p(a)},end(){o(),s=u=null}}}function yt(t){t&&t.c()}function wt(t,e){t&&t.l(e)}function lt(t,e,n){const{fragment:r,after_update:c}=t.$$;r&&r.m(e,n),R(()=>{const f=t.$$.on_mount.map(G).filter(j);t.$$.on_destroy?t.$$.on_destroy.push(...f):v(f),t.$$.on_mount=[]}),c.forEach(R)}function ct(t,e){const n=t.$$;n.fragment!==null&&(Z(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){t.$$.dirty[0]===-1&&(J.push(t),K(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function xt(t,e,n,r,c,f,l=null,s=[-1]){const u=q;I(t);const i=t.$$={fragment:null,ctx:[],props:f,update:x,not_equal:c,bound:A(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:A(),dirty:s,skip_bound:!1,root:e.target||u.$$.root};l&&l(i.root);let $=!1;if(i.ctx=n?n(t,e.props||{},(o,m,...p)=>{const a=p.length?p[0]:m;return i.ctx&&c(i.ctx[o],i.ctx[o]=a)&&(!i.skip_bound&&i.bound[o]&&i.bound[o](a),$&&dt(t,o)),m}):[],i.update(),$=!0,v(i.before_update),i.fragment=r?r(i.ctx):!1,e.target){if(e.hydrate){Q();const o=W(e.target);i.fragment&&i.fragment.l(o),o.forEach(V)}else i.fragment&&i.fragment.c();e.intro&&ft(t.$$.fragment),lt(t,e.target,e.anchor),tt(),X()}I(u)}class vt{$$=void 0;$$set=void 0;$destroy(){ct(this,1),this.$destroy=x}$on(e,n){if(!j(n))return x;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(e){this.$$set&&!Y(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const _t="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(_t);export{vt as S,ft as a,yt as b,mt as c,wt as d,ct as e,gt as f,ht as g,xt as i,lt as m,pt as t};
