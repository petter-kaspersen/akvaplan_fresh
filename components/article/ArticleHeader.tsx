type ArticleHeaderProps = {
  header: string;
  image?: string;
  imageCaption?: string;
};

//console.log("@todo ArticleHeader should not be repeated in markup");
export default function ArticleHeader({
  header,
  image,
  imageCaption,
}: ArticleHeaderProps) {
  return (
    <>
      <section class="article-title-mobile" aria-disabled="true">
        <h1>{header}</h1>
      </section>
      <header class="article-header">
        <img
          title={imageCaption}
          alt={imageCaption}
          src={image}
          width="1245"
          height="700"
        />
        <h1>{header}</h1>
      </header>
    </>
  );
}
