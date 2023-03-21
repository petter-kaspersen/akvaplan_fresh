import { PropsWithChildren } from "preact";
import { useRef } from "preact/hooks";
import { Head } from "$fresh/runtime.ts";

type HScrollProps = PropsWithChildren & {
  scrollerid: string;
};

export default function HScroll({ children, scrollerId }: HScrollProps) {
  return (
    <div class="scroll-container">
      <Head>
        <link rel="stylesheet" href="/css/hscroll.css" />
        <script src="https://static.nrk.no/core-components/major/10/core-scroll/core-scroll.min.js" />
      </Head>
      <button
        class="scroller-button scroller-button--left"
        data-for={scrollerId}
        value="left"
        aria-label="Rull til venstre"
      >
        &larr;
      </button>
      <button
        class="scroller-button scroller-button--right"
        data-for={scrollerId}
        value="right"
        aria-label="Rull til høyre"
      >
        &rarr;
      </button>
      <core-scroll id={scrollerId} class="hscroll">
        {children}
      </core-scroll>
    </div>
  );
}
