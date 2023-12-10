import type { WalletAdapterProps, WalletAdapter, WalletError, WalletName } from "mina-wallet-adapter-core";
import type { SignableData, SignedAny } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import {
  WalletReadyState,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletNotSelectedError,
  getLocalStorage,
  setLocalStorage
} from "mina-wallet-adapter-core";
import { get, writable } from "svelte/store";

type ErrorHandler = (error: WalletError) => void;
type WalletPropsConfig = Pick<WalletStore, "autoConnect" | "onError"> & {
  wallets: WalletAdapter[];
};
type WalletReturnConfig = Pick<WalletStore, "wallets" | "autoConnect" | "onError">;

type WalletStatus = Pick<WalletStore, "connected" | "publicKey">;

export interface WalletStore {
  // props
  autoConnect: boolean;
  wallets: WalletAdapter[];

  // state
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;

  // internal states
  publicKey: string | null;
  ready: WalletReadyState;
  name: WalletName | null;
  wallet: WalletAdapter | null;
  walletsByName: Record<WalletName, WalletAdapter>;

  // methods
  onError: ErrorHandler;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  select(walletName: WalletName): void;
  signMessage: WalletAdapterProps["signMessage"] | undefined;
  signTransaction: WalletAdapterProps["signTransaction"] | undefined;
  sendTransaction: WalletAdapterProps["sendTransaction"] | undefined;
  signAndSendTransaction: WalletAdapterProps["signAndSendTransaction"] | undefined;
}

export const walletStore = createWalletStore();

function addAdapterEventListeners(adapter: WalletAdapter) {
  const { onError, wallets } = get(walletStore);

  wallets.forEach(wallet => {
    wallet.on("readyStateChange", onReadyStateChange, wallet);
  });
  adapter.on("connect", onConnect);
  adapter.on("disconnect", onDisconnect);
  adapter.on("error", onError);
}

async function autoConnect() {
  const { wallet } = get(walletStore);

  try {
    walletStore.setConnecting(true);
    await wallet?.connect();
  } catch (error: unknown) {
    // Clear the selected wallet
    walletStore.resetWallet();
    // Don't throw error, but onError will still be called
  } finally {
    walletStore.setConnecting(false);
  }
}

async function connect(): Promise<void> {
  const { connected, connecting, disconnecting, ready, wallet } = get(walletStore);
  if (connected || connecting || disconnecting) return;

  if (!wallet) throw newError(new WalletNotSelectedError());

  if (!(ready === WalletReadyState.Installed || ready === WalletReadyState.Loadable)) {
    walletStore.resetWallet();

    if (typeof window !== "undefined") {
      window.open(wallet.url, "_blank");
    }

    throw newError(new WalletNotReadyError());
  }

  try {
    walletStore.setConnecting(true);
    await wallet.connect();
  } catch (error: unknown) {
    walletStore.resetWallet();
    throw error;
  } finally {
    walletStore.setConnecting(false);
  }
}

