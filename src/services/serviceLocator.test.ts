import { ServiceLocator } from "@/services/serviceLocator";

describe("ServiceLocator", () => {
  let serviceLocator: ServiceLocator;

  beforeEach(() => {
    serviceLocator = new ServiceLocator();
  });

  test("register method registers a service", () => {
    const service = { test: "test" };
    serviceLocator.register("testService", service);
    expect(serviceLocator.get("testService")).toEqual(service);
  });

  test("get method retrieves a registered service", () => {
    const service = { test: "test" };
    serviceLocator.register("testService", service);
    expect(serviceLocator.get("testService")).toEqual(service);
  });

  test("get method throws an error when service is not found", () => {
    expect(() => serviceLocator.get("nonExistentService")).toThrow(`Service nonExistentService not found.`);
  });
});
