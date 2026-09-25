import { Router } from 'express';

import { ApiRoutes } from '../../common/literals.js';
import { validateRequest } from '../../common/middleware/validation.middleware.js';
import {
  createLead,
  getAllLeads,
  updateLeadStatus,
} from './leads.controller.js';
import {
  createLeadSchema,
  getAllLeadsSchema,
  leadIdParamsSchema,
  updateLeadStatusSchema,
} from './leads.schema.js';

export const leadsRouter = Router();

leadsRouter.post(
  ApiRoutes.LEADS,
  validateRequest({ body: createLeadSchema }),
  createLead,
);
leadsRouter.get(
  ApiRoutes.LEADS,
  validateRequest({ query: getAllLeadsSchema }),
  getAllLeads,
);
leadsRouter.patch(
  `${ApiRoutes.LEADS}/:id/status`,
  validateRequest({ params: leadIdParamsSchema, body: updateLeadStatusSchema }),
  updateLeadStatus,
);
