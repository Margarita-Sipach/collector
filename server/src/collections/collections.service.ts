import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./collections.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ThemesService } from "src/themes/themes.service";
import { FieldsService } from "src/fields/fields.service";
import { UpdateDTO } from "./dto/UpdateDTO";
import { APIService } from "src/base/api.service";

@Injectable()
export class CollectionsService {
  api: APIService;

  constructor(
    @InjectModel(Collection) private collectionRepository: typeof Collection,
    private themeService: ThemesService,
    private fieldService: FieldsService,
  ) {
    this.api = new APIService(collectionRepository);
  }

  async create({ fields, theme, ...collectionArgs }: CreateDTO) {
    const { id: themeId } = await this.themeService.getByTitle(theme);
    const { id } = await this.api.create({ ...collectionArgs, themeId });
    await this.fieldService.updateCollectionFields(fields, id);
    return await this.api.getById(id);
  }

  async update({ fields, theme, id, ...collectionArgs }: UpdateDTO) {
    const { id: themeId } = await this.themeService.getByTitle(theme);
    await this.fieldService.updateCollectionFields(fields, id);
    await this.api.update({ id, themeId, ...collectionArgs });
    return await this.api.getById(id);
  }
}
