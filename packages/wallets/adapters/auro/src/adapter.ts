import {
  type MinaChain,
  MINA_CHAINS,
  MinaWalletAdapter,
  Network,
  type WalletAdapterContext,
  WalletReadyState,
  WalletNotReadyError,
  WalletConnectionError,
  WalletNotConnectedError,
  WalletSignMessageError,
  WalletNotSupportedMethodError,
  WalletSignAndSendTransactionError
} from "@mina-wallet-adapter/core";
import type { WalletAccount } from "@wallet-standard/base";
import type { SignableData, SignedAny, Signed } from "mina-signer/dist/node/mina-signer/src/TSTypes";
import type { WalletName } from "@mina-wallet-adapter/core";
import type { default as MinaProvider, ChainInfoArgs } from "@aurowallet/mina-provider";

interface AuroWallet extends WalletAdapterContext {
  isAuro?: boolean;
}

interface AuroWindow extends Window {
  mina: MinaProvider;
  auro?: AuroWallet;
}

declare const window: AuroWindow;

export interface AuroWalletAdapterConfig {}

export const AuroWalletName = "Auro" as WalletName<"Auro">;

export class AuroWalletAdapter extends MinaWalletAdapter {
  name = AuroWalletName;
  url = "https://www.aurowallet.com/";
  icon =
    "data:image/png;base64,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" as const;

  private _connecting: boolean;
  private _legacyAuro: MinaProvider;
  private _publicKey: string | null;
  private _chain: MinaChain | null;
  private _account: WalletAccount | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;

  constructor(config: AuroWalletAdapterConfig = {}) {
    super();
    this._connecting = false;
    this._publicKey = null;
    this._account = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      this.scopePollingDetectionStrategy(() => {
        if (window.auro?.isAuro || window.mina?.isAuro) {
          this._legacyAuro = window?.mina;
          this._readyState = WalletReadyState.Installed;
          this.emit("readyStateChange", this._readyState);
          return true;
        }
        return false;
      });
    }
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
    if (newChain) {
      const chainId = newChain === Network.Mainnet ? "mainnet" : newChain === Network.Berkeley ? "berkeley" : "devnet";
      const wallet = this._legacyAuro;
      if (!wallet) throw new WalletNotConnectedError();

      wallet.switchChain({ chainId }).then(() => {
        wallet.requestNetwork().then(a => this._chainChanged(a));
      });
    } else {
      this._chain = null;
    }
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      if (this._readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

      this._connecting = true;
      this._legacyAuro.on("chainChanged", this._chainChanged);
      this._legacyAuro.on("accountsChanged", this._accountsChanged);

      try {
        await this._legacyAuro.requestAccounts().then(a => this._accountsChanged(<string[]>a));
      } catch (error: any) {
        throw new WalletConnectionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    this._legacyAuro.off("chainChanged", this._chainChanged);
    this._legacyAuro.off("accountsChanged", this._accountsChanged);
    this._publicKey = null;
    this._chain = null;
    this._account = null;
    this.emit("disconnect");
  }

  private _accountsChanged = async (accounts: string[]) => {
    if (accounts && accounts.length) {
      this._publicKey = accounts[0];
      this._account = {
        address: this._publicKey,
        publicKey: new Uint8Array(), // ToDo: Calculate publicKey from address
        chains: MINA_CHAINS,
        features: [] // ToDo: Populate features
      };
      this.emit("connect", this._account);
      this._legacyAuro.requestNetwork().then(a => this._chainChanged(a));
    } else {
      this._publicKey = null;
      this._account = null;
      this.emit("disconnect");
    }
  };

  private _chainChanged = ({ chainId }: ChainInfoArgs) => {
    const chain = chainId === "mainnet" ? Network.Mainnet : chainId === "berkeley" ? Network.Berkeley : Network.Devnet;

    this._chain = chain;
    this.emit("chainChange", chain);
  };

  async signMessage(message: string): Promise<Signed<string>> {
    try {
      const wallet = this._legacyAuro;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        const signedMessage = <Signed<string>>(<unknown>await wallet.signMessage({ message }));
        return signedMessage;
      } catch (error: any) {
        throw new WalletSignMessageError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signTransaction(transaction: SignableData): Promise<SignedAny> {
    throw new WalletNotSupportedMethodError("'signTransaction' is not supported. Use 'signAndSendTransaction' instead.");
  }

  async sendTransaction(transaction: SignedAny): Promise<string | undefined> {
    throw new WalletNotSupportedMethodError("'sendTransaction' is not supported. Use 'signAndSendTransaction' instead.");
  }

  async signAndSendTransaction(transaction: SignableData): Promise<string | undefined> {
    try {
      const wallet = this._legacyAuro;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        const { hash } = <{ hash: string }>(<unknown>await wallet.sendTransaction({ transaction }));
        return hash;
      } catch (error: any) {
        throw new WalletSignAndSendTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }
}
