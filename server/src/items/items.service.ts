import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ItemTag } from "src/items-tags/items-tags.model";
import { FieldItem } from "src/fields-items/fields-items.controller";

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    @InjectModel(FieldItem) private fieldItemRepository: typeof FieldItem,
  ) {}
  @InjectModel(ItemTag) private itemTagRepository: typeof ItemTag;

  async create({ fields, ...createArgs }: CreateDTO) {
    // const {id: themeId} = await this.themeService.getByTitle(dto.theme)
    const item = await this.itemRepository.create(createArgs);
    Object.entries(fields).forEach(([fieldId, value]) => {
      this.fieldItemRepository.create({
        fieldId: +fieldId,
        value,
        itemId: item.id,
      });
    });
    // for(let tagId of dto.tagsIds) await this.setTag(item.id, tagId)
    return item;
  }

  async setTag(itemId: number, tagId: number) {
    await this.itemTagRepository.create({ itemId, tagId });
  }
}
