export { MetaMaskSnapWalletName, MetaMaskSnapWalletAdapter, MetaMaskSnapWalletAdapterConfig };

import {
  type Signed,
  type SignedAny,
  type SignableData,
  type WalletName,
  MINA_CHAINS,
  MinaWalletAdapter,
  WalletReadyState,
  WalletNotReadyError,
  WalletNotSupportedMethodError
} from "@mina-wallet-adapter/core";
import type { WalletAccount } from "@wallet-standard/base";

type MetaMaskSnap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  request?: any;
}

interface MetaMaskSnapWindow extends Window {
  ethereum: MetaMaskEthereumProvider;
}

declare const window: MetaMaskSnapWindow;

interface MetaMaskSnapWalletAdapterConfig {}

const MetaMaskSnapWalletName = "MetaMask Snap" as WalletName<"MetaMask Snap">;

const SNAP_ID = "npm:mina-portal";

class MetaMaskSnapWalletAdapter extends MinaWalletAdapter {
  name = MetaMaskSnapWalletName;
  url = "https://snaps.metamask.io/snap/npm/mina-portal/";
  icon =
    "data:image/png;base64,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" as const;

  private _connecting: boolean;
  private _listenerAdded = false;
  private _publicKey: string | null;
  private _account: WalletAccount | null;
  private _provider: MetaMaskEthereumProvider | null;
  private _snap: MetaMaskSnap | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;

  constructor(config: MetaMaskSnapWalletAdapterConfig = {}) {
    super();
    this._connecting = false;
    this._publicKey = null;
    this._account = null;
    this._provider = null;
    this._snap = null;

    if (this._readyState !== WalletReadyState.Unsupported) {
      this.scopePollingDetectionStrategy(this.detectMetamaskSnap);
    }
  }

  private detectMetamaskSnap = () => {
    const self = this;

    if (self._readyState === WalletReadyState.Installed) return true;

    function metamaskDetected(provider: MetaMaskEthereumProvider) {
      if (self._provider) return;

      self._provider = provider;
      self._readyState = WalletReadyState.Installed;
      self.emit("readyStateChange", self._readyState);
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
    }

    function detectEthereumProvider() {
      window.removeEventListener("ethereum#initialized", detectEthereumProvider);
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) metamaskDetected(ethereum);
    }

    function onAnnounce(event: any) {
      const { provider } = event.detail;
      if (provider && provider.isMetaMask) metamaskDetected(provider);
    }

    // detect using Ethereum Provider
    if (window.ethereum) {
      detectEthereumProvider();
    } else if (!self._listenerAdded) {
      window.addEventListener("ethereum#initialized", detectEthereumProvider);
      setTimeout(detectEthereumProvider, 3000); // Wait 3s for 'ethereum#initialized' to be dispatched
    }

    // detect via EIP-6963 standard
    if (!self._listenerAdded) {
      window.addEventListener("eip6963:announceProvider", onAnnounce);
    }
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    self._listenerAdded = true;

    return false;
  };

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
      if (this._readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

      const snapId = SNAP_ID;

      // connect to snap
      this._connecting = true;
      await this._provider?.request({ method: "wallet_requestSnaps", params: { [snapId]: {} } });

      // find the relevant snap
      const snaps = await this._provider?.request({ method: "wallet_getSnaps" });
      this._snap = Object.values(snaps).find((snap: any) => snap.id === snapId) as MetaMaskSnap;

      if (this._snap) {
        // get account
        const accounts = await this._provider?.request({
          method: "wallet_invokeSnap",
          params: {
            snapId,
            request: {
              method: "mina_accountList"
            }
          }
        });
        this._publicKey = accounts[0]?.address as string;
        this._account = {
          address: this._publicKey,
          publicKey: new Uint8Array(), // ToDo: Calculate publicKey from address
          chains: MINA_CHAINS,
          features: [] // ToDo: Populate features
        };

        this.emit("connect", this._account as WalletAccount);
      }
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
    this.emit("disconnect");
  }

  async signMessage(message: string): Promise<Signed<string>> {
    const signedMessage = <Signed<string>>(<unknown>"");
    return signedMessage;
  }

  async signTransaction(transaction: SignableData): Promise<SignedAny> {
    throw new WalletNotSupportedMethodError("ToDo");
  }

  async sendTransaction(transaction: SignedAny): Promise<string | undefined> {
    throw new WalletNotSupportedMethodError("ToDo");
  }

  async signAndSendTransaction(transaction: SignableData): Promise<string | undefined> {
    throw new WalletNotSupportedMethodError("ToDo");
  }
}
