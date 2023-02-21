/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { RenderFunction, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

// https://github.com/denoland/fresh/issues/920
const render: RenderFunction = (ctx, defaultRender) => {
  ctx.lang = "nb";
  defaultRender();
};
await start(manifest, { render, plugins: [], port: 7777 });
