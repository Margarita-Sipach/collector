import { Body, Controller, Post, UseGuards } from "@nestjs/common";
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
}
