import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from "./admin.guard";

export class CommonGuard implements CanActivate {
  constructor(
    @Inject(AuthGuard) private authGuard: AuthGuard,
    @Inject(AdminGuard) private adminGuard: AdminGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      (await this.authGuard.canActivate(context)) ||
      (await this.adminGuard.canActivate(context))
    );
  }
}
