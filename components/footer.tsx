import { SiteNav } from "akvaplan_fresh/components/site_nav.tsx";
import ApnLogo from "akvaplan_fresh/components/akvaplan_logo.tsx";

const footerStyle = {
  margin: 0,
  background: "var(--surface4)",
  display: "grid",
  placeItems: "center",
  color: "var(--text1)",
  padding: "2rem",
};

export function Footer() {
  return (
    <footer style={footerStyle}>
      <ApnLogo width="400" />
      <SiteNav />
    </footer>
  );
}
