import { useGetUser } from "@/api/hooks/use-get-user";
import UserTable from "@/components/home/user-table";

const HomePage = () => {
  const { data } = useGetUser();

  console.log(data);
  return (
    <div>
      This is home page.
      <UserTable />
    </div>
  );
};

export default HomePage;
