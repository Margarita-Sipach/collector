import dayjs from 'dayjs';
import { FieldTypes } from 'entities/Collection';
import { makeObservable } from 'mobx';
import {
    ElementState, ElementsRoutes, elementProps,
} from 'shared/class/ElementState';
import { modalProps } from 'shared/class/ModalState';

export interface Item extends AddDTO {
	likes: any;
	tag: {
		title: string
	}[];
	id: number
}

interface AddDTO{
	collectionId: number;
	title: string;
	tag: any;
	id: any;
	fields: [string, any][]
	userId: number
	img: any
}

class ItemState extends ElementState<any> {
    constructor() {
        super(ElementsRoutes.item);
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

    convertElement(element: any) {
        const fields = Object.fromEntries(Object.entries(element).filter(([key, _]) => key.endsWith('field')));
        const { tag, ...values } = Object.fromEntries(Object.entries(element).filter(([key, _]) => !key.endsWith('field')));
        return {
            ...values,
            tags: tag,
            fields: this.convertFields(fields),
        };
    }

    convertFields(fields: any) {
        return Object.entries(fields)
            .filter(([_, val]) => val)
            .map(([key, val]) => [parseInt(key), val]);
    }

    async like(userId: number, value: boolean) {
        await this.api.add({ itemId: this.id, like: value, userId }, undefined, `${ElementsRoutes.item}/like`);
        await this.getById(this.id);
    }

    async comment(values: any) {
        await this.api.add(values, undefined, `${ElementsRoutes.item}/comment`);
        await this.getById(this.id);
    }

    get id() {
        return this.element.id;
    }
}

export const itemState = new ItemState();
