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
    <Card>
      <h3>
        <a href={`/doi/${doi}`}>
          {title}
        </a>
      </h3>
      <time>
        ({published})
      </time>
      <code>
      </code>
    </Card>
  );
}
