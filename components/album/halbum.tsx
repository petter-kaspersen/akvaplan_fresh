// https://codepen.io/argyleink/pen/bGgyOGP
// import type {
//   Image,
//   PreviewElement,
// } from "akvaplan_fresh/services/mediebank_interfaces.ts";

type Image = {};
type PreviewElement = {};
export function HAlbum({ album }: { album: Image[] }) {
  return (
    <ul class="horizontal-media-scroller">
      {album.map((image, position) => (
        <PreviewFigure image={image} width={512} position={position} />
      ))}
    </ul>
  );
}

const thumbnail = (id) => `https://mediebank.deno.dev/thumbnail_big/${id}`;

const PreviewFigure = (
  { image: { id, previews, headline, description }, width, position },
) => {
  const preview =
    previews.find((p: PreviewElement) => p.width === Number(width)) ??
      previews?.at(0) ?? {};

  const { url, height } = preview;
  width = preview.width;

  return (
    <li>
      <a href={thumbnail(id)} aria-label="…">
        <figure>
          <picture>
            <img
              width={width}
              height={height}
              alt={headline ?? "?"}
              loading="lazy"
              src={thumbnail(id)}
            />
          </picture>
          <figcaption></figcaption>
        </figure>
      </a>
    </li>
  );
};

// return (
//   <figure class="img-hover" style={{ display: "inline" }}>
//     <a href="#">
//       <img
//         src={url}
//         alt={headline}
//         title={description}
//         loading="lazy"
//       />
//       <figcaption>
//         {headline}
//       </figcaption>
//     </a>
//   </figure>
// );
