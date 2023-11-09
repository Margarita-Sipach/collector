import { Column, DataType, Default, Table } from "sequelize-typescript";
import { Base } from "src/base/character.model";

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
  @Column({
    type: DataType.ENUM({ values: Object.values(FieldTypes) }),
    allowNull: false,
  })
  type: FieldTypes;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
}
