import { ApnLogo, Card, Icon, SiteNav } from "akvaplan_fresh/components/mod.ts";
import { LinkLang } from "akvaplan_fresh/islands/lang_switcher.tsx";
import ThemeSwitcher from "akvaplan_fresh/islands/theme_switcher.tsx";
import { t } from "akvaplan_fresh/text/mod.ts";

const footerStyle = {
  margin: 0,
  background: "var(--surface1)",
  display: "grid",
  placeItems: "center",
  color: "var(--text1)",
  gap: "rem",
  padding: "2rem",
};

export function Footer({ lang }) {
  return (
    <footer>
      <nav style={footerStyle}>
        <a href="/" aria-label={t("nav.go_home")} style={{ marginTop: "3rem" }}>
          <ApnLogo height="400px" />
        </a>
        <SiteNav />
      </nav>
      <div
        style={{
          background: "var(--surface2)",
          display: "grid",
          gridTemplateColumns: "1fr",
          placeItems: "center",
          justifyContent: "middle",
          margin: 0,
          padding: "1rem",
        }}
      >
        <ThemeSwitcher mini />
      </div>
    </footer>
  );
}
