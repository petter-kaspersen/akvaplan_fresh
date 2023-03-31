import { t } from "akvaplan_fresh/text/mod.ts";

import {
  Akvaplanist,
  News,
  //NewsMapperArgs,
} from "akvaplan_fresh/@interfaces/mod.ts";

const units = {
  "INNOV": "Akvakultur innovasjon",
  "INSPM": "Akvakultur inspeksjoner og miljø",
  "PRODB": "Akvakultur produksjon og bærekraft",
  "BIOLT": "Biologiske analyser og taksonomi",
  "DIGIS": "Digitale løsninger",
  "FISLOG": "Feltinfrastruktur og logistikk",
  "FISK": "Forsknings- og Innovasjonsenter Kraknes",
  "KJEMI": "Kjemilab",
  "LEDELS": "Ledelse",
  "MILPÅ": "Miljøpåvirkninger",
  "SENSE": "Miljørisiko- og beredskapsanalyser",
  "UTRED": "Miljøutredning og overvåking",
  "OSEAN": "Oseanografi",
  "STABS": "Stab og støtte",
  "ØKOSY": "Økosystemforståelse",
};

export const newsFromAkvaplanists =
  ({ lang }) =>
  ({ given, family, created, unit, workplace }: Akvaplanist): News => ({
    title: `${given} ${family} ${t("people.employed_in")} ${units
      ?.[unit]}, ${workplace}`,
    //href:
    hreflang: lang,
    published: created ?? new Date(),
    type: "person",
  });
