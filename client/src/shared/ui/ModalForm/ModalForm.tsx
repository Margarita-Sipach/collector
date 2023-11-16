import { Form, Modal } from 'antd';
import { collectionState } from 'entities/Collection';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

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
                initialValues={values}
            >
                {children}
            </Form>
        </Modal>
    );
});
