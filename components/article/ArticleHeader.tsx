type ArticleHeaderProps = {
  header: string;
  image: string;
  imageCaption: string;
};

export default function ArticleHeader({
  header,
  image,
  imageCaption,
}: ArticleHeaderProps) {
  return (
    <>
      <header class="article-header">
        <h1>{header}</h1>
        <img src={image} alt={imageCaption} />
      </header>
      <section class="article-title-mobile">
        <h1>{header}</h1>
      </section>
    </>
  );
}
