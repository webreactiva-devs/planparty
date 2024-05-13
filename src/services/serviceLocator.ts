class ServiceLocator {
  private services: Record<string, any> = {};

  register<T>(name: string, service: T): void {
    console.log("register", name);
    this.services[name] = service;
  }

  get<T>(name: string) {
    console.log(this.services);
    const service = this.services[name];
    if (!service) {
      throw new Error(`Service ${name} not found.`);
    }
    return service as T;
  }
}

export const serviceLocator = new ServiceLocator();
