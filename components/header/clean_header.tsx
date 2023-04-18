import { ApnLogo, SiteNav } from "akvaplan_fresh/components/mod.ts";

import ButtonOpenDialog from "akvaplan_fresh/islands/button_open_dialog.tsx";
import ThemeSwitcher from "akvaplan_fresh/islands/theme_switcher.tsx";
import { LinkLang } from "akvaplan_fresh/islands/lang_switcher.tsx";

import { routes } from "akvaplan_fresh/services/nav.ts";
import { lang as langSignal, t } from "akvaplan_fresh/text/mod.ts";

import borders from "open-props/props.borders.js";

const threeColumnGrid = {
  margin: 0,
  padding: borders["--border-size-3"],
  display: "grid",
  background: "var(--surface1)",
  gridTemplateColumns: "1fr auto 1fr",
  color: "var(--text1)",
};
export function CleanHeader(
  { href = "/", lang, HeaderLogo = ApnLogo },
) {
  return (
    <header style={threeColumnGrid}>
      <span></span>
      <a href={href}>
        <HeaderLogo />
      </a>
      <span
        class="header-end"
        style={{
          display: "grid",
          justifyContent: "end",
        }}
      >
        <menu>
          <ButtonOpenDialog data-for="dialog#menu">
            {lang === "en" ? "Menu" : "Meny"}
          </ButtonOpenDialog>
        </menu>

        <dialog
          id="menu"
          color-scheme
          style={{
            border: "0",
            background: "var(--surface0)",
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
              padding: "2rem",
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
            {langSignal?.value !== "en" && (
              <p>
                Switch to <LinkLang lang="en" /> site
              </p>
            )}
            {langSignal?.value !== "no" && (
              <p>
                Bytt til <LinkLang lang="no" /> nettsted
              </p>
            )}
            <ThemeSwitcher mini />
            <form method="dialog">
              <button>
                {lang === "en" ? "Close" : "Lukk"}
              </button>
            </form>
          </footer>
        </dialog>
      </span>
    </header>
  );
}
