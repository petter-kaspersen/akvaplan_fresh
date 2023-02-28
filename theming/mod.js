import { signal } from "@preact/signals";
export const defaultTheme = "blue";
export const themes = new Set(["dark", "dim", "blue", "light"]);

const getRoot = () => globalThis?.document?.documentElement;
export const getColorScheme = (el = undefined) => {
  el = el ?? getRoot();
  if (el?.getAttribute) {
    return el.getAttribute("color-scheme");
  }
  return defaultTheme;
};
export const theme = signal(getColorScheme());

const store = (name, storage = undefined) => {
  if (themes.has(name)) {
    storage = storage ?? localStorage;
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
      store(name);
    }
    // Set attribute
    el = el ?? getRoot();
    if (el?.getAttribute && el.getAttribute("color-scheme") !== name) {
      el.setAttribute("color-scheme", name);
    }
  }
};

export const remove = (
  { selector = "[color-scheme]", storage = undefined } = {},
) => {
  for (const el of document.querySelectorAll(selector)) {
    el.removeAttribute("color-scheme");
  }
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
    ({ matches }) => matches && set("light", el),
  );
};

export const buildInitTheming = () =>
  `(() => {
    const themes = new Set(${JSON.stringify([...themes])});
    const defaultTheme = "${defaultTheme}";
    const store = ${String(store)};
    const getRoot = ${String(getRoot)};
    const setColorScheme = ${String(setColorScheme)};
    const addColorSchemeChangeHandlers = ${
    String(addColorSchemeChangeHandlers)
  };
    const theme = localStorage.getItem("theme") ?? defaultTheme;
    if (theme !== "${defaultTheme}") {
      setColorScheme(theme);
    }
    addColorSchemeChangeHandlers();
  })();
`;
