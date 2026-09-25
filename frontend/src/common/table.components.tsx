import type { ComponentProps, ReactNode } from 'react';

const TableRoot = ({ children, ...props }: ComponentProps<'table'>) => (
  <table className="w-full border-collapse text-left text-sm" {...props}>
    {children}
  </table>
);

const TableHead = ({ children, ...props }: ComponentProps<'thead'>) => (
  <thead className="border-b border-slate-200 bg-slate-50" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: ComponentProps<'tbody'>) => (
  <tbody className="divide-y divide-slate-100 bg-white" {...props}>
    {children}
  </tbody>
);

const TableFooter = ({ children, ...props }: ComponentProps<'tfoot'>) => (
  <tfoot className="border-t border-slate-200 bg-slate-50" {...props}>
    {children}
  </tfoot>
);

const TableRow = ({ children, ...props }: ComponentProps<'tr'>) => (
  <tr className="transition-colors hover:bg-slate-50" {...props}>
    {children}
  </tr>
);

const TableHeaderCell = ({ children, ...props }: ComponentProps<'th'>) => (
  <th className="px-5 py-3 font-semibold text-slate-600" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: ComponentProps<'td'>) => (
  <td className="px-5 py-4 text-slate-700" {...props}>
    {children}
  </td>
);

const TableEmptyCell = ({ children, ...props }: ComponentProps<'td'> & { children: ReactNode }) => (
  <td className="px-5 py-12 text-center text-slate-500" {...props}>
    {children}
  </td>
);

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
  EmptyCell: TableEmptyCell,
});
