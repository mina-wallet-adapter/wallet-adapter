import type {
  Wallet,
  WalletEventsWindow,
  WindowRegisterWalletEvent,
  WindowRegisterWalletEventCallback
} from "@wallet-standard/base";

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
