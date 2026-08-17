import { useSearchParams } from 'react-router-dom';

export interface ToolParams {
  phone: string;
  hasCustomPhone: boolean;
  biz: string;
  trade: string;
  accentColor: string;
}

export function cleanPhoneNumber(raw: string): string {
  let cleaned = (raw || '').trim();
  if (cleaned.startsWith('0')) {
    cleaned = '44' + cleaned.slice(1);
  }
  return cleaned.replace(/\D/g, '');
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const encodedMsg = encodeURIComponent(message);
  const cleaned = cleanPhoneNumber(phone);
  if (cleaned) {
    return `https://wa.me/${cleaned}?text=${encodedMsg}`;
  }
  return `https://wa.me/?text=${encodedMsg}`;
}

export function useToolParams(): ToolParams {
  const [params] = useSearchParams();
  const rawQueryPhone = params.get('phone');
  const hasCustomPhone = Boolean(rawQueryPhone && rawQueryPhone.trim().length > 0);

  const phone = hasCustomPhone ? cleanPhoneNumber(rawQueryPhone!) : '';

  return {
    phone,
    hasCustomPhone,
    biz: params.get('biz') || 'Local Trade Specialist',
    trade: params.get('trade') || 'Trade Services',
    accentColor: params.get('color') || '#10b981',
  };
}
