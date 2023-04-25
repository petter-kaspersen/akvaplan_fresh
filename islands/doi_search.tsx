// import PubsHistogram from "../islands/pubs_histogram.tsx";
// <PubsHistogram period="2000/" />

import { buildContainsFilter } from "akvaplan_fresh/search/filter.ts";
import { lang, normalize, t } from "akvaplan_fresh/text/mod.ts";

import { SlimCard } from "../components/slim_card.tsx";

import { type SlimPublication } from "../@interfaces/slim_publication.ts";

// form > input {
//   flex: 1 1 10ch;
//   margin: .5rem
// }

import { useSignal } from "@preact/signals";
const css = `form {
  display: grid;
}



form > input[type="search"] {
  flex: 3 1 10ch;
}

input {
  border: none;

  border-radius: .5rem;
  padding: .75rem 1rem
}

`;
export interface DoiSearchResultsProps {
  results: SlimPublication[];
  all: SlimPublication[];
  q: string;
  start?: number;
}

export default function DoiSearch(
  { q, results, start, all }: DoiSearchResultsProps,
) {
  const query = useSignal(q);
  const filtered = useSignal(results);
  const first = useSignal(true);
  const found = useSignal(all.length);
  const total = all.length;

  const handleSearch = ({ target: { value } }: Event) => {
    filtered.value = all.filter(buildContainsFilter(value));
    found.value = filtered.value.length;
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
      <label for="pubs-search">
        {t("pubs.search.Label")}
      </label>
      <form
        id="pubs-search"
        autocomplete="off"
        style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
      >
        <input
          type="search"
          name="q"
          placeholder={t("pubs.search.placeholder")}
          value={query}
          onInput={handleSearch}
        />

        <button type="submit">{t("pubs.Search")}</button>
      </form>
      <p style={{ fontSize: "1rem" }}>{found}/{total}</p>

      <ol>
        {filtered.value.slice(0, 200).map((slim, n) => (
          <SlimCard slim={slim} n={n} lang={lang.value} />
        ))}
      </ol>
    </main>
  );
}
