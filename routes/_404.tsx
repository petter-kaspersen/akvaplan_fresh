import { Page } from "../components/page.tsx";
import { Head } from "$fresh/runtime.ts";
import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const title = "Unknown URL";

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
      </Head>
      <Page>
        <main
          style={{
            fontFamily: "monospace",
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "1fr",
          }}
        >
          <h1>{title}</h1>
          <p>
            <code>
              {url.pathname}
              {" "}
            </code>
            does not exist on
          </p>
          <a href="/">
            {url.host}
          </a>
        </main>
      </Page>
    </html>
  );
}
