import PubsHistogram from "../islands/pubs_histogram.tsx";
import { SlimCard } from "../components/slim_card.tsx";
import { type SlimPublication } from "@interfaces/slim_publication.ts";
import { useSignal } from "@preact/signals";

export interface DoiSearchResultsProps {
  results: SlimPublication[];
  q: string;
  start?: number;
}

// @todo Implement proper search, currently just naive string filtering
const lowjson = (x: unknown) => JSON.stringify(x).toLocaleLowerCase();
const naiveSearchFilter = (value: string) => (slim, i) =>
  lowjson(slim).includes(value.toLocaleLowerCase());

export default function DoiSearchResults(
  { q, results, start }: DoiSearchResultsProps,
) {
  const query = useSignal(q);
  const filtered = useSignal(results);
  const first = useSignal(true);

  const handleSearch = ({ target: { value } }) => {
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
      <label>
        Søk i publikasjoner
        <form autocomplete="off">
          <label>
            Søk…<input
              type="search"
              name="q"
              value={query.value}
              onInput={handleSearch}
            />
          </label>
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
