import {
  lang as langSignal,
  removeLang,
  setLang,
} from "akvaplan_fresh/text/mod.ts";
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function LangSwitcher(
  props: JSX.HTMLAttributes<HTMLDivElement>,
) {
  const handleLangClick = (e: Event) => {
    const { ownerDocument: { documentElement }, dataset: { lang } } = e.target;
    if (lang) {
      setLang(lang, documentElement);
    } else {
      removeLang(lang, documentElement);
    }
  };
  const lang = langSignal.value;
  console.warn(lang.value);
  return (
    <div
      onClick={handleLangClick}
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
    >
      <button
        data-lang="en"
        aria-pressed={lang === "en"}
        disabled={!IS_BROWSER || props.disabled}
      >
        EN
      </button>
      <button
        data-lang="no"
        aria-pressed={["no", "nb", "nn", ""].includes(lang)}
        disabled={!IS_BROWSER || props.disabled}
      >
        NO
      </button>
    </div>
  );
}
