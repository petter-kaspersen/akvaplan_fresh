import { routes } from "./nav.ts";
import { shuffle } from "akvaplan_fresh/grouping/mod.ts";

const research =
  (await fetch("https://research.deno.dev/").catch(() => {}).then((
    r,
  ) => r.json())) ?? [];

const fetchResearch = async (
  { order = "random", sort, filter = () => true } = {},
) => {
  const r = await fetch("https://research.deno.dev/?v=2023-04-26").catch(
    () => {},
  );
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

export const searchResearch = async ({ q, lang, sort, filter } = {}) => {
  const research = await fetchResearch({ sort, filter });
  if (research?.map) {
    return research.map((
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
  }
};
export const getResearchLevel0 = (lang: string) => {
  //const svc = lang === "en" ? en0 : no0;
  return shuffle(svc);
};
