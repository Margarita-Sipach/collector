import { makeObservable, observable } from 'mobx';
import { API } from 'shared/api/api';
import { ModalState, modalProps } from 'shared/class/ModalState';

const ITEM_ROUTE = 'items/';

export interface Item {
}

interface AddDTO{
	collectionId: number;
	title: string;
	tags: any;
	id: null;
	fields: [string, any][]
	userId: number
}

class ItemState extends ModalState<any> {
	items: Item[] | null = []
	item: Item | null = null
	api = new API(ITEM_ROUTE)
    constructor() {
		super()
        makeObservable(this, {
			items: observable,
			item: observable,
			...modalProps
		});
    }

	setValues(values: any) {
		if(!values) return this.values = values
		const fields = Object.fromEntries(values.field.map(({id, FieldItem}: any) => [`${id}-field`, FieldItem.value]))
		this.values = {...values, ...fields}
	}

    async add({id, title, tags, collectionId, userId, ...fields}: AddDTO) {
		const item = {title, tags, userId, collectionId, fields: Object.entries(fields).map(([key, val]) => [parseInt(key), val])}
		await this.api.add(item)
		await this.getAll()
    }

	async update(item: AddDTO) {
		await this.api.update(item)
		await this.getAll()
    }

	async getAll(query: any = {}) {
		const clb = async(data: any) => {
			if(data) this.items = data
		}
		await this.api.getAll({}, clb)
    }

    async getById(id: number) {
        return 'hello';
    }

	async delete(){
		return
	}
}

export const itemState = new ItemState();
