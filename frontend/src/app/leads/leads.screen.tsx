import { LoaderCircle, Plus } from 'lucide-react';
import { useCallback, useRef, useState, type ChangeEvent } from 'react';

import { LEADS_PER_PAGE, SEARCH_DEBOUNCE_MS } from './leads.constants';
import { useAllLeads, useUpdateLead } from './leads.data';
import { LeadsModal } from './leads-modal.components';
import { LeadsTable } from './leads-table.components';
import type { LeadSort, LeadStatus } from './leads.types';

export const LeadsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [sort, setSort] = useState<LeadSort | null>(null);
  const [status, setStatus] = useState<LeadStatus | null>(null);
  const {
    data: leads,
    isError,
    isLoading,
    refetch,
  } = useAllLeads({
    page,
    limit: LEADS_PER_PAGE,
    ...(search ? { search } : {}),
    ...(status ? { status } : {}),
    ...(sort ? { sort } : {}),
  });
  const {
    mutateAsync: updateLead,
    isError: isUpdateError,
    isPending: isUpdatingStatus,
  } = useUpdateLead();
  const searchTimeout = useRef<number | null>(null);

  const debouncedSearch = useCallback((value: string) => {
    if (searchTimeout.current) {
      window.clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = window.setTimeout(() => {
      setPage(1);
      setSearch(value.trim() || null);
    }, SEARCH_DEBOUNCE_MS);
  }, []);

  const handleSortChange = useCallback((nextSort: LeadSort | null) => {
    setPage(1);
    setSort(nextSort);
  }, []);

  const handleStatusFilterChange = useCallback((nextStatus: LeadStatus | null) => {
    setPage(1);
    setStatus(nextStatus);
  }, []);

  const handleStatusUpdate = useCallback(async (id: string, nextStatus: LeadStatus) => {
    await updateLead({ id, status: nextStatus });
  }, [updateLead]);

  const openCreateModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const closeCreateModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.currentTarget.value);
  }, [debouncedSearch]);

  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  const handlePreviousPage = useCallback(() => {
    setPage((currentPage) => currentPage - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 font-sans sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Lead Tracker</h1>
            <p className="mt-2 text-slate-600">
              Organize, prioritize, and follow up with every lead.
            </p>
          </div>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            onClick={openCreateModal}
            type="button"
          >
            <Plus size={18} /> Add lead
          </button>
        </header>

        <div className="mb-5">
          <label className="sr-only" htmlFor="lead-search">
            Search leads
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            defaultValue=""
            id="lead-search"
            onChange={handleSearchChange}
            placeholder="Search by name or email"
            type="search"
          />
        </div>

        {isLoading ? (
          <section className="flex min-h-48 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-slate-400 shadow-sm">
            <LoaderCircle aria-label="Loading leads" className="size-5 animate-spin text-slate-400" />
            <span>Getting your leads...</span>
          </section>
        ) : isError ? (
          <section className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50 p-5 text-center text-rose-800" role="alert">
            <p className="font-semibold">Could not load leads.</p>
            <button
              className="mt-3 cursor-pointer rounded-lg bg-rose-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              onClick={handleRefetch}
              type="button"
            >
              Try again
            </button>
          </section>
        ) : (
          <>
            {isUpdateError ? <p className="mb-3 text-sm text-rose-700" role="alert">Could not update lead status.</p> : null}
            <LeadsTable
              data={leads?.data ?? []}
              isUpdatingStatus={isUpdatingStatus}
              onSortChange={handleSortChange}
              onStatusFilterChange={handleStatusFilterChange}
              onStatusUpdate={handleStatusUpdate}
              statusFilter={status}
              total={leads?.meta.total ?? 0}
            />

            {leads && leads.meta.totalPages > 1 ? (
              <nav className="mt-5 flex items-center justify-between" aria-label="Lead pagination">
                <button
                  className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={page === 1}
                  onClick={handlePreviousPage}
                  type="button"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-600">
                  Page {leads.meta.page} of {leads.meta.totalPages}
                </span>
                <button
                  className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={page === leads.meta.totalPages}
                  onClick={handleNextPage}
                  type="button"
                >
                  Next
                </button>
              </nav>
            ) : null}
          </>
        )}
      </section>

      <LeadsModal isOpen={isModalOpen} onClose={closeCreateModal} />
    </main>
  );
};