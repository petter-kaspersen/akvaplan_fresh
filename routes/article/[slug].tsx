import { fetchItem } from "akvaplan_fresh/services/mynewsdesk.ts";

import { Page } from "akvaplan_fresh/components/page.tsx";

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
  const img = image.replace(",w_1782", ",w_1280");

  return (
    <Page title={header}>
      <article class="article" lang={language}>
        <header class="article-header">
          <h1>
            <span class="article-header-backdrop">{header}</span>
          </h1>
          <img src={img} alt={image_caption} />
        </header>
        <section
          class="article-content"
          dangerouslySetInnerHTML={{ __html }}
        >
        </section>
      </article>
    </Page>
  );
}
