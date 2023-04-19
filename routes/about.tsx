import { Card, Icon, Page, PeopleCard } from "akvaplan_fresh/components/mod.ts";

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
export default (
  { data: { title, lang, base, akvaplan } }: PageProps<AboutProps>,
) => {
  return (
    <Page title={title} base={base} lang={lang}>
      <Head>
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>
      <section style={_section}>
        <h1>
          {t("nav.About")}
        </h1>
        <Card>{t("about.desc.Medium")}</Card>
      </section>

      <section style={_section}>
        <h2>{t("about.Management")}</h2>

        <PeopleCard person={admDir} lang={lang} />

        <p style={{ marginBlockStart: "1rem" }}>{t("about.See_also")}</p>

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
        <h2>{t("about.Policies")}</h2>
        <Card>
          <menu>
            <li>
              https://www.nmdc.no/resources/nmdc/Akvaplan-niva-dataforvaltningspolitikk.pdf
            </li>
            <li>Kvalitetspolicy og etiske retningslinjer</li>
            <li>Generelle vilkår (for kjøp av tjenester)</li>
            <li>Arbeid for likestilling og mot diskriminering</li>
            <li>Likestillingsplan</li>
          </menu>
        </Card>
      </section>

      <section style={_section}>
        <h2>{t("about.Other_media")}</h2>

        <Card>
          <dl>
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
          </dl>
        </Card>
      </section>

      <section style={_section}>
        <h2>{t("about.Contact")}</h2>

        <Card>
          <dl>
            <dt>
              Besøk
            </dt>
            <dd>
              {akvaplan.addr.hq.visit}{" "}
              (<a href="https://goo.gl/maps/P73K9hcVKeKd7jkz5" target="_blank">
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

      {
        /* <ul>
        <li>Faktureringsinformasjon</li>
        <li>Offices</li>
      </ul> */
      }
    </Page>
  );
};
