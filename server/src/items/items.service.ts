import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ItemTag } from "src/items-tags/items-tags.model";
import { FieldItem } from "src/fields-items/fields-items.model";
import { Tag } from "src/tags/tags.model";

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    @InjectModel(FieldItem) private fieldItemRepository: typeof FieldItem,
    @InjectModel(ItemTag) private itemTagRepository: typeof ItemTag,
    @InjectModel(Tag) private tagRepository: typeof Tag,
  ) {}

  async create({ fields, tags, ...createArgs }: CreateDTO) {
    const item = await this.itemRepository.create(createArgs);
    fields.forEach(([fieldId, value]) => {
      this.fieldItemRepository.create({
        fieldId: +fieldId,
        value,
        itemId: item.id,
      });
    });
    for (const tag of tags) await this.setTag(item.id, tag);
    return await this.itemRepository.findByPk(item.id, {
      include: { all: true },
    });
  }

  async setTag(itemId: number, title: string) {
    const tag = await this.tagRepository.findOne({ where: { title } });
    const { id: tagId } = tag.id
      ? tag
      : await this.tagRepository.create({ title });
    this.itemTagRepository.create({ itemId, tagId });
  }

  async getById(id: number) {
    return await this.itemRepository.findByPk(id, { include: { all: true } });
  }
}
