import { LeadStatus } from '@prisma/client';
import { z } from 'zod';

const nameSchema = z.string().trim().min(2).max(100);
const emailSchema = z.string().trim().email().max(254).toLowerCase();
const phoneSchema = z.string().trim().min(7).max(20).regex(/^[0-9+() -]+$/);

export const createLeadSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    status: z.nativeEnum(LeadStatus).optional().default(LeadStatus.NEW),
  })
  .strict();

export const getAllLeadsSchema = z
  .object({
    search: z.string().trim().min(1).max(100).optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .strict();

export const leadIdParamsSchema = z.object({
  id: z.string().cuid(),
});

export const updateLeadStatusSchema = z
  .object({
    status: z.nativeEnum(LeadStatus),
  })
  .strict();




