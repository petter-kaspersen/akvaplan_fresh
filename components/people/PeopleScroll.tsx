import { Akvaplanist } from "../../services/akvaplanist.ts";
import HScroll from "../hscroll/HScroll.tsx";
import { PeopleCard } from "./PeopleCard.tsx";

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
