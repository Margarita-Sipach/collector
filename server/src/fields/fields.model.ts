import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

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
export class Field extends Model<Field, FieldCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Default(FieldTypes.CHAR)
  @Column({
    type: DataType.ENUM({ values: Object.values(FieldTypes) }),
    allowNull: false,
  })
  type: FieldTypes;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
}
