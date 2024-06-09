import { Outlet, useParams } from "react-router-dom";

import ListDetail from "@/presentation/list/detail/ListDetail";

export default function ListDetailPage() {
  const { id } = useParams() as { id: string };
  return (
    <>
      <ListDetail id={id} />
      <Outlet />
    </>
  );
}
