import { type MouseEvent, useRef, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { WalletReadyState, showExplainWalletSite } from "@mina-wallet-adapter/core";
import { useWallet } from "./useWallet";
import { useClickOutside } from "./useClickOutside";
import { WalletButton } from "./WalletButton";
import type { WalletName } from "@mina-wallet-adapter/core";

type WalletModalProps = {
  maxNumberOfWallets: number;
  closeModal: () => void;
};

export function WalletModal({ maxNumberOfWallets, closeModal }: WalletModalProps) {
  const ref = useRef(null);
  const { wallets, select } = useWallet();
  const [showMore, setShowMore] = useState(false);

  const numberOfWalletsShown = useMemo(() => (showMore ? wallets.length : maxNumberOfWallets), [wallets, showMore]);

  const walletsAvailable = useMemo(
    () => wallets.filter(w => w.readyState === WalletReadyState.Installed).length,
    [wallets]
  );

  useClickOutside({ ref, callback: closeModal });

  const toggleMore = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setShowMore(!showMore);
  }, [showMore]);

  function ToggleButton({ hideMsg = "Less options", showMsg = "More options" }) {
    return (
      <button
        className={`wallet-adapter-modal-list-more ${showMore ? "wallet-adapter-modal-collapse-button-active" : ""}`}
        style={{ justifyContent: "space-between" }}
        onClick={toggleMore}
      >
        <span>{showMore ? hideMsg : showMsg}</span>
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          className={showMore ? "wallet-adapter-modal-list-more-icon-rotate" : ""}
        >
          <path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" />
        </svg>
      </button>
    );
  }

  function WalletsList() {
    const handleClick = useCallback((name: WalletName) => {
      select(name);
      closeModal();
    }, []);

    return (
      <ul className="wallet-adapter-modal-list">
        {wallets.slice(0, numberOfWalletsShown).map(({ name, icon, readyState }, idx) => (
          <li key={idx}>
            <WalletButton
              onClick={async () => await handleClick(name)}
              startIcon={<img src={icon} alt={`${name} icon`} />}
              endStatus={readyState === WalletReadyState.Installed ? "Detected" : ""}
            >
              {name}
            </WalletButton>
          </li>
        ))}
      </ul>
    );
  }

  function WalletsAvailableModal() {
    return (
      <>
        <div className="wallet-adapter-modal-middle" />
        <WalletsList />
        {wallets.length > maxNumberOfWallets && <ToggleButton />}
      </>
    );
  }

  function WalletNotAvailableModal() {
    const getStarted = useCallback(() => {
      showExplainWalletSite();
      closeModal();
    }, []);

    return (
      <>
        <div className="wallet-adapter-modal-middle">
          <button type="button" className="wallet-adapter-modal-middle-button" onClick={getStarted}>
            New to Mina? Learn More
          </button>
        </div>
        <ToggleButton hideMsg="Hide options" showMsg="Already have a wallet? View options" />
        {showMore && <WalletsList />}
      </>
    );
  }

  return (
    <>
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-adapter-modal-title"
          className="wallet-adapter-modal wallet-adapter-modal-fade-in"
        >
          <div className="wallet-adapter-modal-container">
            <div className="wallet-adapter-modal-wrapper" ref={ref}>
              <h1 className="wallet-adapter-modal-title">
                {walletsAvailable ? "Connect a wallet to continue" : "You'll need a wallet on Mina to continue"}
              </h1>

              <button onClick={closeModal} className="wallet-adapter-modal-button-close">
                <svg width="14" height="14">
                  <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
                </svg>
              </button>

              <div className="wallet-adapter-modal-middle">
                <svg width="97" height="97" viewBox="0 0 180 180">
                  <path
                    fill="#fff"
                    d="M90,152.74a9.1,9.1,0,0,1-9.34-8.31l-1-8.23c-10-2.85-15.86-10.25-17.37-22l-9-69.34a33.52,33.52,0,0,0-5.85-.42,31.56,31.56,0,0,0-8.56,1.11V150.71H21.18V66.18c0-11.47,5.14-19.57,14.53-22.94V37.79c0-6.3,3.82-10.53,9.51-10.53s9.26,3.54,10.18,10l.7,5.05c10.25,2.9,16.32,11.15,18.06,24.54l8.31,66.84a39.74,39.74,0,0,0,15.06,0l8.31-66.83c1.74-13.4,7.81-21.65,18.06-24.55l.7-5.05c.92-6.43,4.53-10,10.18-10s9.51,4.23,9.51,10.53v5.45c9.39,3.37,14.53,11.47,14.53,22.94v84.53H141.14V45.54a31.62,31.62,0,0,0-8.56-1.11,33.52,33.52,0,0,0-5.85.42l-9,69.35c-1.48,11.54-7.48,19.12-17.37,22l-1,8.25A8.89,8.89,0,0,1,90,152.74ZM82.89,137l.9,7.09A5.92,5.92,0,0,0,90,149.59a5.8,5.8,0,0,0,6.21-5.54l.9-7.1a43.87,43.87,0,0,1-14.22,0Zm61.4,10.61h11.38V66.18c0-9.72-3.92-16.43-11.38-19.56Zm-120,0H35.71V46.62c-7.46,3.13-11.38,9.84-11.38,19.56ZM56.56,45.72l8.81,68.07c1.27,9.85,5.91,16.22,13.82,19L71,67.21C69.53,55.65,64.79,48.59,56.56,45.72Zm66.88,0c-8.23,2.87-13,9.93-14.47,21.5l-8.15,65.53c7.9-2.78,12.55-9.15,13.81-19ZM38.86,42.24v0a35.31,35.31,0,0,1,8.56-1,39,39,0,0,1,5.41.32l-.55-3.93c-.69-4.82-3.06-7.26-7.06-7.26s-6.36,2.83-6.36,7.38Zm93.72-1a35.31,35.31,0,0,1,8.56,1V37.79c0-4.55-2.44-7.38-6.36-7.38s-6.37,2.44-7.06,7.26l-.55,3.93A39,39,0,0,1,132.58,41.28Z"
                  />
                </svg>
              </div>

              {walletsAvailable ? <WalletsAvailableModal /> : <WalletNotAvailableModal />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
