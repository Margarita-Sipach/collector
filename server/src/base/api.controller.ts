export class APIController {
  service: any;
  constructor(service: any) {
    this.service = service;
  }

  async getAll(query) {
    const elements = await this.service.getAll(query);
    return elements;
  }

  async getById(id: number) {
    const element = await this.service.getById(id);
    return element;
  }

  async delete(id: number) {
    await this.service.delete(id);
    return { status: "success" };
  }

  async update(dto) {
    const element = await this.service.update(dto);
    return element;
  }

  async create(dto) {
    const element = await this.service.create(dto);
    return element;
  }
}
