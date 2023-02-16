import { Card } from "./card.tsx";
import { SlimPublication } from "@interfaces/slim_publication.ts";

export function SlimCard(props: { slim: SlimPublication; n: number }) {
  const { title, doi, published, ...rest } = props.slim;
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
        {JSON.stringify(rest)}
      </code>
    </Card>
  );
}
