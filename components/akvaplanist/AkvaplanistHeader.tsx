import { PropsWithChildren } from "preact";

type Props = PropsWithChildren & {
  source: string;
  alt: string;
  title: string;
  subtitle: string;
};

/**
 *  Basic AkvaplanistHeader
 *
 * TODO:
 *    - Extend to be allowed to used on several subpages
 *    - Max width of content, if screen == ultrawide image will take up everything
 */
export default function AkvaplanistHeader({
  source,
  alt,
  title,
  subtitle,
}: Props) {
  return (
    <section class="page-header">
      <div class="page-header__content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <img src={source} alt={alt} />
    </section>
  );
}
