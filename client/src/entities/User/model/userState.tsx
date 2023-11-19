import { settingsState } from 'app/providers/SettingsProvider';
import { Collection } from 'entities/Collection';
import { makeAutoObservable } from 'mobx';
import { api, authApi } from 'shared/api/api';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

const USER_ROUTE = 'users/';

const getUserIdRoute = (id: number) => `${USER_ROUTE}${id}`;

export enum Role{
	USER = 'USER',
	ADMIN = 'ADMIN'
}

export interface User {
	id: number,
	username: string,
	email: string,
	password: string,
	role: Role
	isActive: boolean,
	collections: Collection[]
}

class UserState {
    user:any = null;

    isAuth: boolean = false;

    isAdmin: boolean = false;

    userId: number = Number(localStorage.getItem(LOCAL_STORAGE.USER_ID));

    constructor() {
        makeAutoObservable(this);
        this.initUser();
    }

    async initUser() {
        try {
            const path = getUserIdRoute(this.userId);
            const { data } = await api.get(path);
            this.setUser(data);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    removeUser() {
        this.isAdmin = this.isAuth = false;
        this.user = null;
        localStorage.removeItem(LOCAL_STORAGE.USER_ID);
    }

    async auth(user: User, successCallback: () => void, isRegistration: boolean = true) {
        try {
            settingsState.setIsLoading();
            const path = `${USER_ROUTE}${isRegistration ? 'registration' : 'login'}`;
            const { data } = await api.post(path, user);
            this.setUser(data);
            localStorage.setItem(LOCAL_STORAGE.USER_ID, String(data.id));
            successCallback();
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    setUser(data: User) {
        this.isAuth = true;
        this.isAdmin = data.role === Role.ADMIN;
        this.user = data;
        this.userId = data.id;
    }

    exit() {
        this.removeUser();
    }

    async getUsers() {
        const { data } = await authApi.get(USER_ROUTE);
        return data;
    }

    async getUserById(id: number): Promise<User> {
        if (!id) alert('Id does not exist');
        const { data } = await authApi.get(getUserIdRoute(id));
        return data;
    }

    async updateUser(changeArgs: Partial<User>) {
        try {
            settingsState.setIsLoading();
            await authApi.patch(USER_ROUTE, changeArgs);
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }

    async deleteUser(id: number) {
        try {
            await authApi.delete(`${USER_ROUTE}${id}`);
        } catch (e) {
            settingsState.setError(e);
        } finally {
            settingsState.removeIsLoading();
        }
    }
}

export const userState = new UserState();
