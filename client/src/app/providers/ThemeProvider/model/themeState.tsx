import { makeAutoObservable } from 'mobx';

export enum Theme{
	light = 'light',
	dark = 'dark'
}

class ThemeState {
    theme: Theme = localStorage.getItem('app-theme') as Theme || Theme.light;

    isLight: boolean = this.theme === Theme.light;

    constructor() {
        makeAutoObservable(this);
        this.toggleBodyClass();
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        this.isLight = !this.isLight;
        this.toggleBodyClass();
    }

    toggleBodyClass(theme: Theme = this.theme) {
        document.body.className = theme;
    }
}

export const themeState = new ThemeState();
