import { akvaplanistMap } from "akvaplan_fresh/services/akvaplanist.ts";
import { personURL } from "akvaplan_fresh/services/nav.ts";

import { ApnSym, Card, Icon } from "akvaplan_fresh/components/mod.ts";

import { t } from "akvaplan_fresh/text/mod.ts";

import { type Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

import { Head } from "$fresh/runtime.ts";

interface PeopleProps {
  id?: string;
  person?: Akvaplanist;
  lang?: string;
}
const people = await akvaplanistMap();
// TODO: Handle lang variants (for position, unit, etc.)

export function PeopleCard(
  {
    person,
    lang,
    id,
  }: PeopleProps,
) {
  if (people.has(id)) {
    person = { id, ...people.get(id) };
  }

  const { tel, email, name, given, family, position, unit, workplace } =
    person ?? {};

  return (
    <Card customClass="people-card">
      <Head>
        <link rel="stylesheet" href="/css/article.css" />
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>

      <div class="people-name">
        {name?.length > 1
          ? <span>{name}</span>
          : (
            <a href={personURL({ id, given, family })}>
              <span style={{ color: "var(--text1)" }}>{given}</span>
              &nbsp;
              <span style={{ color: "var(--text2)" }}>{family}</span>
            </a>
          )}
      </div>
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
