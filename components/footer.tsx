import { ApnLogo, SiteNav } from "akvaplan_fresh/components/mod.ts";
import ThemeSwitcher from "akvaplan_fresh/islands/theme_switcher.tsx";
import { t } from "akvaplan_fresh/text/mod.ts";

const footerStyle = {
  margin: 0,
  background: "var(--surface1)",
  display: "grid",
  placeItems: "center",
  color: "var(--text1)",
  padding: "2rem",
};

export function Footer() {
  return (
    <footer style={footerStyle}>
      <a href="/" aria-label={t("nav.go_home")}>
        <ApnLogo height="400px" />
      </a>
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <ThemeSwitcher mini />
      </div>
      <SiteNav />
    </footer>
  );
}
