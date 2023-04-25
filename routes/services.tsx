import { getServicesLevel0 } from "akvaplan_fresh/services/svc.ts";

import {
  Accreditations,
  ArticleSquare,
  Card,
  HScroll,
  Page,
} from "akvaplan_fresh/components/mod.ts";

import HScrollWithDynamicImage from "akvaplan_fresh/islands/HScrollWithDynamicImage.tsx";

import { lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/:page(services|tjenester)",
};

const _section = {
  marginTop: "2rem",
  marginBottom: "3rem",
};
const _header = {
  marginBlockStart: "1rem",
  marginBlockEnd: "0.5rem",
};

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    const { searchParams } = new URL(req.url);
    lang.value = params.lang;

    const title = t("home.album.services");
    const base = `/${params.lang}/${params.page}/`;

    const { groupname, filter } = params;
    const group = groupname?.length > 0 ? groupname : "year";
    const q = searchParams.get("q") ?? "";

    const services = getServicesLevel0(params.lang);

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
      <Head>
        <link rel="stylesheet" href="/css/hscroll.css" />
        <link rel="stylesheet" href="/css/akvaplanist.css" />
        <link rel="stylesheet" href="/css/hscroll-dynamic.css" />
        <script src="/@nrk/core-scroll.min.js" />
      </Head>

      <h1>{title}</h1>

      <HScroll>
        {services.map(ArticleSquare)}
      </HScroll>

      {
        /* <HScrollWithDynamicImage
        scrollerId=""
        images={services}
      /> */
      }

      <section style={_section}>
        <Card>
          <h1>{t("services.lab.Header")}</h1>
          <p>{t("services.lab.Intro")}</p>
        </Card>
      </section>

      <section style={_section}>
        <Card>
          <h1>{t("services.autonomous.Header")}</h1>
          <p>{t("services.autonomous.Intro")}</p>
        </Card>
      </section>

      <section style={_section}>
        <Card>
          <h1>
            {t("services.consult.Header")}
          </h1>
          <p>{t("services.consult.Intro")}</p>
        </Card>
      </section>

      <section style={_section}>
        <Card>
          <h1>
            {t("services.accreditations.Header")}
          </h1>
          <p>{t("services.accreditations.Intro")}</p>
        </Card>
        <Accreditations lang={lang.value} />
      </section>
    </Page>
  );
}
