// Dedikerte tjeneste-landingssider for lokal SEO (Larvik).
// Innholdet er forankret i data/pricing.json, data/services.json og
// data/blogs/*.json – ingen nye faktapåstander utover det som allerede
// står på nettstedet og allmenne norske kjøretøyregler (Statens vegvesen).

export interface ServicePageSection {
  heading: string;
  body: string[];
  bullets?: string[];
  // Valgfri anker-id for lenker som skal scrolle til seksjonen,
  // f.eks. /tjenester/eu-kontroll-larvik#etterkontroll
  id?: string;
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
  // Én eller flere relaterte bloggposter.
  relatedBlogSlug?: string;
  relatedBlogSlugs?: string[];
  // Søsken-tjenester som vises i "Andre tjenester"-blokka.
  relatedServiceSlugs?: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "eu-kontroll-larvik",
    name: "EU-kontroll",
    metaTitle: "EU-kontroll i Larvik – 1150,- | 4Dekk Larvik",
    metaDescription:
      "EU-kontroll i Larvik hos 4Dekk til 1150,-. Autorisert kontrollorgan med direkte forbindelse til Statens vegvesen. Bestill time på Nanset i dag.",
    h1: "EU-kontroll i Larvik",
    intro: [
      "EU-kontroll hos 4Dekk Larvik koster 1150,- uansett bilmerke. Vi er godkjent kontrollorgan hos Statens vegvesen (Kontrollorgan 01, kjøretøy ≤ 3500 kg) og utfører den periodiske kjøretøykontrollen for personbiler og varebiler.",
      "Kontrollen har rundt 150 kontrollpunkter og dekker bremser, styring, lys, hjuloppheng, dekk, understell, avgass og sikkerhetsutstyr. Resultatet registreres direkte hos Statens vegvesen mens bilen står hos oss, så godkjenningen er på plass med en gang. Du finner 4Dekk AS i Statens vegvesens oversikt over godkjente verksteder.",
    ],
    image: "/images/eucontrol.webp",
    imageAlt: "Bil inne til EU-kontroll hos 4Dekk Larvik",
    priceLabel: "1150,-",
    priceNote:
      "Fast pris uansett bilmerke. Etterkontroll etter utbedring koster 400,-.",
    bookingUrl: "https://calendly.com/4dekk-service2/eu-kontroll",
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
        id: "etterkontroll",
        heading: "Etterkontroll – hvis bilen ikke blir godkjent",
        body: [
          "Får bilen merknad med krav om etterkontroll, må feilene utbedres før bilen framstilles på nytt. Ved etterkontrollen sjekker vi kun at de anmerkede punktene er rettet – det er ikke en ny full kontroll, så den går som regel raskt.",
          "Etterkontroll hos 4Dekk Larvik koster 400,-. Du kan ta den hos hvilket som helst godkjent verksted, men vi utfører gjerne både reparasjonen og etterkontrollen på samme sted, slik at du slipper å kjøre mellom flere verksteder. Fristen for etterkontroll er normalt to måneder etter EU-kontrollen.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster EU-kontroll hos 4Dekk Larvik?",
        a: "Hos 4Dekk Larvik koster EU-kontroll 1150,- uansett bilmerke. Trenger bilen etterkontroll etter utbedring, koster den 400,-.",
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
    relatedServiceSlugs: [
      "bilverksted-larvik",
      "bildiagnose-larvik",
      "service-og-oljeskift-larvik",
    ],
  },
  {
    slug: "hjulskift-larvik",
    name: "Hjulskift",
    metaTitle: "Hjulskift i Larvik – fra 600,- | 4Dekk Larvik",
    metaDescription:
      "Rask hjulskift mellom sommer- og vinterdekk i Larvik. Fra 600,- for personbil. Dekksjekk og lufttrykk inkludert. Bestill time hos 4Dekk på Nanset.",
    h1: "Hjulskift i Larvik",
    intro: [
      "Hjulskift av ferdig monterte hjul hos 4Dekk i Larvik koster 600,- for personbil, 650,- for SUV og varebil, og 700,- for bobil – kontroll av lufttrykk er inkludert.",
      "Vi tar sesongskiftet mellom sommer- og vinterdekk raskt: bilen løftes på hydraulisk løftebukk, dekkene kontrolleres for slitasje og skader, og hjulboltene trekkes til med riktig moment.",
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
        a: "Hos 4Dekk i Larvik koster hjulskift av ferdig monterte hjul 600,- for personbil, 650,- for SUV og varebil, og 700,- for bobil.",
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
    relatedServiceSlugs: [
      "dekkhotell-larvik",
      "dekkservice-larvik",
      "hjulstilling-larvik",
    ],
  },
  {
    slug: "hjulstilling-larvik",
    name: "4-hjulskontroll",
    metaTitle: "Hjulstilling og 4-hjulskontroll i Larvik – 1875,- | 4Dekk",
    metaDescription:
      "4-hjulskontroll og justering av hjulstilling i Larvik. 1875,- med digitalt måleutstyr. Reduser ujevn dekkslitasje og skjevtrekk. Bestill hos 4Dekk Larvik.",
    h1: "Hjulstilling og 4-hjulskontroll i Larvik",
    intro: [
      "4-hjulskontroll med justering av hjulstilling hos 4Dekk i Larvik koster 1875,-. Feil hjulstilling gir ujevn og rask dekkslitasje, skjevtrekk og tyngre styring.",
      "Vi måler og justerer camber, toe (spissing) og caster på alle fire hjul med digitalt måleutstyr, og sammenligner mot bilprodusentens verdier.",
    ],
    image: "/images/4hjulskontroll.webp",
    imageAlt: "4-hjulskontroll med digitalt måleutstyr hos 4Dekk Larvik",
    priceLabel: "1875,-",
    priceNote:
      "Inkluderer måling og justering av hjulstilling på alle fire hjul.",
    bookingUrl: "https://calendly.com/4dekk-service2/4hjulskontroll",
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
    relatedServiceSlugs: [
      "dekkservice-larvik",
      "hjulskift-larvik",
    ],
  },
  {
    slug: "ac-service-larvik",
    name: "AC-service",
    metaTitle: "AC-service i Larvik – 1500,- + gass | 4Dekk Larvik",
    metaDescription:
      "AC-service i Larvik: trykktest, lekkasjesøk og påfylling av kuldemedium. 1500,- for diagnose pluss 3,-/gram gass. Kun biler med R134a. Bestill hos 4Dekk.",
    h1: "AC-service i Larvik",
    intro: [
      "AC-service hos 4Dekk i Larvik koster 1500,- for trykktest og diagnose, i tillegg 3,- per gram kuldemedium som fylles på. Vi utfører service på anlegg med kuldemedium R134a, ikke den nyere typen R1234yf.",
      "Dårlig kjøling, vond lukt eller dugg som ikke forsvinner er typiske tegn på at klimaanlegget trenger service. Vi trykktester anlegget, gjør lekkasjesøk og fyller på kuldemedium ved behov.",
    ],
    image: "/images/ACservice.webp",
    imageAlt: "AC-service og påfylling av kuldemedium hos 4Dekk Larvik",
    priceLabel: "1500,- + 3,-/gram",
    priceNote:
      "1500,- for trykktest og diagnose. Kuldemedium 3,- per gram. Gjelder kun biler med R134a.",
    bookingUrl: "https://calendly.com/4dekk-service/a-c-service",
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
        a: "Hos 4Dekk Larvik koster AC-service 1500,- for trykktest og diagnose, pluss 3,- per gram kuldemedium som fylles på.",
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
    relatedBlogSlug: "klimaanlegg-ac-service-bil-tegn-vedlikehold",
    relatedServiceSlugs: ["bilverksted-larvik", "bildiagnose-larvik"],
  },
  {
    slug: "dekkhotell-larvik",
    name: "Dekkhotell",
    metaTitle: "Dekkhotell i Larvik – fra 500,- | 4Dekk Larvik",
    metaDescription:
      "Dekkhotell i Larvik med hjulvask, slitasjekontroll og sesongskifte. Fra 500,-, totalpris per sesong fra 1300,-. Slipp å oppbevare dekk hjemme – 4Dekk på Nanset.",
    h1: "Dekkhotell i Larvik",
    intro: [
      "Dekkhotell hos 4Dekk i Larvik koster fra 500,- for oppbevaring. Totalpris per sesong inkludert hjulskift er fra 1300,- for personbil (SUV 1350,-, bobil under 3,5 tonn 1400,-).",
      "Vi oppbevarer sommer- og vinterhjulene dine trygt og tørt mellom sesongene. Hjulene vaskes, kontrolleres for slitasje og skader, og merkes før de settes på lager.",
    ],
    image: "/images/dekkhotell.webp",
    imageAlt: "Dekkhotell med merkede hjul på lager hos 4Dekk Larvik",
    priceLabel: "fra 500,-",
    priceNote:
      "Oppbevaring fra 500,-. Totalpris per sesong inkl. hjulskift og hjulvask fra 1300,- (SUV 1350,-, bobil <3,5t 1400,-).",
    bookingUrl: "https://calendly.com/4dekk/dekkskift-dekkhotell",
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
        a: "Hos 4Dekk Larvik koster oppbevaring på dekkhotell fra 500,-. Totalpris per sesong inkludert hjulskift og hjulvask er fra 1300,- for personbil.",
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
    relatedServiceSlugs: [
      "hjulskift-larvik",
      "dekkservice-larvik",
    ],
  },
  {
    slug: "bilverksted-larvik",
    name: "Bilverksted",
    metaTitle: "Bilverksted i Larvik – timepris 1400,- | 4Dekk Larvik",
    metaDescription:
      "Bilverksted i Larvik for reparasjon, service og vedlikehold. Konkurransedyktig timepris på 1400,-. Statens vegvesen-godkjent verksted på Nanset. Bestill time.",
    h1: "Bilverksted i Larvik",
    intro: [
      "Timeprisen for verkstedarbeid hos 4Dekk i Larvik er 1400,-, og du får alltid et prisoverslag før arbeidet starter. Vi er et fullverdig, Statens vegvesen-godkjent bilverksted som utfører service, reparasjon og vedlikehold på de fleste bilmerker.",
      "Vi har bred erfaring med ulike biltyper og bruker moderne diagnoseutstyr for å finne feil raskt. Deler som bremseklosser, filtre og lignende bør ofte bestilles på forhånd på grunn av begrenset delelager.",
    ],
    image: "/images/brake-repair.webp",
    imageAlt: "Mekaniker som utfører reparasjon på bilverksted hos 4Dekk Larvik",
    priceLabel: "1400,- / time",
    priceNote:
      "Timepris for verkstedarbeid. Diagnose fra 700,-. Prisoverslag før arbeidet starter.",
    bookingUrl: "/contact",
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
    relatedServiceSlugs: [
      "eu-kontroll-larvik",
      "service-og-oljeskift-larvik",
      "bremseservice-larvik",
    ],
  },
  {
    slug: "service-og-oljeskift-larvik",
    name: "Service og oljeskift",
    metaTitle: "Service og oljeskift i Larvik – fra 2000,- | 4Dekk Larvik",
    metaDescription:
      "Oljeskift og service i Larvik hos 4Dekk. Fra 2000,- for oljeskift med kvalitetsolje, filter og arbeid. Velg servicenivå ved booking. Bestill time på Nanset.",
    h1: "Service og oljeskift i Larvik",
    intro: [
      "Et oljeskift med olje, oljefilter og arbeid hos 4Dekk i Larvik starter på rundt 2000,-. Endelig pris avhenger av biltype, oljemengde og oljetype, og av hva du legger til av filtre og vedlikehold.",
      "Regelmessig service er avgjørende for motorens levetid og ytelse. Ved bestilling velger du servicenivå – fra et enkelt oljeskift til mer omfattende service med flere filtre og kontrollpunkter. Vi bruker kvalitetsoljer og -filtre etter bilprodusentens spesifikasjon.",
    ],
    image: "/images/oil-change.webp",
    imageAlt: "Oljeskift og service på bil hos 4Dekk Larvik",
    priceLabel: "fra 2000,-",
    priceNote:
      "Oljeskift med olje, oljefilter og arbeid fra ca. 2000,-. Pris varierer med biltype, oljetype og valgte tillegg.",
    bookingUrl: "https://calendly.com/d/cw8m-3w4-8yy/oljeskift",
    serviceType: "Bilservice / oljeskift",
    sections: [
      {
        heading: "Hva som er med i et oljeskift",
        body: [
          "Grunnpakken dekker det motoren trenger oftest. Du kan bygge på med flere filtre og kontrollpunkter når du bestiller.",
        ],
        bullets: [
          "Tapping av gammel olje og bytte av oljefilter",
          "Påfylling av ny kvalitetsolje etter bilprodusentens spesifikasjon",
          "Nullstilling av serviceintervall der bilen støtter det",
          "Valgfritt: luftfilter, kupéfilter, drivstoffilter og nivåkontroll av øvrige væsker",
        ],
      },
      {
        heading: "Hvor ofte bør du skifte olje?",
        body: [
          "De fleste nyere biler har serviceintervall på 1–2 år eller 15 000–30 000 km, men mye kortkjøring, tilhengerdrag og kaldt klima trekker intervallet ned. Følg intervallet i servicheftet, og sjekk oljenivået selv mellom servicene.",
        ],
      },
      {
        heading: "Bestill service",
        body: [
          "Velg servicenivå når du bestiller time. Er du usikker på hva bilen din trenger, ta kontakt, så finner vi riktig pakke ut fra kilometerstand og servicehistorikk.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster et oljeskift i Larvik?",
        a: "Hos 4Dekk Larvik starter et oljeskift med olje, oljefilter og arbeid på rundt 2000,-. Prisen varierer med biltype, oljemengde og oljetype, og om du legger til luftfilter, kupéfilter eller mer omfattende service.",
      },
      {
        q: "Bruker dere original olje?",
        a: "Vi bruker kvalitetsolje som oppfyller bilprodusentens spesifikasjon for din motor.",
      },
      {
        q: "Kan jeg få full service, ikke bare oljeskift?",
        a: "Ja. Ved booking velger du mellom flere servicenivåer, fra enkelt oljeskift til mer omfattende service med flere filtre og kontroller.",
      },
    ],
    relatedBlogSlug: "oljeskift-guide-hvor-ofte-og-hvorfor",
    relatedServiceSlugs: [
      "bilverksted-larvik",
      "eu-kontroll-larvik",
    ],
  },
  {
    slug: "bildiagnose-larvik",
    name: "Feilsøking og diagnose",
    metaTitle: "Feilsøking og bildiagnose i Larvik – fra 700,- | 4Dekk Larvik",
    metaDescription:
      "Feilsøking og bildiagnose i Larvik. Fra 700,- for avlesning av feilkoder og systemtest. Moderne diagnoseutstyr og lang mekanikererfaring. Bestill hos 4Dekk.",
    h1: "Feilsøking og bildiagnose i Larvik",
    intro: [
      "Feilsøking og bildiagnose hos 4Dekk i Larvik starter på 700,- (ca. 0,5 time). Bestiller du reparasjonen hos oss, trekkes beløpet normalt fra på sluttregningen.",
      "Varsellampe på dashbordet, ulyd, dårlig gange eller uforklarlig høyt forbruk? Vi kombinerer moderne diagnoseutstyr med lang mekanikererfaring for å finne årsaken – ikke bare lese en feilkode.",
    ],
    image: "/images/engine-diagnostics.webp",
    imageAlt: "Feilsøking med diagnoseutstyr på bil hos 4Dekk Larvik",
    priceLabel: "fra 700,-",
    priceNote:
      "Startpris 700,- for ca. 0,5 time. Trekkes normalt fra hvis du bestiller reparasjonen hos oss.",
    bookingUrl: "https://calendly.com/d/cr7j-wcf-8qy/diagnose-av-bilproblemer",
    serviceType: "Feilsøking / bildiagnose",
    sections: [
      {
        heading: "Hva diagnosen omfatter",
        body: [
          "Vi tar utgangspunkt i symptomene dine og jobber oss systematisk fram til årsaken.",
        ],
        bullets: [
          "Avlesning og tolking av feilkoder fra bilens styreenheter",
          "Test av bilsystemer, sensorer og ytelse under drift",
          "Teknisk inspeksjon av mistenkte komponenter",
          "Nøye feilsøking der feilkoden alene ikke gir svaret",
          "Klar tilbakemelding på hva som er galt og hva utbedring vil koste",
        ],
      },
      {
        heading: "Typiske grunner til å bestille diagnose",
        body: [],
        bullets: [
          "Motorlampe, ABS-lampe eller annen varsellampe lyser",
          "Bilen rykker, mister krefter eller går ujevnt på tomgang",
          "Uforklarlig høyt drivstofforbruk",
          "Feil som kommer og går, eller ulyd du ikke får plassert",
          "Kontroll før kjøp av bruktbil",
        ],
      },
      {
        heading: "Bestill diagnose",
        body: [
          "Beskriv symptomene så presist du kan når du bestiller – når det oppstår, ved hvilken hastighet, kaldt eller varmt – det korter ned feilsøkingen.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster feilsøking hos 4Dekk Larvik?",
        a: "Hos 4Dekk Larvik starter diagnose på 700,- for cirka en halvtime. Krever feilen mer omfattende feilsøking, avtaler vi det med deg først.",
      },
      {
        q: "Trekkes diagnoseprisen fra hvis jeg reparerer hos dere?",
        a: "Ja, som regel trekkes diagnosebeløpet fra på sluttregningen når du bestiller reparasjonen hos oss.",
      },
      {
        q: "Kan dere lese av alle bilmerker?",
        a: "Vi leser av og feilsøker de fleste merker og modeller. Er du usikker, ta kontakt før du bestiller.",
      },
    ],
    relatedBlogSlug: "varsellamper-bilproblemer-diagnostikk-guide",
    relatedServiceSlugs: ["bilverksted-larvik", "service-og-oljeskift-larvik"],
  },
  {
    slug: "dekkservice-larvik",
    name: "Dekkservice",
    metaTitle: "Dekkservice i Larvik – nye dekk, montering og balansering | 4Dekk",
    metaDescription:
      "Dekkservice i Larvik: vi skaffer nye dekk fra de store leverandørene, monterer, balanserer og reparerer. Omlegging fra 1000,-, balansering fra 500,-. 4Dekk på Nanset.",
    h1: "Dekkservice i Larvik",
    intro: [
      "Dekkservice hos 4Dekk i Larvik dekker alt fra kjøp av nye dekk til omlegging fra 1000,-, digital balansering fra 500,-, punkteringsreparasjon og lufttrykkontroll.",
      "Vi er først og fremst et dekkverksted. Vi selger og skaffer nye dekk fra de store leverandørene – mange merker og dimensjoner kan hentes inn på kort varsel – og hjelper deg med å velge riktig dekk til bil, kjøremønster og budsjett.",
    ],
    image: "/images/tire-service.webp",
    imageAlt: "Dekkservice med montering og balansering hos 4Dekk Larvik",
    priceLabel: "omlegging fra 1000,-",
    priceNote:
      "Omlegging med balansering fra 1000,-. Balansering fra 500,-. Dekk levert via Dekkonline/Dekk365 o.l.: fra 1800,-. Punkteringsreparasjon fra 300,-.",
    bookingUrl: "https://calendly.com/4dekk/omlegging-av-dekk",
    serviceType: "Dekkservice / dekksalg og montering",
    sections: [
      {
        heading: "Nye dekk – vi skaffer og monterer",
        body: [
          "Trenger du nye dekk, ordner vi hele jobben. Vi har avtaler med store leverandører og får inn de fleste merker og dimensjoner raskt, både sommer-, vinter- og helårsdekk.",
        ],
        bullets: [
          "Kjøpshjelp – vi anbefaler dekk ut fra bil, kjøremønster og pris",
          "Bestilling og henting av dekk på kort varsel",
          "Montering på felg og digital balansering innenfor 5 gram",
          "Vurdering og avhending av de gamle dekkene",
        ],
      },
      {
        heading: "Omlegging, balansering og reparasjon",
        body: [
          "Har du dekk fra før, eller har fått dem levert fra en nettbutikk, monterer vi dem på felgene dine.",
        ],
        bullets: [
          "Omlegging med balansering: fra 1000,-",
          "Dekk levert via Dekkonline, Dekk365 og lignende: fra 1800,-",
          "Balansering av løse hjul: fra 500,-",
          "Punkteringsreparasjon: plugg utvendig 300,-, innvendig 600,-",
          "Kontroll av mønsterdybde og lufttrykk",
        ],
      },
      {
        heading: "Når bør du bytte dekk?",
        body: [
          "Bytt vinterdekk når mønsterdybden nærmer seg 3 mm og sommerdekk ved 1,6 mm – men merkbart dårligere grep, sprekker i gummien eller dekk eldre enn rundt ti år er også god grunn. Vi sier fra ved sesongskifte og dekkhotell hvis settet nærmer seg grensen.",
        ],
      },
    ],
    faq: [
      {
        q: "Kan 4Dekk skaffe meg nye dekk?",
        a: "Ja. Vi selger dekk og henter inn de fleste merker og dimensjoner fra store leverandører på kort varsel, og hjelper deg med å velge riktig dekk.",
      },
      {
        q: "Hva koster det å legge om dekk?",
        a: "Hos 4Dekk Larvik koster omlegging med balansering fra 1000,-. Er dekkene levert via Dekkonline, Dekk365 eller lignende, er prisen fra 1800,-.",
      },
      {
        q: "Kan dere montere dekk jeg har kjøpt på nett?",
        a: "Ja, vi monterer og balanserer dekk du har fått levert fra nettbutikk. Pris fra 1800,- for et komplett sett.",
      },
      {
        q: "Reparerer dere punktering?",
        a: "Ja. Utvendig plugg koster 300,-, innvendig reparasjon 600,-. Om reparasjon er forsvarlig avhenger av skadens plassering og dekkslitasjen.",
      },
    ],
    relatedBlogSlug: "valg-av-dekk-sommer-vinter",
    relatedServiceSlugs: [
      "hjulstilling-larvik",
      "hjulskift-larvik",
      "dekkhotell-larvik",
    ],
  },
  {
    slug: "dekk-larvik",
    name: "Nye dekk",
    metaTitle: "Kjøpe dekk i Larvik – sommerdekk, vinterdekk, piggdekk | 4Dekk",
    metaDescription:
      "Kjøpe nye dekk i Larvik hos 4Dekk. Sommerdekk, vinterdekk, piggdekk og helårsdekk fra store leverandører, skaffet på kort varsel. Vi hjelper deg å velge riktig. Kontakt oss for pristilbud.",
    h1: "Kjøpe nye dekk i Larvik",
    intro: [
      "Trenger du nye dekk? Hos 4Dekk Larvik får du hjelp med hele jobben – fra å velge riktig dekk til montering og balansering. Vi har avtaler med store leverandører og henter inn de fleste merker og dimensjoner på kort varsel: sommerdekk, vinterdekk, piggdekk og helårsdekk.",
      "Vi har ikke faste listepriser på dekk siden de varierer med merke, dimensjon og sesong. Ta kontakt med bil og ønsket dekktype, så gir vi deg et konkret pristilbud – og du får ærlige råd om hva som faktisk passer bilen din og kjøremønsteret ditt.",
    ],
    image: "/images/tire-service.webp",
    imageAlt: "Nye bildekk til salgs hos 4Dekk Larvik",
    priceLabel: "Kontakt oss for pristilbud",
    priceNote:
      "Dekkpris varierer med merke, dimensjon og sesong. Montering og balansering kommer i tillegg (omlegging fra 1000,-).",
    bookingUrl: "/contact",
    serviceType: "Dekksalg / kjøpe nye dekk",
    sections: [
      {
        heading: "Sommerdekk, vinterdekk eller helårsdekk?",
        body: [
          "Valget avhenger av hvor og hvor mye du kjører. Vi går gjennom alternativene med deg ut fra bil, budsjett og forhold.",
        ],
        bullets: [
          "Sommerdekk: best grep og kjørekomfort på bar og varm asfalt",
          "Vinterdekk uten pigg: godt vintergrep, lavere støy, kan brukes hele vinteren",
          "Piggdekk: best på is og hardpakket snø – tillatt 1. november til første søndag etter påske",
          "Helårsdekk: praktisk for lite vinterkjøring, men et kompromiss i begge sesonger",
        ],
      },
      {
        heading: "Vi skaffer og monterer alt på ett sted",
        body: [
          "Du slipper å bestille dekk selv og frakte dem rundt.",
        ],
        bullets: [
          "Kjøpshjelp – vi anbefaler dekk ut fra bil, kjøremønster og pris",
          "Bestilling og henting fra store leverandører på kort varsel",
          "Montering på felg og digital balansering innenfor 5 gram",
          "Vurdering og avhending av de gamle dekkene",
          "Dekkhotell hvis du vil oppbevare det andre settet hos oss",
        ],
      },
      {
        heading: "Slik får du pristilbud",
        body: [
          "Ring 93 99 55 55 eller send oss en melding med registreringsnummer og hvilken dekktype du ser etter. Da finner vi riktig dimensjon og gir deg pris på dekk montert og balansert.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster nye dekk hos 4Dekk Larvik?",
        a: "Dekkpris varierer med merke, dimensjon og sesong, så vi gir pristilbud per bil. Ta kontakt med registreringsnummer og ønsket dekktype. Montering og balansering (omlegging fra 1000,-) kommer i tillegg.",
      },
      {
        q: "Kan dere skaffe akkurat det dekket jeg vil ha?",
        a: "Som regel ja. Vi henter inn de fleste merker og dimensjoner fra store leverandører, ofte i løpet av en dag eller to.",
      },
      {
        q: "Kan dere hjelpe meg å velge riktig dekk?",
        a: "Ja. Vi anbefaler dekk ut fra bilen din, hvor mye du kjører om vinteren og hva du vil bruke på det – uten å presse deg mot det dyreste.",
      },
      {
        q: "Tar dere de gamle dekkene?",
        a: "Ja, vi tar hånd om og avhender de gamle dekkene når du kjøper nye hos oss.",
      },
    ],
    relatedBlogSlug: "valg-av-dekk-sommer-vinter",
    relatedBlogSlugs: [
      "valg-av-dekk-sommer-vinter",
      "dekkslitasje-arsaker-forebygging-tips",
    ],
    relatedServiceSlugs: [
      "hjulskift-larvik",
      "dekkhotell-larvik",
      "dekkservice-larvik",
    ],
  },
  {
    slug: "bremseservice-larvik",
    name: "Bremseservice",
    metaTitle: "Bremseservice i Larvik – bremseklosser og skiver | 4Dekk Larvik",
    metaDescription:
      "Bremseservice i Larvik hos 4Dekk: kontroll og bytte av bremseklosser, bremseskiver og bremsevæske på de fleste bilmerker. Timepris 1400,-. Kontakt oss for pristilbud.",
    h1: "Bremseservice i Larvik",
    intro: [
      "Piper eller skurrer bremsene, er pedalen svampete eller trekker bilen til siden ved bremsing? Da bør bremsene sjekkes. 4Dekk Larvik utfører bremseservice på de fleste bilmerker – kontroll og bytte av bremseklosser, bremseskiver og bremsevæske.",
      "Pris avhenger av bil, hvilke deler som må byttes og om det er foran, bak eller begge deler, så vi gir pristilbud per bil. Timeprisen for verkstedarbeid er 1400,-, og du får et overslag på deler og arbeid før vi begynner.",
    ],
    image: "/images/brake-repair.webp",
    imageAlt: "Bremseservice med bytte av bremseklosser hos 4Dekk Larvik",
    priceLabel: "Kontakt oss for pristilbud",
    priceNote:
      "Timepris verksted 1400,-. Delekostnad varierer med bilmerke og omfang. Prisoverslag før arbeidet starter.",
    bookingUrl: "/contact",
    serviceType: "Bremseservice / bremsereparasjon",
    sections: [
      {
        heading: "Tegn på at bremsene trenger service",
        body: [
          "Bremsene er den viktigste sikkerhetskomponenten på bilen. Ta kontakt hvis du kjenner igjen noe av dette:",
        ],
        bullets: [
          "Piping, skuring eller metallisk lyd ved bremsing",
          "Lengre bremsevei eller svampete bremsepedal",
          "Bilen trekker til én side når du bremser",
          "Vibrasjon i pedal eller ratt ved nedbremsing",
          "Bremsevarsellampe på dashbordet",
        ],
      },
      {
        heading: "Hva bremseservice omfatter",
        body: [
          "Vi starter med en kontroll og gir deg pris på det som faktisk må gjøres.",
        ],
        bullets: [
          "Måling av bremseklosser og bremseskiver mot slitasjegrense",
          "Bytte av bremseklosser og eventuelt skiver, foran og/eller bak",
          "Bytte av bremsevæske ved behov (anbefales hvert andre år)",
          "Kontroll av bremsekalipere, slanger og håndbrekk",
          "Prøvekjøring etter arbeidet",
        ],
      },
      {
        heading: "Bestill bremseservice",
        body: [
          "Bestill time på nett eller ring 93 99 55 55 og beskriv symptomene. Slitte bremser bør ikke vente – kjør forsiktig til bilen er inne.",
        ],
      },
    ],
    faq: [
      {
        q: "Hva koster bremseservice i Larvik?",
        a: "Hos 4Dekk Larvik varierer prisen med bilmerke og hva som må byttes, så vi gir pristilbud per bil. Timeprisen for arbeidet er 1400,-, og du får et overslag på deler og arbeid før vi starter.",
      },
      {
        q: "Hvor ofte bør bremsevæsken byttes?",
        a: "Et vanlig intervall er hvert andre år. Bremsevæske trekker fukt over tid, noe som senker kokepunktet og svekker bremseeffekten.",
      },
      {
        q: "Kan jeg kjøre med slitte bremser?",
        a: "Kjør så lite som mulig og forsiktig. Slitte klosser kan skade skivene og gir lengre bremsevei – få bilen inn så snart du kan.",
      },
      {
        q: "Bytter dere bremser på alle bilmerker?",
        a: "Vi utfører bremseservice på de fleste merker og modeller. Er du usikker, ta kontakt før du bestiller.",
      },
    ],
    relatedBlogSlug: "bilvedlikehold-tips-og-rad",
    relatedServiceSlugs: [
      "bilverksted-larvik",
      "eu-kontroll-larvik",
      "bildiagnose-larvik",
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
