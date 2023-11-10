import { Controller } from "@nestjs/common";
import { ThemesService } from "./themes.service";
import { CharacterController } from "src/character/character.controller";

@Controller("themes")
export class ThemesController extends CharacterController {
  constructor(private themesService: ThemesService) {
    super(themesService);
  }
}
