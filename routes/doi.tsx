import { getSlimPublication } from "akvaplan_fresh/services/dois.ts";
import { getOpenAlexWork } from "akvaplan_fresh/services/openalex.ts";
import { buildoiNewsMap } from "akvaplan_fresh/services/news.ts";

import { Card, Page } from "akvaplan_fresh/components/mod.ts";

import { lang as langSignal, t } from "akvaplan_fresh/text/mod.ts";

import { SlimPublication } from "akvaplan_fresh/@interfaces/slim_publication.ts";

import {
  HandlerContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";

//import { Head } from "$fresh/runtime.ts";

export const config: RouteConfig = {
  routeOverride: "{/:lang}?/doi/:prefix/:suffix0/:extra*",
};

const doiFromParams = (params: Record<string, string>) => {
  const { suffix0, extra, prefix } = params;
  const suffix = !extra ? suffix0 : `${suffix0}/${extra}`;
  return `${prefix}/${suffix}`;
};

export const handler: Handlers<SlimPublication> = {
  async GET(request: Request, ctx: HandlerContext) {
    const { params } = ctx;

    langSignal.value = params.lang;
    const doi = doiFromParams(params);
    const slim = await getSlimPublication(doi);

    if (slim) {
      const news = await buildoiNewsMap() ?? {};
      const openalex = await getOpenAlexWork({ doi }) ?? {};
      return ctx.render({ slim, news, openalex });
    } else {
      return ctx.renderNotFound();
    }
  },
};

export default function DoiPublication(
  { params, data: { slim, news, openalex } }: PageProps<
    { slim: SlimPublication; news: unknown }
  >,
) {
  const {
    title,
    type,
    license,
    printed,
    published,
    container,
    authors,
    doi,
    ...rest
  } = slim;
  const href = `https://doi.org/${doi}`;

  return (
    <Page title={title}>
      <article>
        <Card>
          <h1
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p>
            <em dangerouslySetInnerHTML={{ __html: container }} />{" "}
            (<time>{printed ?? published}</time>)
          </p>
        </Card>
        <Card>
          <p>
            {t(`news.${type}`)}
          </p>
          <p>{license?.toUpperCase()}</p>
          <p>
            <a
              target="_blank"
              href={`https://doi.org/${doi}`}
            >
              https://doi.org/{doi}
            </a>
          </p>
        </Card>
        <Card>
          <h2 style={{ color: "var(--accent)" }}>
            {authors.length > 1 ? t("pubs.Authors") : t("pubs.Author")}
          </h2>
          <ol>
            {authors.map(({ family, given }, n) => (
              <li>
                {given} {family}
                {/* {n === authors.length - 1 ? null : ", "} */}
              </li>
            ))}
          </ol>
        </Card>
        <Card>
          {openalex?.id && (
            <p>
              {t("pubs.View_in")}{" "}
              <a
                target="_blank"
                href={openalex.id}
              >
                OpenAlex
              </a>
            </p>
          )}
        </Card>
      </article>
    </Page>
  );
}

// FIXME: DOI from hell: /no/doi/10.1577/1548-8659(1994)123%3C0385:spbpac%3E2.3.co;2
