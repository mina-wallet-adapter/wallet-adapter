const MINA_WALLET_EXPLAIN_SITE = "https://docs.minaprotocol.com/using-mina/install-a-wallet";

export async function copyToClipboard(text: string) {
  await navigator?.clipboard.writeText(text);
}

export function shortenAddress(addr: string, limit: number = 6): string {
  return `${addr.slice(0, limit)}...${addr.slice(-limit)}`;
}

export function showExplainWalletSite() {
  if (typeof window !== "undefined") {
    window.open(MINA_WALLET_EXPLAIN_SITE, "_blank");
  }
}
