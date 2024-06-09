import { lazy } from "react";
import { Route } from "react-router-dom";

const ListListPage = lazy(() => import("./list/ListListPage"));

export class ListRoutes {
  static list = "/lists";
  static create = "/lists/new";

  static init = () => <Route path={"/lists"} element={<ListListPage />} />;
}
