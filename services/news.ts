import { searchNews } from "./mynewsdesk.ts";
import { newsFromMynewsdesk } from "./news_mynewsdesk.ts";
import { search as searchPubs } from "./dois.ts";
import { News, Search } from "akvaplan_fresh/@interfaces/mod.ts";

export const latestNews = async ({ q = "", lang, limit }: Search) => {
  const { items } = await searchNews({ q, limit });

  //const latestPubs = await searchPubs();
  //console.warn(latestPubs);

  return [...items.map(newsFromMynewsdesk(lang))];
};
