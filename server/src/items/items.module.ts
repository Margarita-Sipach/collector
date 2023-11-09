import { Module } from "@nestjs/common";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { Tag } from "src/tags/tags.model";
import { ItemTag } from "src/items-tags/items-tags.model";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { AdminGuard } from "src/guards/admin.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { FieldItem } from "src/fields-items/fields-items.controller";

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, UsersService, AdminGuard, AuthGuard],
  imports: [SequelizeModule.forFeature([Item, Tag, ItemTag, User, FieldItem])],
})
export class ItemsModule {}
