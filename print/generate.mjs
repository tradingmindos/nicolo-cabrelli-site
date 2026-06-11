// Generates the print assets in print/ from the site design system.
// Run: node print/generate.mjs
// Deliverables: qr-biglietto.svg, qr-banco.svg, biglietto-fronte.svg,
// biglietto-retro.svg, banco-a6.svg. All units are millimetres (viewBox = mm),
// canvases include 3 mm bleed. QR codes are embedded as real module paths
// (not external references).

import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DIR = dirname(fileURLToPath(import.meta.url));

// ---- design tokens -------------------------------------------------------
const CREAM = '#F1ECE2';
const INK = '#0E0E0F';
const GOLD = '#C4A368';
const BORDEAUX = '#7C1F2C';
const MUTED = '#6B6358';
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Hanken Grotesk', system-ui, sans-serif";

const URLS = {
  biglietto:
    'https://nicolocabrelli.com/?utm_source=qr&utm_medium=print&utm_campaign=biglietto',
  banco:
    'https://nicolocabrelli.com/?utm_source=qr&utm_medium=print&utm_campaign=banco',
};

// ---- QR helpers ----------------------------------------------------------
// Standalone QR svg: error correction H, standard quiet zone (margin 4),
// ink modules on a transparent background.
async function standaloneQR(url) {
  return QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 4,
    color: { dark: INK, light: '#00000000' },
  });
}

// Module path (no quiet zone) for embedding inside a plaque.
function qrModules(url) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let d = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) d += `M${c} ${r}h1v1h-1z`;
    }
  }
  return { size, d };
}

// Embed a QR centred in a square area (x,y,side in mm), leaving `pad` mm of
// quiet zone on every side (the plaque colour shows through).
function embedQR(url, x, y, side, pad) {
  const { size, d } = qrModules(url);
  const inner = side - pad * 2;
  return `<svg x="${x + pad}" y="${y + pad}" width="${inner}" height="${inner}" viewBox="0 0 ${size} ${size}"><path d="${d}" fill="${INK}"/></svg>`;
}

// ---- assets --------------------------------------------------------------
function bigliettoFronte() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="91mm" height="61mm" viewBox="0 0 91 61">
  <rect width="91" height="61" fill="${CREAM}"/>
  <text x="45.5" y="28" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="13" fill="${INK}">NC<tspan fill="${BORDEAUX}">.</tspan></text>
  <text x="45.5" y="36.5" text-anchor="middle" font-family="${MONO}" font-size="2.6" letter-spacing="0.25" fill="${MUTED}">Nicolò Cabrelli · Sviluppatore web</text>
  <path d="M31 47 L37 46 L43 48 L49 45.5 L55 48 L61 45.5" fill="none" stroke="${GOLD}" stroke-width="0.45" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="49" cy="45.5" r="0.8" fill="${BORDEAUX}"/>
</svg>
`;
}

function bigliettoRetro() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="91mm" height="61mm" viewBox="0 0 91 61">
  <rect width="91" height="61" fill="${INK}"/>
  <rect x="9" y="17.5" width="26" height="26" rx="2" fill="${CREAM}"/>
  ${embedQR(URLS.biglietto, 9, 17.5, 26, 3)}
  <text x="40" y="22" font-family="${MONO}" font-size="2.8" letter-spacing="0.15" fill="${GOLD}">nicolocabrelli.com</text>
  <text x="40" y="30" font-family="${SERIF}" font-weight="700" font-size="3.4" fill="${CREAM}">Siti web per le attività</text>
  <text x="40" y="35.4" font-family="${SERIF}" font-weight="700" font-size="3.4" fill="${CREAM}">della Lunigiana</text>
  <text x="40" y="44" font-family="${MONO}" font-size="2.5" fill="${CREAM}">+39 328 287 0357</text>
  <text x="40" y="48.5" font-family="${MONO}" font-size="2.5" fill="${CREAM}">nicocabrelli@gmail.com</text>
</svg>
`;
}

function bancoA6() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="111mm" height="154mm" viewBox="0 0 111 154">
  <rect width="111" height="154" fill="${CREAM}"/>
  <rect x="9" y="9" width="93" height="136" fill="none" stroke="${GOLD}" stroke-width="0.4" stroke-opacity="0.5"/>
  <text x="55.5" y="28" text-anchor="middle" font-family="${MONO}" font-size="3" letter-spacing="1.4" fill="${GOLD}">PONTREMOLI · LUNIGIANA</text>
  <text x="55.5" y="46" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="7.5" fill="${INK}">Un sito web</text>
  <text x="55.5" y="57" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="7.5" fill="${INK}">per la tua attività?</text>
  <text x="55.5" y="70" text-anchor="middle" font-family="${SANS}" font-size="3.4" fill="${INK}">Siti veloci, curati e facili da trovare</text>
  <text x="55.5" y="75.5" text-anchor="middle" font-family="${SANS}" font-size="3.4" fill="${INK}">su Google. Online in 14 giorni.</text>
  <rect x="31.5" y="81" width="48" height="48" rx="1.5" fill="#FFFFFF" stroke="${INK}" stroke-width="0.5"/>
  ${embedQR(URLS.banco, 31.5, 81, 48, 5)}
  <text x="55.5" y="137" text-anchor="middle" font-family="${MONO}" font-size="2.8" fill="${INK}">Inquadra e scrivimi · nicolocabrelli.com</text>
  <path d="M33 143 L42 142 L51 144 L60 141 L69 144 L78 141.5" fill="none" stroke="${GOLD}" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="60" cy="141" r="0.9" fill="${BORDEAUX}"/>
</svg>
`;
}

// ---- write ---------------------------------------------------------------
for (const [name, url] of Object.entries(URLS)) {
  writeFileSync(join(DIR, `qr-${name}.svg`), await standaloneQR(url));
  console.log(`qr-${name}.svg  →  ${url}`);
}
writeFileSync(join(DIR, 'biglietto-fronte.svg'), bigliettoFronte());
writeFileSync(join(DIR, 'biglietto-retro.svg'), bigliettoRetro());
writeFileSync(join(DIR, 'banco-a6.svg'), bancoA6());
console.log('cards written: biglietto-fronte.svg, biglietto-retro.svg, banco-a6.svg');
