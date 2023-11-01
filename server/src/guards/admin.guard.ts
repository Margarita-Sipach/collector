import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from "@nestjs/common";
import { Roles } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

export class AdminGuard implements CanActivate {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const id = Number(req.headers.authorization);
      const user = await this.userService.getUserById(id);
      if (user.role !== Roles.ADMIN)
        throw new ForbiddenException({ message: "You aren't admin" });
      return true;
    } catch (e) {
      throw new ForbiddenException({ message: "You aren't admin" });
    }
  }
}
