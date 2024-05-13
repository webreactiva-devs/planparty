import type { CreateDummy, Dummy, UpdateDummy } from "@/domain/dummy/types";

export interface IDummyAdapter {
  apiModelAdapter(data: any): Dummy;
  createAdapter(data: CreateDummy): any;
  updateAdapter(data: UpdateDummy): any;
}

export interface BaseDummyRepository {
  findAll(): Promise<Dummy[]>;
  findOne(id: number): Promise<Dummy | null>;
  create(data: CreateDummy): Promise<void>;
  update(id: number, data: UpdateDummy): Promise<void>;
}
