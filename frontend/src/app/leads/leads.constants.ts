export const LEADS_PER_PAGE = 10;
export const SEARCH_DEBOUNCE_MS = 350;
export const LEADS_STALE_TIME = 30_000;
export const LEAD_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST'] as const;
export const SORTABLE_COLUMS = new Set(['name', 'email', 'status', 'createdAt']);
