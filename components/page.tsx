// // componets/layout/container.tsx
//https://github.com/denoland/fresh/issues/371#issuecomment-1172915981
// /** @jsx h */
// /** @jsxFrag Fragment */
// import { ComponentChildren, Fragment, h } from "preact";
// import { tw } from "@twind";
// import { Head } from "https://deno.land/x/fresh@1.0.0/runtime.ts";
// import Footer from "../../components/Footer.tsx";

// export type Props = {
//   children: ComponentChildren;
//   title?: string;
//   name?: string;
//   description?: string;
// };

// export const Container = ({ children, ...customMeta }: Props) => {
//   return (
//     <>
//       <div style={{ minHeight: "100vh" }}>
//         <Seo {...customMeta} />
//         <div className="container">{children}</div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// const Seo = ({ ...customMeta }) => {
//   const meta = {
//     title: " بحوث عروض برمجة",
//     description: "بحوث عروض برمجة تصميم تصوير مونتاج",
//     type: "website",
//     ...customMeta,
//   };

//   return (
//     <Head>
//       <title>{meta.title}</title>
//       <meta content={meta.description} name="description" />
//       <link rel="icon" href="/favicon.ico" />
//  {/*
//     add javascript css what ever you want
//   */}
//     </Head>
//   );
// };
// and in routes you can use container components to warp as layout

// // routes/index.tsx

// import { Container } from "../components/layouts/container.tsx";
// export default function Home(props: PageProps<H>) {
//   const meta = {
//     title: "Some Meta Title",
//     description: "I am a description, and I can create multiple tags",
//     canonical: "http://example.com/path/to/page",
//     meta: {
//       charset: "utf-8",
//       name: {
//         keywords: "react,meta,document,html,tags",
//       },
//     },
//   };
//   return (
//     <>
//       <Container {...meta}>

//          <h1>fresh is really fresh</h1>

//       </Container>
//     </>
//   );
// }

import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";
import { JSX } from "preact";
import { asset, Head } from "$fresh/runtime.ts";

const theming = await Deno.readTextFile("./static/theming.js");
const openprops = await Deno.readTextFile("./static/css/openprops.css");
const root = await Deno.readTextFile("./static/css/root.css");
const dark = await Deno.readTextFile("./static/css/dark.css");
const light = await Deno.readTextFile("./static/css/light.css");

const styles = `${root} ${openprops} ${dark} ${light}`;

export type PageProps = JSX.HTMLAttributes<HTMLBodyElement> & {
  title?: string;
};

//           <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
//           <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
//           <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
//           <link rel="manifest" href={asset("/manifest.webmanifest")} />

export function Page(
  { lang = "", class: extraClass = "", title, ...props }: PageProps,
) {
  const commonClassNames: string[] = [""];
  const classNames = [...commonClassNames, extraClass];

  const head = (
    <Head>
      <script src="/theming.js" />
      {title ? <title>{title} – Akvaplan-niva</title> : null}
      <link
        rel="icon"
        href={asset("/akvaplan_symbol.svg")}
        type="image/svg+xml"
      />

      <style
        dangerouslySetInnerHTML={{ __html: styles }}
      />

      {
        /* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&family=Roboto+Flex&display=swap"
      /> */
      }
    </Head>
  );

  return (
    <>
      {head}
      <Header />
      <body {...props} class={classNames.join(" ")} lang={lang}></body>
      <Footer />
    </>
  );
}
