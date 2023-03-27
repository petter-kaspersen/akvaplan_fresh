import { buildIndexLangRedirect, t } from "akvaplan_fresh/text/mod.ts";
import { Page } from "akvaplan_fresh/components/page.tsx";

import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    // Get server side render lang (set in _middleware.ts)
    // Used for browser (meta) redirect when JavaScript is disabled
    const { lang } = ctx.state;
    console.log("/", "GET", lang);
    return ctx.render({ lang });
  },
};

// Redirect from / to /no or /en
// With JavaScript: redirect needs to happen browser side in order to read lang from localStorage
// @todo Index route component: Add body links to /en and /no for robots
export default function SiteRoot({ data: { lang } }) {
  // If no JavaScript, redirect using <meta> refresh
  // const content = `0;url=/${lang}`;
  // <noscript><meta http-equiv="refresh" content={content} /></noscript>

  return (
    <Page>
      <Head>
        <script
          dangerouslySetInnerHTML={{ __html: buildIndexLangRedirect() }}
        />
      </Head>
      <h1 style={{ color: "var(--accent)" }}>Akvaplan-niva</h1>

      <p lang="en">Select site language</p>
      <p lang="no">Velg språkversjon</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <a class="button" href="/en" lang="en" hrefLang="en">
          English
        </a>

        <a class="button" href="/no" lang="no" hrefLang="no">
          Norsk
        </a>
      </div>
    </Page>
  );
}
