import { Button, Form, Typography } from 'antd';
import { userState } from 'entities/User';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { useTranslation } from 'react-i18next';
import { settingsState } from 'app/providers/SettingsProvider';
import cls from './AuthPage.module.scss';
import { AuthFormItem } from './AuthFormItem/AuthFormItem';

const { Title } = Typography;

interface AuthPageProps{
	isRegistration?: boolean
}

const AuthPage: FC<AuthPageProps> = memo(({ isRegistration = true }: AuthPageProps) => {
    const { t } = useTranslation(['user', 'translation', 'button', 'error']);

    const inputs = {
        username: {
            name: 'username',
            placeholder: t('user:username'),
        },
        email: {
            name: 'email',
            placeholder: t('user:email'),
        },
        password: {
            name: 'password',
            placeholder: t('user:password'),
        },
        repeatedPassword: {
            name: 'repeated',
            placeholder: t('user:repeatedPassword'),
        },
    };

    const navigate = useNavigate();
    const onFinish = (values: any) => {
        if (isRegistration && values.password !== values.repeated) {
            return settingsState.setErrorText(t('error:diffPasswords'));
        }

        const navigateToMainPage = () => navigate(CommonRoutePath.main);
        return userState.auth(values, navigateToMainPage, isRegistration);
    };
    return (
        <div className={cls.content}>
            <Title className={cls.title}>
                {t(`translation:${isRegistration ? 'registration' : 'login'}`)}
            </Title>

            <Form
                className={cls.form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {isRegistration && (
                    <AuthFormItem
                        {...inputs.username}
                    />
                )}
                <AuthFormItem
                    {...inputs.email}
                    isEmail
                />
                <AuthFormItem
                    {...inputs.password}
                    isPassword
                />
                {isRegistration && (
                    <AuthFormItem
                        {...inputs.repeatedPassword}
                        isPassword
                    />
                )}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {t('button:submit')}
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
});
export default AuthPage;
