import { makeAutoObservable } from 'mobx';
import { authApi } from 'shared/api/api';

const ITEM_ROUTE = 'items/';

export interface Item {
}

interface AddDTO{
	collectionId: number;
	title: string;
	tags: any;
	fields: [number, any][]
}

class ItemState {
    constructor() {
        makeAutoObservable(this);
    }

	async add(item: AddDTO) {
        const { data } = await authApi.post(ITEM_ROUTE, item);
    }

}

export const itemState = new ItemState();
