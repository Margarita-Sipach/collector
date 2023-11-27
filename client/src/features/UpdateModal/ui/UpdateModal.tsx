import axios from 'axios';
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

	const normFile = async(e: any) => {
		const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dtjmfvhid/image/upload'
		const formData = new FormData();
		formData.append('file', e.file)
		formData.append('upload_preset', 'collector')
		const {data} = await axios.post(cloudinaryUrl, formData)
		return (data as any).url
	}

    const onFinish = async ({img, ...values}: any) => {
        const method = values.id ? 'update' : 'add';
        const args = type === ElementsTypes.collection
            ? { userId: userState.userId }
            : { collectionId: collectionState.element?.id };
		const imgSrc = await normFile(img)
        await state[method]({ ...args, ...values, img: imgSrc }, args);
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
