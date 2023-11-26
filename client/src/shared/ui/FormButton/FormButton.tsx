import { FC } from 'react';
import { Button, Form } from 'antd';

interface FormButtonProps {
  className?: string
}

export const FormButton: FC<FormButtonProps> = (props) => {
    const { children } = props;

    return (
        <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
            >
                {children}
            </Button>
        </Form.Item>
    );
};
