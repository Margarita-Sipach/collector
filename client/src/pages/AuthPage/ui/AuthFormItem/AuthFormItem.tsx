import { Form, Input } from 'antd';
import { FC, memo } from 'react';
import { InputNames } from '../AuthPage';

interface AuthFormItemProps{
	isPassword?: boolean
	isEmail?: boolean
	name: string
	placeholder: string
	Tag?: typeof Input
}

export const AuthFormItem: FC<AuthFormItemProps> = memo((props: AuthFormItemProps) => {
    const {
        name,
        placeholder,
        isPassword = false,
        isEmail = false,
        Tag = isPassword ? Input.Password : Input,
    } = props;

    return (
        <Form.Item<InputNames>
            name={name}
            rules={[{
                required: true,
                message: `Please input valid ${placeholder}!`,
                ...isEmail ? { type: 'email' } : {},
            }]}
        >
            <Tag placeholder={placeholder} />
        </Form.Item>
    );
});
