import React, { FC, ReactNode, useCallback } from "react";
import type { WalletError, WalletName } from "mina-wallet-adapter-core";
import { type AdapterOption, AdapterId, WalletProvider, useWallet } from "mina-wallet-adapter-ui-react";

import "./App.css";

const App: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};

export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const adapters: AdapterOption[] = [AdapterId.AURO];

  function onError(error: WalletError) {
    console.error(error);
  }

  return (
    <WalletProvider adapters={adapters} autoConnect onError={onError}>
      {children}
    </WalletProvider>
  );
};

const Content: FC = () => {
  const AuroWalletName = "Auro" as WalletName<"Auro">;
  const { connected, select } = useWallet();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, walletName: WalletName) => {
      if (select) select(walletName);
    },
    [select]
  );

  return (
    <div className="App">
      <h1>Square - Demo zkApp</h1>
      <p>
        Demo of{" "}
        <a href="https://github.com/aztemi/mina-wallet-adapter" target="_blank" rel="noreferrer">
          mina-wallet-adapter for implementing zkApps in Svelte.
        </a>
      </p>
      <div>
        <button onClick={event => handleClick(event, AuroWalletName)} disabled={connected}>
          Connect
        </button>
      </div>
    </div>
  );
};
