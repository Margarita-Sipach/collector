import { FC } from 'react';
import { ModalForm } from 'shared/ui/ModalForm/ModalForm';
import { characterState } from 'entities/Character';
import { observer } from 'mobx-react-lite';
import { collectionState } from 'entities/Collection';
import { FormItem, FormItemTypes } from 'shared/ui/FormItem/FormItem';
import { FieldsList } from './FieldsList/FieldsList';

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
            <FormItem name="title" />
            <FormItem
                type={FormItemTypes.select}
                name="theme"
                options={characterState.themes.map(({ title }: any) => title)}
            />
            {/* <Form.Item
                name="img"
                label="Image"
            >
                <Upload action="/upload.do" listType="picture">
                    <Button>Click to upload</Button>
                </Upload>
            </Form.Item> */}
            <FormItem type={FormItemTypes.textarea} name="description" />

            <FieldsList />
        </ModalForm>
    );
});
