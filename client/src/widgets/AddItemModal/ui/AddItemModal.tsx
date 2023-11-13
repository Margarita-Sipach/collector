import { FC, useEffect, useState } from 'react';
import { ModalForm } from 'shared/ui/ModalForm/ModalForm';
import { characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { collectionState } from 'entities/Collection';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { FieldInput } from './FieldInput/FieldInput';
import { Form, Input, Upload } from 'antd';
import { itemState } from 'entities/Item';

interface AddItemModalProps {
  className?: string
  collectionId: number
  setIsVisible: (isVisible: boolean) => void
  isVisible: boolean
}

export const AddItemModal: FC<AddItemModalProps> = observer((props) => {
    const {
        collectionId, isVisible, setIsVisible,
    } = props;

    const [collection, setCollection] = useState(null);
    useEffect(() => {
        collectionState.getAll().then((data: any) => setCollection(data[0] as any));
    }, []);

    const onFinish = (values: any) => {
		const {title, tags, ...fieldsArgs} = values;

		const fields: [number, any][] = Object.entries(fieldsArgs)
		.filter(([_, val]) => val)
		.map(([id, val]) => [+id.slice(0, -6), val])
		itemState.add({ collectionId, title, tags, fields});
    };

    return (
        <ModalForm
            title="Item Modal"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onFinish={onFinish}
        >
            <FormItem name="title" label="Item title" />
            <FormItem
                type={FormItemTypes.select}
                mode="tags"
                name="tags"
                options={characterState.themes.map(({ title }: any) => (title))}
            />
            {/* <Form.Item
                name="img"
                label="Image"
            >
                <Upload action="/upload.do" listType="picture">
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item> */}
			


	{collection && (collection as any).fields && (collection as any).fields.map((field: any) => (
	  <FieldInput {...field} key={`field-${field.id}`}/>
	))}

        </ModalForm>
    );
});
