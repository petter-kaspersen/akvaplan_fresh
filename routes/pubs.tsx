import DoiSearch, {
  DoiSearchResultsProps,
} from "akvaplan_fresh/islands/doi_search.tsx";

import {
  getLangFromURL,
  lang as langSignal,
  t,
} from "akvaplan_fresh/text/mod.ts";

import { buildContainsFilter } from "akvaplan_fresh/search/filter.ts";

import { Page } from "akvaplan_fresh/components/page.tsx";

import { SlimPublication } from "akvaplan_fresh/@interfaces/slim_publication.ts";

import {
  HandlerContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/(pubs|publikasjoner)",
};

export const handler: Handlers<DoiSearchResultsProps> = {
  async GET(request: Request, context: HandlerContext) {
    const lang = getLangFromURL(request.url);
    langSignal.value = lang;

    const { searchParams } = new URL(request.url);
    const _q = searchParams.get("q") ?? "";
    const q = _q.toLocaleLowerCase();

    const title = t("nav.Pubs");

    // We need to load all pubs (via limit=-1) for the in-memory search
    const url = `https://dois.deno.dev/doi?limit=-1&sort=-published`;

    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      const all: SlimPublication[] = json.data;
      const results: SlimPublication[] = all.filter(buildContainsFilter(q));
      return context.render({ all, title, results, q, lang });
    }
  },
};

export default function ApnPubs({ data }: PageProps<DoiSearchResultsProps>) {
  const { all, results, title, q } = data;
  return (
    <Page title="Pubs">
      <h1>{title}</h1>
      <DoiSearch q={q} results={results} all={all} />
    </Page>
  );
}
