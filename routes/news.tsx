import { href, searchNews } from "akvaplan_fresh/services/mynewsdesk.ts";
import { Page } from "akvaplan_fresh/components/page.tsx";
import { lang, t } from "akvaplan_fresh/text/mod.ts";

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

    const { items } = await searchNews({ q }) ?? { items: [] };

    return ctx.render({ title, base, items, lang });
  },
};

export default function ApnPubs(
  { data: { lang, base, title, items } }: PageProps,
) {
  return (
    <Page title={title} base={base}>
      <h1>
        <a href="." style={{ color: "var(--text2)" }}>{title} [{lang}]</a>
      </h1>
      <ul>
        {items.map(resultItem)}
      </ul>
    </Page>
  );
}

const resultItem = (item: MynewsdeskItem) => {
  const isodate = item.published_at.datetime.substring(0, 10);
  return (
    <li>
      <a href={href(item)}>{item.header}</a> ({isodate})
    </li>
  );
};
