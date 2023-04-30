import {
  akvaplanists,
  buildPeopleGrouper,
  //groupByChar0,
  groupByGiven0,
} from "akvaplan_fresh/services/akvaplanist.ts";
import {
  multiSearchMynewsdesk,
  newsFromMynewsdesk,
} from "akvaplan_fresh/services/mod.ts";

import { buildContainsFilter } from "akvaplan_fresh/search/filter.ts";

import {
  GroupedPeople,
  PeopleScroll,
} from "akvaplan_fresh/components/people/PeopleScroll.tsx";
import { PeopleCard } from "akvaplan_fresh/components/people/PeopleCard.tsx";
import {
  ArticleSquare,
  HScroll,
  NewsFilmStrip,
  Page,
} from "akvaplan_fresh/components/mod.ts";
import { lang, normalize, t, tr } from "akvaplan_fresh/text/mod.ts";

import { type Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

import {
  type HandlerContext,
  type Handlers,
  type PageProps,
  type RouteConfig,
} from "$fresh/server.ts";

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
const pipe = <span>{" "}|{" "}</span>;
export const config: RouteConfig = {
  routeOverride:
    "{/:lang}?/:page(people|folk|ansatte|employees|akvaplanist|person){/:groupname}?{/:filter}?{/:fn}?{/:gn}?",
};
const _ = (s: string) => s?.toLowerCase();
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { params } = ctx;

    const { groupname, filter } = params;
    const group = groupname?.length > 0 ? groupname : "gn0";

    // lang is optional for legacy URL (/ansatte)
    lang.value = ["en", "no"].includes(params.lang) ? params.lang : "no";

    const page = ["employees", "people"].includes(params.page)
      ? "people"
      : "folk";
    const base = `/${lang}/${page}/`;

    const fx = group === "gn0"
      ? groupByGiven0
      : (p: Akvaplanist) => p?.[group] ?? "_";

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const sortkey = searchParams.get("sort") ?? "given";
    const sort = (a: Akvaplanist, b: Akvaplanist) =>
      a?.[sortkey].localeCompare(b?.[sortkey]);

    const people = (await akvaplanists()).sort(sort).map(({ unit, ...p }) => {
      // @todo akvaplanist.tsx: implement proper search (and indexing)
      // FIXME Fix ledelse as separate prop (in service!)
      const unitnames = ["en", "no"].map((lang) =>
        tr.get(lang).get(`unit.${unit}`)
      );
      if ("LEDELS" === unit) {
        unitnames.push("ledelse");
        unitnames.push("management");
      }
      p.search = JSON.stringify({ unitnames });
      p.unit = unit;
      // {
      //   position?.[lang ?? "no"] ?? "";
      // }
      return p;
    });
    // const news = (await searchNews({ q: "", lang: "no", limit: 64 })).filter((
    //   { type },
    // ) => "person" === type);

    const filtered = (filter?.length > 0)
      ? [...people].filter((p: Akvaplanist) => _(p?.[group]) === _(filter))
      : people;

    const queryFilter = q?.length > 0 ? buildContainsFilter(q) : () => true;
    const results = filtered.filter(queryFilter);

    const grouped = (results).reduce(
      buildPeopleGrouper(fx),
      new Map(),
    );

    const title = t("people.People");

    const person = ("id" === group && results.length === 1)
      ? results.at(0)
      : {};

    //@todo Person Country is TELEPHONE
    //FIXME Person API.

    //@todo separate route for 1 person!?
    let news = [];
    if (person.family && person.given) {
      const containsFamily = buildContainsFilter(person.family);
      const containsGiven = buildContainsFilter(person.given);

      const _news = await multiSearchMynewsdesk(
        [person.family, person.given],
        ["news", "pressrelease"],
        { limit: 64 },
      );

      const _filteredNews = (_news ?? []).filter((mnd) =>
        containsFamily(mnd) && containsGiven(mnd)
      );

      news = _filteredNews.map(newsFromMynewsdesk({ lang: "en" }));
    }

    return ctx.render({
      lang,
      base,
      title,
      total: people.length,
      grouped,
      group,
      filter,
      results,
      news,
      person,
      q,
    });
  },
};

