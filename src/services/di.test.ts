import type { Mock } from "vitest";

import { DummyRepository } from "@/infrastructure/dummy/DummyRepository";
import { registerServices } from "@/services/di";
import { serviceLocator } from "@/services/serviceLocator";

vi.mock("@/services/serviceLocator", () => ({
  serviceLocator: {
    register: vi.fn(),
  },
}));

describe("registerServices", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (serviceLocator.register as Mock).mockClear();
  });

  it("should register DummyRepository", () => {
    registerServices();
    expect(serviceLocator.register).toHaveBeenCalledWith("DummyRepository", expect.any(DummyRepository));
  });
});
