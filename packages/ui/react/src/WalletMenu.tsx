import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { copyToClipboard } from "mina-wallet-adapter-core";
import { useClickOutside } from "./useClickOutside";
import { useWallet } from "./useWallet";

type WalletMenuProps = {
  nodeSelector: string;
  closeMenu: () => void;
  openModal: () => void;
};

export function WalletMenu({ nodeSelector, closeMenu, openModal }: WalletMenuProps) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const { account, disconnect } = useWallet();

  useClickOutside({ ref, callback: closeMenu });

  useEffect(() => {
    const node = document.querySelector(nodeSelector) as HTMLElement;
    if (node) setContainer(node);
  }, [nodeSelector]);

  async function handleCopy() {
    if (!account) return;
    await copyToClipboard(account.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 400);
  }

  function handleConnect() {
    openModal();
    closeMenu();
  }

  function handleDisconnect() {
    disconnect();
    closeMenu();
  }

  return (
    <>
      {container &&
        createPortal(
          <ul
            ref={ref}
            aria-label="dropdown-list"
            className="wallet-adapter-dropdown-list wallet-adapter-dropdown-list-active"
            role="menu"
          >
            <li role="menuitem">
              <button className="wallet-adapter-dropdown-list-button" onClick={handleCopy}>
                {copied ? "Copied" : "Copy address"}
              </button>
            </li>
            <li role="menuitem">
              <button className="wallet-adapter-dropdown-list-button" onClick={handleConnect}>
                Connect a different wallet
              </button>
            </li>
            <li role="menuitem">
              <button className="wallet-adapter-dropdown-list-button" onClick={handleDisconnect}>
                Disconnect
              </button>
            </li>
          </ul>,
          container
        )}
    </>
  );
}
