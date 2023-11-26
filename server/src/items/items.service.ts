import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateDTO } from "./dto/CreateDTO";
import { APIService } from "src/base/api.service";
import { UpdateDTO } from "./dto/UpdateDTO";
import { TagsService } from "src/tags/tags.service";
import { FieldsService } from "src/fields/fields.service";
import { Comment } from "src/users-items/comments.model";
import { Like } from "src/users-items/likes.model";

@Injectable()
export class ItemsService {
  api: APIService;
  likeApi: APIService;
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(Like) private likeRepository: typeof Like,
    private tagService: TagsService,
    private fieldService: FieldsService,
  ) {
    this.api = new APIService(itemRepository);
    this.likeApi = new APIService(likeRepository);
  }

  async create({ fields, tags, ...createArgs }: CreateDTO) {
    const { id } = await this.api.create(createArgs);
    await this.fieldService.createItemFields(fields, id);
    await this.tagService.createItemTags(tags, id);
    return await this.api.getById(id);
  }

  async createComment(dto) {
    return await this.commentRepository.create(dto);
  }

  async updateLike({ likeVal, ...dto }) {
    const [{ id }, _] = await this.likeRepository.findOrCreate({ where: dto });
    await this.likeApi.update({ id, like: likeVal });
    return this.likeApi.getById(id);
  }

  async update({ fields, tags, id, collectionId, ...updateArgs }: UpdateDTO) {
    await this.tagService.createAndDeleteItemTags(tags, id);
    await this.fieldService.updateItemFields(fields, id);
    await this.api.update({ id, ...updateArgs });
    return await this.api.getById(id);
  }
}
