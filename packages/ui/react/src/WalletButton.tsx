import React from "react";
import type { CSSProperties, FC, MouseEvent, PropsWithChildren, ReactElement } from "react";

type WalletButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  startIcon?: ReactElement;
  endStatus?: ReactElement;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export const WalletButton: FC<WalletButtonProps> = props => {
  return (
    <button
      className={`wallet-adapter-button ${props.className || ""}`}
      disabled={props.disabled}
      style={{ justifyContent: "space-between", ...props.style }}
      onClick={e => {
        e.stopPropagation();
        if (props.onClick) props.onClick(e);
      }}
    >
      {props.startIcon && <i className="wallet-adapter-button-start-icon">{props.startIcon}</i>}
      {props.children}
      {props.endStatus && <span>{props.endStatus}</span>}
    </button>
  );
};
