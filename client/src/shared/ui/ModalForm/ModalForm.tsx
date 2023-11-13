import { Form, Modal } from 'antd';
import { FC } from 'react';

interface ModalFormProps {
	isVisible: boolean
	setIsVisible: (isVisible: boolean) => void
	onFinish: (values: any) => void
	title: string
}

export const ModalForm: FC<ModalFormProps> = (props) => {
    const {
        isVisible, setIsVisible, onFinish, children, title,
    } = props;
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        onFinish(values);
        setIsVisible(false);
    };

    const handleCancel = () => {
      setIsVisible(false);
      form.resetFields();
    };

    return (
        <Modal
            open={isVisible}
            onOk={form.submit}
            onCancel={handleCancel}
            title={title}
        >
            <Form form={form} onFinish={handleSubmit}>
                {children}
            </Form>
        </Modal>
    );
};
