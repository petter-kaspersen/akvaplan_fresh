import { lang as langSignal, t } from "akvaplan_fresh/text/mod.ts";
import { SignalLike, StringSignal } from "akvaplan_fresh/@interfaces/signal.ts";
import { computed } from "@preact/signals-core";
export const siteNav: SignalLike<Array> = computed(() =>
  buildNav(langSignal.value)
);

const En = new Map([
  ["about", "/en/about"],
  ["akvaplanists", "/en/people"],
  ["search", "/en/_"],
  ["news", "/en/news"],
  ["service", "/en/services"],
  ["services", "/en/services"],
  ["research", "/en/research"],
  ["settings", "/en/settings"],
  ["pubs", "/en/publications"],
  ["dcat", "/en/dcat"],
  ["documents", "/en/documents"],
  ["invoicing", "/no/faktura"],
  ["people", "/en/people"],
]);
const No = new Map([
  ["about", "/no/om"],
  ["dcat", "/no/dcat"],
  ["news", "/no/nyheter"],
  ["research", "/no/forskning"],
  ["service", "/no/tjenester"],
  ["services", "/no/tjenester"],
  ["settings", "/no/innstillinger"],
  ["search", "/no/_"],
  ["pubs", "/no/publikasjoner"],
  ["invoicing", "/no/faktura"],
  ["documents", "/no/dokumenter"],
  ["akvaplanists", "/no/folk"],
  ["people", "/no/folk"],
]);

export const routes = (lang: string | StringSignal) =>
  lang === "en" || lang?.value === "en" ? En : No;

const _tr = routes;

routes;
export const buildNav = (lang: string | StringSignal) => [
  { href: _tr(lang).get("news"), text: t("nav.News") },
  { href: _tr(lang).get("services"), text: t("nav.Services") },
  { href: _tr(lang).get("research"), text: t("nav.Research") },
  { href: _tr(lang).get("pubs"), text: t("nav.Publications") },
  //{ href: _tr(lang).get("dcat"), text: t("Datasets") },

  //{ href: _tr(lang).get("documents"), text: t("Documents") },
  { href: _tr(lang).get("akvaplanists"), text: t("nav.People") },
  { href: _tr(lang).get("about"), text: t("nav.About") },
  //{ href: _tr(lang).get("settings"), text: t("Settings") },
];

export const buildMobileNav = (lang: string | StringSignal) =>
  buildNav(lang).slice(1, 3);

// export const newsURL = ({ slug, isodate, lang }) =>
//   id
//     ? `${routes(lang).get("akvaplanists")}/id/${id}/${family}/${given}`
//     : `${routes(lang).get("akvaplanists")}/name/${family}/${given}`;
export const peopleURL = ({ lang }) => `${routes(lang).get("akvaplanists")}`;

export const personURL = ({ id, given, family, email, lang }) =>
  id
    ? `${routes(lang).get("akvaplanists")}/id/${id}/${family}/${given}`
    : `${routes(lang).get("akvaplanists")}/name/${family}/${given}`;

export const researchTopicURL = ({ topic, lang }) =>
  `${routes(lang).get("research")}/${
    lang === "en" || lang?.value == "en" ? "topic" : "tema"
  }/${topic}`;

export const serviceGroupURL = ({ topic, lang }) =>
  `${routes(lang).get("services")}/${
    lang === "en" || lang?.value == "en" ? "topic" : "tema"
  }/${topic}`;

export const pubURL = ({ doi, lang }) => `${routes(lang).get("pubs")}/${doi}`;
