import { PropsWithChildren } from "preact";
import { useRef } from "preact/hooks";

type HScrollProps = PropsWithChildren & {
  scrollerid: string;
};

export function HScroll({ children, scrollerId }: HScrollProps) {
  return (
    <div class="scroll-container">
      <button
        class="scroller-button scroller-button--left"
        data-for={scrollerId}
        value="left"
        aria-label="Rull til venstre"
      >
        ˂
      </button>
      <button
        class="scroller-button scroller-button--right"
        data-for={scrollerId}
        value="right"
        aria-label="Rull til høyre"
      >
        ˃
      </button>
      <core-scroll id={scrollerId} class="hscroll">
        {children}
      </core-scroll>
    </div>
  );
}

export default HScroll;
