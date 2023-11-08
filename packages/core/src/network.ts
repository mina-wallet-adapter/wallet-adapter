import { type MinaChain, MINA_MAINNET_CHAIN, MINA_DEVNET_CHAIN, MINA_BERKELEY_CHAIN } from "mina-wallet-standard";

export enum NetworkName {
  Mainnet = MINA_MAINNET_CHAIN,
  Devnet = MINA_DEVNET_CHAIN,
  Testnet = MINA_BERKELEY_CHAIN
}

export type NetworkInfo = {
  name: MinaChain;
  chainId?: string;
  url?: string;
};
