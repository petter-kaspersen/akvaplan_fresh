import { computed, signal } from "@preact/signals";

import _en from "./trans/en.json" assert { type: "json" };
import _no from "./trans/no.json" assert { type: "json" };

const en = new Map<string, string>(Object.entries(_en));
const no = new Map<string, string>(Object.entries(_no));
const tr = new Map([["en", en], ["no", no]]);

const getRoot = () => globalThis?.document?.documentElement;

export const defaultLang = "no";

export const fallbackLang = () =>
  globalThis?.navigator
    ? hasNordicOrSami(navigator.languages) ? "no" : "en"
    : defaultLang;

export const languages = new Set(tr.keys());

export const getLang = ({ el, storage } = {}): string => {
  el = el ?? globalThis?.document?.documentElement;
  storage = storage ?? localStorage;
  if (globalThis?.document?.documentElement.hasAttribute("lang")) {
    return document.documentElement.getAttribute("lang") ?? defaultLang;
  }
  if (globalThis.localStorage) {
    return localStorage.getItem("lang") ?? defaultLang;
  }
  return defaultLang;
};
export const lang = signal<string>(getLang());

const storeLang = (
  name: string,
  storage: Storage | undefined = undefined,
) => {
  if (languages.has(name)) {
    storage = storage ?? localStorage;
    if (storage.getItem("lang") !== name) {
      storage.setItem("lang", name);
    }
  }
};

// Dictionary is computed from lang signal
const dict = computed(() => tr.get(lang.value));

export const setLang = (
  name: string,
  el: HTMLElement | undefined = undefined,
) => {
  if (languages.has(name)) {
    // update signal
    lang.value = name;

    // persist (if el===root)
    if (undefined === el || el === getRoot()) {
      storeLang(name);
    }
    // set lang attribute
    el = el ?? getRoot();
    if (el.getAttribute("lang") !== name) {
      el.setAttribute("lang", name);
    }
    console.log(el);
  }
};

export const t = (
  key: string,
) => signal<string>(dict?.value?.get(key) ?? key);

export const hasNordicOrSami = (languages: readonly string[] | Set<string>) => {
  const scandinavian = new Set([
    "no",
    "nn",
    "nb",
    "se",
    "smi",
    "da",
    "is",
    "fo",
    "sv",
  ]);
  return new Set([...languages].map((l) => scandinavian.has(l.substring(0, 3))))
    .has(
      true,
    );
};

export const buildInitLang = () =>
  `(() => {
    const languages = new Set(${JSON.stringify([...languages])});
    const hasNordicOrSami = ${String(hasNordicOrSami)};
    const fallbackLang = ${String(fallbackLang)};
    const getRoot = ${String(getRoot)};
    const setLang = ${String(setLang)};
    const storeLang = ${String(storeLang)};
    const lang = localStorage.getItem("lang") ?? fallbackLang();
    setLang(lang);
  })();
`;
