import { supabase } from "@/api/client";
import type { BaseListRepository } from "@/domain/list/list.repository";
import type { CreateList, List, UpdateList } from "@/domain/list/types";
import { ListAdapter } from "@/infrastructure/list/ListAdapter";

export class ListRepository implements BaseListRepository {
  static readonly endpoint = "lists";
  static adapter: ListAdapter;

  constructor(adapter: ListAdapter = new ListAdapter()) {
    ListRepository.adapter = adapter;
  }

  async findAll(): Promise<List[]> {
    const { data, error } = await supabase.from("list").select();
    if (error) {
      throw new Error(error.message);
    }
    const dummies = data?.map((list) => ListRepository.adapter.apiModelAdapter(list));
    return dummies ?? [];
  }
  async findOne(id: string): Promise<List | null> {
    const { data, error } = await supabase.from("list").select().eq("id", id).limit(1).single();
    if (error) {
      throw new Error(error.message);
    }
    const list = ListRepository.adapter.apiModelAdapter(data);
    return list;
  }

  async create(data: CreateList): Promise<void> {
    const { error } = await supabase.from("list").insert(ListRepository.adapter.createAdapter(data));
    if (error) {
      throw new Error(error.message);
    }
  }
  async update(id: string, data: UpdateList): Promise<void> {
    const { error } = await supabase.from("list").update(ListRepository.adapter.createAdapter(data)).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
  }
}
