import { settingsState } from 'app/providers/SettingsProvider';
import { Collection } from 'entities/Collection';
import { makeAutoObservable } from 'mobx';
import { API } from 'shared/api/api';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

const USER_ROUTE = 'users';

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

    pageUser: any = null;

    pageUsers: any = null;

    isAuth: boolean = false;

    isAdmin: boolean = false;

    userId: number = Number(localStorage.getItem(LOCAL_STORAGE.USER_ID));

    api = new API(USER_ROUTE);

    constructor() {
        makeAutoObservable(this);
        this.initUser();
    }

    setPageUsers(users: any) {
        this.pageUsers = users;
    }

    async initUser() {
        const clb = async (data: any) => {
            this.setUser(data);
        };
        await this.api.getById(this.userId, clb);
    }

    removeUser() {
        this.isAdmin = this.isAuth = false;
        this.user = null;
        this.api.updateUserId(0);
        localStorage.removeItem(LOCAL_STORAGE.USER_ID);
    }

    async auth(user: User, successCallback: () => void, isRegistration: boolean = true) {
        try {
            const clb = async (data: any) => {
                this.setUser(data);
                localStorage.setItem(LOCAL_STORAGE.USER_ID, String(data.id));
                successCallback();
            };
            const path = `${USER_ROUTE}/${isRegistration ? 'registration' : 'login'}`;
            await this.api.add(user, clb, path);
        } catch (e) { console.log(e); }
    }

    setUser(data: User) {
        this.isAuth = true;
        this.isAdmin = data.role === Role.ADMIN;
        this.user = data;
        this.userId = data.id;
        this.api.updateUserId(data.id);
    }

    exit() {
        this.removeUser();
    }

    async getUsers() {
        const clb = async (data: any) => {
            this.setPageUsers(data);
        };
        await this.api.getAll({}, clb);
    }

    async getUserById(id: number) {
        if (!id) return settingsState.setErrorText('Id does not exist');
        const clb = (data: any) => {
            this.pageUser = data;
        };
        await this.api.getById(id, clb);
    }

    async updateUser(changeArgs: Partial<User>) {
        const clb = (data: any) => this.setPageUsers(data);
        await this.api.update(changeArgs);
        await this.api.getAll({}, clb);
    }

    async deleteUser(id: number) {
        const clb = (data: any) => this.setPageUsers(data);
        await this.api.delete(id);
        await this.api.getAll({}, clb);
    }
}

export const userState = new UserState();
