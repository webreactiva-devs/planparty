import { useNavigate } from "react-router-dom";

import type { List } from "@/domain/list/types";
import { useMutationDeleteList } from "@/services/list/services";
import { Button } from "@/shadcn/components/ui/button";

type Props = {
  list: List;
  afterSubmit: () => void;
};

export default function ListDeleteForm({ list, afterSubmit }: Props) {
  const navigate = useNavigate();
  const mutation = useMutationDeleteList(list.id);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutateAsync().finally(() => {
      afterSubmit();
      navigate("/lists");
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col justify-between pb-6 pt-12">
      <p>Are you sure you want to delete the list named {list.name}?</p>
      <div className="flex flex-row justify-end">
        <Button type="submit" disabled={mutation.status === "pending"}>
          Delete
        </Button>
      </div>
    </form>
  );
}
