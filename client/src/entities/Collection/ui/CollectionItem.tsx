import { Card, Dropdown } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CollectionItem.module.scss';
import { Collection, collectionState } from '../model/collectionState';

interface CollectionItemProps {
  className?: string
  collection: Collection
}

export const CollectionItem: FC<CollectionItemProps> = observer((props) => {
    const {
        collection,
    } = props;

    const { t } = useTranslation('button');

    const updateHandle = (e: any) => {
        e.stopPropagation();
        collectionState.setValues({
            ...collection,
            theme: (collection.theme as any).title,
        });
        collectionState.openModal();
    };

    const deleteHandle = (e: any) => {
        e.stopPropagation();
        collectionState.delete(collection.id, collection.userId);
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
        <Link
            to={`${CommonRoutePath.collection}/${collection.id}`}
            className={cls.card}
        >
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
                    <Meta title={collection.title} />
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
