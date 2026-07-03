/**
 * Import isolado de planilha (CSV/XLSX) para a tabela `vehicles` do Supabase.
 * Não depende de lib/vehicles.ts nem dos clients de app (client.ts/server.ts) —
 * usa a service role key diretamente, pois a policy de INSERT exige role
 * "authenticated" e este script roda fora do contexto de sessão do app.
 *
 * Formato de entrada esperado: planilha em blocos verticais por modelo
 * (não é uma linha por veículo). Cada bloco tem o formato:
 *
 *   MODELO | ESPECIFICAÇÕES | DETALHES     <- linha divisória, ignorada
 *          | MODELO          | UVOLT X13
 *          | MOTOR           | 1000W
 *   X13    | AUTONOMIA       | 40 À 45 KM
 *          | VELOCIDADE MÁXIMA | 25KM/H
 *          | BATERIA         | LÍTIO 60V 20AH REMOVÍVEL
 *          | TAMANHO DO PNEU | 225/40-10      <- opcional, nem todo bloco tem
 *          | PESO SUPORTADO  | 180KG
 *          | TEMPO DE RECARGA| 6H A 8H
 *          | VALOR:          | 11659          <- fecha o bloco
 *
 * A tabela real `vehicles` no Supabase não tem colunas próprias para motor,
 * velocidade máxima, bateria, pneu, peso ou tempo de recarga — só
 * name/slug/description/price/autonomy_km/status/featured/sort_order/image.
 * Por isso essas especificações são condensadas em texto formatado dentro de
 * `description`.
 *
 * Uso:
 *   npm run import:vehicles -- "C:/caminho/para/CATALOGO.xlsx"
 *   npm run import:vehicles -- "C:/caminho/para/CATALOGO.xlsx" --dry-run
 */
import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });

import path from 'node:path';
import * as XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';

// --- Config / args ---------------------------------------------------------

const args = process.argv.slice(2);
const filePath = args.find((a) => !a.startsWith('--'));
const isDryRun = args.includes('--dry-run');

