import {
    Card, Dropdown,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { CommonRoutePath, CommonRoutes } from 'shared/config/routeConfig/commonConfig';
import { MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementsTypes } from 'shared/class/ElementState';
import { elementsStates } from 'shared/states/states';
import { userState } from 'entities/User';
import { DEFAULT_IMG } from 'shared/const/img';
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
    const { t } = useTranslation(['button', 'translation']);

    const updateHandler = (e: any) => {
        e.stopPropagation();
        state.setValues(value);
        state.openModal();
    };

    const deleteHandler = (e: any) => {
        e.stopPropagation();
        const element = type === ElementsTypes.collection
            ? { userId: value.userId }
            : { collectionId: value.collectionId };
        state.delete(value.id, element);
    };

    const generateItem = (name: string, clb: (e: any) => void) => ({
        key: name,
        label: <span onClick={clb}>
            {t(`button:${name}`)}
               </span>,
    });

    const items = [
        generateItem('change', updateHandler),
        generateItem('delete', deleteHandler),
    ];

    const MainLink = () => {
        const generateLink = (elementType: ElementsTypes, valueKey: CommonRoutes, linkValue: string) => {
            if (type === ElementsTypes[elementType] && value[valueKey]) {
                const { id, ...args } = value[valueKey];
                return (
                    <span>
                        {t(`translation:${valueKey}`)}
                        :
                        {' '}
                        <Link to={`${CommonRoutePath[valueKey]}/${id}`}>
                            {args[linkValue]}
                        </Link>
                    </span>
                );
            }
        };
        return generateLink(ElementsTypes.collection, CommonRoutes.USER, 'username')
		|| generateLink(ElementsTypes.item, CommonRoutes.COLLECTION, 'title') || <span />;
    };

    return (
        <Link
            to={`${CommonRoutePath[type]}/${value.id}`}
            className={cls.card}
        >
            <Card
                hoverable
                cover={(
                    <img
                        className={cls.img}
                        alt="example"
                        src={value.img || DEFAULT_IMG}
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
