import { PropsWithChildren } from "preact";

interface Props {
  backgroundImage?: string;
}

const styles = (props: PropsWithChildren & Props) => {
  return (
    <style jsx>
      {`

      .card {
        background: var(--section-bg);
        border-radius: var(--radius-2);
        padding: var(--size-fluid-3);
        box-shadow: var(--shadow-2);
      
        &:hover {
          box-shadow: var(--shadow-3);
        }
      
        @media (--motionOK) {
          animation: var(--animation-fade-in);
        }
      }
      .card-background {
        background-image: url(${props.backgroundImage});
        background-repeat: no-repeat;
        background-size: cover;
      }

    `}
    </style>
  );
};

export function Card(props: PropsWithChildren & Props) {
  return (
    <div
      class={`card ${props.backgroundImage ? "card-background" : ""}`}
      style={{
        background: "var(--surface1)",
        padding: "var(--size-fluid-1)",
        borderRadius: "var(--radius-2)",
      }}
    >
      {props.children}
    </div>
  );
}
