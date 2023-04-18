import { Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

import HScroll from "../hscroll/HScroll.tsx";
import { PeopleCard } from "akvaplan_fresh/components/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";
type Props = {
  people: Akvaplanist[];
};

export function PeopleScroll({ people }: Props) {
  return (
    <HScroll scrollerId="people-scroll">
      {people.map((person) => <PeopleCard person={person} key={person.id} />)}
    </HScroll>
  );
}

export const GroupedPeople = (
  { grouped, group },
) => (
  <div>
    {[...grouped].map(([grpkey, grpmembers]) => (
      <div>
        <h3>
          <a href={`${group}/${grpkey.toLowerCase()}`}>
            {group === "unit" ? t(`unit.${grpkey}`) : grpkey}
          </a>
        </h3>
        <HScroll scrollerId="news-scroll">
          {grpmembers.map((person) => (
            <PeopleCard
              person={person}
              key={person.id}
            />
          ))}
        </HScroll>
      </div>
    ))}
  </div>
);
