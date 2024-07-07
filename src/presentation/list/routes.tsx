import { lazy } from "react";
import { Route } from "react-router-dom";

const ListListPage = lazy(() => import("./list/ListListPage"));
const ListCreate = lazy(() => import("./create/ListCreate"));
const ListEditPage = lazy(() => import("./edit/ListEditPage"));
const ListDeletePage = lazy(() => import("./delete/ListDeletePage"));

export class ListRoutes {
  static list = "/lists";
  static create = "/lists/new";
  static delete = (id: string) => `/lists/${id}/delete`;
  static edit = (id: string) => `/lists/${id}/edit`;

  static init = () => (
    <Route path={"/lists"} element={<ListListPage />}>
      <Route path="new" element={<ListCreate />} />
      <Route path=":id/edit" element={<ListEditPage />} />
      <Route path=":id/delete" element={<ListDeletePage />} />
    </Route>
  );
}
