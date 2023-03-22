import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

const En = new Map([
  ["news", "/en/news"],
  ["settings", "/en/settings"],
  ["pubs", "/en/pubs"],
  ["akvaplanists", "/en/employees"],
]);
const No = new Map([
  ["news", "/no/nyheter"],
  ["settings", "/no/innstillinger"],
  ["pubs", "/no/pubs"],
  ["akvaplanists", "/no/ansatte"],
]);

const _tr = (lang: string) => lang === "en" || lang?.value === "en" ? En : No;

export const buildSections = () => [
  { href: _tr(lang).get("news"), text: t("News") },
  { href: _tr(lang).get("pubs"), text: t("Publications") },
  { href: _tr(lang).get("akvaplanists"), text: t("Employees") },
  { href: _tr(lang).get("settings"), text: t("Settings") },
];

export default function HomeSections() {
  const sections = buildSections();

  return (
    <nav>
      <ul style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        {sections.map(({ href, text }) => (
          <li>
            <a class="target" href={href}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
