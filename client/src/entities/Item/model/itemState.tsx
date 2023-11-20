import dayjs from 'dayjs';
import { FieldTypes } from 'entities/Collection';
import { makeObservable, observable } from 'mobx';
import { API } from 'shared/api/api';
import { ModalState, modalProps } from 'shared/class/ModalState';

const ITEM_ROUTE = 'items/';

export interface Item {
}

interface AddDTO{
	collectionId: number;
	title: string;
	tag: any;
	id: null;
	fields: [string, any][]
	userId: number
}

class ItemState extends ModalState<any> {
    items: Item[] | null = [];

    item: Item | null = null;

    api = new API(ITEM_ROUTE);

    constructor() {
        super();
        makeObservable(this, {
            items: observable,
            item: observable,
            ...modalProps,
        });
    }

    setValues(values: any) {
        if (values) {
            const fields = Object.fromEntries(
                values.field
                    .map(({ id, FieldItem, type }: any) => {
                        const fn = (val: string) => {
                            switch (type) {
                            case FieldTypes.BOOLEAN: return val === 'true';
                            case FieldTypes.INTEGER: return parseInt(val);
                            case FieldTypes.DATE: return dayjs(val.slice(0, 10));
                            default: return val;
                            }
                        };
                        return [`${id}-field`, fn(FieldItem.value)];
                    }),
            );
            values = {
                ...values,
                ...fields,
                tag: values.tag.map(({ title }: any) => title),
            };
        }
        this.values = values;
    }

    async add({
        id, title, tag, collectionId, userId, ...fields
    }: AddDTO) {
        const item = {
            title,
            tags: tag,
            collectionId,
            fields: Object.entries(fields)
                .filter(([_, val]) => val)
                .map(([key, val]) => [parseInt(key), val]),
        };
        await this.api.add(item);
        await this.getAll({ collectionId: item.collectionId });
    }

    async update({tag, title, collectionId, id, ...fields}: AddDTO) {
		const item = {
            title,
			id,
            tags: tag,
            collectionId,
            fields: Object.entries(fields)
                .filter(([_, val]) => val)
                .map(([key, val]) => [parseInt(key), val]),
        };
		console.log(item)
        await this.api.update(item);
        await this.getAll({ collectionId: item.collectionId });
    }

    async getAll(query: any = {}) {
        const clb = async (data: any) => {
            if (data) this.items = data;
        };
        await this.api.getAll(query, clb);
    }

    async getById(id: number) {
        this.api.getById(id);
    }

    async delete(id: number, collectionId: number) {
		await this.api.delete(id);
        await this.getAll({ collectionId });
    }
}

export const itemState = new ItemState();
