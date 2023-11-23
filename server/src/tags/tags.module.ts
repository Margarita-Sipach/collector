import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { Tag } from "./tags.model";
import { getCharacterModuleObj } from "src/character/character.module";
import { ItemTag } from "src/items-tags/items-tags.model";

@Module(getCharacterModuleObj([TagsController], [TagsService], [Tag, ItemTag]))
export class TagsModule {}
