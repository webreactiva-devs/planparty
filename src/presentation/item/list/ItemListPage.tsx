import { Outlet } from "react-router-dom";

import ItemList from "@/presentation/item/list/ItemList";

export default function ItemItemPage() {
  return (
    <>
      <ItemList />
      <Outlet />
    </>
  );
}
