import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, AdminGuard],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
