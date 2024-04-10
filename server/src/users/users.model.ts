import {
  BelongsToMany,
  Column,
  Default,
  HasMany,
  Table,
} from "sequelize-typescript";
import {
  Base,
  requireBoolean,
  requireEnum,
  requireString,
  uniqString,
} from "src/base/base.model";
import { Collection } from "src/collections/collections.model";
import { Item } from "src/items/items.model";
import { Comment } from "src/users-items/comments.model";
import { Like } from "src/users-items/likes.model";

interface UserCreationAttrs {
  username: string;
  email: string;
  password: string;
}

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Table({ tableName: "users" })
export class User extends Base<User, UserCreationAttrs> {
  @Column(requireString)
  username: string;

  @Column(uniqString)
  email: string;

  @Column(requireString)
  password: string;

  @Default(true)
  @Column(requireBoolean)
  isActive: boolean;

  @Default(Roles.USER)
  @Column(requireEnum(Roles))
  role: Roles;

  @HasMany(() => Collection)
  collections: Collection[];

  @BelongsToMany(() => Item, () => Comment)
  commentedItems: Item[];

  @BelongsToMany(() => Item, () => Like)
  likedItems: Item[];
}
