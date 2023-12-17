import { ReactNode, useCallback } from "react";
import { AdapterId, WalletProvider, useWallet } from "mina-wallet-adapter-ui-react";
import type { WalletName } from "mina-wallet-adapter-core";
import type { AdapterOption, WalletError } from "mina-wallet-adapter-ui-react";

import "./App.css";

function App() {
  return (
    <AppContext>
      <Content />
    </AppContext>
  );
}

export default App;

type AppContextProp = { children: ReactNode };

function AppContext({ children }: AppContextProp) {
  const adapters: AdapterOption[] = [AdapterId.AURO];

  function onError(error: WalletError) {
    console.error(error);
  }

  return (
    <WalletProvider adapters={adapters} autoConnect={false} onError={onError}>
      {children}
    </WalletProvider>
  );
}

function Content() {
  const AuroWalletName = "Auro" as WalletName<"Auro">;
  const { connected, select, disconnect, publicKey, connect } = useWallet();

  const handleSelect = useCallback(
    (walletName: WalletName) => {
      if (select) select(walletName);
    },
    [select]
  );
  const handleConnect = useCallback(() => {
    if (connect) connect();
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    if (disconnect) disconnect();
  }, [disconnect]);

  return (
    <div className="App">
      <h1>Demo zkApp using React</h1>
      <p>
        Demo of{" "}
        <a href="https://github.com/aztemi/mina-wallet-adapter" target="_blank" rel="noreferrer">
          mina-wallet-adapter
        </a>{" "}
        for implementing zkApps in React.
      </p>
      <div>
        <button onClick={() => handleSelect(AuroWalletName)}>Select AuroWallet</button>
        <button onClick={handleConnect} disabled={connected}>
          Connect
        </button>
        <button onClick={handleDisconnect} disabled={!connected}>
          Disconnect
        </button>
      </div>
      <div>{publicKey}</div>
    </div>
  );
}
