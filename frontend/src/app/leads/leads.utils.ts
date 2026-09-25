import type { LeadStatus } from './leads.types';

export const formatCreatedAt = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

export const statusStyles: Record<LeadStatus, string> = {
  NEW: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  CONTACTED: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  QUALIFIED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  LOST: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};
