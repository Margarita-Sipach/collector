import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { FieldsService } from "./fields.service";
import { AdminGuard } from "src/guards/admin.guard";
import { CreateDTO } from "./dto/CreateDTO";

@Controller("fields")
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateDTO) {
    return await this.fieldsService.fieldApi.create(dto);
  }

  @Get()
  async get() {
    return await this.fieldsService.fieldApi.getAll();
  }
}
