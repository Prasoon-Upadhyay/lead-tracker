import { pagination } from '../../common/pagination.utils.js';
import leadsDb from './leads.db.js';
import type { CreateLeadInput, GetAllLeadsInput, UpdateLeadStatusInput } from './leads.types.js';

export const leadsService = {
  async create(input: CreateLeadInput) {
    const existingLead = await leadsDb.findByEmail(input.email);

    if (existingLead) {
      return null;
    }

    return leadsDb.create(input);
  },

  async getAll(input: GetAllLeadsInput) {
    const options = {
      search: input.search,
      status: input.status,
      sort: input.sort,
      ...pagination(input.page, input.limit),
    };
    const [leads, total] = await Promise.all([leadsDb.findMany(options), leadsDb.count(options)]);

    return {
      leads,
      page: input.page,
      limit: input.limit,
      total,
      totalPages: Math.ceil(total / input.limit),
    };
  },

  async updateStatus(id: string, input: UpdateLeadStatusInput) {
    const lead = await leadsDb.findById(id);

    if (!lead) {
      return null;
    }

    return leadsDb.updateStatus(id, input.status);
  },
};
