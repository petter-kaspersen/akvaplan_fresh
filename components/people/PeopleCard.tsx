import { Head } from "$fresh/runtime.ts";
import { Akvaplanist } from "akvaplan_fresh/services/akvaplanist.ts";
import { Card } from "akvaplan_fresh/components/card.tsx";
import { t } from "akvaplan_fresh/text/mod.ts";
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
        <span style={{ color: "var(--text2)" }}>{person.given}</span>
        &nbsp;
        <span style={{ color: "var(--text1)" }}>{person.family}</span>
      </h3>
      <span class="people-position">{person.position.no}</span>
      <span class="people-unit">{t(`unit.${person.unit}`)}</span>
      <span class="people-workplace">{person.workplace}</span>
      <div class="people-card__contact">
        <a
          class="people-button people-phone-button"
          href={`tel:${person.tel}`}
        >
        </a>

        <a
          class="people-button people-email-button"
          href={`mailto:${person.email}`}
        >
        </a>
        <a
          class="people-link people-email-link"
          href={`mailto:${person.email}`}
        >
          {person.email}
        </a>
      </div>
    </Card>
  );
}
