import { BelongsToMany, Table } from "sequelize-typescript";
import { Character } from "src/character/character.model";
import { ItemTag } from "src/items-tags/items-tags.model";
import { Item } from "src/items/items.model";

@Table({ tableName: "tags" })
export class Tag extends Character {
  @BelongsToMany(() => Item, () => ItemTag)
  item: Item[];
}
