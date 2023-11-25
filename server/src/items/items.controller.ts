import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateDTO } from "./dto/CreateDTO";
import { Request } from "express";
import { UpdateDTO } from "./dto/UpdateDTO";

@Controller("items")
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  async create(@Body() dto: CreateDTO) {
    return await this.itemsService.create(dto);
  }

  @Patch("/:id")
  async update(@Body() dto: UpdateDTO) {
    return await this.itemsService.update(dto);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.itemsService.api.getById(id);
  }

  @Get()
  async getAll(@Req() request: Request) {
    const params = request.query;
    return await this.itemsService.api.getAll(params);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    await this.itemsService.api.delete(id);
    return { status: "success" };
  }
}