const inline = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
  gridGap: "1rem",
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

const before = "bb7x8e4rmevc5kboua8e";
const frida = "viemsy7cszuo7laedtcd";
const id = frida;

const banner =
  `https://resources.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_1782,ar_6:1/${id}`;

const Picture = () => (
  <picture>
    <source media="(min-width: 1024px)" srcset={banner} />
    <source
      media="(max-width: 1023px)"
      srcset={`https://resources.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_512,ar_3:1/${id}`}
    />
    <img
      src={banner}
      alt=""
    />
  </picture>
);
{/* <img src={banner} alt={caption} title={caption} /> */}

const H1ATitle = ({ filter, text, group }) =>
  filter?.length > 0
    ? (
      <h1>
        {t(`${group}.${filter}`)} / <a href=".">{text}</a>
      </h1>
    )
    : (
      <h1>
        <a href=".">{text}</a>
      </h1>
    );

const PeopleSearchForm = ({ q }) => (
  <form autocomplete="off">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        marginBlockStart: "1rem",
        paddingBlockEnd: "2rem",
      }}
    >
      <input
        type="search"
        name="q"
        value={q}
        placeholder={t("people.search.placeholder")}
      />

      <button type="submit">{t("Search")}</button>
    </div>

    <menu
      style={{
        display: "grid",
        justifyContent: "end",
        fontSize: "1rem",
      }}
    >
      <p>
        <label>{t("people.group_by")}</label>:{" "}
        <a class="" href="gn0">{t("people.gn")}</a> {pipe}
        {/* <a class="" href="fn0">{t("people.fn")}</a> {pipe} */}
        <a class="" href="unit">{t("people.unit")}</a> {pipe}
        <a class="" href="workplace">{t("people.workplace")}</a>
      </p>
      {
        /* <p>
    <label for="sort-select">{t("people.Sort")}:</label>

    <select name="sort" id="sort-select">
      <option value="family">{t("people.given")}</option>
      <option value="family">{t("people.family")}</option>
      <option value="unit">{t("people.unit")}</option>
    </select>
  </p> */
      }
    </menu>
    <p>{t("people.subtitle")}</p>
  </form>
);

export default function Akvaplanists(
  {
    data: {
      lang,
      base,
      title,
      total,
      grouped,
      group,
      filter,
      results,
      q,
      person,
      news,
    },
  }: PageProps<
    AkvaplanistsProps
  >,
) {
  let pagetitle = filter?.length > 0
    ? `${group}.${t(filter)} / ${t("People")}`
    : t("People");

  if (person && "id" === group) {
    pagetitle = person.name;
  }

  const caption = "";

  const subtitle = "";
  // filter?.length === 0
  //   ? String(t("people.subtitle")).replace(
  //     "%i",
  //     total,
  //   )
  //   : "";

  return (
    <Page title={pagetitle} base={base}>
      <link rel="stylesheet" href="/css/hscroll.css" />
      <link rel="stylesheet" href="/css/akvaplanist.css" />
      <script src="/@nrk/core-scroll.min.js" />
      {group !== "id"
        ? (
          <section class="page-header">
            {/* <NewsFilmStrip news={news} lang={lang.value} /> */}
            <div class="page-header__content">
              <H1ATitle
                group={group}
                filter={filter}
                text={t("people.People")}
              />
              <p>{t("people.subtitle")}</p>
            </div>
            <Picture />
          </section>
        )
        : null}

      {filter?.length > 0 ? <OneGroup members={results} /> : (
        <>
          <PeopleSearchForm q={q} />
          <GroupedPeople group={group} grouped={grouped} />
        </>
      )}

      <section>
        <HScroll maxVisibleChildren={5.5}>{news.map(ArticleSquare)}</HScroll>
      </section>
    </Page>
  );
}
