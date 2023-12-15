import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  WalletReadyState,
  getLocalStorage,
  setLocalStorage,
  WalletNotSelectedError,
  WalletNotReadyError
} from "mina-wallet-adapter-core";
import type { WalletAdapter, WalletError, WalletName } from "mina-wallet-adapter-core";
import { type AdapterOption, AdapterId, loadAdapters } from "mina-wallet-adapter-wallets";
import { WalletContext } from "./usewallet";

const initialState = {
  name: null as WalletName | null,
  connected: false,
  connecting: false,
  disconnecting: false,
  publicKey: null as string | null,
  readyState: WalletReadyState.Unsupported
};

export interface WalletProviderProps {
  children: ReactNode;
  adapters?: AdapterOption[];
  autoConnect?: boolean;
  onError?: (error: any) => void;
}

export function WalletProvider({
  children,
  adapters = Object.values(AdapterId),
  autoConnect = false,
  onError = (error: WalletError) => {}
}: WalletProviderProps) {
  const [{ name, connected, connecting, disconnecting, publicKey, readyState }, setState] = useState(initialState);
  const resetState = () => setState(state => ({ ...state, ...initialState }));

  const [wallet, setWallet] = useState<WalletAdapter | null>(null);
  const resetWallet = () => {
    resetState();
    setLocalStorage(null);
    setWallet(null);
  };

  const [wallets, setWallets] = useState<WalletAdapter[]>([]);
  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const wallets = await loadAdapters(adapters);
      if (!active) return;
      setWallets(wallets);
    }
  }, [adapters]);

  useEffect(() => {
    if (autoConnect) {
      const walletName = getLocalStorage<WalletName>();
      if (walletName) select(walletName);
    }
  }, wallets);

  async function select(walletName: WalletName): Promise<void> {
    if (name === walletName) return;
    if (wallet) await disconnect();

    setLocalStorage(walletName);
    setWallet(getWallet(walletName));
  }

  function getWallet(walletName: WalletName) {
    return wallets.find(w => w.name === walletName) || null;
  }

  // Setup and teardown event listeners when the wallet changes
  useEffect(() => {
    if (!wallet) return;

    const onConnect = () => {
      setState(state => {
        return {
          ...state,
          connected: true,
          connecting: false,
          disconnecting: false,
          name: wallet.name,
          publicKey: wallet.publicKey,
          readyState: wallet.readyState
        };
      });
    };

    const onDisconnect = () => {
      resetState();
    };

    wallet.on("connect", onConnect);
    wallet.on("disconnect", onDisconnect);
    wallet.on("error", onError);

    return () => {
      wallet.off("connect", onConnect);
      wallet.off("disconnect", onDisconnect);
      wallet.off("error", onError);

      onDisconnect();
    };
  }, [wallet]);

  async function connect(): Promise<void> {
    if (connected || connecting || disconnecting) return;

    if (!wallet) return throwError(new WalletNotSelectedError());

    if (!(readyState === WalletReadyState.Installed || readyState === WalletReadyState.Loadable)) {
      resetWallet();

      if (typeof window !== "undefined") {
        window.open(wallet.url, "_blank");
      }

      return throwError(new WalletNotReadyError());
    }

    try {
      setState(state => ({ ...state, connecting: true }));
      await wallet.connect();
    } catch (error: unknown) {
      resetWallet();
      throwError(error);
    } finally {
      setState(state => ({ ...state, connecting: false }));
    }
  }

  async function disconnect(): Promise<void> {
    if (disconnecting) return;

    if (!wallet) return resetWallet();

    try {
      setState(state => ({ ...state, disconnecting: true }));
      await wallet.disconnect();
    } finally {
      resetWallet();
      setState(state => ({ ...state, disconnecting: false }));
    }
  }

  function throwError(error: WalletError | any) {
    if (onError) onError(error);
    else throw error;
  }

  return (
    <WalletContext.Provider
      value={{
        name,
        account: null,
        readyState,
        autoConnect,
        connected,
        connecting,
        disconnecting,
        publicKey,
        wallet,
        wallets,
        connect,
        disconnect,
        select,
        signMessage: async () => undefined,
        signTransaction: async () => undefined,
        sendTransaction: async () => undefined,
        signAndSendTransaction: async () => undefined
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
