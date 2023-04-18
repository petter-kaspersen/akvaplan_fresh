import { routes } from "./nav.ts";

//https://www.30secondsofcode.org/js/s/shuffle/
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const level0 = ({ level }) => {
  return level !== "" && (level === "0" || Number(level) === 0);
};

const fetchSvc = async ({ order = "random", sort, filter = level0 } = {}) => {
  const r = await fetch("https://svc.deno.dev");
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

export const searchServices = async ({ q, lang, sort, filter } = {}) =>
  (await fetchSvc({ sort, filter })).map(({ details, detaljer, ...s }) => ({
    name: s[lang],
    href: routes(lang).get("services") + `?q=${encodeURIComponent(s[lang])}`,
    desc: lang === "en" ? details : detaljer,
    ...s,
  }));
