import { ReactNode, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
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
  publicKey: null as string | null
};

export interface WalletProviderProps {
  children: ReactNode;
  adapters?: AdapterOption[];
  autoConnect?: boolean;
  onError?: (error: WalletError) => void;
}

export function WalletProvider({
  children,
  adapters = Object.values(AdapterId),
  autoConnect = false,
  onError = (error: WalletError) => {}
}: WalletProviderProps) {
  const [{ name, connected, connecting, disconnecting, publicKey }, setState] = useState(initialState);

  const [walletName, setWalletName] = useLocalStorage<WalletName<string> | null>();

  const [wallets, setWallets] = useState<WalletAdapter[]>([]);

  const wallet = useMemo(() => wallets.find(w => w.name === walletName) || null, [wallets, walletName]);

  const readyState = useMemo(() => (wallet ? wallet.readyState : WalletReadyState.Unsupported), [wallet]);

  // Update wallets list when list of adapters changes. Avoid race condition using a local active flag
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

  // If autoConnect is enabled, select the wallet saved in localStorage when list of wallets changes
  useEffect(() => {
    if (autoConnect && walletName) select(walletName);
  }, [wallets]);

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
          publicKey: wallet.publicKey
        };
      });
    };

    const onDisconnect = () => {
      resetState();
    };

    wallet.on("connect", onConnect);
    wallet.on("disconnect", onDisconnect);
    wallet.on("error", onError);

    if (autoConnect) connect();

    return () => {
      wallet.off("connect", onConnect);
      wallet.off("disconnect", onDisconnect);
      wallet.off("error", onError);

      onDisconnect();
    };
  }, [wallet]);

  // When the adapters change, start to listen for changes to their readyStates
  useEffect(() => {
    function onReadyStateChange(this: WalletAdapter, readyState: WalletReadyState) {
      setWallets(prevWallets => {
        const walletIndex = prevWallets.findIndex(wallet => wallet.name === this.name);

        if (walletIndex > -1) {
          wallets[walletIndex].readyState = readyState;
          return wallets;
        } else {
          return prevWallets;
        }
      });
    }
    wallets.forEach(wallet => wallet.on("readyStateChange", onReadyStateChange, wallet));
    return () => {
      wallets.forEach(wallet => wallet.off("readyStateChange", onReadyStateChange, wallet));
    };
  }, [wallet, wallets]);

  // Wrap localStorage handling in a use hook
  function useLocalStorage<T>(): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(getLocalStorage() as T);

    const setValueAndStore = useCallback((newValue: SetStateAction<T>) => {
      setLocalStorage(newValue);
      setValue(newValue);
    }, []);

    return [value, setValueAndStore];
  }

  function resetState() {
    setState(state => ({ ...state, ...initialState }));
  }

  function resetWallet() {
    resetState();
    setWalletName(null);
  }

  async function select(selected: WalletName | null): Promise<void> {
    if (name === selected) return;
    if (wallet && wallet.name !== selected) await disconnect();

    setWalletName(selected);
  }

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
