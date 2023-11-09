import { Column, DataType } from "sequelize-typescript";
import { Base } from "src/base/character.model";

interface CharacterCreationAttrs {
  title: string;
}

export class Character extends Base<Character, CharacterCreationAttrs> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;
}
