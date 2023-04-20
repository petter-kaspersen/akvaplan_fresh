import { defaultThumbnail, href } from "./mynewsdesk.ts";

import {
  News,
  NewsMapper,
  SlimPublication,
} from "akvaplan_fresh/@interfaces/mod.ts";

export const newsFromPubs = ({ lang }: NewsMapper) =>
({
  title,
  doi,
  published,
  type,
}: SlimPublication): News => ({
  title: `${title}`,
  published,
  href: `/${lang}/doi/${doi}`,
  hreflang: "en",
  thumb: defaultThumbnail,
  type,
});
