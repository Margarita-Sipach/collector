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
    await Promise.all(
      fields.map(([fieldId, value]) =>
        this.fieldItemRepository.create({
          fieldId: +fieldId,
          value,
          itemId: item.id,
        }),
      ),
    );
    await Promise.all(tags.map((tag) => this.setTag(item.id, tag)));
    return await this.getById(item.id);
  }

  async setTag(itemId: number, title: string) {
    const tag = await this.tagRepository.findOne({ where: { title } });
    const { id: tagId } = tag || (await this.tagRepository.create({ title }));
    await this.itemTagRepository.create({ itemId, tagId });
  }

  async getById(id: number) {
    return await this.itemRepository.findByPk(id, { include: { all: true } });
  }
}
