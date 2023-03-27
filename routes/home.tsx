import { buildMobileNav } from "akvaplan_fresh/services/nav.ts";
import { HAlbum } from "akvaplan_fresh/components/album/halbum.tsx";
import { homeAlbums } from "akvaplan_fresh/services/mediebank.ts";
import { getLangFromURL, lang, t } from "akvaplan_fresh/text/mod.ts";

import { Handlers, RouteConfig } from "$fresh/server.ts";
import { Page } from "akvaplan_fresh/components/page.tsx";

export const config: RouteConfig = {
  routeOverride: "/:lang(en|no)",
};

export const handler: Handlers = {
  async GET(req, ctx) {
    const albums = await homeAlbums();
    lang.value = getLangFromURL(req.url);
    const title = t("Home");
    const nav = buildMobileNav(lang);
    return ctx.render({ albums, lang, title, nav });
  },
};
export default function Home({ data: { albums, lang, title, nav } }) {
  return (
    <Page>
      <nav style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {nav.map(({ text, href }) => (
          <a class="target" href={href}>
            {text}
          </a>
        ))}
      </nav>
      {albums.map((album, i) => (
        <>
          <h3>{t(`home.Album.${i}`)}</h3>
          <HAlbum album={album} customClass={`album_${i}`} />
        </>
      ))}
    </Page>
  );
}
