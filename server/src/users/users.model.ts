import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

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

  @Default(Roles.USER)
  @Column({
    type: DataType.ENUM({ values: Object.keys(Roles) }),
    allowNull: false,
  })
  role: Roles;
}
