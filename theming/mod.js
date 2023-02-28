import { signal } from "@preact/signals";
export const defaultTheme = "blue";
export const themes = new Set(["dark", "dim", "blue", "light"]);
const getRoot = () => globalThis?.document?.documentElement;
const getStorage = () => globalThis?.localStorage;

export const getColorScheme = (el = undefined) => {
  el = el ?? getRoot();
  if (el?.getAttribute) {
    return el.getAttribute("color-scheme");
  }
  return defaultTheme;
};
export const theme = signal(getColorScheme());

const storeColorScheme = (name, storage = getStorage()) => {
  if (themes.has(name)) {
    if (storage?.getItem && storage?.getItem("theme") !== name) {
      storage.setItem("theme", name);
    }
  }
};

export const setColorScheme = (
  name,
  el = undefined,
) => {
  if (themes.has(name)) {
    // Update signal
    theme.value = name;

    // Persist to localStorage if set on root html
    if (undefined === el || el === getRoot()) {
      storeColorScheme(name);
    }
    // Set attribute
    el = el ?? getRoot();
    if (el?.getAttribute && el.getAttribute("color-scheme") !== name) {
      el.setAttribute("color-scheme", name);
    }
  }
};

export const removeColorScheme = (el = getRoot()) => {
  // const selector = "[color-scheme]";
  // for (const el of document.querySelectorAll(selector)) {
  //   el.removeAttribute("color-scheme");
  // }
  if (el?.hasAttribute("color-scheme")) {
    el.removeAttribute("color-scheme");
  }
  const storage = getStorage();
  if (storage?.removeItem) {
    storage.removeItem("theme");
  }
};

export const addColorSchemeChangeHandlers = () => {
  const el = getRoot();
  matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    ({ matches }) => matches && setColorScheme("dark", el),
  );
  matchMedia("(prefers-color-scheme: light)").addEventListener(
    "change",
    ({ matches }) => matches && setColorScheme("light", el),
  );
};

export const buildInitTheming = () =>
  `(() => {
    const themes = new Set(${JSON.stringify([...themes])});
    const defaultTheme = "${defaultTheme}";
    const storeColorScheme = ${String(storeColorScheme)};
    const getRoot = ${String(getRoot)};
    const getStorage = ${String(getStorage)};
    const setColorScheme = ${String(setColorScheme)};
    const addColorSchemeChangeHandlers = ${
    String(addColorSchemeChangeHandlers)
  };
    const theme = getStorage().getItem("theme") ?? defaultTheme;
    if (theme !== "${defaultTheme}") {
      setColorScheme(theme);
    }
    addColorSchemeChangeHandlers();
  })();
`;
