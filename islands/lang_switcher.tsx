import { JSX } from "preact";
export type LangSwitcherProps = JSX.HTMLAttributes<HTMLBaseElement>;

const defaultTheme = "blue";

export const getLang = (
  el = globalThis?.document?.documentElement,
): string => {
  if (el?.hasAttribute("lang")) {
    return el.getAttribute("lang") ?? defaultTheme;
  }
  return localStorage.getItem("theme") ?? defaultTheme;
};

// export const setTheme = (
//   theme: string,
//   el = globalThis?.document?.documentElement,
// ) => {
//   el.setAttribute("color-scheme", theme);
//   if (theme === defaultTheme) {
//     localStorage.removeItem("theme");
//   } else {
//     localStorage.setItem("theme", theme);
//   }
// };

const handleLangClick = (e: Event & { target: Element }) => {
  e.preventDefault();
};

export default function LangSwitcher({ lang }: LangSwitcherProps) {
  if (undefined === lang) {
    lang = getLang();
  }

  return (
    <>
      <label>
        Velg menyspråk
      </label>
      <form
        onClick={handleLangClick}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <button aria-pressed={lang === "en"}>
          English
        </button>
        <button aria-pressed={lang === "nb"}>
          Norsk bokmål
        </button>
      </form>
    </>
  );
}
