import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";
import { ComponentChildren, JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/runtime.ts";
export type PageProps = JSX.HTMLAttributes<HTMLBodyElement> & {
  title?: string;
};

// export const Layout: FunctionComponent<LayoutProps> =
//   function Layout() {
//     return (
//       <Fragment>
//         <Head>
//           <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
//           <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
//           <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
//           <link rel="manifest" href={asset("/manifest.webmanifest")} />
//         </Head>
//         {children}
//       </Fragment>
//     );
//   };

const font = `@font-face {
  font-family: 'Roboto Flex';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  src: url(https://fonts.gstatic.com/s/robotoflex/v9/NaN4epOXO_NexZs0b5QrzlOHb8wCikXpYqmZsWI-__OGfttPZktqc2VdZ80KvCLZaPcSBZtOx2MifRuWR28sPJtUMbsFEK6cRrleUx9Xgbm3WLHa_F4Ep4Fm0PN19Ik5Dntczx0wZGzhPlL1YNMYKbv9_1IQXOw7AiUJVXpRJ6cXW4O8TNGoXjC79QRyaLshNDUf3e0O-gn5rrZCu20YNYG0EACUTNK-QKavMlx2JoUc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
`;

export function Page({ class: extraClass = "", title, ...props }: PageProps) {
  const commonClassNames: string[] = [
    "dark",
  ];
  const classNames = [...commonClassNames, extraClass];
  // <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
  // <link rel="manifest" href={asset("/manifest.webmanifest")} />

  const head = (
    <Head>
      {title ? <title>{title} – Akvaplan-niva</title> : null}
      {/* <link rel="icon" href={asset("/favicon.ico")} sizes="any" /> */}
      <link
        rel="icon"
        href={asset("/akvaplan_symbol.svg")}
        type="image/svg+xml"
      />

      <link rel="stylesheet" href={asset("/reset.css")} />
      <link rel="stylesheet" href={asset("/global.css")} />

      <link rel="stylesheet" href="/css/openprops.css" />
      <link rel="stylesheet" href="/css/theme.css" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />
      <style>{font}</style>
      <script type="module" src="/theme.js" />
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
