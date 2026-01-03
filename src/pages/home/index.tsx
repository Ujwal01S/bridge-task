import { useDeleteUser } from "@/api/hooks/user/use-delete-user";
import { useGetUser } from "@/api/hooks/user/use-get-user";
import DeleteDailog from "@/components/commons/delete-dailog/delete-dailog";
import UserModal from "@/components/commons/user-modal";
import UserTable from "@/components/home/user-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import { useUserModalStore } from "@/store/use-user-modal-store";

const HomePage = () => {
  const { skip, limit } = usePaginationParams();
  const { data, isPending } = useGetUser({ limit, skip });

  const { mutate, deleteIsPending } = useDeleteUser();

  const { open, closeDeleteDialog, id } = useDeleteDialogStore();

  const { openModal, type, closeModal, userId } = useUserModalStore();

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
            userData={data.users}
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

      <UserModal
        onChange={closeModal}
        open={openModal}
        type={type as "create" | "edit"}
        id={userId}
      />
    </section>
  );
};

export default HomePage;
