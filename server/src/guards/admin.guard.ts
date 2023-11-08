import {
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

export class AdminGuard extends AuthGuard {
  constructor(@Inject(UsersService) protected userService: UsersService) {
    super(userService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = this.getReq(context);
    const headerId = this.getHeaderId(headers);
    const user = await this.getUser(headerId);
    if (user.role !== Roles.ADMIN)
      throw new UnauthorizedException({ message: "No admin" });
    return !!user;
  }
}
