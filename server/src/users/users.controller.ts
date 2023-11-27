import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Error } from "sequelize";
import { AdminGuard } from "src/guards/admin.guard";
import { UpdateStatusDTO } from "./dto/updateStatus.dto";
import { UpdateRoleDTO } from "./dto/updateRole.dto";
import { CommonGuard } from "src/guards/common.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/registration")
  async registration(@Body() dto: RegistrationDTO) {
    try {
      const user = await this.usersService.registration(dto);
      return user;
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === "SequelizeUniqueConstraintError") {
          throw new BadRequestException({ message: "User exist yet" });
        }
      }
    }
  }

  @Post("/login")
  async login(@Body() dto: LoginDTO) {
    const user = await this.usersService.login(dto);
    if (!user)
      throw new UnauthorizedException({ message: "Invalid email or password" });
    if (!user.isActive)
      throw new UnauthorizedException({ message: "User is not active" });
    return user;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const user = await this.usersService.api.getById(id);
    if (!user) throw new UnauthorizedException({ message: "No user" });
    if (!user.isActive)
      throw new UnauthorizedException({ message: "User is not active" });
    return user;
  }

  @UseGuards(CommonGuard)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.api.getAll();
    return users;
  }

  @UseGuards(AdminGuard)
  @Patch("/:id")
  async updateUser(@Body() dto: UpdateStatusDTO | UpdateRoleDTO) {
    const res = await this.usersService.api.update(dto);
    if (!res)
      throw new UnauthorizedException({ message: "User doesn't exist" });
    return await this.usersService.api.getById(dto.id);
  }

  @UseGuards(AdminGuard)
  @Delete("/:id")
  async deleteUser(@Param("id") id: number) {
    await this.usersService.api.delete(id);
    return { status: "success" };
  }
}
