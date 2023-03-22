import { Page } from "akvaplan_fresh/components/page.tsx";
import { Card } from "akvaplan_fresh/components/card.tsx";
import Text from "akvaplan_fresh/islands/text.tsx";
import ThemeSwitcher, {} from "akvaplan_fresh/islands/theme_switcher.tsx";
import LangSwitcher from "akvaplan_fresh/islands/lang_switcher.tsx";

import { lang } from "akvaplan_fresh/text/mod.ts";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { RouteConfig } from "$fresh/server.ts";

const routeMap = new Map([["en", "settings"], ["no", "innstillinger"]]);

export const config: RouteConfig = {
  routeOverride: "/(en/settings|no/innstillinger)",
};

function LangLinks() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <a class="button" href="/en">
        EN
      </a>

      <a class="button" href="/no">
        NO
      </a>
    </div>
  );
}

export default function Preferences() {
  return (
    <Page title={"Settings"} lang={lang}>
      <noscript
        style={{ color: "rgb(215,62,15)" }}
      >
        <h2 style={{ color: "var(--accent)" }}>
          <label>
            <Text code="Velg språk for å besøke Akvaplan-niva" />
          </label>
        </h2>
        <LangLinks />
      </noscript>
      <h1>
        <Text code="Settings" />
      </h1>

      <noscript
        style={{ color: "rgb(215,62,15)" }}
      >
        <h2 style={{ color: "var(--accent)" }}>
          <label>
            <Text code="lang" />
          </label>
        </h2>
        <p lang="en">JavaScript is needed in order to change settings.</p>
        <p lang="no">JavaScript må være på for å endre innstillinger.</p>
      </noscript>

      <div>
        <Card>
          <h2 style={{ color: "var(--accent)" }}>
            <label>
              <Text code="lang" />
            </label>
          </h2>
          <LangSwitcher />
        </Card>

        <Card>
          <h2 style={{ color: "var(--accent)" }}>
            <label>
              <Text code="color-scheme" />
            </label>
          </h2>
          <ThemeSwitcher />
        </Card>

        <Card>
          <h2>
            <Text code="Personvern" />
          </h2>
          <p>
            <Text code="settings.privacy" data-format="markdown" />
          </p>
        </Card>
      </div>
    </Page>
  );
}
