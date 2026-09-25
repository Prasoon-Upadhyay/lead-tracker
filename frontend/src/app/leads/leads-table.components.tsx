import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Table } from '../../common/table.components';
import { LEAD_STATUSES, SORTABLE_COLUMS } from './leads.constants';
import type { Lead, LeadSort, LeadStatus } from './leads.types';
import { formatCreatedAt, statusStyles } from './leads.utils';

type LeadsTableProps = {
  data: Lead[];
  isUpdatingStatus: boolean;
  statusFilter: LeadStatus | null;
  total: number;
  onSortChange: (sort: LeadSort | null) => void;
  onStatusFilterChange: (status: LeadStatus | null) => void;
  onStatusUpdate: (id: string, status: LeadStatus) => Promise<void>;
};

const getColumns = (
  isUpdatingStatus: boolean,
  onStatusUpdate: LeadsTableProps['onStatusUpdate'],
): ColumnDef<Lead>[] => [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue, row }) => {
      const status = getValue<LeadStatus>();

      return (
        <select
          aria-label={`Update status for ${row.original.name}`}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-center text-xs font-semibold ring-1 outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-60 ${statusStyles[status]}`}
          defaultValue={status}
          disabled={isUpdatingStatus}
          onChange={(event) => void onStatusUpdate(row.original.id, event.currentTarget.value as LeadStatus)}
        >
          {LEAD_STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ getValue }) => formatCreatedAt(getValue<string>()),
  },
];

const SortIcon = ({ state }: { state: 'asc' | 'desc' | null }) => {
  if (state === 'asc') return <ArrowUp size={15} strokeWidth={2} />;
  if (state === 'desc') return <ArrowDown size={15} strokeWidth={2} />;

  return <ArrowUpDown size={15} strokeWidth={2} />;
};

export const LeadsTable = ({
  data,
  isUpdatingStatus,
  statusFilter,
  total,
  onSortChange,
  onStatusFilterChange,
  onStatusUpdate,
}: LeadsTableProps) => {
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(() => getColumns(isUpdatingStatus, onStatusUpdate), [isUpdatingStatus, onStatusUpdate]);
  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSort = (columnId: string) => {
    const activeSort = sorting.find((sort) => sort.id === columnId);
    const nextSorting: SortingState = !activeSort
      ? [{ id: columnId, desc: false }]
      : activeSort.desc
        ? []
        : [{ id: columnId, desc: true }];

    setSorting(nextSorting);
    const nextSort = nextSorting[0];
    onSortChange(nextSort ? (`${nextSort.desc ? '-' : ''}${nextSort.id}` as LeadSort) : null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = SORTABLE_COLUMS.has(header.column.id);
                  const sortState = header.column.getIsSorted();
                  const isStatusColumn = header.column.id === 'status';

                  return (
                    <Table.HeaderCell key={header.id}>
                      {header.isPlaceholder ? null : isStatusColumn ? (
                        <div className="relative flex items-center gap-1.5">
                          <button
                            aria-expanded={isStatusFilterOpen}
                            className="inline-flex cursor-pointer items-center gap-1 rounded hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            onClick={() => setIsStatusFilterOpen((isOpen) => !isOpen)}
                            type="button"
                          >
                            Status
                            <ChevronDown size={15} />
                          </button>
                          {isStatusFilterOpen ? (
                            <div className="absolute left-0 top-full z-10 mt-2 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                              {LEAD_STATUSES.map((filterStatus) => {
                                const isSelected = statusFilter === filterStatus;
                                const label = filterStatus;

                                return (
                                  <button
                                    className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                    key={label}
                                    onClick={() => {
                                      onStatusFilterChange(isSelected ? null : filterStatus);
                                      setIsStatusFilterOpen(false);
                                    }}
                                    type="button"
                                  >
                                    <span className={`flex size-4 items-center justify-center rounded border ${isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'}`}>
                                      {isSelected ? <Check size={12} strokeWidth={3} /> : null}
                                    </span>
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          ) : null}
                          <button
                            aria-label="Sort by status"
                            className="inline-flex cursor-pointer rounded hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            onClick={() => handleSort(header.column.id)}
                            type="button"
                          >
                            <SortIcon state={sortState || null} />
                          </button>
                        </div>
                      ) : sortable ? (
                        <button
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded text-left hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          onClick={() => handleSort(header.column.id)}
                          type="button"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon state={sortState || null} />
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