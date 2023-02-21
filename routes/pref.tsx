import { Page } from "../components/page.tsx";
import ThemeSwitcher from "../islands/theme_switcher.tsx";
import LangSwitcher from "../islands/lang_switcher.tsx";

export default function Preferences() {
  return (
    <Page title="Innstillinger">
      <ThemeSwitcher />
      <LangSwitcher />
    </Page>
  );
}
