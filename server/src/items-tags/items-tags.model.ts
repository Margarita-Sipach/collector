import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Item } from "src/items/items.model";
import { Tag } from "src/tags/tags.model";

interface ItemTagCreationAttrs {
  itemId: number;
  tagId: number;
}

@Table({ tableName: "items-tags" })
export class ItemTag extends Model<ItemTag, ItemTagCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => Item)
  @Column
  itemId: number;
}
