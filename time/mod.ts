export const isodate = (dt: string | Date): string =>
  new Date(dt)?.toJSON()?.substring(0, 10);
