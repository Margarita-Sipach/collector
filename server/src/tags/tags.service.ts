import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "./tags.model";
import { CharacterService } from "src/character/character.service";
import { ItemTag } from "src/items-tags/items-tags.model";

@Injectable()
export class TagsService extends CharacterService {
  constructor(
    @InjectModel(Tag) private tagRepository: typeof Tag,
    @InjectModel(ItemTag) private itemTagRepository: typeof ItemTag,
  ) {
    super(tagRepository);
  }

  async createItemTags(tagTitles: string[], itemId: number) {
    return await Promise.all(
      tagTitles.map((title) => this.createItemTag(title, itemId)),
    );
  }

  async createItemTag(title: string, itemId: number) {
    const { id: tagId } = (
      await this.tagRepository.findOrCreate({ where: { title } })
    )[0];
    return (
      await this.itemTagRepository.findOrCreate({ where: { tagId, itemId } })
    )[0];
  }

  async deleteItemTag({ id }: ItemTag) {
    await this.itemTagRepository.destroy({ where: { id } });
  }

  async createAndDeleteItemTags(tags: string[], itemId: number) {
    await this.deleteByItemId(itemId);
    await this.createItemTags(tags, itemId);
  }

  async deleteByItemId(itemId: number) {
    await this.itemTagRepository.destroy({ where: { itemId } });
  }
}
