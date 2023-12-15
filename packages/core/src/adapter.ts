import EventEmitter from "eventemitter3";
import { WalletName, WalletReadyState } from "./wallet";
import type { WalletAccount } from "@wallet-standard/base";
import type { SignableData, SignedAny, Signed } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import type { WalletError } from "./error";

export { EventEmitter };

export interface WalletAdapterEvents {
  connect(account: WalletAccount): void;
  disconnect(): void;
  error(error: WalletError): void;
  readyStateChange(readyState: WalletReadyState): void;
  accountChange(account: WalletAccount | null): void;
}

export interface WalletAdapterContext {
  name: WalletName | null;
  readyState: WalletReadyState;
  account: WalletAccount | null;
  connecting: boolean;
  connected: boolean;
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
  icon: string;
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
  abstract icon: string;
  abstract readyState: WalletReadyState;
  abstract account: WalletAccount | null;
  abstract connecting: boolean;

  get connected() {
    return !!this.account;
  }

  get publicKey(): string | null {
    return this.account ? this.account.address : null;
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
    const interval =
      // TODO: #334 Replace with idle callback strategy.
      setInterval(detectAndDispose, 1000);
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
