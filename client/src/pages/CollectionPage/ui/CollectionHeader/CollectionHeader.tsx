import { FC } from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Collection } from 'entities/Collection';
import Markdown from 'react-markdown';
import { PageHeader } from 'shared/ui/PageHeader/PageHeader';
import { ElementsTypes } from 'shared/class/ElementState';

const { Title } = Typography;

interface CollectionHeaderProps {
  className?: string
  collection: Collection
}

export const CollectionHeader: FC<CollectionHeaderProps> = observer((props) => {
    const { collection } = props;
    const { t } = useTranslation();

    return (
        <PageHeader img="" type={ElementsTypes.item} userId={collection.userId}>
            <Title>{collection.title}</Title>
            <Title level={3}>
                Theme:
                {' '}
                {(collection.theme as any).title}
            </Title>
            <Markdown>{collection.description}</Markdown>

        </PageHeader>
    );
});
