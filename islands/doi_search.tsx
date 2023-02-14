import { SlimPublication } from "../@interfaces/slim_publication.ts";

import { useSignal } from "@preact/signals";
import { SlimCard } from "../components/slim_card.tsx";

export interface DoiSearchResultsProps {
  results: SlimPublication[];
  q: string;
  start?: number;
}

const lowjson = (x: unknown) => JSON.stringify(x).toLocaleLowerCase();

const naiveSearchFilter = (value) => (slim, i) =>
  lowjson(slim).includes(value.toLocaleLowerCase());

export default function DoiSearchResults(
  { q, results, start }: DoiSearchResultsProps,
) {
  const query = useSignal(q);
  const filtered = useSignal(results);

  const handleSearch = ({ target: { value } }) => {
    filtered.value = results.filter(naiveSearchFilter(value));
    query.value = value;
  };

  if (q.length > 0 && query.value === q) {
    handleSearch({ target: { value: q } });
  }

  return (
    <main>
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
      {filtered.value.slice(0, 100).map((slim, n) => (
        <SlimCard slim={slim} n={n} />
      ))}
    </main>
  );
}
