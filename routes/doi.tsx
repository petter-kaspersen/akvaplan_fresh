import { SlimPublication } from "../@interfaces/slim_publication.ts";

import { HandlerContext, PageProps, RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/doi/:prefix/:suffix0/:extra*",
};

const _doi = (params) => {
  const { suffix0, extra, prefix } = params;
  const suffix = !extra ? suffix0 : `${suffix0}/${extra}`;
  return `${prefix}/${suffix}`;
};

export const handler: Handlers<SlimPublication> = {
  async GET(request: Request, context: HandlerContext) {
    const { params } = context;
    const doi = _doi(params);
    const url = `https://dois.deno.dev/doi/${doi}`;
    const response = await fetch(url);

    if (response.ok) {
      console.warn(response);
      const slim: SlimPublication = await response.json();
      return context.render(slim);
    }
  },
};

export default function DoiPublication(
  { params, data }: PageProps<SlimPublication>,
) {
  const { title, doi, ...rest} = data;
  const href=`https://doi.org/${doi}`;

  return (
    <article>
      <h1>{title}</h1>
      <a href={href}>{doi}</a>
      <section>
        <code>{JSON.stringify(rest,null, "  ")}</code>
      </section>
    </article>
  );
}
