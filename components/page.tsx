import { CleanHeader } from "akvaplan_fresh/components/header/clean_header.tsx";
import { Footer } from "./footer.tsx";
import { Styles } from "./styles.tsx";

import { lang, t } from "akvaplan_fresh/text/mod.ts";
import { buildInitTheming } from "akvaplan_fresh/theming/mod.ts";

import { FunctionComponent, JSX } from "preact";
import { Head } from "$fresh/runtime.ts";

import { computed } from "@preact/signals-core";
import { symbolDataURI } from "akvaplan_fresh/components/akvaplan/symbol.tsx";

const baseForLang = computed(() => "/" + lang + "/");

export type PageProps =
  & JSX.HTMLAttributes<HTMLElement>
  & {
    //title?: string;
    //base?: string;
    Header: FunctionComponent;
  };

export function Page(
  {
    title,
    base = baseForLang,
    href,
    ...props
  }: PageProps,
) {
  const head = (
    <Head>
      {/* <meta charset="utf-8" /> */}

      {title
        ? <title>{t(title)} – Akvaplan-niva</title>
        : <title>Akvaplan-niva</title>}

      <script
        dangerouslySetInnerHTML={{ __html: buildInitTheming() }}
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <meta name="color-scheme" content="dark" /> */}
      <meta
        name="description"
        content={t("meta.description")}
      />

      <link
        rel="icon"
        href={symbolDataURI}
        type="image/svg+xml"
      />

      <Styles />
    </Head>
  );

  const { children, ...propsExceptChildren } = props;

  return (
    <>
      {head}

      <body {...propsExceptChildren}>
        <CleanHeader href={href} />
        <main>{children}</main>
        <Footer />
      </body>
    </>
  );
}
