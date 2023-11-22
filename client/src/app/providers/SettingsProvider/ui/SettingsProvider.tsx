import { observer } from 'mobx-react-lite';
import { Spin, message } from 'antd';
import { useEffect } from 'react';
import { settingsState } from '..';
import cls from './SettingsProvider.module.scss';

export const SettingsProvider = observer(({ children }) => {
    const { isLoading, error, success } = settingsState;

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (error) {
            messageApi.open({
                type: 'error',
                content: error,
            });
            settingsState.removeError();
        }
        if (success) {
            messageApi.open({
                type: 'success',
                content: success,
            });
            settingsState.removeSuccess();
        }
    }, [error, messageApi, success]);

    return (
        <>
            {contextHolder}
            {isLoading && (
                <div className={cls.bg}>
                    <Spin size="large" className={cls.loader} />
                </div>
            )}
            {children}
        </>
    );
});
