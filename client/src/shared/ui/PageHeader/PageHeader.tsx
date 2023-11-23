import { FC } from 'react';
import {
    Avatar, Button, Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { userState } from 'entities/User';
import { observer } from 'mobx-react-lite';
import { Collection } from 'entities/Collection';
import Markdown from 'react-markdown';
import { itemState } from 'entities/Item';
import { ElementsTypes } from 'shared/class/ElementState';
import { elementsStates } from 'shared/states/states';
import cls from './PageHeader.module.scss';

const { Title } = Typography;

interface PageHeaderProps {
	type: ElementsTypes,
	img: string,
	userId: number
}

export const PageHeader: FC<PageHeaderProps> = observer((props) => {
    const {
        children, type, img, userId,
    } = props;
    const { t } = useTranslation();

    const handleClick = () => {
        const state = elementsStates[type];
        state.setValues(null);
        state.openModal();
    };

    return (
        <div className={cls.container}>
            <Avatar
                shape="square"
                className={cls.avatar}
            />
            <div className={cls.content}>
                {children}
            </div>
            {(userId === userState.userId || userState.isAdmin) && (
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
