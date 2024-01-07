export const isProduction = process.env.NODE_ENV === "production";

// Set Github repo name as the sub-path prefix since this site is deployed using Github Pages
export const assetPrefix = isProduction ? "/mina-wallet-adapter" : "";

export const addAssetPrefix = path => `${assetPrefix}${path}`;
