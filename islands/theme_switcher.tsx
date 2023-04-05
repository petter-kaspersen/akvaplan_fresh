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

export const handleThemeClick = (e: MouseEvent) => {
  e.preventDefault();
  const auto = e?.target?.dataset?.theme === "auto";
  if (auto) {
    removeTheming();
  } else {
    const theme = getAttrColorScheme(e.target);
    if (theme) {
      setTheme(theme);
    }
  }
};

export default function ThemeSwitcher({ mini = false, auto = !mini } = {}) {
  const theme = themeSignal.value;
  return (
    <form
      onClick={handleThemeClick}
    >
      <div>
        <button
          color-scheme="dark"
          aria-label={t("theme.set.dark")}
          aria-pressed={theme === "dark"}
        >
          {mini ? <span>&nbsp;</span> : t("theme.dark")}
        </button>

        <button
          color-scheme="blue"
          aria-label={t("theme.set.blue")}
          aria-pressed={theme === "blue"}
        >
          {mini ? <span>&nbsp;</span> : t("theme.blue")}
        </button>
        <button
          color-scheme="light"
          aria-label={t("theme.set.light")}
          aria-pressed={theme === "light"}
        >
          {mini ? <span>&nbsp;</span> : t("theme.light")}
        </button>
        {auto
          ? (
            <button
              data-theme="auto"
              color-scheme="blue"
              aria-pressed={theme === null}
            >
              {mini ? <span>&nbsp;</span> : t("theme.auto")}
            </button>
          )
          : null}
      </div>
    </form>
  );
}
