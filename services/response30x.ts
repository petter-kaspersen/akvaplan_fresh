export const response307 = (Location: string) =>
  new Response("", {
    status: 307,
    headers: { Location },
  });
export const response307XRobotsTagNoIndex = (Location: string) =>
  new Response("", {
    status: 307,
    headers: {
      Location,
      "x-robots-tag": "noindex, nofollow, noarchive, nosnippet",
    },
  });
