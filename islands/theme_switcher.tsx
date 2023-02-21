interface ThemeProps {
  theme?: string;
}

const defaultTheme = "blue";

const storage = sessionStorage;

export const getTheme = (
  el = globalThis?.document?.documentElement,
): string => {
  if (el?.hasAttribute("color-scheme")) {
    return el.getAttribute("color-scheme") ?? defaultTheme;
  }
  return storage.getItem("theme") ?? defaultTheme;
};

export const setTheme = (
  theme: string,
  el = globalThis?.document?.documentElement,
) => {
  el.setAttribute("color-scheme", theme);
  if (theme === defaultTheme) {
    storage.removeItem("theme");
  } else {
    storage.setItem("theme", theme);
  }
};

const handleThemeClick = (e: Event & { target: Element }) => {
  e.preventDefault();
  //unpress previous button
  const selected = e?.target?.parentElement?.querySelector(
    '[color-scheme][aria-pressed="true"]',
  );
  //press target button
  selected?.setAttribute("aria-pressed", "false");
  if (e.target?.hasAttribute("color-scheme")) {
    e.target?.setAttribute("aria-pressed", "true");
    //set :root theme
    setTheme(e.target?.getAttribute("color-scheme") ?? defaultTheme);
  }
};

export default function Theme({ theme }: ThemeProps) {
  if (undefined === theme) {
    theme = getTheme();
  }

  return (
    <>
      <h1>Innstillinger</h1>
      <label>
        Velg fargetema
        <form
          onClick={handleThemeClick}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          <button
            color-scheme="dark"
            aria-pressed={theme === "dark"}
            style={{
              background: "var(--surface1)",
              color: "var(--text1)",
              minHeight: "2rem",
              minWidth: "3rem",
            }}
          >
            mørk
          </button>

          <button
            color-scheme="dim"
            aria-pressed={theme === "dim"}
            style={{
              background: "var(--surface1)",
              minHeight: "2rem",
              minWidth: "3rem",
            }}
          >
            grå
          </button>
          <button
            color-scheme="blue"
            aria-pressed={theme === "blue"}
            style={{
              background: "var(--surface1)",
              color: "var(--text1)",
              minHeight: "2rem",
              minWidth: "3rem",
            }}
          >
            blå
          </button>
          <button
            color-scheme="light"
            aria-pressed={theme === "light"}
            style={{
              background: "var(--surface1)",
              minHeight: "2rem",
              minWidth: "3rem",
            }}
          >
            lys
          </button>
        </form>
      </label>
    </>
  );
}
