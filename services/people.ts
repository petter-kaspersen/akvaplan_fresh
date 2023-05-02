import {
  multiSearchMynewsdesk,
  newsFromMynewsdesk,
  newsFromPubs,
  search as searchPubs,
} from "akvaplan_fresh/services/mod.ts";

import { buildContainsFilter } from "akvaplan_fresh/search/filter.ts";
import { groupIntoMap } from "akvaplan_fresh/grouping/mod.ts";

export const newsOnPerson = async (
  { person, lang, limit, mapper = newsFromMynewsdesk({ lang }) },
) => {
  const containsFamily = buildContainsFilter(person.family);
  const containsGiven = buildContainsFilter(person.given);

  const _news = await multiSearchMynewsdesk(
    [person.family, person.given],
    ["news", "pressrelease"],
    { limit },
  ) ?? [];

  const _filteredNews = _news.filter((mnd) =>
    containsFamily(mnd) && containsGiven(mnd)
  );

  return _filteredNews.map(mapper);
};

export const pubsFromPerson = async (
  { person, lang, limit, mapper = newsFromPubs({ lang }) },
) => {
  const { data } = await searchPubs({ q: person.family, limit: -1 });
  return data.map(mapper);
};

export const pubsFromPersonGroupedByYear = async (
  { person, lang, limit },
) =>
  groupIntoMap(
    await pubsFromPerson({ person, lang, limit }),
    ({ published }) => published?.substring(0, 4),
  );
