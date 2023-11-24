export class APIService {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async getAll(params) {
    return await this.repository.findAll({
      include: { all: true },
      where: params,
    });
  }

  async getById(id: number) {
    return await this.repository.findByPk(id, {
      include: { all: true },
    });
  }

  async delete(id: number) {
    return await this.repository.destroy({ where: { id } });
  }

  update() {}
}
