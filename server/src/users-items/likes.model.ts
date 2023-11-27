import { Column, Default, ForeignKey, Table } from "sequelize-typescript";
import { Base, requireBoolean, requireNumber } from "src/base/base.model";
import { Item } from "src/items/items.model";
import { User } from "src/users/users.model";

interface LikeCreationAttrs {
  userId: number;
  itemId: number;
  like: boolean;
}

@Table({ tableName: "likes" })
export class Like extends Base<Like, LikeCreationAttrs> {
  @ForeignKey(() => User)
  @Column(requireNumber)
  userId: number;

  @ForeignKey(() => Item)
  @Column(requireNumber)
  itemId: number;

  @Default(false)
  @Column(requireBoolean)
  like: boolean;
}
