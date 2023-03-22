export const symbolDataURI = `data:image/svg+xml,${
  encodeURIComponent(
    await Deno.readTextFile("./static/akvaplan_symbol.svg"),
  )
}`;
