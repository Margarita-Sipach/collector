import { Card, Dropdown } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { itemState } from 'entities/Item';
import { collectionState } from 'entities/Collection';
import { useTranslation } from 'react-i18next';
import cls from './AppCard.module.scss';

export enum CardType{
	collection = 'collection',
	item = 'item'
}

interface AppCardProps {
  className?: string
  value: any
  type: CardType
}

export const AppCard: FC<AppCardProps> = observer((props) => {
    const {
        type,
        value,
    } = props;

    const state = type === CardType.collection ? collectionState : itemState;
    const { t } = useTranslation('button');

    const updateHandle = (e: any) => {
        e.stopPropagation();
        state.setValues(value);
        state.openModal();
    };

    const deleteHandle = (e: any) => {
        e.stopPropagation();
        state.delete(value.id, value.userId);
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
                    <Meta title={value.title} />
                    <Dropdown menu={{ items }}>
                        <MdEdit
                            className={cls.menuLink}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                    </Dropdown>

                </div>

            </Card>
        </Link>
    );
});
