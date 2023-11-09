import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ThemesService } from "./themes.service";
import { AdminGuard } from "src/guards/admin.guard";
import { CreateDTO } from "./dto/CreateDTO";

@Controller("themes")
export class ThemesController {
  constructor(private themesService: ThemesService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    const collection = await this.themesService.create(dto);
    return collection;
  }

  @Get()
  async get() {
    const collections = await this.themesService.getAll();
    return collections;
  }
}
