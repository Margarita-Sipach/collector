import { SequelizeModule } from "@nestjs/sequelize";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

export const getCharacterModuleObj = (
  CharacterControllers: any[],
  CharacterServices: any[],
  Characters: any[],
) => ({
  controllers: [...CharacterControllers],
  providers: [...CharacterServices, AuthGuard, AdminGuard, UsersService],
  imports: [SequelizeModule.forFeature([...Characters, User])],
});
