<script lang="ts">
  import { shortenAddress, copyToClipboard } from "@mina-wallet-adapter/core";
  import { walletStore, type WalletStore } from "./walletStore.js";
  import WalletButton from "./WalletButton.svelte";
  import WalletConnectButton from "./WalletConnectButton.svelte";
  import WalletModal from "./WalletModal.svelte";
  import { clickOutside } from "./clickOutside.js";

  export let maxNumberOfWallets = 3;

  let copied = false;
  let modalVisible = false;
  let dropDrownVisible = false;

  $: ({ publicKey, wallet, disconnect, connect, select } = $walletStore);
  $: base58 = publicKey;

  const copyAddress = async () => {
    if (!base58) return;
    await copyToClipboard(base58);
    copied = true;
    setTimeout(() => (copied = false), 400);
  };

  const openDropdown = () => (dropDrownVisible = true);
  const closeDropdown = () => (dropDrownVisible = false);
  const openModal = () => {
    modalVisible = true;
    closeDropdown();
  };
  const closeModal = () => (modalVisible = false);

  function handleKeyup(e: { key: string }) {
    if (e.key == "Escape") {
      closeDropdown();
    }
  }

  async function connectWallet(event: { detail: any }) {
    closeModal();
    await select(event.detail);
    await connect();
  }

  async function disconnectWallet(_event: any) {
    closeDropdown();
    await disconnect();
  }
</script>

<svelte:window on:keyup={handleKeyup} />

{#if !wallet}
  <WalletButton class="wallet-adapter-button-trigger" on:click={openModal}>
    <slot>Connect Wallet</slot>
  </WalletButton>
{:else if !base58}
  <WalletConnectButton />
{:else}
  <div class="wallet-adapter-dropdown">
    <WalletButton on:click={openDropdown} class="wallet-adapter-button-trigger">
      <svelte:fragment slot="start-icon">
        <img src={wallet.icon} alt={`${wallet.name} icon`} />
      </svelte:fragment>
      {shortenAddress(base58)}
    </WalletButton>
    {#if dropDrownVisible}
      <ul
        aria-label="dropdown-list"
        class="wallet-adapter-dropdown-list wallet-adapter-dropdown-list-active"
        role="menu"
        use:clickOutside={() => {
          if (dropDrownVisible) {
            closeDropdown();
          }
        }}
      >
        <li role="menuitem">
          <button class="wallet-adapter-dropdown-list-button" on:click={copyAddress}>
            {copied ? "Copied" : "Copy address"}
          </button>
        </li>
        <li role="menuitem">
          <button class="wallet-adapter-dropdown-list-button" on:click={openModal}> Connect a different wallet </button>
        </li>
        <li role="menuitem">
          <button class="wallet-adapter-dropdown-list-button" on:click={disconnectWallet}> Disconnect </button>
        </li>
      </ul>
    {/if}
  </div>
{/if}

{#if modalVisible}
  <WalletModal on:close={closeModal} on:connect={connectWallet} {maxNumberOfWallets} />
{/if}
