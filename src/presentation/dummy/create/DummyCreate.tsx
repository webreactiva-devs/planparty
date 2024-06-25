import { useNavigate } from "react-router-dom";

import { useFormCreateDummy } from "@/hooks/dummy/forms";
import { DummyRoutes } from "@/presentation/dummy/routes";
import TextInput from "@/presentation/shared/form/text-input";
import { useMutationCreateDummy } from "@/services/dummy/services";
import { Button } from "@/shadcn/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shadcn/components/ui/dialog";
import { Form } from "@/shadcn/components/ui/form";

export default function DummyCreate() {
  const navigate = useNavigate();
  const methodsForm = useFormCreateDummy();

  const mutation = useMutationCreateDummy();

  const afterSubmit = () => {
    navigate(DummyRoutes.list);
  };

  const onSubmit = (formData: any, e: any) => {
    e.preventDefault();
    mutation.mutateAsync(formData).finally(() => {
      afterSubmit();
    });
  };

  return (
    <Dialog open onOpenChange={afterSubmit}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Crear Dummy</DialogTitle>
        </DialogHeader>
        <Form {...methodsForm}>
          <form onSubmit={methodsForm.handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-2 items-center gap-4">
              <TextInput
                name="name"
                control={methodsForm.control}
                label="Nombre"
                required
                description="El nombre del dummy"
              />
              <TextInput
                name="description"
                control={methodsForm.control}
                label="Descripción"
                description="La descripción del dummy"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={mutation.status === "pending"}>
                Crear dummy
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
