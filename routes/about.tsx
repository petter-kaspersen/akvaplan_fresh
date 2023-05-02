// console.log(
//   "@todo About: add links to Faktureringsinformasjon, other office locations",
// );
import {
  Article,
  Card,
  Icon,
  Page,
  PeopleCard,
} from "akvaplan_fresh/components/mod.ts";

import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { routes } from "akvaplan_fresh/services/nav.ts";

import {
  admDir,
  akvaplan as apn,
  boardURL,
} from "akvaplan_fresh/services/akvaplanist.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface AboutProps {
  lang: string;
  base: string;
  title: string;
  akvaplan: Record<string, unknown>;
}

export const config: RouteConfig = {
  routeOverride:
    "/:lang(en|no)/:page(about|about-us|company|om|om-oss|selskapet)",
};

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    lang.value = params.lang;

    const akvaplan = {
      ...apn,
      links: {
        board: boardURL(lang.value),
        leaders: routes(lang.value).get("people") + "/unit/ledels",
        sectionleaders: routes(lang.value).get("people") + "/?q=seksjonsleder",
      },
    };

    const title = t("about.About_us");

    const base = `/${params.lang}/${params.page}/`;
    return ctx.render({ lang, title, base, akvaplan });
  },
};
const _section = {
  marginTop: "2rem",
  marginBottom: "3rem",
};
const _header = {
  marginBlockStart: "1rem",
  marginBlockEnd: "0.5rem",
};

export default (
  { data: { title, lang, base, akvaplan } }: PageProps<AboutProps>,
) => {
  return (
    <Page title={title} base={base} lang={lang}>
      <Head>
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>
      <div>
        <Article>
          <section style={_section}>
            <h1 style={_header}>
              {t("about.About_us")}
            </h1>
            <Card>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <img
                  alt=""
                  title=""
                  style={{ aspectRatio: 4 / 3 }}
                  width="100%"
                  src="https://mediebank.deno.dev/preview/8022361"
                />
                <details>
                  <summary>{t("about.Summary")}</summary>
                  <p>{t("about.Details")}</p>
                </details>
              </div>
            </Card>
          </section>

          <section style={_section}>
            <h1 style={_header}>
              {t("about.Management")}
            </h1>
            <PeopleCard person={admDir} lang={lang} />

            <Card>
              <menu>
                <li>
                  <a href={akvaplan.links.leaders}>
                    {t("about.Leaders")}
                  </a>
                </li>
                <li>
                  <a href={akvaplan.links.sectionleaders}>
                    {t("about.Section_leaders")}
                  </a>
                </li>
                <li>
                  <a href={akvaplan.links.board} target="_blank">
                    {t("about.Board")}
                  </a>
                </li>
              </menu>
            </Card>
          </section>

          <section style={_section}>
            <h1 style={_header}>{t("about.Policies")}</h1>
            <Card>
              <menu>
                <li>
                  <a
                    hreflang="no"
                    href={t("policy.data.url")}
                    target="_blank"
                  >
                    {t("policy.data")}
                  </a>
                </li>
                <li>
                  <a
                    href={t("policy.quality.url")}
                    target="_blank"
                  >
                    {t("policy.quality")}
                  </a>
                </li>
                <li>
                  <a href={t("policy.terms.url")} target="_blank">
                    {t("policy.terms")}
                  </a>
                </li>
                <li>
                  <a
                    href={t("policy.equality.url")}
                    target="_blank"
                  >
                    {t("policy.equality")}
                  </a>
                </li>
                <li>
                  <a
                    href={t("policy.gender.url")}
                    target="_blank"
                  >
                    {t("policy.gender")}
                  </a>
                </li>
              </menu>
            </Card>
          </section>

          <section style={_section}>
            <h1 style={_header}>{t("about.Other_media")}</h1>

            <Card>
              <dl>
                <dt>
                  {t("about.Social_media")}
                </dt>
                <dd>
                  <a
                    href="https://facebook.com/Akvaplan/"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </dd>
                <dd>
                  <a
                    href="https://no.linkedin.com/company/akvaplan-niva"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </dd>
                <dd>
                  <a
                    href=" https://www.mynewsdesk.com/no/akvaplan-niva"
                    target="_blank"
                  >
                    Mynewsdesk
                  </a>
                </dd>

                <dd>
                  <a
                    href="https://twitter.com/AkvaplanNiva"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </dd>
                <dt>
                  {t("about.Open_access")}
                </dt>
                <dd>
                  <a
                    href="https://zenodo.org/communities/akvaplan-niva"
                    target="_blank"
                  >
                    Zenodo
                  </a>
                </dd>
                <dd>
                  <a
                    href="https://github.com/akvaplan-niva"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </dd>
                <dt>
                  Video
                </dt>
                <dd>
                  <a
                    href="https://www.youtube.com/channel/UCD-AkBT1riN6TeNDzBP7g8g"
                    target="_blank"
                  >
                    YouTube
                  </a>
                </dd>
              </dl>
            </Card>
          </section>

          <section style={_section}>
            <h1 style={_header}>{t("about.Contact")}</h1>

            <Card>
              <dl>
                <dt>
                  {t("about.Visit")} ({t("about.HQ")})
                </dt>
                <dd>
                  {akvaplan.addr.hq.visit} (<a
                    href="https://goo.gl/maps/P73K9hcVKeKd7jkz5"
                    target="_blank"
                  >
                    {t("Google Maps")}
                  </a>)
                </dd>

                <dt>Post</dt>
                <dd>{akvaplan.addr.hq.post}</dd>

                <dt>Faktura</dt>
                <dd>
                  Se <a href="/en/invoicing"></a>
                </dd>

                <dt>
                  Telefon
                </dt>
                <dd>
                  <a
                    href={`tel:${akvaplan.tel}`}
                  >
                    <Icon name="phone_in_talk" /> +47 77 75 03 00
                  </a>
                </dd>

                <dt>
                  Epost
                </dt>
                <dd>
                  <a
                    href={`mailto:${akvaplan.email}`}
                  >
                    <Icon name="mail" />
                    {akvaplan.email}
                  </a>
                </dd>
              </dl>
            </Card>
          </section>
        </Article>
      </div>
    </Page>
  );
};
