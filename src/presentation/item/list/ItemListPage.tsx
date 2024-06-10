import { Outlet, useParams } from "react-router-dom";

import ItemList from "@/presentation/item/list/ItemList";

export default function ItemItemPage() {
  const { id } = useParams() as { id: string };
  return (
    <>
      {id ? <ItemList listId={id} /> : <ItemList />}
      <Outlet />
    </>
  );
}
