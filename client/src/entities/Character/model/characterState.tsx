import { makeAutoObservable } from 'mobx';
import { api } from 'shared/api/api';

export interface Character {
	id: number
	title: string
}

export enum CharacterRoutes{
	tags = '/tags',
	themes = '/themes'
}

class CharacterState {
    themes: any = [];

    tags: any = [];

    constructor() {
        makeAutoObservable(this);
        this.getTags();
        this.getThemes();
    }

    async getAll(route: CharacterRoutes) {
        const { data } = await api.get(route);
        return data;
    }

    async getTags() {
        const data = await this.getAll(CharacterRoutes.tags);
        this.themes = data;
        return data;
    }

    async getThemes() {
        const data = await this.getAll(CharacterRoutes.themes);
        this.themes = data;
        console.log(data);
        return data;
    }
}

export const characterState = new CharacterState();
