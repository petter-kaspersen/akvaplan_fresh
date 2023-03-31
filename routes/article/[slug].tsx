import { fetchItemBySlug } from "akvaplan_fresh/services/mynewsdesk.ts";
import { isodate } from "akvaplan_fresh/time/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";

import Article from "../../components/article/Article.tsx";
import ArticleContact from "../../components/article/ArticleContact.tsx";
import ArticleHeader from "../../components/article/ArticleHeader.tsx";

import { MynewsdeskItem } from "akvaplan_fresh/@interfaces/mynewsdesk.ts";

import { Page } from "akvaplan_fresh/components/page.tsx";
import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride:
    "{/:lang}?/:type(news|nyhet|pressrelease|pressemelding|press){/:isodate}?/:slug",
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug, lang, type } = ctx.params;
    const type_of_media = type.startsWith("press") ? "pressrelease" : "news";
    const item = await fetchItemBySlug(slug, type_of_media);
    if (!item) {
      return ctx.renderNotFound();
    }
    return ctx.render({ item, lang });
  },
};

const OnlyIn = ({ language, lang }) => {
  return <div lang={lang}>{t(`Only.${String(language)}`)}</div>;
};

interface ArticleProps {
  item: MynewsdeskItem;
  lang: string;
}

export default function NewsArticle(
  { data: { item, lang } }: PageProps<ArticleProps>,
) {
  const {
    header,
    image,
    // image_small,
    // image_medium,
    image_thumbnail_large,
    // image_thumbnail_medium,
    // image_thumbnail_small,
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
    ...mynewsdeskItem
  } = item;

  const __html = body;
  //https://cloudinary.com/documentation/transformation_reference#ar_aspect_ratio
  const img = image.replace(",w_1782", ",w_1782,ar_16:9");

  const contact = contact_people.at(0);

  const { name, title, phone, email } = contact;

  const published = isodate(published_at.datetime);

  const _caption = {
    fontSize: "0.75rem",
  };

  const contactPerson = {
    name,
    title,
    email,
    phone,
    img: image_thumbnail_large,
  };

  return (
    <Page title={header}>
      <Article language={language}>
        <section style={_caption}>
          <em style={{ color: "var(--text2)" }}>
            {lang !== language ? OnlyIn({ lang, language }) : null}
          </em>
        </section>
        <ArticleHeader
          header={header}
          image={img}
          imageCaption={image_caption}
        />

        <figure style={_caption}>
          <figcaption>{image_caption}</figcaption>
        </figure>

        <section
          class="article-content"
          dangerouslySetInnerHTML={{ __html }}
        >
        </section>
      </Article>
    </Page>
  );
}
