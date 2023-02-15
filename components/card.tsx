import { PropsWithChildren } from "preact";

interface Props {
  backgroundImage?: string;
}

const styles = (props: PropsWithChildren & Props) => {
  return (
    <style jsx>{`
      .card {
        width: 410px;
        height: 310px;
        background: var(--section-bg);
      }

      .card-background {
        background-image: url(${props.backgroundImage});
        background-repeat: no-repeat;
        background-size: cover;
      }
    `}</style>
  );
};

export function Card(props: PropsWithChildren & Props) {
  return (
    <div class={`card ${props.backgroundImage ? "card-background" : ""}`}>
      {styles(props)}
      {props.children}
    </div>
  );
}
