import { Icon } from "akvaplan_fresh/components/icon.tsx";

console.log(
  "@todo AlbumHeader: margin before as function of viewport ie. media query (3rem nice in XXL only)",
);
export const AlbumHeader = ({ text, href, icon = "arrow_forward_ios" }) => (
  <h2 style={{ marginBlockStart: "0rem" }}>
    <a
      href={href}
      style={{ color: "var(--text1)" }}
    >
      {text} <Icon name={icon} />
    </a>
  </h2>
);
