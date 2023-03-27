import { Page } from "akvaplan_fresh/components/page.tsx";
import { lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/:page(null|0)",
};

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    lang.value = params.lang;
    const title = t(params.page);
    const base = `/${params.lang}/${params.page}/`;
    return ctx.render({ lang, title, base });
  },
};

export default function Research(
  { data: { title, lang, base } }: PageProps<unknown>,
) {
  return (
    <Page title={title} base={base}>
      <h1>
        <a href=".">{title}</a> [{lang}]
      </h1>
    </Page>
  );
}
