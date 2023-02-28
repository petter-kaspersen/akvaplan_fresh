import { Page } from "akvaplan_fresh/components/page.tsx";
import { lang as langSignal } from "akvaplan_fresh/text/mod.ts";
import HomeSections, {
  buildSections,
} from "akvaplan_fresh/islands/home_sections.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
export const handler: Handlers = {
  GET(req, ctx) {
    const { state } = ctx;
    const { lang } = state; // Server side lang from request (accept-language)
    return ctx.render({ lang });
  },
};
export default function Home({ data: { lang } }: PageProps) {
  return (
    <Page lang="no">
      <HomeSections />
    </Page>
  );
}
