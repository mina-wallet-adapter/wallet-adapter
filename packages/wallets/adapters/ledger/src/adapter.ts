export { LedgerWalletName, LedgerWalletAdapter, LedgerWalletAdapterConfig };

import { Buffer } from "buffer";
import {
  type MinaChain,
  MINA_CHAINS,
  Network,
  MinaWalletAdapter,
  WalletReadyState,
  WalletLoadError,
  WalletNotReadyError,
  WalletConnectionError,
  WalletNotConnectedError,
  WalletDisconnectionError,
  WalletPublicKeyError,
  WalletSignTransactionError,
  WalletNotSupportedMethodError
} from "@mina-wallet-adapter/core";
import { MinaLedgerJS, SignTransactionArgs, TxType, Networks } from "@mina-wallet-adapter/mina-ledger-js";
import type { WalletAccount } from "@wallet-standard/base";
import type { SignableData, SignedAny, Signed, Payment } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import type { WalletName } from "@mina-wallet-adapter/core";
import type { default as Transport } from "@ledgerhq/hw-transport";

if (typeof window !== "undefined" && window.Buffer === undefined) {
  (window as any).Buffer = Buffer;
}

interface LedgerWalletAdapterConfig {
  chain?: MinaChain;
}

const LedgerWalletName = "Ledger" as WalletName<"Ledger">;

class LedgerWalletAdapter extends MinaWalletAdapter {
  name = LedgerWalletName;
  url = "https://ledger.com";
  icon =
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzUgMzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTIzLjU4OCAwaC0xNnYyMS41ODNoMjEuNnYtMTZhNS41ODUgNS41ODUgMCAwIDAgLTUuNi01LjU4M3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5KSIvPjxwYXRoIGQ9Im04LjM0MiAwaC0yLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCAtNS41ODUgNS41ODV2Mi43NTdoOC4zNDJ6Ii8+PHBhdGggZD0ibTAgNy41OWg4LjM0MnY4LjM0MmgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDUuNzM5KSIvPjxwYXRoIGQ9Im0xNS4xOCAyMy40NTFoMi43NTdhNS41ODUgNS41ODUgMCAwIDAgNS41ODUtNS42di0yLjY3MWgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS40NzggMTEuNDc4KSIvPjxwYXRoIGQ9Im03LjU5IDE1LjE4aDguMzQydjguMzQyaC04LjM0MnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5IDExLjQ3OCkiLz48cGF0aCBkPSJtMCAxNS4xOHYyLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCA1LjU4NSA1LjU4NWgyLjc1N3YtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDExLjQ3OCkiLz48L2c+PC9zdmc+" as const;

  private _connecting: boolean;
  private _transport: Transport | null;
  private _ledgerApp: MinaLedgerJS | null;
  private _publicKey: string | null;
  private _chain: MinaChain | null;
  private _account: WalletAccount | null;
  private _accountIndex: number = 1;
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
    this._transport = null;
    this._ledgerApp = null;
    this._publicKey = null;
    this._account = null;
    this._chain = (config && config?.chain) || Network.Devnet;
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

  set chain(newChain: MinaChain | null) {
    this._chain = newChain;
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      if (this._readyState !== WalletReadyState.Loadable) throw new WalletNotReadyError();
      this._connecting = true;

      const transport = await getTransport();
      transport.on("disconnect", this._disconnected);

      const ledgerApp = new MinaLedgerJS(transport);
      const { publicKey } = await ledgerApp.getAddress(this._accountIndex);
      if (!publicKey) throw new WalletPublicKeyError("Failed to get Ledger wallet address");

      this._publicKey = publicKey;
      this._transport = transport;
      this._ledgerApp = ledgerApp;

      this._account = {
        address: publicKey,
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
      this._ledgerApp = null;

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
      this._ledgerApp = null;
      this.emit("disconnect");
    }
  };

  async signMessage(message: string): Promise<Signed<string>> {
    throw new WalletNotSupportedMethodError(
      "'signMessage' is not supported. Ledger wallet does not support signing messages."
    );
  }

  async signTransaction(transaction: SignableData): Promise<SignedAny> {
    try {
      if (typeof transaction === "string")
        throw new WalletSignTransactionError("'transaction' parameter cannot be a string");

      const publicKey = this._publicKey;
      const ledgerApp = this._ledgerApp;
      if (!publicKey || !ledgerApp) throw new WalletNotConnectedError();

      const type = transaction.hasOwnProperty("amount") ? TxType.PAYMENT : TxType.DELEGATION;
      const { to, from, fee, nonce, amount = 0, memo = "" } = transaction as Payment;

      const payload: SignTransactionArgs = {
        txType: type,
        senderAccount: this._accountIndex,
        senderAddress: from,
        receiverAddress: to,
        amount: amount as number,
        fee: fee as number,
        nonce: nonce as number,
        memo,
        networkId: this.chain === Network.Mainnet ? Networks.MAINNET : Networks.DEVNET
      };

      const { signature } = await ledgerApp.signTransaction(payload).catch((error: any) => {
        throw new WalletSignTransactionError(error?.message, error);
      });

      return {
        signature: toSignatureJson(signature as string),
        publicKey,
        data: transaction
      };
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async sendTransaction(transaction: SignedAny): Promise<string | undefined> {
    throw new WalletNotSupportedMethodError("'sendTransaction' is not supported");
  }

  async signAndSendTransaction(transaction: SignableData): Promise<string | undefined> {
    throw new WalletNotSupportedMethodError("'signAndSendTransaction' is not supported");
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

function toSignatureJson(ledgerSignature: string = "") {
  const VALID_LEN = 128;
  const HALF_LEN = VALID_LEN / 2;

  if (ledgerSignature.length !== VALID_LEN) throw "Ledger signature not valid";

  const getSubstring = (start: number, end?: number | undefined) => ledgerSignature.substring(start, end);

  const reverseBytes = (hex: string) => {
    const bytes = hex.match(/.{2}/g) || [];
    return bytes.reverse().join("");
  };

  const field = reverseBytes(getSubstring(0, HALF_LEN));
  const scalar = reverseBytes(getSubstring(HALF_LEN));

  return { field, scalar };
}
