import { Page } from "akvaplan_fresh/components/page.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
const href = (s: string) => "/" + s;
export const handler: Handlers<Set<string>> = {
  async GET(_req: Request, ctx: HandlerContext) {
    const types = new Set(["news", "about"]);
    return ctx.render(types);
  },
};

export default function Articles({ data }: PageProps<Set<string>>) {
  return (
    <Page title="Artikler">
      <ul>
        {[...data].map(resultItem)}
      </ul>
    </Page>
  );
}

const resultItem = (item) => (
  <li>
    <a href={href(item)}>{item}</a>
  </li>
);
