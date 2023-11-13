import { makeAutoObservable } from 'mobx';
import { string } from 'prop-types';
import { authApi } from 'shared/api/api';

const COLLECTION_ROUTE = 'collections/';

export interface Collection {
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

class CollectionState {
    constructor() {
        makeAutoObservable(this);
        this.getAll();
    }

    async add(collection: AddDTO) {
        const { data } = await authApi.post(COLLECTION_ROUTE, collection);
    }

    async getAll() {
        const { data } = await authApi.get(COLLECTION_ROUTE);
        console.log(data);
    }
}

export const collectionState = new CollectionState();
