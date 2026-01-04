import UserForm from "@/components/form/user-form/user-form";
import { Button } from "@/components/ui/button";
import type { IPickedUser } from "@/interface/user/user.interface";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import { useUserModalStore } from "@/store/use-user-modal-store";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit2, Trash2 } from "lucide-react";
import { useMemo } from "react";

export const useUserColumn = () => {
  const { setOpenDeleteDialog } = useDeleteDialogStore();

  const { setOpenModal } = useUserModalStore();
  const columns: ColumnDef<IPickedUser>[] = useMemo(
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
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => <div>{row.getValue("age") ?? "N/A"}</div>,
      },

      {
        accessorKey: "address",
        header: "Address(country)",
        cell: ({ row }) => {
          const address = row.getValue("address") as
            | { country?: string }
            | undefined;
          return <div>{address?.country || "N/A"}</div>;
        },
      },
      {
        id: "actions",
        enableHidding: true,
        cell: ({ row }) => {
          const id = row.original.id;
          const initialValue = row.original;
          return (
            <div className='flex gap-1.5'>
              <button onClick={() => setOpenDeleteDialog(id)}>
                <Trash2 className='text-red-400' />
              </button>

              <button
                onClick={() =>
                  setOpenModal({
                    id,
                    type: "edit",
                    title: "Update User",
                    content: (
                      <UserForm
                        mode='update'
                        id={id}
                        initialValues={initialValue}
                      />
                    ),
                  })
                }
              >
                <Edit2 className='text-blue-500' />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};
