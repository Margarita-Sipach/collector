import { InjectModel } from "@nestjs/sequelize";
import { CreateDTO } from "./dto/CreateDTO";
import { Character } from "./character.model";
import { APIService } from "src/base/api.service";

export class CharacterService {
  api: APIService;
  constructor(
    @InjectModel(Character) private characterRepository: typeof Character,
  ) {
    this.api = new APIService(characterRepository);
  }

  async create(dto: CreateDTO) {
    return await this.api.create(dto);
  }

  async getAll() {
    return await this.api.getAll();
  }

  async getByTitle(title: string) {
    return await this.api.getByTitle(title);
  }
}
