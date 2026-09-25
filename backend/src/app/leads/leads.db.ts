import type { LeadStatus, Prisma } from '@prisma/client';

import { SortableColumns } from '../../common/literals.js';
import { orderBy } from '../../common/sort.utils.js';
import { prisma } from '../../common/prisma.js';
import type { LeadFilters } from './leads.utils.js';
import { where } from './leads.utils.js';

type FindLeadsOptions = LeadFilters & {
  sort: string;
  skip: number;
  take: number;
};

const leadsDb = {
  create: (data: Prisma.LeadCreateInput) => prisma.lead.create({ data }),
  findByEmail: (email: string) => prisma.lead.findUnique({ where: { email } }),
  findById: (id: string) => prisma.lead.findUnique({ where: { id } }),
  findMany: (options: FindLeadsOptions) =>
    prisma.lead.findMany({
      where: where(options),
      orderBy: orderBy(options.sort, SortableColumns.LEADS) as Prisma.LeadOrderByWithRelationInput,
      skip: options.skip,
      take: options.take,
    }),
  count: (options: LeadFilters) => prisma.lead.count({ where: where(options) }),
  updateStatus: (id: string, status: LeadStatus) =>
    prisma.lead.update({
      where: { id },
      data: { status },
    }),
};

export default leadsDb;
