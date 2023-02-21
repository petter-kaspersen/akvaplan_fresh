import { Page } from "../components/page.tsx";
import { Head } from "$fresh/runtime.ts";
import { ErrorPageProps } from "$fresh/server.ts";

export default function InternalServerError({ error }: ErrorPageProps) {
  const title = "500";
  const lang = "en";

  return (
    <html lang="en">
      <Page title={title} lang={lang}>
        <main style={{ fontFamily: "monospace" }}>
          <h1>{title}</h1>

          <details>
            <summary>
              {(error as Error).message}
            </summary>
            <pre>{error.stack}</pre>
          </details>
        </main>
      </Page>
    </html>
  );
}
