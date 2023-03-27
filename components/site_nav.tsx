import { lang } from "akvaplan_fresh/text/mod.ts";
import { buildNav } from "akvaplan_fresh/services/nav.ts";

import { computed } from "@preact/signals-core";

import { Handlers, PageProps } from "$fresh/server.ts";

const sections = computed(() => buildNav(lang));

export function SiteNav() {
  return (
    <nav>
      <ul style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        {sections.value.map(({ href, text }) => (
          <li>
            <a
              class="target"
              href={href}
              style={{ color: "var(--text2)" }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
