import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Field } from "./fields.model";
import { CreateDTO } from "./dto/CreateDTO";
import { FieldItem } from "src/fields-items/fields-items.model";

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field) private fieldRepository: typeof Field,
    @InjectModel(FieldItem) private fieldItemRepository: typeof FieldItem,
  ) {}

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

  async updateCollectionFields(fields) {
    await Promise.all(
      fields.map((field) =>
        this.fieldRepository.update(field, { where: { id: field.id } }),
      ),
    );
  }

  async createCollectionFields(fields: any, collectionId: number) {
    if (fields)
      await Promise.all(
        fields.map(({id, field}) =>
          this.create({
            ...field,
            collectionId,
          }),
        ),
      );
  }

  async createAndDeleteItemFields(fields, itemId) {
    await this.deleteByItemId(itemId);
    await this.createItemFields(fields, itemId);
  }

  async deleteByItemId(itemId: number) {
    await this.fieldItemRepository.destroy({ where: { itemId } });
  }

  async createItemFields(fields, id) {
    return await Promise.all(
      fields.map((field) => this.createItemField(field, id)),
    );
  }

  async createItemField([fieldId, value], itemId) {
    const [newField, _] = await this.fieldItemRepository.findOrCreate({
      where: { fieldId, itemId },
    });

    await this.fieldItemRepository.update(
      { ...newField, value },
      {
        where: { id: newField.id },
      },
    );
    return newField;
  }

  async deleteItemFields(oldFields: FieldItem[], newFields: FieldItem[]) {
    const isNewTag = (oldFields: { fieldId: number }) =>
      newFields.find(({ fieldId }) => oldFields.fieldId === fieldId);
    Promise.all(
      oldFields.reduce(
        (acc, field) =>
          isNewTag(field) ? acc : [...acc, this.deleteItemField(field)],
        [],
      ),
    );
  }

  async deleteItemField({ id }: FieldItem) {
    await this.fieldItemRepository.destroy({ where: { id } });
  }
}
