import { serviceSummaryMap } from "akvaplan_fresh/services/topic/mod.ts";

export const ServiceSummary = ({ topic, lang, ...props } = {}) => {
  console.log(serviceSummaryMap.get(topic)?.get(lang));
  return serviceSummaryMap.get(topic)?.get(lang) ?? (() => null);
};
