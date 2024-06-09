import { lazy } from "react";
import { Route } from "react-router-dom";

const ItemListPage = lazy(() => import("./list/ItemListPage"));

export class ItemRoutes {
  static item = "/items";

  static init = () => <Route path={"/items"} element={<ItemListPage />}></Route>;
}
