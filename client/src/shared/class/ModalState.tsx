import { observable } from 'mobx';

export const modalProps = {
    values: observable,
    isModalVisible: observable,
};

export abstract class ModalState<T> {
    values: T | null = null;

    isModalVisible: boolean = false;

    setValues(data: T) {
        this.values = data;
    }

    setIsModalVisible(isModalVisible: boolean) {
        this.isModalVisible = isModalVisible;
    }

    openModal() {
        this.setIsModalVisible(true);
    }

    closeModal() {
        this.setIsModalVisible(false);
    }
}
