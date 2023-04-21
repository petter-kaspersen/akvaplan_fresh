import DoiSearch, { DoiSearchResultsProps } from "../islands/doi_search.tsx";
import { SlimPublication } from "../@interfaces/slim_publication.ts";
import { Page } from "../components/page.tsx";

import { normalize } from "akvaplan_fresh/text/mod.ts";

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

const queryFilter = (
  q,
) => ((p: unknown) => normalize(JSON.stringify(p)).includes(normalize(q)));

export const handler: Handlers<DoiSearchResultsProps> = {
  async GET(request: Request, context: HandlerContext) {
    const { searchParams } = new URL(request.url);
    const _q = searchParams.get("q") ?? "";
    const q = _q.toLocaleLowerCase();
    // FIXME Ouch the service does not support queries, so we load all (via limit -1)
    const url = `https://dois.deno.dev/doi?limit=-1&sort=-published&q=${q}`;

    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      const all: SlimPublication[] = json.data;
      const results: SlimPublication[] = all.filter(queryFilter(q));
      return context.render({ all, results, q });
    }
  },
};

// const author_etal = (authors) => {
//   if (authors?.length < 1) {
//     return "_";
//   }
//   const first = authors.find(({first})=>first);
//   return first ? first.family : JSON.stringify(authors);
// }

export default function ApnPubs({ data }: PageProps<DoiSearchResultsProps>) {
  const { all, results, q } = data;
  return (
    <Page title="Pubs">
      <DoiSearch q={q} results={results} all={all} />
    </Page>
  );
}
