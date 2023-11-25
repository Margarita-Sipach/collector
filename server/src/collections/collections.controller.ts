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
import { Request } from "express";
import { CollectionsService } from "./collections.service";
import { CreateDTO } from "./dto/CreateDTO";
import { UpdateDTO } from "./dto/UpdateDTO";

@Controller("collections")
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post()
  async create(@Body() dto: CreateDTO) {
    return await this.collectionsService.create(dto);
  }

  @Patch("/:id")
  async update(@Body() dto: UpdateDTO) {
    return await this.collectionsService.update(dto);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.collectionsService.api.getById(id);
  }

  @Get()
  async getAll(@Req() request: Request) {
    const params = request.query;
    return await this.collectionsService.api.getAll(params);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    await this.collectionsService.api.delete(id);
    return { status: "success" };
  }
}
