import { SiteNavDialog } from "akvaplan_fresh/components/mod.ts";
import ButtonOpenDialog from "akvaplan_fresh/islands/button_open_dialog.tsx";

export const SiteMenu = ({ lang }) => (
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
    <SiteNavDialog lang={lang} />
  </span>
);
