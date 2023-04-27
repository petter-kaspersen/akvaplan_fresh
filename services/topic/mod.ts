import { benthos } from "./benthos.tsx";
import { nytek } from "./nytek.tsx";
import { monitoring } from "./monitoring.tsx";
import { oceanography } from "./oceanography.tsx";

export const serviceSummaryMap = new Map([
  ["benthos", benthos],
  ["monitoring", monitoring],
  ["nytek", nytek],
  ["oceanography", oceanography],
]);
