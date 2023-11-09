import { HasMany, Table } from "sequelize-typescript";
import { Character } from "src/character/character.model";
import { Collection } from "src/collections/collections.model";

@Table({ tableName: "themes" })
export class Theme extends Character {
  @HasMany(() => Collection)
  collections: Collection[];
}
