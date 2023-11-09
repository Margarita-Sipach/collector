import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { AdminGuard } from "src/guards/admin.guard";
import { CreateDTO } from "./dto/CreateDTO";

@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    const tag = await this.tagsService.create(dto);
    return tag;
  }

  @Get()
  async get() {
    const tags = await this.tagsService.getAll();
    return tags;
  }
}
