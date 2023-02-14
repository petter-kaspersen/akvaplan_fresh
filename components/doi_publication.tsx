import { SlimPublication } from "../@interfaces/slim_publication.ts";

export function DoiPublication(slim: SlimPublication) {
  return (
    <article>
      {JSON.stringify(slim)}
    </article>
  );
}
