import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Theme } from "./themes.model";
import { CharacterService } from "src/character/character.service";

@Injectable()
export class ThemesService extends CharacterService {
  constructor(@InjectModel(Theme) private themeRepository: typeof Theme) {
    super(themeRepository);
  }
}
