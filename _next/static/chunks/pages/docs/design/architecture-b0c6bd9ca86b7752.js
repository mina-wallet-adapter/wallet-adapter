(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[428],{274:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/design/architecture",function(){return a(6535)}])},6535:function(e,t,a){"use strict";a.r(t),a.d(t,{__toc:function(){return c},default:function(){return p}});var n=a(4246),r=a(9304),i=a(7284),o=a(4637);a(8233);var d=a(1441),s={src:"/wallet-adapter/_next/static/media/design.2ff79125.png",height:740,width:720,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAABlBMVEX19fX+/v6+NEUvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGNgZGRgYGRkZGTAZIAARATMZIAzwEyIChAFYgAABboAJYdCpIcAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8};let c=[];function _createMdxContent(e){let t=Object.assign({h1:"h1",p:"p",img:"img"},(0,d.a)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{children:"Architecture"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"screenshot",placeholder:"blur",src:s})})]})}let l={MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:t}=Object.assign({},(0,d.a)(),e.components);return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)},pageOpts:{filePath:"pages/docs/design/architecture.md",route:"/docs/design/architecture",timestamp:1704367631e3,pageMap:[{kind:"Meta",data:{index:{title:"Home",display:"hidden",theme:{layout:"raw",breadcrumb:!1,toc:!1,sidebar:!1,pagination:!1,timestamp:!1,footer:!0}},docs:{title:"Docs",type:"page"},api:{title:"API Docs",type:"page",href:"https://mina-wallet-adapter.github.io/wallet-adapter/typedoc"}}},{kind:"Folder",name:"docs",route:"/docs",children:[{kind:"Meta",data:{intro:"Introduction",guide:"Getting Started",design:"Design",starter:"Starter Kits",faq:"FAQs",integrations:"Integrations"}},{kind:"Folder",name:"design",route:"/docs/design",children:[{kind:"Meta",data:{architecture:"Architecture","wallet-standard":"Wallet Standard",component:"UI Components",hook:"Hooks",style:"Styling"}},{kind:"MdxPage",name:"architecture",route:"/docs/design/architecture"},{kind:"MdxPage",name:"component",route:"/docs/design/component"},{kind:"MdxPage",name:"hook",route:"/docs/design/hook"},{kind:"MdxPage",name:"style",route:"/docs/design/style"},{kind:"MdxPage",name:"wallet-standard",route:"/docs/design/wallet-standard"}]},{kind:"MdxPage",name:"design",route:"/docs/design"},{kind:"MdxPage",name:"faq",route:"/docs/faq"},{kind:"Folder",name:"guide",route:"/docs/guide",children:[{kind:"Meta",data:{zkapp:"Use in zkApps",wallet:"Integrate in Wallets",build:"Build Locally"}},{kind:"MdxPage",name:"build",route:"/docs/guide/build"},{kind:"MdxPage",name:"wallet",route:"/docs/guide/wallet"},{kind:"MdxPage",name:"zkapp",route:"/docs/guide/zkapp"}]},{kind:"MdxPage",name:"guide",route:"/docs/guide"},{kind:"MdxPage",name:"integrations",route:"/docs/integrations"},{kind:"MdxPage",name:"intro",route:"/docs/intro"},{kind:"Folder",name:"starter",route:"/docs/starter",children:[{kind:"Meta",data:{react:"For React",svelte:"For Svelte"}},{kind:"MdxPage",name:"react",route:"/docs/starter/react"},{kind:"MdxPage",name:"svelte",route:"/docs/starter/svelte"}]},{kind:"MdxPage",name:"starter",route:"/docs/starter"}]},{kind:"MdxPage",name:"index",route:"/"}],flexsearch:{codeblocks:!0},title:"Architecture",headings:c},pageNextRoute:"/docs/design/architecture",nextraLayout:i.ZP,themeConfig:o.Z};var p=(0,r.j)(l)},4637:function(e,t,a){"use strict";var n=a(4246);a(7378);var r=a(6677),i=a(7284);let o={name:"Mina Wallet Adapter",url:"https://mina-wallet-adapter.github.io/wallet-adapter",description:"Add wallets support to your zkApps with ease."},d={logo:(0,n.jsx)("span",{children:o.name}),nextThemes:{defaultTheme:"dark"},useNextSeoProps(){let{asPath:e}=(0,r.useRouter)();if("/"!==e)return{titleTemplate:"%s – ".concat(o.name)}},head:function(){let{title:e}=(0,i.ZR)(),t=(e?e+" – ":"")+o.name,a="".concat(o.url,"/assets/og.png");return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("meta",{httpEquiv:"Content-Language",content:"en"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,n.jsx)("meta",{name:"apple-mobile-web-app-title",content:o.name}),(0,n.jsx)("meta",{name:"description",content:o.description}),(0,n.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),(0,n.jsx)("meta",{property:"twitter:url",content:o.url}),(0,n.jsx)("meta",{property:"twitter:title",content:t}),(0,n.jsx)("meta",{property:"twitter:image",content:a}),(0,n.jsx)("meta",{property:"twitter:description",content:o.description}),(0,n.jsx)("meta",{property:"og:type",content:"website"}),(0,n.jsx)("meta",{property:"og:locale",content:"en"}),(0,n.jsx)("meta",{property:"og:url",content:o.url}),(0,n.jsx)("meta",{property:"og:title",content:t}),(0,n.jsx)("meta",{property:"og:image",content:a}),(0,n.jsx)("meta",{property:"og:description",content:o.description}),(0,n.jsx)("meta",{property:"og:site_name",content:o.name})]})},project:{link:"https://github.com/mina-wallet-adapter/wallet-adapter"},docsRepositoryBase:"https://github.com/mina-wallet-adapter/wallet-adapter/tree/main/site",editLink:{text:"Edit this page on GitHub →"},search:{placeholder:"Search Docs ..."},footer:{text:(0,n.jsxs)("small",{children:["\xa9 ",new Date().getFullYear()," Mina Wallet Adapter."]})}};t.Z=d},3898:function(){}},function(e){e.O(0,[774,486,888,179],function(){return e(e.s=274)}),_N_E=e.O()}]);