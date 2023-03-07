import { PropsWithChildren } from "preact";

type Props = PropsWithChildren & {
  title?: string;
};

export default function SectionContent({ title, children }: Props) {
  return (
    <div class="section-content">
      {title && <h2>{title}</h2>}
      <p>{children}</p>
    </div>
  );
}
