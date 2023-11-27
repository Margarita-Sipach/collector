import { FC } from 'react';
import {
    Avatar, Button,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { ElementsTypes } from 'shared/class/ElementState';
import { elementsStates } from 'shared/states/states';
import cls from './PageHeader.module.scss';
import { DEFAULT_IMG } from 'shared/const/img';

interface PageHeaderProps {
	type?: ElementsTypes,
	img: string,
	userId: number,
	isButton?: boolean
}

export const PageHeader: FC<PageHeaderProps> = observer((props) => {
    const {
        children, type, img, userId, isButton = true,
    } = props;
    const { t } = useTranslation();

    const handleClick = () => {
        if (type) {
            const state = elementsStates[type];
            state.setValues(null);
            state.openModal();
        }
    };

    return (
        <div className={cls.container}>
            <Avatar
                shape="square"
                className={cls.avatar}
				src={img || DEFAULT_IMG}
            />
            <div className={cls.content}>
                {children}
            </div>
            {type && isButton && userState.canUserChange(userId) && (
                <Button
                    className={cls.buttons}
                    onClick={handleClick}
                >
                    +
                    {t(type)}
                </Button>
            )}
        </div>
    );
});
