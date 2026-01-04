import { useSearchParams } from "@/hooks/query-params/use-search";
import { useUserColumn } from "@/hooks/table-columns/use-user-table-column";
import type { IPickedUser } from "@/interface";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";
import { useUserModalStore } from "@/store/use-user-modal-store";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import PaginationButton from "../commons/custom-button/pagination-button";
import SearchInput from "../commons/search-user";
import DataTableRender from "../data-table/render-row";
import ViewOptions from "../data-table/view-options";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Spinner } from "../ui/spinner";
import UserForm from "../form/user-form/user-form";

interface IProps {
  userData: IPickedUser[];
  isPending: boolean;
  total: number;
}

const UserTable = ({ userData, isPending, total }: IProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { q, setQ } = useSearchParams();

  const { clearDeletedUsers } = useDeletedUsersStore();

  const { setOpenModal } = useUserModalStore();

  const columns = useUserColumn();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

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
        <div className='flex justify-between items-center'>
          <SearchInput
            placeholder='search user...'
            onChange={handleSearchChange}
            value={q}
          />
          <div className='flex items-center gap-3 justify-end py-2'>
            <Button
              onClick={() =>
                setOpenModal({
                  id: undefined,
                  type: "create",
                  title: "Create User",
                  content: <UserForm mode='create' />,
                })
              }
            >
              Create User
            </Button>
            <ViewOptions table={table} />
          </div>
        </div>

        {/* Table */}
        {isPending ? (
          <div className='flex items-center justify-center w-full h-[50vh]  '>
            <Spinner />
          </div>
        ) : (
          <DataTableRender columns={columns} table={table} />
        )}
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
