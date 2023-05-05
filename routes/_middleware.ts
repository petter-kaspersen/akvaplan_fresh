import {
  acceptsNordic,
  getLangFromURL,
  setSiteLang,
} from "akvaplan_fresh/text/mod.ts";

import {
  legacyRoutes,
  response307XRobotsTagNoIndex,
} from "akvaplan_fresh/services/mod.ts";

import { parse } from "accept-language-parser";

import { MiddlewareHandlerContext } from "$fresh/server.ts";

//https://github.com/denoland/fresh/issues/1128
export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<Record<string, unknown>>,
) {
  const url = new URL(req.url);
  const { pathname, hostname } = url;

  const legacyHosts = ["www.akvaplan.niva.no", "akvaplan.niva.no"];
  if (legacyHosts.includes(hostname)) {
    const fresh = req.url.replace("www.", "").replace(
      "akvaplan.niva.",
      "akvaplan.",
    );
    return Response.redirect(fresh, 301);
  }

  if (legacyRoutes.has(pathname)) {
    const Location = new URL(legacyRoutes.get(pathname), url);
    return response307XRobotsTagNoIndex(Location);
  }

  if ("/" === pathname && req.headers.has("accept-language")) {
    // Special case for root path /
    // Redirect from accept-language header,  if present
    const requestHeaderAcceptLanguages = parse(
      req.headers.get("accept-language"),
    );
    const acceptLanguages = requestHeaderAcceptLanguages.map(({ code }) =>
      code
    );
    const lang = acceptsNordic(acceptLanguages) ? "no" : "en";
    return new Response("", {
      status: 307,
      headers: { Location: `/${lang}` },
    });
  } else {
    const lang = getLangFromURL(url);
    if (lang) {
      setSiteLang(lang);
    }
  }
  return ctx.next();
}
