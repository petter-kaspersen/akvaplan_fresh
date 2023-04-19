//import { buildMobileNav } from "akvaplan_fresh/services/nav.ts";
import { homeAlbums } from "akvaplan_fresh/services/mediebank.ts";
import { searchServices } from "akvaplan_fresh/services/svc.ts";
import { searchResearch } from "akvaplan_fresh/services/research.ts";
import { latestNews } from "akvaplan_fresh/services/news.ts";
import {
  pubURL,
  researchTopicURL,
  routes,
} from "akvaplan_fresh/services/nav.ts";
import { getLangFromURL, lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  AlbumHeader,
  ArticleSquare,
  HScroll,
  MoreNews,
  NewsFilmStrip,
  Page,
  ResearchTopic,
  ServiceGroup,
} from "akvaplan_fresh/components/mod.ts";

import { Handlers, RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import HScrollWithDynamicImage from "../islands/HScrollWithDynamicImage.tsx";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)",
};

const level0 = ({ level }) => level === 0;

export const handler: Handlers = {
  async GET(req, ctx) {
    const sitelang = getLangFromURL(req.url);
    lang.value = sitelang;

    const limit = 64;
    const q = "";

    const _services = await searchServices({ q, lang: sitelang, limit });
    const services = _services.filter(level0);

    const news = await latestNews({ q, lang: sitelang, limit });

    const _topics = await searchResearch({ q, lang: sitelang, limit });
    const topics = _topics.filter(level0);

    const numNews = 6;
    const articles = news
      .filter(
        ({ type, hreflang, title }) =>
          ["news"].includes(type) &&
          hreflang === sitelang &&
          !/stillingsannonse/i.test(title)
      )
      .slice(0, numNews);
    const articlesNotInSiteLang = news
      .filter(
        ({ type, hreflang, title }) =>
          ["news"].includes(type) &&
          hreflang !== sitelang &&
          !/stillingsannonse/i.test(title)
      )
      .slice(0, numNews);

    const pr = news
      .filter(({ type }) => ["pressrelease"].includes(type))
      .slice(0, numNews);
    return ctx.render({
      news,
      services,
      topics,
      lang,
      articles,
      articlesNotInSiteLang,
      pr,
    });
  },
};

const ellipsis = {
  maxLines: "1",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

export default function Home({
  data: { news, topics, lang, services, articles, articlesNotInSiteLang, pr },
}) {
  return (
    <Page>
      <Head>
        <link rel="stylesheet" href="/css/hscroll.css" />
        <link rel="stylesheet" href="/css/mini-news.css" />
        <link rel="stylesheet" href="/css/article.css" />
        <link rel="stylesheet" href="/css/hscroll-dynamic.css" />
        <script src="/@nrk/core-scroll.min.js" />
      </Head>

      <NewsFilmStrip news={news} lang={lang.value} BeforeAfter={MoreNews} />

      <HScrollWithDynamicImage scrollerId="" images={articles} />

      <AlbumHeader
        text={t(`home.album.${lang}.articles`)}
        href={routes(lang).get("news")}
      />
      <HScroll>{articles.map(ArticleSquare)}</HScroll>

      <AlbumHeader
        text={t("home.album.articles_not_in_site_lang")}
        href={routes(lang).get("news")}
      />
      <HScroll>{articlesNotInSiteLang.map(ArticleSquare)}</HScroll>

      <AlbumHeader
        text={t("home.album.press_releases")}
        href={routes(lang).get("news")}
      />
      <HScroll>{pr.map(ArticleSquare)}</HScroll>

      <AlbumHeader
        text={t("home.album.services")}
        href={routes(lang).get("services")}
      />
      <HScroll>{services.map(ServiceGroup)}</HScroll>

      <AlbumHeader
        text={t("home.album.research")}
        href={routes(lang).get("research")}
      />
      <HScroll>{topics.map(ResearchTopic)}</HScroll>

      {/* <AlbumHeader
        text={t("home.album.projects")}
        href={routes(lang).get("projects")}
      />
      <HScroll>
        @todo (v1.1?)
      </HScroll> */}

      {/* Research facilities (Fisk Loise) Sensor platforms */}
    </Page>
  );
}
