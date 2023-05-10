import { serviceSummaryMap } from "akvaplan_fresh/services/topic/mod.ts";

export const ServiceSummary = ({ topic, lang, ...props } = {}) =>
  serviceSummaryMap.get(topic)?.get(lang) ?? (() => null);
