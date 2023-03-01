import PubsHistogram from "../islands/pubs_histogram.tsx";
import { SlimCard } from "../components/slim_card.tsx";
import { type SlimPublication } from "../@interfaces/slim_publication.ts";

import { useSignal } from "@preact/signals";
const css = `form {
  display: grid;
}

form > input {
    flex: 1 1 10ch;
    margin: .5rem
  }

form > input[type="search"] {
  flex: 3 1 10ch;
}

input {
  border: none;
  background: hsl(0, 0%, 93%);
  border-radius: .5rem;
  padding: .75rem 1rem
}

button[type="submit"] {
  
  }
`;
export interface DoiSearchResultsProps {
  results: SlimPublication[];
  q: string;
  start?: number;
}

// @todo DoiSearch: implement proper search, currently just naive string filtering
// @todo DoiSearch: unicode normalization
const lowjson = (x: unknown) => JSON.stringify(x).toLocaleLowerCase();
const naiveSearchFilter = (value: string) => (slim, i) =>
  lowjson(slim).includes(value.toLocaleLowerCase());

export default function DoiSearch(
  { q, results, start }: DoiSearchResultsProps,
) {
  const query = useSignal(q);
  const filtered = useSignal(results);
  const first = useSignal(true);

  const handleSearch = async ({ target: { value } }) => {
    const r = await fetch(value);
    console.warn(r);
    filtered.value = results.filter(naiveSearchFilter(value));
    query.value = value;
  };

  // Handle search via URL q (on first load)
  if (first.value === true && q.length > 0) {
    first.value = false;
    handleSearch({ target: { value: q } });
  }

  return (
    <main style={{ background: "var(--surface1)" }}>
      <style>{css}</style>
      <label>
        Søk i publikasjoner
        <form
          autocomplete="off"
          style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
        >
          <input
            type="search"
            name="q"
            value={query}
            onInput={handleSearch}
          />

          <button type="submit">Search</button>
        </form>
      </label>
      <PubsHistogram period="2000/" />
      {filtered.value.slice(0, 100).map((slim, n) => (
        <SlimCard slim={slim} n={n} />
      ))}
    </main>
  );
}
