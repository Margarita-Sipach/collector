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
import { APIController } from "src/base/api.controller";
import { UpdateDTO } from "./dto/UpdateDTO";

@Controller("items")
export class ItemsController {
  api: APIController;
  constructor(private itemsService: ItemsService) {
    this.api = new APIController(itemsService);
  }

  @Post()
  async create(@Body() dto: CreateDTO) {
    return await this.api.create(dto);
  }

  @Patch("/:id")
  async update(@Body() dto: UpdateDTO) {
    return await this.api.update(dto);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.api.getById(id);
  }

  @Get()
  async getAll(@Req() request: Request) {
    const params = request.query;
    return await this.api.getAll(params);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    await this.api.delete(id);
    return { status: "success" };
  }
}
