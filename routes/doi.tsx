import { getSlimPublication } from "akvaplan_fresh/services/dois.ts";

import { buildoiNewsMap } from "akvaplan_fresh/services/news.ts";

import { Card, Icon, Page } from "akvaplan_fresh/components/mod.ts";

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
    const doi = doiFromParams(params);
    const slim = await getSlimPublication(doi);

    if (slim) {
      const news = await buildoiNewsMap();
      return ctx.render({ slim, news });
    } else {
      return ctx.renderNotFound();
    }
  },
};

export default function DoiPublication(
  { params, data: { slim, news } }: PageProps<
    { slim: SlimPublication; news: unknown }
  >,
) {
  const { title, type, published, container, authors, doi, ...rest } = slim;
  const href = `https://doi.org/${doi}`;

  return (
    <Page title={title}>
      <article>
        <Card>
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>

          <div class="mdc-typography--headline4">
          </div>

          <div class="mdc-typography--headline6">
          </div>

          <div class="mdc-typography--headline6">
            <p>
              <em>{container}</em>&nbsp;<span>({published})</span>
            </p>
          </div>
          <div>
            {type}
          </div>

          <div class="headline6">
            <a
              target="_blank"
              style="display:grid; grid-gap: 0.25rem; grid-template-columns: auto 1fr; align-items: center;"
              href={`https://doi.org/${doi}`}
            >
              <Icon name="exit_to_app" />

              <span>https://doi.org/{doi}</span>
            </a>
          </div>
        </Card>
        <Card>
          <pre>{JSON.stringify(news.get(doi))}</pre>
        </Card>

        <code></code>
      </article>
    </Page>
  );
}
