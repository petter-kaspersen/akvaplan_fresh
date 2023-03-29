import { href } from "./mynewsdesk.ts";

import {
  News,
  NewsMapper,
  SlimPublication,
} from "akvaplan_fresh/@interfaces/mod.ts";

export const newsFromPubs = ({ lang }: NewsMapper): News =>
({
  title,
  doi,
  published,
}: SlimPublication): News => ({
  title,
  published,
  href: `/${lang}/doi/${doi}`,
  hreflang: "en",
});
