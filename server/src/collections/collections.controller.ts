import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { CreateDTO } from "./dto/CreateDTO";
import { CommonGuard } from "src/guards/common.guard";
import { UpdateDTO } from "./dto/UpdateDTO";

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

  @Patch("/:id")
  async update(@Body() dto: UpdateDTO) {
    const collection = await this.collectionsService.update(dto);
    return collection;
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    await this.collectionsService.delete(id);
    return { status: "success" };
  }
}
