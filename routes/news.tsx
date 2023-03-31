import { searchNews } from "akvaplan_fresh/services/news.ts";
import { href } from "akvaplan_fresh/services/mynewsdesk.ts";
import { Page } from "akvaplan_fresh/components/page.tsx";
//import { MiniNews } from "akvaplan_fresh/components/news/mini_news.tsx";
import { MiniNewsCard } from "akvaplan_fresh/components/news/mini_news.tsx";
import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { isodate } from "akvaplan_fresh/time/mod.ts";

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
    const title = t("News");

    const { searchParams } = new URL(req.url);
    const _q = searchParams.get("q") ?? "";
    const q = _q.toLocaleLowerCase();

    const news = await searchNews({ q, lang: lang.value, limit: 512 }) ??
      { items: [] };

    return ctx.render({ title, base, news, lang });
  },
};

export default function ApnPubs(
  { data: { lang, base, title, news } }: PageProps,
) {
  return (
    <Page title={title} base={base}>
      <h1>
        <a href="." style={{ color: "var(--text2)" }}>{title} [{lang}]</a>
      </h1>
      <ul>
        {news.map(resultItem)}
      </ul>
    </Page>
  );
}

const resultItem = ({ title, href, published, type, thumb, caption }: News) => {
  return (
    <MiniNewsCard
      img={thumb}
      href={href}
      caption={caption}
      title={title}
      published={published}
      type={type}
    />
  );
};
