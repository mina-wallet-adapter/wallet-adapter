<script lang="ts">
  import { initialize } from "./walletStore.js";
  import type { WalletAdapter, WalletError } from "mina-wallet-adapter-core";

  export let localStorageKey: string,
    wallets: WalletAdapter[],
    autoConnect = false,
    onError = (error: WalletError) => console.error(error);

  $: wallets && initialize({ wallets, autoConnect, localStorageKey, onError });
</script>

<svelte:head>
  <script>
    window.global = window;
  </script>
</svelte:head>
