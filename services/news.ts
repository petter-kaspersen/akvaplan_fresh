import { mynewsdeskToNews, searchNews } from "./mynewsdesk.ts";
import { search as searchPubs } from "./dois.ts";

export interface News {
  title: string;
  lang?: string;
  href: string;
  img: string;
  thumb: string;
}

// @todo Create a Deno service to return latest news (of any kind)
export const latestNews = async ({ lang }) => {
  const { items } = await searchNews({ q: "", limit: 8 });

  // import _home0 from "https://dois.deno.dev/doi?limit=10&format=json
  // " assert {
  //   type: "json",
  // };
  const latestPubs = await searchPubs();

  return [...items.map(mynewsdeskToNews({ lang }))];
};
