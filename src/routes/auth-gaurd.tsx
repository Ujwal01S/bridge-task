import { useAuthStore } from "@/store/use-auth-store";
import { Navigate, Outlet } from "react-router";

const AuthGuard = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
