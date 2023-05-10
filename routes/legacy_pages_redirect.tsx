// Redirect legacy URLs like
// * /en/projects-networks/:slug
// * /en/advisory-services/environmental-monitoring
//
// See also _middleware

import { Handlers, RouteConfig } from "$fresh/server.ts";
export const config: RouteConfig = {
  routeOverride:
    "{/:lang(en|no)}?/:page(projects-networks|prosjekter-nettverk|forskning-utvikling|research-development|advisory-services)/:slug",
};
export const handler: Handlers = {
  GET(req, ctx) {
    const { slug, lang } = ctx.params;
    const path = lang === "en" ? "/en/news" : "/no/nyheter";
    const url = new URL(path, req.url);
    url.searchParams.set("q", slug);
    const Location = url.href;

    return new Response("", {
      status: 307,
      headers: {
        Location,
        "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
      },
    });
  },
};
