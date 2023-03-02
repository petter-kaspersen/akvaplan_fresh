import { href, searchURL } from "akvaplan_fresh/services/mynewsdesk.ts";
import { Page } from "akvaplan_fresh/components/page.tsx";

import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<DoiSearchResultsProps> = {
  async GET(request: Request, context: HandlerContext) {
    const { searchParams } = new URL(request.url);
    const _q = searchParams.get("q") ?? ""; //String(new Date().getFullYear());
    const q = _q.toLocaleLowerCase();
    const url = searchURL(q, "news", { limit: 100 });
    const response = await fetch(url);

    if (response.ok) {
      const { search_result } = await response.json();
      return context.render(search_result);
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

export default function ApnPubs(
  { data: { items } }: PageProps<DoiSearchResultsProps>,
) {
  return (
    <Page title="Artikler">
      <ul>
        {items.map(resultItem)}
      </ul>
    </Page>
  );
}

const resultItem = ({ url, type_of_media, header }) => (
  <li>
    <a href={href({ url, type_of_media })}>{header}</a>
  </li>
);
