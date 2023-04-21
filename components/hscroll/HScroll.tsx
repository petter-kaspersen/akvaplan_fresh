type HScrollProps = HTMLElement & {
  scrollerId: string;
  staticFirstElement?: HTMLElement;
  maxVisibleChildren?: number;
};

//unicode: ˂˃

export function HScroll({
  children,
  scrollerId,
  staticFirstElement,
  maxVisibleChildren,
}: HScrollProps) {
  const maxVisibleChildrenClass = maxVisibleChildren
    ? "max-visible-children"
    : "";

  return (
    <div class="scroll-container">
      {staticFirstElement && staticFirstElement}
      <core-scroll
        id={scrollerId}
        class={`hscroll ${maxVisibleChildrenClass}`}
        style={
          maxVisibleChildren
            ? {
                "--max-visible-children": maxVisibleChildren,
              }
            : {}
        }
      >
        {children}
      </core-scroll>
    </div>
  );
}

export default HScroll;
