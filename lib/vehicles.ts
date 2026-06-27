import { createSupabaseServerClient } from './supabase/server';
import { seedVehicles } from './vehicles-data';
import type { Vehicle } from './types';

/**
 * Camada de acesso a veículos. Sem env vars do Supabase (modo demo local),
 * usa o catálogo seed. Com Supabase configurado, qualquer erro de query é
 * lançado — nunca mascarado por um fallback silencioso para o seed.
 */
export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return seedVehicles;

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Falha ao buscar veículos: ${error.message}`);
  return (data ?? []) as Vehicle[];
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return seedVehicles.find((v) => v.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Falha ao buscar veículo "${slug}": ${error.message}`);
  }
  return data as Vehicle;
}

export async function getAllVehiclesAdmin(): Promise<Vehicle[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return seedVehicles;

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Falha ao buscar veículos (admin): ${error.message}`);
  return (data ?? []) as Vehicle[];
}
