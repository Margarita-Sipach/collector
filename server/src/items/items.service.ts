import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateDTO } from "./dto/CreateDTO";
import { FieldItem } from "src/fields-items/fields-items.model";
import { APIService } from "src/base/api.service";
import { UpdateDTO } from "./dto/UpdateDTO";
import { TagsService } from "src/tags/tags.service";
import { FieldsService } from "src/fields/fields.service";

@Injectable()
export class ItemsService {
  api: APIService;
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    private tagService: TagsService,
    private fieldService: FieldsService,
  ) {
    this.api = new APIService(itemRepository);
  }

  async create({ fields, tags, ...createArgs }: CreateDTO) {
    const item = await this.itemRepository.create(createArgs);
    await this.fieldService.createItemFields(fields, item.id);
    await this.tagService.createItemTags(tags, item.id);
    return await this.getById(item.id);
  }

  async update({
    fields: fieldsArgs,
    tags: tagsArgs,
    id,
    collectionId,
    ...updateArgs
  }: UpdateDTO) {
    await this.tagService.createAndDeleteItemTags(tagsArgs, id);
    await this.fieldService.createAndDeleteItemFields(fieldsArgs, id);
    const item = await this.itemRepository.findByPk(id);
    await this.itemRepository.update(
      { ...item, ...updateArgs },
      { where: { id } },
    );
    return await this.getById(id);
  }

  async getAll(params) {
    return await this.api.getAll(params);
  }

  async getById(id: number) {
    return await this.api.getById(id);
  }

  async delete(id: number) {
    return await this.api.delete(id);
  }
}
