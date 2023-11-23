import { makeAutoObservable } from 'mobx';
import { API } from 'shared/api/api';

export interface Character {
	id: number
	title: string
}

export enum CharacterRoutes{
	tags = 'tags',
	themes = 'themes'
}

class CharacterState {
    themes: Character[] = [];

    tags: Character[] = [];

    constructor() {
        makeAutoObservable(this);
        this.getTags();
        this.getThemes();
    }

    async getAll(route: CharacterRoutes, clb: Function) {
        await new API(route).getAll({}, clb);
    }

    async getTags() {
        const clb = (data: any) => this.tags = data;
        await this.getAll(CharacterRoutes.tags, clb);
    }

    async getThemes() {
        const clb = (data: any) => this.themes = data;
        await this.getAll(CharacterRoutes.themes, clb);
    }
}

export const characterState = new CharacterState();
