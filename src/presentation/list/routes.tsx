import { lazy } from "react";
import { Route } from "react-router-dom";

const ListListPage = lazy(() => import("./list/ListListPage"));
const ListCreate = lazy(() => import("./create/ListCreate"));
const ListDetailPage = lazy(() => import("./detail/ListDetailPage"));
const ListDeletePage = lazy(() => import("./delete/ListDeletePage"));
const ItemListPage = lazy(() => import("@/presentation/item/list/ItemListPage"));

export class ListRoutes {
  static list = "/lists";
  static detail = (id: string) => `/lists/${id}`;
  static create = "/lists/new";
  static delete = (id: string) => `/lists/${id}/delete`;

  static init = () => (
    <>
      <Route path={"/lists"} element={<ListListPage />}>
        <Route path="new" element={<ListCreate />} />
        <Route path=":id/delete" element={<ListDeletePage />} />
      </Route>
      <Route path={"/lists/:id"} element={<ListDetailPage />}>
        <Route path="items" element={<ItemListPage />} />
      </Route>
    </>
  );
}
