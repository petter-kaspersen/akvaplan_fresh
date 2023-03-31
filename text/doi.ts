const doiRegex = /doi\.org\/(10\.[0-9]{1,}\/[\S]+)/;
export const detectDOIs = (o: unknown) =>
  JSON.stringify(o).replaceAll(/["\\]/g, " ").match(
    doiRegex,
  );
