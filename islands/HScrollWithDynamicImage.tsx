import { useState } from "preact/hooks";

type Image = {
  id: number;
};

type Props = {
  scrollerId: string;
  images: Image[];
};

export default function HScrollWithDynamicImage({ scrollerId, images }: Props) {
  const [bigImageId, setBigImageId] = useState(images[0].id);
  console.log(images[0]);
  return (
    <section className="dynamic-image-hscroll">
      <img src={`https://mediebank.deno.dev/preview_big/${bigImageId}`} />
    </section>
  );
}