if (!filePath) {
  console.error('Uso: npm run import:vehicles -- <caminho-da-planilha.xlsx|csv> [--dry-run]');
  process.exit(1);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Faltam variáveis de ambiente: NEXT_PUBLIC_SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY em .env.local'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// --- Normalização de texto ---------------------------------------------------

function stripAccents(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function normalizeLabel(value: unknown): string {
  return stripAccents(String(value ?? ''))
    .trim()
    .toUpperCase()
    .replace(/:$/, '');
}

function slugify(value: string): string {
  return stripAccents(String(value))
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Extrai o maior número presente (cobre faixas como "40 À 64KM" e "ATÉ 30KM"). */
function extractMaxNumber(value: unknown): number | null {
  const matches = String(value ?? '').match(/\d+(\.\d+)?/g);
  if (!matches) return null;
  const nums = matches.map(Number).filter((n) => Number.isFinite(n));
  return nums.length ? Math.max(...nums) : null;
}

function toPriceNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'number') return value;
  const cleaned = String(value).replace(/[^\d,.-]/g, '').replace(',', '.');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

// --- Parsing dos blocos verticais --------------------------------------------

type ParsedVehicle = {
  code: string;
  name: string;
  motor: string;
  autonomiaRaw: string;
  velocidadeMaxima: string;
  bateria: string;
  pneu: string;
  peso: string;
  recarga: string;
  price: number | null;
};

function parseVehicleBlocks(rows: unknown[][]): { vehicles: ParsedVehicle[]; warnings: string[] } {
  const vehicles: ParsedVehicle[] = [];
  const warnings: string[] = [];

  let current: Partial<ParsedVehicle> | null = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const col0 = String(row[0] ?? '').trim();
    const col1 = normalizeLabel(row[1]);
    const col2 = row[2];

    // Linha divisória de seção ("MODELO | ESPECIFICAÇÕES | DETALHES") — ignorar.
    if (col0.toUpperCase() === 'MODELO' && col1 === 'ESPECIFICACOES') continue;

    if (col1 === 'MODELO' && col2) {
      // Fecha bloco anterior se não tiver sido fechado por "VALOR:" (planilha incompleta).
      if (current && current.name) {
        warnings.push(`bloco "${current.name}" terminou sem linha "VALOR:" — preço ficará nulo`);
        vehicles.push({
          code: current.code ?? '',
          name: current.name,
          motor: current.motor ?? '',
          autonomiaRaw: current.autonomiaRaw ?? '',
          velocidadeMaxima: current.velocidadeMaxima ?? '',
          bateria: current.bateria ?? '',
          pneu: current.pneu ?? '',
          peso: current.peso ?? '',
          recarga: current.recarga ?? '',
          price: null,
        });
      }
      current = { name: String(col2).trim(), code: col0 };
      continue;
    }

    if (!current) continue; // linhas antes do primeiro bloco (vazias, etc.)

    if (col0) current.code = col0;

    switch (col1) {
      case 'MOTOR':
        current.motor = String(col2 ?? '').trim();
        break;
      case 'AUTONOMIA':
        current.autonomiaRaw = String(col2 ?? '').trim();
        break;
      case 'VELOCIDADE MAXIMA':
        current.velocidadeMaxima = String(col2 ?? '').trim();
        break;
      case 'BATERIA':
        current.bateria = String(col2 ?? '').trim();
        break;
      case 'TAMANHO DO PNEU':
        current.pneu = String(col2 ?? '').trim();
        break;
      case 'PESO SUPORTADO':
        current.peso = String(col2 ?? '').trim();
        break;
      case 'TEMPO DE RECARGA':
        current.recarga = String(col2 ?? '').trim();
        break;
      case 'VALOR':
        current.price = toPriceNumber(col2);
        vehicles.push({
          code: current.code ?? '',
          name: current.name!,
          motor: current.motor ?? '',
          autonomiaRaw: current.autonomiaRaw ?? '',
          velocidadeMaxima: current.velocidadeMaxima ?? '',
          bateria: current.bateria ?? '',
          pneu: current.pneu ?? '',
          peso: current.peso ?? '',
          recarga: current.recarga ?? '',
          price: current.price ?? null,
        });
        current = null;
        break;
      default:
        break; // linhas em branco/ruído dentro do bloco
    }
  }

  if (current && current.name) {
    warnings.push(`bloco "${current.name}" terminou sem linha "VALOR:" — preço ficará nulo`);
    vehicles.push({
      code: current.code ?? '',
      name: current.name,
      motor: current.motor ?? '',
      autonomiaRaw: current.autonomiaRaw ?? '',
      velocidadeMaxima: current.velocidadeMaxima ?? '',
      bateria: current.bateria ?? '',
      pneu: current.pneu ?? '',
      peso: current.peso ?? '',
      recarga: current.recarga ?? '',
      price: null,
    });
  }

  return { vehicles, warnings };
}

// --- Regra de negócio: bateria sempre "removível" ----------------------------

function normalizeBateria(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return 'Removível';
  return /removivel/i.test(stripAccents(trimmed)) ? trimmed : `${trimmed} REMOVÍVEL`;
}

// --- Montagem da linha para a tabela `vehicles` ------------------------------

type VehicleRow = {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  autonomy_km: number;
  status: string;
  featured: boolean;
  sort_order: number;
  image: string;
};

function buildVehicleRow(v: ParsedVehicle, index: number): VehicleRow {
  const bateria = normalizeBateria(v.bateria);

  const specLines = [
    v.motor && `Motor: ${v.motor}`,
    v.velocidadeMaxima && `Velocidade máxima: ${v.velocidadeMaxima}`,
    bateria && `Bateria: ${bateria}`,
    v.pneu && `Tamanho do pneu: ${v.pneu}`,
    v.peso && `Peso suportado: ${v.peso}`,
    v.recarga && `Tempo de recarga: ${v.recarga}`,
  ].filter(Boolean);

  return {
    name: v.name,
    slug: slugify(v.name),
    description: specLines.join('\n'),
    price: v.price,
    autonomy_km: extractMaxNumber(v.autonomiaRaw) ?? 0,
    status: 'available',
    featured: false,
    sort_order: index,
    image: '',
  };
}

// --- Main --------------------------------------------------------------------

async function main() {
  const resolvedPath = path.resolve(filePath!);
  console.log(`Lendo planilha: ${resolvedPath}${isDryRun ? '  (dry-run — nenhum insert será feito)' : ''}`);

  const workbook = XLSX.readFile(resolvedPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '' });

  const { vehicles, warnings } = parseVehicleBlocks(rawRows);
  warnings.forEach((w) => console.warn(`[AVISO] ${w}`));

  if (vehicles.length === 0) {
    console.error('Nenhum bloco de veículo reconhecido na planilha. Abortando.');
    process.exit(1);
  }

  console.log(`Modelos encontrados: ${vehicles.length}`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < vehicles.length; i++) {
    const parsed = vehicles[i];
    const row = buildVehicleRow(parsed, i);
    const label = `"${row.name}"${parsed.code ? ` (código ${parsed.code})` : ''}`;

    if (!row.name.trim()) {
      console.error(`[ERRO] bloco ${i + 1}: nome vazio — ignorado`);
      failed++;
      continue;
    }
    if (row.price === null) {
      console.warn(`[AVISO] ${label}: sem VALOR reconhecido — price salvo como null`);
    }

    if (isDryRun) {
      console.log(`[DRY-RUN] ${label}:`, row);
      continue;
    }

    const { data, error } = await supabase
      .from('vehicles')
      .upsert(row, { onConflict: 'slug', ignoreDuplicates: true })
      .select();

    if (error) {
      console.error(`[ERRO] ${label}: ${error.message}`);
      failed++;
    } else if (!data || data.length === 0) {
      console.log(`[SKIP] ${label}: slug "${row.slug}" já existe — não sobrescrito`);
      skipped++;
    } else {
      console.log(`[OK] ${label} inserido (slug ${row.slug})`);
      success++;
    }
  }

  console.log('\n--- Resumo ---');
  console.log(`Total de modelos:     ${vehicles.length}`);
  console.log(`Inseridos:            ${success}`);
  console.log(`Pulados (já existem): ${skipped}`);
  console.log(`Erros:                ${failed}`);
}

main().catch((err) => {
  console.error('Falha inesperada no import:', err);
  process.exit(1);
});
