import type { Wallet, WalletIcon, WalletAccount } from "@wallet-standard/base";
import {
  type StandardConnectMethod,
  type StandardConnectFeature,
  type StandardDisconnectFeature,
  type StandardDisconnectMethod,
  type StandardEventsFeature,
  type StandardEventsListeners,
  type StandardEventsNames,
  type StandardEventsOnMethod,
  StandardConnect,
  StandardDisconnect,
  StandardEvents
} from "@wallet-standard/features";
import {
  type MinaChain,
  MinaFeatures,
  MinaSignMessage,
  MinaSignMessageMethod,
  MinaSignTransaction,
  MinaSignTransactionMethod,
  MinaSendTransaction,
  MinaSendTransactionMethod,
  MinaSignAndSendTransaction,
  MinaSignAndSendTransactionMethod,
  MINA_CHAINS
} from "mina-wallet-standard";
import { MinaWalletAdapter } from "./adapter";
import { WalletName, WalletReadyState } from "./wallet";
import type { SignableData, SignedAny, Signed } from "./types";

export interface StandardWalletAdapterProps {
  name: WalletName;
  icon: WalletIcon;
  url: string;
  connect(): Promise<WalletAccount>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<Signed<string> | undefined>;
  signTransaction(transaction: SignableData): Promise<SignedAny | undefined>;
  sendTransaction(transaction: SignedAny): Promise<string | undefined>;
  signAndSendTransaction(transaction: SignableData): Promise<string | undefined>;
}

export interface MinaStandardWalletConfig {
  adapterProps: StandardWalletAdapterProps;
  chains?: MinaChain[];
}

const supportedStandardVersion = "1.0.0" as const;

export class MinaStandardWalletAdapter extends MinaWalletAdapter {
  private _props: StandardWalletAdapterProps;
  private _connecting: boolean;
  private _chain: MinaChain | null;
  private _account: WalletAccount | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;

  constructor(props: StandardWalletAdapterProps) {
    super();
    this._props = props;
    this._connecting = false;
    this._account = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      this._readyState = WalletReadyState.Installed;
      this.emit("readyStateChange", this._readyState);
    }
  }

  get standard() {
    return true as const;
  }

  get name() {
    return this._props.name as WalletName;
  }

  get icon() {
    return this._props.icon as WalletIcon;
  }

  get url() {
    return this._props.url;
  }

  get account() {
    return this._account;
  }

  get connecting() {
    return this._connecting;
  }

  get readyState() {
    return this._readyState;
  }

  get chain() {
    return this._chain;
  }

  set chain(newChain: MinaChain | null) {}

  async connect(): Promise<void> {
    this._account = await this._props.connect();
    this.emit("connect", this._account);
  }

  async disconnect(): Promise<void> {
    await this._props.disconnect();
    this._account = null;
    this.emit("disconnect");
  }

  async signMessage(message: string): Promise<Signed<string>> {
    throw new Error("ToDo");
  }

  async signTransaction(transaction: SignableData): Promise<SignedAny> {
    throw new Error("ToDo");
  }

  async sendTransaction(transaction: SignedAny): Promise<string | undefined> {
    throw new Error("ToDo");
  }

  async signAndSendTransaction(transaction: SignableData): Promise<string | undefined> {
    throw new Error("ToDo");
  }
}

export class MinaStandardWallet implements Wallet {
  private _adapter: MinaWalletAdapter;
  private _chains: MinaChain[] | undefined;
  private _account: WalletAccount | null = null;

  readonly _listeners: {
    [E in StandardEventsNames]?: StandardEventsListeners[E][];
  } = {};

  constructor(config: MinaStandardWalletConfig) {
    this._adapter = new MinaStandardWalletAdapter(config.adapterProps);
    this._chains = config.chains;

    this._adapter.on("connect", this.connected, this);
    this._adapter.on("disconnect", this.disconnected, this);

    this.connected();
  }

  get version() {
    return supportedStandardVersion;
  }

  get name() {
    return this._adapter.name;
  }

  get icon() {
    return this._adapter.icon as WalletIcon;
  }

  get url() {
    return this._adapter.url;
  }

  get chains() {
    return this._chains && this._chains.length ? this._chains : MINA_CHAINS.slice();
  }

  get accounts() {
    return this._account ? [this._account] : [];
  }

  get adapter() {
    return this._adapter;
  }

  get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & MinaFeatures {
    return {
      [StandardConnect]: {
        version: supportedStandardVersion,
        connect: this.connect
      },
      [StandardDisconnect]: {
        version: supportedStandardVersion,
        disconnect: this.disconnect
      },
      [StandardEvents]: {
        version: supportedStandardVersion,
        on: this.on
      },
      [MinaSignMessage]: {
        version: supportedStandardVersion,
        signMessage: this.signMessage
      },
      [MinaSignTransaction]: {
        version: supportedStandardVersion,
        signTransaction: this.signTransaction
      },
      [MinaSendTransaction]: {
        version: supportedStandardVersion,
        sendTransaction: this.sendTransaction
      },
      [MinaSignAndSendTransaction]: {
        version: supportedStandardVersion,
        signAndSendTransaction: this.signAndSendTransaction
      }
    };
  }

  connect: StandardConnectMethod = async ({ silent } = {}) => {
    if (!silent && !this._adapter.connected) {
      await this._adapter.connect();
    }
    this.connected();

    return { accounts: this.accounts };
  };

  connected(): void {
    const account = this._adapter.account;
    if (account && account.address !== this._account?.address) {
      this._account = account;
      this.emit("change", { accounts: this.accounts });
    }
  }

  disconnect: StandardDisconnectMethod = async () => {
    await this._adapter.disconnect();
  };

  disconnected(): void {
    if (this._account) {
      this._account = null;
      this.emit("change", { accounts: this.accounts });
    }
  }

  destroy(): void {
    this._adapter.off("connect", this.connected, this);
    this._adapter.off("disconnect", this.disconnected, this);
  }

  on: StandardEventsOnMethod = (event, listener) => {
    this._listeners[event]?.push(listener) || (this._listeners[event] = [listener]);
    return (): void => this.off(event, listener);
  };

  emit<E extends StandardEventsNames>(event: E, ...args: Parameters<StandardEventsListeners[E]>): void {
    this._listeners[event]?.forEach(listener => listener.apply(null, args));
  }

  off<E extends StandardEventsNames>(event: E, listener: StandardEventsListeners[E]): void {
    this._listeners[event] = this._listeners[event]?.filter(existingListener => listener !== existingListener);
  }

  signMessage: MinaSignMessageMethod = async ({ message }) => {
    return { signedMessage: await this._adapter.signMessage(message) };
  };

  signTransaction: MinaSignTransactionMethod = async ({ transaction }) => {
    return { signedTransaction: await this._adapter.signTransaction(transaction) };
  };

  sendTransaction: MinaSendTransactionMethod = async ({ signedTransaction }) => {
    return { signature: await this._adapter.sendTransaction(signedTransaction) };
  };

  signAndSendTransaction: MinaSignAndSendTransactionMethod = async ({ transaction }) => {
    return { signature: await this._adapter.signAndSendTransaction(transaction) };
  };
}
