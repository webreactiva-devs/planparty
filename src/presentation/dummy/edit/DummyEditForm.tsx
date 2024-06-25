import type { Dummy } from "@/domain/dummy/types";
import { useFormUpdateDummy } from "@/hooks/dummy/forms";
import TextInput from "@/presentation/shared/form/text-input";
import { useMutationUpdateDummy } from "@/services/dummy/services";
import { Button } from "@/shadcn/components/ui/button";
import { Form } from "@/shadcn/components/ui/form";

type Props = {
  dummy: Dummy;
  afterSubmit: () => void;
};

export default function DummyEditForm({ dummy, afterSubmit }: Props) {
  const methodsForm = useFormUpdateDummy(dummy);

  const mutation = useMutationUpdateDummy(dummy.id);
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
            description="El nombre del dummy"
          />
          <TextInput
            name="description"
            control={methodsForm.control}
            label="Descripción"
            description="La descripción del dummy"
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button type="submit" disabled={mutation.status === "pending"}>
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
