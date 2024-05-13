import { type UseFormReturn, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { createDummySchema, getInitialUpdateDummy, updateDummySchema } from "@/domain/dummy/schema";
import { CreateDummy, type Dummy, type UpdateDummy } from "@/domain/dummy/types";

export function useFormCreateDummy(): UseFormReturn<CreateDummy> {
  return useForm<CreateDummy>({
    resolver: zodResolver(createDummySchema),
    mode: "onChange",
  });
}

export function useFormUpdateDummy(dummy: Dummy): UseFormReturn<UpdateDummy> {
  return useForm<UpdateDummy>({
    resolver: zodResolver(updateDummySchema),
    defaultValues: getInitialUpdateDummy(dummy),
    mode: "onChange",
  });
}
