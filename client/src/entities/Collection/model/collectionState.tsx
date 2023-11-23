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
        super(ElementsRoutes.collection, ['userId']);
        makeObservable(this, {
            ...elementProps,
            ...modalProps,
        });
    }

    setValues(value: any): void {
        this.values = value ? { ...value, theme: (value.theme as any).title } : value;
    }
}

export const collectionState = new CollectionState();
