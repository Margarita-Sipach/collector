import { settingsState } from 'app/providers/SettingsProvider';
import axios from 'axios';

export class API {
    route: string;

    api = axios.create({
        baseURL: __API__,
    });

    constructor(route: string) {
        this.route = route;
    }

    updateUserId(userId: number) {
        this.api = axios.create({
            baseURL: __API__,
            headers: {
                Authorization: userId || 0,
            },
        });
    }

    getIdRoute(id: number) {
        return `${this.route}/${id}`;
    }

    async delete(id: any, clb?: Function) {
        try {
            settingsState.setIsLoading();
            const { data } = await this.api.delete(this.getIdRoute(id));
            await clb?.(data);
            settingsState.setSuccessText('success');
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    async update(newData: any, clb?: Function) {
        try {
            settingsState.setIsLoading();
            const { data } = await this.api.patch(this.getIdRoute(newData.id), newData);
            await clb?.(data);
            settingsState.setSuccessText('success');
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    async getById(id: number, clb?: Function) {
        try {
            settingsState.setIsLoading();
            const { data } = await this.api.get(this.getIdRoute(id));
            await clb?.(data);
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    async add(newData: any, clb?: Function, route = this.route) {
        try {
            settingsState.setIsLoading();
            const { data } = await this.api.post(route, newData);
            await clb?.(data);
            settingsState.setSuccessText('success');
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    async getAll(clb?: Function, query: any = {}) {
        try {
            settingsState.setIsLoading();
            const { data } = await this.api.get(this.route, { params: query });
            await clb?.(data);
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }
}
