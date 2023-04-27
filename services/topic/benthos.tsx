const no = () => (
  <div class="">
    <details>
      <summary>
        Akvaplan-niva tilbyr prøvetaking, opparbeiding, identifisering og
        rapportering av marine bløtbunnsprøver samt biologisk undersøkelse av
        litoral og sublitoral hardbunnsflora og hardbunnsfauna
      </summary>
      Vårt bentoslaboratorium tilbyr akkrediterte (NS-EN ISO-IEC 17025)
      tjenester innen opparbeiding, identifisering og faglig fortolkning av
      bunndyrsprøver knyttet til miljøundersøkelser og miljøovervåking, både
      offshore (petroleumsvirksomhet) og i kystnære områder (oppdrett,
      havnebasseng, utslippsområder o.l.).
    </details>
  </div>
);

const en = () => (
  <div class="">
    <details>
      <summary>
        Akvaplan-niva offers sampling, processing, identification and reporting
        of marine sediment samples, as well as biological examination of
        littoral and sublittoral hard bottom flora and fauna.
      </summary>

      In relation to our baseline surveys and monitoring programs, our benthic
      laboratory offers accredited (EN ISO-IEC 17025) services including
      processing, taxonomic identification, interpretation and reporting of
      benthic faunal samples from both offshore (petroleum operations) and
      coastal areas (e.g. aquaculture, harbor basins, emission recipients).
    </details>
  </div>
);
export const benthos = new Map([
  ["no", no],
  ["en", en],
]);
