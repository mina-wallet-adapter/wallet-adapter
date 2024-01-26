# Mina Wallet Adapter for zkApps

This guide provides a quick setup for integrating the Wallet Adapter into a zkApp, utilizing any of the supported frontend frameworks mentioned below.

## Supported frontend frameworks

- [Svelte](#svelte)
- [React](#react)
- Vue _(coming soon)_
- Angular _(coming soon)_
- Vanila JS _(coming soon)_

## Svelte

Follow the steps below to seamlessly integrate the Wallet Adapter into your zkApp with just a few lines of code. Refer to the [example starter project](../packages/starter/svelte/svelte-kit-example/) for the complete reference source code.

### Usage steps

1. Install dependency. Only a single package is required.

```bash npm2yarn
npm install @mina-wallet-adapter/ui-svelte
```

2. Import wallet components and store. Import the CSS file for the default theme. Feel free to customize the CSS styles or replace it with a project-specific stylesheet.

```js
import { WalletProvider, WalletMultiButton, walletStore } from "@mina-wallet-adapter/ui-svelte";
import "@mina-wallet-adapter/ui-svelte/dist/wallet-adapter.css"; // Default style. Feel free to customize for project-specific look.
```

3. Utilize the components as HTML elements within the page document. Pass the list of wallet adapters to display as a parameter to the `WalletProvider` component. The `WalletMultiButton` component will show the "Connect Wallet" button and handle the entire connection workflow.

```svelte
<div>
  <WalletProvider autoConnect={true} />
  <WalletMultiButton />
</div>
```

4. Get the wallet connection state and invoke connected wallet methods through the `walletStore`.

```svelte
<div>
  {#if $walletStore.connected}
    <p>Connected. Wallet address is {$walletStore.publicKey}.</p>
    <button on:click={async () => await walletStore.signTransaction(...)}>Sign a Transaction</button>
  {:else}
    <p>You are not connected. Click "Connect Wallet" button to connect.</p>
  {/if}
</div>
```

## React

_WIP.._
