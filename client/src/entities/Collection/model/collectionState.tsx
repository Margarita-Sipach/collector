import { makeObservable } from 'mobx';
import {
    ElementState, ElementsRoutes, elementProps,
} from 'shared/class/ElementState';
import { modalProps } from 'shared/class/ModalState';

export interface Collection {
	id: number;
	userId: number;
	title: string;
	theme: string;
	description: string;
	fields: {
		title: string;
		type: number;
		FieldItem: {value: string}
	}[]
}

export enum FieldTypes {
	INTEGER = 'integer',
	CHAR = 'char',
	TEXT = 'text',
	BOOLEAN = 'boolean',
	DATE = 'date',
  }

interface AddDTO{
	userId: number;
	title: string;
	theme: string;
	description: string;
	fields: {
		title: string;
		type: number
	}
}

class CollectionState extends ElementState<any> {
    constructor() {
        super(ElementsRoutes.collection);
        makeObservable(this, {
            ...elementProps,
            ...modalProps,
        });
    }

    setValues(value: any): void {
        this.values = value ? { ...value, theme: (value.theme as any).title } : value;
    }

    convertElement({ fields: changedFields = [], ...values }: any) {
        const changedFieldsIds = changedFields?.map?.(({ id }: any) => id);
        const deletedFields = this?.values?.fields ? this?.values?.fields
            .filter(({ id }: any) => !changedFieldsIds.includes(id))
            .map(({ id }: any) => ({ id })) : [];
        return {
            fields: [...deletedFields, ...changedFields],
            ...values,
        };
    }
}

export const collectionState = new CollectionState();
