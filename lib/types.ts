export type VehicleType = 'moto' | 'bike';

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  type: VehicleType;
  tagline: string;
  description: string;
  autonomy_km: number;
  max_speed_kmh: number;
  recharge_time: string;
  price: number | null;
  images: string[];
  colorway: [string, string];
  status: 'available' | 'inactive';
  created_at: string;
}
