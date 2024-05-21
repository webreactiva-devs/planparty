import { Navigate, Route, Routes } from "react-router-dom";

import { ListRoutes } from "./list/routes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route key="not-found" path="*" element={<Navigate to={ListRoutes.list} replace />} />
      <Route index element={<Navigate to={ListRoutes.list} replace />} />
      {ListRoutes.init()}
    </Routes>
  );
};
