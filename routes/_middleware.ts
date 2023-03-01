import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { parse } from "accept-language-parser";
import { hasNordicOrSami, lang } from "akvaplan_fresh/text/mod.ts";

interface State {
  lang: string | Signal<string>;
}

const acceptLanguages = (req: Request) =>
  parse(req.headers.get("accept-language") ?? undefined)?.map(({ code }) =>
    code
  );

const acceptsNordic = (req: Request) => hasNordicOrSami(acceptLanguages(req));

export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const code = acceptsNordic(req) ? "no" : "en";
  //lang.value = code;
  ctx.state.lang = code;
  return ctx.next();
}
