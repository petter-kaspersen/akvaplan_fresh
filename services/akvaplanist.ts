import { Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";
export const base = "https://akvaplanists.deno.dev";

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
  map: Map<string, Akvaplanist[]>,
  person: Akvaplanist,
) => {
  const grp = person?.hasOwnProperty(key) ? person[key] : "_";
  if (!map.has(grp)) {
    map.set(grp, [person]);
  } else {
    map.set(grp, [...map.get(grp) ?? [], person]);
  }
  return map;
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
