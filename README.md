# Mina Wallet Adapter

Modular TypeScript wallet adapters and components designed for Mina zkApps. Add wallet support into your zkApp with just a few lines of code.

<img src="site/public/assets/screenshots.png" alt="screenshot" width="720">

## Demo

Check out the demo sites below to see the Wallet Adapter in action.

👉 [zkApp Starter Kit](https://mina-wallet-adapter.github.io/starter-kit-svelte/)

## Core Features

- Auto-detection of installed wallets
- Automatic wallet state management
- Query hooks and modular UI components for zkApps
- [Wallet Standard](https://github.com/mina-wallet-adapter/wallet-standard) support
- Integration with .mina domain (Mina Names Service) _(coming soon)_
- TypeScript

## Documentation

[https://mina-wallet-adapter.github.io/wallet-adapter/](https://mina-wallet-adapter.github.io/wallet-adapter/)

## Directory Structure

This is a monorepo containing the following packages.

- `site`: Project website with the documentations and guidelines
- `packages`
  - `core`: Base library containing shared interfaces, classes and common logics
  - `wallets`: Adapter class library for `Wallet Standard` and wrapper classes for legacy wallets like Auro Wallet
  - `ui`: UI components and hooks for zkApps, supporting `Vanilla JS`, `Svelte`, `React`, `Vue`, and `Angular` frameworks
  - `starter`: Reference starter templates showing how to use the Wallet Adapter in zkApps
    - `svelte`: Starter zkApp example using `SvelteKit`
    - `react`: Starter zkApp example in React created with `Create React App`
    - `contract`: Shared o1js smart contract used in above JS starter examples

> _Vanilla js, Vue and Angular components are WIP_

## Architecture

![screenshot](site/public/assets/design.png)

## Special Thanks

This project is funded as part of the [Mina Navigators Program](https://minaprotocol.com/blog/mina-navigators-zk-grants-program), and it was inspired by the [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter) and [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter). Special thanks to the contributors of those projects.

## License

[Apache-2.0](./LICENSE)
