export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  description: string;

  autonomy_km: number;
  price: number | null;

  image: string; // 

  status: 'available' | 'inactive';
  created_at: string;
}
