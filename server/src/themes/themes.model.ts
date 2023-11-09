import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Collection } from "src/collections/collections.model";

interface ThemeCreationAttrs {
  title: string;
}

@Table({ tableName: "themes" })
export class Theme extends Model<Theme, ThemeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @HasMany(() => Collection)
  collection: Collection[];
}
