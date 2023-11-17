import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Field } from "./fields.model";
import { CreateDTO } from "./dto/CreateDTO";

@Injectable()
export class FieldsService {
  constructor(@InjectModel(Field) private fieldRepository: typeof Field) {}

  async create(dto: CreateDTO) {
    const field = await this.fieldRepository.create(dto);
    return field;
  }

  async getAll() {
    const fields = await this.fieldRepository.findAll();
    return fields;
  }

  async getByTitle(title: string) {
    const field = await this.fieldRepository.findOne({ where: { title } });
    return field;
  }

  async deleteByCollectionId(collectionId: number) {
    const field = await this.fieldRepository.destroy({
      where: { collectionId },
    });
    return field;
  }
}
