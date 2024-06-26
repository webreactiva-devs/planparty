import { supabase } from "@/api/client";
import type { BaseDummyRepository } from "@/domain/dummy/dummy.repository";
import type { CreateDummy, Dummy, UpdateDummy } from "@/domain/dummy/types";
import { DummyAdapter } from "@/infrastructure/dummy/DummyAdapter";

export class DummyRepository implements BaseDummyRepository {
  static readonly endpoint = "dummys";
  static adapter: DummyAdapter;

  constructor(adapter: DummyAdapter = new DummyAdapter()) {
    DummyRepository.adapter = adapter;
  }

  async findAll(): Promise<Dummy[]> {
    const { data, error } = await supabase.from("dummy").select();
    if (error) {
      throw new Error(error.message);
    }
    // @ts-ignore
    const dummies = data?.map((dummy) => DummyRepository.adapter.apiModelAdapter(dummy));
    return dummies ?? [];
  }
  async findOne(id: number): Promise<Dummy | null> {
    const { data, error } = await supabase.from("dummy").select().eq("id", id).limit(1).single();
    if (error) {
      throw new Error(error.message);
    }
    const dummy = DummyRepository.adapter.apiModelAdapter(data);
    return dummy;
  }

  async create(data: CreateDummy): Promise<void> {
    const { error } = await supabase.from("dummy").insert(DummyRepository.adapter.createAdapter(data));
    if (error) {
      throw new Error(error.message);
    }
  }
  async update(id: number, data: UpdateDummy): Promise<void> {
    const { error } = await supabase.from("dummy").update(DummyRepository.adapter.createAdapter(data)).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
  }
}
