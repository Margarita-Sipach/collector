import { Module } from "@nestjs/common";
import { ThemesController } from "./themes.controller";
import { ThemesService } from "./themes.service";
import { Theme } from "./themes.model";
import { getCharacterModuleObj } from "src/character/character.module";

@Module(getCharacterModuleObj(ThemesController, ThemesService, Theme))
export class ThemesModule {}
