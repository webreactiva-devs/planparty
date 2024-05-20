import { Navigate, Route, Routes } from "react-router-dom";

import { DummyRoutes } from "@/presentation/dummy/routes";
import { ListRoutes } from "@/presentation/list/routes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route key="not-found" path="*" element={<Navigate to={DummyRoutes.list} replace />} />
      <Route index element={<Navigate to={DummyRoutes.list} replace />} />
      {DummyRoutes.init()}
      {ListRoutes.init()}
    </Routes>
  );
};
