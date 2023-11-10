import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { Tag } from "./tags.model";
import { getCharacterModuleObj } from "src/character/character.module";

@Module(getCharacterModuleObj(TagsController, TagsService, Tag))
export class TagsModule {}
