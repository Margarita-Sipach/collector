import { collectionState } from 'entities/Collection';
import { itemState } from 'entities/Item';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ModalForm } from 'shared/ui/ModalForm/ModalForm';

export enum UpdateModalTypes{
	collection = 'collection',
	item = 'item'
}

interface UpdateModalProps {
  className?: string
  type: UpdateModalTypes
}

export const UpdateModal: FC<UpdateModalProps> = observer((props) => {
    const {
        type,
        children,
    } = props;

    const state = type === UpdateModalTypes.collection ? collectionState : itemState;

    const onFinish = async (values: any) => {
        const method = values.id ? 'update' : 'add';
        await state[method]({ userId: userState.userId, ...values });
		state.closeModal()
    };

    const onReset = () => {
        state.closeModal();
    };

    return (
        <ModalForm
            title={`${type} modal`}
            onFinish={onFinish}
            onReset={onReset}
            values={state.values}
			isModalVisible={state.isModalVisible}
        >
            {children}
        </ModalForm>
    );
});
