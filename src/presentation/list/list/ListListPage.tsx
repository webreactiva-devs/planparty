import { Outlet, useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

import ListList from "@/presentation/list/list/ListList";
import { ListRoutes } from "@/presentation/list/routes";
import { Button } from "@/shadcn/components/ui/button";

export default function ListListPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(ListRoutes.create)}>
        <Plus className="mr-2 h-4 w-4" /> Crear Lista
      </Button>
      <ListList />
      <Outlet />
    </>
  );
}
