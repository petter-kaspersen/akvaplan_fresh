import {
  newsFromMynewsdesk,
  searchMynewsdesk,
  searchServices,
} from "akvaplan_fresh/services/mod.ts";

import {
  AlbumHeader,
  ArticleSquare,
  HScroll,
  Page,
} from "akvaplan_fresh/components/mod.ts";

import { researchTopicURL, routes } from "akvaplan_fresh/services/nav.ts";

import { groupIntoMap } from "akvaplan_fresh/grouping/mod.ts";

import { lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
export const config: RouteConfig = {
  routeOverride:
    "/:lang(en|no){/:page(services|tjenester|research|forskning)}?/:groupname(topic|topics|tema){/:topic}?",
};

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    const { searchParams } = new URL(req.url);

    lang.value = params.lang;

    const { topic } = params;
    const title = t(`service.topic.${topic}`);

    const q = topic;
    const base = `/${params.lang}/${params.page}/${params.groupname}`;

    const { items } = await searchMynewsdesk({
      q,
      lang: params.lang,
      limit: 128,
    });
    const news = items.map(newsFromMynewsdesk(params.lang));
    const fx = news.length > 3
      ? ({ published }) => published.substring(0, 4)
      : () => t(`topic.${topic}`);

    const newsGrouped = groupIntoMap(
      news,
      fx,
    );

    const services = await searchServices({
      q,
      lang: params.lang,
      filter: ({ keywords }) => keywords?.includes(topic),
    });

    return ctx.render({
      lang,
      title,
      base,
      services,
      news: newsGrouped,
      topic,
      page: params.page,
      keywords: [topic],
    });
  },
};

export default function TopicsOrTopic(
  { data: { lang, title, base, services, news, topic, keywords, page } }:
    PageProps<
      unknown
    >,
) {
  const width = 512;
  const height = 512;
  return (
    <Page title={title} base={base}>
      <Head>
        <link rel="stylesheet" href="/css/hscroll.css" />
        <link rel="stylesheet" href="/css/mini-news.css" />
        <link rel="stylesheet" href="/css/article.css" />
        <script src="/@nrk/core-scroll.min.js" />
      </Head>
      <div>
        <h1>
          <a href=".">{title}</a> [{lang}]
        </h1>

        <HScroll>
          {services.map(({ name, img, desc, href, keywords }) => (
            <div class="halbum-image">
              <img
                width={width}
                height={height}
                alt=""
                loading="lazy"
                src={img}
              />

              <h3>
                <a
                  href={keywords?.length > 0
                    ? researchTopicURL({ topic, lang })
                    : href}
                  title={desc}
                >
                  {name}
                </a>
              </h3>
            </div>
          ))}
        </HScroll>

        <h2>{t(`topic.${topic}`)}</h2>
        {[...news].map(([grp, arr]) => (
          <div>
            <AlbumHeader
              text={`«${topic}» ${t("news.in")} ${grp}`}
              href={routes(lang).get("news")}
            />
            <HScroll>
              {arr.map(ArticleSquare)}
            </HScroll>
          </div>
        ))}
      </div>
    </Page>
  );
}
