export type SortDirection = 'asc' | 'desc';

export const orderBy = (sort: string, sortableColumns: readonly string[]): Record<string, SortDirection> => {
  const sortDirection = sort.startsWith('-') ? 'desc' : 'asc';
  const sortBy = sort.startsWith('-') ? sort.slice(1) : sort;

  if (!sortableColumns.includes(sortBy)) {
    throw new Error('Invalid sort column.');
  }

  return { [sortBy]: sortDirection };
};
