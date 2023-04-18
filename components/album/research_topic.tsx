import { lang } from "../../text/mod.ts";
import { researchTopicURL } from "../../services/nav.ts";
export const ResearchTopic = (
  { name, img, desc, href, keywords, width, height, alt = "" },
) => (
  <div class="halbum-image">
    <a
      class="image-container"
      href={keywords?.length > 0
        ? researchTopicURL({ topic: keywords.at(0), lang })
        : href}
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
        href={keywords?.length > 0
          ? researchTopicURL({
            topic: keywords.at(0),
            lang: lang.value,
          })
          : href}
        title={desc}
      >
        {name}
      </a>
    </h3>
  </div>
);
