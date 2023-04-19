//import { buildMobileNav } from "akvaplan_fresh/services/nav.ts";
import { homeAlbums } from "akvaplan_fresh/services/mediebank.ts";
import { latestNews } from "akvaplan_fresh/services/news.ts";
import { getLangFromURL, lang, t } from "akvaplan_fresh/text/mod.ts";

import { HAlbum, NewsFilmStrip, Page } from "akvaplan_fresh/components/mod.ts";

import { Handlers, RouteConfig } from "$fresh/server.ts";
import HScrollWithDynamicImage from "../islands/HScrollWithDynamicImage.tsx";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)",
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const sitelang = getLangFromURL(req.url);
    lang.value = sitelang;
    const albums = await homeAlbums();
    const news = await latestNews({ q: "", lang: sitelang, limit: 128 });

    const title = t("Home");
    //const nav = buildMobileNav(lang);
    return ctx.render({ news, albums, lang, title });
  },
};

export default function Home({ data: { news, albums, lang, title } }) {
  return (
    <Page>
      <link rel="stylesheet" href="/css/hscroll.css" />
      <link rel="stylesheet" href="/css/mini-news.css" />
      <script src="https://static.nrk.no/core-components/major/10/core-scroll/core-scroll.min.js" />
      <NewsFilmStrip news={news} lang={lang.value} />

      <HScrollWithDynamicImage scrollerId="" images={albums[0]} />

      {albums.map((album, i) => (
        <>
          <h3>{t(`home.Album.${i}`)}</h3>
          <HAlbum album={album} customClass={`album_${i}`} lang={lang.value} />
        </>
      ))}
    </Page>
  );
}
