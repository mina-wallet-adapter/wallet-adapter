import { createContext, useContext } from "react";
import type { WalletAdapterContext, WalletAdapter, WalletName } from "@mina-wallet-adapter/core";

export interface WalletContextState extends WalletAdapterContext {
  wallets: WalletAdapter[];
  disconnecting: boolean;
  publicKey: string | null;
  wallet: WalletAdapter | null;
  select(walletName: WalletName | null): void;
}

const DEFAULT_CONTEXT: Partial<WalletContextState & WalletAdapterContext> = {
  connecting: false,
  connected: false,
  disconnecting: false,
  name: null
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT as WalletContextState);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
