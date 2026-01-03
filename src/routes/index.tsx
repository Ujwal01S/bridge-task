import RootLayout from "@/components/layout/layout";
import { Spinner } from "@/components/ui/spinner";
import { ROUTE } from "@/constants";

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import AuthGuard from "./auth-gaurd";
import NotFound from "@/components/not-found";

// lazy import components

const HomePage = lazy(() => import("@/pages/home/index"));
const CreateUserPage = lazy(() => import("@/pages/create-user/index"));
const LoginPage = lazy(() => import("@/pages/login/index"));

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTE.LOGIN}
        element={
          <Suspense fallback={<Spinner />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route element={<AuthGuard />}>
        <Route element={<RootLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={ROUTE.USER_CREATE}
            element={
              <Suspense fallback={<Spinner />}>
                <CreateUserPage />
              </Suspense>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
