import { useUserColumn } from "@/hooks/table-columns/use-user-table-column";
import {
  //   type ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import PaginationButton from "../commons/custom-button/pagination-button";
import DataTableRender from "../data-table/render-row";
import ViewOptions from "../data-table/view-options";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import type { IPickedUser } from "@/interface";

interface IProps {
  userData: IPickedUser[];
  isPending: boolean;
  total: number;
}

const UserTable = ({ userData, isPending, total }: IProps) => {
  //   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useUserColumn();

  const table = useReactTable({
    data: userData,
    columns,

    getSortedRowModel: getSortedRowModel(),

    getCoreRowModel: getCoreRowModel(),

    // visibility
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      //   columnFilters,
      columnVisibility,
    },
  });
  return (
    <Card>
      <CardHeader className='sr-only'>header</CardHeader>
      <CardContent>
        <ViewOptions table={table} />
        <DataTableRender columns={columns} table={table} />
      </CardContent>

      <CardFooter className='place-self-end'>
        <PaginationButton total={total ?? 0} isPending={isPending} />
      </CardFooter>
    </Card>
  );
};

export default UserTable;
