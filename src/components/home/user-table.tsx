import { useUserColumn } from "@/hooks/table-columns/use-user-table-column";
import {
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
import { Button } from "../ui/button";
import { useUserModalStore } from "@/store/use-user-modal-store";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";

interface IProps {
  userData: IPickedUser[];
  isPending: boolean;
  total: number;
}

const UserTable = ({ userData, isPending, total }: IProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { clearDeletedUsers } = useDeletedUsersStore();

  const { setOpenModal } = useUserModalStore();

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
        <div className='flex items-center gap-3 justify-end'>
          <Button onClick={() => setOpenModal(undefined, "create")}>
            Create User
          </Button>
          <ViewOptions table={table} />
        </div>
        <DataTableRender columns={columns} table={table} />
      </CardContent>

      <CardFooter className='flex justify-between items-center w-full'>
        <div>
          Clear Persisted Deleted UserId{" "}
          <Button variant={"outline"} onClick={() => clearDeletedUsers()}>
            Clear
          </Button>
        </div>
        <PaginationButton total={total ?? 0} isPending={isPending} />
      </CardFooter>
    </Card>
  );
};

export default UserTable;
