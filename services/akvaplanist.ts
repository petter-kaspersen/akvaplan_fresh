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

export const akvaplanistMap = async () => {
  const all = await akvaplanists();
  return new Map(all.map(({ id, ...apn }) => [id, apn]));
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
export const groupByGiven0 = ({ given }: Akvaplanist) => [...given].at(0);
export const groupByChar0 = (key: string) => (a: Akvaplanist) =>
  [...a?.[key]].at(0);

export const boardUpdated = "2023-01-23";
export const boardKid = 20230000030372;

export const boardURL = (
  lang: string,
  { kid = boardKid, spraak = lang === "en" ? "en" : "nb" } = {},
) =>
  `https://w2.brreg.no/kunngjoring/hent_en.jsp?kid=${kid}&sokeverdi=937375158&spraak=${spraak}`;

//@todo Get director from service
export const admDir = {
  "given": "Merete",
  "family": "Kristiansen",
  "position": {
    "no": "Administrerende direktør",
    "en": "Managing Director",
  },
  "tel": "+4797518909",
  //"unit": "LEDELS",
  //"workplace": "Tromsø",
  "email": "mkr@akvaplan.niva.no",
};
