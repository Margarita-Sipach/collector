import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Field } from "src/fields/fields.model";
import { Item } from "src/items/items.model";

interface FieldItemCreationAttrs {
  fieldId: number;
  itemId: number;
  value: string;
}

@Table({ tableName: "fields-items" })
export class FieldItem extends Model<FieldItem, FieldItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Item)
  @Column
  itemId: number;

  @ForeignKey(() => Field)
  @Column
  fieldId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  value: Field["type"];
}
