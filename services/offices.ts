const alta = {
  name: "Alta",
  addr: {},
  tel: "+47 41 67 68 29",
  email: "alta@akvaplan.niva.no",
  links: {},
};
/* Postadresse

Markveien 38b, Alta, Norway
Besøk og pakker

Markedsgata 3, 9510 Alta
+47 41 67 68 29

alta@akvaplan.niva.no*/

const bergen = {
  name: "Bergen",
  email: "bergen@akvaplan.niva.no",
  tel: "+47 45 03 56 57",
  /*Postadresse

Thormøhlensgata 53 D, 5006 Bergen
Besøk og pakker

Thormøhlensgata 53 D, 5006 Bergen


  */
};

const bodø = {
  name: "Bodø",
  email: "apnbodo@akvaplan.niva.no",
  tel: "+47 77 75 03 00",
  /* Postadresse

Akvaplan-niva AS, C/O Salmon Center, Bodø, Sjøgata 21, 3.etg, 8006 Bodø
Besøk og pakker

Akvaplan-niva AS, C/O Salmon Center, Bodø, Sjøgata 21, 3.etg, 8006 Bodø


 */
};

const oslo = {
  name: "Oslo",
  email: "oslo@akvaplan.niva.no",
  tel: "+47 94 84 93 12",
  /*Postadresse

Økernveien 94, 0579 Oslo
Besøk og pakker

Økernveien 94, 0579 Oslo
+47 94 84 93 12

oslo@akvaplan.niva.no */
};

/* Reykjavik
Postadresse

Akralind 4, 201 Kopavogi, Iceland
Besøk og pakker

Akralind 4, 201 Kopavogi, Iceland
+354 56 25 80 0

+354 69 10 70 7

iceland@akvaplan.niva.no

Ski
Postadresse

Idrettsveien 6, 1400 Ski, Norway
Besøk og pakker

Idrettsveien 6, 1400 Ski, Norway
+47 92 80 41 93

sense@akvaplan.niva.no

Stord
Postadresse

Kunnskapshuset, Sæ 132, 5417 Stord
Besøk og pakker

Sæ 132, 5417, Stord, Norway
+47 91 85 08 34

sense@akvaplan.niva.no


*/

const reykjavík = {
  name: "Reykjavík",
  addr: {
    visit: "Akralind 4, 201 Kópavogur, Ísland",
    post: "Akralind 4, 201 Kópavogur, Ísland",
  },
  country: "IS",
  tel: "+354 56 25 80 0",
  tel2: "+354 69 10 70 7",
  email: "iceland@akvaplan.niva.no",
  links: { map: "https://goo.gl/maps/JYinWtgSLpqRcEXs6" },
};

const trondheim = {
  name: "Trondheim",
  addr: {
    post: "Postboks 1268, Sluppen, 7462 Trondheim",
    visit: "Pirsenteret, Havnegata 9, 7010 Trondheim",
  },
  country: "NO",
  tel: "+47 99 58 54 68",
  email: "trondheim@akvaplan.niva.no",
  links: {},
};

export const tromsø = {
  name: "Tromsø",
  tel: "+47 77 75 03 00",
  email: "info@akvaplan.niva.no",
  country: "NO",
  hq: true,
  addr: {
    visit: "Framsenteret, 9296 Tromsø",
    post: "Framsenteret, Postboks 6606, Stakkevollan, 9296 Tromsø",
  },
};

export const offices = new Map<string, Record<string, unknown>>([
  ["Alta", alta],
  ["Bergen", bergen],
  ["Bodø", bodø],
  ["Oslo", oslo],
  ["Reykjavík", reykjavík],
  ["Tromsø", tromsø],
  ["Trondheim", trondheim],
]);
