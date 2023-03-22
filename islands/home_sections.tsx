import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

const En = new Map([
  ["/settings", "/en/settings"],
  ["/pubs", "/en/pubs"],
]);
const No = new Map([
  ["/settings", "/no/innstillinger"],
  ["/pubs", "/no/pubs"],
]);

const path = (lang: string) => lang === "en" || lang?.value === "en" ? En : No;

export const buildSections = () => [
  { href: path(lang).get("/pubs"), text: t("Publications") },
  {
    href: "/article/search",
    text: t("News"),
  },
  { "href": path(lang).get("/settings"), text: t("Settings") },
];

export default function HomeSections() {
  const sections = buildSections();

  return (
    <nav>
      <ul>
        {sections.map(({ href, text }) => (
          <li>
            <a href={href}>
              {text} [{lang}]
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
