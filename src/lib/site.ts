// Central site constants. Replace every [PLACEHOLDER] with real data.

export const SITE_URL = 'https://nicolocabrelli.com';

// WhatsApp number: international format, digits only, NO '+' (e.g. 39333...).
export const WHATSAPP_NUMBER = '393282870357';

// Build a wa.me link with a prefilled, URL-encoded message.
export function waHref(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const EMAIL = 'nicocabrelli@gmail.com';

// Build a mailto link with a prefilled, URL-encoded subject and body.
export function mailtoHref(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export const LINKEDIN = 'https://www.linkedin.com/in/nicolocabrelli-tradingmindos';
export const GITHUB = 'https://github.com/tradingmindos';

export const VAT = '[P.IVA]';

// hreflang alternates for the homepage (IT is the default, EN lives at /en/).
export const HOME_ALTERNATES = [
  { hreflang: 'it', href: `${SITE_URL}/` },
  { hreflang: 'en', href: `${SITE_URL}/en/` },
  { hreflang: 'x-default', href: `${SITE_URL}/` },
];
