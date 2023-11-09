import { Column, Default, Table } from "sequelize-typescript";
import { Base, requireEnum, requireString } from "src/base/character.model";

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
}
