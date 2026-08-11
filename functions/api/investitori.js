// Cloudflare Pages Function — POST /api/investitori
// Rilevata da Pages al deploy dalla cartella functions/, fuori dalla build Astro.
// Valida i campi senza fidarsi del browser, applica le difese anti-abuso e poi
// manda due email via Resend:
// 1) a info@tradingmindos.com con reply_to del visitatore (deve riuscire);
// 2) conferma automatica al visitatore, best effort: se fallisce, l'invio
//    resta un successo perché il messaggio che conta è il primo.
//
// Anti-abuso — la conferma è un mailer verso destinatari arbitrari con il
// campo name nel corpo, da un dominio con SPF/DKIM/DMARC validi (lo stesso
// dei reset password di TMO). Tre livelli, tutti prima di toccare Resend:
// - memoria per-isolate: fast path, unica difesa se il binding KV manca;
// - KV (binding RATE_LIMIT): limite per IP persistente tra PoP, best effort
//   (niente increment atomico, consistenza eventuale — documentato);
// - tetti giornalieri: oltre SOFT_CAP parte solo l'email a me, oltre
//   HARD_CAP l'endpoint risponde 429 a tutti, a difesa di quota e
//   reputazione condivise col prodotto.
// L'IP entra in KV solo come SHA-256 con salt (env.RATE_LIMIT_SALT).
// Binding o salt assenti degradano in silenzio: il form resta funzionante.
//
// RESEND_API_KEY è un secret nelle variabili d'ambiente di Cloudflare Pages.
// Ogni risposta al client è una stringa fissa: nessun dettaglio interno,
// niente soglie, niente messaggi di Resend rigirati al browser.

const LIMITS = { name: 80, email: 254, org: 120, message: 2000 };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const FROM = 'Nicolò Cabrelli <form@tradingmindos.com>';
const TO_ME = 'info@tradingmindos.com';

const IP_MAX = 3;                      // invii per IP per finestra
const IP_WINDOW_MS = 10 * 60 * 1000;   // 10 minuti
const IP_TTL_S = 600;                  // scadenza chiave KV per IP
const SOFT_CAP = 20;                   // invii/giorno: oltre, niente conferma
const HARD_CAP = 50;                   // invii/giorno: oltre, 429 per tutti
const DAY_TTL_S = 172800;              // la chiave del giorno vive 48 ore

const ERR_BODY = { error: 'Corpo della richiesta illeggibile.' };
const ERR_FIELDS = { error: 'Campi mancanti o fuori misura.' };
const ERR_SEND = { error: 'Invio fallito.' };
const ERR_BUSY = { error: 'Invio momentaneamente sospeso.' };

// Memoria per-isolate. Sopravvive tra richieste sullo stesso isolate, niente
// garanzie oltre: è il fast path davanti a KV, non il sostituto.
const memIp = new Map(); // ipHash -> { count, reset }
let memDay = { day: '', count: 0 };

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Campi a riga singola: trim + spazi collassati (niente a capo nel subject).
const line = (v) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '');
const text = (v) => (typeof v === 'string' ? v.trim() : '');

const today = () => new Date().toISOString().slice(0, 10); // giorno UTC

const ipHash = async (salt, ip) => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${salt}:${ip}`)
  );
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const memIpOver = (key, now) => {
  if (memIp.size > 5000) {
    for (const [k, v] of memIp) if (v.reset < now) memIp.delete(k);
  }
  const e = memIp.get(key);
  return Boolean(e && e.reset >= now && e.count >= IP_MAX);
};

const memIpAdd = (key, now) => {
  const e = memIp.get(key);
  if (!e || e.reset < now) memIp.set(key, { count: 1, reset: now + IP_WINDOW_MS });
  else e.count += 1;
};

const memDayCount = () => (memDay.day === today() ? memDay.count : 0);

const memDayAdd = () => {
  const d = today();
  if (memDay.day !== d) memDay = { day: d, count: 0 };
  memDay.count += 1;
};

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, ERR_BODY);
  }

  // Honeypot: successo simulato, niente Resend e niente consumo di budget.
  if (line(data.azienda)) return json(200, { ok: true });

  const name = line(data.name);
  const email = line(data.email);
  const org = line(data.org);
  const message = text(data.message);
  const locale = data.locale === 'en' ? 'en' : 'it';

  if (
    !name || name.length > LIMITS.name ||
    !email || email.length > LIMITS.email || !EMAIL_RE.test(email) ||
    org.length > LIMITS.org ||
    !message || message.length > LIMITS.message
  ) {
    return json(400, ERR_FIELDS);
  }

  // --- Anti-abuso, prima di toccare Resend ---
  const now = Date.now();
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const key = await ipHash(env.RATE_LIMIT_SALT || '', ip);

  if (memIpOver(key, now)) return json(429, ERR_BUSY);

  const kv = env.RATE_LIMIT;
  let kvIpCount = 0;
  let dayCount = memDayCount();
  if (kv) {
    try {
      const [ipVal, dayVal] = await Promise.all([
        kv.get(`ip:${key}`),
        kv.get(`day:${today()}`),
      ]);
      kvIpCount = Number(ipVal) || 0;
      dayCount = Math.max(dayCount, Number(dayVal) || 0);
    } catch {
      // KV irraggiungibile: si prosegue con la sola memoria per-isolate.
    }
  }

  if (kvIpCount >= IP_MAX) return json(429, ERR_BUSY);
  if (dayCount >= HARD_CAP) return json(429, ERR_BUSY);
  const skipConfirm = dayCount >= SOFT_CAP;

  // Consumo del budget: la memoria sempre, KV se presente. Anche gli invii
  // che poi falliscono su Resend contano: proteggono l'endpoint, non l'esito.
  memIpAdd(key, now);
  memDayAdd();
  if (kv) {
    try {
      await Promise.all([
        kv.put(`ip:${key}`, String(kvIpCount + 1), { expirationTtl: IP_TTL_S }),
        kv.put(`day:${today()}`, String(dayCount + 1), { expirationTtl: DAY_TTL_S }),
      ]);
    } catch {
      // Scrittura KV fallita: resta il conteggio in memoria.
    }
  }

  const send = (payload) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  // 1) Email a me: se fallisce (anche a livello di rete), fallisce l'invio.
  let toMe;
  try {
    toMe = await send({
      from: FROM,
      to: [TO_ME],
      reply_to: email,
      subject: `Investitori — ${name}`,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Organizzazione o ruolo: ${org || '—'}`,
        '',
        'Cosa vorrebbe approfondire:',
        message,
      ].join('\n'),
    });
  } catch {
    return json(502, ERR_SEND);
  }
  if (!toMe.ok) return json(502, ERR_SEND);

  // 2) Conferma al visitatore: best effort, spenta oltre il soft cap.
  if (!skipConfirm) {
    const confirm =
      locale === 'en'
        ? {
            subject: "I've received your message",
            text: `Hi ${name},\n\nI've received your message and I'll reply within 24 working hours.\n\nNicolò Cabrelli — Trading Mind OS`,
          }
        : {
            subject: 'Ho ricevuto il tuo messaggio',
            text: `Ciao ${name},\n\nho ricevuto il tuo messaggio e ti rispondo entro 24 ore lavorative.\n\nNicolò Cabrelli — Trading Mind OS`,
          };
    try {
      await send({ from: FROM, to: [email], reply_to: TO_ME, ...confirm });
    } catch {
      // La conferma conta meno del messaggio che arriva a me.
    }
  }

  return json(200, { ok: true });
}
