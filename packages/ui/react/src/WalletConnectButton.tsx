import React, { useState } from "react";
import { shortenAddress } from "@mina-wallet-adapter/core";
import { useWallet } from "./useWallet";
import { WalletButton } from "./WalletButton";
import { WalletMenu } from "./WalletMenu";

type WalletConnectButtonProps = {
  disabled?: boolean;
  openModal: () => void;
};

export function WalletConnectButton({ disabled, openModal }: WalletConnectButtonProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const { connected, connecting, wallet, account } = useWallet();

  function handleClick() {
    if (connected) setOpenMenu(true);
    else openModal();
  }

  function getText() {
    let content = "Connect Wallet";
    if (wallet) content = "Connect";
    if (connecting) content = "Connecting ...";
    if (connected) content = account ? shortenAddress(account.address) : "Connected";

    return content;
  }

  return (
    <div className="wallet-adapter-dropdown">
      <WalletButton
        className="wallet-adapter-button-trigger"
        disabled={disabled || connecting}
        startIcon={wallet ? <img src={wallet?.icon} alt={`${wallet?.name} icon`} /> : undefined}
        onClick={handleClick}
      >
        {getText()}
      </WalletButton>
      {openMenu && (
        <WalletMenu
          nodeSelector=".wallet-adapter-dropdown"
          closeMenu={() => setOpenMenu(false)}
          openModal={openModal}
        />
      )}
    </div>
  );
}
