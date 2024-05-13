import { Outlet, useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

import DummyList from "@/presentation/dummy/list/DummyList";
import { DummyRoutes } from "@/presentation/dummy/routes";
import { Button } from "@/shadcn/components/ui/button";

export default function DummyListPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(DummyRoutes.create)}>
        <Plus className="mr-2 h-4 w-4" /> Crear Dummy
      </Button>
      <DummyList />
      <Outlet />
    </>
  );
}
