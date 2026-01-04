import {
  flexRender,
  type ColumnDef,
  type Table as TableType,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TriangleAlert } from "lucide-react";
import { memo } from "react";

interface IProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
}

export const EmptyTableRow = memo(({ colLength }: { colLength: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colLength} className='h-24 text-center'>
        No Results
      </TableCell>
    </TableRow>
  );
});

EmptyTableRow.displayName = "EmptyTableRow";

const DataTableRender = <TData, TValue>({
  table,
  columns,
}: IProps<TData, TValue>) => {
  return (
    <div className='w-full'>
      <ScrollArea className='w-full'>
        <div className='min-w-200'>
          <Table>
            {/* Table header content */}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            {/* Table Body Part */}

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className='border-gray-400'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <EmptyTableRow colLength={columns.length} />
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {/* fallback when all the column are hidden */}

      {!table.getIsSomeColumnsVisible() && (
        <div className='w-full flex items-center justify-center gap-2'>
          <div>
            <TriangleAlert color='red' size={24} />
          </div>
          <p className='font-semibold'>
            All Column Visibility are off turn any Column Visibility{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataTableRender;
