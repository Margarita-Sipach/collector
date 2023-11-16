import { Form, Modal } from 'antd';
import { collectionState } from 'entities/Collection';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

interface ModalFormProps {
	onFinish: (values: any) => void
	onReset?: any
	title: string
	values?: any
}

export const ModalForm: FC<ModalFormProps> = observer((props) => {
    const {
        onFinish, onReset, children, title, values,
    } = props;

    const [form] = Form.useForm();

	useEffect(() => {
		if(values) form.setFieldsValue(values)
		else form.resetFields()
	}, [values])

    return (
        <Modal
            open={collectionState.isModalVisible}
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
