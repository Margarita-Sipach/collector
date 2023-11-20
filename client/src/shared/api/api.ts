import axios from 'axios';
import { LOCAL_STORAGE } from 'shared/const/localstorage';
import { errorHandler } from 'shared/error/errorHandler';

export const api = axios.create({
    baseURL: __API__,
    headers: {},
});

export const authApi = axios.create({
    baseURL: __API__,
    headers: {
        Authorization: localStorage.getItem(LOCAL_STORAGE.USER_ID) || -1,
    },
});

export class API {
    route: string;

    constructor(route: string) {
        this.route = route;
    }

    getIdRoute(id: number) {
        return `${this.route}/${id}`;
    }

    async delete(id: any, clb?: Function) {
        const deleteHandler = async () => {
            const { data } = await authApi.delete(this.getIdRoute(id));
            await clb?.(data);
        };
        return errorHandler(deleteHandler);
    }

    async update(newData: any, clb?: Function) {
        const update = async () => {
            const { data } = await authApi.patch(this.getIdRoute(newData.id), newData);
            await clb?.(data);
        };
        return errorHandler(update);
    }

    async getById(id: number, clb?: Function) {
        const getById = async () => {
            const { data } = await api.get(this.getIdRoute(id));
            await clb?.(data);
        };
        return errorHandler(getById);
    }

    async add(newData: any, clb?: Function) {
        const add = async () => {
            const { data } = await authApi.post(this.route, newData);
            await clb?.(data);
        };
        return errorHandler(add);
    }

    async getAll(query: any = {}, clb?: Function) {
        const getAll = async () => {
            const { data } = await authApi.get(this.route, { params: query });
            await clb?.(data);
        };
        return errorHandler(getAll);
    }
}
