import { createContext, useContext } from "react";
import { WalletReadyState } from "mina-wallet-adapter-core";
import type { WalletAdapterProps, WalletAdapter, WalletError, WalletName } from "mina-wallet-adapter-core";

interface Wallet {
  adapter: WalletAdapter;
  readyState: WalletReadyState;
}

type ErrorHandler = (error: WalletError) => void;

export interface WalletContextState {
  // props
  autoConnect: boolean;
  wallets: Wallet[];

  // wallet state
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  onError: ErrorHandler;
  publicKey: string | null;
  ready: WalletReadyState;
  name: WalletName | null;
  adapter: WalletAdapter | null;
  walletsByName: Record<WalletName, WalletAdapter>;

  // wallet methods
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  select(walletName: WalletName): void;
  signMessage: WalletAdapterProps["signMessage"] | undefined;
  signTransaction: WalletAdapterProps["signTransaction"] | undefined;
  sendTransaction: WalletAdapterProps["sendTransaction"] | undefined;
  signAndSendTransaction: WalletAdapterProps["signAndSendTransaction"] | undefined;
}

const DEFAULT_CONTEXT: Partial<WalletContextState> = {
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
