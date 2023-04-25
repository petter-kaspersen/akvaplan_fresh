//import { buildMobileNav } from "akvaplan_fresh/services/nav.ts";
import { homeAlbums } from "akvaplan_fresh/services/mediebank.ts";
import { getServicesLevel0 } from "akvaplan_fresh/services/svc.ts";
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
} from "akvaplan_fresh/components/mod.ts";

import { Handlers, RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import NewsArticle from "./article/[slug].tsx";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no){/:page(home|hjem)}?",
};

const level0 = ({ level }) => level === 0;

const _section = {
  marginTop: "2rem",
  marginBottom: "3rem",
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const sitelang = getLangFromURL(req.url);
    lang.value = sitelang;

    const limit = 64;
    const q = "";

    const services = await getServicesLevel0(sitelang);

    const news = await latestNews({ q, lang: sitelang, limit });

    const _topics = await searchResearch({ q, lang: sitelang, limit });
    const topics = _topics.filter(level0);

    const maxNumNews = 32;
    const articles = news.filter(({ type, hreflang, title }) =>
      ["news", "pressrelease"].includes(type) && hreflang === sitelang &&
      !/stillingsannonse/i.test(title)
    ).slice(
      0,
      maxNumNews,
    );
    const articlesNotInSiteLang = news.filter(({ type, hreflang, title }) =>
      ["news"].includes(type) &&
      hreflang !== sitelang &&
      !/stillingsannonse/i.test(title)
    ).slice(
      0,
      maxNumNews,
    );

    return ctx.render({
      news,
      services,
      topics,
      lang,
      articles,
      articlesNotInSiteLang,
    });
  },
};
console.log(
  "@todo Home & other routes: use asset() for all references css files",
);
export default function Home(
  {
    data: { news, topics, lang, services, articles, articlesNotInSiteLang },
  },
) {
  const maxVisNews = 5.5;

  return (
    <Page>
      <Head>
        <link rel="stylesheet" href="/css/hscroll.css" />
        <link rel="stylesheet" href="/css/mini-news.css" />
        <link rel="stylesheet" href="/css/article.css" />
        <script src="/@nrk/core-scroll.min.js" />
      </Head>

      <NewsFilmStrip news={news} lang={lang.value} BeforeAfter={MoreNews} />

      <section style={_section}>
        <AlbumHeader
          text={t(`home.album.${lang}.articles`)}
          href={routes(lang).get("news")}
        />
        <HScroll maxVisibleChildren={maxVisNews}>
          {articles.map(ArticleSquare)}
        </HScroll>
      </section>

      <section style={_section}>
        <AlbumHeader
          text={t("home.album.articles_not_in_site_lang")}
          href={routes(lang).get("news")}
        />
        <span style={{ fontSize: "1rem" }}>
          {t(`news.Only_in_alt_lang`)} {t(`lang.alt.${lang}`)}
        </span>
        <HScroll maxVisibleChildren={maxVisNews}>
          {articlesNotInSiteLang.map(ArticleSquare)}
        </HScroll>
      </section>
      {
        /* <section style={_section}>
        <AlbumHeader
          text={t("home.album.press_releases")}
          href={routes(lang).get("news")}
        />
        <HScroll maxVisibleChildren={5}>
          {pr.map(ArticleSquare)}
        </HScroll>
      </section> */
      }
      <section style={_section}>
        <AlbumHeader
          text={t("home.album.services")}
          href={routes(lang).get("services")}
        />
        <HScroll
          maxVisibleChildren={Math.min(services.length, 6.5)}
        >
          {services.map(ArticleSquare)}
        </HScroll>
      </section>
      <section style={_section}>
        <AlbumHeader
          text={t("home.album.research")}
          href={routes(lang).get("research")}
        />
        <HScroll maxVisibleChildren={Math.min(topics.length, 7)}>
          {topics.map(ArticleSquare)}
        </HScroll>
      </section>

      {
        /* <AlbumHeader
        text={t("home.album.projects")}
        href={routes(lang).get("projects")}
      />
        */
      }

      {/* Research facilities (Fisk Loise) Sensor platforms */}
    </Page>
  );
}
