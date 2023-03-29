import {
  type Akvaplanist,
  akvaplanists,
  buildPeopleGrouper,
  groupByGivenInitial0,
} from "akvaplan_fresh/services/akvaplanist.ts";

import { PeopleScroll } from "akvaplan_fresh/components/people/PeopleScroll.tsx";
import { PeopleCard } from "akvaplan_fresh/components/people/PeopleCard.tsx";
import { Page } from "akvaplan_fresh/components/page.tsx";
import { lang, t } from "akvaplan_fresh/text/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";
import AkvaplanistHeader from "../components/akvaplanist/AkvaplanistHeader.tsx";

interface AkvaplanistsProps {
  people: Akvaplanist[];

  results: Akvaplanist[];

  group: string;

  filter: string;

  grouped: Map<string, Akvaplanist[]>;
  lang: string;
  base: string;
  title: string;
  q?: string;
}

export const config: RouteConfig = {
  routeOverride:
    "{/:lang}?/:page(people|folk|ansatte|employees|akvaplanist){/:groupname}?{/:filter}?",
};
const _ = (s: string) => s?.toLowerCase();
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;

    const { groupname, filter } = params;
    const group = groupname?.length > 0 ? groupname : "gn0";

    lang.value = ["en", "no"].includes(params.lang) ? params.lang : "no"; // lang is optional for legacy URL (/ansatte)
    const page = ["employees", "people"].includes(params.page)
      ? "people"
      : "folk";
    const base = `/${lang}/${page}/`;

    const fx = group === "gn0"
      ? groupByGivenInitial0
      : (p: Akvaplanist) => p?.[group] ?? "_";

    const people = await akvaplanists();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    const filtered = (filter?.length > 0)
      ? [...people].filter((p: Akvaplanist) => _(p?.[group]) === _(filter))
      : people;

    // @todo akvaplanist.tsx: implement proper search (and indexing)
    // Need to expand codes prior to indexing

    const results = filtered.filter((p) =>
      q?.length > 0 ? _(JSON.stringify(p)).includes(_(q)) : true
    );

    const grouped = (results).reduce(
      buildPeopleGrouper(fx),
      new Map(),
    );

    const title = t("People");

    return ctx.render({
      lang,
      base,
      title,
      people,
      grouped,
      group,
      filter,
      results,
      q,
    });
  },
};

const Grouped = (
  { grouped, group, q },
) => (
  <div>
    <form
      autocomplete="off"
      style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
    >
      <input
        type="search"
        name="q"
        value={q}
      />

      <button type="submit">{t("Search")}</button>
    </form>

    {
      /* <a class="button" href="gn0">
      {t("filter.given")}
    </a> */
    }
    <a class="button" href="unit">{t("filter.unit")}</a>
    <a class="button" href="workplace">{t("filter.workplace")}</a>
    {[...grouped].map(([grpkey, grpmembers]) => (
      <div>
        <h3>
          <a href={`${group}/${grpkey.toLowerCase()}`}>{grpkey}</a>
        </h3>
        <PeopleScroll people={grpmembers} />
      </div>
    ))}
  </div>
);
const inline = {
  display: "inline-block",
};
const OneGroup = (
  { members },
) => (
  <ul style={inline}>
    {members.map((member: Akvaplanist) => (
      <li style={inline}>
        <PeopleCard person={member} key={member.id} />
      </li>
    ))}
  </ul>
);

export default function Akvaplanists(
  { data: { lang, base, title, people, grouped, group, filter, results, q } }:
    PageProps<
      AkvaplanistsProps
    >,
) {
  const H1Title = () =>
    filter?.length > 0
      ? (
        <h1>
          {t(`${group}.${filter}`)} / <a href=".">{t("People")}</a>
        </h1>
      )
      : (
        <h1>
          <a href=".">{t("People")}</a>
        </h1>
      );

  const pagetitle = filter?.length > 0
    ? `${group}.${t(filter)} / ${t("People")}`
    : t("People");
  return (
    <Page title={pagetitle} base={base}>
      <AkvaplanistHeader
        source={`https://preview.sdl.no/v2/dam/DOiHX8lbQY9ROzHB5tb3xg/aPpeSOfAWDA?v=1673954066472`}
        alt={`Alt text here`}
        title="People"
        subtitle="Mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit"
      />
    </Page>
  );
}
