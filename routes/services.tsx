import { searchServices } from "akvaplan_fresh/services/svc.ts";

import {
  Accreditations,
  HScroll,
  Page,
} from "akvaplan_fresh/components/mod.ts";

import { ServiceGroup } from "akvaplan_fresh/components/album/service_group.tsx";

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
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    const { searchParams } = new URL(req.url);
    lang.value = params.lang;

    const title = t("Services");
    const base = `/${params.lang}/${params.page}/`;

    const { groupname, filter } = params;
    const group = groupname?.length > 0 ? groupname : "year";
    const q = searchParams.get("q") ?? "";

    const services = await searchServices({ q, lang: params.lang });

    return ctx.render({ lang, title, base, services });
  },
};

export default function Services(
  { data: { lang, title, base, services } }: PageProps<unknown>,
) {
  const width = 512;
  const height = 512;
  return (
    <Page title={title} base={base}>
      <link rel="stylesheet" href="/css/hscroll.css" />
      <script src="/@nrk/core-scroll.min.js" />
      <h1>
        <a href=".">{title}</a> [{lang}]
      </h1>

      <HScroll>
        {services.map(ServiceGroup)}
      </HScroll>

      <Accreditations lang={lang.value} />
    </Page>
  );
}
