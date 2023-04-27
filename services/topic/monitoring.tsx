const no = () => (
  <div class="">
    <details>
      <summary>
        Menneskelig aktivitet medfører inngrep i natur og miljø. Gjennom
        grunnlagsundersøkelser før igangsetting, og regelmessig overvåking av
        miljøtilstand under og etter gjennomført tiltak, dokumenteres grad og
        omfang av miljøpåvirkning. Dersom påvirkningen overskrider vedtatte
        grenser, kan tiltakshaver pålegges avbøtende tiltak og evt. opphør av
        aktiviteten.
      </summary>
      Akvaplan-niva skreddersyr overvåkingsprogram fra grunnlagsundersøkelser
      til periodiske overvåkingsundersøkelser som avdekker, stedfester og
      dokumenterer miljøpåvirkning fra den aktuelle aktiviteten.

      Akvaplan-niva fremskaffer overvåkingsdata til nasjonale og internasjonale
      kartleggingsprogram som bl.a. AMAP, og vi forsker på effekter av nye
      miljøgifter for å kunne vurdere behov for begrensninger i bruk og/eller
      utslipp.

      I vårt arbeid med miljøovervåking er biologisk mangfold hos bunnfauna en
      utsagnskraftig og robust indikator, som vi benytter i en lang rekke
      sammenhenger. Samtidig er vi også sentrale i utvikling av nye metoder
      innen visuell overvåking av bunnhabitat og innen utvikling og test av nye
      metoder, f.eks. eDNA.
    </details>
    Video:{" "}
    <a href="https://www.youtube.com/watch?v=8LHUf3SEWmM" target="_blank">
      Akvaplan-niva på offshore tokt…
    </a>
  </div>
);

const en = () => (
  <div class="">
    <details>
      <summary>
        Human activities influences nature and environment. Through baseline
        surveys, and regular monitoring during implementation, the degree and
        extent of this influence is documented. Should the monitoring reveal
        unacceptable impacts, the owner/operator may be enforced to implement
        amending measures or termination of the activity.
      </summary>
      Akvaplan-niva designs monitoring programmes extending from pre-activity
      baseline mapping to regular surveys documenting extent, duration and
      degree of influence for the actual project.

      We also provide data to national and international Arctic monitoring
      programs like AMAP. We perform research to identify substances and
      components deserving restrictions in application and/or discharge.

      In our environmental monitoring projects, we use biological diversity in
      benthic macrofaunal communities as a strong, recognised and robust
      indicator. Akvaplan-niva also plays a key role in developing new
      techniques for example visual monitoring of sensitive habitats, and the
      use of environmental DNA.
    </details>
    <p>
      Video:{" "}
      <a href="https://www.youtube.com/watch?v=8LHUf3SEWmM" target="_blank">
        Akvaplan-niva on offshore survey…
      </a>
    </p>
  </div>
);
export const monitoring = new Map([
  ["no", no],
  ["en", en],
]);
