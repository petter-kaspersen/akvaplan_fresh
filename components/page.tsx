import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";
import { ComponentChildren, JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/runtime.ts";
export type PageProps = JSX.HTMLAttributes<HTMLBodyElement> & {
  title?: string;
};

//           <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
//           <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
//           <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
//           <link rel="manifest" href={asset("/manifest.webmanifest")} />

export function Page({ class: extraClass = "", title, ...props }: PageProps) {
  const commonClassNames: string[] = [
    "dark",
  ];
  const classNames = [...commonClassNames, extraClass];

  const head = (
    <Head>
      {title ? <title>{title} – Akvaplan-niva</title> : null}
      <link
        rel="icon"
        href={asset("/akvaplan_symbol.svg")}
        type="image/svg+xml"
      />

      <link rel="stylesheet" href={asset("/reset.css")} />
      <link rel="stylesheet" href={asset("/global.css")} />
      <link rel="stylesheet" href="/css/openprops.css" />
      <link rel="stylesheet" href="/css/fonts.css" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&family=Roboto+Flex"
      />
    </Head>
  );

  return (
    <>
      {head}
      <Header />
      <main {...props} class={classNames.join(" ")}></main>
    </>
  );
}
