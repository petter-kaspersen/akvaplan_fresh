import { MiniNewsCard } from "./mini_news.tsx";
import { HScroll, Icon, MiniCard } from "akvaplan_fresh/components/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";
import { type News } from "akvaplan_fresh/@interfaces/mod.ts";

type NewsFilmStripProps = {
  news: News[];
  lang: string;
};

// const cellTower = ({ lang }) => (
//   <div
//     style={{
//       display: "grid",
//       gap: 0,
//       placeContent: "center",
//       gridTemplateColumns: "3.5rem",
//     }}
//   >
//     <a
//       href={lang === "en" ? "news" : "nyheter"}
//     >
//       <Icon name="cell_tower" style={{ fontSize: "3rem" }} />
//     </a>
//   </div>
// );
// staticFirstElement={cellTower({ lang })}

const NewsIcon = () => <Icon name="cell_tower" />;
export function NewsFilmStrip({ news, lang }: NewsFilmStripProps) {
  const more = t("news.more_news");
  const href = lang === "en" ? "news" : "nyheter";
  const MoreNews = () => (
    <MiniCard>
      <a class="target" href={href} title={more}>
        <NewsIcon />
      </a>
    </MiniCard>
  );

  return (
    <HScroll scrollerId="news-film-strip">
      <MoreNews />
      {news.map((
        { title, href, caption, published, thumb, type, hreflang },
      ) => (
        <MiniNewsCard
          img={thumb}
          href={href}
          caption={caption}
          title={title}
          published={published}
          type={type}
          hreflang={hreflang}
          lang={lang}
        />
      ))}
      <MoreNews />
    </HScroll>
  );
}
