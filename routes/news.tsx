import { searchNews } from "akvaplan_fresh/services/news.ts";
import { href } from "akvaplan_fresh/services/mynewsdesk.ts";

import { ArticleSquare, HScroll, Page } from "akvaplan_fresh/components/mod.ts";

import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { isodate } from "akvaplan_fresh/time/mod.ts";
import { groupIntoMap } from "akvaplan_fresh/grouping/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/:page(news|nyheter)",
};
import { Head } from "$fresh/runtime.ts";
import { MynewsdeskItem } from "../@interfaces/mynewsdesk.ts";

type Props = {};

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    lang.value = params.lang;
    const base = `/${params.lang}/${params.page}/`;
    const title = t("news.News");

    const { searchParams } = new URL(req.url);
    const _q = searchParams.get("q") ?? "";
    const q = _q.toLocaleLowerCase();

    const _news = await searchNews({ q, lang: lang.value, limit: 512 }) ??
      { items: [] };

    const news = groupIntoMap(
      _news,
      ({ published }) => published.substring(0, 4),
    );
    // group by
    // latest news articles (by month)?
    // project (containing the word project)
    // pressreleases
    // pubs
    // people?
    return ctx.render({ title, base, news, lang });
  },
};

export default function News(
  { data: { lang, base, title, news } }: PageProps,
) {
  return (
    <Page title={title} base={base}>
      <h1>
        <a href="." style={{ color: "var(--text2)" }}>{title} [{lang}]</a>
      </h1>

      {[...news].map(([grpkey, grpmembers]) => (
        <section>
          <h2>
            <a href={`${"year"}/${grpkey.toLowerCase()}`}>
              {grpkey}
            </a>
          </h2>

          <HScroll scrollerId="news-scroll">
            {grpmembers.slice(0, 7).map(ArticleSquare)}
          </HScroll>
        </section>
      ))}

      <link rel="stylesheet" href="/css/hscroll.css" />
      <link rel="stylesheet" href="/css/akvaplanist.css" />
      <script src="/@nrk/core-scroll.min.js" />
    </Page>
  );
}
