const no = () => (
  <div class="page-header">
    <h2>Lokalitetsundersøkelse og anleggssertifikat</h2>
    Akvaplan-niva er akkreditert etter NS-EN ISO/IEC 17020 for inspeksjon av
    flytende oppdrettsanlegg i henhold til NS 9415 og tilbyr
    lokalitetsundersøkelser og inspeksjon av anlegg før utstedelse av
    anleggssertifikat.
  </div>
);

const en = () => (
  <div class="page-header">
    <h2>Location Investigations and Construction Certificates</h2>
    Akvaplan-niva is accredited according to NS-EN ISO / IEC 17020 for
    inspection of floating aquaculture plants in accordance with NS 9415 and
    offers site surveys and inspection of plants before issuing a plant
    certificate.
  </div>
);
export const nytek = new Map([
  ["no", no],
  ["en", en],
]);
