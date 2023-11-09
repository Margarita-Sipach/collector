import { Column, DataType, Model } from "sequelize-typescript";

export class Base<Base, BaseCreationAttrs> extends Model<
  Base,
  BaseCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
}
