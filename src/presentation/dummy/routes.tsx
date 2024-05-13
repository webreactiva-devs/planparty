import { lazy } from "react";
import { Route } from "react-router-dom";

const DummyCreate = lazy(() => import("./create/DummyCreate"));
const DummyDeletePage = lazy(() => import("./delete/DummyDeletePage"));
const DummyEditPage = lazy(() => import("./edit/DummyEditPage"));
const DummyListPage = lazy(() => import("./list/DummyListPage"));

export class DummyRoutes {
  static list = "/dummies";
  static create = "/dummies/new";
  static delete = (id: number) => `/dummies/${id}/delete`;
  static edit = (id: number) => `/dummies/${id}`;

  static init = () => (
    <Route path={"/dummies"} element={<DummyListPage />}>
      <Route path="new" element={<DummyCreate />} />
      <Route path=":id" element={<DummyEditPage />} />
      <Route path=":id/delete" element={<DummyDeletePage />} />
    </Route>
  );
}
