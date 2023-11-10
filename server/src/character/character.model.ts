import { Column } from "sequelize-typescript";
import { Base, uniqString } from "src/base/character.model";

interface CharacterCreationAttrs {
  title: string;
}

export class Character extends Base<Character, CharacterCreationAttrs> {
  @Column(uniqString)
  title: string;
}
