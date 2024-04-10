import { observable } from 'mobx';
import { API } from 'shared/api/api';
import { ModalState } from './ModalState';

export const elementProps = {
    element: observable,
    elements: observable,
    allElements: observable,
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

    constructor(type: ElementsRoutes) {
        super();
        this.api = new API(type);
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

    async getAll(params: any = {}) {
        const clb = async (data: any) => {
            this.setAllElements(
                data.length && 'collection' in data?.[0]
                    ? data.map((i: any) => ({ ...i, userId: i.collection?.userId }))
                    : data,
            );
        };
        await this.api.getAll(clb, params);
    }

    async add(element: any, params: object = {}) {
        const convertedElement = this.convertElement(element);
        await this.api.add(convertedElement);
        await this.getAll(params);
    }

    async delete(id: number, params: object = {}) {
        await this.api.delete(id);
        await this.getAll(params);
    }

    async update(element: any, params: object = {}) {
        const convertedElement = this.convertElement(element);
        await this.api.update(convertedElement);
        await this.getAll(params);
    }

    convertElement(element: any) {
        return element;
    }

    async getById(id: number) {
        const clb = async (data: any) => {
            this.setElement(data);
        };
        await this.api.getById(id, clb);
    }

    limitElements(limit: number) {
        this.setElements(this.allElements.slice(0, limit));
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
