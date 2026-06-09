// Bilingual copy, ported verbatim from the approved mockup.
// Values may contain inline HTML (e.g. <b>, &nbsp;) and are injected with set:html
// at build time (default EN) and swapped via innerHTML by the client toggle.

export type Lang = 'en' | 'it';

export const DEFAULT_LANG: Lang = 'en';

export const i18n = {
  en: {
    roles: 'Full-stack developer &nbsp;·&nbsp; <b>Solo founder</b> &nbsp;·&nbsp; Trader',
    loc: 'Pontremoli, IT', remote: 'Remote', avail: 'Open to work',
    lede: 'I’m a self-taught developer who ships products end-to-end — and a trader who uses them. I built and launched a live SaaS on my own.',
    cta_mail: 'Email me',
    eb_do: 'What I do',
    do1_k: 'Build', do1_h: 'End to end',
    do1_p: 'I design and build full-stack web apps — database, backend, and interface — and take them all the way to production.',
    do2_k: 'Ship', do2_h: 'Solo and fast',
    do2_p: 'Trading Mind OS went from idea to a live product with real users, architected and built entirely by me.',
    do3_k: 'Trade', do3_h: 'In the markets',
    do3_p: 'I trade gold and FX discretionarily. Living in the markets is what tells me which tools are worth building.',
    eb_work: 'Selected work', t_live: 'Live', t_live2: 'Live', t_wip: 'In progress',
    p_tmo: 'A trading-psychology SaaS, designed and built solo, end to end. Authentication, a Postgres backend with row-level security, a configurable dashboard, a multi-currency system, a server-side Anthropic API integration, and a custom MetaTrader 5 bridge that syncs live trades into the platform.',
    p_taxi: 'A complete production website for a local business, delivered end to end: fast, SEO-optimized, and deployed on Cloudflare.',
    p_wip_h: 'Currently building', p_wip: 'A broader ecosystem of tools for traders. More soon.',
    eb_stack: 'Stack',
    eb_mkt: 'On the markets',
    mkt_h: 'I build the tools, and I use them.',
    mkt_p: 'I trade discretionarily — gold (XAU/USD) mostly, plus FX and indices — on TradingView and MT5. No signals, no return claims. The point is simpler: building for traders and being one sharpen each other.',
    tk1: 'Primary', tk2: 'Also', tk3: 'Style', tk3v: 'Discretionary', tk4: 'Tools',
    eb_talk: 'Get in touch', talk_h: 'Let’s talk.',
    talk_p: 'Open to remote full-stack roles, freelance projects, and anything at the intersection of software and markets.',
    foot_l: 'Designed & built by Nicolò Cabrelli'
  },
  it: {
    roles: 'Sviluppatore full-stack &nbsp;·&nbsp; <b>Founder</b> &nbsp;·&nbsp; Trader',
    loc: 'Pontremoli, IT', remote: 'Da remoto', avail: 'Disponibile',
    lede: 'Sono uno sviluppatore autodidatta che porta i prodotti dall’inizio alla fine — e un trader che li usa. Ho costruito e lanciato un SaaS live da solo.',
    cta_mail: 'Scrivimi',
    eb_do: 'Cosa faccio',
    do1_k: 'Costruire', do1_h: 'Dall’inizio alla fine',
    do1_p: 'Progetto e costruisco web app full-stack — database, backend e interfaccia — e le porto fino alla produzione.',
    do2_k: 'Spedire', do2_h: 'Da solo e in fretta',
    do2_p: 'Trading Mind OS è passato dall’idea a un prodotto live con utenti reali, progettato e costruito interamente da me.',
    do3_k: 'Tradare', do3_h: 'Dentro i mercati',
    do3_p: 'Faccio trading discrezionale su oro e forex. Vivere i mercati è ciò che mi dice quali strumenti vale la pena costruire.',
    eb_work: 'Progetti selezionati', t_live: 'Live', t_live2: 'Live', t_wip: 'In corso',
    p_tmo: 'Un SaaS di trading-psychology, progettato e costruito da solo, end to end. Autenticazione, backend Postgres con row-level security, dashboard configurabile, sistema multi-valuta, integrazione server-side dell’API Anthropic e un bridge MetaTrader 5 che sincronizza i trade in tempo reale.',
    p_taxi: 'Un sito di produzione completo per un’attività locale, consegnato end to end: veloce, ottimizzato SEO e deployato su Cloudflare.',
    p_wip_h: 'In costruzione', p_wip: 'Un ecosistema più ampio di strumenti per i trader. Presto altro.',
    eb_stack: 'Stack',
    eb_mkt: 'Sui mercati',
    mkt_h: 'Costruisco gli strumenti, e li uso.',
    mkt_p: 'Faccio trading discrezionale — oro (XAU/USD) soprattutto, più forex e indici — su TradingView e MT5. Niente segnali, niente promesse di rendimento. Il punto è più semplice: costruire per i trader ed esserlo si affinano a vicenda.',
    tk1: 'Principale', tk2: 'Anche', tk3: 'Stile', tk3v: 'Discrezionale', tk4: 'Strumenti',
    eb_talk: 'Contatti', talk_h: 'Parliamone.',
    talk_p: 'Disponibile per ruoli full-stack da remoto, progetti freelance e tutto ciò che sta tra software e mercati.',
    foot_l: 'Progettato e costruito da Nicolò Cabrelli'
  }
} as const;

export type I18nKey = keyof typeof i18n['en'];
