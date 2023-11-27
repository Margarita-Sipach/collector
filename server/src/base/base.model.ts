import { Column, DataType, Model } from "sequelize-typescript";

export const requireString = { type: DataType.STRING, allowNull: false };
export const requireNumber = { type: DataType.NUMBER, allowNull: false };
export const requireBoolean = { type: DataType.BOOLEAN, allowNull: false };
export const requireEnum = (en: object) => ({
  type: DataType.ENUM({ values: Object.values(en) }),
  allowNull: false,
});

export const uniqString = { ...requireString, unique: true };

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
