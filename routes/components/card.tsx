import { Head, asset } from "$fresh/runtime.ts";
import { Card } from "../../components/card.tsx";
import Layout from "../../components/layout.tsx";

export default function CardRoute() {
  return (
    <Layout>
      <Head>
        <title>Card Testing</title>
      </Head>
      <Card />
      <Card backgroundImage={asset("/images/card-example.jpg")} />
    </Layout>
  );
}
