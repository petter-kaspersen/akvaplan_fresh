// @todo Consider creating a Deno service to return latest news (of any kind)

export interface Search {
  q: string;
  lang: string;
  limit?: number;
}
