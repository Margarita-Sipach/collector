import { makeObservable, observable } from 'mobx';
import { authApi } from 'shared/api/api';
import { ModalState, modalProps } from 'shared/class/ModalState';
import { errorHandler } from 'shared/error/errorHandler';

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

    async delete(id: number) {
		return errorHandler(() => authApi.delete(COLLECTION_ROUTE + id));
    }

    async update(args: any) {
		return errorHandler(() => authApi.put(COLLECTION_ROUTE + args.id, args));
    }

    async getById(id: number) {
        const { data } = await authApi.get(COLLECTION_ROUTE + id);
        return data;
    }
}

export const collectionState = new CollectionState();
