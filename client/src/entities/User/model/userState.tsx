import { makeAutoObservable } from 'mobx';
import { api, authApi } from 'shared/api/api';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

const USER_ROUTE = 'users/';

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
	isActive: boolean
}

class UserState {
    user: User | null = null;

    isAuth: boolean = false;

    isAdmin: boolean = false;

    userId: number = Number(localStorage.getItem(LOCAL_STORAGE.USER_ID));

    constructor() {
        makeAutoObservable(this);
        this.initUser();
    }

    async initUser() {
        if (!this.userId) return;
        const path = `${USER_ROUTE}${this.userId}`;
        const { data } = await api.get(path);
        this.setUser(data);
    }

    removeUser() {
        this.isAdmin = this.isAuth = false;
        this.user = null;
        localStorage.removeItem(LOCAL_STORAGE.USER_ID);
    }

    async auth(user: User, successCallback: () => void, isRegistration: boolean = true) {
        try {
            const path = `${USER_ROUTE}${isRegistration ? 'registration' : 'login'}`;
            const { data } = await api.post(path, user);
            this.setUser(data);
            localStorage.setItem(LOCAL_STORAGE.USER_ID, String(data.id));
            successCallback();
        } catch (e) {
            alert((e as any).response.data.message || 'Unexpected error');
        }
    }

    setUser(data: User) {
        this.isAuth = true;
        this.isAdmin = data.role === Role.ADMIN;
        this.user = data;
    }

    exit() {
        this.removeUser();
    }

    async getUsers() {
        const { data } = await authApi.get(USER_ROUTE);
        return data;
    }

    async updateUser(changeArgs: Partial<User>) {
        try {
            await authApi.patch(USER_ROUTE, changeArgs);
        } catch (e) {
            alert((e as any).response.data.message || 'Unexpected error');
        }
    }

    async deleteUser(id: number) {
        try {
            const { data } = await authApi.delete(`${USER_ROUTE}${id}`);
        } catch (e) {
            alert((e as any).response.data.message || 'Unexpected error');
        }
    }
}

export const userState = new UserState();
