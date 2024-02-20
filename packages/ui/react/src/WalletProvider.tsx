import { ReactNode, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import {
  type MinaChain,
  openWeblink,
  getLocalStorage,
  setLocalStorage,
  WalletReadyState,
  WalletNotSelectedError,
  WalletNotConnectedError,
  WalletNotReadyError
} from "@mina-wallet-adapter/core";
import type { SignableData, SignedAny } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import type { WalletAdapterContext, WalletAdapter, WalletError, WalletName } from "@mina-wallet-adapter/core";
import { type AdapterOption, AdapterId, loadAdapters } from "@mina-wallet-adapter/wallets";
import { WalletContext } from "./useWallet";

const initialState = {
  name: null as WalletName | null,
  connected: false,
  connecting: false,
  disconnecting: false,
  account: null as WalletAdapterContext["account"],
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
  const [{ name, connected, connecting, disconnecting, account, publicKey }, setState] = useState(initialState);

  const [walletName, setWalletName] = useLocalStorage<WalletName<string> | null>();

  const [wallets, setWallets] = useState<WalletAdapter[]>([]);

  const [chain, setChain] = useState<MinaChain | null>(null);

  const wallet = useMemo(() => (walletName && wallets.find(w => w.name === walletName)) || null, [wallets, walletName]);

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
    const storedName: WalletName | null = getLocalStorage();
    if (autoConnect && storedName) select(storedName);
  }, [wallets]);

  // Setup and teardown event listeners when the wallet changes
  useEffect(() => {
    if (!wallet) return;

    const onChainChange = () => {
      setChain(wallet.chain);
    };

    const onConnect = () => {
      setState(state => {
        return {
          ...state,
          connected: true,
          connecting: false,
          disconnecting: false,
          name: wallet.name,
          account: wallet.account,
          publicKey: wallet.publicKey
        };
      });
    };

    const onDisconnect = () => {
      resetState();
    };

    wallet.on("chainChange", onChainChange);
    wallet.on("connect", onConnect);
    wallet.on("disconnect", onDisconnect);
    wallet.on("error", onError);

    connect();

    return () => {
      wallet.off("chainChange", onChainChange);
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
    const [value, setValue] = useState<T>(null as T);

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

  const select = useCallback(
    async (selected: WalletName | null): Promise<void> => {
      if (name === selected) return;
      if (wallet && wallet.name !== selected) await disconnect();

      setWalletName(selected);
    },
    [name, wallet]
  );

  const connect = useCallback(async (): Promise<void> => {
    if (connected || connecting || disconnecting) return;
    if (!wallet) return throwError(new WalletNotSelectedError());

    if (!(readyState === WalletReadyState.Installed || readyState === WalletReadyState.Loadable)) {
      resetWallet();
      openWeblink(wallet.url);

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
  }, [connected, connecting, disconnecting, readyState, wallet]);

  const disconnect = useCallback(async (): Promise<void> => {
    if (disconnecting) return;
    if (!wallet) return resetWallet();

    try {
      setState(state => ({ ...state, disconnecting: true }));
      await wallet.disconnect();
    } catch (error: unknown) {
      throwError(error);
    } finally {
      resetWallet();
      setState(state => ({ ...state, disconnecting: false }));
    }
  }, [disconnecting, wallet]);

  const signMessage = useCallback(
    async (message: string) => {
      if (!connected || !wallet) return throwError(new WalletNotConnectedError());

      try {
        return await wallet.signMessage(message);
      } catch (error: unknown) {
        return throwError(error);
      }
    },
    [connected, wallet]
  );

  const signTransaction = useCallback(
    async (transaction: SignableData) => {
      if (!connected || !wallet) return throwError(new WalletNotConnectedError());

      try {
        return await wallet.signTransaction(transaction);
      } catch (error: unknown) {
        return throwError(error);
      }
    },
    [connected, wallet]
  );

  const sendTransaction = useCallback(
    async (transaction: SignedAny) => {
      if (!connected || !wallet) return throwError(new WalletNotConnectedError());

      try {
        return await wallet.sendTransaction(transaction);
      } catch (error: unknown) {
        return throwError(error);
      }
    },
    [connected, wallet]
  );

  const signAndSendTransaction = useCallback(
    async (transaction: SignableData) => {
      if (!connected || !wallet) return throwError(new WalletNotConnectedError());

      try {
        return await wallet.signAndSendTransaction(transaction);
      } catch (error: unknown) {
        return throwError(error);
      }
    },
    [connected, wallet]
  );

  function throwError(error: WalletError | any) {
    if (onError) onError(error);
    else throw error;
    return undefined;
  }

  return (
    <WalletContext.Provider
      value={{
        name,
        chain,
        account,
        publicKey,
        readyState,
        connected,
        connecting,
        disconnecting,
        wallet,
        wallets,
        connect,
        disconnect,
        select,
        signMessage,
        signTransaction,
        sendTransaction,
        signAndSendTransaction
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
