import { personURL } from "akvaplan_fresh/services/nav.ts";
import { t } from "akvaplan_fresh/text/mod.ts";

import {
  Akvaplanist,
  News,
  //NewsMapperArgs,
} from "akvaplan_fresh/@interfaces/mod.ts";

export const newsFromAkvaplanists =
  ({ lang }) =>
  ({ given, family, created, unit, workplace }: Akvaplanist): News => ({
    title: `${given} ${family} ${t("people.employed_in")} ${
      t(`unit.${unit}`)
    }, ${workplace}`,
    //href:
    hreflang: lang,
    published: created ?? new Date(),
    type: "person",
  });
