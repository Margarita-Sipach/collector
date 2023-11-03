import { makeAutoObservable } from 'mobx';
import { api } from 'shared/api/api';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

const USER_ROUTE = 'users/';

enum Role{
	USER = 'USER',
	ADMIN = 'ADMIN'
}

interface User {
	id: number,
	username: string,
	email: string,
	password: string,
	role: Role
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
        try {
            const path = `${USER_ROUTE}${this.userId}`;
            const data: User = await api.get(path);
            this.setUser(data);
        } catch (e) {}
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
            successCallback();
        } catch (e) {
            alert((e as any).response.data.message || 'Unexpected error');
        }
    }

    setUser(data: User) {
        this.isAuth = true;
        this.isAdmin = data.role === Role.ADMIN;
        this.user = data;
        localStorage.setItem(LOCAL_STORAGE.USER_ID, String(data.id));
    }

    exit() {
        this.removeUser();
    }
}

export const userState = new UserState();
