/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import {
  // InnerRenderFunction,
  // RenderContext,
  // RenderFunction,
  start,
} from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

// Consider storing accept-language in context state: https://github.com/denoland/fresh/issues/920
// const render: RenderFunction = (
//   ctx: RenderContext,
//   defaultRender: InnerRenderFunction,
// ) => {
//   ctx.lang = "…";
//   defaultRender();
// };
console.warn(new Date().toJSON(), "pre-start");
await start(manifest, { /*render, plugins: [],*/ port: 7777 });
