import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./collections.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ThemesService } from "src/themes/themes.service";
import { FieldsService } from "src/fields/fields.service";
import { FieldTypes } from "src/fields/fields.model";

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection) private collectionRepository: typeof Collection,
    private themeService: ThemesService,
    private fieldService: FieldsService,
  ) {}

  async create({ fields, theme, ...collectionArgs }: CreateDTO) {
    const { id: themeId } = await this.themeService.getByTitle(theme);
    const collection = await this.collectionRepository.create({
      ...collectionArgs,
      themeId,
    });
    Object.entries(fields).forEach(([type, titles]) => {
      titles.forEach((title) => {
        this.fieldService.create({
          type: type as unknown as FieldTypes,
          title,
        });
      });
    });
    return collection;
  }
}
