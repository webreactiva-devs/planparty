import type { Tables, TablesInsert, TablesUpdate } from "@/api/types";
import type { IDummyAdapter } from "@/domain/dummy/dummy.repository";
import type { CreateDummy, Dummy, UpdateDummy } from "@/domain/dummy/types";

export class DummyAdapter implements IDummyAdapter {
  apiModelAdapter(data: Tables<"dummy">): Dummy {
    return {
      id: Number(data.id),
      name: data.name,
      createdAt: new Date(data.created_at),
      description: data.description ?? null,
    };
  }
  createAdapter(data: CreateDummy): TablesInsert<"dummy"> {
    return {
      name: data.name,
      description: data?.description,
    };
  }
  updateAdapter(data: UpdateDummy): TablesUpdate<"dummy"> {
    return {
      name: data.name,
      description: data?.description,
    };
  }
}
