import { JSX, PropsWithChildren } from "preact";
type CardProps = JSX.HTMLAttributes<HTMLDivElement>;

interface Props {
  img?: string;
  customClass?: string;
}

export function Card({
  img,
  customClass,
  children,
}: PropsWithChildren & Props) {
  const fullClass = `card ${customClass ?? ""}`;
  return (
    <div
      class={fullClass}
      style={{
        background: "var(--surface3)",
        padding: "var(--size-2)",
        borderRadius: "var(--radius-2)",
        boxShadow: "var(--shadow-4)",
      }}
    >
      {img ? <img src={img} alt="Card image cap" /> : null}
      {children}
    </div>
  );
}

export const MiniCard = (props: HTMLElement) => (
  <div
    style={{
      background: "var(--surface2)",
      borderRadius: "var(--radius-2)",
      boxShadow: "var(--shadow-4)",
    }}
  >
    {props.children}
  </div>
);
