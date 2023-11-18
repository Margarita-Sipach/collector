import { FC, useEffect, useState } from 'react';
import { ModalForm } from 'shared/ui/ModalForm/ModalForm';
import { characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { FieldTypes, collectionState } from 'entities/Collection';
import { UpdateModal, UpdateModalTypes } from 'features/UpdateModal';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';

const FieldInputTypes = {
    [FieldTypes.BOOLEAN]: FormItemTypes.switch,
    [FieldTypes.CHAR]: FormItemTypes.input,
    [FieldTypes.DATE]: FormItemTypes.date,
    [FieldTypes.INTEGER]: FormItemTypes.inputNumber,
    [FieldTypes.TEXT]: FormItemTypes.textarea,
};

interface AddItemModalProps {
  className?: string
}

export const AddItemModal: FC<AddItemModalProps> = observer((props) => {
    const {
    } = props;

    return (
	<UpdateModal
	type={UpdateModalTypes.item}
>
            <FormItem name="title" label="Item title" />
            <FormItem
                type={FormItemTypes.select}
                mode="tags"
                name="tags"
                options={characterState.tags.map(({ title }: any) => (title))}
            />
            {/* <Form.Item
                name="img"
                label="Image"
            >
                <Upload action="/upload.do" listType="picture">
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item> */}

            {collectionState.collection?.fields.map(({type, id, title}: any) => (
                <FormItem type={(FieldInputTypes as any)[type]} name={`${id}-field`} label={title} isRequired={false} />
            ))}

        </UpdateModal>
    );
});

