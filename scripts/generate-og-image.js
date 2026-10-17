// Renders the social share image (public/og-image.png) used by the Open Graph and Twitter tags.
// Only confirmed facts go on this image. Run with: node scripts/generate-og-image.js
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_SIZE = 320;
const LOGO_LEFT = 830;
const LOGO_TOP = Math.round((HEIGHT - LOGO_SIZE) / 2);

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const background = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="82%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#D90429" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#D90429" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#040507" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${HEIGHT}" />`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${WIDTH}" y2="${i * 100}" />`).join('')}
  </g>

  <text x="80" y="232" font-family="${FONT}" font-size="72" font-weight="700" fill="#ffffff">Design Systems Web</text>
  <rect x="80" y="262" width="96" height="6" rx="3" fill="#D90429" />

  <text x="80" y="344" font-family="${FONT}" font-size="42" font-weight="600" fill="#e4e4e7">Websites and web apps</text>
  <text x="80" y="398" font-family="${FONT}" font-size="42" font-weight="400" fill="#a1a1aa">for local businesses and trades</text>

  <rect x="80" y="444" width="412" height="56" rx="28" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.16" />
  <text x="286" y="480" text-anchor="middle" font-family="${FONT}" font-size="24" font-weight="600" fill="#e4e4e7">Stoke on Trent and Cheshire</text>
</svg>`;

// Crop the square logo to a circle so its dark corners disappear into the background.
const circleMask = Buffer.from(
  `<svg width="${LOGO_SIZE}" height="${LOGO_SIZE}"><circle cx="${LOGO_SIZE / 2}" cy="${LOGO_SIZE / 2}" r="${LOGO_SIZE / 2 - 4}" fill="#fff" /></svg>`
);

async function generate() {
  const logo = await sharp(path.join(root, 'public/logo.jpg'))
    .resize(LOGO_SIZE, LOGO_SIZE)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const outputPath = path.join(root, 'public/og-image.png');

  await sharp(Buffer.from(background))
    .composite([{ input: logo, left: LOGO_LEFT, top: LOGO_TOP }])
    .png()
    .toFile(outputPath);

  console.log(`Share image written to ${outputPath}`);

  const checkBackground = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="82%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#D90429" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#D90429" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#040507" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${HEIGHT}" />`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${WIDTH}" y2="${i * 100}" />`).join('')}
  </g>

  <rect x="80" y="138" width="296" height="44" rx="22" fill="#D90429" fill-opacity="0.16" stroke="#D90429" stroke-opacity="0.45" />
  <text x="228" y="167" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="700" fill="#fca5a5">FREE 20 SECOND REPORT</text>

  <text x="80" y="254" font-family="${FONT}" font-size="68" font-weight="700" fill="#ffffff">Website Health Check</text>
  <rect x="80" y="282" width="96" height="6" rx="3" fill="#D90429" />

  <text x="80" y="360" font-family="${FONT}" font-size="40" font-weight="600" fill="#e4e4e7">Is your website losing you</text>
  <text x="80" y="412" font-family="${FONT}" font-size="40" font-weight="400" fill="#a1a1aa">local trade jobs on phones?</text>

  <rect x="80" y="458" width="436" height="56" rx="28" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.16" />
  <text x="298" y="494" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="600" fill="#e4e4e7">designsystemsweb.co.uk/check</text>
</svg>`;

  const checkOutputPath = path.join(root, 'public/og-check.png');

  await sharp(Buffer.from(checkBackground))
    .composite([{ input: logo, left: LOGO_LEFT, top: LOGO_TOP }])
    .png()
    .toFile(checkOutputPath);

  console.log(`Check share image written to ${checkOutputPath}`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});

