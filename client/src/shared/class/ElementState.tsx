import { observable } from 'mobx';
import { API } from 'shared/api/api';
import { collectionState } from 'entities/Collection';
import { itemState } from 'entities/Item';
import { ModalState } from './ModalState';

export const elementProps = {
    element: observable,
    elements: observable,
};

export enum ElementsTypes {
	collection = 'collection',
	item = 'item'
}

export enum ElementsRoutes {
	collection = 'collections',
	item = 'items'
}

export class ElementState<T> extends ModalState<T> {
    element: any = null;

    elements: any = null;

    api: API;

    paramsNames: string[];

    constructor(type: ElementsRoutes, paramsNames: string[]) {
        super();
        this.api = new API(type);
        this.paramsNames = paramsNames;
    }

    setElement(element: any) {
        this.element = element;
    }

    setElements(elements: any) {
        this.elements = elements;
    }

    async getAll(element: any, paramsNames = this.paramsNames) {
        const params = this.generateParams(element, paramsNames);
        const clb = async (data: any) => {
            if (data) this.setElements(data);
            console.log(data);
        };
        await this.api.getAll(params, clb);
    }

    async add(element: any) {
        await this.api.add(element);
        await this.getAll(element);
    }

    async delete(id: number, element: object) {
        await this.api.delete(id);
        await this.getAll(element);
    }

    async update(element: any) {
        await this.api.update(element);
        await this.getAll(element);
    }

    async getById(id: number) {
        const clb = async (data: any) => {
            if (data) this.setElement(data);
        };
        await this.api.getById(id, clb);
    }

    generateParams(element: any, paramsNames = this.paramsNames) {
        return paramsNames.reduce((acc, name) => ({
            ...acc,
            [name]: element[name],
        }), {});
    }
}
