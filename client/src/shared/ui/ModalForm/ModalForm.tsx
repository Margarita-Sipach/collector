import { Form, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

interface ModalFormProps {
	onFinish: (values: any) => void
	onReset?: any
	title: string
	values?: any
	isModalVisible: boolean
}

export const ModalForm: FC<ModalFormProps> = observer((props) => {
    const {
        onFinish, onReset, children, title, values, isModalVisible,
    } = props;

    const [form] = Form.useForm();

    useEffect(() => {
		form.resetFields();
        if (values) form.setFieldsValue(values);
    }, [values, form]);

    return (
        <Modal
            open={isModalVisible}
            onOk={form.submit}
            onCancel={onReset}
            title={title}
        >
            <Form
                form={form}
                onFinish={onFinish}
            >
                {children}
            </Form>
        </Modal>
    );
});
