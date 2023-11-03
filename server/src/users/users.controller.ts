import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Error } from "sequelize";
import { AdminGuard } from "src/guards/admin.guard";

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
    return user;
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new UnauthorizedException({ message: "No user" });
    return user;
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }
}
