import { FC } from 'react';
import { Character, characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { UpdateModal } from 'features/UpdateModal';
import { ElementsTypes } from 'shared/class/ElementState';
import { FieldsList } from './FieldsList/FieldsList';

interface UpdateCollectionModalProps {
  className?: string
}

export const UpdateCollectionModal: FC<UpdateCollectionModalProps> = observer(() => (
    <UpdateModal
        type={ElementsTypes.collection}
    >
        <FormItem name="id" className="none" isRequired={false} />
        <FormItem name="title" />
        <FormItem
            type={FormItemTypes.select}
            args={{
                itemChildren: characterState.themes.map(({ title }: Character) => title),
            }}
            name="theme"
        />
        <FormItem
            name="img"
            type={FormItemTypes.img}
            label="Image"
            isRequired={false}
        />
        <FormItem
            type={FormItemTypes.textarea}
            name="description"
            isRequired={false}
        />
        <FieldsList />
    </UpdateModal>
));
