import { useNavigate, useParams } from "react-router-dom";

import translate from "@/locales/translate";
import ListEditForm from "@/presentation/list/edit/ListEditForm";
import { ListRoutes } from "@/presentation/list/routes";
import { useGetOneList } from "@/services/list/services";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shadcn/components/ui/sheet";

function ListEditPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { data, isError, isLoading, isSuccess } = useGetOneList(id);

  const afterSubmit = () => {
    navigate(ListRoutes.list);
  };

  return (
    <Sheet open onOpenChange={afterSubmit}>
      <SheetContent className="sm:max-w-[650px]">
        <SheetHeader>
          <SheetTitle>{translate("list.edit.title")}</SheetTitle>
        </SheetHeader>
        <SheetTitle></SheetTitle>
        {isLoading && <p>{translate("common.loading")}</p>}
        {isError && <p>{translate("common.error")}</p>}
        {isSuccess && data !== null && <ListEditForm list={data} afterSubmit={afterSubmit} />}
      </SheetContent>
    </Sheet>
  );
}

export default ListEditPage;
