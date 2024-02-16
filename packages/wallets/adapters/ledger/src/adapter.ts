export { LedgerWalletName, LedgerWalletAdapter, LedgerWalletAdapterConfig };

import { Buffer } from "buffer";
import { MINA_CHAINS } from "mina-wallet-standard";
import {
  MinaWalletAdapter,
  WalletReadyState,
  WalletLoadError,
  WalletNotReadyError,
  WalletConnectionError,
  WalletNotConnectedError,
  WalletDisconnectionError,
  WalletPublicKeyError,
  WalletSignMessageError,
  WalletNotSupportedMethod,
  WalletSignAndSendTransactionError
} from "@mina-wallet-adapter/core";
import type { WalletAccount } from "@wallet-standard/base";
import type { SignableData, SignedAny, Signed } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import type { EventEmitter, WalletName } from "@mina-wallet-adapter/core";
import type { default as Transport } from "@ledgerhq/hw-transport";

if (typeof window !== "undefined" && window.Buffer === undefined) {
  (window as any).Buffer = Buffer;
}

interface LedgerWalletAdapterConfig {
  derivationPath?: Buffer;
}

const LedgerWalletName = "Ledger" as WalletName<"Ledger">;

class LedgerWalletAdapter extends MinaWalletAdapter {
  name = LedgerWalletName;
  url = "https://ledger.com";
  icon =
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzUgMzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTIzLjU4OCAwaC0xNnYyMS41ODNoMjEuNnYtMTZhNS41ODUgNS41ODUgMCAwIDAgLTUuNi01LjU4M3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5KSIvPjxwYXRoIGQ9Im04LjM0MiAwaC0yLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCAtNS41ODUgNS41ODV2Mi43NTdoOC4zNDJ6Ii8+PHBhdGggZD0ibTAgNy41OWg4LjM0MnY4LjM0MmgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDUuNzM5KSIvPjxwYXRoIGQ9Im0xNS4xOCAyMy40NTFoMi43NTdhNS41ODUgNS41ODUgMCAwIDAgNS41ODUtNS42di0yLjY3MWgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS40NzggMTEuNDc4KSIvPjxwYXRoIGQ9Im03LjU5IDE1LjE4aDguMzQydjguMzQyaC04LjM0MnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5IDExLjQ3OCkiLz48cGF0aCBkPSJtMCAxNS4xOHYyLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCA1LjU4NSA1LjU4NWgyLjc1N3YtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDExLjQ3OCkiLz48L2c+PC9zdmc+";

  private _connecting: boolean;
  private _derivationPath: Buffer;
  private _transport: Transport | null;
  private _publicKey: string | null;
  private _account: WalletAccount | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    typeof navigator === "undefined" ||
    !(navigator as any).hid
      ? WalletReadyState.Unsupported
      : WalletReadyState.Loadable;

  constructor(config: LedgerWalletAdapterConfig = {}) {
    super();
    this._connecting = false;
    this._publicKey = null;
    this._transport = null;
    this._account = null;
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

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      if (this._readyState !== WalletReadyState.Loadable) throw new WalletNotReadyError();
      this._connecting = true;

      const transport = await getTransport();
      transport.on("disconnect", this._disconnected);

      try {
        this._publicKey = ""; // ToDo: Get Address
      } catch (error: any) {
        throw new WalletPublicKeyError(error?.message, error);
      }

      this._transport = transport;

      this._account = {
        address: this._publicKey,
        publicKey: new Uint8Array(), // ToDo: Calculate publicKey from address
        chains: MINA_CHAINS,
        features: [] // ToDo: Populate features
      };
      this.emit("connect", this._account);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    this._publicKey = null;
    this._account = null;

    const transport = this._transport;
    if (transport) {
      transport.off("disconnect", this._disconnected);

      this._transport = null;

      try {
        await transport.close();
      } catch (error: any) {
        this.emit("error", new WalletDisconnectionError(error?.message, error));
      }
    }

    this.emit("disconnect");
  }

  private _disconnected = () => {
    this._publicKey = null;
    this._account = null;

    const transport = this._transport;
    if (transport) {
      transport.off("disconnect", this._disconnected);
      this._transport = null;
      this.emit("disconnect");
    }
  };

  async signMessage(message: string): Promise<Signed<string>> {
    throw new WalletNotSupportedMethod(
      "'signMessage' is not supported. Ledger wallet does not support signing messages."
    );
  }

  async signTransaction(transaction: SignableData): Promise<SignedAny> {
    throw new WalletNotSupportedMethod("ToDo");
  }

  async sendTransaction(transaction: SignedAny): Promise<string | undefined> {
    throw new WalletNotSupportedMethod("ToDo");
  }

  async signAndSendTransaction(transaction: SignableData): Promise<string | undefined> {
    throw new WalletNotSupportedMethod("ToDo");
  }
}

async function getTransportClass() {
  try {
    // HID interface is more widely supported; try it first
    const webHIDClass = (await import("@ledgerhq/hw-transport-webhid")).default;
    if (await webHIDClass.isSupported()) return webHIDClass;

    // try WebUSB if HID is not supported
    const webUSBClass = (await import("@ledgerhq/hw-transport-webusb")).default;
    if (await webUSBClass.isSupported()) return webUSBClass;
  } catch (error: any) {
    throw new WalletLoadError(error?.message, error);
  }

  throw new WalletLoadError("No supported transport for Ledger device found");
}

async function getTransport() {
  const transportClass = await getTransportClass();
  const transport = await transportClass.create().catch(error => {
    throw new WalletConnectionError(error?.message, error);
  });

  return transport;
}
