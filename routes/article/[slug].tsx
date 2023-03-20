import { fetchItem } from "akvaplan_fresh/services/mynewsdesk.ts";
import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";

import Article from "../../components/article/Article.tsx";
import ArticleContact from "../../components/article/ArticleContact.tsx";
import ArticleHeader from "../../components/article/ArticleHeader.tsx";

import { Page } from "akvaplan_fresh/components/page.tsx";
import HScroll from "../../components/hscroll/HScroll.tsx";

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

  const contactPerson = {
    name: "Lars-Henrik Larsen",
    title: "Seksjonsleder",
    email: "lhk@akvaplan.niva.no",
    phone: "+47 481 14 233",
    location: "Tromsø",
  };

  return (
    <Page title={header}>
      <Article language={language}>
        <ArticleHeader
          header={header}
          image={img}
          imageCaption={image_caption}
        />

        <HScroll scrollerId="article-scroll">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </HScroll>

        <section
          class="article-content"
          dangerouslySetInnerHTML={{ __html }}
        ></section>
        <ArticleContact contactPerson={contactPerson} />
      </Article>
    </Page>
  );
}
