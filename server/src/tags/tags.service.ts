import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "./tags.model";
import { CreateDTO } from "./dto/CreateDTO";

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  async create(dto: CreateDTO) {
    const tag = await this.tagRepository.create(dto);
    return tag;
  }

  async getAll() {
    const tags = await this.tagRepository.findAll();
    return tags;
  }
}
