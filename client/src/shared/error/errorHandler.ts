import { settingsState } from 'app/providers/SettingsProvider';

export const errorHandler = (fn: () => void, isErrorMsg: boolean = true) => {
    try {
        settingsState.setIsLoading();
        return fn();
    } catch (e) {
        if(isErrorMsg) settingsState.setError(e);
        return null;
    } finally {
        settingsState.removeIsLoading();
    }
};
