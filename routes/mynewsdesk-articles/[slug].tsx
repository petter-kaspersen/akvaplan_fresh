// Redirect legacy URLs under /mynewsdesk-articles/:slug
import { fetchItemBySlug } from "../../services/mynewsdesk.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const newsitem = await fetchItemBySlug(slug, "news");

    let pr;
    if (!newsitem) {
      pr = await fetchItemBySlug(slug, "pressrelease");
    }
    const item = newsitem ?? pr;
    if (!item) {
      return ctx.renderNotFound();
    }
    const { language, id, type_of_media, published_at: { datetime } } = item;

    const _type = type_of_media === "news" ? "nyhet" : "press";
    const type = _type;
    const isodate = new Date(datetime).toJSON().split("T").at(0);
    const Location = `/${language}/${type}/${isodate}/${slug}`;

    return new Response("", {
      status: 301,
      headers: { Location },
    });
  },
};
