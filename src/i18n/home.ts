// Homepage copy, one entry per language. Rule: one page = one language.
// IT = current production copy. EN = provided translations (not invented).

export type HomeLang = 'it' | 'en';

export type WaKey = 'hero' | 'vetrina' | 'completo' | 'prenotazioni' | 'gestione' | 'contatti';

interface ServiceCard {
  k: string;
  h: string;
  p: string;
  wa: WaKey; // which prefilled WhatsApp message this card links to
}

interface HomeStrings {
  topbar: { pro: string };
  hero: { h1a: string; h1b: string; sub: string; cta: string; note: string };
  servizi: { eyebrow: string; msgLink: string; cards: ServiceCard[] };
  come: { eyebrow: string; steps: { n: string; h: string; p: string }[] };
  caso: { eyebrow: string; mediaAlt: string; taxiTag: string; taxiP: string; tmoTag: string; tmoP: string; quote?: string; quoteBy?: string };
  chi: { eyebrow: string; photoAlt: string; text: string };
  contatti: { eyebrow: string; h2: string; p: string; cta: string };
  email: { subject: string; body: string; ctaPreset: string; ctaFree: string };
  float: { label: string; aria: string };
  wa: Record<WaKey, string>;
}

export const home: Record<HomeLang, HomeStrings> = {
  it: {
    topbar: { pro: 'For startups & agencies →' },
    hero: {
      h1a: 'Siti web per le attività',
      h1b: 'della Lunigiana',
      sub: 'Ristoranti, negozi, B&B e agriturismi di Pontremoli e dintorni: siti veloci, curati e facili da trovare su Google. Online in 14 giorni dal primo messaggio.',
      cta: 'Scrivimi su WhatsApp',
      note: 'Progetti su misura. Preventivo su richiesta, rispondo in giornata.',
    },
    servizi: {
      eyebrow: 'Servizi',
      msgLink: 'Scrivimi per questo →',
      cards: [
        { k: '01', h: 'Sito vetrina', p: 'Per farti trovare: chi cerca la tua attività su Google trova foto, orari, contatti e la strada per arrivare da te.', wa: 'vetrina' },
        { k: '02', h: 'Sito completo', p: 'Per lavorare di più: menu, richieste di preventivo, versione in inglese per i turisti.', wa: 'completo' },
        { k: '03', h: 'Gestione continua', p: 'Ci penso io, ogni mese: aggiornamenti, modifiche, scheda Google sempre in ordine. Tu pensi al tuo lavoro, il sito lavora per te.', wa: 'gestione' },
        { k: '04', h: 'Prenotazioni e piattaforme su misura', p: 'Per B&B, ristoranti e attività: un sistema di prenotazioni online integrato nel tuo sito, costruito su come lavori tu. Non solo una vetrina — uno strumento che lavora.', wa: 'prenotazioni' },
      ],
    },
    come: {
      eyebrow: 'Come funziona',
      steps: [
        { n: '1', h: 'Mi scrivi su WhatsApp', p: 'Due righe sulla tua attività e su cosa ti serve.' },
        { n: '2', h: 'Preventivo chiaro entro 48 ore', p: 'Prezzo fisso e tempi certi, nero su bianco.' },
        { n: '3', h: 'Online in 14 giorni', p: 'Pubblico il sito, ti spiego come funziona e resto a disposizione.' },
      ],
    },
    caso: {
      eyebrow: 'Caso studio',
      mediaAlt: 'Taxi Pontremoli — caso studio',
      taxiTag: 'Online',
      taxiP: 'Michele aveva bisogno di farsi trovare da turisti e clienti: oggi taxi-pontremoli.com porta richieste di corsa direttamente da Google.',
      quote: 'Semplice, chiaro ed esaustivo. Nicolò ascolta le tue esigenze e, mettendosi nei panni del cliente, rende accessibile e trasparente il servizio. Ho già avuto riscontri positivi — e anche i miei clienti ne sono rimasti entusiasti.',
      quoteBy: 'Michele · Taxi Pontremoli',
      tmoTag: 'Progetto personale',
      tmoP: 'Trading Mind OS — piattaforma web completa che ho progettato e costruito da zero, dal design ai pagamenti.',
    },
    chi: {
      eyebrow: 'Chi sono',
      photoAlt: 'Nicolò Cabrelli',
      text: "Sono Nicolò, sviluppatore web. Il tuo sito lo seguo, dal primo messaggio alla messa online — e se tra un anno serve una modifica, sai chi chiamare. Te lo cucio addosso come fa il sarto con l'abito: misure prese sulla tua attività, non un modello uguale per tutti. Vivo a Pontremoli e della Lunigiana conosco il traffico vero: le stagioni che riempiono la valle, i turisti che scelgono in trenta secondi, le attività che quei clienti li perdono perché online non si trovano. Lavoro con chiunque abbia un'attività — ristoranti, negozi, B&B, artigiani, studi — e un motivo per farsi trovare.",
    },
    contatti: {
      eyebrow: 'Contatti',
      h2: 'Raccontami la tua idea',
      p: 'Scrivimi su WhatsApp e ti rispondo in giornata. Preferisci la mail? Va benissimo lo stesso.',
      cta: 'Scrivimi su WhatsApp',
    },
    email: {
      subject: 'Richiesta preventivo sito web',
      body: "Buondì Nico,\n\nho un'attività a ___ (nome attività: ___) e vorrei un preventivo per un sito web.\n\nCosa mi serve: ___\n\nGrazie,\n___",
      ctaPreset: 'Scrivimi una mail (già impostata)',
      ctaFree: 'oppure scrivimi liberamente a',
    },
    float: { label: 'Scrivimi 👋', aria: 'Scrivimi su WhatsApp' },
    wa: {
      hero: "Buondì Nico! Ho un'attività a ___ e vorrei un preventivo per un sito web. Ti racconto cosa mi serve:",
      vetrina: 'Buondì Nico! Mi interessa il sito vetrina per la mia attività a ___. Mi dici come funziona?',
      completo: 'Buondì Nico! Mi interessa il sito completo (menu) per la mia attività a ___. Ne parliamo?',
      prenotazioni: 'Buondì Nico! Mi interessa un sistema di prenotazioni su misura per la mia attività a ___. Ne parliamo?',
      gestione: 'Buondì Nico! Vorrei saperne di più sulla gestione mensile del sito. Cosa comprende?',
      contatti: 'Buondì Nico! Ho visto il tuo sito e vorrei parlarti del mio progetto:',
    },
  },
  en: {
    topbar: { pro: 'For startups & agencies →' },
    hero: {
      h1a: 'Websites for businesses',
      h1b: 'in Lunigiana',
      sub: 'Restaurants, shops, B&Bs and farm stays in Pontremoli and the surrounding valleys: fast, carefully crafted websites people actually find on Google. Online in 14 days from your first message.',
      cta: 'Message me on WhatsApp',
      note: 'Custom projects. Quote on request — I reply within the day.',
    },
    servizi: {
      eyebrow: 'Services',
      msgLink: 'Message me about this →',
      cards: [
        { k: '01', h: 'Showcase website', p: 'Get found: when someone searches for your business on Google, they see photos, opening hours, contacts and directions.', wa: 'vetrina' },
        { k: '02', h: 'Complete website', p: 'Get more work: menu, quote requests, in Italian and English.', wa: 'completo' },
        { k: '03', h: 'Ongoing care', p: 'I take care of it, every month: updates, edits, your Google profile always in order. You run your business, the site works for you.', wa: 'gestione' },
        { k: '04', h: 'Bookings & custom platforms', p: 'For B&Bs, restaurants and local businesses: an online booking system built into your site, shaped around how you actually work. Not just a showcase — a tool that works.', wa: 'prenotazioni' },
      ],
    },
    come: {
      eyebrow: 'How it works',
      steps: [
        { n: '1', h: 'Message me on WhatsApp', p: 'A couple of lines about your business and what you need.' },
        { n: '2', h: 'A clear quote within 48 hours', p: 'Fixed price and timeline, in writing.' },
        { n: '3', h: 'Online in 14 days', p: 'I publish the site, walk you through it, and stay available.' },
      ],
    },
    caso: {
      eyebrow: 'Case study',
      mediaAlt: 'Taxi Pontremoli — case study',
      taxiTag: 'Online',
      taxiP: 'Michele needed tourists and clients to find him: today taxi-pontremoli.com brings ride requests straight from Google.',
      quote: "Simple, clear and thorough. Nicolò listens to what you need and, putting himself in the customer's shoes, makes the service accessible and transparent. I've already had positive feedback — and my own clients are delighted too.",
      quoteBy: 'Michele · Taxi Pontremoli',
      tmoTag: 'Personal project',
      tmoP: 'Trading Mind OS — a complete web platform I designed and built from scratch, from design to payments.',
    },
    chi: {
      eyebrow: 'About',
      photoAlt: 'Nicolò Cabrelli',
      text: "I'm Nicolò, a web developer. I look after your site from the first message to launch — and if you need a change a year from now, you know who to call. I cut it to fit the way a tailor cuts a suit: measured on your business, not one pattern for everyone. I live in Pontremoli and I know Lunigiana's real traffic: the seasons that fill the valley, the tourists choosing in thirty seconds, the businesses losing those customers because they can't be found online. I work with anyone who runs a business — restaurants, shops, B&Bs, artisans, studios — and a reason to be found.",
    },
    contatti: {
      eyebrow: 'Get in touch',
      h2: 'Tell me about your idea',
      p: "Message me on WhatsApp and I'll reply within the day. Prefer email? That's fine too.",
      cta: 'Message me on WhatsApp',
    },
    email: {
      subject: 'Website quote request',
      body: "Hi Nico,\n\nI run a business in ___ (business name: ___) and I'd like a quote for a website.\n\nWhat I need: ___\n\nThanks,\n___",
      ctaPreset: 'Send me a pre-filled email',
      ctaFree: 'or write to me directly at',
    },
    float: { label: 'Message me 👋', aria: 'Message me on WhatsApp' },
    wa: {
      hero: "Hi Nico! I run a business in ___ and I'd like a quote for a website. Here's what I have in mind:",
      vetrina: "Hi Nico! I'm interested in the showcase website for my business in ___. How does it work?",
      completo: "Hi Nico! I'm interested in the complete website (menu) for my business in ___. Can we talk?",
      prenotazioni: "Hi Nico! I'm interested in a custom booking system for my business in ___. Can we talk?",
      gestione: "Hi Nico! I'd like to know more about the monthly site care. What does it include?",
      contatti: "Hi Nico! I saw your website and I'd like to tell you about my project:",
    },
  },
};
