import {
  getAttrColorScheme,
  removeTheming,
  setTheme,
  theme as themeSignal,
} from "akvaplan_fresh/theming/mod.ts";

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
    e.preventDefault();
    const auto = e?.target?.dataset?.theme === "auto";
    if (auto) {
      removeTheming();
    } else {
      const theme = getAttrColorScheme(e.target);
      setTheme(theme);
    }
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
          data-theme="auto"
          color-scheme="blue"
          aria-pressed={theme === null}
        >
          {t("theme.auto")}
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
      </div>
    </form>
  );
}
