import { Page } from "akvaplan_fresh/components/page.tsx";
import { lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/:page(services|tjenester)",
};

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    lang.value = params.lang;
    const title = t("Services");
    const base = `/${params.lang}/${params.page}/`;
    return ctx.render({ lang, title, base });
  },
};

export default function Research(
  { data: { lang, title, base } }: PageProps<unknown>,
) {
  return (
    <Page title={title} base={base}>
      <h1>
        <a href=".">{title}</a> [{lang}]
      </h1>
    </Page>
  );
}
