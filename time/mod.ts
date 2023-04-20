export const isodate = (dt: string | Date): string =>
  new Date(dt)?.toJSON()?.substring(0, 10);
export const monthname = (date, locale) => {
  const { format } = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });

  const [first, ...rest] = [...format(date)];
  return [first.toUpperCase(), ...rest].join("");
};
