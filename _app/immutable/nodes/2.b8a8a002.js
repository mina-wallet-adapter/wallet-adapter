import{_ as Re}from"../chunks/preload-helper.a4192956.js";import{A as K,s as ee,r as ie,f as $,a as D,g as C,h as T,c as B,d as h,j as w,i as L,x as k,B as z,u as ce,v as ue,w as fe,C as Je,D as Ye,z as we,l as U,m as H,n as F,e as Y,E as Q,F as Z,G as Ve,H as me,I as Qe,J as de,K as pe,L as J,k as Pe,M as Ue,N as Xe,y as re,O as xe,P as et,Q as ve,R as He,o as tt}from"../chunks/scheduler.1a003866.js";import{S as te,i as ne,a as N,g as X,t as A,c as x,b as j,d as q,m as G,e as R,f as ye}from"../chunks/index.c005b57e.js";import{w as nt}from"../chunks/index.6fb6d9f8.js";const lt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function _e(l){return l?.length!==void 0?l:Array.from(l)}var at={exports:{}};(function(l){var e=Object.prototype.hasOwnProperty,t="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(t=!1));function a(u,c,f){this.fn=u,this.context=c,this.once=f||!1}function s(u,c,f,i,d){if(typeof f!="function")throw new TypeError("The listener must be a function");var _=new a(f,i||u,d),p=t?t+c:c;return u._events[p]?u._events[p].fn?u._events[p]=[u._events[p],_]:u._events[p].push(_):(u._events[p]=_,u._eventsCount++),u}function r(u,c){--u._eventsCount===0?u._events=new n:delete u._events[c]}function o(){this._events=new n,this._eventsCount=0}o.prototype.eventNames=function(){var c=[],f,i;if(this._eventsCount===0)return c;for(i in f=this._events)e.call(f,i)&&c.push(t?i.slice(1):i);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(f)):c},o.prototype.listeners=function(c){var f=t?t+c:c,i=this._events[f];if(!i)return[];if(i.fn)return[i.fn];for(var d=0,_=i.length,p=new Array(_);d<_;d++)p[d]=i[d].fn;return p},o.prototype.listenerCount=function(c){var f=t?t+c:c,i=this._events[f];return i?i.fn?1:i.length:0},o.prototype.emit=function(c,f,i,d,_,p){var b=t?t+c:c;if(!this._events[b])return!1;var m=this._events[b],g=arguments.length,v,y;if(m.fn){switch(m.once&&this.removeListener(c,m.fn,void 0,!0),g){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,f),!0;case 3:return m.fn.call(m.context,f,i),!0;case 4:return m.fn.call(m.context,f,i,d),!0;case 5:return m.fn.call(m.context,f,i,d,_),!0;case 6:return m.fn.call(m.context,f,i,d,_,p),!0}for(y=1,v=new Array(g-1);y<g;y++)v[y-1]=arguments[y];m.fn.apply(m.context,v)}else{var I=m.length,E;for(y=0;y<I;y++)switch(m[y].once&&this.removeListener(c,m[y].fn,void 0,!0),g){case 1:m[y].fn.call(m[y].context);break;case 2:m[y].fn.call(m[y].context,f);break;case 3:m[y].fn.call(m[y].context,f,i);break;case 4:m[y].fn.call(m[y].context,f,i,d);break;default:if(!v)for(E=1,v=new Array(g-1);E<g;E++)v[E-1]=arguments[E];m[y].fn.apply(m[y].context,v)}}return!0},o.prototype.on=function(c,f,i){return s(this,c,f,i,!1)},o.prototype.once=function(c,f,i){return s(this,c,f,i,!0)},o.prototype.removeListener=function(c,f,i,d){var _=t?t+c:c;if(!this._events[_])return this;if(!f)return r(this,_),this;var p=this._events[_];if(p.fn)p.fn===f&&(!d||p.once)&&(!i||p.context===i)&&r(this,_);else{for(var b=0,m=[],g=p.length;b<g;b++)(p[b].fn!==f||d&&!p[b].once||i&&p[b].context!==i)&&m.push(p[b]);m.length?this._events[_]=m.length===1?m[0]:m:r(this,_)}return this},o.prototype.removeAllListeners=function(c){var f;return c?(f=t?t+c:c,this._events[f]&&r(this,f)):(this._events=new n,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=t,o.EventEmitter=o,l.exports=o})(at);var ae=(l=>(l.Installed="Installed",l.NotDetected="NotDetected",l.Loadable="Loadable",l.Unsupported="Unsupported",l))(ae||{}),ge=class extends Error{constructor(l,e){super(l),this.error=e}},st=class extends ge{constructor(){super(...arguments),this.name="WalletNotSelectedError"}},ot=class extends ge{constructor(){super(...arguments),this.name="WalletNotReadyError"}},he=class extends ge{constructor(){super(...arguments),this.name="WalletNotConnectedError"}};function rt(l,e=null){try{const t=localStorage.getItem(l);if(t)return JSON.parse(t)}catch(t){typeof window<"u"&&console.error(t)}return e}function it(l,e=null){try{e===null?localStorage.removeItem(l):localStorage.setItem(l,JSON.stringify(e))}catch(t){typeof window<"u"&&console.error(t)}}const S=dt();function ct(l){const{onError:e,wallets:t}=K(S);t.forEach(({adapter:n})=>{n.on("readyStateChange",Ze,n)}),l.on("connect",ze),l.on("disconnect",Fe),l.on("error",e)}async function ut(){const{adapter:l}=K(S);try{S.setConnecting(!0),await l?.connect()}catch{S.resetWallet()}finally{S.setConnecting(!1)}}async function ft(){const{connected:l,connecting:e,disconnecting:t,ready:n,adapter:a}=K(S);if(!(l||e||t)){if(!a)throw le(new st);if(!(n===ae.Installed||n===ae.Loadable))throw S.resetWallet(),typeof window<"u"&&window.open(a.url,"_blank"),le(new ot);try{S.setConnecting(!0),await a.connect()}catch(s){throw S.resetWallet(),s}finally{S.setConnecting(!1)}}}function dt(){const{subscribe:l,update:e}=nt({autoConnect:!1,wallets:[],adapter:null,connected:!1,connecting:!1,disconnecting:!1,localStorageKey:"walletAdapter",onError:r=>console.error(r),publicKey:null,ready:"Unsupported",wallet:null,name:null,walletsByName:{},connect:ft,disconnect:Ke,select:qe,signMessage:void 0,signTransaction:void 0,signAndSendTransaction:void 0});function t(r){a(r),e(o=>({...o,name:r?.name||null,wallet:r,ready:r?.readyState||"Unsupported",publicKey:r?.publicKey||null,connected:r?.connected||!1})),r&&_t()&&ut()}function n(r){const{localStorageKey:o,walletsByName:u}=K(S),c=u?.[r]??null;it(o,r),t(c)}function a(r){je(),r&&ct(r),e(o=>({...o,adapter:r}))}function s(r){let o,u,c;r&&("signMessage"in r&&(c=async function(f){const{connected:i}=K(S);if(!i)throw le(new he);return await r.signMessage(f)}),"signTransaction"in r&&(o=async function(f){const{connected:i}=K(S);if(!i)throw le(new he);return await r.signTransaction(f)}),"signAndSendTransaction"in r&&(u=async function(f){const{connected:i}=K(S);if(!i)throw le(new he);return await r.signAndSendTransaction(f)})),e(f=>({...f,signTransaction:o,signAndSendTransaction:u,signMessage:c}))}return{resetWallet:()=>n(null),setConnecting:r=>e(o=>({...o,connecting:r})),setDisconnecting:r=>e(o=>({...o,disconnecting:r})),setReady:r=>e(o=>({...o,ready:r})),subscribe:l,updateConfig:r=>e(o=>({...o,...r})),updateWallets:r=>e(o=>({...o,...r})),updateStatus:r=>e(o=>({...o,...r})),updateWallet:r=>n(r),updateFeatures:r=>s(r)}}async function Ke(){const{disconnecting:l,adapter:e}=K(S);if(!l){if(!e)return S.resetWallet();try{S.setDisconnecting(!0),await e.disconnect()}finally{S.resetWallet(),S.setDisconnecting(!1)}}}async function pt({wallets:l,autoConnect:e=!1,localStorageKey:t="walletAdapter",onError:n=a=>console.error(a)}){const a=l.reduce((o,u)=>(o[u.name]=u,o),{}),s=l.map(o=>({adapter:o,readyState:o.readyState}));S.updateConfig({wallets:s,walletsByName:a,autoConnect:e,localStorageKey:t,onError:n});const r=rt(t);r&&await qe(r)}function le(l){const{onError:e}=K(S);return e(l),l}function ze(){const{adapter:l}=K(S);l&&(S.updateFeatures(l),S.updateStatus({publicKey:l.publicKey,connected:l.connected}))}function Fe(){S.resetWallet()}function Ze(l){const{adapter:e,wallets:t}=K(S);if(!e)return;S.setReady(e.readyState);const n=t.findIndex(({adapter:a})=>a.name===this.name);n!==-1&&S.updateWallets([...t.slice(0,n),{...t[n],readyState:l},...t.slice(n+1)])}function je(){const{adapter:l,onError:e,wallets:t}=K(S);l&&(t.forEach(({adapter:n})=>{n.off("readyStateChange",Ze,n)}),l.off("connect",ze),l.off("disconnect",Fe),l.off("error",e))}async function qe(l){const{name:e,adapter:t}=K(S);e!==l&&(t&&await Ke(),S.updateWallet(l))}function _t(){const{adapter:l,autoConnect:e,ready:t,connected:n,connecting:a}=K(S);return!(!e||!l||!(t===ae.Installed||t===ae.Loadable)||n||a)}typeof window<"u"&&window.addEventListener("beforeunload",je);const mt=l=>({}),ke=l=>({}),ht=l=>({}),$e=l=>({});function Ce(l){let e,t;const n=l[4]["start-icon"],a=ie(n,l,l[3],$e);return{c(){e=$("i"),a&&a.c(),this.h()},l(s){e=C(s,"I",{class:!0});var r=T(e);a&&a.l(r),r.forEach(h),this.h()},h(){w(e,"class","wallet-adapter-button-start-icon")},m(s,r){L(s,e,r),a&&a.m(e,null),t=!0},p(s,r){a&&a.p&&(!t||r&8)&&ce(a,n,s,s[3],t?fe(n,s[3],r,ht):ue(s[3]),$e)},i(s){t||(N(a,s),t=!0)},o(s){A(a,s),t=!1},d(s){s&&h(e),a&&a.d(s)}}}function wt(l){let e,t,n,a,s,r,o,u,c=l[2]["start-icon"]&&Ce(l);const f=l[4].default,i=ie(f,l,l[3],null),d=l[4].status,_=ie(d,l,l[3],ke);return{c(){e=$("button"),c&&c.c(),t=D(),i&&i.c(),n=D(),a=$("span"),_&&_.c(),this.h()},l(p){e=C(p,"BUTTON",{class:!0,style:!0});var b=T(e);c&&c.l(b),t=B(b),i&&i.l(b),n=B(b),a=C(b,"SPAN",{});var m=T(a);_&&_.l(m),m.forEach(h),b.forEach(h),this.h()},h(){w(e,"class",s="wallet-adapter-button "+l[1]),w(e,"style","justify-content: space-between;"),e.disabled=l[0]},m(p,b){L(p,e,b),c&&c.m(e,null),k(e,t),i&&i.m(e,null),k(e,n),k(e,a),_&&_.m(a,null),r=!0,o||(u=z(e,"click",l[5]),o=!0)},p(p,[b]){p[2]["start-icon"]?c?(c.p(p,b),b&4&&N(c,1)):(c=Ce(p),c.c(),N(c,1),c.m(e,t)):c&&(X(),A(c,1,1,()=>{c=null}),x()),i&&i.p&&(!r||b&8)&&ce(i,f,p,p[3],r?fe(f,p[3],b,null):ue(p[3]),null),_&&_.p&&(!r||b&8)&&ce(_,d,p,p[3],r?fe(d,p[3],b,mt):ue(p[3]),ke),(!r||b&2&&s!==(s="wallet-adapter-button "+p[1]))&&w(e,"class",s),(!r||b&1)&&(e.disabled=p[0])},i(p){r||(N(c),N(i,p),N(_,p),r=!0)},o(p){A(c),A(i,p),A(_,p),r=!1},d(p){p&&h(e),c&&c.d(),i&&i.d(p),_&&_.d(p),o=!1,u()}}}function gt(l,e,t){let{$$slots:n={},$$scope:a}=e;const s=Je(n);let{disabled:r=!1}=e,{class:o=""}=e;function u(c){Ye.call(this,l,c)}return l.$$set=c=>{"disabled"in c&&t(0,r=c.disabled),"class"in c&&t(1,o=c.class),"$$scope"in c&&t(3,a=c.$$scope)},[r,o,s,a,n,u]}class se extends te{constructor(e){super(),ne(this,e,gt,wt,ee,{disabled:0,class:1})}}function bt(l){let e;return{c(){e=U(l[4])},l(t){e=H(t,l[4])},m(t,n){L(t,e,n)},p(t,n){n&16&&F(e,t[4])},d(t){t&&h(e)}}}function Ee(l){let e,t,n;return{c(){e=$("img"),this.h()},l(a){e=C(a,"IMG",{src:!0,alt:!0}),this.h()},h(){Q(e.src,t=l[3].icon)||w(e,"src",t),w(e,"alt",n=`${l[3].name} icon`)},m(a,s){L(a,e,s)},p(a,s){s&8&&!Q(e.src,t=a[3].icon)&&w(e,"src",t),s&8&&n!==(n=`${a[3].name} icon`)&&w(e,"alt",n)},d(a){a&&h(e)}}}function vt(l){let e,t=l[3]&&Ee(l);return{c(){t&&t.c(),e=Y()},l(n){t&&t.l(n),e=Y()},m(n,a){t&&t.m(n,a),L(n,e,a)},p(n,a){n[3]?t?t.p(n,a):(t=Ee(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(n){n&&h(e),t&&t.d(n)}}}function yt(l){let e,t;return e=new se({props:{disabled:l[0]||!l[3]||l[2]||l[1],class:"wallet-adapter-button-trigger",$$slots:{"start-icon":[vt],default:[bt]},$$scope:{ctx:l}}}),e.$on("click",l[5]),{c(){j(e.$$.fragment)},l(n){q(e.$$.fragment,n)},m(n,a){G(e,n,a),t=!0},p(n,[a]){const s={};a&15&&(s.disabled=n[0]||!n[3]||n[2]||n[1]),a&280&&(s.$$scope={dirty:a,ctx:n}),e.$set(s)},i(n){t||(N(e.$$.fragment,n),t=!0)},o(n){A(e.$$.fragment,n),t=!1},d(n){R(e,n)}}}function kt(l,e,t){let n,a,s,r,o;we(l,S,i=>t(6,o=i));let{disabled:u=!1}=e,c;function f(i){a().catch(()=>{})}return l.$$set=i=>{"disabled"in i&&t(0,u=i.disabled)},l.$$.update=()=>{l.$$.dirty&64&&t(3,{wallet:n,connect:a,connecting:s,connected:r}=o,n,(t(2,s),t(6,o)),(t(1,r),t(6,o))),l.$$.dirty&14&&(t(4,c="Connect Wallet"),n&&t(4,c="Connect"),s&&t(4,c="Connecting ..."),r&&t(4,c="Connected"))},[u,r,s,n,c,f,o]}class $t extends te{constructor(e){super(),ne(this,e,kt,yt,ee,{disabled:0})}}function Ct(l){const e=l-1;return e*e*e+1}function Le(l,{delay:e=0,duration:t=400,easing:n=Ct,axis:a="y"}={}){const s=getComputedStyle(l),r=+s.opacity,o=a==="y"?"height":"width",u=parseFloat(s[o]),c=a==="y"?["top","bottom"]:["left","right"],f=c.map(g=>`${g[0].toUpperCase()}${g.slice(1)}`),i=parseFloat(s[`padding${f[0]}`]),d=parseFloat(s[`padding${f[1]}`]),_=parseFloat(s[`margin${f[0]}`]),p=parseFloat(s[`margin${f[1]}`]),b=parseFloat(s[`border${f[0]}Width`]),m=parseFloat(s[`border${f[1]}Width`]);return{delay:e,duration:t,easing:n,css:g=>`overflow: hidden;opacity: ${Math.min(g*20,1)*r};${o}: ${g*u}px;padding-${c[0]}: ${g*i}px;padding-${c[1]}: ${g*d}px;margin-${c[0]}: ${g*_}px;margin-${c[1]}: ${g*p}px;border-${c[0]}-width: ${g*b}px;border-${c[1]}-width: ${g*m}px;`}}function Ge(l,e){function t(n){l&&n.target instanceof Node&&!l.contains(n.target)&&!n.defaultPrevented&&e()}return document.body.addEventListener("click",t,!0),{update(n){e=n},destroy(){document.body.removeEventListener("click",t,!0)}}}const{window:Et}=lt;function Ne(l,e,t){const n=l.slice();return n[18]=e[t].adapter.name,n[19]=e[t].adapter.icon,n[20]=e[t].adapter.url,n[21]=e[t].readyState,n}function Se(l,e,t){const n=l.slice();return n[18]=e[t].adapter.name,n[19]=e[t].adapter.icon,n[20]=e[t].adapter.url,n[21]=e[t].readyState,n}function Lt(l){let e,t,n="New to Mina? Learn More",a,s,r,o=l[3]?"Hide options":"Already have a wallet? View options",u,c,f,i,d,_,p,b,m,g=l[3]&&We(l);return{c(){e=$("div"),t=$("button"),t.textContent=n,a=D(),s=$("button"),r=$("span"),u=U(o),c=D(),f=de("svg"),i=de("path"),d=D(),g&&g.c(),_=Y(),this.h()},l(v){e=C(v,"DIV",{class:!0});var y=T(e);t=C(y,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),Z(t)!=="svelte-16pe227"&&(t.textContent=n),y.forEach(h),a=B(v),s=C(v,"BUTTON",{class:!0,style:!0});var I=T(s);r=C(I,"SPAN",{});var E=T(r);u=H(E,o),E.forEach(h),c=B(I),f=pe(I,"svg",{width:!0,height:!0,viewBox:!0,xmlns:!0});var M=T(f);i=pe(M,"path",{d:!0}),T(i).forEach(h),M.forEach(h),I.forEach(h),d=B(v),g&&g.l(v),_=Y(),this.h()},h(){w(t,"type","button"),w(t,"class","wallet-adapter-modal-middle-button"),w(e,"class","wallet-adapter-modal-middle"),w(i,"d","M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"),w(f,"width","13"),w(f,"height","7"),w(f,"viewBox","0 0 13 7"),w(f,"xmlns","http://www.w3.org/2000/svg"),J(f,"wallet-adapter-modal-list-more-icon-rotate",l[1]),w(s,"class","wallet-adapter-modal-list-more"),Pe(s,"justify-content","space-between"),J(s,"wallet-adapter-modal-collapse-button-active",l[1])},m(v,y){L(v,e,y),k(e,t),L(v,a,y),L(v,s,y),k(s,r),k(r,u),k(s,c),k(s,f),k(f,i),L(v,d,y),g&&g.m(v,y),L(v,_,y),p=!0,b||(m=[z(t,"click",l[12]),z(s,"click",l[16])],b=!0)},p(v,y){(!p||y&8)&&o!==(o=v[3]?"Hide options":"Already have a wallet? View options")&&F(u,o),(!p||y&2)&&J(f,"wallet-adapter-modal-list-more-icon-rotate",v[1]),(!p||y&2)&&J(s,"wallet-adapter-modal-collapse-button-active",v[1]),v[3]?g?(g.p(v,y),y&8&&N(g,1)):(g=We(v),g.c(),N(g,1),g.m(_.parentNode,_)):g&&(X(),A(g,1,1,()=>{g=null}),x())},i(v){p||(N(g),p=!0)},o(v){A(g),p=!1},d(v){v&&(h(e),h(a),h(s),h(d),h(_)),g&&g.d(v),b=!1,me(m)}}}function Nt(l){let e,t,n,a,s,r,o=_e(l[2].wallets.slice(0,l[5])),u=[];for(let i=0;i<o.length;i+=1)u[i]=Ae(Se(l,o,i));const c=i=>A(u[i],1,1,()=>{u[i]=null});let f=l[2].wallets.length>l[0]&&Ie(l);return{c(){e=$("div"),t=D(),n=$("ul");for(let i=0;i<u.length;i+=1)u[i].c();a=D(),f&&f.c(),s=Y(),this.h()},l(i){e=C(i,"DIV",{class:!0}),T(e).forEach(h),t=B(i),n=C(i,"UL",{class:!0});var d=T(n);for(let _=0;_<u.length;_+=1)u[_].l(d);d.forEach(h),a=B(i),f&&f.l(i),s=Y(),this.h()},h(){w(e,"class","wallet-adapter-modal-middle"),w(n,"class","wallet-adapter-modal-list")},m(i,d){L(i,e,d),L(i,t,d),L(i,n,d);for(let _=0;_<u.length;_+=1)u[_]&&u[_].m(n,null);L(i,a,d),f&&f.m(i,d),L(i,s,d),r=!0},p(i,d){if(d&164){o=_e(i[2].wallets.slice(0,i[5]));let _;for(_=0;_<o.length;_+=1){const p=Se(i,o,_);u[_]?(u[_].p(p,d),N(u[_],1)):(u[_]=Ae(p),u[_].c(),N(u[_],1),u[_].m(n,null))}for(X(),_=o.length;_<u.length;_+=1)c(_);x()}i[2].wallets.length>i[0]?f?f.p(i,d):(f=Ie(i),f.c(),f.m(s.parentNode,s)):f&&(f.d(1),f=null)},i(i){if(!r){for(let d=0;d<o.length;d+=1)N(u[d]);r=!0}},o(i){u=u.filter(Boolean);for(let d=0;d<u.length;d+=1)A(u[d]);r=!1},d(i){i&&(h(e),h(t),h(n),h(a),h(s)),Ue(u,i),f&&f.d(i)}}}function We(l){let e,t,n,a=_e(l[2].wallets.slice(0,l[5])),s=[];for(let o=0;o<a.length;o+=1)s[o]=Te(Ne(l,a,o));const r=o=>A(s[o],1,1,()=>{s[o]=null});return{c(){e=$("ul");for(let o=0;o<s.length;o+=1)s[o].c();this.h()},l(o){e=C(o,"UL",{class:!0});var u=T(e);for(let c=0;c<s.length;c+=1)s[c].l(u);u.forEach(h),this.h()},h(){w(e,"class","wallet-adapter-modal-list")},m(o,u){L(o,e,u);for(let c=0;c<s.length;c+=1)s[c]&&s[c].m(e,null);n=!0},p(o,u){if(u&164){a=_e(o[2].wallets.slice(0,o[5]));let c;for(c=0;c<a.length;c+=1){const f=Ne(o,a,c);s[c]?(s[c].p(f,u),N(s[c],1)):(s[c]=Te(f),s[c].c(),N(s[c],1),s[c].m(e,null))}for(X(),c=a.length;c<s.length;c+=1)r(c);x()}},i(o){if(!n){for(let u=0;u<a.length;u+=1)N(s[u]);o&&Xe(()=>{n&&(t||(t=ye(e,Le,{duration:300},!0)),t.run(1))}),n=!0}},o(o){s=s.filter(Boolean);for(let u=0;u<s.length;u+=1)A(s[u]);o&&(t||(t=ye(e,Le,{duration:300},!1)),t.run(0)),n=!1},d(o){o&&h(e),Ue(s,o),o&&t&&t.end()}}}function St(l){let e=l[18]+"",t;return{c(){t=U(e)},l(n){t=H(n,e)},m(n,a){L(n,t,a)},p(n,a){a&36&&e!==(e=n[18]+"")&&F(t,e)},d(n){n&&h(t)}}}function Wt(l){let e,t,n;return{c(){e=$("img"),this.h()},l(a){e=C(a,"IMG",{src:!0,alt:!0}),this.h()},h(){Q(e.src,t=l[19])||w(e,"src",t),w(e,"alt",n=`${l[18]} icon`)},m(a,s){L(a,e,s)},p(a,s){s&36&&!Q(e.src,t=a[19])&&w(e,"src",t),s&36&&n!==(n=`${a[18]} icon`)&&w(e,"alt",n)},d(a){a&&h(e)}}}function Tt(l){let e=l[21]==="Installed"?"Detected":"",t;return{c(){t=U(e)},l(n){t=H(n,e)},m(n,a){L(n,t,a)},p(n,a){a&36&&e!==(e=n[21]==="Installed"?"Detected":"")&&F(t,e)},d(n){n&&h(t)}}}function Te(l){let e,t,n,a;function s(){return l[17](l[18])}return t=new se({props:{$$slots:{status:[Tt],"start-icon":[Wt],default:[St]},$$scope:{ctx:l}}}),t.$on("click",s),{c(){e=$("li"),j(t.$$.fragment),n=D()},l(r){e=C(r,"LI",{});var o=T(e);q(t.$$.fragment,o),n=B(o),o.forEach(h)},m(r,o){L(r,e,o),G(t,e,null),k(e,n),a=!0},p(r,o){l=r;const u={};o&67108900&&(u.$$scope={dirty:o,ctx:l}),t.$set(u)},i(r){a||(N(t.$$.fragment,r),a=!0)},o(r){A(t.$$.fragment,r),a=!1},d(r){r&&h(e),R(t)}}}function At(l){let e=l[18]+"",t;return{c(){t=U(e)},l(n){t=H(n,e)},m(n,a){L(n,t,a)},p(n,a){a&36&&e!==(e=n[18]+"")&&F(t,e)},d(n){n&&h(t)}}}function It(l){let e,t,n;return{c(){e=$("img"),this.h()},l(a){e=C(a,"IMG",{src:!0,alt:!0}),this.h()},h(){Q(e.src,t=l[19])||w(e,"src",t),w(e,"alt",n=`${l[18]} icon`)},m(a,s){L(a,e,s)},p(a,s){s&36&&!Q(e.src,t=a[19])&&w(e,"src",t),s&36&&n!==(n=`${a[18]} icon`)&&w(e,"alt",n)},d(a){a&&h(e)}}}function Mt(l){let e=l[21]==="Installed"?"Detected":"",t;return{c(){t=U(e)},l(n){t=H(n,e)},m(n,a){L(n,t,a)},p(n,a){a&36&&e!==(e=n[21]==="Installed"?"Detected":"")&&F(t,e)},d(n){n&&h(t)}}}function Ae(l){let e,t,n,a;function s(){return l[14](l[18])}return t=new se({props:{$$slots:{status:[Mt],"start-icon":[It],default:[At]},$$scope:{ctx:l}}}),t.$on("click",s),{c(){e=$("li"),j(t.$$.fragment),n=D()},l(r){e=C(r,"LI",{});var o=T(e);q(t.$$.fragment,o),n=B(o),o.forEach(h)},m(r,o){L(r,e,o),G(t,e,null),k(e,n),a=!0},p(r,o){l=r;const u={};o&67108900&&(u.$$scope={dirty:o,ctx:l}),t.$set(u)},i(r){a||(N(t.$$.fragment,r),a=!0)},o(r){A(t.$$.fragment,r),a=!1},d(r){r&&h(e),R(t)}}}function Ie(l){let e,t,n=l[1]?"Less":"More",a,s,r,o,u,c,f;return{c(){e=$("button"),t=$("span"),a=U(n),s=U(" options"),r=D(),o=de("svg"),u=de("path"),this.h()},l(i){e=C(i,"BUTTON",{class:!0,style:!0});var d=T(e);t=C(d,"SPAN",{});var _=T(t);a=H(_,n),s=H(_," options"),_.forEach(h),r=B(d),o=pe(d,"svg",{width:!0,height:!0,viewBox:!0,xmlns:!0});var p=T(o);u=pe(p,"path",{d:!0}),T(u).forEach(h),p.forEach(h),d.forEach(h),this.h()},h(){w(u,"d","M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"),w(o,"width","13"),w(o,"height","7"),w(o,"viewBox","0 0 13 7"),w(o,"xmlns","http://www.w3.org/2000/svg"),J(o,"wallet-adapter-modal-list-more-icon-rotate",l[1]),w(e,"class","wallet-adapter-modal-list-more"),Pe(e,"justify-content","space-between"),J(e,"wallet-adapter-modal-collapse-button-active",l[1])},m(i,d){L(i,e,d),k(e,t),k(t,a),k(t,s),k(e,r),k(e,o),k(o,u),c||(f=z(e,"click",l[15]),c=!0)},p(i,d){d&2&&n!==(n=i[1]?"Less":"More")&&F(a,n),d&2&&J(o,"wallet-adapter-modal-list-more-icon-rotate",i[1]),d&2&&J(e,"wallet-adapter-modal-collapse-button-active",i[1])},d(i){i&&h(e),c=!1,f()}}}function Ot(l){let e,t,n,a,s=l[4]?"Connect a wallet to continue":"You'll need a wallet on Mina to continue",r,o,u,c='<svg width="14" height="14"><path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path></svg>',f,i,d='<svg width="97" height="97" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M90,152.74a9.1,9.1,0,0,1-9.34-8.31l-1-8.23c-10-2.85-15.86-10.25-17.37-22l-9-69.34a33.52,33.52,0,0,0-5.85-.42,31.56,31.56,0,0,0-8.56,1.11V150.71H21.18V66.18c0-11.47,5.14-19.57,14.53-22.94V37.79c0-6.3,3.82-10.53,9.51-10.53s9.26,3.54,10.18,10l.7,5.05c10.25,2.9,16.32,11.15,18.06,24.54l8.31,66.84a39.74,39.74,0,0,0,15.06,0l8.31-66.83c1.74-13.4,7.81-21.65,18.06-24.55l.7-5.05c.92-6.43,4.53-10,10.18-10s9.51,4.23,9.51,10.53v5.45c9.39,3.37,14.53,11.47,14.53,22.94v84.53H141.14V45.54a31.62,31.62,0,0,0-8.56-1.11,33.52,33.52,0,0,0-5.85.42l-9,69.35c-1.48,11.54-7.48,19.12-17.37,22l-1,8.25A8.89,8.89,0,0,1,90,152.74ZM82.89,137l.9,7.09A5.92,5.92,0,0,0,90,149.59a5.8,5.8,0,0,0,6.21-5.54l.9-7.1a43.87,43.87,0,0,1-14.22,0Zm61.4,10.61h11.38V66.18c0-9.72-3.92-16.43-11.38-19.56Zm-120,0H35.71V46.62c-7.46,3.13-11.38,9.84-11.38,19.56ZM56.56,45.72l8.81,68.07c1.27,9.85,5.91,16.22,13.82,19L71,67.21C69.53,55.65,64.79,48.59,56.56,45.72Zm66.88,0c-8.23,2.87-13,9.93-14.47,21.5l-8.15,65.53c7.9-2.78,12.55-9.15,13.81-19ZM38.86,42.24v0a35.31,35.31,0,0,1,8.56-1,39,39,0,0,1,5.41.32l-.55-3.93c-.69-4.82-3.06-7.26-7.06-7.26s-6.36,2.83-6.36,7.38Zm93.72-1a35.31,35.31,0,0,1,8.56,1V37.79c0-4.55-2.44-7.38-6.36-7.38s-6.37,2.44-7.06,7.26l-.55,3.93A39,39,0,0,1,132.58,41.28Z"></path></svg>',_,p,b,m,g,v;const y=[Nt,Lt],I=[];function E(M,W){return M[4]?0:1}return p=E(l),b=I[p]=y[p](l),{c(){e=$("div"),t=$("div"),n=$("div"),a=$("h1"),r=U(s),o=D(),u=$("button"),u.innerHTML=c,f=D(),i=$("div"),i.innerHTML=d,_=D(),b.c(),this.h()},l(M){e=C(M,"DIV",{"aria-labelledby":!0,"aria-modal":!0,class:!0,role:!0});var W=T(e);t=C(W,"DIV",{class:!0});var V=T(t);n=C(V,"DIV",{class:!0});var O=T(n);a=C(O,"H1",{class:!0});var P=T(a);r=H(P,s),P.forEach(h),o=B(O),u=C(O,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(u)!=="svelte-7q2xew"&&(u.innerHTML=c),f=B(O),i=C(O,"DIV",{class:!0,"data-svelte-h":!0}),Z(i)!=="svelte-1jzwf9e"&&(i.innerHTML=d),_=B(O),b.l(O),O.forEach(h),V.forEach(h),W.forEach(h),this.h()},h(){w(a,"class","wallet-adapter-modal-title"),w(u,"class","wallet-adapter-modal-button-close"),w(i,"class","wallet-adapter-modal-middle"),w(n,"class","wallet-adapter-modal-wrapper"),w(t,"class","wallet-adapter-modal-container"),w(e,"aria-labelledby","wallet-adapter-modal-title"),w(e,"aria-modal","true"),w(e,"class","wallet-adapter-modal wallet-adapter-modal-fade-in"),w(e,"role","dialog")},m(M,W){L(M,e,W),k(e,t),k(t,n),k(n,a),k(a,r),k(n,o),k(n,u),k(n,f),k(n,i),k(n,_),I[p].m(n,null),m=!0,g||(v=[z(Et,"keyup",l[11]),z(u,"click",l[13]),Ve(Ge.call(null,n,l[10]))],g=!0)},p(M,[W]){(!m||W&16)&&s!==(s=M[4]?"Connect a wallet to continue":"You'll need a wallet on Mina to continue")&&F(r,s);let V=p;p=E(M),p===V?I[p].p(M,W):(X(),A(I[V],1,1,()=>{I[V]=null}),x(),b=I[p],b?b.p(M,W):(b=I[p]=y[p](M),b.c()),N(b,1),b.m(n,null))},i(M){m||(N(b),m=!0)},o(M){A(b),m=!1},d(M){M&&h(e),I[p].d(),g=!1,me(v)}}}const Dt="https://docs.minaprotocol.com/using-mina/install-a-wallet";function Bt(l,e,t){let n,a,s;we(l,S,E=>t(2,s=E));let{maxNumberOfWallets:r}=e,o=!1,u=!1;const c=Qe();function f(E){c("connect",E)}function i(){t(1,o=!o)}function d(){t(3,u=!u)}function _(){c("close")}function p(E){E.key=="Escape"&&_()}function b(){typeof window<"u"&&window.open(Dt,"_blank"),_()}const m=()=>c("close"),g=E=>f(E),v=()=>i(),y=()=>d(),I=E=>f(E);return l.$$set=E=>{"maxNumberOfWallets"in E&&t(0,r=E.maxNumberOfWallets)},l.$$.update=()=>{l.$$.dirty&7&&t(5,n=o?s.wallets.length:r),l.$$.dirty&4&&t(4,a=s.wallets.filter(E=>E.readyState==="Installed").length)},[r,o,s,u,a,n,c,f,i,d,_,p,b,m,g,v,y,I]}class Vt extends te{constructor(e){super(),ne(this,e,Bt,Ot,ee,{maxNumberOfWallets:0})}}function Pt(l){let e,t,n,a;t=new se({props:{class:"wallet-adapter-button-trigger",$$slots:{"start-icon":[zt],default:[Kt]},$$scope:{ctx:l}}}),t.$on("click",l[8]);let s=l[1]&&Me(l);return{c(){e=$("div"),j(t.$$.fragment),n=D(),s&&s.c(),this.h()},l(r){e=C(r,"DIV",{class:!0});var o=T(e);q(t.$$.fragment,o),n=B(o),s&&s.l(o),o.forEach(h),this.h()},h(){w(e,"class","wallet-adapter-dropdown")},m(r,o){L(r,e,o),G(t,e,null),k(e,n),s&&s.m(e,null),a=!0},p(r,o){const u={};o&524384&&(u.$$scope={dirty:o,ctx:r}),t.$set(u),r[1]?s?s.p(r,o):(s=Me(r),s.c(),s.m(e,null)):s&&(s.d(1),s=null)},i(r){a||(N(t.$$.fragment,r),a=!0)},o(r){A(t.$$.fragment,r),a=!1},d(r){r&&h(e),R(t),s&&s.d()}}}function Ut(l){let e,t;return e=new $t({}),{c(){j(e.$$.fragment)},l(n){q(e.$$.fragment,n)},m(n,a){G(e,n,a),t=!0},p:re,i(n){t||(N(e.$$.fragment,n),t=!0)},o(n){A(e.$$.fragment,n),t=!1},d(n){R(e,n)}}}function Ht(l){let e,t;return e=new se({props:{class:"wallet-adapter-button-trigger",$$slots:{default:[Zt]},$$scope:{ctx:l}}}),e.$on("click",l[10]),{c(){j(e.$$.fragment)},l(n){q(e.$$.fragment,n)},m(n,a){G(e,n,a),t=!0},p(n,a){const s={};a&524288&&(s.$$scope={dirty:a,ctx:n}),e.$set(s)},i(n){t||(N(e.$$.fragment,n),t=!0)},o(n){A(e.$$.fragment,n),t=!1},d(n){R(e,n)}}}function Kt(l){let e;return{c(){e=U(l[5])},l(t){e=H(t,l[5])},m(t,n){L(t,e,n)},p(t,n){n&32&&F(e,t[5])},d(t){t&&h(e)}}}function zt(l){let e,t,n;return{c(){e=$("img"),this.h()},l(a){e=C(a,"IMG",{src:!0,alt:!0}),this.h()},h(){Q(e.src,t=l[6].icon)||w(e,"src",t),w(e,"alt",n=`${l[6].name} icon`)},m(a,s){L(a,e,s)},p(a,s){s&64&&!Q(e.src,t=a[6].icon)&&w(e,"src",t),s&64&&n!==(n=`${a[6].name} icon`)&&w(e,"alt",n)},d(a){a&&h(e)}}}function Me(l){let e,t,n,a=l[3]?"Copied":"Copy address",s,r,o,u,c="Connect a different wallet",f,i,d,_="Disconnect",p,b,m;return{c(){e=$("ul"),t=$("li"),n=$("button"),s=U(a),r=D(),o=$("li"),u=$("button"),u.textContent=c,f=D(),i=$("li"),d=$("button"),d.textContent=_,this.h()},l(g){e=C(g,"UL",{"aria-label":!0,class:!0,role:!0});var v=T(e);t=C(v,"LI",{role:!0});var y=T(t);n=C(y,"BUTTON",{class:!0});var I=T(n);s=H(I,a),I.forEach(h),y.forEach(h),r=B(v),o=C(v,"LI",{role:!0});var E=T(o);u=C(E,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(u)!=="svelte-1mkvevh"&&(u.textContent=c),E.forEach(h),f=B(v),i=C(v,"LI",{role:!0});var M=T(i);d=C(M,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(d)!=="svelte-ak9qbk"&&(d.textContent=_),M.forEach(h),v.forEach(h),this.h()},h(){w(n,"class","wallet-adapter-dropdown-list-item"),w(t,"role","menuitem"),w(u,"class","wallet-adapter-dropdown-list-item"),w(o,"role","menuitem"),w(d,"class","wallet-adapter-dropdown-list-item"),w(i,"role","menuitem"),w(e,"aria-label","dropdown-list"),w(e,"class","wallet-adapter-dropdown-list wallet-adapter-dropdown-list-active"),w(e,"role","menu")},m(g,v){L(g,e,v),k(e,t),k(t,n),k(n,s),k(e,r),k(e,o),k(o,u),k(e,f),k(e,i),k(i,d),b||(m=[z(n,"click",l[7]),z(u,"click",l[10]),z(d,"click",l[14]),Ve(p=Ge.call(null,e,l[18]))],b=!0)},p(g,v){v&8&&a!==(a=g[3]?"Copied":"Copy address")&&F(s,a),p&&xe(p.update)&&v&2&&p.update.call(null,g[18])},d(g){g&&h(e),b=!1,me(m)}}}function Ft(l){let e;return{c(){e=U("Connect Wallet")},l(t){e=H(t,"Connect Wallet")},m(t,n){L(t,e,n)},d(t){t&&h(e)}}}function Zt(l){let e;const t=l[17].default,n=ie(t,l,l[19],null),a=n||Ft();return{c(){a&&a.c()},l(s){a&&a.l(s)},m(s,r){a&&a.m(s,r),e=!0},p(s,r){n&&n.p&&(!e||r&524288)&&ce(n,t,s,s[19],e?fe(t,s[19],r,null):ue(s[19]),null)},i(s){e||(N(a,s),e=!0)},o(s){A(a,s),e=!1},d(s){a&&a.d(s)}}}function Oe(l){let e,t;return e=new Vt({props:{maxNumberOfWallets:l[0]}}),e.$on("close",l[11]),e.$on("connect",l[13]),{c(){j(e.$$.fragment)},l(n){q(e.$$.fragment,n)},m(n,a){G(e,n,a),t=!0},p(n,a){const s={};a&1&&(s.maxNumberOfWallets=n[0]),e.$set(s)},i(n){t||(N(e.$$.fragment,n),t=!0)},o(n){A(e.$$.fragment,n),t=!1},d(n){R(e,n)}}}function jt(l){let e,t,n,a,s,r,o;const u=[Ht,Ut,Pt],c=[];function f(d,_){return d[6]?d[4]?2:1:0}e=f(l),t=c[e]=u[e](l);let i=l[2]&&Oe(l);return{c(){t.c(),n=D(),i&&i.c(),a=Y()},l(d){t.l(d),n=B(d),i&&i.l(d),a=Y()},m(d,_){c[e].m(d,_),L(d,n,_),i&&i.m(d,_),L(d,a,_),s=!0,r||(o=z(window,"keyup",l[12]),r=!0)},p(d,[_]){let p=e;e=f(d),e===p?c[e].p(d,_):(X(),A(c[p],1,1,()=>{c[p]=null}),x(),t=c[e],t?t.p(d,_):(t=c[e]=u[e](d),t.c()),N(t,1),t.m(n.parentNode,n)),d[2]?i?(i.p(d,_),_&4&&N(i,1)):(i=Oe(d),i.c(),N(i,1),i.m(a.parentNode,a)):i&&(X(),A(i,1,1,()=>{i=null}),x())},i(d){s||(N(t),N(i),s=!0)},o(d){A(t),A(i),s=!1},d(d){d&&(h(n),h(a)),c[e].d(d),i&&i.d(d),r=!1,o()}}}function qt(l){const e=l.publicKey;return!l.wallet||!e?null:e.slice(0,6)+"..."+e.slice(-6)}function Gt(l,e,t){let n,a,s,r,o,u,c,f;we(l,S,P=>t(16,f=P));let{$$slots:i={},$$scope:d}=e,{maxNumberOfWallets:_=3}=e,p=!1,b=!1,m=!1;const g=async()=>{u&&(await navigator.clipboard.writeText(u),t(3,m=!0),setTimeout(()=>t(3,m=!1),400))},v=()=>t(1,p=!0),y=()=>t(1,p=!1),I=()=>{t(2,b=!0),y()},E=()=>t(2,b=!1);function M(P){P.key=="Escape"&&y()}async function W(P){E(),await o(P.detail),await r()}async function V(P){y(),await s()}const O=()=>{p&&y()};return l.$$set=P=>{"maxNumberOfWallets"in P&&t(0,_=P.maxNumberOfWallets),"$$scope"in P&&t(19,d=P.$$scope)},l.$$.update=()=>{l.$$.dirty&65536&&t(15,{publicKey:n,wallet:a,disconnect:s,connect:r,select:o}=f,n,(t(6,a),t(16,f))),l.$$.dirty&32768&&t(4,u=n),l.$$.dirty&65536&&t(5,c=qt(f))},[_,p,b,m,u,c,a,g,v,y,I,E,M,W,V,n,f,i,O,d]}class Rt extends te{constructor(e){super(),ne(this,e,Gt,jt,ee,{maxNumberOfWallets:0})}}function Jt(l){let e,t="window.global = window;";return{c(){e=$("script"),e.textContent=t},l(n){const a=et("svelte-1bmosr0",document.head);e=C(a,"SCRIPT",{"data-svelte-h":!0}),Z(e)!=="svelte-1sjc3c5"&&(e.textContent=t),a.forEach(h)},m(n,a){k(document.head,e)},p:re,i:re,o:re,d(n){h(e)}}}function Yt(l,e,t){let{localStorageKey:n,wallets:a,autoConnect:s=!1,onError:r=o=>console.error(o)}=e;return l.$$set=o=>{"localStorageKey"in o&&t(0,n=o.localStorageKey),"wallets"in o&&t(1,a=o.wallets),"autoConnect"in o&&t(2,s=o.autoConnect),"onError"in o&&t(3,r=o.onError)},l.$$.update=()=>{l.$$.dirty&15&&a&&pt({wallets:a,autoConnect:s,localStorageKey:n,onError:r})},[n,a,s,r]}class Qt extends te{constructor(e){super(),ne(this,e,Yt,Jt,ee,{localStorageKey:0,wallets:1,autoConnect:2,onError:3})}}function De(l){let e,t,n,a,s;return e=new Qt({props:{localStorageKey:xt,wallets:l[1],autoConnect:!0}}),a=new Rt({}),{c(){j(e.$$.fragment),t=D(),n=$("span"),j(a.$$.fragment),this.h()},l(r){q(e.$$.fragment,r),t=B(r),n=C(r,"SPAN",{class:!0});var o=T(n);q(a.$$.fragment,o),o.forEach(h),this.h()},h(){w(n,"class","svelte-1x39pzk")},m(r,o){G(e,r,o),L(r,t,o),L(r,n,o),G(a,n,null),s=!0},p(r,o){const u={};o&2&&(u.wallets=r[1]),e.$set(u)},i(r){s||(N(e.$$.fragment,r),N(a.$$.fragment,r),s=!0)},o(r){A(e.$$.fragment,r),A(a.$$.fragment,r),s=!1},d(r){r&&(h(t),h(n)),R(e,r),R(a)}}}function Xt(l){let e,t,n="Squared - Demo zkApp",a,s,r=`Demo of
		<a href="https://github.com/aztemi/mina-wallet-adapter" target="_blank">mina-wallet-adapter</a> for implementing zkApps in Svelte.`,o,u,c,f,i,d,_,p,b,m,g,v,y="Submit",I,E,M,W=l[1].length&&De(l);return{c(){e=$("main"),t=$("h1"),t.textContent=n,a=D(),s=$("p"),s.innerHTML=r,o=D(),W&&W.c(),u=D(),c=$("div"),f=$("p"),i=U("What is the square of "),d=$("strong"),_=U(Be),p=U("?"),b=D(),m=$("input"),g=D(),v=$("button"),v.textContent=y,this.h()},l(V){e=C(V,"MAIN",{class:!0});var O=T(e);t=C(O,"H1",{"data-svelte-h":!0}),Z(t)!=="svelte-o1r58z"&&(t.textContent=n),a=B(O),s=C(O,"P",{"data-svelte-h":!0}),Z(s)!=="svelte-jb61ik"&&(s.innerHTML=r),o=B(O),W&&W.l(O),u=B(O),c=C(O,"DIV",{class:!0});var P=T(c);f=C(P,"P",{class:!0});var oe=T(f);i=H(oe,"What is the square of "),d=C(oe,"STRONG",{});var be=T(d);_=H(be,Be),be.forEach(h),p=H(oe,"?"),oe.forEach(h),b=B(P),m=C(P,"INPUT",{type:!0,min:!0,class:!0}),g=B(P),v=C(P,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(v)!=="svelte-1h83afp"&&(v.textContent=y),P.forEach(h),O.forEach(h),this.h()},h(){w(f,"class","svelte-1x39pzk"),w(m,"type","number"),w(m,"min","0"),w(m,"class","svelte-1x39pzk"),w(v,"class","wallet-adapter-button wallet-adapter-button-trigger"),w(c,"class","svelte-1x39pzk"),w(e,"class","svelte-1x39pzk")},m(V,O){L(V,e,O),k(e,t),k(e,a),k(e,s),k(e,o),W&&W.m(e,null),k(e,u),k(e,c),k(c,f),k(f,i),k(f,d),k(d,_),k(f,p),k(c,b),k(c,m),ve(m,l[0]),k(c,g),k(c,v),I=!0,E||(M=[z(m,"input",l[2]),z(v,"click",en)],E=!0)},p(V,[O]){V[1].length?W?(W.p(V,O),O&2&&N(W,1)):(W=De(V),W.c(),N(W,1),W.m(e,u)):W&&(X(),A(W,1,1,()=>{W=null}),x()),O&1&&He(m.value)!==V[0]&&ve(m,V[0])},i(V){I||(N(W),I=!0)},o(V){A(W),I=!1},d(V){V&&h(e),W&&W.d(),E=!1,me(M)}}}let Be=2;const xt="MinaWalletAdapter";function en(){}function tn(l,e,t){let n,a=[];tt(async()=>{const{AuroWalletAdapter:r}=await Re(()=>import("../chunks/index.eb1c92a7.js"),[],import.meta.url);t(1,a=[new r])});function s(){n=He(this.value),t(0,n)}return[n,a,s]}class on extends te{constructor(e){super(),ne(this,e,tn,Xt,ee,{})}}export{on as component};
