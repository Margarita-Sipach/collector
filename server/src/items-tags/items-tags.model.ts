import { Column, ForeignKey, Table } from "sequelize-typescript";
import { Base } from "src/base/base.model";
import { Item } from "src/items/items.model";
import { Tag } from "src/tags/tags.model";

interface ItemTagCreationAttrs {
  itemId: number;
  tagId: number;
}

@Table({ tableName: "items-tags" })
export class ItemTag extends Base<ItemTag, ItemTagCreationAttrs> {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => Item)
  @Column
  itemId: number;
}
