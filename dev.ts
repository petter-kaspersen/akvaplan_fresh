#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run --allow-write=.,/tmp --allow-net --watch=static/,routes/ dev.ts

import dev from "$fresh/dev.ts";
await dev(import.meta.url, "./main.ts");
