import { Head } from "$fresh/runtime.ts";
import { Page } from "../components/page.tsx";
export default function Home() {
  return (
    <Page>
      <Head>
        <title>Akvaplan-niva</title>
      </Head>
      <nav>
        <ul>
          <li>
            <a href="/pubs">Publikasjoner</a>
          </li>
          <li>
            <a href="/pref">Innstillinger</a>
          </li>
        </ul>
      </nav>
    </Page>
  );
}
