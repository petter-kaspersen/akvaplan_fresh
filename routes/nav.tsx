import { SiteNav } from "akvaplan_fresh/components/site_nav.tsx";
import { Page } from "akvaplan_fresh/components/page.tsx";

import { type RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)/nav",
};

export default function Nav() {
  return <Page title="Nav"></Page>;
}
