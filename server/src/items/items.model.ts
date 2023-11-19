import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Table,
} from "sequelize-typescript";
import { Base, requireString } from "src/base/base.model";
import { Collection } from "src/collections/collections.model";
import { FieldItem } from "src/fields-items/fields-items.model";
import { Field } from "src/fields/fields.model";
import { ItemTag } from "src/items-tags/items-tags.model";
import { Tag } from "src/tags/tags.model";

interface ItemCreationAttrs {
	title: string;
	collectionId: number;
	img?: string;
}

@Table({ tableName: "items" })
export class Item extends Base<Item, ItemCreationAttrs> {
	@Column(requireString)
	title: string;

	@Column({ type: DataType.STRING })
	img: string;

	@ForeignKey(() => Collection)
	@Column({ field: "collectionId" })
	collectionId: number;
	@BelongsTo(() => Collection)
	collection: Collection;

	@BelongsToMany(() => Tag, () => ItemTag)
	tag: Tag[];

	@BelongsToMany(() => Field, () => FieldItem)
	field: Field[];
}
