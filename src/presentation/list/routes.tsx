import { lazy } from "react";
import { Route } from "react-router-dom";

const ListListPage = lazy(() => import("./list/ListListPage"));
const ListCreate = lazy(() => import("./create/ListCrear"));

export class ListRoutes {
  static list = "/lists";
  static create = "/lists/new";

  static init = () => (
    <Route path={"/lists"} element={<ListListPage />}>
      <Route path="new" element={<ListCreate />} />
    </Route>
  );
}
