import { lang as langSignal, setLang } from "akvaplan_fresh/text/mod.ts";
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function LangSwitcher(
  props: JSX.HTMLAttributes<HTMLDivElement>,
) {
  const handleLangClick = (e: Event) => {
    const { ownerDocument: { documentElement }, dataset: { lang } } = e.target;
    setLang(lang, documentElement);
  };
  const lang = langSignal.value;
  return (
    <div
      onClick={handleLangClick}
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
    >
      <button
        data-lang="en"
        aria-pressed={lang === "en"}
      >
        {"EN"}
      </button>
      <button
        data-lang="no"
        aria-pressed={["no", "nb", "nn", ""].includes(lang)}
        disabled={!IS_BROWSER || props.disabled}
      >
        {"NO"}
      </button>
    </div>
  );
}
