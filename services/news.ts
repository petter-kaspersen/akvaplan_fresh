import { searchNews } from "./mynewsdesk.ts";
import { newsFromMynewsdesk } from "./news_mynewsdesk.ts";
import { newsFromPubs } from "./news_pubs.ts";
import { search as searchPubs } from "./dois.ts";
import { News, Search } from "akvaplan_fresh/@interfaces/mod.ts";

export const latestNews = async ({ q = "", lang, limit }: Search): News => {
  const { items } = await searchNews({ q, limit });
  const articles = [...items].map(newsFromMynewsdesk(lang));

  const { data } = await searchPubs(new URLSearchParams({ q, limit }));
  const pubs = data.map(newsFromPubs({ q, lang }));
  return [...articles, ...pubs].sort((a, b) =>
    b.published.localeCompare(a.published)
  ).slice(0, limit);
};
