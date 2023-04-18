import { AlbumHeader, Card } from "akvaplan_fresh/components/mod.ts";
import { routes } from "akvaplan_fresh/services/nav.ts";
import { standardEN, standardNO } from "akvaplan_fresh/services/standard_no.ts";

import { t } from "akvaplan_fresh/text/mod.ts";

const inspURL = (lang: string) =>
  `https://www.akkreditert.no${
    lang === "en" ? "/en" : ""
  }/akkrediterte-organisasjoner/inspeksjon/?AkkId=542`;

const labURL = (lang: string) =>
  `https://www.akkreditert.no${
    lang === "en" ? "/en" : ""
  }/akkrediterte-organisasjoner/akkrediteringsomfang/?AkkId=212`;

const LinkTo = ({ name, lang, text = name }) =>
  "no" === lang
    ? <a href={standardNO.get(name)} target="_blank">{text}</a>
    : <a href={standardEN.get(name)} target="_blank">{text}</a>;

const _accred = { padding: "0.5rem" };

const No = ({ lang = "no" } = {}) => {
  return (
    <div>
      <Card>
        <p style={_accred}>
          Akvaplan-niva tilbyr akkrediterte laboratorietjenester innen{" "}
          <a href={labURL(lang)} target="_blank">
            kjemisk analyse, marine bunndyr og taksonomi
          </a>{" "}
          , etter <LinkTo name="NS-EN ISO/IEC 17025:2017" lang={lang} />.
        </p>
      </Card>

      <Card>
        <p style={_accred}>
          Akvaplan-niva er akkreditert for utsteding av{" "}
          <a href={inspURL(lang)} target="_blank">
            anleggssertifikat og gjennomføring av lokalitetsundersøkelser
          </a>{" "}
          i henhold til{" "}
          <a
            href={`/${lang}/pressemelding/2022-12-23/akvaplan-niva-er-akkreditert-for-nytek23`}
          >
            NYTEK23
          </a>, etter{" "}
          <LinkTo
            name="NS-EN ISO/IEC 17020:2012"
            lang={lang}
          />.
        </p>
      </Card>
      <Card>
        <p style={_accred}>
          Vårt styringssystem for kvalitet er sertifisert etter{" "}
          <LinkTo
            name="NS-EN ISO 9001:2015"
            lang={lang}
          />.
        </p>
      </Card>
    </div>
  );
};

{
  /* <div
style={{
  background: "white",
  width: 100,
}}
>
<img
  src="https://www.akkreditert.no/static/img/logostaendeengelsk.svg"
  alt="Logo (Norwegian Accreditation)"
/>
</div>

      <div
        style={{
          background: "white",
          width: 100,
        }}
      >
        <img
          src="https://akkreditert.no/static/img/logostaendenorsk.svg"
          alt="Logo (Norsk akkreditering)"
        />

      </div>

  */
}
const En = ({ lang = "en" } = {}) => {
  return (
    <div>
      <Card>
        <p style={_accred}>
          Akvaplan-niva offers{" "}
          <a href="/en/services/?filter-accredited=true">
            accredited services
          </a>{" "}
          to ensure precision, traceability and transparency in all phases of
          our projects
        </p>
      </Card>
      <Card>
        <p style={_accred}>
          Akvaplan-niva provide accredited laboratory services for{"  "}
          <a href={labURL(lang)} target="_blank">
            chemical analysis, benthic fauna analysis, and taxonomy
          </a>{" "}
          , following <LinkTo name="NS-EN ISO/IEC 17025:2017" lang={lang} />.
        </p>
      </Card>

      <Card>
        <p style={_accred}>
          Akvaplan-niva is accredited for issuing{"  "}
          <a href={inspURL(lang)} target="_blank">
            capability certificate and locality classification
          </a>{" "}
          following{"   "}
          <a
            href={`/${lang}/pressemelding/2022-12-23/akvaplan-niva-er-akkreditert-for-nytek23`}
          >
            NYTEK23
          </a>, and{" "}
          <LinkTo
            name="NS-EN ISO/IEC 17020:2012"
            lang={lang}
          />.
        </p>
      </Card>

      <Card>
        <p style={_accred}>
          Akvaplan-niva is certified according to the{" "}
          <LinkTo
            name="NS-EN ISO 9001:2015"
            lang={lang}
          />{" "}
          quality standards.
        </p>
      </Card>
    </div>
  );
};
export const Accreditations = ({ lang }) => (
  <section>
    <AlbumHeader
      text={t("home.album.accreditations")}
      href={routes(lang).get("services")}
    />

    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "1fr",
      }}
    >
      {lang == "no" ? <No /> : <En />}
    </div>
  </section>
);
