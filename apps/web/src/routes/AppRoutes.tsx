import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "~/layouts/MainLayout";

const NFTsDisplayRoute = lazy(async () => import("~/components/NFTsDisplay/NFTsDisplayRoute"));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<NFTsDisplayRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
