import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";
import { Styles } from "./styles.tsx";

import Text from "akvaplan_fresh/islands/text.tsx";
import { buildInitLang, t } from "akvaplan_fresh/text/mod.ts";
import { buildInitTheming } from "akvaplan_fresh/theming/mod.js";

import { JSX } from "preact";
import { asset, Head } from "$fresh/runtime.ts";

export type PageProps = JSX.HTMLAttributes<HTMLBodyElement> & {
  title?: string;
  base?: string;
};

// @todo Page: add metadata,icons,etc. https://web.dev/learn/html/metadata/
//           <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
//           <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
//           <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
//           <link rel="manifest" href={asset("/manifest.webmanifest")} />
const symbolURI = `data:image/svg+xml,${
  encodeURIComponent(await Deno.readTextFile("./static/akvaplan_symbol.svg"))
}`;

export function Page(
  { class: extraClass = "", title, base, ...props }: PageProps,
) {
  const commonClassNames: string[] = [""];
  const classNames = [...commonClassNames, extraClass];

  const head = (
    <Head>
      {/* <meta charset="utf-8" /> */}
      {base ? <base href={base} /> : null}

      {title
        ? <title>{t(title)} – Akvaplan-niva</title>
        : <title>Akvaplan-niva</title>}

      <script
        dangerouslySetInnerHTML={{ __html: buildInitTheming() }}
      />
      <script
        dangerouslySetInnerHTML={{ __html: buildInitLang() }}
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <meta name="color-scheme" content="dark" /> */}
      <meta
        name="description"
        content={t("meta.description")}
      />

      <link
        rel="icon"
        href={symbolURI}
        type="image/svg+xml"
      />

      <Styles />
    </Head>
  );

  return (
    <>
      {head}
      <Header />
      <body {...props} class={classNames.join(" ")}></body>
      <Footer />
    </>
  );
}
