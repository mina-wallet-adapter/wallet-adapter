import { Tabs, Pre } from "nextra/components";
import { SvelteIcon, ReactIcon } from "@components/icons";
import { LinkButton } from "@components/elements";
import SvelteCode from "./svelte_code.mdx";
import ReactCode from "./react_code.mdx";
import style from "./style.module.css";

function Hero() {
  return (
    <div className={`${style.section} ${style.hero}`}>
      <div className={style.textdiv}>
        <h1>Mina Wallet Adapter</h1>
        <p className="nextra-content">Add wallets support to your zkApps with ease 🔥</p>
        <div className="nx-flex mx-flex-wrap nx-gap-4 nx-justify-center md:nx-justify-start nx-mt-8">
          <LinkButton href="/docs/intro">View Docs</LinkButton>
          <LinkButton href="https://mina-wallet-adapter.github.io/starter-kit-svelte/" target="_blank">
            See Demo ↗
          </LinkButton>
        </div>
      </div>
      <div className={style.imgdiv} style={{ backgroundImage: "url('./assets/hero.png')" }} />
    </div>
  );
}

function Code() {
  return (
    <>
      <hr className="dark:nx-border-neutral-800" />
      <div className={`${style.section} ${style.code}`}>
        <div>
          <h2>Get started in seconds</h2>
          <p>
            Simple, intuitive and easy to integrate. Using React, Svelte or another library, add wallets support to
            zkApps with just a few lines of code.
          </p>
          <LinkButton href="/docs/guide/quickstart" className="nx-my-4">
            Learn more
          </LinkButton>
        </div>
        <div className="nextra-scrollbar nx-overflow-x-auto nx-overflow-y-hidden nx-overscroll-x-contain">
          <div className="nx-w-max nx-min-w-full nx-bg-gray-100 dark:nx-bg-gray-50/10 nx-rounded-xl nx-pt-1 nx-px-4 nx-pb-8">
            <Tabs
              storageKey="selectedJSFramework"
              items={[
                <span>
                  <ReactIcon /> React
                </span>,
                <span>
                  <SvelteIcon /> Svelte
                </span>
              ]}
            >
              <Tabs.Tab>
                <Pre hasCopyCode={true}>
                  <ReactCode />
                </Pre>
              </Tabs.Tab>
              <Tabs.Tab>
                <Pre hasCopyCode={true}>
                  <SvelteCode />
                </Pre>
              </Tabs.Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <hr className="dark:nx-border-neutral-800" />
    </>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Code />
    </>
  );
}
