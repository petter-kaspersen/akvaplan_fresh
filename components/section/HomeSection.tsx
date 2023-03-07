import { PropsWithChildren } from "preact";

type Props = PropsWithChildren & {
  reversed?: boolean;
};

export default function HomeSection({ reversed, children }: Props) {
  return (
    <section class={`home-section ${reversed ? "home-section-reversed" : ""}`}>
      {children}
    </section>
  );
}
