import { Card, Dropdown } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CommonRoutePath } from 'shared/config/routeConfig/commonConfig';
import { MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import cls from './CollectionItem.module.scss';

import { collectionState } from '../model/collectionState';

interface CollectionItemProps {
  className?: string
  title: string
  id: number
}

export const CollectionItem: FC<CollectionItemProps> = observer((props) => {
    const {
        title, id,
    } = props;

    const items = [
        {
            key: 'update',
            label: <span onClick={() => {}}>update</span>,
            disabled: true,
        },
        {
            key: 'delete',
            label: <span onClick={() => {}}>delete</span>,
            disabled: true,
            danger: true,
        },
    ];

    return (
        <Link to={`${CommonRoutePath.collection}/${id}`} className={cls.card}>
            <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div className={cls.cardContent}>
                    <Meta title={title} />
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
