import type { BaseItemRepository } from "@/domain/item/item.repository";
import { KEY_ITEM } from "@/domain/item/state";
import type { Item } from "@/domain/item/types";
import { useGetList, useGetOne } from "@/hooks/queries";
import { serviceLocator } from "@/services/serviceLocator";

const itemRepository = serviceLocator.get<BaseItemRepository>("ItemRepository");

export function useGetItems(listId?: string) {
  const key = [KEY_ITEM, listId];
  return useGetList<Item[]>({
    key,
    fn: () => (listId ? itemRepository.findByListId(listId) : itemRepository.findAll()),
  });
}
export function useGetOneItem(id: Item["id"]) {
  const key = [KEY_ITEM, id];
  return useGetOne<Item | null>({
    key,
    fn: () => itemRepository.findOne(id),
  });
}
