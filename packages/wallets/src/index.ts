import type { WalletAdapter } from "@mina-wallet-adapter/core";

export const AdapterId = {
  AURO: "auro",
  LEDGER: "ledger",
  METAMASK_SNAP: "MetaMask Snap"
} as const;

export type AdapterIdType = (typeof AdapterId)[keyof typeof AdapterId];

export type AdapterOption = AdapterIdType | { adapter: AdapterIdType; config?: object };

export async function loadAdapters(options: AdapterOption[]): Promise<WalletAdapter[]> {
  let adapters: WalletAdapter[] = [];

  await Promise.allSettled(
    options
      // normalize to object arrays
      .map(aId => (typeof aId === "string" ? { adapter: aId, config: {} } : aId))

      // remove duplicates
      .filter((a, idx, arr) => arr.findIndex(b => b.adapter === a.adapter) === idx)

      // load adapters
      .map(async ({ adapter, config }) => {
        switch (adapter) {
          case AdapterId.AURO:
            const { AuroWalletAdapter } = await import("@mina-wallet-adapter/auro");
            adapters.push(new AuroWalletAdapter(config));
            break;

          case AdapterId.LEDGER:
            const { LedgerWalletAdapter } = await import("@mina-wallet-adapter/ledger");
            adapters.push(new LedgerWalletAdapter(config));
            break;

          case AdapterId.METAMASK_SNAP:
            const { MetaMaskSnapWalletAdapter } = await import("@mina-wallet-adapter/metamask-snap");
            adapters.push(new MetaMaskSnapWalletAdapter(config));
            break;

          default:
            break;
        }
      })
  );

  return adapters;
}
