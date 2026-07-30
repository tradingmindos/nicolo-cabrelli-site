// Central site constants. Replace every [PLACEHOLDER] with real data.

export const SITE_URL = 'https://nicolocabrelli.com';

// WhatsApp number: international format, digits only, NO '+' (e.g. 39333...).
export const WHATSAPP_NUMBER = '393282870357';

// Build a wa.me link with a prefilled, URL-encoded message.
export function waHref(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const EMAIL = 'nicolocabrelli@pm.me';

// Build a mailto link with a prefilled, URL-encoded subject and body.
export function mailtoHref(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export const LINKEDIN = 'https://www.linkedin.com/in/nicolocabrelli-tradingmindos';
export const GITHUB = 'https://github.com/tradingmindos';

export const VAT = '90021180451';

// hreflang alternates for the Lunigiana pages (IT is the default, EN lives at /en/lunigiana/).
export const LUNIGIANA_ALTERNATES = [
  { hreflang: 'it', href: `${SITE_URL}/lunigiana/` },
  { hreflang: 'en', href: `${SITE_URL}/en/lunigiana/` },
  { hreflang: 'x-default', href: `${SITE_URL}/lunigiana/` },
];
