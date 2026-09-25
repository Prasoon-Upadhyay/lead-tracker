import type { LeadStatus, Prisma } from '@prisma/client';

export type LeadFilters = {
  search?: string;
  status?: LeadStatus;
};

export const where = ({ search, status }: LeadFilters): Prisma.LeadWhereInput => ({
  status,
  ...(search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {}),
});
