const base = "https://akvaplanists.deno.dev";

export interface Akvaplanist {
  given: string;
  family: string;
  position: Position;
  tel: string;
  unit: string;
  workplace: string;
  country: string;
  id: string;
}

export interface Position {
  [lang: string]: string;
}

export const akvaplanists = async (): Promise<Akvaplanist[]> => {
  const r = await fetch(base);
  if (r.ok) {
    const empl = await r.json();
    return empl.map((p) => {
      const { en, no, nb } = p.position;
      if (!no) {
        p.position.no = nb;
      }
      if (!en) {
        p.position.en = nb;
      }
      return p;
    });
  }
  throw "Failed fetching akvaplanists";
};
