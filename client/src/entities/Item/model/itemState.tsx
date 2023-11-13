import { makeAutoObservable } from 'mobx';

const COLLECTION_ROUTE = 'items/';

export interface Item {
}

class ItemState {
    constructor() {
        makeAutoObservable(this);
    }
}

export const itemState = new ItemState();
