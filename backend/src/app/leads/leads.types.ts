import type { Lead, LeadStatus } from '@prisma/client';
import type { z } from 'zod';

import type {
  createLeadSchema,
  getAllLeadsSchema,
  updateLeadStatusSchema,
} from './leads.schema.js';

export type { Lead, LeadStatus };

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type GetAllLeadsInput = z.infer<typeof getAllLeadsSchema>;
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;


