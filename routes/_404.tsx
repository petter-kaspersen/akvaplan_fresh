import { Page } from "akvaplan_fresh/components/mod.ts";
import { Head } from "$fresh/runtime.ts";
import { UnknownPageProps } from "$fresh/server.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const title = "Unknown URL";
  //const wp = ["wp-admin", "wp-content"];
  // Disallow: /wp-admin/
  // Disallow: /wp-content/
  // Disallow: /xmlrpc.php
  // Disallow: /wp-login.php
  // Disallow: /wp-cron.php
  console.debug(404, url.pathname);
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
