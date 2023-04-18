import { ApnSym, Card, Icon } from "akvaplan_fresh/components/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";

import { personURL } from "akvaplan_fresh/services/nav.ts";

import { type Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

import { Head } from "$fresh/runtime.ts";

interface PeopleProps {
  person: Akvaplanist;
  lang: string;
}

// TODO: Handle lang variants (for position, unit, etc.)
export function PeopleCard(
  {
    person: { id, tel, email, name, given, family, position, unit, workplace },
    lang,
  }: PeopleProps,
) {
  return (
    <Card customClass="people-card">
      <Head>
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>

      <h2 class="people-name">
        {name?.length > 1
          ? <span>{name}</span>
          : (
            <a href={personURL({ id, given, family })}>
              <span style={{ color: "var(--text1)" }}>{given}</span>
              &nbsp;
              <span style={{ color: "var(--text2)" }}>{family}</span>
            </a>
          )}
      </h2>
      <ApnSym width="2rem" />
      <span class="people-position">
        {position?.[lang ?? "no"] ?? ""}
      </span>

      <div class="people-workplace">
        {unit && (
          <a
            style={{ color: "var(--text2)" }}
            href={`/no/folk/unit/${unit}`}
          >
            {t(`unit.${unit}`)}
          </a>
        )}
      </div>
      {workplace?.length > 0 && (
        <div class="people-workplace">
          <a
            href={`/no/folk/workplace/${workplace}`}
            style={{ color: "var(--text2)" }}
          >
            {workplace}
          </a>
        </div>
      )}

      <div class="">
        {tel && (
          <a
            href={`tel:${tel}`}
          >
            <Icon name="phone_in_talk"></Icon>
          </a>
        )}
        <a
          href={`mailto:${email}`}
          aria-label={email}
        >
          <Icon name="contact_mail"></Icon>
        </a>
      </div>
    </Card>
  );
}
