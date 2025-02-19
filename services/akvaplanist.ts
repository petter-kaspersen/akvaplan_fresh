import { alias, offices } from "akvaplan_fresh/services/mod.ts";
import { normalize as n, tr } from "akvaplan_fresh/text/mod.ts";
import { Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

export const base = "https://akvaplanists.deno.dev";

const _all: Akvaplanist[] = [];

export const akvaplanists = async (): Promise<Akvaplanist[] | undefined> => {
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
  //throw "Failed fetching akvaplanists";
};

export const akvaplanistMap = async () => {
  const all = await akvaplanists() ?? [];
  return new Map(all?.map(({ id, ...apn }) => [id, { id, ...apn }]));
};

export const getAkvaplanist = async (id: string) =>
  (await akvaplanistMap()).get(id);

export const findAkvaplanist = async (
  { id, given, family }: Akvaplanist,
): Promise<Akvaplanist | undefined> => {
  const all = await akvaplanistMap();

  if (id) {
    return all.get(id);
  }
  const aliaskey = `${given}|${family}`;
  if (!id && alias.has(aliaskey)) {
    return all.get(alias.get(aliaskey));
  } else {
    const exact = [...all.entries()].find(([id, p]) =>
      n(p.family) === n(family) && n(p.given) === n(given)
    );
    if (exact?.id?.length > 0) {
      return exact;
    } else {
      const familyAndInitial = [...all.values()].filter((p) =>
        p.family === family && [...p.given].at(0) === [...given].at(0)
      );
      return familyAndInitial.length === 1 ? familyAndInitial.at(0) : undefined;
    }
  }
};

export const getAugmentedAkvaplanists = async (): Akvaplanist[] =>
  (await akvaplanists()).map(
    ({ workplace, unit, management, ...p }) => {
      const unitnames = ["en", "no"].map((lang) =>
        tr.get(lang)?.get(`unit.${unit}`)
      );
      const groups = [];
      if (management === true) {
        groups.push("ledelse");
        groups.push("management");
      }
      const office = offices.get(workplace);
      const name = `${p.given} ${p.family}`;
      // @todo akvaplanist.tsx: implement proper search (and indexing)
      // FIXME English worktitles
      p.search = JSON.stringify({ unitnames, groups, office, name });
      p.unit = unit;

      // {
      //   position?.[lang ?? "no"] ?? "";
      // }
      return { workplace, unit, management, ...p };
    },
  );

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

export const groupByFamily0 = ({ family }: Akvaplanist) => [...family].at(0);
export const groupByManagement = ({ management }: Akvaplanist) => {
  return management === true ? "" : undefined;
};

export const buildGroupFX = ({ group, filter }) => {
  switch (group) {
    case "given0":
      return groupByGiven0;
    case "family0":
      return groupByFamily0;
    case "management":
      return groupByManagement;
    default:
      return (p: Akvaplanist) => p?.[group] ?? "_";
  }
};

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
  "id": "mkr",
  "given": "Merete",
  "family": "Kristiansen",
  "position": {
    "no": "Administrerende direktør",
    "en": "Managing Director",
  },
  "tel": "+4797518909",
  "email": "mkr@akvaplan.niva.no",
};

export const akvaplan = {
  name: "Akvaplan-niva",
  tel: "+47 77 75 03 00",
  email: "info@akvaplan.niva.no",
  addr: {
    hq: {
      visit: "Framsenteret, 9296 Tromsø, Norway",
      post: "Framsenteret, Postbox 6606, Stakkevollan, 9296 Tromsø, Norway",
    },
  },
};
