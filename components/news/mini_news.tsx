import { isodate } from "akvaplan_fresh/time/mod.ts";
import { Card } from "akvaplan_fresh/components/card.tsx";

type MiniNewsProps = {
  img: string;
  title: string;
  href: string;
  caption: string;
  published: Date;
};

export const MiniNews = (
  { img, title, caption, href, published }: MiniNewsProps,
) => (
  <Card customClass="mini-news">
    <a href={href}>
      <img src={img} alt={caption} title={caption} />
      <span style={{ color: "var(--text2)" }}>
        {isodate(published)}: {title}
      </span>
    </a>
  </Card>
);
