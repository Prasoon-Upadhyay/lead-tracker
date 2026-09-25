import { Plus } from 'lucide-react';
import { LeadsTable } from './leads-table.components';
export const LeadsScreen = () => {
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
            type="button"
          >
            <Plus size={18} /> Add lead
          </button>
        </header>
        <LeadsTable data={[]} />
      </section>
    </main>
  );
};
