import {
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Base, requireEnum, requireString } from "src/base/character.model";
import { Collection } from "src/collections/collections.model";
import { FieldItem } from "src/fields-items/fields-items.model";
import { Item } from "src/items/items.model";

export enum FieldTypes {
  INTEGER = "integer",
  CHAR = "char",
  TEXT = "text",
  BOOLEAN = "boolean",
  DATE = "date",
}

interface FieldCreationAttrs {
  title: string;
}

@Table({ tableName: "fields" })
export class Field extends Base<Field, FieldCreationAttrs> {
  @Default(FieldTypes.CHAR)
  @Column(requireEnum(FieldTypes))
  type: FieldTypes;

  @Column(requireString)
  title: string;

  @ForeignKey(() => Collection)
  @Column({ field: "collectionId" })
  collectionId: number;
  @BelongsTo(() => Collection)
  collection: Collection;

  @BelongsToMany(() => Item, () => FieldItem)
  item: Item[];
}
