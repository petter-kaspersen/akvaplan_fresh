import { Head } from "$fresh/runtime.ts";
import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const title = "404 Not Found";

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
      </Head>
      <main style={{ fontFamily: "monospace" }}>
        <h1>{title}</h1>
        <p>
          <code>
            {url.pathname}
            {" "}
          </code>
          does not exist on{" "}
          <a href="/">
            {url.host}
          </a>
        </p>
      </main>
    </html>
  );
}
