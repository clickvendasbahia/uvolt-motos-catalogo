import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'vehicles');
fs.mkdirSync(outDir, { recursive: true });

// Veículo: slug, cor primária/secundária do colorway, tipo (moto = silhueta de moto, bike = silhueta de bike)
const vehicles = [
  ['max-12-maj', '#0A0A0C', '#3DA9FC', 'moto'],
  ['vittoria-2026', '#16171A', '#A6F04A', 'moto'],
  ['rz-110', '#0A0A0C', '#FF6B35', 'moto'],
  ['m50-pro', '#1D1F23', '#7ED321', 'bike'],
  ['x1-urban', '#0A0A0C', '#3DA9FC', 'moto'],
  ['s9-nitro', '#16171A', '#FF6B35', 'moto'],
  ['e-rider-300', '#0A0A0C', '#A6F04A', 'moto'],
  ['cityvolt-2025', '#1D1F23', '#3DA9FC', 'moto'],
  ['falcon-x', '#0A0A0C', '#FF9466', 'moto'],
  ['neomotion-90', '#16171A', '#7ED321', 'bike'],
  ['pulse-r', '#0A0A0C', '#3DA9FC', 'moto'],
  ['vibe-electric', '#1D1F23', '#A6F04A', 'bike'],
  ['storm-e-max', '#0A0A0C', '#FF6B35', 'moto'],
  ['urban-pro-x', '#16171A', '#3DA9FC', 'moto'],
];

const motoSilhouette = (accent) => `
  <g transform="translate(180,300)" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <ellipse cx="60" cy="160" rx="58" ry="58" stroke-opacity="0.9"/>
    <ellipse cx="560" cy="160" rx="58" ry="58" stroke-opacity="0.9"/>
    <path d="M60 160 L210 150 L300 60 L430 60 L470 100 L560 160" />
    <path d="M210 150 L260 95 L370 95" />
    <path d="M300 60 L330 20 L420 20" stroke-width="10" stroke="${accent}"/>
    <path d="M470 100 L520 95 L560 130" fill="${accent}" fill-opacity="0.15"/>
    <circle cx="60" cy="160" r="14" fill="${accent}" fill-opacity="0.6"/>
    <circle cx="560" cy="160" r="14" fill="${accent}" fill-opacity="0.6"/>
  </g>
`;

const bikeSilhouette = (accent) => `
  <g transform="translate(220,300)" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <ellipse cx="50" cy="150" rx="50" ry="50"/>
    <ellipse cx="430" cy="150" rx="50" ry="50"/>
    <path d="M50 150 L190 150 L250 60 L330 60" />
    <path d="M190 150 L250 150 L430 150" />
    <path d="M250 60 L250 150" />
    <path d="M250 60 L300 30 L330 30" stroke-width="8" stroke="${accent}"/>
    <circle cx="50" cy="150" r="10" fill="${accent}" fill-opacity="0.6"/>
    <circle cx="430" cy="150" r="10" fill="${accent}" fill-opacity="0.6"/>
  </g>
`;

for (const [slug, base, accent, type] of vehicles) {
  const silhouette = type === 'bike' ? bikeSilhouette(accent) : motoSilhouette(accent);
  const svg = `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="${base}" stop-opacity="0.4"/>
      <stop offset="55%" stop-color="${base}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="55%" r="40%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect y="560" width="1200" height="240" fill="url(#floor)"/>
  <circle cx="600" cy="430" r="320" fill="url(#glow)"/>
  ${silhouette}
  <g opacity="0.5">
    <line x1="0" y1="600" x2="1200" y2="600" stroke="${accent}" stroke-opacity="0.15" stroke-width="2"/>
  </g>
</svg>`;
  fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg.trim());
}

console.log(`Gerados ${vehicles.length} placeholders premium em /public/vehicles`);
