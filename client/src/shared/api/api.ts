import axios from 'axios';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

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
