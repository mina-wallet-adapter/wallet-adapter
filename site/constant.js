export const isGithub = process.env.BUILD_ENV === "github";

// Set Github repo name as the sub-path prefix when this site is intended for Github Pages
export const assetPrefix = isGithub ? "/mina-wallet-adapter" : "";

export const addAssetPrefix = path => `${assetPrefix}${path}`;
