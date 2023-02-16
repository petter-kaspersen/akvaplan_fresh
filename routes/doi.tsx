import { SlimPublication } from "@interfaces/slim_publication.ts";
import { Page } from "../components/page.tsx";
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
  const { title, authors, doi, ...rest } = data;
  const href = `https://doi.org/${doi}`;

  return (
    <Page title={title}>
      <article>
        <h1>{title}</h1>
        <a href={href}>{doi}</a>
      </article>
    </Page>
  );
}
