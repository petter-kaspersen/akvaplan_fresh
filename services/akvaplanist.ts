import { Reducer } from "https://esm.sh/v111/preact@10.13.0/hooks/src/index.js";

const base = "https://akvaplanists.deno.dev";

export interface Akvaplanist {
  given: string;
  family: string;
  position: Position;
  tel?: string;
  unit?: string;
  workplace?: string;
  country?: string;
  id?: string;
  email?: string;
}

export interface Position {
  [lang: string]: string;
}

const _all: Akvaplanist[] = [];

export const akvaplanists = async (): Promise<Akvaplanist[]> => {
  if (_all?.length > 0) {
    return _all;
  }
  const r = await fetch(base);
  if (r.ok) {
    const empl = await r.json();
    return empl.map((p: Akvaplanist, i: number) => {
      const { en, no, nb } = p.position;
      if (!no) {
        p.position.no = nb;
      }
      if (!en) {
        p.position.en = nb;
      }
      if (!p.email) {
        p.email = p.id + "@akvaplan.niva.no";
      }
      _all[i] = p;
      return p;
    });
  }
  throw "Failed fetching akvaplanists";
};

export const reducePeopleByKey = (key: string) =>
(
  previous: Map<string, Akvaplanist[]>,
  current: Akvaplanist,
) => {
  const grp = current?.[key] ?? "_";
  if (!previous.has(grp)) {
    previous.set(grp, [current]);
  } else {
    previous.set(grp, [...previous.get(grp) ?? [], current]);
  }
  return previous;
};

export const buildPeopleGrouper = (fx) =>
(
  previous: Map<string, Akvaplanist[]>,
  current: Akvaplanist,
) => {
  const grp = fx(current);
  if (!previous.has(grp)) {
    previous.set(grp, [current]);
  } else {
    previous.set(grp, [...previous.get(grp) ?? [], current]);
  }
  return previous;
};
export const groupByGivenInitial0 = ({ given }: Akvaplanist) =>
  [...given].at(0);
