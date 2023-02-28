import { Page } from "akvaplan_fresh/components/page.tsx";
import { Card } from "akvaplan_fresh/components/card.tsx";
import Text from "akvaplan_fresh/islands/text.tsx";
import ThemeSwitcher, {} from "akvaplan_fresh/islands/theme_switcher.tsx";
import LangSwitcher from "akvaplan_fresh/islands/lang_switcher.tsx";

import { Head } from "$fresh/runtime.ts";

export default function Preferences() {
  return (
    <Page title={"settings"}>
      <noscript style={{ color: "var(--error)", marginTop: "var(--size-5)" }}>
        JavaScript is disabled: Cannot change settings.<br />{" "}
        JavaScript er av: Kan ikke endre innstillinger.
        <h2 style={{ color: "var(--accent)", marginTop: "var(--size-5)" }}>
          <a href="#">
            test
          </a>
        </h2>
      </noscript>
      <h1>
        <Text code="settings" />
      </h1>
      <Card>
        <h2 style={{ color: "var(--accent)" }}>
          <label>
            <Text code="color-scheme" />
          </label>
        </h2>
        <ThemeSwitcher />
      </Card>
      <Card>
        <h2 style={{ color: "var(--accent)" }}>
          <label>
            <Text code="lang" />
          </label>
        </h2>
        <LangSwitcher />
      </Card>
      <Card>
        <h2>
          <Text code="Personvern" />
        </h2>
        <p>
          <Text code="settings.privacy" data-format="markdown" />
        </p>
      </Card>
    </Page>
  );
}
