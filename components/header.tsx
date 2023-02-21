import AkvaplanLogo from "./akvaplan_logo.tsx";
import op from "open-props";
export function Header({ href = "/", HeaderLogo = AkvaplanLogo }) {
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
      <a
        href={href}
        style="min-width: 200px; height: auto;"
      >
        <HeaderLogo />
      </a>
    </header>
  );
}
