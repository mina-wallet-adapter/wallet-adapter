import EventEmitter from "eventemitter3";
import { WalletName, WalletReadyState } from "./wallet";
import type { WalletAccount, WalletIcon } from "@wallet-standard/base";
import type { SignableData, SignedAny, Signed } from "./types";
import type { MinaChain } from "mina-wallet-standard";
import type { WalletError } from "./error";

export { EventEmitter };

export interface WalletAdapterEvents {
  connect(account: WalletAccount): void;
  disconnect(): void;
  error(error: WalletError): void;
  readyStateChange(readyState: WalletReadyState): void;
  accountChange(account: WalletAccount | null): void;
  chainChange(chain: MinaChain | null): void;
}

export interface WalletAdapterContext {
  name: WalletName | null;
  readyState: WalletReadyState;
  account: WalletAccount | null;
  connecting: boolean;
  connected: boolean;
  chain: MinaChain | null;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<Signed<string> | undefined>;
  signTransaction(transaction: SignableData): Promise<SignedAny | undefined>;
  sendTransaction(transaction: SignedAny): Promise<string | undefined>;
  signAndSendTransaction(transaction: SignableData): Promise<string | undefined>;
}

export interface WalletAdapterProps<Name extends string = string> extends WalletAdapterContext {
  name: WalletName<Name>;
  url: string;
  icon: WalletIcon;
  publicKey: string | null;
  autoConnect(): Promise<void>;
}

export type WalletAdapter<Name extends string = string> = WalletAdapterProps<Name> & EventEmitter<WalletAdapterEvents>;

export abstract class MinaWalletAdapter<Name extends string = string>
  extends EventEmitter<WalletAdapterEvents>
  implements WalletAdapter<Name>
{
  abstract name: WalletName<Name>;
  abstract url: string;
  abstract icon: WalletIcon;
  abstract readyState: WalletReadyState;
  abstract account: WalletAccount | null;
  abstract connecting: boolean;

  get connected() {
    return !!this.account;
  }

  get publicKey(): string | null {
    return this.account ? this.account.address : null;
  }

  get chain(): MinaChain | null {
    return null;
  }

  async autoConnect() {
    await this.connect();
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract signMessage(message: string): Promise<Signed<string>>;
  abstract signTransaction(transaction: SignableData): Promise<SignedAny>;
  abstract sendTransaction(transaction: SignedAny): Promise<string | undefined>;
  abstract signAndSendTransaction(transaction: SignableData): Promise<string | undefined>;

  protected scopePollingDetectionStrategy(detect: () => boolean): void {
    // Early return when server-side rendering
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const disposers: (() => void)[] = [];

    function detectAndDispose() {
      const detected = detect();
      if (detected) {
        for (const dispose of disposers) {
          dispose();
        }
      }
    }

    // Strategy #1: Try detecting every second.
    const interval = setInterval(detectAndDispose, 1000);
    disposers.push(() => clearInterval(interval));

    // Strategy #2: Detect as soon as the DOM becomes 'ready'/'interactive'.
    if (
      // Implies that `DOMContentLoaded` has not yet fired.
      document.readyState === "loading"
    ) {
      document.addEventListener("DOMContentLoaded", detectAndDispose, { once: true });
      disposers.push(() => document.removeEventListener("DOMContentLoaded", detectAndDispose));
    }

    // Strategy #3: Detect after the `window` has fully loaded.
    if (
      // If the `complete` state has been reached, we're too late.
      document.readyState !== "complete"
    ) {
      window.addEventListener("load", detectAndDispose, { once: true });
      disposers.push(() => window.removeEventListener("load", detectAndDispose));
    }

    // Strategy #4: Detect synchronously, now.
    detectAndDispose();
  }
}

export interface StandardWalletAdapterProps {
  name: WalletName;
  icon: WalletIcon;
  url: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signMessage(message: string): Promise<Signed<string> | undefined>;
  signTransaction(transaction: SignableData): Promise<SignedAny | undefined>;
  sendTransaction(transaction: SignedAny): Promise<string | undefined>;
  signAndSendTransaction(transaction: SignableData): Promise<string | undefined>;
}

export class MinaStandardWalletAdapter extends MinaWalletAdapter {
  private _props: StandardWalletAdapterProps;
  private _connecting: boolean;
  private _publicKey: string | null;
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
    this._publicKey = null;
    this._account = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      this._readyState = WalletReadyState.Installed;
      this.emit("readyStateChange", this._readyState);
    }
  }

  get name() {
    return this._props.name;
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

  get connected() {
    return !!this._publicKey;
  }

  get readyState() {
    return this._readyState;
  }

  get chain() {
    return this._chain;
  }

  set chain(newChain: MinaChain | null) {}

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}

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
