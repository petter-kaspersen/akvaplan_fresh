import {
  acceptsNordic,
  getLangFromURL,
  setSiteLang,
} from "akvaplan_fresh/text/mod.ts";

import { parse } from "accept-language-parser";

import { MiddlewareHandlerContext } from "$fresh/server.ts";

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
    console.log("legacy", req.url, fresh);
    return Response.redirect(fresh, 301);
  }

  if ("/" === pathname && req.headers.has("accept-language")) {
    // Special case for root path /
    // Redirect from accept-language header,  if present
    const acceptLanguages = parse(req.headers.get("accept-language"));
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
