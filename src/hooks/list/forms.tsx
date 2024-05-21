import { type UseFormReturn, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { createListSchema, getInitialUpdateList, updateListSchema } from "@/domain/list/schema";
import { CreateList, type List, type UpdateList } from "@/domain/list/types";

export function useFormCreateList(): UseFormReturn<CreateList> {
  return useForm<CreateList>({
    resolver: zodResolver(createListSchema),
    mode: "onChange",
  });
}

export function useFormUpdateList(list: List): UseFormReturn<UpdateList> {
  return useForm<UpdateList>({
    resolver: zodResolver(updateListSchema),
    defaultValues: getInitialUpdateList(list),
    mode: "onChange",
  });
}
