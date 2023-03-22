import AkvaplanLogo from "akvaplan_fresh/components/akvaplan_logo.tsx";
import borders from "open-props/props.borders.js";

import { lang, t } from "akvaplan_fresh/text/mod.ts";
export function CleanHeader(
  { href = "/", HeaderLogo = AkvaplanLogo, nav = [] },
) {
  return (
    <header
      style={{
        margin: 0,
        padding: borders["--border-size-3"],
        display: "grid",
        placeItems: "center",
        background: "var(--surface1)",
        color: "var(--text1)",
      }}
    >
      <a href={href}>
        <HeaderLogo />
      </a>
      <ul>
        {nav.map(({ href, text }) => (
          <li>
            <a href={href}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
