import type { Tables } from "@/api/types";
import type { IItemAdapter } from "@/domain/item/item.repository";
import type { Item } from "@/domain/item/types";

export class ItemAdapter implements IItemAdapter {
  apiModelAdapter(data: Tables<"item">): Item {
    return {
      id: data.id,
      list_id: data.list_id,
      name: data.name ?? "",
      quantity: data.quantity ?? 0,
      user: data.user ?? "",
      status: data.status ?? true,
      created_at: new Date(data.created_at),
      updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
    };
  }
}
