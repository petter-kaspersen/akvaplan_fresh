// Redirect legacy new URLs: /mynewsdesk-articles
import { fetchItemBySlug } from "../../services/mynewsdesk.ts";
import { Page } from "../../components/page.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

// /mynewsdesk-articles/autonomous-vehicles-mapping-zooplankton-and-fish/

// import { SlimPublication } from "@interfaces/slim_publication.ts";
// import { Page } from "../components/page.tsx";
// import { Card } from "../components/card.tsx";
// import {
//   HandlerContext,
//   Handlers,
//   PageProps,
//   RouteConfig,
// } from "$fresh/server.ts";

// import { Head } from "$fresh/runtime.ts";

// export const config: RouteConfig = {
//   routeOverride: "/doi/:prefix/:suffix0/:extra*",
// };

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const newsitem = await fetchItemBySlug(slug, "news");
    console.warn({ slug, newsitem });
    let pr;
    if (!newsitem) {
      pr = await fetchItemBySlug(slug, "pressrelease");
    }
    const item = newsitem ?? pr;
    if (!item) {
      return ctx.renderNotFound();
    }
    const { language, id, type_of_media, published_at: { datetime } } = item;

    const isodate = new Date(datetime).toJSON().split("T").at(0);
    const Location = `/article/${type_of_media}/${isodate}/${slug}/${id}`;

    //return Response.json({ item });
    return new Response("", {
      status: 307,
      headers: { Location },
    });
  },
};
