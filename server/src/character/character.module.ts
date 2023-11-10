import { SequelizeModule } from "@nestjs/sequelize";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

export const getCharacterModuleObj = (
  CharacterController: any,
  CharacterService: any,
  Character: any,
) => ({
  controllers: [CharacterController],
  providers: [CharacterService, AuthGuard, AdminGuard, UsersService],
  imports: [SequelizeModule.forFeature([Character, User])],
});
