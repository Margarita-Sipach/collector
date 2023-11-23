import { Module } from "@nestjs/common";
import { FieldsController } from "./fields.controller";
import { FieldsService } from "./fields.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Field } from "./fields.model";
import { AdminGuard } from "src/guards/admin.guard";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { FieldItem } from "src/fields-items/fields-items.model";

@Module({
  controllers: [FieldsController],
  providers: [FieldsService, AdminGuard, UsersService],
  imports: [SequelizeModule.forFeature([Field, User, FieldItem])],
})
export class FieldsModule {}
