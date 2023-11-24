import { keys, observable } from 'mobx';
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

    allElements: any = null;

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

    setAllElements(allElements: any) {
        this.allElements = allElements;
        this.setElements(allElements);
    }

    async getAll(element: any, paramsNames = this.paramsNames, limit?: number) {
        const params = this.generateParams(element, paramsNames);
        const clb = async (data: any) => {
            if (data) this.setAllElements('collection' in data[0] ? data.map((i: any) => ({...i, userId: i.collection?.userId})) : data);
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

    limitElements(limit: number) {
        this.setElements(this.allElements?.slice(0, limit) || []);
    }

    filterElements(filterArgs: Object) {
        if (this.allElements) {
            const elements = this.allElements.filter((element: any) => Object.entries(filterArgs).every(([argKey, argVal]) => {
                const convertToTitle = (arr: any): {title: string}[] => arr.map(({ title }: {title: string}) => title);
                const fn = (arr: any): object[] => (argKey === 'tag' ? convertToTitle(arr) : arr);
                if (Array.isArray(argVal)) return fn(argVal).every((v) => fn(element[argKey]).includes(v));
                return element[argKey] === argVal;
            }));
            this.setElements(elements);
        }
    }

    sortElements(sortArgs: string) {
    }
}
