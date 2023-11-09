import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "./tags.model";
import { CharacterService } from "src/character/character.service";

@Injectable()
export class TagsService extends CharacterService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {
    super(tagRepository);
  }
}
