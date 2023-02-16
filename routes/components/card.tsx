import { Head } from "$fresh/runtime.ts";
import { Card } from "../../components/card.tsx";
import Layout from "../../components/layout.tsx";

export default function CardRoute() {
  return (
    <Layout>
      <Head>
        <title>Card Testing</title>
      </Head>
      <Card />
      <Card
        backgroundImage={
          "https://preview.sdl.no/v2/dam/ssGDst9O7xlTb0J6I2g_Lw/I583h3dwed8?v=1673953218959"
        }
      />
    </Layout>
  );
}
