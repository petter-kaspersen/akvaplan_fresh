import { Card } from "akvaplan_fresh/components/card.tsx";

type MiniNewsProps = {
  img: string;
  title: string;
  href: string;
};

export const MiniNews = ({ img, title, href }: MiniNewsProps) => (
  <Card customClass="mini-news">
    <a href={href}>
      <img src={img} alt={title} />
      <span>{title}</span>
    </a>
  </Card>
);
