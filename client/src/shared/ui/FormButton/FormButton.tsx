import { FC } from 'react';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

interface FormButtonProps {
  className?: string
}

export const FormButton: FC<FormButtonProps> = (props) => {
    const { children } = props;
    const { t } = useTranslation('button');
    return (
        <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
            >
                {children || t('submit')}
            </Button>
        </Form.Item>
    );
};
