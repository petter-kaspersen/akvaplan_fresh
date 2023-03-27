import { Head } from "$fresh/runtime.ts";

import { Akvaplanist } from "../../services/akvaplanist.ts";
import { Card } from "../card.tsx";

interface Props {
  person: Akvaplanist;
}

// TODO: Implement this
const unitToReadable = (unit: string) => unit;

// TODO: Get lang, for now just use 'no'
export function PeopleCard({ person }: Props) {
  return (
    <Card customClass="people-card">
      <Head>
        <link rel="stylesheet" href="/css/people-card.css" />
      </Head>
      <h3 class="people-name">
        {person.given} {person.family}
      </h3>
      <span class="people-position">{person.position.no}</span>
      <span class="people-unit">{unitToReadable(person.unit)}</span>
      <span class="people-workplace">{person.workplace}</span>
      <div class="people-card__contact">
        <a
          class="people-button people-phone-button"
          href={`tel:${person.tel}`}
        ></a>

        <a class="people-link people-phone-link" href={`tel:${person.tel}`}>
          {person.tel}
        </a>
      </div>
    </Card>
  );
}
