import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
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
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;

  @Default(Roles.ADMIN)
  @Column({
    type: DataType.ENUM({ values: Object.keys(Roles) }),
    allowNull: false,
  })
  role: Roles;

  @HasMany(() => Collection)
  collection: Collection[];
}
