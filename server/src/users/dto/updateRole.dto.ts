import { Roles } from "../users.model";

export class UpdateRoleDTO {
  readonly id: number;
  readonly role: Roles;
}
