import type { BaseDummyRepository } from "@/domain/dummy/dummy.repository";
import { BaseListRepository } from "@/domain/list/list.repository";
import { DummyRepository } from "@/infrastructure/dummy/DummyRepository";
import { ListRepository } from "@/infrastructure/list/ListRepository";
import { serviceLocator } from "@/services/serviceLocator";

export function registerServices() {
  serviceLocator.register<BaseDummyRepository>("DummyRepository", new DummyRepository());
  serviceLocator.register<BaseListRepository>("ListRepository", new ListRepository());
}
