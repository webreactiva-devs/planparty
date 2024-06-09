import { supabase } from "@/api/client";
import type { BaseItemRepository } from "@/domain/item/item.repository";
import type { CreateItem, Item, UpdateItem } from "@/domain/item/types";
import { ItemAdapter } from "@/infrastructure/item/ItemAdapter";

export class ItemRepository implements BaseItemRepository {
  static readonly endpoint = "items";
  static adapter: ItemAdapter;

  constructor(adapter: ItemAdapter = new ItemAdapter()) {
    ItemRepository.adapter = adapter;
  }

  async findAll(): Promise<Item[]> {
    const { data, error } = await supabase.from("item").select();
    if (error) {
      throw new Error(error.message);
    }
    const items = data?.map((item: unknown) => ItemRepository.adapter.apiModelAdapter(item));
    return items ?? [];
  }
  async findOne(id: string): Promise<Item | null> {
    const { data, error } = await supabase.from("item").select().eq("id", id).limit(1).single();
    if (error) {
      throw new Error(error.message);
    }
    const item = ItemRepository.adapter.apiModelAdapter(data);
    return item;
  }
  async findByListId(listId: string): Promise<Item[] | null> {
    const { data, error } = await supabase.from("item").select().eq("list_id", listId);
    if (error) {
      throw new Error(error.message);
    }
    const items = data.map(ItemRepository.adapter.apiModelAdapter);
    return items;
  }
}
