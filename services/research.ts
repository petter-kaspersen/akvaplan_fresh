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
    { details, detaljer, en, no, topic, tema, ...s },
  ) => ({
    ...s,
    lang,
    name: lang === "en" ? en : no,
    href: routes(lang).get("research") +
      `/${(lang === "en"
        ? `topic/${encodeURIComponent(topic)}`
        : `tema/${encodeURIComponent(tema)}`)}`,
    desc: lang === "en" ? details : detaljer,
  }));

export const getResearchTopicSearchwords = (topic: string) => {
};
