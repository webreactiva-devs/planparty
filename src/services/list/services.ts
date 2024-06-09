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
export function useGetOneList(id: List["id"]) {
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
    successMessage: "Lista creada correctamente",
    errorMessage: "No se pudo crear la lista",
  });
}

export function useMutationUpdateList(id: List["id"]) {
  const key = [KEY_LIST];
  return useMutationGeneral<UpdateList>({
    key,
    fn: (data) => listRepository.update(id, data),
    successMessage: "Lista editada correctamente",
    errorMessage: "No se pudo editar el lista",
  });
}

export function useMutationDeleteList(id: List["id"]) {
  const key = [KEY_LIST];
  return useMutationGeneral<void>({
    key,
    fn: () => listRepository.delete(id),
    successMessage: "Lista eliminada correctamente",
    errorMessage: "No se pudo eliminar la lista",
  });
}
