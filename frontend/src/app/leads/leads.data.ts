import { useQuery } from '@tanstack/react-query';

import { client } from '../../common/axios.client';
import { Leads } from '../../common/literals';
import { LEADS_STALE_TIME } from './leads.constants';
import type { Lead, LeadSort } from './leads.types';

type LeadsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetAllLeadsParams = {
  page: number;
  limit: number;
  search?: string;
  sort?: LeadSort;
};

type GetAllLeadsResponse = {
  data: Lead[];
  meta: LeadsMeta;
};

export const useAllLeads = (params: GetAllLeadsParams) =>
  useQuery({
    queryKey: [Leads.QUERY_KEY, params],
    staleTime: LEADS_STALE_TIME,
    queryFn: async () => {
      const response = await client.get<GetAllLeadsResponse>(Leads.GET_ALL, { params });

      return response.data;
    },
  });