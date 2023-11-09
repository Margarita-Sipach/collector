import { Module } from "@nestjs/common";
import { ThemesController } from "./themes.controller";
import { ThemesService } from "./themes.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Theme } from "./themes.model";
import { AdminGuard } from "src/guards/admin.guard";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";

@Module({
  controllers: [ThemesController],
  providers: [ThemesService, AdminGuard, UsersService],
  imports: [SequelizeModule.forFeature([Theme, User])],
})
export class ThemesModule {}
