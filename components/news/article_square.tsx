import { lang, t } from "../../text/mod.ts";
import { researchTopicURL } from "../../services/nav.ts";
import { isodate } from "../../time/mod.ts";

export const ArticleSquare = (
  { title, published, img, desc, href, hreflang, keywords, width, height },
) => (
  <div
    class="halbum-image"
    style={{
      fontSize: "var(--font-size-fluid-1,1rem)",
      wordBreak: "break-word",
    }}
  >
    <a
      class="image-container"
      href={href}
      title={desc}
    >
      <img
        width={width}
        height={height}
        alt=""
        loading="lazy"
        src={img}
      />
      <p style={{ textAlign: "left" }}>
        {title}
      </p>
    </a>
    <p>
      {isodate(published)}{" "}
      {lang.value !== hreflang ? <span>({t(`lang.${hreflang}`)})</span> : null}
    </p>
  </div>
);
