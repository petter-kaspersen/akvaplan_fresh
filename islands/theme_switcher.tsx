import {
  getColorScheme,
  setColorScheme,
  theme as themeSignal,
} from "akvaplan_fresh/theming/mod.js";

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
    setColorScheme(theme, root);
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
          mørk
        </button>

        <button
          color-scheme="dim"
          aria-pressed={theme === "dim"}
        >
          grå
        </button>
        <button
          color-scheme="blue"
          aria-pressed={theme === "blue"}
        >
          blå
        </button>
        <button
          color-scheme="light"
          aria-pressed={theme === "light"}
        >
          lys
        </button>
      </div>
    </form>
  );
}
