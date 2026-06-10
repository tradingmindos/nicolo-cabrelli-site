// Central site constants. Replace every [PLACEHOLDER] with real data.

export const SITE_URL = 'https://nicolocabrelli.com';

// WhatsApp number: international format, digits only, NO '+' (e.g. 39333...).
export const WHATSAPP_NUMBER = '393282870357';

// Build a wa.me link with a prefilled, URL-encoded message.
export function waHref(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const EMAIL = 'nicocabrelli@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/nicolocabrelli-tradingmindos';
export const GITHUB = 'https://github.com/tradingmindos';

export const VAT = '[P.IVA]';
