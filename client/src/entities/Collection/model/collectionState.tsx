import { makeObservable, observable } from 'mobx';
import { authApi } from 'shared/api/api';
import { ModalState, modalProps } from 'shared/class/ModalState';
import { errorHandler } from 'shared/error/errorHandler';

const COLLECTION_ROUTE = 'collections/';

export interface Collection {
	id: number;
	userId: number;
	title: string;
	theme: string;
	description: string;
	fields: {
		title: string;
		type: number
	}
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
	collections: Collection[] = []
    constructor() {
		super()
        makeObservable(this, {
			collections: observable,
			...modalProps
		});
    }

    async add(collection: AddDTO) {
        const add = async () => {
            await authApi.post(COLLECTION_ROUTE, collection);
            await this.getAll({userId: collection.userId})
        };
        return errorHandler(add);
    }

    async getAll(query: any = {}) {
		const getAll = async() => {
			const {data} = await authApi.get(COLLECTION_ROUTE, {params: query})
			if(data) this.collections = data
		}
        return errorHandler(getAll);
    }

    async delete(id: number, userId: number) {
		const deleteHandle = async() => {
			await authApi.delete(COLLECTION_ROUTE + id)
			await this.getAll({userId})
		}
		return errorHandler(deleteHandle);
    }

    async update(collection: any) {
		const update = async() => {
			await authApi.put(COLLECTION_ROUTE + collection.id, collection)
			await this.getAll({userId: collection.userId})
		}
		return errorHandler(update);
    }

    async getById(id: number) {
        const { data } = await authApi.get(COLLECTION_ROUTE + id);
        return data;
    }
}

export const collectionState = new CollectionState();
