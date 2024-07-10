import type { BaseDummyRepository } from "@/domain/dummy/dummy.repository";
import { BaseItemRepository } from "@/domain/item/item.repository";
import { BaseListRepository } from "@/domain/list/list.repository";
import { DummyRepository } from "@/infrastructure/dummy/DummyRepository";
import { ItemRepository } from "@/infrastructure/item/ItemRepository";
import { ListRepository } from "@/infrastructure/list/ListRepository";
import { serviceLocator } from "@/services/serviceLocator";

export function registerServices() {
  serviceLocator.register<BaseDummyRepository>("DummyRepository", new DummyRepository());
  serviceLocator.register<BaseListRepository>("ListRepository", new ListRepository());
  serviceLocator.register<BaseItemRepository>("ItemRepository", new ItemRepository());
}
