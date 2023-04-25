import { ApnLogo, SiteNav } from "akvaplan_fresh/components/mod.ts";
import { t } from "akvaplan_fresh/text/mod.ts";

export const SiteNavDialog = ({ lang }) => (
  <dialog
    id="menu"
    color-scheme
    style={{
      border: "0",
      background: "var(--surface2)",
      color: "var(--text1)",
    }}
  >
    <header>
      <a
        href="/"
        aria-label={t("nav.go_home")}
        style={{ marginTop: "1rem" }}
      >
        <ApnLogo />
      </a>
    </header>

    <menu
      style={{
        margin: 0,
        //padding: "2rem",
        background: "var(--surface1)",
        display: "grid",
        placeItems: "center",
        color: "var(--text1)",
      }}
    >
      {
        /* <form
      method="get"
      action={routes(langSignal?.value ?? "no").get("search")}
      autocomplete="off"
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <input
        type="search"
        name="q"
        value={""}
        placeholder={t("menu.search.placeholder")}
      />

      <button type="submit">{t("Search")}</button>
    </form> */
      }
      <SiteNav />
    </menu>
    <footer
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <form method="dialog">
        <button>
          {lang === "en" ? "Close" : "Lukk"}
        </button>
      </form>
    </footer>
  </dialog>
);
