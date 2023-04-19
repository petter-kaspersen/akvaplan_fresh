import { lang } from "../../text/mod.ts";
import { serviceGroupURL } from "../../services/nav.ts";
//{ fontSize: "var(--font-size-1)" }
export const ServiceGroup = (
  { name, img, desc, href, keywords, width, height },
) => (
  <div class="halbum-image">
    <a
      class="image-container"
      href={keywords?.length > 0
        ? serviceGroupURL({ topic: keywords.at(0), lang })
        : href}
      title={desc}
    >
      <img
        width={width}
        height={height}
        alt=""
        loading="lazy"
        src={img}
      />
    </a>
    <h3 style={{ fontSize: "var(--font-size-fluid-0,1rem)" }}>
      <a
        href={keywords?.length > 0
          ? serviceGroupURL({
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
