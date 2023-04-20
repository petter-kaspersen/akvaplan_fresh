import {
  //getResearchTopicSearchwords,
  //getServiceTopicSearchwords,
  newsFromMynewsdesk,
  searchMynewsdesk,
  searchResearch,
  searchServices,
} from "akvaplan_fresh/services/mod.ts";

import {
  AlbumHeader,
  Article,
  ArticleHeader,
  ArticleSquare,
  HScroll,
  Page,
  PeopleCard,
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
    "/:lang(en|no){/:page(news|nyheter|services|tjenester|research|forskning)}?/:groupname(topic|topics|tema){/:topic}?",
};

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    const { searchParams } = new URL(req.url);

    lang.value = params.lang;

    const page = ["research", "forskning", "news"].includes(params.page)
      ? "research"
      : "services";

    const base = `/${params.lang}/${params.page}/${params.groupname}`;

    const allservices = await searchServices({ q: "", lang: params.lang });

    const alltopics = await searchResearch({ q: "", lang: params.lang });

    const topics = alltopics.slice(0, 3);
    const services = allservices.slice(0, 3);

    const q = params.topic;
    const topic = q;
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

    const title = `${t(`Topic_${page}`)}: ${topic}`; //t(`topic.${params.page}`);

    return ctx.render({
      lang,
      title,
      base,
      services,
      topics,
      news: newsGrouped,
      topic,
      page: params.page,
      keywords: [topic],
    });
  },
};

export default function TopicsOrTopic(
  {
    data: { lang, title, base, services, topics, news, topic, keywords, page },
  }: PageProps<
    unknown
  >,
) {
  const width = 512;
  const height = 512;
  return (
    <Page title={title} base={base}>
      <Head>
        <link rel="stylesheet" href="/css/hscroll.css" />
        <link rel="stylesheet" href="/css/article.css" />
        <script src="/@nrk/core-scroll.min.js" />
      </Head>
      <div>
        {!topics && (
          <h1>
            <a href=".">{t(`Topic_${page}`)}</a>: {topic}
          </h1>
        )}
        {topics && topics?.at(0)?.img && (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 10fr 1fr",
              gap: "1rem",
            }}
          >
            <div></div>
            <Article>
              <ArticleHeader
                header={
                  <span>
                    <a href=".">{t(`Topic_${page}`)}</a>:{" "}
                    {topics?.at(0)?.name ?? topic}
                  </span>
                }
                image={topics?.at(0)?.img?.replace(
                  "/preview/",
                  "/preview_big/",
                )}
                imageCaption={"cap"}
              />
              <div>
                <PeopleCard person={{ name: topics?.at(0)?.contact_id }} />
              </div>
            </Article>
            <div></div>
          </section>
        )}

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
                  href={href}
                  title={desc}
                >
                  {name}
                </a>
              </h3>
            </div>
          ))}
        </HScroll>

        {/* <h2>{t("nav.News")}</h2> */}
        {[...news].slice(0, 3).map(([grp, arr]) => (
          <div>
            <AlbumHeader
              text={t(grp)}
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
