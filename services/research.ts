import { routes } from "./nav.ts";
import { shuffle } from "akvaplan_fresh/grouping/mod.ts";

const _all = () => true;

const fetchResearch = async (
  { order = "random", sort, filter = _all } = {},
) => {
  const r = await fetch("https://research.deno.dev");
  if (r.ok) {
    const arr = (await r.json()).filter(filter);

    if ("random" === order) {
      return shuffle(arr);
    }
    if (sort) {
      return arr.sort(sort);
    }
    return arr;
  }
};

export const searchResearch = async ({ q, lang, sort, filter } = {}) =>
  (await fetchResearch({ sort, filter })).map((
    { details, detaljer, ...s },
  ) => ({
    name: s[lang],
    href: routes(lang).get("services") + `?q=${encodeURIComponent(s[lang])}`,
    desc: lang === "en" ? details : detaljer,
    ...s,
  }));
