import AkvaplanLogo from "./akvaplan_logo.tsx";
import op from "open-props";
import { lang, t } from "akvaplan_fresh/text/mod.ts";
export function CleanHeader(
  { href = "/", HeaderLogo = AkvaplanLogo, nav = [] },
) {
  return (
    <header
      style={{
        margin: 0,
        padding: op.borderSize3,
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
