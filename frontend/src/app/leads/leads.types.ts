export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  createdAt: string;
};

export type LeadSort =
  | 'name'
  | 'email'
  | 'status'
  | 'createdAt'
  | '-name'
  | '-email'
  | '-status'
  | '-createdAt';
