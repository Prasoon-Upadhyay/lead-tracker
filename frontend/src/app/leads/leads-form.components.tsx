import { LoaderCircle } from 'lucide-react';
import type { FormEvent } from 'react';

import { useCreateLead } from './leads.data';
import type { CreateLeadInput } from './leads.types';

type LeadsFormProps = {
  onClose: () => void;
};

export const LeadsForm = ({ onClose }: LeadsFormProps) => {
  const {
    mutateAsync: createLead,
    isError,
    isPending,
  } = useCreateLead();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input: CreateLeadInput = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
    };

    await createLead(input);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-bold">Add lead</h2>
        <p className="mt-1 text-sm text-slate-600">Capture a new lead to begin tracking it.</p>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-slate-700" htmlFor="lead-name">
          Name
          <input
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            id="lead-name"
            minLength={2}
            name="name"
            required
            type="text"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="lead-email">
          Email
          <input
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            id="lead-email"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="lead-phone">
          Phone
          <input
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            id="lead-phone"
            minLength={7}
            name="phone"
            pattern="[0-9+() -]+"
            required
            type="tel"
          />
        </label>
      </div>

      {isError ? <p className="mt-4 text-sm text-rose-700" role="alert">Could not create lead.</p> : null}

      <div className="mt-6 flex justify-end gap-3">
        <button
          className="cursor-pointer rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white transition hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
          type="submit"
        >
          {isPending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          Create
        </button>
      </div>
    </form>
  );
};