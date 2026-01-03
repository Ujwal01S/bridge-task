import RootLayout from "@/components/layout/layout";
import { Spinner } from "@/components/ui/spinner";
import { ROUTE } from "@/constants";

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// lazy import components

const HomePage = lazy(() => import("@/pages/home/index"));
const CreateUserPage = lazy(() => import("@/pages/create-user/index"));

const ProjectRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default ProjectRoutes;
