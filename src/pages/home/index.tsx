import { useDeleteUser } from "@/api/hooks/use-delete-user";
import { useGetUser } from "@/api/hooks/use-get-user";
import DeleteDailog from "@/components/commons/delete-dailog/delete-dailog";
import UserTable from "@/components/home/user-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import { useUserStore } from "@/store/use-user-store";
import { useEffect } from "react";

const HomePage = () => {
  const { skip, limit } = usePaginationParams();
  const { data, isPending } = useGetUser({ limit, skip });

  const { setUsers, users } = useUserStore();

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const { mutate, deleteIsPending } = useDeleteUser();

  const { open, closeDeleteDialog, id } = useDeleteDialogStore();

  const handleDeleteUser = async () => {
    mutate(Number(id));
  };

  return (
    <section className='grid gap-3'>
      <header>
        <h5>View All Users</h5>
      </header>

      <div>
        <div className='flex items-center gap-2'>
          Total Users :{" "}
          <span className='font-semibold'>
            {isPending ? (
              <Skeleton className='h-5 w-8 bg-gray-300' />
            ) : (
              data && data?.total
            )}
          </span>
        </div>
      </div>
      {isPending ? (
        <div className='flex items-center justify-center w-full h-[50vh]  '>
          <Spinner />
        </div>
      ) : (
        data && (
          <UserTable
            userData={users}
            isPending={isPending}
            total={data.total}
          />
        )
      )}

      <DeleteDailog
        open={open}
        onChange={closeDeleteDialog}
        onDelete={handleDeleteUser}
        loading={deleteIsPending}
      />
    </section>
  );
};

export default HomePage;
