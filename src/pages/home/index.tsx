import { useDeleteUser } from "@/api/hooks/user/use-delete-user";
import { useGetUser } from "@/api/hooks/user/use-get-user";
import CustomModal from "@/components/commons/custom-modal";
import DeleteDailog from "@/components/commons/delete-dailog/delete-dailog";
import UserTable from "@/components/home/user-table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { useSearchParams } from "@/hooks/query-params/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import { useUserModalStore } from "@/store/use-user-modal-store";

const HomePage = () => {
  // pagination params
  const { skip, limit } = usePaginationParams();

  // search params
  const { q } = useSearchParams();
  const debouncedSearchValue = useDebounce(q, 300);
  const { data, isPending } = useGetUser({
    limit,
    skip,
    q: debouncedSearchValue,
    route: q ? "search" : "",
  });

  const { mutate, deleteIsPending } = useDeleteUser();

  const { open, closeDeleteDialog, id } = useDeleteDialogStore();

  const { openModal, closeModal } = useUserModalStore();

  const handleDeleteUser = async () => {
    mutate(Number(id));
  };

  return (
    <section className='grid gap-3 w-full'>
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

      {data && (
        <UserTable
          userData={data.users}
          isPending={isPending}
          total={data.total}
        />
      )}

      <DeleteDailog
        open={open}
        onChange={closeDeleteDialog}
        onDelete={handleDeleteUser}
        loading={deleteIsPending}
      />

      <CustomModal open={openModal} onChange={closeModal} />
    </section>
  );
};

export default HomePage;
