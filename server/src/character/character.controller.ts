import { Body, Get, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";
import { CreateDTO } from "./dto/CreateDTO";
import { CharacterService } from "./character.service";

export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    const character = await this.characterService.create(dto);
    return character;
  }

  @Get()
  async get() {
    const characters = await this.characterService.getAll();
    return characters;
  }
}
