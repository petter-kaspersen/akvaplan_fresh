import { lang as langSignal, t } from "akvaplan_fresh/text/mod.ts";

const small = {
  fontSize: "var(--font-size-0)",
};
export const SiteLangLinks = (
  { lang = langSignal.value, style = small, ...props } = {},
) => (
  <span
    class="hide-small"
    style={style}
    {...props}
  >
    <span>{t(`lang.Native.${lang}`)}</span>{" "}
    {lang === "en" && (
      <a lang="no" href="/no">
        Bytt til {t(`lang.native.no`)}
      </a>
    )} {lang === "no" && (
      <a lang="en" href="/en">
        Switch to {t(`lang.Native.en`)}
      </a>
    )}
  </span>
);
