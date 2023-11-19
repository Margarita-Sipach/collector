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
import cls from './CollectionHeader.module.scss';

const { Title } = Typography;

interface CollectionHeaderProps {
  className?: string
  collection: Partial<Collection>
}

export const CollectionHeader: FC<CollectionHeaderProps> = observer((props) => {
    const { collection } = props;
    const { t } = useTranslation();

    const handleClick = () => {
        itemState.setValues(null);
        itemState.openModal();
    };

    return (
        <div className={cls.container}>
            <Avatar
                shape="square"
                className={cls.avatar}
            />
            <div className={cls.content}>
                <Title>{collection.title}</Title>
                <Title level={3}>
                    Theme:
                    {' '}
                    {(collection.theme as any).title}
                </Title>
                <Markdown>{collection.description}</Markdown>

            </div>
            <div className={cls.content}>
                {(collection.userId === userState.userId || userState.isAdmin) && (
                    <Button
                        className={cls.buttons}
                        onClick={handleClick}
                    >
                        +
                        {t('item')}
                    </Button>
                )}
            </div>
        </div>
    );
});
