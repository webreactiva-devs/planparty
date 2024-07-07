import { useNavigate, useParams } from "react-router-dom";

import ListDeleteForm from "@/presentation/list/delete/ListDeleteForm";
import { useGetOneList } from "@/services/list/services";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shadcn/components/ui/sheet";

export default function ListDeletePage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { data, isError, isLoading, isSuccess } = useGetOneList(id);

  const afterSubmit = () => {
    navigate("/lists");
  };

  return (
    <Sheet open onOpenChange={afterSubmit}>
      <SheetContent className="sm:max-w-[650px]">
        <SheetHeader>
          <SheetTitle>Delete List</SheetTitle>
        </SheetHeader>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {isSuccess && data !== null && <ListDeleteForm list={data} afterSubmit={afterSubmit} />}
      </SheetContent>
    </Sheet>
  );
}
