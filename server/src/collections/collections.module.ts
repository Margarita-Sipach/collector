import { Module } from "@nestjs/common";
import { CollectionsController } from "./collections.controller";
import { CollectionsService } from "./collections.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Collection } from "./collections.model";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { ThemesService } from "src/themes/themes.service";
import { Theme } from "src/themes/themes.model";
import { FieldsService } from "src/fields/fields.service";
import { Field } from "src/fields/fields.model";

@Module({
  controllers: [CollectionsController],
  providers: [
    CollectionsService,
    ThemesService,
    AuthGuard,
    AdminGuard,
    UsersService,
    FieldsService,
  ],
  imports: [SequelizeModule.forFeature([Collection, Theme, User, Field])],
})
export class CollectionsModule {}
