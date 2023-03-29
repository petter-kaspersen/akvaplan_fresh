const base = "https://dois.deno.dev";

const defaults = {
  q: "",
  sort: "-published",
  limit: "-1",
};

const { entries } = Object;

export const search = async (params: URLSearchParams = {}) => {
  const url = new URL("/doi", base);
  const { searchParams } = url;

  entries(defaults).map(([k, v]) => searchParams.set(k, v));
  entries(params).map(([k, v]) => searchParams.set(k, v));

  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  }
};
