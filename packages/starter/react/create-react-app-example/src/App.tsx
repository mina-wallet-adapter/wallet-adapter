import { ReactNode, useState } from "react";
import { useWallet, WalletProvider, WalletMultiButton } from "@mina-wallet-adapter/ui-react";
import "@mina-wallet-adapter/ui-react/dist/wallet-adapter.css";

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
  return <WalletProvider autoConnect={true}>{children}</WalletProvider>;
}

function Content() {
  const [value] = useState(2);
  const [square, setSquare] = useState(0);
  const { connected, chain } = useWallet();

  function submit() {
    alert("This feature is WIP.");
  }

  return (
    <div className="App">
      <h1>
        zkApp starter-kit with <u>React</u>
      </h1>
      <p>
        Demo of{" "}
        <a href="https://github.com/mina-wallet-adapter/wallet-adapter" target="_blank" rel="noreferrer">
          mina-wallet-adapter
        </a>{" "}
        for implementing zkApps in React.
      </p>

      <span className="wallet-multi-button-span">
        <WalletMultiButton />
      </span>

      <div className="connect-div">
        {connected ? (
          <>
            <p>chain: {chain}</p>
            <p>
              What is the square of <strong>{value}</strong>?
            </p>
            <input type="number" min="0" value={square} onChange={e => setSquare(parseInt(e.target.value))} />
            <button className="wallet-adapter-button wallet-adapter-button-trigger" onClick={submit}>
              Submit
            </button>
          </>
        ) : (
          <p className="warning">You are not connected yet.</p>
        )}
      </div>

      <div className="source-div">
        <svg height="32" width="32" viewBox="0 0 16 16">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        <p>
          <a
            href="https://github.com/mina-wallet-adapter/wallet-adapter/tree/main/packages/starter/react/create-react-app-example"
            target="_blank"
            rel="noreferrer"
          >
            Get the source
          </a>
          .
        </p>
      </div>
    </div>
  );
}
