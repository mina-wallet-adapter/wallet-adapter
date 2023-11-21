<script lang="ts">
  import { onMount } from "svelte";
  import { type AdapterOption, AdapterId, loadAdapters } from "mina-wallet-adapter-wallets";
  import { initialize } from "./walletStore.js";
  import type { WalletAdapter, WalletError } from "mina-wallet-adapter-core";

  export let adapters: AdapterOption[] = Object.values(AdapterId),
    autoConnect = false,
    localStorageKey: string = "walletAdapter",
    onError = (error: WalletError) => console.error(error);

  let wallets: WalletAdapter[];

  $: wallets && initialize({ wallets, autoConnect, localStorageKey, onError });

  onMount(async () => {
    wallets = await loadAdapters(adapters);
  });
</script>

<svelte:head>
  <script>
    window.global = window;
  </script>
</svelte:head>
