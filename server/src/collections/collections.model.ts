import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from "sequelize-typescript";
import { Base, requireString } from "src/base/base.model";
import { Field } from "src/fields/fields.model";
import { Item } from "src/items/items.model";
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
  @Column(requireString)
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
  @Column({ field: "userId" })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Field)
  fields: Field[];

  @HasMany(() => Item)
  items: Item[];
}
