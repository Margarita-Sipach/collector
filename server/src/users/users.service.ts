import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async registration(dto: RegistrationDTO) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    return user;
  }

  async getUserById(id: number) {
    const users = await this.userRepository.findByPk(id);
    return users;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
