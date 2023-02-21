// In order to force theming this script must not be loaded as a module

const themes = ["dark", "dim", "blue", "light"];
const defaultTheme = "blue";
const storage = localStorage;

const getTheme = (el) => {
  el = el ?? globalThis?.document?.documentElement;
  if (el?.hasAttribute("color-scheme")) {
    return el.getAttribute("color-scheme");
  }
  const storageTheme = storage.getItem("theme");
  if (themes.includes(storageTheme)) {
    return storageTheme;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (prefersDark) ? "dark" : defaultTheme;
};

const setTheme = (theme, el) => {
  if (themes.includes(theme)) {
    el = el ?? globalThis?.document?.documentElement;
    el.setAttribute("color-scheme", theme);
    if (theme === defaultTheme) {
      storage.removeItem("theme");
    } else {
      storage.setItem("theme", theme);
    }
  }
};

const addColorSchemeChangeListeners = (window) => {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    ({ matches }) => matches && setTheme("dark"),
  );
  window.matchMedia("(prefers-color-scheme: light)").addEventListener(
    "change",
    ({ matches }) => matches && setTheme("light"),
  );
};

function initTheming(el) {
  const theme = getTheme();
  if (el.getAttribute("color-scheme") !== theme) {
    setTheme(theme, el);
  }
}

if (globalThis.document) {
  //Waiting for DOM to load is too late for color-scheme
  // if (document.readyState === "loading") {
  //   document.addEventListener("DOMContentLoaded", initPrefersListeners);
  // } else {
  //   initPrefersListeners();
  // }
  initTheming(document.documentElement);
  addColorSchemeChangeListeners(globalThis);
}
