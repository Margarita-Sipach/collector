import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Collection } from "src/collections/collections.model";
import { ItemTag } from "src/items-tags/items-tags.model";
import { Tag } from "src/tags/tags.model";

interface ItemCreationAttrs {
  title: string;
  collectionId: number;
  img?: string;
}

@Table({ tableName: "items" })
export class Item extends Model<Item, ItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  img: string;

  @ForeignKey(() => Collection)
  @Column({ field: "collectionId" })
  collectionId: number;

  @BelongsTo(() => Collection)
  collection: Collection;

  @BelongsToMany(() => Tag, () => ItemTag)
  item: Tag[];
}
