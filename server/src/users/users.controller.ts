import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegistrationDTO } from "./dto/registration.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async registration(@Body() dto: RegistrationDTO) {
    const user = await this.usersService.registration(dto);
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }
}
