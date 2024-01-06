import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Mina Wallet Adapter</span>,
  project: {
    link: "https://github.com/aztemi/mina-wallet-adapter"
  },
  docsRepositoryBase: "https://github.com/aztemi/mina-wallet-adapter/tree/main/site",
  editLink: {
    text: "Edit this page on GitHub →"
  },
  search: {
    placeholder: "Search Docs ..."
  },
  footer: {
    text: <small>© {new Date().getFullYear()} AZTemi.</small>
  }
};

export default config;
