import { LinkButton } from "@components/elements";
import style from "./style.module.css";
import { addAssetPrefix } from "@/constant";

function Hero() {
  return (
    <div className={style.hero}>
      <div className={style.textdiv}>
        <h1>Mina Wallet Adapter</h1>
        <p className="nextra-content">Add wallets support to your zkApps with ease 🔥</p>
        <div className="nx-flex mx-flex-wrap nx-gap-4 nx-justify-center md:nx-justify-start nx-mt-8">
          <LinkButton href="/docs/intro">View Docs</LinkButton>
          <LinkButton href="https://mina-wallet-adapter.github.io/starter-kit-svelte/" target="_blank">
            See Demo
          </LinkButton>
        </div>
      </div>
      <div className={style.imgdiv} style={{ backgroundImage: `url('${addAssetPrefix("/assets/hero.png")}')` }} />
    </div>
  );
}

export function Home() {
  return <Hero />;
}
