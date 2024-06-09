import { lazy } from "react";
import { Route } from "react-router-dom";

const ListListPage = lazy(() => import("./list/ListListPage"));
const ListCreate = lazy(() => import("./create/ListCreate"));
const ListDetailPage = lazy(() => import("./detail/ListDetailPage"));
const ListDeletePage = lazy(() => import("./delete/ListDeletePage"));

export class ListRoutes {
  static list = "/lists";
  static detail = (id: string) => `/lists/${id}`;
  static create = "/lists/new";
  static delete = (id: string) => `/lists/${id}/delete`;

  static init = () => (
    <Route path={"/lists"} element={<ListListPage />}>
      <Route path="new" element={<ListCreate />} />
      <Route path=":id" element={<ListDetailPage />} />
      <Route path=":id/delete" element={<ListDeletePage />} />
    </Route>
  );
}
