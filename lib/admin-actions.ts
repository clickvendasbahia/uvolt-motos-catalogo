'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from './supabase/server';

function parseImages(raw: FormDataEntryValue | null): string[] {
  try {
    const parsed = JSON.parse(String(raw ?? '[]'));
    if (Array.isArray(parsed)) return parsed.filter((s) => typeof s === 'string' && s);
  } catch {}
  return [];
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function signInAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    redirect('/admin/login?error=supabase-nao-configurado');
  }

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const { error } = await supabase!.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect('/admin/dashboard');
}

export async function signOutAction(redirectTo = '/admin/login') {
  const supabase = createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect(redirectTo);
}

export async function createVehicleAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) redirect('/admin/veiculos?error=supabase-nao-configurado');

  const name = String(formData.get('name') ?? '');
  const payload = {
    name,
    slug: slugify(name),
    type: String(formData.get('type') ?? 'moto'),
    tagline: String(formData.get('tagline') ?? ''),
    description: String(formData.get('description') ?? ''),
    autonomy_km: Number(formData.get('autonomy_km') ?? 0),
    max_speed_kmh: Number(formData.get('max_speed_kmh') ?? 0),
    recharge_time: String(formData.get('recharge_time') ?? ''),
    price: formData.get('price') ? Number(formData.get('price')) : null,
    images: parseImages(formData.get('images_json')),
    status: (formData.get('status') === 'inactive' ? 'inactive' : 'available') as 'available' | 'inactive',
  };

  const { error } = await supabase!.from('vehicles').insert(payload);
  if (error) redirect(`/admin/veiculos/novo?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/veiculos');
  revalidatePath('/catalogo');
  redirect('/admin/veiculos');
}

export async function updateVehicleAction(id: string, formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) redirect('/admin/veiculos?error=supabase-nao-configurado');

  const name = String(formData.get('name') ?? '');
  const payload = {
    name,
    slug: slugify(name),
    type: String(formData.get('type') ?? 'moto'),
    tagline: String(formData.get('tagline') ?? ''),
    description: String(formData.get('description') ?? ''),
    autonomy_km: Number(formData.get('autonomy_km') ?? 0),
    max_speed_kmh: Number(formData.get('max_speed_kmh') ?? 0),
    recharge_time: String(formData.get('recharge_time') ?? ''),
    price: formData.get('price') ? Number(formData.get('price')) : null,
    images: parseImages(formData.get('images_json')),
    status: (formData.get('status') === 'inactive' ? 'inactive' : 'available') as 'available' | 'inactive',
  };

  const { error } = await supabase!.from('vehicles').update(payload).eq('id', id);
  if (error) redirect(`/admin/veiculos/${id}/editar?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/veiculos');
  revalidatePath('/catalogo');
  redirect('/admin/veiculos');
}

export async function toggleVehicleActiveAction(id: string, status: 'available' | 'inactive') {
  const supabase = createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from('vehicles').update({ status }).eq('id', id);
  revalidatePath('/admin/veiculos');
  revalidatePath('/catalogo');
}

export async function deleteVehicleAction(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from('vehicles').delete().eq('id', id);
  revalidatePath('/admin/veiculos');
  revalidatePath('/catalogo');
}
