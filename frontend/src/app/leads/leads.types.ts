import type { LEAD_STATUSES } from './leads.constants';

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  createdAt: string;
};

export type CreateLeadInput = Pick<Lead, 'name' | 'email' | 'phone'>;
export type UpdateLeadInput = Pick<Lead, 'id' | 'status'>;

export type LeadSort =
  | 'name'
  | 'email'
  | 'status'
  | 'createdAt'
  | '-name'
  | '-email'
  | '-status'
  | '-createdAt';