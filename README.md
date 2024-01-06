# Mina Wallet Adapter

Modular TypeScript wallet adapters and components designed for Mina zkApps. Add wallet support into your zkApp with just a few lines of code.

<img src="site/public/assets/screenshots.png" alt="screenshot" width="720">

## Demo

Check out the demo sites below to see the Wallet Adapter in action.

👉 [zkApp Starter Kit](https://aztemi.github.io/mina-wallet-adapter/)

👉 [Mina Name Service (MVP)](https://dotminadomain.com)

## Core Features

- [Wallet Standard](https://github.com/wallet-standard/wallet-standard) support
- Auto-detection of installed wallets
- Automatic wallet state management
- Integration with .mina domain (Mina Names Service)
- Query hooks and modular UI components for zkApps
- TypeScript

## Architecture

![screenshot](site/public/assets/design.png)

## Documentation

[https://aztemi.github.io/mina-wallet-adapter/](https://aztemi.github.io/mina-wallet-adapter/)

## Directory Structure

| Package                                            | Description                                                                                                                                                                                                                                                                            |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [site](site/)                                      | Project website with the documentations and guidelines                                                                                                                                                                                                                                 |
| [`mina-wallet-adapter-core`](packages/core/)       | Base interfaces, classes and shared common logics                                                                                                                                                                                                                                      |
| [`mina-wallet-adapter-wallets`](packages/wallets/) | Adapter classes for [Wallet Standard](https://github.com/aztemi/mina-wallet-standard) and to wrap legacy wallets like Auro Wallet                                                                                                                                                      |
| [`mina-wallet-adapter-ui`](packages/ui/)           | UI components for zkApps written for [Svelte](packages/ui/svelte/), [React](packages/ui/react/), [Vue](packages/ui/vue/) and [Angular](packages/ui/angular/) JS frameworks.                                                                                                            |
| [Starter Kits](packages/starter/)                  | Reference templates showing how to use wallet adapter UI components in [Svelte](packages/starter/svelte/), [React](packages/starter/react/), [Vue](packages/starter/vue/) and [Angular](packages/starter/angular/) zkApp projects. Refer to them to bootstrap your zkApps development. |

> - React, Vue and Angular components are WIP

## License

[Apache-2.0](./LICENSE)
