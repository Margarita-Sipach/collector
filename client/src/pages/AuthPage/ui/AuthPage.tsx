import {
    Button, Form, Typography,
} from 'antd';
import { userState } from 'entities/User';
import {
    FC, memo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import cls from './AuthPage.module.scss';
import { AuthFormItem } from './AuthFormItem/AuthFormItem';

const { Title } = Typography;

export enum InputNames{
	username = 'Username',
	email = 'Email',
	password = 'Password',
	repeatedPassword = 'Repeated password'
}

export const inputs = {
    username: {
        name: 'username',
        placeholder: 'Username',
    },
    email: {
        name: 'email',
        placeholder: 'Email',
    },
    password: {
        name: 'password',
        placeholder: 'Password',
    },
    repeatedPassword: {
        name: 'repeated',
        placeholder: 'Repeated password',
    },
};

interface AuthPageProps{
	isRegistration?: boolean
}

const AuthPage: FC<AuthPageProps> = memo(({ isRegistration = true }) => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        if (isRegistration && values.password !== values.repeated) {
            return alert('Different passwords');
        }

        userState.auth(values, () => navigate(CommonRoutePath.main), isRegistration);
    };
    return (
        <div className={cls.content}>
            <Title className={cls.title}>
                {isRegistration ? 'Registration' : 'Login'}
                {' '}
                Form
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
});
export default AuthPage;
