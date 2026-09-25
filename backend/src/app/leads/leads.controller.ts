import type { RequestHandler } from 'express';

import { Error, Status } from '../../common/literals.js';
import {
  getAllLeadsSchema,
  leadIdParamsSchema,
} from './leads.schema.js';
import { leadsService } from './leads.service.js';

export const createLead: RequestHandler = async (request, response) => {
  const lead = await leadsService.create(request.body);

  if (!lead) {
    response.status(Status.CONFLICT).json({ message: Error.DUPLICATE_EMAIL });
    return;
  }

  response.status(Status.CREATED).json({ data: lead });
};

export const getAllLeads: RequestHandler = async (request, response) => {
  const input = getAllLeadsSchema.parse(request.query);
  const result = await leadsService.getAll(input);

  response.status(Status.OK).json({
    data: result.leads,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    },
  });
};

export const updateLeadStatus: RequestHandler = async (request, response) => {
  const { id } = leadIdParamsSchema.parse(request.params);
  const lead = await leadsService.updateStatus(id, request.body);

  if (!lead) {
    response.status(Status.NOT_FOUND).json({ message: Error.LEAD_NOT_FOUND });
    return;
  }

  response.status(Status.OK).json({ data: lead });
};
