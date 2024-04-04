import { useState } from "react";
import { WalletConnectButton } from "./WalletConnectButton";
import { WalletModal } from "./WalletModal";

type WalletMultiButtonProps = {
  maxNumberOfWallets?: number;
};

export function WalletMultiButton({ maxNumberOfWallets = 3 }: WalletMultiButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <WalletConnectButton openModal={() => setOpenModal(true)} />
      {openModal && <WalletModal closeModal={() => setOpenModal(false)} maxNumberOfWallets={maxNumberOfWallets} />}
    </>
  );
}
