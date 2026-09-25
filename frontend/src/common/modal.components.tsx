import { X } from 'lucide-react';
import { type ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={onClose}
    >
      <section
        aria-label="Modal"
        aria-modal="true"
        className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close modal"
          autoFocus
          className="absolute right-4 top-4 cursor-pointer rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          onClick={onClose}
          type="button"
        >
          <X size={18} />
        </button>
        {children}
      </section>
    </div>
  );
};