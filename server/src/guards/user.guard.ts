import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";

export class UserGuard implements CanActivate {
  constructor(@Inject(UsersService) protected userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = this.getReq(context);
    const headerId = this.getHeaderId(headers);
    const user = await this.getUser(headerId);
    return !!user;
  }

  async getUser(headerId: number) {
    const user = await this.userService.getUserById(headerId);
    if (!user)
      throw new UnauthorizedException({ message: "User doesn't exist" });
    if (!user.isActive)
      throw new UnauthorizedException({ message: "User doesn't active" });
    return user;
  }

  getReq(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return {
      headers: req.headers,
      body: req.body,
    };
  }

  getHeaderId(headers: any) {
    const id = Number(headers.authorization);
    if (!id) throw new UnauthorizedException({ message: "User doesn't auth" });
    return id;
  }

  getBodyId(body: any) {
    return body.id;
  }
}
