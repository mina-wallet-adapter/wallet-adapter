export const isGithub = process.env.BUILD_ENV === "github";

// Set GitHub repo name as the sub-path prefix when site is built for GitHub Pages
export const assetPrefix = isGithub ? "/wallet-adapter" : "";
