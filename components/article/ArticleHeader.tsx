type ArticleHeaderProps = {
  header: string;
  image?: string;
  imageCaption?: string;
};

export default function ArticleHeader({
  header,
  image,
  imageCaption,
}: ArticleHeaderProps) {
  return (
    <>
      <section class="article-title-mobile" aria-role="none">
        <h1>{header}</h1>
      </section>
      <header class="article-header" style={{ minHeight: "800" }}>
        <img title={imageCaption} alt={imageCaption} src={image} width="1000" />
        <h1>{header}</h1>
      </header>
    </>
  );
}
