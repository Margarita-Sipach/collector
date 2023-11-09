import { Column, DataType, Model } from "sequelize-typescript";

interface CharacterCreationAttrs {
  title: string;
}

export class Character extends Model<Character, CharacterCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;
}
