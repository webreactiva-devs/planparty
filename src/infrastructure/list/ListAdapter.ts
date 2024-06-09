import type { Tables, TablesInsert, TablesUpdate } from "@/api/types";
import type { IListAdapter } from "@/domain/list/list.repository";
import type { CreateList, List, UpdateList } from "@/domain/list/types";

export class ListAdapter implements IListAdapter {
  apiModelAdapter(data: Tables<"list">): List {
    return {
      id: data.id,
      name: data.name || "",
      user: data.user || "",
      created_at: new Date(data.created_at),
    };
  }
  createAdapter(data: CreateList): TablesInsert<"list"> {
    return {
      name: data.name,
    };
  }
  updateAdapter(data: UpdateList): TablesUpdate<"list"> {
    return {
      name: data.name,
    };
  }
  editAdapter(data: UpdateList): TablesUpdate<"list"> {
    return {
      name: data.name,
    };
  }
}
