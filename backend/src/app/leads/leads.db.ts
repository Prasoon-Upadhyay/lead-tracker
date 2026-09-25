import type { LeadStatus, Prisma } from '@prisma/client';

import { prisma } from '../../common/prisma.js';

const queries = {
  create: (data: Prisma.LeadCreateInput) => prisma.lead.create({ data }),
  findById: (id: string) => prisma.lead.findUnique({ where: { id } }),
  findMany: () => prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }),
  updateStatus: (id: string, status: LeadStatus) =>
    prisma.lead.update({
      where: { id },
      data: { status },
    }),
};

export default queries;
