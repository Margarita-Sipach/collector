export class APIService {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async getAll(params = {}) {
    const { limit, order, ...where } = params as any;

    return await this.repository.findAll({
      include: { all: true },
      ...{
        limit,
        order: [order?.split?.(".") || ["updatedAt", "DESC"]],
        where,
      },
    });
  }

  async getById(id: number) {
    return await this.repository.findByPk(id, {
      include: { all: true },
    });
  }

  async create(dto: any) {
    return await this.repository.create(dto);
  }

  async delete(id: number) {
    return await this.repository.destroy({ where: { id } });
  }

  async update({ id, ...dto }: any) {
    return await this.repository.update(dto, { where: { id } });
  }

  async getByTitle(title: string) {
    return await this.repository.findOne({ where: { title } });
  }

  async deleteByItemId(itemId: number) {
    return await this.repository.destroy({ where: { itemId } });
  }

  async deleteByCollectionId(collectionId: number) {
    return await this.repository.destroy({ where: { collectionId } });
  }
}
