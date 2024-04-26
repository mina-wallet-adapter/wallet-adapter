import { getWallets } from "@wallet-standard/app";
import { Network, WalletReadyState, type WalletAdapter, type MinaStandardWallet } from "@mina-wallet-adapter/core";

export const AdapterId = {
  AURO: "auro",
  LEDGER: "ledger",
  METAMASK_SNAP: "MetaMask Snap"
} as const;

export type AdapterIdType = (typeof AdapterId)[keyof typeof AdapterId];

export type AdapterOption = AdapterIdType | { adapter: AdapterIdType; config?: object };

export async function loadAdapters(options: AdapterOption[]): Promise<WalletAdapter[]> {
  let adapters: { [key: string]: WalletAdapter } = {};
  let detected: WalletAdapter[] = [];
  let others: WalletAdapter[] = [];

  // normalize and remove duplicates
  const nOptions = options
    .map(aId => (typeof aId === "string" ? { adapter: aId, config: {} } : aId))
    .filter((a, idx, arr) => arr.findIndex(b => b.adapter === a.adapter) === idx);

  // load adapters
  await Promise.allSettled(
    nOptions.map(async ({ adapter, config }) => {
      switch (adapter) {
        case AdapterId.AURO:
          const { AuroWalletAdapter } = await import("@mina-wallet-adapter/auro");
          adapters[adapter] = new AuroWalletAdapter(config);
          break;

        case AdapterId.LEDGER:
          const { LedgerWalletAdapter } = await import("@mina-wallet-adapter/ledger");
          adapters[adapter] = new LedgerWalletAdapter(config);
          break;

        case AdapterId.METAMASK_SNAP:
          const { MetaMaskSnapWalletAdapter } = await import("@mina-wallet-adapter/metamask-snap");
          adapters[adapter] = new MetaMaskSnapWalletAdapter(config);
          break;

        default:
          break;
      }
    })
  );

  // autodetect wallets supporting Wallet Standard
  const { get } = getWallets();
  const standardWallets = get().filter(w => w.chains.includes(Network.Mainnet)) as MinaStandardWallet[];
  standardWallets.forEach(({ name, adapter }) => {
    if (Object.values(adapters).some(a => a.name !== name)) detected.push(adapter);
  });

  // keep adapters order based on request, sorting detected adapters to the top
  nOptions.forEach(({ adapter }) =>
    adapters[adapter].readyState === WalletReadyState.Installed
      ? detected.push(adapters[adapter])
      : others.push(adapters[adapter])
  );

  return detected.concat(others);
}
