import {
  dummyData,
  useUserColumn,
} from "@/hooks/table-columns/use-user-table-column";
import {
  useReactTable,
  getSortedRowModel,
  type ColumnFiltersState,
  getCoreRowModel,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import DataTableRender from "../data-table/render-row";
import ViewOptions from "../data-table/view-options";

const UserTable = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useUserColumn();

  const table = useReactTable({
    data: dummyData,
    columns,

    getSortedRowModel: getSortedRowModel(),

    getCoreRowModel: getCoreRowModel(),

    // visibility
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      columnFilters,
      columnVisibility,
    },
  });
  return (
    <>
      <ViewOptions table={table} />
      <DataTableRender columns={columns} table={table} />
    </>
  );
};

export default UserTable;
