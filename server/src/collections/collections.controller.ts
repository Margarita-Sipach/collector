import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { CreateDTO } from "./dto/CreateDTO";
import { CommonGuard } from "src/guards/common.guard";

@Controller("collections")
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(CommonGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    const collection = await this.collectionsService.create(dto);
    return collection;
  }

  @Get()
  async getAll() {
    const collection = await this.collectionsService.getAll();
    return collection;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const collection = await this.collectionsService.getById(id);
    return collection;
  }
}
