import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Field } from "./fields.model";
import { FieldItem } from "src/fields-items/fields-items.model";
import { APIService } from "src/base/api.service";

@Injectable()
export class FieldsService {
  fieldApi: APIService;
  fieldItemApi: APIService;
  constructor(
    @InjectModel(Field) private fieldRepository: typeof Field,
    @InjectModel(FieldItem) private fieldItemRepository: typeof FieldItem,
  ) {
    this.fieldApi = new APIService(fieldRepository);
    this.fieldItemApi = new APIService(fieldItemRepository);
  }

  async updateCollectionFields(fields, collectionId: number) {
    await Promise.all(
      fields.map(({ id, ...field }) => {
        if (id) {
          if (Object.keys(field).length) {
            return this.fieldApi.update({ id, ...field, collectionId });
          }
          return this.fieldApi.delete(id);
        }
        return this.fieldApi.create({ ...field, collectionId });
      }),
    );
  }

  async createItemFields(fields, itemId) {
    return await Promise.all(
      fields.map((field) => this.createItemField(field, itemId)),
    );
  }

  async createItemField([fieldId, value], itemId: number) {
    await this.fieldItemRepository.create({ fieldId, itemId, value });
  }

  async updateItemFields(fields, itemId) {
    return await Promise.all(
      fields.map((field) => this.updateItemField(field, itemId)),
    );
  }

  async updateItemField([fieldId, value], itemId: number) {
    await this.fieldItemRepository.update(
      { value },
      { where: { fieldId, itemId } },
    );
  }
}
