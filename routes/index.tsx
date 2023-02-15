import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Akvaplan-niva</title>
      </Head>
      <header>Akvaplan-niva</header>
      <nav>
        <ul>
          <li>
            <a href="/pubs">Publikasjoner</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="/components/card">Card</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
