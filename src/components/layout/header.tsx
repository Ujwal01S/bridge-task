import { ROUTE } from "@/constants";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/use-auth-store";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { clearDeletedUsers } = useDeletedUsersStore();
  const navigation = useNavigate();

  const handleLogout = () => {
    // logout + clear delete persisted id
    logout();
    clearDeletedUsers();
    navigation(ROUTE.LOGIN);
  };
  return (
    <header className='w-full  px-4  shadow-md bg-white fixed z-20 md:z-99'>
      <div className=' h-16 flex items-center justify-between  '>
        <Link to={ROUTE.USER_VIEW_ALL}>
          <h2>Bridge Task</h2>
        </Link>
        {isAuthenticated ? (
          <div>
            <p className='text-xs'>
              welcome{" "}
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </p>
            <button
              className='text-xs font-semibold border p-2 rounded-sm'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={ROUTE.LOGIN} className='relative pr-4'>
            <Button variant={"outline"}>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
