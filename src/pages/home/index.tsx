import { useGetUser } from "@/api/hooks/use-get-user";
import UserTable from "@/components/home/user-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";

const HomePage = () => {
  const { skip, limit } = usePaginationParams();
  const { data, isPending } = useGetUser({ limit, skip });

  console.log(data);
  return (
    <section className='grid gap-3'>
      <header>
        <h5>View All Users</h5>
      </header>

      <div>
        <p className='flex items-center gap-2'>
          Total Users :{" "}
          <span className='font-semibold'>
            {isPending ? (
              <Skeleton className='h-5 w-8 bg-gray-300' />
            ) : (
              data && data?.total
            )}
          </span>
        </p>
      </div>
      {isPending ? (
        <div className='flex items-center justify-center w-full h-[50vh]  '>
          <Spinner />
        </div>
      ) : (
        data && <UserTable userData={data} isPending={isPending} />
      )}
    </section>
  );
};

export default HomePage;
