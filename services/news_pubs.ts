import { defaultThumbnail, doiImage } from "./mod.ts";

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
  img: doiImage.get(doi) ?? defaultThumbnail,
  thumb: doiImage.get(doi) ?? defaultThumbnail,
  type,
});
