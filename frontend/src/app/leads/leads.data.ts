import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { client } from '../../common/axios.client';
import { Leads } from '../../common/literals';
import { LEADS_STALE_TIME } from './leads.constants';
import type { CreateLeadInput, Lead, LeadSort, LeadStatus, UpdateLeadInput } from './leads.types';

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
  status?: LeadStatus;
  sort?: LeadSort;
};

type LeadMutation = {
  data: Lead;
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

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      const response = await client.post<LeadMutation>(Leads.CREATE, input);

      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [Leads.QUERY_KEY] }),
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateLeadInput) => {
      const response = await client.patch<LeadMutation>(Leads.UPDATE_STATUS(id), { status });

      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [Leads.QUERY_KEY] }),
  });
};