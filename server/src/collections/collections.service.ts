import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./collections.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ThemesService } from "src/themes/themes.service";
import { FieldsService } from "src/fields/fields.service";

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
    fields.forEach((field) => {
      this.fieldService.create({
        ...field,
        collectionId: collection.id,
      });
    });
    return collection;
  }

  async getAll() {
    return await this.collectionRepository.findAll({ include: { all: true } });
  }

  async getById(id: number) {
    return await this.collectionRepository.findByPk(id, {
      include: { all: true },
    });
  }
}
