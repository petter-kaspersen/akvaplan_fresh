import { SlimPublication } from "../@interfaces/slim_publication.ts";
import { Page } from "../components/page.tsx";
import { Card } from "../components/card.tsx";
import {
  HandlerContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";

import { Head } from "$fresh/runtime.ts";

export const config: RouteConfig = {
  routeOverride: "/doi/:prefix/:suffix0/:extra*",
};

const doiFromParams = (params: Record<string, string>) => {
  const { suffix0, extra, prefix } = params;
  const suffix = !extra ? suffix0 : `${suffix0}/${extra}`;
  return `${prefix}/${suffix}`;
};

const getSlimPublication = async (doi: string): Promise<SlimPublication> => {
  const base = Deno.env.get("dois_base") ?? "https://dois.deno.dev";
  const url = new URL(`/doi/${doi}`, base);
  const response = await fetch(url);
  if (response.ok) {
    const slim: SlimPublication = await response.json();
    return slim;
  }
  const empty: SlimPublication = {};
  return empty;
};

export const handler: Handlers<SlimPublication> = {
  async GET(request: Request, context: HandlerContext) {
    const { params } = context;
    const doi = doiFromParams(params);
    const slim = await getSlimPublication(doi);
    return context.render(slim);
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
          <a href={href}>{doi}</a>

          <div>
            <a href="/pubs/?q=journal-article">
              {type}
            </a>
          </div>

          <div class="mdc-typography--headline4">
            {title}
          </div>

          <div class="mdc-typography--headline6">
          </div>

          <div class="mdc-typography--headline6">
            <p>
              <em>{container}</em>
              ({published})
            </p>
          </div>

          <div class="headline6">
            <a
              target="_blank"
              style="display:grid; grid-gap: 0.25rem; grid-template-columns: auto 1fr; align-items: center;"
              href="https://doi.org/10.1016/j.jembe.2022.151855"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                fill="var(--text1)"
              >
                <path d="M180 936q-24 0-42-18t-18-42V666h60v210h600V274H180v212h-60V274q0-24 18-42t42-18h600q24 0 42 18t18 42v602q0 24-18 42t-42 18H180Zm233-167-45-45 118-118H120v-60h366L368 428l45-45 193 193-193 193Z" />
              </svg>

              <span>https://doi.org/{doi}</span>
            </a>
          </div>
        </Card>
      </article>
    </Page>
  );
}
