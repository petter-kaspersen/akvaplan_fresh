import { t } from "akvaplan_fresh/text/mod.ts";

import { Icon, MiniCard } from "../mod.ts";
export type HScrollProps = HTMLElement & {
  scrollerId: string;
  staticFirstElement?: HTMLElement;
};

//unicode: ˂˃

export function HScroll({
  children,
  scrollerId,
  staticFirstElement,
}: HScrollProps) {
  return (
    <div class="scroll-container">
      <button
        class="scroller-button scroller-button--left"
        data-for={scrollerId}
        value="left"
        aria-label={t("scroll.right")}
      >
        <Icon name="arrow_back_ios_new" />
      </button>
      <button
        class="scroller-button scroller-button--right"
        data-for={scrollerId}
        value="right"
        aria-label={t("scroll.right")}
      >
        <span class="target">
          <Icon name="arrow_forward_ios" />
        </span>
      </button>

      {staticFirstElement && staticFirstElement}
      <core-scroll id={scrollerId} class="hscroll">
        {children}
      </core-scroll>
    </div>
  );
}

export default HScroll;
