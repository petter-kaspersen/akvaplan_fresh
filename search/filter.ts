import { normalize } from "akvaplan_fresh/text/mod.ts";
export const buildContainsFilter = (
  query: string,
) => ((any: unknown) =>
  normalize(JSON.stringify(any)).includes(normalize(query)));
