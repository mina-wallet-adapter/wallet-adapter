import type {
  Wallet,
  WalletEventsWindow,
  WindowRegisterWalletEvent,
  WindowRegisterWalletEventCallback
} from "@wallet-standard/base";

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

export function registerWallet(wallet: Wallet): void {
  const callback: WindowRegisterWalletEventCallback = ({ register }) => register(wallet);

  try {
    (window as WalletEventsWindow).dispatchEvent(new RegisterWalletEvent(callback));
  } catch (error) {
    console.error("wallet-standard:register-wallet event could not be dispatched", error);
  }

  try {
    (window as WalletEventsWindow).addEventListener("wallet-standard:app-ready", ({ detail: api }) => callback(api));
  } catch (error) {
    console.error("wallet-standard:app-ready event listener could not be added", error);
  }
}

class RegisterWalletEvent extends Event implements WindowRegisterWalletEvent {
  readonly _detail: WindowRegisterWalletEventCallback;

  constructor(callback: WindowRegisterWalletEventCallback) {
    super("wallet-standard:register-wallet", {
      bubbles: false,
      cancelable: false,
      composed: false
    });
    this._detail = callback;
  }

  get detail() {
    return this._detail;
  }

  get type() {
    return "wallet-standard:register-wallet" as const;
  }

  preventDefault(): never {
    throw new Error("preventDefault cannot be called");
  }

  stopImmediatePropagation(): never {
    throw new Error("stopImmediatePropagation cannot be called");
  }

  stopPropagation(): never {
    throw new Error("stopPropagation cannot be called");
  }
}
