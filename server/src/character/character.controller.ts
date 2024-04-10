import { Body, Get, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";
import { CreateDTO } from "./dto/CreateDTO";
import { CharacterService } from "./character.service";

export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    return await this.characterService.create(dto);
  }

  @Get()
  async get() {
    return await this.characterService.getAll();
  }
}
