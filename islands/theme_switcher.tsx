import {
  getColorScheme,
  removeColorScheme,
  setColorScheme,
  theme as themeSignal,
} from "akvaplan_fresh/theming/mod.js";

import { t } from "akvaplan_fresh/text/mod.ts";

const buttonsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  placeItems: "center",
};
export default function ThemeSwitcher() {
  const theme = themeSignal.value;

  const handleThemeClick = (e: MouseEvent) => {
    const theme = getColorScheme(e.target);
    const root = e?.target?.ownerDocument?.documentElement;
    if (!theme) {
      removeColorScheme();
    } else {
      setColorScheme(theme, root);
    }
    e.preventDefault();
  };

  return (
    <form
      onClick={handleThemeClick}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <button
          color-scheme="dark"
          aria-pressed={theme === "dark"}
        >
          {t("theme.dark")}
        </button>

        <button
          color-scheme="dim"
          aria-pressed={theme === "dim"}
        >
          {t("theme.dim")}
        </button>
        <button
          color-scheme="blue"
          aria-pressed={theme === "blue"}
        >
          {t("theme.blue")}
        </button>
        <button
          color-scheme="light"
          aria-pressed={theme === "light"}
        >
          {t("theme.light")}
        </button>
        <button
          aria-pressed={theme === undefined}
        >
          auto
        </button>
      </div>
    </form>
  );
}
