import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Base } from "src/base/character.model";
import { Theme } from "src/themes/themes.model";
import { User } from "src/users/users.model";

interface CollectionCreationAttrs {
  title: string;
  img?: string;
  description?: string;
  themeId: number;
  userId: number;
}

@Table({ tableName: "collections" })
export class Collection extends Base<Collection, CollectionCreationAttrs> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  img: string;

  @Column({ type: DataType.STRING })
  description: string;

  @ForeignKey(() => Theme)
  @Column({ field: "themeId" })
  themeId: number;

  @BelongsTo(() => Theme)
  theme: Theme;

  @ForeignKey(() => User)
  @Column({
    field: "userId",
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  //   @HasMany(() => Item)
  //   item: Item[]
}
