import { SlimPublication } from "../@interfaces/slim_publication.ts";

import { Card, Icon, Page } from "akvaplan_fresh/components/mod.ts";

import {
  HandlerContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";

import { Head } from "$fresh/runtime.ts";

export const config: RouteConfig = {
  routeOverride: "{/:lang}?/doi/:prefix/:suffix0/:extra*",
};

const doiFromParams = (params: Record<string, string>) => {
  const { suffix0, extra, prefix } = params;
  const suffix = !extra ? suffix0 : `${suffix0}/${extra}`;
  return `${prefix}/${suffix}`;
};

const getSlimPublication = async (
  doi: string,
): Promise<SlimPublication | undefined> => {
  const base = Deno.env.get("dois_base") ?? "https://dois.deno.dev";
  const url = new URL(`/doi/${doi}`, base);
  const response = await fetch(url);
  if (response.ok) {
    const slim: SlimPublication = await response.json();
    return slim;
  }
};

export const handler: Handlers<SlimPublication> = {
  async GET(request: Request, ctx: HandlerContext) {
    const { params } = ctx;
    const doi = doiFromParams(params);
    const slim = await getSlimPublication(doi);
    if (slim) {
      return ctx.render(slim);
    } else {
      return ctx.renderNotFound();
    }
  },
};

export default function DoiPublication(
  { params, data }: PageProps<SlimPublication>,
) {
  const { title, type, published, container, authors, doi, ...rest } = data;
  const href = `https://doi.org/${doi}`;

  return (
    <Page title={title}>
      <article>
        <Card>
          <h2>{title}</h2>

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
      </article>
    </Page>
  );
}
