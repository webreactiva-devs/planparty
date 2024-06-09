import type { Item } from "@/domain/item/types";

export interface IItemAdapter {
  apiModelAdapter(data: any): Item;
}

export interface BaseItemRepository {
  findAll(): Promise<Item[]>;
  findOne(id: string): Promise<Item | null>;
  findByListId(listId: string): Promise<Item[] | null>;
}
