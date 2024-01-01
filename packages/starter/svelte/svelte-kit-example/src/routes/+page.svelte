<script lang="ts">
	import {
		type AdapterOption,
		AdapterId,
		WalletProvider,
		WalletMultiButton,
		walletStore
	} from 'mina-wallet-adapter-ui-svelte';
	import 'mina-wallet-adapter-ui-svelte/dist/wallet-adapter.css';

	let adapters: AdapterOption[] = [AdapterId.AURO];
	let value: number = 2;
	let square: number;

	function submit() {
		alert('This feature is WIP.');
	}
</script>

<main>
	<h1>zkApp starter-kit with <u>Svelte</u></h1>
	<p>
		Demo of
		<a href="https://github.com/aztemi/mina-wallet-adapter" target="_blank" rel="noreferrer">
			mina-wallet-adapter
		</a> for implementing zkApps in Svelte.
	</p>

	<WalletProvider {adapters} autoConnect={true} />
	<span>
		<WalletMultiButton />
	</span>

	<div class="connect-div">
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

	<div class="source-div">
		<svg height="32" width="32" viewBox="0 0 16 16">
			<path
				d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
			/>
		</svg>
		<p>
			<a
				href="https://github.com/aztemi/mina-wallet-adapter/tree/main/packages/starter/svelte/svelte-kit-example"
				target="_blank"
				rel="noreferrer"
			>
				Get the source
			</a>
		</p>
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
	.connect-div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.connect-div p {
		font-size: 1.5rem;
		margin: 1rem;
	}
	.source-div {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 5rem;
	}
	.source-div svg {
		height: 1.4rem;
		margin-right: 0.5rem;
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
