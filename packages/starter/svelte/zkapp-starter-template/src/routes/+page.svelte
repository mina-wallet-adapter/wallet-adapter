<script lang="ts">
	import {
		type AdapterOption,
		AdapterId,
		WalletProvider,
		WalletMultiButton,
		walletStore
	} from 'mina-wallet-adapter-ui-svelte';

	let adapters: AdapterOption[] = [AdapterId.AURO];
	let value: number = 2;
	let square: number;

	function submit() {
		alert('This feature is WIP.');
	}
</script>

<main>
	<h1>Square - Demo zkApp</h1>
	<p>
		Demo of
		<a href="https://github.com/aztemi/mina-wallet-adapter" target="_blank">
			mina-wallet-adapter
		</a> for implementing zkApps in Svelte.
	</p>
	<WalletProvider {adapters} autoConnect={true} />
	<span>
		<WalletMultiButton />
	</span>
	<div>
		{#if $walletStore?.connected}
			<p>What is the square of <strong>{value}</strong>?</p>
			<input type="number" min="0" bind:value={square} />
			<button class="wallet-adapter-button wallet-adapter-button-trigger" on:click={submit}>
				Submit
			</button>
		{:else}
			<p class="warning">You are not connected yet.</p>
		{/if}
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
	p {
		font-size: 1.2rem;
	}
	.warning {
		color: #eb2e2e;
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
