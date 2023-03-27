import {
  type Akvaplanist,
  akvaplanists,
} from "akvaplan_fresh/services/akvaplanist.ts";

import { PeopleScroll } from "../components/people/PeopleScroll.tsx";

import { Page } from "akvaplan_fresh/components/page.tsx";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";

const href = (id: string) => "#@" + id;

export const config: RouteConfig = {
  routeOverride: "{/:lang}?/(employees|ansatte|akvaplanist)",
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    return ctx.render(await akvaplanists());
  },
};

export default function Akvaplanists({ data }: PageProps<Akvaplanist[]>) {
  return (
    <Page title="Artikler">
      <PeopleScroll people={data} />
    </Page>
  );
}
