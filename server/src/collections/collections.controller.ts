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
import { APIController } from "src/base/api.controller";

@Controller("collections")
export class CollectionsController {
  api: APIController;
  constructor(private collectionsService: CollectionsService) {
    this.api = new APIController(collectionsService);
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
