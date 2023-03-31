import { Page } from "akvaplan_fresh/components/page.tsx";
import { Head } from "$fresh/runtime.ts";
import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const title = "Unknown URL";

  return (
    <html>
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
          </p>
          <p>
            does not exist on
          </p>
          <p>
            <a href="/">
              {url.host}
            </a>
          </p>
        </main>
      </Page>
    </html>
  );
}
