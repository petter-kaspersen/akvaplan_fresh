import { Head } from "$fresh/runtime.ts";
import { Page } from "akvaplan_fresh/components/page.tsx";

import HomeSection from "../../components/section/HomeSection.tsx";
import SectionContent from "../../components/section/SectionContent.tsx";
import SectionImage from "../../components/section/SectionImage.tsx";

export default function Section() {
  return (
    <Page title="Test section">
      <Head>
        <link rel="stylesheet" href="/css/section.css" />
      </Head>

      <HomeSection>
        <SectionImage
          source="https://preview.sdl.no/v2/dam/ssGDst9O7xlTb0J6I2g_Lw/I583h3dwed8?v=1673953218959"
          alt="Lorem ipsum"
        ></SectionImage>
        <SectionContent title="Kontakt oss">
          Mus mauris vitae ultricies leo integer malesuada nunc vel risus
          commodo viverra maecenas accumsan lacus vel facilisis volutpat est
          velit
        </SectionContent>
      </HomeSection>

      <HomeSection reversed>
        <SectionImage
          source="https://preview.sdl.no/v2/dam/ssGDst9O7xlTb0J6I2g_Lw/I583h3dwed8?v=1673953218959"
          alt="Lorem ipsum"
        ></SectionImage>
        <SectionContent title="Kontakt oss">
          Mus mauris vitae ultricies leo integer malesuada nunc vel risus
          commodo viverra maecenas accumsan lacus vel facilisis volutpat est
          velit
        </SectionContent>
      </HomeSection>
    </Page>
  );
}
