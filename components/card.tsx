import { JSX, PropsWithChildren } from "preact";
type CardProps = JSX.HTMLAttributes<HTMLDivElement>;
interface Props {
  img?: string;
}

export function Card({ img, children }: PropsWithChildren & Props) {
  return (
    <div
      class="card"
      style={{
        background: "var(--surface1)",
        border: `1px solid var(--surface2)`,
        padding: "var(--size-1)",
        paddingBlockEnd: "var(--size-4)",
        borderRadius: "var(--radius-2)",
        boxShadow: "var(--shadow-4)",
      }}
    >
      {img
        ? (
          <img
            src={img}
            alt="Card image cap"
          />
        )
        : null}
      {children}
    </div>
  );
}
