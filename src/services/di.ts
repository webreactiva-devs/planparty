import type { BaseDummyRepository } from "@/domain/dummy/dummy.repository";
import { DummyRepository } from "@/infrastructure/dummy/DummyRepository";
import { serviceLocator } from "@/services/serviceLocator";

export function registerServices() {
  console.log("registerServices");
  serviceLocator.register<BaseDummyRepository>("DummyRepository", new DummyRepository());
}
