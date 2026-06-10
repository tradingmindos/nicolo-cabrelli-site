// Homepage copy, one entry per language. Rule: one page = one language.
// IT = current production copy. EN = provided translations (not invented).

export type HomeLang = 'it' | 'en';

export type WaKey = 'hero' | 'vetrina' | 'completo' | 'gestione' | 'contatti';

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
  caso: { eyebrow: string; taxiTag: string; taxiP: string; tmoTag: string; tmoP: string };
  chi: { eyebrow: string; text: string };
  contatti: { eyebrow: string; h2: string; p: string; cta: string };
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
      note: 'Progetti su misura, a partire da 1.200 €. Rispondo in giornata.',
    },
    servizi: {
      eyebrow: 'Servizi',
      msgLink: 'Scrivimi per questo →',
      cards: [
        { k: '01', h: 'Sito vetrina', p: 'Per farti trovare: chi cerca la tua attività su Google trova foto, orari, contatti e la strada per arrivare da te.', wa: 'vetrina' },
        { k: '02', h: 'Sito completo', p: 'Per lavorare di più: menu, prenotazioni, richieste di preventivo, versione in inglese per i turisti.', wa: 'completo' },
        { k: '03', h: 'Gestione continua', p: 'Ci penso io, ogni mese: aggiornamenti, modifiche, scheda Google sempre in ordine. Tu pensi al tuo lavoro, il sito lavora per te.', wa: 'gestione' },
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
      taxiTag: 'Online',
      taxiP: 'Michele aveva bisogno di farsi trovare da turisti e clienti: oggi taxi-pontremoli.com porta richieste di corsa direttamente da Google.',
      tmoTag: 'Progetto mio',
      tmoP: 'Trading Mind OS — piattaforma web completa che ho progettato e costruito da zero, dal design ai pagamenti.',
    },
    chi: {
      eyebrow: 'Chi sono',
      text: 'Sono Nicolò, sviluppatore web. Sono nato e vivo qui, in Lunigiana. Costruisco siti e prodotti web completi, con la stessa cura che metto nei miei progetti. Se sei in zona, il preventivo lo facciamo davanti a un caffè.',
    },
    contatti: {
      eyebrow: 'Contatti',
      h2: 'Raccontami la tua idea',
      p: 'Scrivimi su WhatsApp e ti rispondo in giornata. Preferisci la mail? Va benissimo lo stesso.',
      cta: 'Scrivimi su WhatsApp',
    },
    wa: {
      hero: "Buondì Nico! Ho un'attività a ___ e vorrei un preventivo per un sito web. Ti racconto cosa mi serve:",
      vetrina: 'Buondì Nico! Mi interessa il sito vetrina per la mia attività a ___. Mi dici come funziona?',
      completo: 'Buondì Nico! Mi interessa il sito completo (menu/prenotazioni) per la mia attività a ___. Ne parliamo?',
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
      note: 'Custom projects from €1,200. I reply within the day.',
    },
    servizi: {
      eyebrow: 'Services',
      msgLink: 'Message me about this →',
      cards: [
        { k: '01', h: 'Showcase website', p: 'Get found: when someone searches for your business on Google, they see photos, opening hours, contacts and directions.', wa: 'vetrina' },
        { k: '02', h: 'Complete website', p: 'Get more work: menu, bookings, quote requests, in Italian and English.', wa: 'completo' },
        { k: '03', h: 'Ongoing care', p: 'I take care of it, every month: updates, edits, your Google profile always in order. You run your business, the site works for you.', wa: 'gestione' },
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
      taxiTag: 'Online',
      taxiP: 'Michele needed tourists and clients to find him: today taxi-pontremoli.com brings ride requests straight from Google.',
      tmoTag: 'My own product',
      tmoP: 'Trading Mind OS — a complete web platform I designed and built from scratch, from design to payments.',
    },
    chi: {
      eyebrow: 'About',
      text: "I'm Nicolò, a web developer, born and raised here in Lunigiana. I build complete websites and web products with the same care I put into my own. If you're nearby, we can go over your quote in person — over a coffee.",
    },
    contatti: {
      eyebrow: 'Get in touch',
      h2: 'Tell me about your idea',
      p: "Message me on WhatsApp and I'll reply within the day. Prefer email? That's fine too.",
      cta: 'Message me on WhatsApp',
    },
    wa: {
      hero: "Hi Nico! I run a business in ___ and I'd like a quote for a website. Here's what I have in mind:",
      vetrina: "Hi Nico! I'm interested in the showcase website for my business in ___. How does it work?",
      completo: "Hi Nico! I'm interested in the complete website (menu/bookings) for my business in ___. Can we talk?",
      gestione: "Hi Nico! I'd like to know more about the monthly site care. What does it include?",
      contatti: "Hi Nico! I saw your website and I'd like to tell you about my project:",
    },
  },
};
