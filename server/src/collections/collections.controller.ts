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
    const { amount, sortLength, ...params } = request.query;
    let collections = await this.collectionsService.api.getAll(params);
    if (sortLength)
      collections = collections.sort((a, b) => {
        const getLength = (x) => x[sortLength as any].length;
        return getLength(b) - getLength(a);
      });
    if (amount) collections = collections.slice(0, amount);
    return collections;
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    await this.collectionsService.api.delete(id);
    return { status: "success" };
  }
}
