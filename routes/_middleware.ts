import { MiddlewareHandlerContext } from "$fresh/server.ts";

import {
  //acceptsNordic,
  getLangFromURL,
  setSiteLang,
} from "akvaplan_fresh/text/mod.ts";

export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<Record<string, unknown>>,
) {
  const url = new URL(req.url);
  const lang = getLangFromURL(url);
  if (lang) {
    setSiteLang(lang);
  }
  // Disabled /:lang redirect for non-JavaScript users, they must now select language version on /
  // Special treatment of / was used for redirecting using <meta> when JavaScript was disabled
  // Special case for root path ("/")
  // Set lang from accept-language header, if present
  // if ("/" === pathname && req.headers.has("accept-language")) {
  //   const acceptLanguages = parse(req.headers.get("accept-language"));
  //   const lang = acceptsNordic(acceptLanguages) ? "no" : "en";
  //   setSiteLang(lang);
  // }
  return ctx.next();
}
