import { fetchItem } from "../../services/mynewsdesk.ts";
import { Page } from "../../components/page.tsx";
import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/article/:type_of_media/:isodate/:slug/:id",
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id, type_of_media } = ctx.params;
    const item = await fetchItem(id, type_of_media);
    if (!item) {
      return ctx.renderNotFound();
    }
    return ctx.render(item);
  },
};

export default function NewsArticle({ data }: PageProps) {
  const {
    header,
    image,
    image_small,
    image_medium,
    image_thumbnail_large,
    image_thumbnail_medium,
    image_thumbnail_small,
    contact_people,
    image_caption,
    related_items,
    type_of_media,
    published_at,
    updated_at,
    created_at,
    links,
    summary,
    tags,
    url,
    language,
    body,
    ...item
  } = data;

  const __html = body;
  const img = image.replace(",w_1782", ",w_1400");

  return (
    <Page title={header}>
      <article
        lang={language}
        style={{ display: "grid", placeItems: "center" }}
      >
        <h1>{header}</h1>
        <img src={img} alt={image_caption} width="1400" />
        <small>{image_caption}</small>

        <main>
          <div
            dangerouslySetInnerHTML={{ __html }}
          />
        </main>
      </article>
    </Page>
  );
}
