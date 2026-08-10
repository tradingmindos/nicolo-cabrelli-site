// Cloudflare Pages Function — POST /api/investitori
// Rilevata da Pages al deploy dalla cartella functions/, fuori dalla build Astro.
// Valida i campi senza fidarsi del browser, poi manda due email via Resend:
// 1) a info@tradingmindos.com con reply_to del visitatore (deve riuscire);
// 2) conferma automatica al visitatore, best effort: se fallisce, l'invio
//    resta un successo perché il messaggio che conta è il primo.
// RESEND_API_KEY è un secret nelle variabili d'ambiente di Cloudflare Pages.
// from: form@tradingmindos.com — unico dominio verificato sul piano Resend.

const LIMITS = { name: 80, email: 254, org: 120, message: 2000 };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const FROM = 'Nicolò Cabrelli <form@tradingmindos.com>';
const TO_ME = 'info@tradingmindos.com';

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Campi a riga singola: trim + spazi collassati (niente a capo nel subject).
const line = (v) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '');
const text = (v) => (typeof v === 'string' ? v.trim() : '');

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: 'Corpo della richiesta illeggibile.' });
  }

  // Honeypot: successo simulato, Resend mai chiamato.
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
    return json(400, { error: 'Campi mancanti o fuori misura.' });
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

  // 1) Email a me: se fallisce, fallisce l'invio.
  const toMe = await send({
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
  if (!toMe.ok) return json(502, { error: 'Invio fallito.' });

  // 2) Conferma al visitatore: best effort.
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

  return json(200, { ok: true });
}
