# UVOLT — Catálogo Digital Premium

Plataforma de catálogo digital para motos e bicicletas elétricas da UVOLT
(Salvador/BA), construída com Next.js (App Router), Tailwind CSS e Supabase.

## Stack

- Next.js 14 (App Router, React Server Components)
- Tailwind CSS
- Supabase (Postgres + Auth) — opcional para a demo
- Deploy: Vercel

## Rodando localmente

```bash
npm install
npm run dev
```

Sem variáveis de ambiente configuradas, o app funciona em **modo demo**:
o catálogo usa os 14 veículos seed (`lib/vehicles-data.ts`) e o painel
`/admin` fica aberto sem autenticação.

## Configurando o Supabase (produção)

1. Crie um projeto em supabase.com.
2. Rode `supabase/schema.sql` no SQL Editor do projeto — cria a tabela
   `vehicles`, as policies de RLS e popula o catálogo (4 modelos reais +
   10 fictícios da demo).
3. Crie um usuário em **Authentication > Users** para acessar `/admin`.
4. Copie `.env.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Com essas variáveis presentes, o catálogo público passa a ler do Supabase
e o `/admin` exige login.

## Estrutura

- `/` — home institucional/showroom
- `/catalogo` — listagem com filtros (tipo, autonomia)
- `/veiculo/[slug]` — página de produto estilo Apple/Tesla
- `/sobre`, `/localizacao` — institucional + mapa + SEO local
- `/admin/login`, `/admin/dashboard`, `/admin/veiculos` (+ `novo`/`editar`) — CMS

## Imagens

As imagens dos veículos em `public/vehicles/*.svg` são **placeholders
premium gerados proceduralmente** (gradientes + silhueta + cores da marca),
já que ainda não existem fotos reais. Substitua os arquivos (ou os campos
`images` no Supabase/`vehicles-data.ts`) por fotos reais quando disponíveis
— a UI já está pronta para imagens em alta resolução sem blur.

## Deploy (Vercel)

1. Importe o repositório na Vercel.
2. Configure as env vars do Supabase (se for usar produção real).
3. Deploy — build e SSG já validados (`npm run build`).
