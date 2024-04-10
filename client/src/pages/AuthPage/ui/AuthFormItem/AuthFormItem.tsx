import { Form, Input } from 'antd';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

    return (
        <Form.Item
            name={name}
            rules={[{
                required: true,
                message: `${t('inputValid')}${placeholder}!`,
                ...isEmail ? { type: 'email' } : {},
            }]}
        >
            <Tag placeholder={placeholder} />
        </Form.Item>
    );
});
