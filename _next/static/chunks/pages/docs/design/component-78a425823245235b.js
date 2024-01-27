(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[181],{3098:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/design/component",function(){return n(6834)}])},6834:function(e,t,n){"use strict";n.r(t),n.d(t,{__toc:function(){return p},default:function(){return m}});var a=n(4246),o=n(9304),i=n(7284),d=n(4637);n(8233);var r=n(1441),s={src:"/wallet-adapter/_next/static/media/connect_button.7fab93ad.png",height:57,width:479,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAElBMVEVkZGpgYWNXWVllZmlhXnFMaXFMeMq/AAAABnRSTlP+7urfnQAtIiFAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEUlEQVR4nGNgYGBmZWFgYgQAAEkAEObPVpsAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},l={src:"/wallet-adapter/_next/static/media/menu.242743bb.png",height:161,width:240,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAMAAABPT11nAAAAElBMVEU9PkFGR0kzNDdOTlAmJypZWlw6DixrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAAACNJREFUeJxFyLEBADAMwjAbwv8vd6xGsdia4QVyUETlz4KSPgbjAEYmf96WAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:5};n(8579);var c=n(1653);let p=[{depth:2,value:"1. Connect Button",id:"1-connect-button"},{depth:2,value:"2. Welcome Modal",id:"2-welcome-modal"},{depth:2,value:"3. Select Modal",id:"3-select-modal"},{depth:2,value:"4. Context Menu",id:"4-context-menu"}];function _createMdxContent(e){let t=Object.assign({h1:"h1",p:"p",h2:"h2",img:"img"},(0,r.a)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:"Components"}),"\n",(0,a.jsx)(t.p,{children:"This consists of 4 primary components."}),"\n",(0,a.jsx)(t.h2,{id:"1-connect-button",children:"1. Connect Button"}),"\n",(0,a.jsx)(t.p,{children:"This serves as the entry button to connect a wallet. When clicked, it opens either the Welcome Modal if no wallet is detected or the Select Modal if any wallet is detected. After wallet connection, the button displays the connected account address truncated for the UI (i.e., B62qo7...F5dJSu). Clicking the connected button will present the Dropdown Menu for further options."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"Connect button",placeholder:"blur",src:s})}),"\n",(0,a.jsx)(t.h2,{id:"2-welcome-modal",children:"2. Welcome Modal"}),"\n",(0,a.jsx)(t.p,{children:"Displayed when no wallet is detected, the Welcome Modal presents a redirect button to the Mina Protocol official guide page for installing wallets and a configurable list of links to the websites of popular Mina wallets."}),"\n",(0,a.jsx)("img",{src:(0,c.jW)("/assets/welcome_modal.png"),alt:"Welcome Modal",width:"300"}),"\n",(0,a.jsx)(t.h2,{id:"3-select-modal",children:"3. Select Modal"}),"\n",(0,a.jsx)(t.p,{children:"This is shown when at least one wallet is detected as installed. It displays a button list of wallets supported by the zkApp. Detected wallets are sorted to the top of the list for easy access. Click any of the wallets in the list to trigger a connection flow."}),"\n",(0,a.jsx)("img",{src:(0,c.jW)("/assets/select_modal.png"),alt:"Select Modal",width:"300"}),"\n",(0,a.jsx)(t.h2,{id:"4-context-menu",children:"4. Context Menu"}),"\n",(0,a.jsx)(t.p,{children:"Available after a wallet is connected, this dropdown contains menu options to copy the connected wallet address to the clipboard, connect to another wallet, and disconnect."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"Context Menu",placeholder:"blur",src:l})})]})}let u={MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:t}=Object.assign({},(0,r.a)(),e.components);return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)},pageOpts:{filePath:"pages/docs/design/component.mdx",route:"/docs/design/component",timestamp:170465798e4,pageMap:[{kind:"Meta",data:{index:{title:"Home",display:"hidden",theme:{layout:"raw",breadcrumb:!1,toc:!1,sidebar:!1,pagination:!1,timestamp:!1,footer:!0}},docs:{title:"Docs",type:"page"}}},{kind:"Folder",name:"docs",route:"/docs",children:[{kind:"Meta",data:{intro:"Introduction",guide:"Guide",design:"Design",starter:"Starter Kits",faq:"FAQs",integrations:"Integrations"}},{kind:"Folder",name:"design",route:"/docs/design",children:[{kind:"Meta",data:{architecture:"Architecture","wallet-standard":"Wallet Standard",binding:"UI Bindings",component:"Components",hook:"Hooks",style:"Styling"}},{kind:"MdxPage",name:"architecture",route:"/docs/design/architecture"},{kind:"MdxPage",name:"binding",route:"/docs/design/binding"},{kind:"MdxPage",name:"component",route:"/docs/design/component"},{kind:"MdxPage",name:"hook",route:"/docs/design/hook"},{kind:"MdxPage",name:"style",route:"/docs/design/style"},{kind:"MdxPage",name:"wallet-standard",route:"/docs/design/wallet-standard"}]},{kind:"MdxPage",name:"design",route:"/docs/design"},{kind:"MdxPage",name:"faq",route:"/docs/faq"},{kind:"Folder",name:"guide",route:"/docs/guide",children:[{kind:"Meta",data:{zkapp:"Use in zkApps",wallet:"Integrate in Wallets",build:"Develop Locally"}},{kind:"MdxPage",name:"build",route:"/docs/guide/build"},{kind:"MdxPage",name:"wallet",route:"/docs/guide/wallet"},{kind:"MdxPage",name:"zkapp",route:"/docs/guide/zkapp"}]},{kind:"MdxPage",name:"guide",route:"/docs/guide"},{kind:"MdxPage",name:"integrations",route:"/docs/integrations"},{kind:"MdxPage",name:"intro",route:"/docs/intro"},{kind:"Folder",name:"starter",route:"/docs/starter",children:[{kind:"Meta",data:{svelte:"For Svelte",react:"For React"}},{kind:"MdxPage",name:"react",route:"/docs/starter/react"},{kind:"MdxPage",name:"svelte",route:"/docs/starter/svelte"}]},{kind:"MdxPage",name:"starter",route:"/docs/starter"}]},{kind:"MdxPage",name:"index",route:"/"}],flexsearch:{codeblocks:!0},title:"Components",headings:p},pageNextRoute:"/docs/design/component",nextraLayout:i.ZP,themeConfig:d.Z};var m=(0,o.j)(u)},4637:function(e,t,n){"use strict";var a=n(4246);n(7378);var o=n(6677),i=n(7284);let d={name:"Mina Wallet Adapter",url:"https://mina-wallet-adapter.github.io/wallet-adapter",description:"Add wallets support to your zkApps with ease."},r={logo:(0,a.jsx)("span",{children:d.name}),nextThemes:{defaultTheme:"dark"},useNextSeoProps(){let{asPath:e}=(0,o.useRouter)();if("/"!==e)return{titleTemplate:"%s – ".concat(d.name)}},head:function(){let{title:e}=(0,i.ZR)(),t=(e?e+" – ":"")+d.name,n="".concat(d.url,"/og.png");return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("meta",{httpEquiv:"Content-Language",content:"en"}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,a.jsx)("meta",{name:"apple-mobile-web-app-title",content:d.name}),(0,a.jsx)("meta",{name:"description",content:d.description}),(0,a.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),(0,a.jsx)("meta",{property:"twitter:url",content:d.url}),(0,a.jsx)("meta",{property:"twitter:title",content:t}),(0,a.jsx)("meta",{property:"twitter:image",content:n}),(0,a.jsx)("meta",{property:"twitter:description",content:d.description}),(0,a.jsx)("meta",{property:"og:type",content:"website"}),(0,a.jsx)("meta",{property:"og:locale",content:"en"}),(0,a.jsx)("meta",{property:"og:url",content:d.url}),(0,a.jsx)("meta",{property:"og:title",content:t}),(0,a.jsx)("meta",{property:"og:image",content:n}),(0,a.jsx)("meta",{property:"og:description",content:d.description}),(0,a.jsx)("meta",{property:"og:site_name",content:d.name})]})},project:{link:"https://github.com/mina-wallet-adapter/wallet-adapter"},docsRepositoryBase:"https://github.com/mina-wallet-adapter/wallet-adapter/tree/main/site",editLink:{text:"Edit this page on GitHub →"},search:{placeholder:"Search Docs ..."},footer:{text:(0,a.jsxs)("small",{children:["\xa9 ",new Date().getFullYear()," Mina Wallet Adapter."]})}};t.Z=r},3898:function(){},1653:function(e,t,n){"use strict";n.d(t,{jW:function(){return addAssetPrefix}});var a=n(4284);let o="github"===a.env.BUILD_ENV,i=o?"/wallet-adapter":"",addAssetPrefix=e=>"".concat(i).concat(e)}},function(e){e.O(0,[774,486,888,179],function(){return e(e.s=3098)}),_N_E=e.O()}]);