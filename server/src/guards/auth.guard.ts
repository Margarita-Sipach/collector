import {
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { UserGuard } from "./user.guard";

export class AuthGuard extends UserGuard {
  constructor(@Inject(UsersService) protected userService: UsersService) {
    super(userService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers, body } = this.getReq(context);
    const headerId = this.getHeaderId(headers);
    const bodyId = this.getBodyId(body);
    if (bodyId) this.isUserSame(headerId, bodyId);
    const user = await this.getUser(headerId);
    return !!user;
  }

  isUserSame(headerId: number, bodyId: number) {
    if (headerId !== bodyId)
      throw new UnauthorizedException({ message: "Diff id" });
  }
}
