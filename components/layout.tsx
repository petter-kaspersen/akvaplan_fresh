import { asset, Head } from "$fresh/runtime.ts";
import { type ComponentChildren } from "preact";

export default function Layout(props: { children?: ComponentChildren }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={asset("/global.css")} />
        <link rel="stylesheet" href={asset("/reset.css")} />
      </Head>
      {props.children}

      <script src={asset("/theme-switcher.js")}></script>
    </>
  );
}
