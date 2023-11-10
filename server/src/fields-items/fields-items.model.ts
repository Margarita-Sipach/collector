import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Base } from "src/base/character.model";
import { Field } from "src/fields/fields.model";
import { Item } from "src/items/items.model";

interface FieldItemCreationAttrs {
  fieldId: number;
  itemId: number;
  value: string;
}

@Table({ tableName: "fields-items" })
export class FieldItem extends Base<FieldItem, FieldItemCreationAttrs> {
  @ForeignKey(() => Item)
  @Column
  itemId: number;

  @ForeignKey(() => Field)
  @Column
  fieldId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  value: Field["type"];
}
