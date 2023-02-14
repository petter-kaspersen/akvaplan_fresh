import DoiSearch, { DoiSearchResultsProps } from "../islands/doi_search.tsx";
import PubsHistogram  from "../islands/pubs_histogram.tsx";
import { SlimPublication } from "../@interfaces/slim_publication.ts";

import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<DoiSearchResultsProps> = {
  async GET(request: Request, context: HandlerContext) {
    const { searchParams } = new URL(request.url);
    const _q = searchParams.get("q") ?? "";
    const q = _q.toLocaleLowerCase();
    const url = `https://dois.deno.dev/doi?limit=-1&sort=-published`;

    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      const results: SlimPublication[] = json.data;
      return context.render({ results, q });
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
  const { results, q } = data;
  return (
    <>
      <Head>
        <title>Pubs – Akvaplan-niva</title>

      </Head>
      <DoiSearch q={q} results={results} />
    </>
  );
}
