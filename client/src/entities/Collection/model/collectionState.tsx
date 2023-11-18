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
	collections: Collection[] | null = []
	collection: Collection | null = null
    constructor() {
		super()
        makeObservable(this, {
			collections: observable,
			collection: observable,
			...modalProps
		});
    }

	setCollections(collections: Collection[]){
		this.collections = collections
	}

	setCollection(collection: Collection | null){
		this.collection = collection
	}

	setValues(value: any): void {
		this.values = value ? {...value, theme: (value.theme as any).title} : value
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
			await authApi.patch(COLLECTION_ROUTE + collection.id, collection)
			await this.getAll({userId: collection.userId})
		}
		return errorHandler(update);
    }

    async getById(id: number) {
		const getById = async() => {
			const { data } = await authApi.get(COLLECTION_ROUTE + id);
		    if(data) this.collection = data
			console.log(this.collection)
		}
        return errorHandler(getById);
    }
}

export const collectionState = new CollectionState();
