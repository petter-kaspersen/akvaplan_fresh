import { siteNav } from "akvaplan_fresh/services/nav.ts";

import { Handlers, PageProps } from "$fresh/server.ts";

export function SiteNav() {
  return (
    <nav>
      <ul style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        {siteNav.value.map(({ href, text }) => (
          <li>
            <a class="target" href={href} style={{ color: "var(--text2)" }}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
