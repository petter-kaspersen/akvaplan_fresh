import { serviceGroupURL } from "./nav.ts";

import { shuffle } from "akvaplan_fresh/grouping/mod.ts";

import { nytek } from "./topic/nytek.tsx";

//Beware, imports are cached
import services from "https://svc.deno.dev/?x=y2139871298" assert {
  type: "json",
};
type Svc = Record<string, string | Number | string[]>;
export const servicesLevel = (n: Number) =>
  services.filter(({ level }: Svc) => level === n);

const en0 = servicesLevel(0).map((
  { topic, en, no, details, detaljer, ...s }: Svc,
) => ({
  ...s,
  topic,
  name: en ?? no,
  desc: details ?? detaljer,
  lang: "en",
  href: serviceGroupURL({ lang: "en", topic }),
}));

const no0 = servicesLevel(0).map((
  { no, en, tema, details, detaljer, ...s }: Svc,
) => ({
  ...s,
  name: no ?? en,
  desc: detaljer ?? details,
  topic: tema,
  lang: "no",
  href: serviceGroupURL({ lang: "no", topic: tema }),
}));

export const getServicesLevel0 = (lang: string) => {
  const svc = lang === "en" ? en0 : no0;
  return shuffle(svc);
};

const desc = new Map([
  ["nytek", nytek],
]);

export const getServiceDesc = (topic: string, lang: string) =>
  desc?.get(topic)?.get(lang) ?? (() => null);
