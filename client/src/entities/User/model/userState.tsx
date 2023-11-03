import { makeAutoObservable } from 'mobx';
import { api } from 'shared/api/api';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

const USER_ROUTE = 'users/';

class UserState {
    user: any = null;

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
            const data = await api.get(path);
            this.setUser(data);
        } catch (e) {}
    }

    removeUser() {
        this.isAdmin = this.isAuth = false;
        this.user = null;
    }

    async auth(user: any, successCallback: () => void, isRegistration: boolean = true) {
        try {
            const path = `${USER_ROUTE}${isRegistration ? 'registration' : 'login'}`;
            const { data } = await api.post(path, user);
            this.setUser(data);
            localStorage.setItem(LOCAL_STORAGE.USER_ID, data.id);
            successCallback();
            console.log(data);
        } catch (e) {
            console.log(e);
            alert((e as any).response.data.message || 'Unexpected error');
        }
    }

    setUser(data: any) {
        this.isAuth = true;
        this.isAdmin = data.role === 'ADMIN';
        this.user = data;
    }

    exit() {
        localStorage.removeItem(LOCAL_STORAGE.USER_ID);
        this.removeUser();
    }
}

export const userState = new UserState();
