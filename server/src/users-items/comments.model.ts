import { Column, ForeignKey, Table } from "sequelize-typescript";
import { Base, requireNumber, requireString } from "src/base/base.model";
import { Item } from "src/items/items.model";
import { User } from "src/users/users.model";

interface CommentCreationAttrs {
  userId: number;
  itemId: number;
  comment: string;
}

@Table({ tableName: "comments" })
export class Comment extends Base<Comment, CommentCreationAttrs> {
  @ForeignKey(() => User)
  @Column(requireNumber)
  userId: number;

  @ForeignKey(() => Item)
  @Column(requireNumber)
  itemId: number;

  @Column(requireString)
  comment: string;
}
