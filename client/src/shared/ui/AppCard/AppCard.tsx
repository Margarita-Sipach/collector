import {
    Avatar, Card, Dropdown, Tag,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { CommonRoutePath, CommonRoutes } from 'shared/config/routeConfig/commonConfig';
import { MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementsTypes } from 'shared/class/ElementState';
import { elementsStates } from 'shared/states/states';
import { userState } from 'entities/User';
import cls from './AppCard.module.scss';

interface AppCardProps {
  className?: string
  value: any
  type: ElementsTypes
  userId: number
}

export const AppCard: FC<AppCardProps> = observer((props) => {
    const {
        type,
        value,
        userId,
    } = props;

    const state = elementsStates[type];
    const { t } = useTranslation('button');

    const updateHandle = (e: any) => {
        e.stopPropagation();
        state.setValues(value);
        state.openModal();
    };

    const deleteHandle = (e: any) => {
        e.stopPropagation();
        const element = type === ElementsTypes.collection ? { userId: value.userId } : { collectionId: value.collectionId };
        state.delete(value.id, element);
    };

    const items = [
        {
            key: 'change',
            label: <span onClick={updateHandle}>{t('change')}</span>,
        },
        {
            key: 'delete',
            label: <span onClick={deleteHandle}>{t('delete')}</span>,
            danger: true,
        },
    ];

    const MainLink = () => {
        if (type === ElementsTypes.collection && value.user) {
            const { username, id } = value.user;
            return (
                <span>
                    User:
                    <Link to={`${CommonRoutePath.user}/${id}`}>{username}</Link>
                </span>
            );
        }
        if (type === ElementsTypes.item && value.collection) {
            const { title, id } = value.collection;
            return (
                <span>
                    Collection:
                    <Link to={`${CommonRoutePath.collection}/${id}`}>{title}</Link>
                </span>
            );
        }
        return <span />;
    };

    return (
        <Link to={`${CommonRoutePath[type]}/${value.id}`} className={cls.card}>
            <Card
                hoverable
                cover={(
                    <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                )}
            >
                <div className={cls.cardContent}>
                    <Meta
                        title={value.title}
                        description={(
                            <MainLink />
                        )}
                    />
                    {userState.canUserChange(userId) && (
                        <Dropdown menu={{ items }}>
                            <MdEdit
                                className={cls.menuLink}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            />
                        </Dropdown>
                    )}
                </div>
            </Card>
        </Link>
    );
});
