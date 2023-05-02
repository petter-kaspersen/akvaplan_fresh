import { buildContainsFilter } from "akvaplan_fresh/search/filter.ts";

const DOIS_BASE = "https://dois.deno.dev";

const defaults = {
  q: "",
  sort: "-published",
  limit: "-1",
};

const { entries } = Object;

export const search = async (params: Record<string, string> = {}) => {
  const base = Deno?.env?.get("dois_base") ?? DOIS_BASE;
  const url = new URL("/doi", base);
  const { searchParams } = url;

  entries(defaults).map(([k, v]) => searchParams.set(k, v));
  entries(params).map(([k, v]) => searchParams.set(k, v));

  const response = await fetch(url).catch(() => {});

  if (response?.ok) {
    const res = await response.json();

    if (params?.q?.length > 0 && res?.data?.length) {
      const data = res.data.filter(buildContainsFilter(params.q));
      res.data = data;
    }
    return res;
  }
};

// export const multiSearchPubs = async (
//   queries: string[],
//   types: string[],
//   opts: Record<string, string>,
// ) => {
//   const result = new Map<string, unknown>();
//   const limit = opts?.limit ?? 64;

//   for await (const q of new Set([...queries])) {
//     for await (const type_of_media of new Set([...types])) {
//       const { items } = await searchMynewsdesk({ q, type_of_media, limit });
//       if (items) {
//         for (const n of items) {
//           result.set(n.id, n);
//         }
//       }
//     }
//   }
//   return [...result.values()];
// };

export const getSlimPublication = async (
  doi: string,
): Promise<SlimPublication | undefined> => {
  const base = Deno?.env?.get("dois_base") ?? DOIS_BASE;
  const url = new URL(`/doi/${doi}`, base);
  const response = await fetch(url).catch(() => {});
  if (response?.ok) {
    const slim: SlimPublication = await response.json();
    return slim;
  }
};

// Top 20 authors (by article count)
// {"name":"IMSLAND A","count":173}
// {"name":"FALK-PETERSEN S","count":163}
// {"name":"RENAUD P","count":136}
// {"name":"CARROLL J","count":88}
// {"name":"CAMUS L","count":85}
// {"name":"FOSS A","count":81}
// {"name":"BERGE J","count":79}
// {"name":"CARROLL M","count":61}
// {"name":"STEFANSSON S","count":59}
// {"name":"VARPE Ø","count":59}
// {"name":"GABRIELSEN G","count":53}
// {"name":"DAHLE S","count":52}
// {"name":"AMBROSE W","count":52}
// {"name":"HALSBAND C","count":50}
// {"name":"CHRISTENSEN G","count":49}
// {"name":"EVENSET A","count":45}
// {"name":"LEU E","count":44}
// {"name":"HATTERMANN T","count":34}
// {"name":"BLEVIN P","count":34}
// {"name":"COCHRANE S","count":33}
