import RootLayout from "@/components/layout/layout";
import { Spinner } from "@/components/ui/spinner";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// lazy import components

const HomePage = lazy(() => import("@/pages/home/index"));

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
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
