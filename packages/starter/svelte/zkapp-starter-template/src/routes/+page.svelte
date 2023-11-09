<script lang="ts">
	import { onMount } from 'svelte';
	import { WalletProvider, WalletMultiButton } from 'mina-wallet-adapter-ui-svelte';
	import type { WalletAdapter } from 'mina-wallet-adapter-core';

	let value: number = 2;
	let square: number;
	let wallets: WalletAdapter[] = [];
	const localStorageKey = 'MinaWalletAdapter';

	onMount(async () => {
		const { AuroWalletAdapter } = await import('mina-wallet-adapter-wallets');
		wallets = [new AuroWalletAdapter()];
	});

	function submit() {}
</script>

<main>
	<h1>Squared - Demo zkApp</h1>
	<p>
		Demo of
		<a href="https://github.com/aztemi/mina-wallet-adapter" target="_blank">
			mina-wallet-adapter
		</a> for implementing zkApps in Svelte.
	</p>
	{#if wallets.length}
		<WalletProvider {localStorageKey} {wallets} autoConnect={true} />
		<span>
			<WalletMultiButton />
		</span>
	{/if}
	<div>
		<p>What is the square of <strong>{value}</strong>?</p>
		<input type="number" min="0" bind:value={square} />
		<button class="wallet-adapter-button wallet-adapter-button-trigger" on:click={submit}>
			Submit
		</button>
	</div>
</main>

<style>
	main {
		display: block;
		padding-top: 7rem;
		text-align: center;
		height: 100vh;
	}
	span {
		position: absolute;
		right: 2rem;
		top: 2rem;
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	div p {
		font-size: 1.5rem;
		margin: 1rem;
	}
	input {
		text-align: center;
		border: 1px solid #9e9e9e;
		border-radius: 8px;
		font-size: 2rem;
		font-weight: 800;
		padding: 1rem;
		margin-bottom: 1rem;
		min-width: 15rem;
	}
</style>
