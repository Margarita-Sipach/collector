import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tag } from "./tags.model";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

@Module({
  controllers: [TagsController],
  providers: [TagsService, AuthGuard, AdminGuard, UsersService],
  imports: [SequelizeModule.forFeature([Tag, User])],
})
export class TagsModule {}
