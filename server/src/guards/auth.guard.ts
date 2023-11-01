import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";

export class AuthGuard implements CanActivate {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const id = Number(req.headers.authorization);
      const user = await this.userService.getUserById(id);
      if (!user)
        throw new UnauthorizedException({ message: "User doesn't auth" });
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "User doesn't auth" });
    }
  }
}
