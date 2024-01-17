import React from "react";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import type { DocsThemeConfig } from "nextra-theme-docs";

const site = {
  name: "Mina Wallet Adapter",
  url: "https://aztemi.github.io/mina-wallet-adapter",
  description: "Add wallets support to your zkApps with ease."
};

const config: DocsThemeConfig = {
  logo: <span>{site.name}</span>,
  nextThemes: {
    defaultTheme: "dark"
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: `%s – ${site.name}`
      };
    }
  },
  head: function useHead() {
    const { title } = useConfig();
    const pageTitle = (title ? title + " – " : "") + site.name;
    const socialCard = `${site.url}/og.png`;

    return (
      <>
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content={site.name} />
        <meta name="description" content={site.description} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={site.url} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:image" content={socialCard} />
        <meta property="twitter:description" content={site.description} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:url" content={site.url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={socialCard} />
        <meta property="og:description" content={site.description} />
        <meta property="og:site_name" content={site.name} />
      </>
    );
  },
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
