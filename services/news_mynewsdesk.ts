import { href } from "./mynewsdesk.ts";

import {
  MynewsdeskItem,
  News,
  NewsMapper,
} from "akvaplan_fresh/@interfaces/mod.ts";

export const newsFromMynewsdesk = ({ lang }: NewsMapper) =>
(
  {
    language,
    image_caption,
    header,
    published_at,
    image,
    image_thumbnail_small,
  }: MynewsdeskItem,
): News => ({
  title: header,
  published: published_at.datetime,
  href: href({ header, language, published_at }, lang),
  hreflang: language,
  img: image,
  caption: image_caption ?? header,
  thumb: image_thumbnail_small,
});
