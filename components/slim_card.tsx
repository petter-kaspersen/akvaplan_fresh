import { Card } from "./card.tsx";
import { SlimPublication } from "../@interfaces/slim_publication.ts";

export function SlimCard(props: { slim: SlimPublication; n: number }) {
  const {
    title,
    doi,
    container,
    printed,
    type,
    published,
    license,
    pdf,
    cites,
    authors,
  } = props.slim;
  const n = props.n;
  return (
    <li value={n} style={{ margin: "1rem" }}>
      <Card>
        <header>
          <a href={`/doi/${doi}`} dangerouslySetInnerHTML={{ __html: title }} />
        </header>{" "}
        <p style={{ fontSize: "1rem" }}>
          {authors.map(({ family }, n) => (
            <span>{family}{n === authors.length - 1 ? null : ", "}</span>
          ))}. <em dangerouslySetInnerHTML={{ __html: container }} />{" "}
          (<time>{published}</time>)
        </p>
      </Card>
    </li>
  );
}
