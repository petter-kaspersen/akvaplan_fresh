import { SiteNavDialog } from "akvaplan_fresh/components/mod.ts";
import ButtonOpenDialog from "akvaplan_fresh/islands/button_open_dialog.tsx";
export const SiteMenu = ({ lang }) => (
  <span
    class="header-end"
    style={{
      display: "grid",
      padding: "10 rem",
      justifyContent: "end",
    }}
  >
    <menu>
      <ButtonOpenDialog data-for="dialog#menu" text={"text"}>
        {lang === "en" ? "Menu" : "Meny"}
      </ButtonOpenDialog>
    </menu>
    <SiteNavDialog lang={lang} />
  </span>
);
// Note: regular translations using t in ButtonOpenDialog text gives circularity issues
