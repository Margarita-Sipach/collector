import { makeObservable, observable } from 'mobx';
import { API } from 'shared/api/api';
import { ModalState, modalProps } from 'shared/class/ModalState';

const COLLECTION_ROUTE = 'collections/';

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

class CollectionState extends ModalState<any> {
    collections: Collection[] | null = [];

    collection: Collection | null = null;
	api: API = new API(COLLECTION_ROUTE)

    constructor() {
        super();
        makeObservable(this, {
            collections: observable,
            collection: observable,
            ...modalProps,
        });
    }

    setCollections(collections: Collection[]) {
        this.collections = collections;
    }

    setCollection(collection: Collection | null) {
        this.collection = collection;
    }

    setValues(value: any): void {
        this.values = value ? { ...value, theme: (value.theme as any).title } : value;
    }

    async add(collection: AddDTO) {
		await this.api.add(collection);
        await this.getAll({ userId: collection.userId });
    }

    async getAll(query: any = {}) {
        const clb = async (data: any) => {
            if (data) this.setCollections(data);
        };
		await this.api.getAll(query, clb)
    }

    async delete(id: number, userId: number) {
		await this.api.delete(id);
        await this.getAll({ userId });
    }

    async update(collection: any) {
		await this.api.update(collection);
        await this.getAll({ userId: collection.userId });
    }

    async getById(id: number) {
        const clb = async (data: any) => {
            if (data) this.setCollection(data);
        };
		await this.api.getById(id, clb);
    }
}

export const collectionState = new CollectionState();
