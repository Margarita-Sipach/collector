import { InjectModel } from "@nestjs/sequelize";
import { CreateDTO } from "./dto/CreateDTO";
import { Character } from "./character.model";

export class CharacterService {
  constructor(
    @InjectModel(Character) private characterRepository: typeof Character,
  ) {}

  async create(dto: CreateDTO) {
    const character = await this.characterRepository.create(dto);
    return character;
  }

  async getAll() {
    const characters = await this.characterRepository.findAll();
    return characters;
  }

  async getByTitle(title: string) {
    const characters = await this.characterRepository.findOne({
      where: { title },
    });
    return characters;
  }
}
