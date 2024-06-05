import { useNavigate } from "react-router-dom";

import { useFormCreateList } from "@/hooks/list/forms";
import { ListRoutes } from "@/presentation/list/routes";
import TextInput from "@/presentation/shared/form/text-input";
import { useMutationCreateList } from "@/services/list/services";
import { Button } from "@/shadcn/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shadcn/components/ui/dialog";
import { Form } from "@/shadcn/components/ui/form";

export default function ListCreate() {
  const navigate = useNavigate();
  const methodsForm = useFormCreateList();

  const mutation = useMutationCreateList();

  const afterSubmit = () => {
    navigate(ListRoutes.list);
  };

  const onSubmit = (formData: any, e: any) => {
    e.preventDefault();
    console.log(formData);
    mutation.mutateAsync(formData).finally(() => {
      afterSubmit();
    });
  };

  return (
    <Dialog open onOpenChange={afterSubmit}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Crear Lista</DialogTitle>
        </DialogHeader>
        <Form {...methodsForm}>
          <form onSubmit={methodsForm.handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-1 items-center gap-4">
              <TextInput
                name="name"
                control={methodsForm.control}
                label="Nombre"
                required
                description="El nombre de la lista"
              />
              <TextInput
                name="user"
                control={methodsForm.control}
                label="Usuario"
                required
                description="El nombre del usuario que crea la lista"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={mutation.status === "pending"}>
                Crear lista
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
