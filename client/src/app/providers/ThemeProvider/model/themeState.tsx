import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE } from 'shared/const/localstorage';

export enum Theme{
	light = 'light',
	dark = 'dark'
}

class ThemeState {
    theme: Theme = localStorage.getItem(LOCAL_STORAGE.THEME_KEY) as Theme || Theme.light;

    isLight: boolean = this.theme === Theme.light;

    constructor() {
        makeAutoObservable(this);
        this.toggleBodyClass();
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        this.isLight = !this.isLight;
        this.toggleBodyClass();
		localStorage.setItem(LOCAL_STORAGE.THEME_KEY, theme)
    }

    toggleBodyClass(theme: Theme = this.theme) {
        document.body.className = theme;
    }
}

export const themeState = new ThemeState();
