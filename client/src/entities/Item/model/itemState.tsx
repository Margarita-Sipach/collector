import dayjs from 'dayjs';
import { FieldTypes } from 'entities/Collection';
import { makeObservable } from 'mobx';
import {
    ElementState, ElementsRoutes, elementProps,
} from 'shared/class/ElementState';
import { modalProps } from 'shared/class/ModalState';

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

class ItemState extends ElementState<any> {
    constructor() {
        super(ElementsRoutes.item, ['collectionId']);
        makeObservable(this, {
            ...elementProps,
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
            fields: this.convertFields(fields),
        };
        await this.api.add(item);
        await this.getAll({ collectionId: item.collectionId });
    }

    async update({
        tag, title, collectionId, id, ...fields
    }: AddDTO) {
        const item = {
            title,
            id,
            tags: tag,
            collectionId,
            fields: this.convertFields(fields),
        };
        await this.api.update(item);
        await this.getAll({ collectionId: item.collectionId });
    }

    convertFields(fields: any) {
        return Object.entries(fields)
            .filter(([_, val]) => val)
            .map(([key, val]) => [parseInt(key), val]);
    }
}

export const itemState = new ItemState();
