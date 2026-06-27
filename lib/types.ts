export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  description: string;

  autonomy_km: number;
  price: number | null;

  image: string; // <- muda aqui

  status: 'available' | 'inactive';
  created_at: string;
}
