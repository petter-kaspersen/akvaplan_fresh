import { ApnSym, Card, Icon } from "akvaplan_fresh/components/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";

import { type Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

import { Head } from "$fresh/runtime.ts";

interface Props {
  person: Akvaplanist;
  lang: string;
}

// TODO: Handle lang variants (for position, unit, etc.)
export function PeopleCard({ person, lang }: Props) {
  return (
    <Card customClass="people-card">
      <Head>
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>
      <h3 class="people-name">
        <span style={{ color: "var(--text1)" }}>{person.given}</span>
        &nbsp;
        <span style={{ color: "var(--text2)" }}>{person.family}</span>
      </h3>
      <ApnSym width="2rem" />
      <span class="people-position">
        {person.position?.[lang ?? "no"] ?? ""}
      </span>

      <span class="people-workplace">
        <a
          style={{ color: "var(--text2)" }}
          href={`/no/folk/unit/${person.unit}`}
        >
          {t(`${person.unit}`)}
        </a>,{" "}
        <a
          href={`/no/folk/workplace/${person.workplace}`}
          style={{ color: "var(--text2)" }}
        >
          {person.workplace}
        </a>
      </span>

      <div class="">
        <a
          href={`tel:${person.tel}`}
        >
          <Icon name="phone_in_talk"></Icon>
        </a>
        <a
          href={`mailto:${person.email}`}
        >
          <Icon name="contact_mail"></Icon>
        </a>
      </div>
    </Card>
  );
}
