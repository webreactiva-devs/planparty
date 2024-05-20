import type { CreateList, List, UpdateList } from "@/domain/list/types";

export interface IListAdapter {
  apiModelAdapter(data: any): List;
  createAdapter(data: CreateList): any;
  updateAdapter(data: UpdateList): any;
}

export interface BaseListRepository {
  findAll(): Promise<List[]>;
  findOne(id: string): Promise<List | null>;
  create(data: CreateList): Promise<void>;
  update(id: string, data: UpdateList): Promise<void>;
}
