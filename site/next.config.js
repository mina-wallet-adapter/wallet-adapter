import nextra from "nextra";
import { isProduction, assetPrefix } from "./constant.js";

const svgConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
};

const nextraConfig = {
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true
};

const withNextra = nextra(nextraConfig)(svgConfig);

// Suppress 'Specified "rewrites" cannot be used with "output: export"' error during production build
let output = undefined;
let images = undefined;
if (isProduction) {
  output = "export";
  images = { unoptimized: true };
  delete withNextra.rewrites;
}

const nextConfig = {
  output,
  images,
  assetPrefix,
  basePath: assetPrefix,
  reactStrictMode: true,
  trailingSlash: true
};

export default {
  ...withNextra,
  ...nextConfig
};
