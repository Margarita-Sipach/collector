import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ItemTag } from "src/items-tags/items-tags.model";
import { Item } from "src/items/items.model";

interface TagCreationAttrs {
  title: string;
}

@Table({ tableName: "tags" })
export class Tag extends Model<Tag, TagCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @BelongsToMany(() => Item, () => ItemTag)
  item: Item[];
}
