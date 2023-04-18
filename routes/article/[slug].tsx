import {
  defaultImage,
  fetchItem,
  fetchItemBySlug,
} from "akvaplan_fresh/services/mynewsdesk.ts";
import { isodate } from "akvaplan_fresh/time/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";

import Article from "../../components/article/Article.tsx";
import ArticleContact from "../../components/article/ArticleContact.tsx";
import ArticleHeader from "../../components/article/ArticleHeader.tsx";

//import { YouTube } from "akvaplan_fresh/components/video/youtube.tsx";

import { MynewsdeskItem } from "akvaplan_fresh/@interfaces/mynewsdesk.ts";

import { Page } from "akvaplan_fresh/components/page.tsx";
import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { PeopleCard } from "../../components/mod.ts";

export const config: RouteConfig = {
  routeOverride:
    "{/:lang}?/:type(news|nyhet|pressrelease|pressemelding|press){/:isodate}?/:slug",
};

console.log("@todo News article: auto-fetch related contacts");

export const handler: Handlers = {
  async GET(req, ctx) {
    const { slug, lang, type } = ctx.params;
    const type_of_media = type.startsWith("press") ? "pressrelease" : "news";
    const item = await fetchItemBySlug(slug, type_of_media);
    if (!item) {
      return ctx.renderNotFound();
    }
    const relcontact = item.related_items.find(({ type_of_media }) =>
      type_of_media === "contact_person"
    );
    if (relcontact) {
      const { item_id } = relcontact;
      const contact = await fetchItem(item_id, "contact_person");

      return ctx.render({ item, lang, contact });
    } else {
      return ctx.render({ item, lang, contact: null });
    }
  },
};

const OnlyIn = ({ language, lang }) => {
  return <div lang={lang}>{t(`Only.${String(language)}`)}</div>;
};

interface ArticleProps {
  item: MynewsdeskItem;
  lang: string;
}

console.debug("@todo News article needs bullet points for <li> elements");

export default function NewsArticle(
  { data: { item, lang, contact } }: PageProps<ArticleProps>,
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
  const img = image?.replace(",w_1782", ",w_1782,ar_16:9") ?? defaultImage;

  const published = isodate(published_at.datetime);

  const _caption = {
    fontSize: "0.75rem",
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

        {contact && (
          <section>
            Contact
            <PeopleCard
              person={contact}
            />
          </section>
        )}
      </Article>
    </Page>
  );
}