function createWalletStore() {
  const { subscribe, update } = writable<WalletStore>({
    autoConnect: false,
    wallets: [],
    wallet: null,
    connected: false,
    connecting: false,
    disconnecting: false,
    onError: (error: WalletError) => console.error(error),
    publicKey: null,
    ready: "Unsupported" as WalletReadyState,
    name: null,
    walletsByName: {},
    connect,
    disconnect,
    select,
    signMessage: undefined,
    signTransaction: undefined,
    sendTransaction: undefined,
    signAndSendTransaction: undefined
  });

  function updateWalletState(adapter: WalletAdapter | null) {
    updateAdapter(adapter);
    update((store: WalletStore) => ({
      ...store,
      name: adapter?.name || null,
      wallet: adapter,
      ready: adapter?.readyState || ("Unsupported" as WalletReadyState),
      publicKey: adapter?.publicKey || null,
      connected: adapter?.connected || false
    }));

    if (!adapter) return;

    if (shouldAutoConnect()) {
      autoConnect();
    }
  }

  function updateWalletName(name: WalletName | null) {
    const { walletsByName } = get(walletStore);

    const adapter = walletsByName?.[name as WalletName] ?? null;

    setLocalStorage(name);
    updateWalletState(adapter);
  }

  function updateAdapter(adapter: WalletAdapter | null) {
    removeAdapterEventListeners();
    if (adapter) addAdapterEventListeners(adapter);
    update((store: WalletStore) => ({ ...store, adapter }));
  }

  function updateAdapterFeatures(adapter: WalletAdapter) {
    let signMessage: WalletAdapter["signMessage"] | undefined = undefined;
    let signTransaction: WalletAdapter["signTransaction"] | undefined = undefined;
    let sendTransaction: WalletAdapter["sendTransaction"] | undefined = undefined;
    let signAndSendTransaction: WalletAdapter["signAndSendTransaction"] | undefined = undefined;

    if (adapter) {
      // Sign an arbitrary message if the wallet supports it
      if ("signMessage" in adapter) {
        signMessage = async function (message: string) {
          const { connected } = get(walletStore);
          if (!connected) throw newError(new WalletNotConnectedError());
          return await adapter.signMessage(message);
        };
      }

      // Sign a transaction if the wallet supports it
      if ("signTransaction" in adapter) {
        signTransaction = async function (transaction: SignableData) {
          const { connected } = get(walletStore);
          if (!connected) throw newError(new WalletNotConnectedError());
          return await adapter.signTransaction(transaction);
        };
      }

      // Send a signed transaction if the wallet supports it
      if ("sendTransaction" in adapter) {
        sendTransaction = async function (transaction: SignedAny) {
          const { connected } = get(walletStore);
          if (!connected) throw newError(new WalletNotConnectedError());
          return await adapter.sendTransaction(transaction);
        };
      }

      // Sign and send a transaction if the wallet supports it
      if ("signAndSendTransaction" in adapter) {
        signAndSendTransaction = async function (transaction: SignableData) {
          const { connected } = get(walletStore);
          if (!connected) throw newError(new WalletNotConnectedError());
          return await adapter.signAndSendTransaction(transaction);
        };
      }
    }

    update((store: WalletStore) => ({
      ...store,
      signMessage,
      signTransaction,
      sendTransaction,
      signAndSendTransaction
    }));
  }

  return {
    resetWallet: () => updateWalletName(null),
    setConnecting: (connecting: boolean) => update((store: WalletStore) => ({ ...store, connecting })),
    setDisconnecting: (disconnecting: boolean) => update((store: WalletStore) => ({ ...store, disconnecting })),
    setReady: (ready: WalletReadyState) => update((store: WalletStore) => ({ ...store, ready })),
    subscribe,
    updateConfig: (walletConfig: WalletReturnConfig & { walletsByName: Record<WalletName, WalletAdapter> }) =>
      update((store: WalletStore) => ({
        ...store,
        ...walletConfig
      })),
    updateWallets: (wallets: WalletAdapter[]) => update((store: WalletStore) => ({ ...store, wallets })),
    updateStatus: (walletStatus: WalletStatus) => update((store: WalletStore) => ({ ...store, ...walletStatus })),
    updateWallet: (walletName: WalletName) => updateWalletName(walletName),
    updateFeatures: (adapter: WalletAdapter) => updateAdapterFeatures(adapter)
  };
}

async function disconnect(): Promise<void> {
  const { disconnecting, wallet } = get(walletStore);
  if (disconnecting) return;

  if (!wallet) return walletStore.resetWallet();

  try {
    walletStore.setDisconnecting(true);
    await wallet.disconnect();
  } finally {
    walletStore.resetWallet();
    walletStore.setDisconnecting(false);
  }
}

export async function initialize({
  wallets,
  autoConnect = false,
  onError = (error: WalletError) => console.error(error)
}: WalletPropsConfig): Promise<void> {
  const walletsByName = wallets.reduce<Record<WalletName, WalletAdapter>>((walletsByName, wallet) => {
    walletsByName[wallet.name] = wallet;
    return walletsByName;
  }, {});

  walletStore.updateConfig({
    wallets,
    walletsByName,
    autoConnect,
    onError
  });

  const walletName = getLocalStorage<WalletName>();

  if (walletName) await select(walletName);
}

function newError(error: WalletError): WalletError {
  const { onError } = get(walletStore);
  onError(error);
  return error;
}

function onConnect() {
  const { wallet } = get(walletStore);
  if (!wallet) return;

  walletStore.updateFeatures(wallet);
  walletStore.updateStatus({
    publicKey: wallet.publicKey,
    connected: wallet.connected
  });
}

function onDisconnect() {
  walletStore.resetWallet();
}

function onReadyStateChange(this: WalletAdapter, readyState: WalletReadyState) {
  const { wallet, wallets } = get(walletStore);
  if (!wallet) return;

  walletStore.setReady(wallet.readyState);

  // When the wallets change, start to listen for changes to their `readyState`
  const walletIndex = wallets.findIndex(wallet => wallet.name === this.name);
  if (walletIndex > -1) {
    wallets[walletIndex].readyState = readyState;
    walletStore.updateWallets(wallets);
  }
}

function removeAdapterEventListeners(): void {
  const { wallet, onError, wallets } = get(walletStore);
  if (!wallet) return;

  wallets.forEach(wallet => {
    wallet.off("readyStateChange", onReadyStateChange, wallet);
  });
  wallet.off("connect", onConnect);
  wallet.off("disconnect", onDisconnect);
  wallet.off("error", onError);
}

async function select(walletName: WalletName): Promise<void> {
  const { name, wallet } = get(walletStore);
  if (name === walletName) return;

  if (wallet) await disconnect();

  walletStore.updateWallet(walletName);
}

function shouldAutoConnect(): boolean {
  const { wallet, autoConnect, ready, connected, connecting } = get(walletStore);

  return !(
    !autoConnect ||
    !wallet ||
    !(ready === WalletReadyState.Installed || ready === WalletReadyState.Loadable) ||
    connected ||
    connecting
  );
}

if (typeof window !== "undefined") {
  // Ensure the adapter listeners are invalidated before refreshing the page.
  window.addEventListener("beforeunload", removeAdapterEventListeners);
}
