import _home0 from "https://mediebank.deno.dev/albums/505?limit=9" assert {
  type: "json",
};
import _home1 from "https://mediebank.deno.dev/albums/501?limit=9" assert {
  type: "json",
};
import _home2 from "https://mediebank.deno.dev/albums/527?limit=9" assert {
  type: "json",
};

import _home3 from "https://mediebank.deno.dev/albums/440?limit=9" assert {
  type: "json",
};

const simplify512 = ({ previews, ...image }) => {
  const preview512 = previews.find(({ width }) => 512 === width) ??
    previews.at(0);
  return ({
    ...image,
    previews: [preview512],
  });
};

//const a505 = "fieldwork";
//const a440 = "glider";
// search:
// https://mediebank.deno.dev/api/v1/apps/assets?query=${query}&limit=
export const homeAlbums = async () =>
  await [_home0, _home1, _home2, _home3].map(({ data }) =>
    data.map(simplify512).filter((_, i) => i < 24)
  );
