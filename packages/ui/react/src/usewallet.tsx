import { createContext, useContext } from "react";
import type { WalletAdapterContext, WalletAdapter, WalletError, WalletName } from "mina-wallet-adapter-core";

type ErrorHandler = (error: WalletError) => void;

export interface WalletContextState extends WalletAdapterContext {
  autoConnect: boolean;
  wallets: WalletAdapter[];
  disconnecting: boolean;
  publicKey: string | null;
  wallet: WalletAdapter | null;
  walletsByName: Record<WalletName, WalletAdapter>;
  select(walletName: WalletName): void;
  onError: ErrorHandler;
}

const DEFAULT_CONTEXT: Partial<WalletContextState & WalletAdapterContext> = {
  autoConnect: false,
  connecting: false,
  connected: false,
  disconnecting: false,
  name: null
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT as WalletContextState);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
