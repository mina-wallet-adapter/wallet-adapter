(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[141],{5745:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/guide/zkapp",function(){return s(8726)}])},8726:function(e,t,s){"use strict";s.r(t),s.d(t,{__toc:function(){return d}});var a=s(4246),n=s(9304),l=s(7284),r=s(4637);s(8233);var i=s(1441),o=s(2308);let d=[{depth:2,value:"Option 1: Starter-Kits",id:"option-1-starter-kits"},{depth:2,value:"Option 2: Manual Installation",id:"option-2-manual-installation"},{depth:3,value:"Add dependency",id:"add-dependency"},{depth:3,value:"Import components",id:"import-components"},{depth:3,value:"Use in App",id:"use-in-app"},{depth:3,value:"That's it",id:"thats-it"},{depth:3,value:"Add dependency",id:"add-dependency-1"},{depth:3,value:"Import components",id:"import-components-1"},{depth:3,value:"Use in App",id:"use-in-app-1"},{depth:3,value:"That's it",id:"thats-it-1"}];function _createMdxContent(e){let t=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",span:"span",h3:"h3"},(0,i.a)(),e.components);return o.mQ||_missingMdxReference("Tabs",!1),o.mQ.Tab||_missingMdxReference("Tabs.Tab",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:"Mina Wallet Adapter for zkApps"}),"\n",(0,a.jsx)(t.p,{children:"There are two possible options to quickly add the Mina Wallet Adapter to your zkApps."}),"\n",(0,a.jsx)(t.h2,{id:"option-1-starter-kits",children:"Option 1: Starter-Kits"}),"\n",(0,a.jsx)(t.p,{children:"The easiest way to start using the Mina Wallet Adapter is to build upon the starter-kit projects. There are starter-kits for various JavaScript frameworks; choose any compatible with your zkApp."}),"\n",(0,a.jsxs)(o.mQ,{items:["React","Svelte"],storageKey:"selectedJSFramework",children:[(0,a.jsx)(o.mQ.Tab,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsxs)(t.code,{"data-language":"bash","data-theme":"default",children:[(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"npx"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"degit"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"mina-wallet-adapter/starter-kit-react"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"my-zkapp"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"cd"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"my-zkapp"})]})]})})}),(0,a.jsx)(o.mQ.Tab,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsxs)(t.code,{"data-language":"bash","data-theme":"default",children:[(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"npx"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"degit"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"mina-wallet-adapter/starter-kit-svelte"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"my-zkapp"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"cd"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"my-zkapp"})]})]})})})]}),"\n",(0,a.jsx)(t.h2,{id:"option-2-manual-installation",children:"Option 2: Manual Installation"}),"\n",(0,a.jsx)(t.p,{children:"Manually add the Mina Wallet Adapter to your pre-existing zkApp project."}),"\n",(0,a.jsxs)(o.mQ,{items:["React","Svelte"],storageKey:"selectedJSFramework",children:[(0,a.jsx)(o.mQ.Tab,{children:(0,a.jsxs)(o.Rg,{children:[(0,a.jsx)(t.h3,{id:"add-dependency",children:"Add dependency"}),(0,a.jsx)(t.p,{children:"Install the following dependency in your project. Only a single package is required."}),(0,a.jsxs)(o.mQ,{items:["npm","pnpm","yarn","bun"],storageKey:"selectedPackageManager",children:[(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"npm"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"install"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-react"})]})})})}),(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"pnpm"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"add"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-react"})]})})})}),(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"yarn"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"add"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-react"})]})})})}),(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"bun"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"add"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-react"})]})})})})]}),(0,a.jsx)(t.h3,{id:"import-components",children:"Import components"}),(0,a.jsxs)(t.p,{children:["the default mode requires just ",(0,a.jsx)(t.code,{children:"WalletProvider"})," and ",(0,a.jsx)(t.code,{children:"WalletMultiButton"}),". The ",(0,a.jsx)(t.code,{children:"wallet-adapter.css"})," file is optional and just for the default theme. Feel free to customize its CSS styles or replace the file with a project-specific stylesheet."]}),(0,a.jsx)(t.pre,{"data-language":"js","data-theme":"default",filename:"App.tsx",hasCopyCode:!0,children:(0,a.jsxs)(t.code,{"data-language":"js","data-theme":"default",children:[(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" { WalletProvider"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" WalletMultiButton } "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"from"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"@mina-wallet-adapter/ui-react"'}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:";"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"@mina-wallet-adapter/ui-react/dist/wallet-adapter.css"'}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:";"})]})]})}),(0,a.jsx)(t.h3,{id:"use-in-app",children:"Use in App"}),(0,a.jsxs)(t.p,{children:["Use ",(0,a.jsx)(t.code,{children:"WalletProvider"})," as the root of your App to set up the necessary context object for your React app.\nThe ",(0,a.jsx)(t.code,{children:"WalletMultiButton"})," shows the user a button to connect and a modal to select available wallets from. It automatically uses the connection state to display appropriate components."]}),(0,a.jsx)(t.pre,{"data-language":"js","data-theme":"default",filename:"App.tsx",hasCopyCode:!0,children:(0,a.jsxs)(t.code,{"data-language":"js","data-theme":"default",children:[(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"App"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"() {"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"  "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"return"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" ("})]}),"\n",(0,a.jsxs)(t.span,{className:"line highlighted",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"    <"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"WalletProvider"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,a.jsxs)(t.span,{className:"line highlighted",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"      <"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"WalletMultiButton"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"      <"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"YourApp"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]}),"\n",(0,a.jsxs)(t.span,{className:"line highlighted",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"    </"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"WalletProvider"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:">"})]}),"\n",(0,a.jsx)(t.span,{className:"line",children:(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"  );"})}),"\n",(0,a.jsx)(t.span,{className:"line",children:(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"}"})})]})}),(0,a.jsx)(o.UW,{type:"info",children:(0,a.jsxs)(t.p,{children:["Wrap your app with the ",(0,a.jsx)(t.code,{children:"WalletProvider"})," so that you can use other components and hooks underneath it."]})}),(0,a.jsx)(t.h3,{id:"thats-it",children:"That's it"}),(0,a.jsxs)(t.p,{children:["You can now start adding the ",(0,a.jsx)(t.code,{children:"useWallet"})," hook for more advanced features."]})]})}),(0,a.jsx)(o.mQ.Tab,{children:(0,a.jsxs)(o.Rg,{children:[(0,a.jsx)(t.h3,{id:"add-dependency-1",children:"Add dependency"}),(0,a.jsx)(t.p,{children:"Install the following dependency to your project. Only a single package is required."}),(0,a.jsxs)(o.mQ,{items:["npm","pnpm","yarn","bun"],storageKey:"selectedPackageManager",children:[(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"npm"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"install"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-svelte"})]})})})}),(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"pnpm"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"add"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-svelte"})]})})})}),(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"yarn"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"add"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-svelte"})]})})})}),(0,a.jsx)(o.OK,{children:(0,a.jsx)(t.pre,{"data-language":"bash","data-theme":"default",hasCopyCode:!0,children:(0,a.jsx)(t.code,{"data-language":"bash","data-theme":"default",children:(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-function)"},children:"bun"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"add"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string)"},children:"@mina-wallet-adapter/ui-svelte"})]})})})})]}),(0,a.jsx)(t.h3,{id:"import-components-1",children:"Import components"}),(0,a.jsxs)(t.p,{children:["The default mode requires just ",(0,a.jsx)(t.code,{children:"WalletProvider"})," and ",(0,a.jsx)(t.code,{children:"WalletMultiButton"}),". The ",(0,a.jsx)(t.code,{children:"wallet-adapter.css"})," file is optional and just for the default theme. Feel free to customize its CSS styles or replace the file with a project-specific stylesheet."]}),(0,a.jsx)(t.pre,{"data-language":"js","data-theme":"default",filename:"+page.svelte",hasCopyCode:!0,children:(0,a.jsxs)(t.code,{"data-language":"js","data-theme":"default",children:[(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" { WalletProvider"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" WalletMultiButton } "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"from"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"@mina-wallet-adapter/ui-svelte"'}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:";"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-keyword)"},children:"import"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-string-expression)"},children:'"@mina-wallet-adapter/ui-svelte/dist/wallet-adapter.css"'}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:";"})]})]})}),(0,a.jsx)(t.h3,{id:"use-in-app-1",children:"Use in App"}),(0,a.jsxs)(t.p,{children:["Use ",(0,a.jsx)(t.code,{children:"WalletProvider"})," to set up the necessary context and common configurations.\nThe ",(0,a.jsx)(t.code,{children:"WalletMultiButton"})," shows the user a button to connect and a modal to select available wallets from. It automatically uses the connection state to display appropriate components."]}),(0,a.jsx)(t.pre,{"data-language":"js","data-theme":"default",filename:"+page.svelte",hasCopyCode:!0,children:(0,a.jsxs)(t.code,{"data-language":"js","data-theme":"default",children:[(0,a.jsxs)(t.span,{className:"line highlighted",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"  <"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"WalletProvider"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]}),"\n",(0,a.jsxs)(t.span,{className:"line highlighted",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"  <"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"WalletMultiButton"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]}),"\n",(0,a.jsxs)(t.span,{className:"line",children:[(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:"  <"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-token-constant)"},children:"YourApp"}),(0,a.jsx)(t.span,{style:{color:"var(--shiki-color-text)"},children:" />"})]})]})}),(0,a.jsx)(t.h3,{id:"thats-it-1",children:"That's it"}),(0,a.jsxs)(t.p,{children:["You can now start adding the ",(0,a.jsx)(t.code,{children:"walletStore"})," store for more advanced features."]})]})})]})]})}function _missingMdxReference(e,t){throw Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}let c={MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:t}=Object.assign({},(0,i.a)(),e.components);return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)},pageOpts:{filePath:"pages/docs/guide/zkapp.mdx",route:"/docs/guide/zkapp",pageMap:[{kind:"Meta",data:{index:{title:"Home",display:"hidden",theme:{layout:"raw",breadcrumb:!1,toc:!1,sidebar:!1,pagination:!1,timestamp:!1,footer:!0}},docs:{title:"Docs",type:"page"},api:{title:"API Docs",type:"page",href:"https://mina-wallet-adapter.github.io/wallet-adapter/typedoc"}}},{kind:"Folder",name:"docs",route:"/docs",children:[{kind:"Meta",data:{intro:"Introduction",guide:"Getting Started",design:"Design",starter:"Starter Kits",faq:"FAQs",integrations:"Integrations"}},{kind:"Folder",name:"design",route:"/docs/design",children:[{kind:"Meta",data:{architecture:"Architecture","wallet-standard":"Wallet Standard",component:"UI Components",hook:"Hooks",style:"Styling"}},{kind:"MdxPage",name:"architecture",route:"/docs/design/architecture"},{kind:"MdxPage",name:"component",route:"/docs/design/component"},{kind:"MdxPage",name:"hook",route:"/docs/design/hook"},{kind:"MdxPage",name:"style",route:"/docs/design/style"},{kind:"MdxPage",name:"wallet-standard",route:"/docs/design/wallet-standard"}]},{kind:"MdxPage",name:"design",route:"/docs/design"},{kind:"MdxPage",name:"faq",route:"/docs/faq"},{kind:"Folder",name:"guide",route:"/docs/guide",children:[{kind:"Meta",data:{zkapp:"Use in zkApps",wallet:"Integrate in Wallets",build:"Build Locally"}},{kind:"MdxPage",name:"build",route:"/docs/guide/build"},{kind:"MdxPage",name:"wallet",route:"/docs/guide/wallet"},{kind:"MdxPage",name:"zkapp",route:"/docs/guide/zkapp"}]},{kind:"MdxPage",name:"guide",route:"/docs/guide"},{kind:"MdxPage",name:"integrations",route:"/docs/integrations"},{kind:"MdxPage",name:"intro",route:"/docs/intro"},{kind:"Folder",name:"starter",route:"/docs/starter",children:[{kind:"Meta",data:{react:"For React",svelte:"For Svelte"}},{kind:"MdxPage",name:"react",route:"/docs/starter/react"},{kind:"MdxPage",name:"svelte",route:"/docs/starter/svelte"}]},{kind:"MdxPage",name:"starter",route:"/docs/starter"}]},{kind:"MdxPage",name:"index",route:"/"}],flexsearch:{codeblocks:!0},title:"Mina Wallet Adapter for zkApps",headings:d},pageNextRoute:"/docs/guide/zkapp",nextraLayout:l.ZP,themeConfig:r.Z};t.default=(0,n.j)(c)},4637:function(e,t,s){"use strict";var a=s(4246);s(7378);var n=s(6677),l=s(7284);let r={name:"Mina Wallet Adapter",url:"https://mina-wallet-adapter.github.io/wallet-adapter",description:"Add wallets support to your zkApps with ease."},i={logo:(0,a.jsx)("span",{children:r.name}),nextThemes:{defaultTheme:"dark"},useNextSeoProps(){let{asPath:e}=(0,n.useRouter)();if("/"!==e)return{titleTemplate:"%s – ".concat(r.name)}},head:function(){let{title:e}=(0,l.ZR)(),t=(e?e+" – ":"")+r.name,s="".concat(r.url,"/assets/og.png");return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("meta",{httpEquiv:"Content-Language",content:"en"}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,a.jsx)("meta",{name:"apple-mobile-web-app-title",content:r.name}),(0,a.jsx)("meta",{name:"description",content:r.description}),(0,a.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),(0,a.jsx)("meta",{property:"twitter:url",content:r.url}),(0,a.jsx)("meta",{property:"twitter:title",content:t}),(0,a.jsx)("meta",{property:"twitter:image",content:s}),(0,a.jsx)("meta",{property:"twitter:description",content:r.description}),(0,a.jsx)("meta",{property:"og:type",content:"website"}),(0,a.jsx)("meta",{property:"og:locale",content:"en"}),(0,a.jsx)("meta",{property:"og:url",content:r.url}),(0,a.jsx)("meta",{property:"og:title",content:t}),(0,a.jsx)("meta",{property:"og:image",content:s}),(0,a.jsx)("meta",{property:"og:description",content:r.description}),(0,a.jsx)("meta",{property:"og:site_name",content:r.name})]})},project:{link:"https://github.com/mina-wallet-adapter/wallet-adapter"},docsRepositoryBase:"https://github.com/mina-wallet-adapter/wallet-adapter/tree/main/site",editLink:{text:"Edit this page on GitHub →"},search:{placeholder:"Search Docs ..."},footer:{text:(0,a.jsxs)("small",{children:["\xa9 ",new Date().getFullYear()," Mina Wallet Adapter."]})}};t.Z=i},3898:function(){}},function(e){e.O(0,[774,486,888,179],function(){return e(e.s=5745)}),_N_E=e.O()}]);