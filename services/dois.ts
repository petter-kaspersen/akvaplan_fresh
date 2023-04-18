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

  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  }
};

export const getSlimPublication = async (
  doi: string,
): Promise<SlimPublication | undefined> => {
  const base = Deno?.env?.get("dois_base") ?? DOIS_BASE;
  const url = new URL(`/doi/${doi}`, base);
  const response = await fetch(url);
  if (response.ok) {
    const slim: SlimPublication = await response.json();
    return slim;
  }
};
