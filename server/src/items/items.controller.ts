import { Body, Controller, Post, UseGuards } from "@nestjs/common";
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
}