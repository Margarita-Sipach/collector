import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';

class SettingsState {
    error: string = '';

    success: string = '';

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setError(error: any) {
        this.setErrorText(error.response.data.message);
    }

    setErrorText(error: string) {
        this.error = error || i18next.t('error:unexpected');
    }

    setSuccessText(success: string) {
        this.success = success;
    }

    removeError() {
        this.error = '';
    }

    removeSuccess() {
        this.success = '';
    }

    setIsLoading() {
        this.isLoading = true;
    }

    removeIsLoading() {
        this.isLoading = false;
    }
}

export const settingsState = new SettingsState();
