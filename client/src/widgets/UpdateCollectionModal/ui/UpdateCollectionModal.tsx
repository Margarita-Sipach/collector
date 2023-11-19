import { FC } from 'react';
import { Character, characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { UpdateModal, UpdateModalTypes } from 'features/UpdateModal';
import { FieldsList } from './FieldsList/FieldsList';

interface UpdateCollectionModalProps {
  className?: string
}

export const UpdateCollectionModal: FC<UpdateCollectionModalProps> = observer(() => (
    <UpdateModal
        type={UpdateModalTypes.collection}
    >
        <FormItem name="id" className="none" isRequired={false} />
        <FormItem name="title" />
        <FormItem
            type={FormItemTypes.select}
            name="theme"
            options={characterState.themes.map(({ title }: Character) => title)}
        />
        {/* <Form.Item
                name="img"
                label="Image"
            >
                <Upload action="/upload.do" listType="picture">
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item> */}
        <FormItem
            type={FormItemTypes.textarea}
            name="description"
            isRequired={false}
        />
        <FieldsList />
    </UpdateModal>
));
