import type { BaseListRepository } from "@/domain/list/list.repository";
import { KEY_LIST } from "@/domain/list/state";
import type { CreateList, List, UpdateList } from "@/domain/list/types";
import { useGetList, useGetOne, useMutationGeneral } from "@/hooks/queries";
import { serviceLocator } from "@/services/serviceLocator";

const listRepository = serviceLocator.get<BaseListRepository>("ListRepository");

export function useGetLists() {
  const key = [KEY_LIST];
  return useGetList<List[]>({
    key,
    fn: () => listRepository.findAll(),
  });
}
export function useEstasListas(id: List["id"]) {
  const key = [KEY_LIST, id];
  return useGetOne<List | null>({
    key,
    fn: () => listRepository.findOne(id),
  });
}

export function useMutationCreateList() {
  const key = [KEY_LIST];
  return useMutationGeneral<CreateList>({
    key,
    fn: (data) => listRepository.create(data),
    successMessage: "List creado correctamente",
    errorMessage: "No se pudo crear el List",
  });
}

export function useMutationUpdateList(id: List["id"]) {
  const key = [KEY_LIST];
  return useMutationGeneral<UpdateList>({
    key,
    fn: (data) => listRepository.update(id, data),
    successMessage: "List editado correctamente",
    errorMessage: "No se pudo editar el List",
  });
}
