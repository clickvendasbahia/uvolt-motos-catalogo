export const WHATSAPP_NUMBER = '5571993757208';

export function whatsappLink(vehicleName: string) {
  const message = `Olá! Tenho interesse na ${vehicleName} da UVOLT. Pode me passar mais informações?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number | null) {
  if (price === null) return 'Consulte o valor';
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
