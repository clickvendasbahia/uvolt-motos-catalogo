-- Tabela de veículos do catálogo UVOLT
create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  type text not null default 'moto' check (type in ('moto', 'bike')),
  tagline text default '',
  description text default '',
  autonomy_km integer not null default 0,
  max_speed_kmh integer not null default 0,
  recharge_time text default '',
  price numeric,
  images text[] not null default '{}',
  status text not null default 'available' check (status in ('available', 'inactive')),
  created_at timestamptz not null default now()
);

create index if not exists vehicles_status_idx on vehicles (status);
create index if not exists vehicles_slug_idx on vehicles (slug);

alter table vehicles enable row level security;

-- Leitura pública apenas de veículos disponíveis (catálogo)
create policy "Catálogo público de veículos disponíveis"
  on vehicles for select
  using (status = 'available');

-- Usuários autenticados (admin) podem ler tudo e gerenciar
create policy "Admin lê todos os veículos"
  on vehicles for select
  to authenticated
  using (true);

create policy "Admin insere veículos"
  on vehicles for insert
  to authenticated
  with check (true);

create policy "Admin atualiza veículos"
  on vehicles for update
  to authenticated
  using (true);

create policy "Admin remove veículos"
  on vehicles for delete
  to authenticated
  using (true);

-- Seed: modelos reais + fictícios da demo comercial UVOLT
insert into vehicles (name, slug, type, tagline, description, autonomy_km, max_speed_kmh, recharge_time, price, images, status)
values
  ('MAX 12 MAJ', 'max-12-maj', 'moto', 'Potência urbana sem limites', 'A MAX 12 MAJ foi desenvolvida para quem exige desempenho real no dia a dia urbano de Salvador. Motor robusto, autonomia generosa e acabamento premium para encarar qualquer trajeto.', 90, 80, '4h (0-100%)', 14990, array['/vehicles/max-12-maj.svg'], 'available'),
  ('VITTORIA 2026', 'vittoria-2026', 'moto', 'O futuro chegou antes', 'A VITTORIA 2026 une design italiano e tecnologia de ponta. Painel digital, conectividade e uma presença de rua que chama atenção em qualquer esquina.', 110, 95, '5h (0-100%)', 18990, array['/vehicles/vittoria-2026.svg'], 'available'),
  ('RZ 110', 'rz-110', 'moto', 'Velocidade redefinida', 'A RZ 110 é a moto elétrica mais ágil do catálogo UVOLT. Construída para entregadores e motociclistas que não podem parar, com recarga rápida e chassi reforçado.', 100, 110, '3h30 (0-100%)', 16990, array['/vehicles/rz-110.svg'], 'available'),
  ('M50 PRO', 'm50-pro-aro-20', 'bike', 'Mobilidade leve, aro 20"', 'A bicicleta elétrica M50 PRO foi pensada para o trajeto leve e inteligente. Aro 20", motor silencioso e bateria removível para recarregar onde quiser.', 60, 35, '3h (0-100%)', 6990, array['/vehicles/m50-pro.svg'], 'available'),
  ('UVOLT X1 Urban', 'x1-urban', 'moto', 'Feita para a cidade', 'Compacta, ágil e eficiente. A X1 Urban entrega o equilíbrio perfeito entre autonomia e leveza para o trânsito de Salvador.', 80, 70, '4h (0-100%)', 12990, array['/vehicles/x1-urban.svg'], 'available'),
  ('UVOLT S9 Nitro', 's9-nitro', 'moto', 'Adrenalina elétrica', 'Performance esportiva com zero emissões. A S9 Nitro acelera forte e entrega resposta instantânea em qualquer marcha do dia.', 95, 105, '4h (0-100%)', 17990, array['/vehicles/s9-nitro.svg'], 'available'),
  ('UVOLT E-Rider 300', 'e-rider-300', 'moto', 'Autonomia que impressiona', 'A E-Rider 300 foi criada para quem rola longas distâncias sem abrir mão do conforto. Bateria de alta densidade e suspensão ajustável.', 130, 90, '5h30 (0-100%)', 19990, array['/vehicles/e-rider-300.svg'], 'available'),
  ('UVOLT CityVolt 2025', 'cityvolt-2025', 'moto', 'Inteligente. Silenciosa. Sua.', 'A CityVolt 2025 traz conectividade via app, alarme inteligente e iluminação full LED para rodar com estilo pela cidade.', 85, 75, '4h (0-100%)', 13990, array['/vehicles/cityvolt-2025.svg'], 'available'),
  ('UVOLT Falcon X', 'falcon-x', 'moto', 'Aerodinâmica de elite', 'Carenagem esportiva e centro de gravidade baixo. A Falcon X foi desenhada em túnel de vento para máxima estabilidade em alta velocidade.', 105, 115, '4h30 (0-100%)', 21990, array['/vehicles/falcon-x.svg'], 'available'),
  ('UVOLT NeoMotion 90', 'neomotion-90', 'bike', 'Leveza em movimento', 'Bicicleta elétrica compacta com quadro em liga de alumínio e pedalada assistida inteligente. Ideal para trajetos curtos e médios.', 55, 32, '2h30 (0-100%)', 5990, array['/vehicles/neomotion-90.svg'], 'available'),
  ('UVOLT Pulse R', 'pulse-r', 'moto', 'Resposta instantânea', 'A Pulse R entrega torque imediato e um painel digital de alto contraste, feito para quem vive em movimento.', 90, 85, '4h (0-100%)', 15490, array['/vehicles/pulse-r.svg'], 'available'),
  ('UVOLT Vibe Electric', 'vibe-electric', 'bike', 'O ritmo da cidade', 'Design minimalista e motor de cubo silencioso. A Vibe Electric é a bike elétrica para quem busca praticidade com estilo.', 50, 30, '2h30 (0-100%)', 5490, array['/vehicles/vibe-electric.svg'], 'available'),
  ('UVOLT Storm E-Max', 'storm-e-max', 'moto', 'Força bruta, zero ruído', 'O motor mais potente da linha UVOLT. Storm E-Max é feita para quem precisa de capacidade de carga e potência sem comprometer a autonomia.', 100, 100, '5h (0-100%)', 18490, array['/vehicles/storm-e-max.svg'], 'available'),
  ('UVOLT Urban Pro X', 'urban-pro-x', 'moto', 'O equilíbrio perfeito', 'Urban Pro X combina economia, conforto e tecnologia embarcada — a escolha ideal para quem usa a moto todos os dias.', 88, 78, '4h (0-100%)', 13490, array['/vehicles/urban-pro-x.svg'], 'available')
on conflict (slug) do nothing;
