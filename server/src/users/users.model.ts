import { Column, Default, HasMany, Table } from "sequelize-typescript";
import {
  Base,
  requireBoolean,
  requireEnum,
  requireString,
  uniqString,
} from "src/base/base.model";
import { Collection } from "src/collections/collections.model";

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

  @Default(Roles.ADMIN)
  @Column(requireEnum(Roles))
  role: Roles;

  @HasMany(() => Collection)
  collections: Collection[];
}
