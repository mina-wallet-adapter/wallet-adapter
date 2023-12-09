import type { WalletAdapterProps, WalletAdapter, WalletError, WalletName } from "mina-wallet-adapter-core";
import {
  WalletReadyState,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletNotSelectedError,
  getLocalStorage,
  setLocalStorage
} from "mina-wallet-adapter-core";
import type { SignableData } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import { get, writable } from "svelte/store";

interface Wallet {
  adapter: WalletAdapter;
  readyState: WalletReadyState;
}

type ErrorHandler = (error: WalletError) => void;
type WalletPropsConfig = Pick<WalletStore, "autoConnect" | "onError"> & {
  wallets: WalletAdapter[];
};
type WalletReturnConfig = Pick<WalletStore, "wallets" | "autoConnect" | "onError">;

type WalletStatus = Pick<WalletStore, "connected" | "publicKey">;

export interface WalletStore {
  // props
  autoConnect: boolean;
  wallets: Wallet[];

  // wallet state
  adapter: WalletAdapter | null;
  connected: boolean;
  connecting: boolean;
  disconnecting: boolean;
  onError: ErrorHandler;
  publicKey: string | null;
  ready: WalletReadyState;
  wallet: WalletAdapter | null;
  walletsByName: Record<WalletName, WalletAdapter>;
  name: WalletName | null;

  // wallet methods
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

  wallets.forEach(({ adapter }) => {
    adapter.on("readyStateChange", onReadyStateChange, adapter);
  });
  adapter.on("connect", onConnect);
  adapter.on("disconnect", onDisconnect);
  adapter.on("error", onError);
}

async function autoConnect() {
  const { adapter } = get(walletStore);

  try {
    walletStore.setConnecting(true);
    await adapter?.connect();
  } catch (error: unknown) {
    // Clear the selected wallet
    walletStore.resetWallet();
    // Don't throw error, but onError will still be called
  } finally {
    walletStore.setConnecting(false);
  }
}

async function connect(): Promise<void> {
  const { connected, connecting, disconnecting, ready, adapter } = get(walletStore);
  if (connected || connecting || disconnecting) return;

  if (!adapter) throw newError(new WalletNotSelectedError());

  if (!(ready === WalletReadyState.Installed || ready === WalletReadyState.Loadable)) {
    walletStore.resetWallet();

    if (typeof window !== "undefined") {
      window.open(adapter.url, "_blank");
    }

    throw newError(new WalletNotReadyError());
  }

  try {
    walletStore.setConnecting(true);
    await adapter.connect();
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
    adapter: null,
    connected: false,
    connecting: false,
    disconnecting: false,
    onError: (error: WalletError) => console.error(error),
    publicKey: null,
    ready: "Unsupported" as WalletReadyState,
    wallet: null,
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
    updateWallets: (wallets: Wallet[]) => update((store: WalletStore) => ({ ...store, ...wallets })),
    updateStatus: (walletStatus: WalletStatus) => update((store: WalletStore) => ({ ...store, ...walletStatus })),
    updateWallet: (walletName: WalletName) => updateWalletName(walletName),
    updateFeatures: (adapter: WalletAdapter) => updateAdapterFeatures(adapter)
  };
}

async function disconnect(): Promise<void> {
  const { disconnecting, adapter } = get(walletStore);
  if (disconnecting) return;

  if (!adapter) return walletStore.resetWallet();

  try {
    walletStore.setDisconnecting(true);
    await adapter.disconnect();
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

  // Wrap adapters to conform to the `Wallet` interface
  const mapWallets = wallets.map(adapter => ({
    adapter,
    readyState: adapter.readyState
  }));

  walletStore.updateConfig({
    wallets: mapWallets,
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
  const { adapter } = get(walletStore);
  if (!adapter) return;

  walletStore.updateFeatures(adapter);
  walletStore.updateStatus({
    publicKey: adapter.publicKey,
    connected: adapter.connected
  });
}

function onDisconnect() {
  walletStore.resetWallet();
}

function onReadyStateChange(this: WalletAdapter, readyState: WalletReadyState) {
  const { adapter, wallets } = get(walletStore);
  if (!adapter) return;

  walletStore.setReady(adapter.readyState);

  // When the wallets change, start to listen for changes to their `readyState`
  const walletIndex = wallets.findIndex(({ adapter }) => adapter.name === this.name);
  if (walletIndex === -1) {
    return;
  } else {
    walletStore.updateWallets([
      ...wallets.slice(0, walletIndex),
      { ...wallets[walletIndex], readyState },
      ...wallets.slice(walletIndex + 1)
    ]);
  }
}

function removeAdapterEventListeners(): void {
  const { adapter, onError, wallets } = get(walletStore);
  if (!adapter) return;

  wallets.forEach(({ adapter }) => {
    adapter.off("readyStateChange", onReadyStateChange, adapter);
  });
  adapter.off("connect", onConnect);
  adapter.off("disconnect", onDisconnect);
  adapter.off("error", onError);
}

async function select(walletName: WalletName): Promise<void> {
  const { name, adapter } = get(walletStore);
  if (name === walletName) return;

  if (adapter) await disconnect();

  walletStore.updateWallet(walletName);
}

function shouldAutoConnect(): boolean {
  const { adapter, autoConnect, ready, connected, connecting } = get(walletStore);

  return !(
    !autoConnect ||
    !adapter ||
    !(ready === WalletReadyState.Installed || ready === WalletReadyState.Loadable) ||
    connected ||
    connecting
  );
}

if (typeof window !== "undefined") {
  // Ensure the adapter listeners are invalidated before refreshing the page.
  window.addEventListener("beforeunload", removeAdapterEventListeners);
}
