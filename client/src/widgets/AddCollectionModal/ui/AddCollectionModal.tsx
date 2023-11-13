import { FC } from 'react';
import { ModalForm } from 'shared/ui/ModalForm/ModalForm';
import {
    Button, Form, Input, Select, Space, Upload,
} from 'antd';
import { characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { collectionState, FieldTypes } from 'entities/Collection';
import cls from './AddCollectionModal.module.scss';

interface AddCollectionModalProps {
  className?: string
  userId: number
  setIsVisible: (isVisible: boolean) => void
  isVisible: boolean
}

export const AddCollectionModal: FC<AddCollectionModalProps> = observer((props) => {
    const {
        userId, isVisible, setIsVisible,
    } = props;

    const onFinish = (values: any) => {
        collectionState.add({ userId, ...values });
    };

    return (
        <ModalForm
            title="Collection Modal"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onFinish={onFinish}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Select" name="theme">
                <Select>
                    {characterState.themes.map(({ title }: any) => <Select.Option value={title} key={title}>{title}</Select.Option>)}
                </Select>
            </Form.Item>
            {/* <Form.Item
                name="img"
                label="Image"
            >
                <Upload action="/upload.do" listType="picture">
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item> */}
            <Form.Item label="Description" name="description">
                <Input.TextArea />
            </Form.Item>
            <Form.List name="fields">

                {(fields, { add, remove }) => (
                    <div>
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                            >
                                Add field
                            </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'title']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                >
                                    <Input placeholder="Title" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'type']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                >

                                    <Select className={cls.typeSelect}>
                                        {Object.values(FieldTypes).map((item) => (
                                            <Select.Option
                                                value={item}
                                                key={item}
                                            >
                                                {item}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Button onClick={() => remove(name)}>-</Button>

                            </Space>

                        ))}

                    </div>
                )}
            </Form.List>
        </ModalForm>
    );
});
