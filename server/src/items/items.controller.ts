import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CommonGuard } from "src/guards/common.guard";
import { CreateDTO } from "./dto/CreateDTO";

@Controller("items")
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @UseGuards(CommonGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    const collection = await this.itemsService.create(dto);
    return collection;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const collection = await this.itemsService.getById(id);
    return collection;
  }

  @Get()
  async getAll() {
    const items = await this.itemsService.getAll();
    return items;
  }
}
