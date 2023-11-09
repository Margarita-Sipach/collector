import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Base } from "src/base/character.model";
import { Collection } from "src/collections/collections.model";
import { ItemTag } from "src/items-tags/items-tags.model";
import { Tag } from "src/tags/tags.model";

interface ItemCreationAttrs {
  title: string;
  collectionId: number;
  img?: string;
}

@Table({ tableName: "items" })
export class Item extends Base<Item, ItemCreationAttrs> {
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
