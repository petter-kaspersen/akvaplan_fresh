import { ApnLogo } from "akvaplan_fresh/components/mod.ts";

import { routes } from "akvaplan_fresh/services/nav.ts";
import { lang as langSignal, t } from "akvaplan_fresh/text/mod.ts";

import borders from "open-props/src/props.borders.js";
import { SiteMenu } from "./SiteMenu.tsx";

const Empty = (_ign: unknown) => <span></span>;

export function CleanHeader(
  {
    href = "/",
    lang = langSignal.value,
    Logo = ApnLogo,
    Right = SiteMenu,
    Left = Empty,
  },
) {
  return (
    <header
      id="top"
      style={{
        margin: 0,
        padding: borders["--border-size-3"],
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        color: "var(--text1)",
      }}
    >
      <Left lang={lang} />
      <a href={href}>
        <Logo />
      </a>
      <Right lang={lang} />
    </header>
  );
}
