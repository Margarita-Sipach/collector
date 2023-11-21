import { FC } from 'react';
import { characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { FieldTypes, collectionState } from 'entities/Collection';
import { UpdateModal } from 'features/UpdateModal';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { itemState } from 'entities/Item';
import { ElementsTypes } from 'shared/class/ElementState';

const FieldInputTypes = {
    [FieldTypes.BOOLEAN]: FormItemTypes.switch,
    [FieldTypes.CHAR]: FormItemTypes.input,
    [FieldTypes.DATE]: FormItemTypes.date,
    [FieldTypes.INTEGER]: FormItemTypes.inputNumber,
    [FieldTypes.TEXT]: FormItemTypes.textarea,
};

interface UpdateItemModalProps {
  className?: string
}

export const UpdateItemModal: FC<UpdateItemModalProps> = observer(() => (
    <UpdateModal
        type={ElementsTypes.item}
    >
        <FormItem name="id" className="none" isRequired={false} />
        <FormItem name="title" label="Item title" />
        <FormItem
            type={FormItemTypes.select}
            mode="tags"
            name="tag"
            options={characterState.tags.map(({ title }: any) => (title))}
            defaultValue={(itemState.element as any)?.tag}
        />
        {/* <Form.Item
                name="img"
                label="Image"
            >
                <Upload action="/upload.do" listType="picture">
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item> */}

        {collectionState.element?.fields.map(({ type, id, title }: any) => (
            <FormItem
                type={(FieldInputTypes as any)[type]}
                name={`${id}-field`}
                label={title}
                isRequired={false}
            />
        ))}

    </UpdateModal>
));