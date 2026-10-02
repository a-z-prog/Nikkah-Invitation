import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const width = 1200;
const height = 630;

// High-fidelity Islamic Luxury Wedding Invitation Card SVG
const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#143c30" />
      <stop offset="60%" stop-color="#0c231b" />
      <stop offset="100%" stop-color="#06120e" />
    </radialGradient>

    <!-- Gold Gradients -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9E8B8" />
      <stop offset="35%" stop-color="#D4AF37" />
      <stop offset="70%" stop-color="#AA7C11" />
      <stop offset="100%" stop-color="#E5C158" />
    </linearGradient>

    <linearGradient id="goldLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF5D6" />
      <stop offset="100%" stop-color="#E8C974" />
    </linearGradient>

    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C5A059" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#F2DE9C" stop-opacity="1" />
      <stop offset="100%" stop-color="#9C7624" stop-opacity="0.8" />
    </linearGradient>

    <!-- Islamic Geometric Pattern for Background Ambience -->
    <pattern id="islamicPattern" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 30,0 L 60,30 L 30,60 L 0,30 Z" fill="none" stroke="#C5A059" stroke-width="0.75" stroke-opacity="0.08" />
      <circle cx="30" cy="30" r="14" fill="none" stroke="#C5A059" stroke-width="0.75" stroke-opacity="0.06" />
      <path d="M 0,0 L 60,60 M 60,0 L 0,60" stroke="#C5A059" stroke-width="0.5" stroke-opacity="0.04" />
    </pattern>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Deep Emerald Backdrop -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#islamicPattern)" />

  <!-- Outer Fine Border -->
  <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="12" fill="none" stroke="url(#borderGrad)" stroke-width="1.5" stroke-opacity="0.6" />

  <!-- Main Ornate Border Frame -->
  <rect x="42" y="42" width="${width - 84}" height="${height - 84}" rx="10" fill="none" stroke="url(#borderGrad)" stroke-width="2.5" />

  <!-- Inner Inset Line -->
  <rect x="52" y="52" width="${width - 104}" height="${height - 104}" rx="8" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="6,4" />

  <!-- Corner Arabesques (Top-Left) -->
  <g transform="translate(56, 56)">
    <path d="M 0,0 L 45,0 C 45,25 25,45 0,45 Z" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <circle cx="16" cy="16" r="4" fill="url(#goldGrad)" />
  </g>
  <!-- Corner Arabesques (Top-Right) -->
  <g transform="translate(${width - 56}, 56) scale(-1, 1)">
    <path d="M 0,0 L 45,0 C 45,25 25,45 0,45 Z" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <circle cx="16" cy="16" r="4" fill="url(#goldGrad)" />
  </g>
  <!-- Corner Arabesques (Bottom-Left) -->
  <g transform="translate(56, ${height - 56}) scale(1, -1)">
    <path d="M 0,0 L 45,0 C 45,25 25,45 0,45 Z" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <circle cx="16" cy="16" r="4" fill="url(#goldGrad)" />
  </g>
  <!-- Corner Arabesques (Bottom-Right) -->
  <g transform="translate(${width - 56}, ${height - 56}) scale(-1, -1)">
    <path d="M 0,0 L 45,0 C 45,25 25,45 0,45 Z" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <circle cx="16" cy="16" r="4" fill="url(#goldGrad)" />
  </g>

  <!-- Central Top Monogram Crest -->
  <g transform="translate(600, 108)" filter="url(#shadow)">
    <!-- Star medallion -->
    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#0c231b" stroke="url(#goldGrad)" stroke-width="1.5" />
    <rect x="-24" y="-24" width="48" height="48" rx="8" transform="rotate(45)" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <text x="0" y="6" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="16" font-weight="700" fill="url(#goldLight)" letter-spacing="1">R &amp; K</text>
  </g>

  <!-- Sacred Bismillah Calligraphy (Text representation) -->
  <text x="600" y="175" text-anchor="middle" font-family="'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" font-size="28" font-weight="400" fill="url(#goldLight)" letter-spacing="1">
    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
  </text>

  <!-- Subtitle Tagline -->
  <g transform="translate(600, 218)">
    <line x1="-160" y1="-5" x2="-40" y2="-5" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.6" />
    <circle cx="-35" cy="-5" r="2.5" fill="url(#goldGrad)" />
    <text x="0" y="0" text-anchor="middle" font-family="Cinzel, 'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="600" fill="#E8D7B5" letter-spacing="6">
      THE WALIMA CELEBRATION OF
    </text>
    <circle cx="35" cy="-5" r="2.5" fill="url(#goldGrad)" />
    <line x1="40" y1="-5" x2="160" y2="-5" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.6" />
  </g>

  <!-- Couple Names - Magnificent Royal Typography -->
  <text x="600" y="315" text-anchor="middle" filter="url(#shadow)" font-family="'Noto Serif Bengali', Cinzel, Georgia, serif" font-size="64" font-weight="700" fill="url(#goldLight)" letter-spacing="2">
    RAZIN &amp; KANETA
  </text>

  <!-- Prophetic Dua / Blessing -->
  <text x="600" y="375" text-anchor="middle" font-family="'Amiri', 'Traditional Arabic', serif" font-size="22" font-style="italic" fill="#E8D7B5" fill-opacity="0.9">
    بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
  </text>

  <!-- Divider Ribbon -->
  <g transform="translate(600, 415)">
    <line x1="-220" y1="0" x2="220" y2="0" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.5" />
    <polygon points="0,-6 6,0 0,6 -6,0" fill="url(#goldGrad)" />
  </g>

  <!-- Date, Time & Venue Badge Box -->
  <g transform="translate(600, 480)" filter="url(#shadow)">
    <!-- Pill container -->
    <rect x="-260" y="-32" width="520" height="64" rx="32" fill="#081712" fill-opacity="0.85" stroke="url(#borderGrad)" stroke-width="1.2" />

    <!-- Date & Time -->
    <text x="0" y="-6" text-anchor="middle" font-family="Cinzel, 'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700" fill="url(#goldLight)" letter-spacing="2">
      FRIDAY, 9 OCTOBER 2026  •  2:00 PM
    </text>

    <!-- Venue Location -->
    <text x="0" y="18" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#E8D7B5" fill-opacity="0.85" letter-spacing="1.5">
      SATKANIA, CHITTAGONG
    </text>
  </g>

  <!-- Bottom Elegant Footer -->
  <text x="600" y="565" text-anchor="middle" font-family="Cinzel, 'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#C5A059" letter-spacing="4">
    HONORING YOUR PRESENCE &amp; PRAYERS
  </text>
</svg>
`;

async function generate() {
  const publicOut = path.resolve('public', 'og-preview.jpg');
  const distDir = path.resolve('dist');
  const distOut = path.resolve('dist', 'og-preview.jpg');

  const buffer = await sharp(Buffer.from(svg))
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toBuffer();

  fs.writeFileSync(publicOut, buffer);
  console.log('Saved to ' + publicOut);

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(distOut, buffer);
    console.log('Saved to ' + distOut);
  }
}

generate().catch(console.error);
