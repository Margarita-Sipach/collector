import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { APIService } from "src/base/api.service";

@Injectable()
export class UsersService {
  api: APIService;
  constructor(@InjectModel(User) private userRepository: typeof User) {
    this.api = new APIService(userRepository);
  }

  async registration(dto: RegistrationDTO) {
    return await this.api.create(dto);
  }

  async login({ email, password }: LoginDTO) {
    return await this.userRepository.findOne({
      where: { email, password },
    });
  }

  async update(updatedFields: Partial<User>) {
    return (await this.api.update(updatedFields))[0];
  }
}
