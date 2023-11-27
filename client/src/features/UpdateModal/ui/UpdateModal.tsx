import { collectionState } from 'entities/Collection';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementsTypes } from 'shared/class/ElementState';
import { elementsStates } from 'shared/states/states';
import { ModalForm } from 'shared/ui/ModalForm/ModalForm';

interface UpdateModalProps {
  className?: string
  type: ElementsTypes
}

export const UpdateModal: FC<UpdateModalProps> = observer((props) => {
    const {
        type,
        children,
    } = props;

    const { t } = useTranslation();
    const state = elementsStates[type];

    const onFinish = async (values: any) => {
        const method = values.id ? 'update' : 'add';
        const args = type === ElementsTypes.collection
            ? { userId: userState.userId }
            : { collectionId: collectionState.element?.id };
        await state[method]({ ...args, ...values }, args);
        state.closeModal();
    };

    const onReset = () => {
        state.closeModal();
    };

    return (
        <ModalForm
            title={`${t(type)} ${t('modal')}`}
            onFinish={onFinish}
            onReset={onReset}
            values={state.values}
            isModalVisible={state.isModalVisible}
        >
            {children}
        </ModalForm>
    );
});
