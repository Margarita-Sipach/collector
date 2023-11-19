import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./collections.model";
import { CreateDTO } from "./dto/CreateDTO";
import { ThemesService } from "src/themes/themes.service";
import { FieldsService } from "src/fields/fields.service";
import { UpdateDTO } from "./dto/UpdateDTO";

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
    await this.createFields(fields, collection.id);
    return await this.getById(collection.id);
  }

  async update({ fields, theme, ...collectionArgs }: UpdateDTO) {
    const { id: themeId } = await this.themeService.getByTitle(theme);
    await this.collectionRepository.update(
      {
        ...collectionArgs,
        themeId,
      },
      { where: { id: collectionArgs.id } },
    );

    await this.fieldService.deleteByCollectionId(collectionArgs.id);
    await this.createFields(fields, collectionArgs.id);

    return await this.getById(collectionArgs.id);
  }

  async createFields(fields: any, collectionId: number) {
    if (fields)
      await Promise.all(
        fields.map((field) =>
          this.fieldService.create({
            ...field,
            collectionId,
          }),
        ),
      );
  }

  async getAll(request) {
    return await this.collectionRepository.findAll({
      include: { all: true },
      where: request,
    });
  }

  async getById(id: number) {
    return await this.collectionRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async delete(id: number) {
    return await this.collectionRepository.destroy({ where: { id } });
  }
}
