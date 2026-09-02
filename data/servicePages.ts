// Dedikerte tjeneste-landingssider for lokal SEO (Larvik).
// Innholdet er forankret i data/pricing.json, data/services.json og
// data/blogs/*.json – ingen nye faktapåstander utover det som allerede
// står på nettstedet og allmenne norske kjøretøyregler (Statens vegvesen).

export interface ServicePageSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface ServicePageFaq {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  image: string;
  imageAlt: string;
  priceLabel: string;
  priceNote: string;
  bookingUrl: string;
  serviceType: string;
  sections: ServicePageSection[];
  faq: ServicePageFaq[];
  relatedBlogSlug?: string;
}

export const servicePages: ServicePage[] = [
  {
    slug: "eu-kontroll-larvik",
    name: "EU-kontroll",
    metaTitle: "EU-kontroll i Larvik – 1150,- | 4Dekk Larvik",
    metaDescription:
      "EU-kontroll i Larvik hos 4Dekk til 1150,-. Autorisert kontrollorgan med direkte forbindelse til Statens vegvesen. Bestill time på Torstrand i dag.",
    h1: "EU-kontroll i Larvik",
    intro: [
      "4Dekk Larvik er godkjent kontrollorgan og utfører EU-kontroll (periodisk kjøretøykontroll) for personbiler og varebiler under 3 500 kg. Kontrollen har rundt 150 kontrollpunkter og dekker bremser, styring, lys, hjuloppheng, dekk, understell, avgass og sikkerhetsutstyr.",
      "Resultatet registreres direkte hos Statens vegvesen mens bilen står hos oss, slik at godkjenningen er på plass med en gang. Prisen er 1150,- uansett bilmerke.",
    ],
    image: "/images/eucontrol.webp",
    imageAlt: "Bil inne til EU-kontroll hos 4Dekk Larvik",
    priceLabel: "1150,-",
    priceNote:
      "Fast pris uansett bilmerke. Etterkontroll etter utbedring koster 400,-.",
    bookingUrl: "/booking",
    serviceType: "EU-kontroll / periodisk kjøretøykontroll",
    sections: [
      {
        heading: "Når skal bilen på EU-kontroll?",
        body: [
          "Som eier har du selv ansvaret for å få bilen kontrollert innen fristen. Fristen står i vognkortet og på Statens vegvesen sine nettsider når du søker opp registreringsnummeret.",
        ],
        bullets: [
          "Første kontroll: innen 4 år etter førstegangsregistrering",
          "Deretter: minst hvert andre år",
          "Kjøretøy 30–49 år: hvert femte år",
          "Kjøretøy 50 år og eldre: fritatt (når vilkårene er oppfylt)",
          "Kjøres bilen uten godkjent kontroll risikerer du gebyr og avskilting",
        ],
      },
      {
        heading: "Slik forbereder du bilen",
        body: [
          "God egenkontroll før innlevering øker sjansen for godkjent kontroll første gang og sparer deg for etterkontroll.",
        ],
        bullets: [
          "Sjekk at alle lys, blinklys, bremselys og skiltlys virker",
          "Fyll spylevæske og kontroller vindusviskerne",
          "Se over dekkenes mønsterdybde og lufttrykk",
          "Ha varseltrekant og refleksvest i bilen",
          "Rett opp åpenbare feil som ulyder i bremser eller hjuloppheng",
        ],
      },
      {
        heading: "Hvis bilen ikke blir godkjent",
        body: [
          "Får bilen merknad med krav om etterkontroll, må feilene utbedres og bilen framstilles på nytt. Etterkontroll kan tas hos hvilket som helst godkjent verksted og går normalt raskt.",
          "Vi utfører selv reparasjonene som trengs for å få bilen gjennom kontrollen, slik at du slipper å kjøre mellom flere verksteder.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster EU-kontroll hos 4Dekk Larvik?",
        a: "EU-kontroll koster 1150,- uansett bilmerke. Trenger bilen etterkontroll etter utbedring, koster den 400,-.",
      },
      {
        q: "Hvor lang tid tar EU-kontrollen?",
        a: "Selve kontrollen tar normalt 30–45 minutter når det ikke oppdages feil som må undersøkes nærmere.",
      },
      {
        q: "Registreres kontrollen automatisk?",
        a: "Ja. Vi er godkjent kontrollorgan og melder resultatet direkte til Statens vegvesen mens bilen er hos oss.",
      },
      {
        q: "Kan dere reparere feil som oppdages?",
        a: "Ja, vi har fullt verksted og utfører reparasjoner og etterkontroll på samme sted.",
      },
    ],
    relatedBlogSlug: "eu-kontroll-guide-frist-sjekkliste-tips",
  },
  {
    slug: "hjulskift-larvik",
    name: "Hjulskift",
    metaTitle: "Hjulskift i Larvik – fra 600,- | 4Dekk Larvik",
    metaDescription:
      "Rask hjulskift mellom sommer- og vinterdekk i Larvik. Fra 600,- for personbil. Dekksjekk og lufttrykk inkludert. Bestill time hos 4Dekk på Torstrand.",
    h1: "Hjulskift i Larvik",
    intro: [
      "Sesongskifte mellom sommer- og vinterdekk på ferdig monterte hjul. Vi løfter bilen på hydraulisk løftebukk, kontrollerer dekkene for slitasje og skader, og trekker til hjulboltene med riktig moment.",
      "Personbil koster 600,-, SUV og varebil 650,-, og bobil 700,-. Kontroll av lufttrykk er inkludert.",
    ],
    image: "/images/hjulskift.webp",
    imageAlt: "Hjulskift på løftebukk hos 4Dekk Larvik",
    priceLabel: "fra 600,-",
    priceNote:
      "Personbil 600,-, SUV/varebil 650,-, bobil 700,-. Gjelder skift av ferdig monterte hjul.",
    bookingUrl: "/booking",
    serviceType: "Hjulskift / sesongskifte av dekk",
    sections: [
      {
        heading: "Når bør du skifte til vinterdekk?",
        body: [
          "En vanlig tommelfingerregel er å skifte til vinterdekk når døgntemperaturen legger seg stabilt rundt 7 °C, og senest når det er meldt snø eller is. Piggdekk kan i utgangspunktet brukes fra 1. november til første søndag etter påske, med utvidet periode i Nord-Norge.",
          "Bestill time i god tid – ukene rundt første snøfall er de travleste i året for alle verksteder i Larvik.",
        ],
      },
      {
        heading: "Hva vi kontrollerer under skiftet",
        body: [
          "Mens hjulene er av, gjør vi en rask visuell sjekk som kan avdekke problemer før de blir dyre.",
        ],
        bullets: [
          "Mønsterdybde – minstekrav er 3 mm for vinterdekk og 1,6 mm for sommerdekk",
          "Ujevn slitasje som kan tyde på feil hjulstilling eller lufttrykk",
          "Skader i dekksiden, sprekker og aldring",
          "Riktig lufttrykk etter bilprodusentens anbefaling",
        ],
      },
      {
        heading: "Slipp køen – bruk dekkhotell",
        body: [
          "Har du dekkhotell hos oss, henter vi hjulene dine fra lager, vasker dem og monterer sesongens sett. Da slipper du å frakte dekk i bilen og oppbevare dem hjemme.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster hjulskift i Larvik?",
        a: "Hjulskift av ferdig monterte hjul koster fra 600,- for personbil, 650,- for SUV og varebil, og 700,- for bobil.",
      },
      {
        q: "Hvor lang tid tar et hjulskift?",
        a: "Et vanlig sesongskifte tar cirka 20–30 minutter når du har time.",
      },
      {
        q: "Hva er forskjellen på hjulskift og omlegging?",
        a: "Hjulskift er å bytte ferdig monterte hjul. Omlegging er å montere nye dekk på felg med balansering, og koster fra 1000,-.",
      },
      {
        q: "Kan dere oppbevare sommerdekkene mine?",
        a: "Ja, vi tilbyr dekkhotell med hjulvask. Totalpris per sesong inkludert hjulskift er fra 1300,-.",
      },
    ],
    relatedBlogSlug: "valg-av-dekk-sommer-vinter",
  },
  {
    slug: "hjulstilling-larvik",
    name: "4-hjulskontroll",
    metaTitle: "Hjulstilling og 4-hjulskontroll i Larvik – 1875,- | 4Dekk",
    metaDescription:
      "4-hjulskontroll og justering av hjulstilling i Larvik. 1875,- med digitalt måleutstyr. Reduser ujevn dekkslitasje og skjevtrekk. Bestill hos 4Dekk Larvik.",
    h1: "Hjulstilling og 4-hjulskontroll i Larvik",
    intro: [
      "Feil hjulstilling gir ujevn og rask dekkslitasje, skjevtrekk og tyngre styring. Vi måler og justerer camber, toe (spissing) og caster på alle fire hjul med digitalt måleutstyr, og sammenligner mot bilprodusentens verdier.",
      "4-hjulskontroll med justering koster 1875,-.",
    ],
    image: "/images/4hjulskontroll.webp",
    imageAlt: "4-hjulskontroll med digitalt måleutstyr hos 4Dekk Larvik",
    priceLabel: "1875,-",
    priceNote:
      "Inkluderer måling og justering av hjulstilling på alle fire hjul.",
    bookingUrl: "/booking",
    serviceType: "Hjulstilling / 4-hjulskontroll",
    sections: [
      {
        heading: "Tegn på at hjulstillingen er feil",
        body: [
          "Flere av disse symptomene kan skyldes feil hjulstilling – ofte etter en kraftig kantstein, et dypt hull i veien eller etter arbeid på hjuloppheng og styring.",
        ],
        bullets: [
          "Bilen trekker til siden på rett vei",
          "Rattet står skjevt når du kjører rett fram",
          "Dekkene slites mer på innersiden eller yttersiden",
          "«Sagtann»-slitasje som gir ulyd fra dekkene",
          "Urolig styring eller dårlig retningsstabilitet",
        ],
      },
      {
        heading: "Hva 4-hjulskontrollen omfatter",
        body: [
          "Vi kjører bilen inn på måleplassen, monterer sensorer på alle fire hjul og leser av de faktiske vinklene. Deretter justerer vi det som lar seg justere mot toleransene fra bilprodusenten, og skriver ut en rapport med verdier før og etter.",
          "Har bilen slitte styre- eller bæreledd, sier vi fra før vi justerer, siden slark må utbedres for at innstillingen skal holde.",
        ],
      },
      {
        heading: "Når bør du sjekke hjulstillingen?",
        body: [
          "Vi anbefaler kontroll ved montering av nye dekk, etter støt mot fortauskant eller veiskade, ved skjevtrekk, og som fast rutine cirka annethvert år.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster 4-hjulskontroll i Larvik?",
        a: "4-hjulskontroll med justering av hjulstilling koster 1875,- hos 4Dekk Larvik.",
      },
      {
        q: "Hvor lang tid tar en hjulstilling?",
        a: "Sett av cirka en time. Trengs det utbedring av slark i styre- eller bæreledd først, tar det lengre tid.",
      },
      {
        q: "Kan feil hjulstilling ødelegge dekkene?",
        a: "Ja. Selv små avvik kan slite ned et dekksett langt raskere enn normalt og gi ujevn slitasje som ikke kan rettes opp.",
      },
    ],
    relatedBlogSlug: "hjulstilling-og-hjulbalansering",
  },
  {
    slug: "ac-service-larvik",
    name: "AC-service",
    metaTitle: "AC-service i Larvik – 1500,- + gass | 4Dekk Larvik",
    metaDescription:
      "AC-service i Larvik: trykktest, lekkasjesøk og påfylling av kuldemedium. 1500,- for diagnose pluss 3,-/gram gass. Kun biler med R134a. Bestill hos 4Dekk.",
    h1: "AC-service i Larvik",
    intro: [
      "Dårlig kjøling, vond lukt eller dugg som ikke forsvinner er typiske tegn på at klimaanlegget trenger service. Vi trykktester anlegget, gjør lekkasjesøk og fyller på kuldemedium ved behov.",
      "AC-service koster 1500,- for trykktest og diagnose, i tillegg 3,- per gram kuldemedium som fylles på. Vi utfører service på anlegg med kuldemedium R134a, ikke den nyere typen R1234yf.",
    ],
    image: "/images/ACservice.webp",
    imageAlt: "AC-service og påfylling av kuldemedium hos 4Dekk Larvik",
    priceLabel: "1500,- + 3,-/gram",
    priceNote:
      "1500,- for trykktest og diagnose. Kuldemedium 3,- per gram. Gjelder kun biler med R134a.",
    bookingUrl: "/booking",
    serviceType: "AC-service / klimaanleggservice",
    sections: [
      {
        heading: "Tegn på at klimaanlegget trenger service",
        body: [
          "Et klimaanlegg mister litt kuldemedium hvert år helt naturlig. Etter noen sesonger blir kjøleeffekten merkbart dårligere.",
        ],
        bullets: [
          "Lufta blir ikke ordentlig kald selv på laveste innstilling",
          "Vond eller innelåst lukt når du slår på anlegget",
          "Ruter som dugger og ikke klarner opp",
          "Kompressoren slår seg ikke inn",
        ],
      },
      {
        heading: "Hva som gjøres under en AC-service",
        body: [
          "Vi kobler bilen til AC-stasjonen, tapper og veier eksisterende kuldemedium, og trykktester anlegget for lekkasje. Er alt tett, fyller vi anlegget med riktig mengde kuldemedium og olje etter bilprodusentens spesifikasjon, og kontrollmåler kjøleeffekten.",
          "Finner vi en lekkasje, gir vi deg et pristilbud på utbedring før vi går videre.",
        ],
      },
      {
        heading: "R134a eller R1234yf?",
        body: [
          "Biler fra rundt 2017 og nyere bruker som regel kuldemediet R1234yf. Vi utfører AC-service på biler med det eldre kuldemediet R134a. Er du usikker, kan vi sjekke hvilket kuldemedium bilen din bruker når du bestiller time.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster AC-service i Larvik?",
        a: "1500,- for trykktest og diagnose, pluss 3,- per gram kuldemedium som fylles på.",
      },
      {
        q: "Gjør dere service på alle biler?",
        a: "Vi utfører AC-service på biler med kuldemedium R134a, som regel biler eldre enn cirka 2017. Vi tar ikke R1234yf.",
      },
      {
        q: "Hvor ofte bør AC-service gjøres?",
        a: "Et sted mellom hvert andre og hvert fjerde år er vanlig, eller når kjøleeffekten blir merkbart dårligere.",
      },
    ],
    relatedBlogSlug: "bilvedlikehold-tips-og-rad",
  },
  {
    slug: "dekkhotell-larvik",
    name: "Dekkhotell",
    metaTitle: "Dekkhotell i Larvik – fra 500,- | 4Dekk Larvik",
    metaDescription:
      "Dekkhotell i Larvik med hjulvask, slitasjekontroll og sesongskifte. Fra 500,-, totalpris per sesong fra 1300,-. Slipp å oppbevare dekk hjemme – 4Dekk på Torstrand.",
    h1: "Dekkhotell i Larvik",
    intro: [
      "Vi oppbevarer sommer- og vinterhjulene dine trygt og tørt mellom sesongene. Hjulene vaskes, kontrolleres for slitasje og skader, og merkes før de settes på lager.",
      "Oppbevaring koster fra 500,-. Totalpris per sesong inkludert hjulskift er fra 1300,- for personbil (SUV 1350,-, bobil under 3,5 tonn 1400,-).",
    ],
    image: "/images/dekkhotell.webp",
    imageAlt: "Dekkhotell med merkede hjul på lager hos 4Dekk Larvik",
    priceLabel: "fra 500,-",
    priceNote:
      "Oppbevaring fra 500,-. Totalpris per sesong inkl. hjulskift og hjulvask fra 1300,- (SUV 1350,-, bobil <3,5t 1400,-).",
    bookingUrl: "/booking",
    serviceType: "Dekkhotell / dekkoppbevaring",
    sections: [
      {
        heading: "Slik fungerer dekkhotell",
        body: [
          "Første gang leverer du inn settet du ikke bruker. Ved neste sesongskifte bestiller du time, vi henter hjulene fra lager, vasker dem, kontrollerer dem og monterer dem på bilen. Settet du tar av, går tilbake på lager.",
          "Du trenger ikke frakte dekk i bilen eller finne plass i boden – og hjulene står lagret på en måte som er skånsom for gummien.",
        ],
      },
      {
        heading: "Hva som er inkludert",
        body: [],
        bullets: [
          "Sesongvis oppbevaring i egnet lager",
          "Hjulvask hver gang settet tas inn",
          "Kontroll av mønsterdybde og synlige skader",
          "Merking så riktig hjul havner på riktig plass",
          "Beskjed i god tid hvis dekkene snart må byttes",
        ],
      },
      {
        heading: "Bestill sesongskifte tidlig",
        body: [
          "Kundene med dekkhotell prioriteres i sesongrushet, men også her fylles kalenderen raskt rundt første snøfall. Bestill time så snart du vet at det nærmer seg.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster dekkhotell i Larvik?",
        a: "Oppbevaring koster fra 500,-. Totalpris per sesong inkludert hjulskift og hjulvask er fra 1300,- for personbil.",
      },
      {
        q: "Hva skjer hvis dekkene mine blir for dårlige?",
        a: "Vi sier fra ved sesongskifte hvis mønsterdybden nærmer seg grensen, så du kan planlegge nye dekk før neste sesong.",
      },
      {
        q: "Må jeg ha ferdig monterte hjul?",
        a: "Dekkhotell gjelder komplette hjul (dekk på felg). Har du bare løse dekk, kan vi montere dem på felg først.",
      },
    ],
    relatedBlogSlug: "valg-av-dekk-sommer-vinter",
  },
  {
    slug: "bilverksted-larvik",
    name: "Bilverksted",
    metaTitle: "Bilverksted i Larvik – timepris 1400,- | 4Dekk Larvik",
    metaDescription:
      "Bilverksted i Larvik for reparasjon, service og vedlikehold. Konkurransedyktig timepris på 1400,-. Statens vegvesen-godkjent verksted på Torstrand. Bestill time.",
    h1: "Bilverksted i Larvik",
    intro: [
      "4Dekk Larvik er et fullverdig bilverksted som utfører service, reparasjon og vedlikehold på de fleste bilmerker. Vi har bred erfaring med ulike biltyper og bruker moderne diagnoseutstyr for å finne feil raskt.",
      "Timeprisen er 1400,-. Deler som bremseklosser, filtre og lignende bør ofte bestilles på forhånd på grunn av begrenset delelager.",
    ],
    image: "/images/brake-repair.webp",
    imageAlt: "Mekaniker som utfører reparasjon på bilverksted hos 4Dekk Larvik",
    priceLabel: "1400,- / time",
    priceNote:
      "Timepris for verkstedarbeid. Diagnose fra 700,-. Prisoverslag før arbeidet starter.",
    bookingUrl: "/booking",
    serviceType: "Bilverksted / bilreparasjon og service",
    sections: [
      {
        heading: "Hva vi hjelper deg med",
        body: [
          "Vi startet som dekkverksted og har utvidet til et Statens vegvesen-godkjent bilverksted. Vi tar både små jobber og større vedlikehold.",
        ],
        bullets: [
          "Service og oljeskift med kvalitetsolje og filter",
          "Bremser – klosser, skiver, bremsevæske",
          "Feilsøking og diagnose av motor og elektronikk",
          "Hjuloppheng, støtdempere og styring",
          "Reparasjoner i forbindelse med EU-kontroll",
          "AC-service på biler med R134a",
        ],
      },
      {
        heading: "Prisoverslag før vi begynner",
        body: [
          "Du får et overslag på arbeid og deler før vi setter i gang, og beskjed hvis vi oppdager noe underveis som endrer bildet. Diagnose starter på 700,-, og beløpet trekkes normalt fra hvis du bestiller reparasjonen hos oss.",
        ],
      },
      {
        heading: "Bestill time",
        body: [
          "Beskriv symptomene når du bestiller – ulyd, varsellampe, når det oppstår – så kan vi sette av riktig tid og eventuelt forhåndsbestille deler.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva er timeprisen på verkstedet?",
        a: "Timeprisen for verkstedarbeid er 1400,-. Diagnose starter på 700,-.",
      },
      {
        q: "Reparerer dere alle bilmerker?",
        a: "Vi jobber på de fleste merker og biltyper. Er du usikker på om vi tar din bil, ta kontakt før du bestiller.",
      },
      {
        q: "Får jeg pris før arbeidet starter?",
        a: "Ja. Du får et overslag på deler og arbeid før vi begynner, og beskjed hvis noe endrer seg underveis.",
      },
      {
        q: "Kan dere fikse feil fra EU-kontrollen?",
        a: "Ja, vi utfører reparasjonene som trengs og tar etterkontrollen på samme sted.",
      },
    ],
    relatedBlogSlug: "bilvedlikehold-tips-og-rad",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
