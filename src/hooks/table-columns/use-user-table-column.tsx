import { Button } from "@/components/ui/button";
import type { IUser } from "@/interface/user/user.interface";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo } from "react";

export const useUserColumn = () => {
  const columns: ColumnDef<IUser>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("id")}</div>
        ),
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              First Name
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("firstName")}</div>
        ),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Last Name
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("lastName")}</div>
        ),
      },

      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("email")}</div>
        ),
      },
    ],
    []
  );

  return columns;
};
