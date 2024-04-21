import type { Wallet, WalletIcon, WalletAccount } from "@wallet-standard/base";
import type {
  StandardConnectMethod,
  StandardDisconnectMethod,
  StandardEventsListeners,
  StandardEventsNames,
  StandardEventsOnMethod
} from "@wallet-standard/features";
import { type MinaChain, MINA_CHAINS } from "mina-wallet-standard";
import { type MinaWalletAdapter, type StandardWalletAdapterProps, MinaStandardWalletAdapter } from "./adapter";

/** WalletName is a nominal type. Wallet adapters should use like: `'MyMinaWallet' as WalletName<'MyMinaWallet'>` */
export type WalletName<T extends string = string> = T & { __brand__: "WalletName" };

/**
 * A wallet's readiness describes a series of states that the wallet can be in,
 * depending on what kind of wallet it is.
 */
export enum WalletReadyState {
  /**
   * User-installable wallets can typically be detected by scanning for an API
   * that they've injected into the global context. If such an API is present,
   * we consider the wallet to have been installed.
   */
  Installed = "Installed",
  NotDetected = "NotDetected",
  /**
   * Loadable wallets are always available to you. Since you can load them at
   * any time, it's meaningless to say that they have been detected.
   */
  Loadable = "Loadable",
  /**
   * If a wallet is not supported on a given platform (eg. server-rendering, or
   * mobile) then it will stay in the `Unsupported` state.
   */
  Unsupported = "Unsupported"
}

export interface MinaStandardWalletConfig {
  adapterProps: StandardWalletAdapterProps;
  chains?: MinaChain[];
}

const supportedStandardVersion = "1.0.0" as const;

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
    return this._chains && this._chains.length ? this._chains : MINA_CHAINS;
  }

  get accounts() {
    return this._account ? [this._account] : [];
  }

  get features() {
    return {};
  }

  connect: StandardConnectMethod = async () => {
    await this._adapter.connect();
    return { accounts: this.accounts };
  };

  connected(): void {
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
}
