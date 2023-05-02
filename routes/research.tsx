import { getResearchLevel0 } from "akvaplan_fresh/services/research.ts";
import { search as searchPubs } from "akvaplan_fresh/services/dois.ts";
import { newsFromPubs } from "akvaplan_fresh/services/news_pubs.ts";
import { researchTopicURL, routes } from "akvaplan_fresh/services/nav.ts";
import { lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  AlbumHeader,
  ArticleSquare,
  Card,
  HScroll,
  Page,
  PeopleCard as PersonCard,
  SlimCard,
} from "akvaplan_fresh/components/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/:page(research|forskning)",
};

const _section = {
  marginTop: "2rem",
  marginBottom: "3rem",
};
const _header = {
  marginBlockStart: "1rem",
  marginBlockEnd: "0.5rem",
};

export const groupReducer = (fx) =>
(
  previous: Map<string, Array>,
  current: unknown,
) => {
  const grp = fx(current);
  if (!previous.has(grp)) {
    previous.set(grp, [current]);
  } else {
    previous.set(grp, [...previous.get(grp) ?? [], current]);
  }
  return previous;
};

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    const { searchParams } = new URL(req.url);
    lang.value = params.lang;

    const title = t("Research");
    const base = `/${params.lang}/${params.page}/`;

    const { groupname, filter } = params;
    const group = groupname?.length > 0 ? groupname : "year";
    const q = searchParams.get("q") ?? "";

    const topics = await getResearchLevel0(params.lang);

    const { data } = await searchPubs({ q, limit: 100 });
    const pubs = data;

    const grouped = (pubs).reduce(
      groupReducer(({ published }) => published.substring(0, 7)),
      new Map(),
    );

    return ctx.render({
      lang,
      title,
      base,
      topics,
      pubs,
      grouped,
    });
  },
};

export default function Research(
  { data: { lang, title, base, topics, pubs, grouped } }: PageProps<
    unknown
  >,
) {
  return (
    <Page title={title} base={base}>
      <link rel="stylesheet" href="/css/hscroll.css" />
      <script src="/@nrk/core-scroll.min.js" />
      <h1>
        {title}
      </h1>
      <HScroll maxVisibleChildren={6.5}>
        {topics.map(ArticleSquare)}
      </HScroll>

      {
        /* <section style={_section}>
        <Card>
          <h1>{t("research.people.Header")}</h1>
          <p>
            {t("research.people.Intro")}
          </p>
        </Card>
        <PersonCard id="aki" lang={lang} />
        <PersonCard id="aev" lang={lang} />
        <PersonCard id="gnc" lang={lang} />
        <PersonCard id="per" lang={lang} />
      </section> */
      }

      <div style={{ fontSize: "1rem" }}>
        {[...grouped].filter((_, i) => i < 3).map(([grpkey, pubs]) => (
          <div>
            <h3>
              {grpkey}
            </h3>
            <ul>
              {pubs.map((slim) => <SlimCard slim={slim} lang={lang.value} />)}
            </ul>
          </div>
        ))}
      </div>
    </Page>
  );
}
