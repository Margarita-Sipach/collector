import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ItemTag } from "src/items-tags/items-tags.model";
import { FieldItem } from "src/fields-items/fields-items.model";
import { Tag } from "src/tags/tags.model";
import { APIService } from "src/base/api.service";
import { UpdateDTO } from "./dto/UpdateDTO";

@Injectable()
export class ItemsService {
  api: APIService;
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    @InjectModel(FieldItem) private fieldItemRepository: typeof FieldItem,
    @InjectModel(ItemTag) private itemTagRepository: typeof ItemTag,
    @InjectModel(Tag) private tagRepository: typeof Tag,
  ) {
    this.api = new APIService(itemRepository);
  }

  async create({ fields, tags, ...createArgs }: CreateDTO) {
    const item = await this.itemRepository.create(createArgs);
    await this.createFieldItems(fields, item.id);
    await Promise.all(tags.map((tag) => this.setTag(item.id, tag)));
    return await this.getById(item.id);
  }

  async update({ fields, tags, id, collectionId, ...updateArgs }: UpdateDTO) {
    await this.itemRepository.update(updateArgs, { where: { id } });
    await this.fieldItemRepository.destroy({ where: { itemId: id } });
    await this.createFieldItems(fields, id);
    await Promise.all(tags.map((tag) => this.setTag(id, tag)));
    return await this.getById(id);
  }

  async createFieldItems(fields, id) {
    return await Promise.all(
      fields.map(([fieldId, value]) =>
        this.fieldItemRepository.create({
          fieldId: fieldId,
          value,
          itemId: id,
        }),
      ),
    );
  }

  async setTag(itemId: number, title: string) {
    const tag = await this.tagRepository.findOne({ where: { title } });
    const { id: tagId } = tag || (await this.tagRepository.create({ title }));
    await this.itemTagRepository.create({ itemId, tagId });
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
