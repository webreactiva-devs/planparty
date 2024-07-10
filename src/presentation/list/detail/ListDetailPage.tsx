import { Outlet, useNavigate, useParams } from "react-router-dom";

import ListDetail from "@/presentation/list/detail/ListDetail";
import { Button } from "@/shadcn/components/ui/button";

import { ListRoutes } from "../routes";

export default function ListDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  return (
    <>
      <Button onClick={() => navigate(ListRoutes.list)}>Back to List</Button>
      <ListDetail id={id} />
      <Outlet />
    </>
  );
}
