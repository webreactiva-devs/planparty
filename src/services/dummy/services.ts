import type { BaseDummyRepository } from "@/domain/dummy/dummy.repository";
import { KEY_DUMMY } from "@/domain/dummy/state";
import type { CreateDummy, Dummy, UpdateDummy } from "@/domain/dummy/types";
import { useGetList, useGetOne, useMutationGeneral } from "@/hooks/queries";
import { serviceLocator } from "@/services/serviceLocator";

const dummyRepository = serviceLocator.get<BaseDummyRepository>("DummyRepository");

export function useGetDummies() {
  const key = [KEY_DUMMY];
  return useGetList<Dummy[]>({
    key,
    fn: () => dummyRepository.findAll(),
  });
}
export function useGetDummy(id: Dummy["id"]) {
  const key = [KEY_DUMMY, id];
  return useGetOne<Dummy | null>({
    key,
    fn: () => dummyRepository.findOne(id),
  });
}

export function useMutationCreateDummy() {
  const key = [KEY_DUMMY];
  return useMutationGeneral<CreateDummy>({
    key,
    fn: (data) => dummyRepository.create(data),
    successMessage: "Dummy creado correctamente",
    errorMessage: "No se pudo crear el Dummy",
  });
}

export function useMutationUpdateDummy(id: Dummy["id"]) {
  const key = [KEY_DUMMY];
  return useMutationGeneral<UpdateDummy>({
    key,
    fn: (data) => dummyRepository.update(id, data),
    successMessage: "Dummy editado correctamente",
    errorMessage: "No se pudo editar el Dummy",
  });
}
