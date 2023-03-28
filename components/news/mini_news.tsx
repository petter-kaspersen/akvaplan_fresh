import { Card } from "akvaplan_fresh/components/card.tsx";

type MiniNewsProps = {
  img: string;
  title: string;
  href: string;
};

const linkTextStyle = {
  color: "var(--text2)",
  lineClamp: 2,
};

export const MiniNews = ({ img, title, href }: MiniNewsProps) => (
  <Card>
    <p
      style={{
        fontSize: "1rem",
        display: "grid",
        gridTemplateColumns: "128px 1fr",
      }}
    >
      <img src={img} alt={title} />
      <a href={href} style={linkTextStyle}>
        {title}
      </a>
    </p>
  </Card>
);
