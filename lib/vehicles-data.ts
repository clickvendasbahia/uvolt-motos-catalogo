import type { Vehicle } from './types';

/**
 * Catálogo seed: 4 modelos reais informados pela UVOLT + 10 modelos fictícios
 * para compor a demo comercial. Usado como fallback quando o Supabase
 * ainda não está configurado/povoado.
 */
export const seedVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'MAX 12 MAJ',
    slug: 'max-12-maj',
    description:
      'A MAX 12 MAJ foi desenvolvida para quem exige desempenho real no dia a dia urbano de Salvador. Motor robusto, autonomia generosa e acabamento premium para encarar qualquer trajeto.',
    autonomy_km: 90,
    price: 14990,
    image: '/vehicles/max-12-maj.svg',
    status: 'available',
    created_at: '2025-01-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'VITTORIA 2026',
    slug: 'vittoria-2026',
    description:
      'A VITTORIA 2026 une design italiano e tecnologia de ponta. Painel digital, conectividade e uma presença de rua que chama atenção em qualquer esquina.',
    autonomy_km: 110,
    price: 18990,
    image: '/vehicles/vittoria-2026.svg',
    status: 'available',
    created_at: '2025-01-12T00:00:00Z',
  },
  {
    id: '3',
    name: 'RZ 110',
    slug: 'rz-110',
    description:
      'A RZ 110 é a moto elétrica mais ágil do catálogo UVOLT. Construída para entregadores e motociclistas que não podem parar, com recarga rápida e chassi reforçado.',
    autonomy_km: 100,
    price: 16990,
    image: '/vehicles/rz-110.svg',
    status: 'available',
    created_at: '2025-01-14T00:00:00Z',
  },
  {
    id: '4',
    name: 'M50 PRO',
    slug: 'm50-pro-aro-20',
    description:
      'A bicicleta elétrica M50 PRO foi pensada para o trajeto leve e inteligente. Aro 20", motor silencioso e bateria removível para recarregar onde quiser.',
    autonomy_km: 60,
    price: 6990,
    image: '/vehicles/m50-pro.svg',
    status: 'available',
    created_at: '2025-01-15T00:00:00Z',
  },
  {
    id: '5',
    name: 'UVOLT X1 Urban',
    slug: 'x1-urban',
    description:
      'Compacta, ágil e eficiente. A X1 Urban entrega o equilíbrio perfeito entre autonomia e leveza para o trânsito de Salvador.',
    autonomy_km: 80,
    price: 12990,
    image: '/vehicles/x1-urban.svg',
    status: 'available',
    created_at: '2025-01-16T00:00:00Z',
  },
  {
    id: '6',
    name: 'UVOLT S9 Nitro',
    slug: 's9-nitro',
    description:
      'Performance esportiva com zero emissões. A S9 Nitro acelera forte e entrega resposta instantânea em qualquer marcha do dia.',
    autonomy_km: 95,
    price: 17990,
    image: '/vehicles/s9-nitro.svg',
    status: 'available',
    created_at: '2025-01-17T00:00:00Z',
  },
  {
    id: '7',
    name: 'UVOLT E-Rider 300',
    slug: 'e-rider-300',
    description:
      'A E-Rider 300 foi criada para quem rola longas distâncias sem abrir mão do conforto. Bateria de alta densidade e suspensão ajustável.',
    autonomy_km: 130,
    price: 19990,
    image: '/vehicles/e-rider-300.svg',
    status: 'available',
    created_at: '2025-01-18T00:00:00Z',
  },
  {
    id: '8',
    name: 'UVOLT CityVolt 2025',
    slug: 'cityvolt-2025',
    description:
      'A CityVolt 2025 traz conectividade via app, alarme inteligente e iluminação full LED para rodar com estilo pela cidade.',
    autonomy_km: 85,
    price: 13990,
    image: '/vehicles/cityvolt-2025.svg',
    status: 'available',
    created_at: '2025-01-19T00:00:00Z',
  },
  {
    id: '9',
    name: 'UVOLT Falcon X',
    slug: 'falcon-x',
    description:
      'Carenagem esportiva e centro de gravidade baixo. A Falcon X foi desenhada em túnel de vento para máxima estabilidade em alta velocidade.',
    autonomy_km: 105,
    price: 21990,
    image: '/vehicles/falcon-x.svg',
    status: 'available',
    created_at: '2025-01-20T00:00:00Z',
  },
  {
    id: '10',
    name: 'UVOLT NeoMotion 90',
    slug: 'neomotion-90',
    description:
      'Bicicleta elétrica compacta com quadro em liga de alumínio e pedalada assistida inteligente. Ideal para trajetos curtos e médios.',
    autonomy_km: 55,
    price: 5990,
    image: '/vehicles/neomotion-90.svg',
    status: 'available',
    created_at: '2025-01-21T00:00:00Z',
  },
  {
    id: '11',
    name: 'UVOLT Pulse R',
    slug: 'pulse-r',
    description:
      'A Pulse R entrega torque imediato e um painel digital de alto contraste, feito para quem vive em movimento.',
    autonomy_km: 90,
    price: 15490,
    image: '/vehicles/pulse-r.svg',
    status: 'available',
    created_at: '2025-01-22T00:00:00Z',
  },
  {
    id: '12',
    name: 'UVOLT Vibe Electric',
    slug: 'vibe-electric',
    description:
      'Design minimalista e motor de cubo silencioso. A Vibe Electric é a bike elétrica para quem busca praticidade com estilo.',
    autonomy_km: 50,
    price: 5490,
    image: '/vehicles/vibe-electric.svg',
    status: 'available',
    created_at: '2025-01-23T00:00:00Z',
  },
  {
    id: '13',
    name: 'UVOLT Storm E-Max',
    slug: 'storm-e-max',
    description:
      'O motor mais potente da linha UVOLT. Storm E-Max é feita para quem precisa de capacidade de carga e potência sem comprometer a autonomia.',
    autonomy_km: 100,
    price: 18490,
    image: '/vehicles/storm-e-max.svg',
    status: 'available',
    created_at: '2025-01-24T00:00:00Z',
  },
  {
    id: '14',
    name: 'UVOLT Urban Pro X',
    slug: 'urban-pro-x',
    description:
      'Urban Pro X combina economia, conforto e tecnologia embarcada — a escolha ideal para quem usa a moto todos os dias.',
    autonomy_km: 88,
    price: 13490,
    image: '/vehicles/urban-pro-x.svg',
    status: 'available',
    created_at: '2025-01-25T00:00:00Z',
  },
];
