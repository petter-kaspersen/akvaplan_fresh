import { Card, Icon, Page, PeopleCard } from "akvaplan_fresh/components/mod.ts";
import Article from "akvaplan_fresh/components/article/Article.tsx";
import ArticleContact from "akvaplan_fresh/components/article/ArticleContact.tsx";
import ArticleHeader from "akvaplan_fresh/components/article/ArticleHeader.tsx";

import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { routes } from "akvaplan_fresh/services/nav.ts";

import {
  admDir,
  boardUpdated,
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
  routeOverride: "/:lang(en|no)/:page(about|company|om|om-oss)",
};

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;
    lang.value = params.lang;

    const akvaplan = {
      name: "Akvaplan-niva",
      tel: "+47 77 75 03 00",
      email: "info@akvaplan.niva.no",
      addr: {
        hq: {
          visit: "Framsenteret, 9296 Tromsø, Norway",
          post: "Framsenteret, Postbox 6606, Stakkevollan, 9296 Tromsø, Norway",
        },
      },
      links: {
        board: boardURL(lang.value),
        leaders: routes(lang.value).get("people") + "/unit/ledels",
        sectionleaders: routes(lang.value).get("people") + "/?q=seksjonsleder",
      },
    };

    const title = akvaplan.name;

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

const conditionsURL = (lang: string) =>
  lang === "en"
    ? "https://resources.mynewsdesk.com/image/upload/f_pdf,fl_attachment/zqb5hq7cgpc29klpd1ax"
    : "https://resources.mynewsdesk.com/image/upload/f_pdf,fl_attachment/jqjukz69thilinjupcpx";

export default (
  { data: { title, lang, base, akvaplan } }: PageProps<AboutProps>,
) => {
  return (
    <Page title={title} base={base} lang={lang}>
      <Head>
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>
      <div>
        <header>
        </header>
        <Article>
          {
            /* <figure style={_caption}>
          <figcaption>{image_caption}</figcaption>
        </figure>
        {lang} */
          }

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
                  title=""
                  alt=""
                  src="https://mediebank.deno.dev/preview_big/8022361"
                  height="auto"
                />
                <p>{t("about.desc.Medium")}</p>
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
                    href="https://www.nmdc.no/resources/nmdc/Akvaplan-niva-dataforvaltningspolitikk.pdf"
                  >
                    Data policy
                  </a>
                </li>
                <li>Kvalitetspolicy og etiske retningslinjer</li>
                <li>
                  <a href={conditionsURL(lang.value)} target="_blank">
                    Generelle vilkår (for kjøp av tjenester)
                  </a>
                </li>
                <li>Arbeid for likestilling og mot diskriminering</li>
                <li>Likestillingsplan</li>
              </menu>
            </Card>
          </section>

          <section style={_section}>
            <h1 style={_header}>{t("about.Other_media")}</h1>

            <Card>
              <dl>
                <dt>
                  Sosiale media
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
                    href="https://twitter.com/AkvaplanNiva"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </dd>
                <dt>
                  Datasett
                </dt>
                <dd>
                  <a
                    href="https://zenodo.org/communities/akvaplan-niva"
                    target="_blank"
                  >
                    Zenodo
                  </a>
                </dd>
                <dt>
                  Kildekode
                </dt>
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
                  Besøk
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

                <a
                  href={`tel:${akvaplan.tel}`}
                >
                  <dt>
                    <Icon name="phone_in_talk" />
                  </dt>
                  <dd>+47 77 75 03 00</dd>
                </a>
                <a
                  href={`mailto:${akvaplan.email}`}
                >
                  <dt>
                    <Icon name="contact_mail" />
                  </dt>
                  <dd>
                    {akvaplan.email}
                  </dd>
                </a>
              </dl>
            </Card>
          </section>
        </Article>
      </div>
      {
        /* <ul>
        <li>Faktureringsinformasjon</li>
        <li>Offices</li>
      </ul> */
      }
    </Page>
  );
};
