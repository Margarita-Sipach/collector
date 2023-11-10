import { Controller } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CharacterController } from "src/character/character.controller";

@Controller("tags")
export class TagsController extends CharacterController {
  constructor(private tagsService: TagsService) {
    super(tagsService);
  }
}
