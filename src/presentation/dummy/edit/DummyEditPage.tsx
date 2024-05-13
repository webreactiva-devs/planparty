import { useNavigate, useParams } from "react-router-dom";

import DummyEditForm from "@/presentation/dummy/edit/DummyEditForm";
import { DummyRoutes } from "@/presentation/dummy/routes";
import { useGetDummy } from "@/services/dummy/services";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shadcn/components/ui/sheet";

export default function DummyEditPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { data, isError, isLoading, isSuccess } = useGetDummy(Number(id));

  const afterSubmit = () => {
    navigate(DummyRoutes.list);
  };

  return (
    <Sheet open onOpenChange={afterSubmit}>
      <SheetContent className="sm:max-w-[650px]">
        <SheetHeader>
          <SheetTitle>Editar Dummy</SheetTitle>
        </SheetHeader>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {isSuccess && data !== null && <DummyEditForm dummy={data} afterSubmit={afterSubmit} />}
      </SheetContent>
    </Sheet>
  );
}
