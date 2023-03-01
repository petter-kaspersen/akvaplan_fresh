import { Page } from "akvaplan_fresh/components/page.tsx";
import HomeSections, {
  buildSections,
} from "akvaplan_fresh/islands/home_sections.tsx";

//import { Handlers, PageProps } from "$fresh/server.ts";

export default function Home() {
  return (
    <Page>
      <HomeSections />
    </Page>
  );
}
