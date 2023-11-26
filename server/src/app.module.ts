import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { Collection } from "./collections/collections.model";
import { Item } from "./items/items.model";
import { Theme } from "./themes/themes.model";
import { Tag } from "./tags/tags.model";
import { ItemTag } from "./items-tags/items-tags.model";
import { CollectionsModule } from "./collections/collections.module";
import { ThemesModule } from "./themes/themes.module";
import { ItemsModule } from "./items/items.module";
import { TagsModule } from "./tags/tags.module";
import { FieldsModule } from "./fields/fields.module";
import { Field } from "./fields/fields.model";
import { FieldItem } from "./fields-items/fields-items.model";
import { Like } from "./users-items/likes.model";
import { Comment } from "./users-items/comments.model";

const dialectOptions = {
  supportBigNumbers: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [
        User,
        Collection,
        Theme,
        Item,
        Tag,
        ItemTag,
        Field,
        FieldItem,
        Comment,
        Like,
      ],
        dialectOptions,
    }),
    UsersModule,
    CollectionsModule,
    ThemesModule,
    ItemsModule,
    TagsModule,
    ItemsModule,
    FieldsModule,
  ],
})
export class AppModule {}
