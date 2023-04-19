export const ResearchTopic = (
  { name, img, desc, href, keywords, width, height, alt = "" },
) => (
  <div class="halbum-image">
    <a
      class="image-container"
      href={href}
      title={desc}
    >
      <img
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        src={img}
      />
    </a>
    <h3>
      <a
        href={href}
        title={desc}
      >
        {name}
      </a>
    </h3>
  </div>
);
