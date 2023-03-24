// https://codepen.io/argyleink/pen/bGgyOGP
// import type {
//   Image,
//   PreviewElement,
// } from "akvaplan_fresh/services/mediebank_interfaces.ts";

import HScroll from "../hscroll/HScroll.tsx";

type Image = {};
type PreviewElement = {};
export function HAlbum({
  album,
  customClass,
}: {
  album: Image[];
  customClass: string;
}) {
  return (
    <HScroll scrollerId={customClass}>
      {album.map((image, position) => (
        <PreviewFigure image={image} width={512} position={position} />
      ))}
    </HScroll>
  );
}

const thumbnail = (id) => `https://mediebank.deno.dev/thumbnail_big/${id}`;

const PreviewFigure = ({
  image: { id, previews, headline, description },
  width,
  position,
}) => {
  const preview =
    previews.find((p: PreviewElement) => p.width === Number(width)) ??
    previews?.at(0) ??
    {};

  const { url, height } = preview;
  width = preview.width;

  return (
    <div class="halbum-image">
      <a href={thumbnail(id)} aria-label="…">
        <div class="image-container">
          <img
            width={width}
            height={height}
            alt={headline ?? "?"}
            loading="lazy"
            src={thumbnail(id)}
          />
        </div>
        <p>Link here</p>
      </a>
    </div>
  );
};
