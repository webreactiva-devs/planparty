import type { List } from "@/domain/list/types";
import { useFormUpdateList } from "@/hooks/list/forms";
import TextInput from "@/presentation/shared/form/text-input";
import { useMutationUpdateList } from "@/services/list/services";
import { Button } from "@/shadcn/components/ui/button";
import { Form } from "@/shadcn/components/ui/form";

type Props = {
  list: List;
  afterSubmit: () => void;
};

export default function ListEditForm({ list, afterSubmit }: Props) {
  const methodsForm = useFormUpdateList(list);

  const mutation = useMutationUpdateList(list.id);
  const onSubmit = (formData: any, e: any) => {
    e.preventDefault();
    mutation.mutateAsync(formData).finally(() => {
      afterSubmit();
    });
  };

  return (
    <Form {...methodsForm}>
      <form onSubmit={methodsForm.handleSubmit(onSubmit)} className="flex h-full flex-col justify-between pb-6 pt-12">
        <div className="grid grid-cols-2 items-center gap-4">
          <TextInput
            name="name"
            control={methodsForm.control}
            label="Nombre"
            required
            description="El nombre de la lista"
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button type="submit" disabled={mutation.status === "pending"}>
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
}
