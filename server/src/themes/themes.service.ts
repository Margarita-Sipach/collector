import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Theme } from "./themes.model";
import { CreateDTO } from "./dto/CreateDTO";

@Injectable()
export class ThemesService {
  constructor(@InjectModel(Theme) private themeRepository: typeof Theme) {}

  async create(dto: CreateDTO) {
    const theme = await this.themeRepository.create(dto);
    return theme;
  }

  async getAll() {
    const themes = await this.themeRepository.findAll();
    return themes;
  }

  async getByTitle(title: string) {
    const theme = await this.themeRepository.findOne({ where: { title } });
    return theme;
  }
}
