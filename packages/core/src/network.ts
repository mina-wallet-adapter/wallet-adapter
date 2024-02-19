import { type MinaChain, MINA_MAINNET_CHAIN, MINA_DEVNET_CHAIN, MINA_BERKELEY_CHAIN } from "mina-wallet-standard";

export { type MinaChain, MINA_CHAINS, isMinaChain } from "mina-wallet-standard";

export const Network = {
  Mainnet: MINA_MAINNET_CHAIN as typeof MINA_MAINNET_CHAIN,
  Devnet: MINA_DEVNET_CHAIN as typeof MINA_DEVNET_CHAIN,
  Berkeley: MINA_BERKELEY_CHAIN as typeof MINA_BERKELEY_CHAIN
};

export type NetworkInfo = {
  name: MinaChain;
  chainId?: string;
  url?: string;
};
