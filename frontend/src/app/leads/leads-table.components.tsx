import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

import { Table } from '../../common/table.components';
import type { Lead, LeadSort } from './leads.types';
import { formatCreatedAt, statusStyles } from './leads.utils';

type LeadsTableProps = {
  data: Lead[];
  total?: number;
  onSortChange?: (sort?: LeadSort) => void;
};

const sortableColumnIds = new Set<keyof Lead>(['name', 'email', 'status', 'createdAt']);

const columns: ColumnDef<Lead>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<Lead['status']>();

      return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ getValue }) => formatCreatedAt(getValue<string>()),
  },
];

const SortIcon = ({ state }: { state?: 'asc' | 'desc' }) => {
  if (state === 'asc') {
    return <ArrowUp size={15} strokeWidth={2} />;
  }

  if (state === 'desc') {
    return <ArrowDown size={15} strokeWidth={2} />;
  }

  return <ArrowUpDown size={15} strokeWidth={2} />;
};

export const LeadsTable = ({
  data,
  total = 0,
  onSortChange,
}: LeadsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
  });

  const cycleSort = (columnId: string) => {
    const activeSort = sorting.find((sort) => sort.id === columnId);
    const nextSorting: SortingState = !activeSort
      ? [{ id: columnId, desc: false }]
      : activeSort.desc
        ? []
        : [{ id: columnId, desc: true }];

    setSorting(nextSorting);

    const nextSort = nextSorting[0];
    onSortChange?.(
      nextSort ? (`${nextSort.desc ? '-' : ''}${nextSort.id}` as LeadSort) : undefined,
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = sortableColumnIds.has(header.column.id as keyof Lead);
                  const sortState = header.column.getIsSorted();

                  return (
                    <Table.HeaderCell key={header.id}>
                      {header.isPlaceholder ? null : sortable ? (
                        <button
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded text-left hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          onClick={() => cycleSort(header.column.id)}
                          type="button"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon state={sortState || undefined} />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Head>

          <Table.Body>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.EmptyCell colSpan={columns.length}>
                  No leads yet. Create your first lead to start tracking.
                </Table.EmptyCell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                <span className="text-sm text-slate-500">{total} leads</span>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
};

