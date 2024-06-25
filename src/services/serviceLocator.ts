export class ServiceLocator {
  private services: Record<string, any> = {};

  register<T>(name: string, service: T): void {
    this.services[name] = service;
  }

  get<T>(name: string) {
    const service = this.services[name];
    if (!service) {
      throw new Error(`Service ${name} not found.`);
    }
    return service as T;
  }
}

export const serviceLocator = new ServiceLocator();
