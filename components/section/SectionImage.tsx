type Props = {
  source: string;
  alt: string;
};

export default function   SectionImage({ source, alt }: Props) {
  return <img class="section-image" src={source} alt={alt} />;
}
