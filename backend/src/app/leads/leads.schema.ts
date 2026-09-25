import { LeadStatus } from '@prisma/client';
import { z } from 'zod';

import { Pagination, SortableColumns } from '../../common/literals.js';

const nameSchema = z.string().trim().min(2).max(100);
const emailSchema = z.string().trim().email().max(254).toLowerCase();
const phoneSchema = z.string().trim().min(7).max(20).regex(/^[0-9+() -]+$/);

export const leadSortSchema = z.string().refine(
  (sort) => {
    const sortBy = sort.startsWith('-') ? sort.slice(1) : sort;

    return SortableColumns.LEADS.includes(sortBy as (typeof SortableColumns.LEADS)[number]);
  },
  { message: 'Invalid sort column.' },
);

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
    sort: leadSortSchema.default(SortableColumns.DEFAULT_LEADS),
    page: z.coerce.number().int().min(Pagination.DEFAULT_PAGE).default(Pagination.DEFAULT_PAGE),
    limit: z
      .coerce.number()
      .int()
      .min(Pagination.DEFAULT_PAGE)
      .max(Pagination.MAX_LIMIT)
      .default(Pagination.DEFAULT_LIMIT),
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

