import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { parse } from "accept-language-parser";
import { hasNordicOrSami } from "akvaplan_fresh/text/mod.ts";
interface State {
  lang: string;
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
  const lang = acceptsNordic(req) ? "no" : "en";
  ctx.state.lang = lang;
  return ctx.next();
}
